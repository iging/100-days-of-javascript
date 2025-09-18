const infixToFunction = {
  "+": (x, y) => x + y,
  "-": (x, y) => x - y,
  "*": (x, y) => x * y,
  "/": (x, y) => x / y,
};

const infixEval = (str, regex) =>
  str.replace(regex, (_match, arg1, operator, arg2) =>
    infixToFunction[operator](parseFloat(arg1), parseFloat(arg2))
  );

const highPrecedence = (str) => {
  const regex = /([\d.]+)([*\/])([\d.]+)/;
  const str2 = infixEval(str, regex);
  return str === str2 ? str : highPrecedence(str2);
};

const isEven = (num) => num % 2 === 0;
const sum = (nums) => nums.reduce((acc, el) => acc + el, 0);
const average = (nums) => sum(nums) / nums.length;

const median = (nums) => {
  const sorted = nums.slice().sort((a, b) => a - b);
  const length = sorted.length;
  const middle = length / 2 - 1;
  return isEven(length)
    ? average([sorted[middle], sorted[middle + 1]])
    : sorted[Math.ceil(middle)];
};

const spreadsheetFunctions = {
  "": (arg) => arg,
  sum,
  average,
  median,
  even: (nums) => nums.filter(isEven),
  someeven: (nums) => nums.some(isEven),
  everyeven: (nums) => nums.every(isEven),
  firsttwo: (nums) => nums.slice(0, 2),
  lasttwo: (nums) => nums.slice(-2),
  has2: (nums) => nums.includes(2),
  increment: (nums) => nums.map((num) => num + 1),
  random: ([x, y]) => Math.floor(Math.random() * y + x),
  range: (nums) => range(...nums),
  nodupes: (nums) => [...new Set(nums).values()],
};

const applyFunction = (str) => {
  const noHigh = highPrecedence(str);
  const infix = /([\d.]+)([+-])([\d.]+)/;
  const str2 = infixEval(noHigh, infix);
  const functionCall = /([a-z0-9]*)\(([0-9., ]*)\)(?!.*\()/i;
  const toNumberList = (args) => args.split(",").map(parseFloat);
  const apply = (fn, args) =>
    spreadsheetFunctions[fn.toLowerCase()](toNumberList(args));
  return str2.replace(functionCall, (match, fn, args) =>
    spreadsheetFunctions.hasOwnProperty(fn.toLowerCase())
      ? apply(fn, args)
      : match
  );
};

const range = (start, end) =>
  Array(end - start + 1)
    .fill(start)
    .map((element, index) => element + index);
const charRange = (start, end) =>
  range(start.charCodeAt(0), end.charCodeAt(0)).map((code) =>
    String.fromCharCode(code)
  );

const evalFormula = (x, cells) => {
  const idToText = (id) => cells.find((cell) => cell.id === id).value;
  const rangeRegex = /([A-J])([1-9][0-9]?):([A-J])([1-9][0-9]?)/gi;
  const rangeFromString = (num1, num2) => range(parseInt(num1), parseInt(num2));
  const elemValue = (num) => (character) => idToText(character + num);
  const addCharacters = (character1) => (character2) => (num) =>
    charRange(character1, character2).map(elemValue(num));
  const rangeExpanded = x.replace(
    rangeRegex,
    (_match, char1, num1, char2, num2) =>
      rangeFromString(num1, num2).map(addCharacters(char1)(char2))
  );
  const cellRegex = /[A-J][1-9][0-9]?/gi;
  const cellExpanded = rangeExpanded.replace(cellRegex, (match) =>
    idToText(match.toUpperCase())
  );
  const functionExpanded = applyFunction(cellExpanded);
  return functionExpanded === x
    ? functionExpanded
    : evalFormula(functionExpanded, cells);
};

// DOM Elements
const container = document.getElementById("container");
const formulaInput = document.getElementById("formula-input");
const activeCellDisplay = document.getElementById("active-cell");
const statusMessage = document.getElementById("status-message");
const saveBtn = document.getElementById("save-btn");
const loadBtn = document.getElementById("load-btn");
const clearBtn = document.getElementById("clear-btn");

// State
let activeCell = null;
let cells = new Map();

// Initialize the spreadsheet
const initSpreadsheet = () => {
  createLabels();
  createCells();
  setupEventListeners();
  updateStatus("Ready");
};

// Create row and column labels
const createLabels = () => {
  // Create the top-left corner cell
  const corner = document.createElement("div");
  corner.className = "label";
  container.appendChild(corner);

  // Create column labels (A, B, C, ...)
  for (let i = 0; i < 10; i++) {
    const label = document.createElement("div");
    label.className = "label column-label";
    label.textContent = String.fromCharCode(65 + i); // A, B, C, ...
    container.appendChild(label);
  }

  // Create row labels (1, 2, 3, ...) and cells
  for (let row = 1; row <= 99; row++) {
    // Row number label
    const rowLabel = document.createElement("div");
    rowLabel.className = "label row-label";
    rowLabel.textContent = row;
    container.appendChild(rowLabel);

    // Cells for this row
    for (let col = 0; col < 10; col++) {
      const cellId = `${String.fromCharCode(65 + col)}${row}`;
      const cell = document.createElement("input");
      cell.className = "cell";
      cell.id = cellId;
      cell.dataset.row = row;
      cell.dataset.col = String.fromCharCode(65 + col);
      cell.setAttribute("spellcheck", "false");

      // Store cell reference
      cells.set(cellId, {
        element: cell,
        value: "",
        formula: "",
      });

      container.appendChild(cell);
    }
  }
};

// Create cells in the spreadsheet
const createCells = () => {
  // Cells are created in createLabels()
};

// Set up event listeners
const setupEventListeners = () => {
  // Cell focus
  container.addEventListener("focusin", (e) => {
    if (e.target.classList.contains("cell")) {
      setActiveCell(e.target);
    }
  });

  // Cell input - handle direct cell editing
  container.addEventListener("input", (e) => {
    if (e.target.classList.contains("cell")) {
      const cell = e.target;
      const cellId = cell.id;
      const cellData = cells.get(cellId);

      if (cellData) {
        // Update the cell data
        const success = updateCellValue(cell, cell.value, false);

        // If this cell is active, update the formula bar
        if (success && activeCell === cell) {
          formulaInput.value = cell.value;
        }
      }
    }
  });

  // Formula bar input - handle formula entry
  formulaInput.addEventListener("input", (e) => {
    if (activeCell) {
      const value = e.target.value;
      const isFormula = value.startsWith("=");

      // Update the cell with the new value or formula
      updateCellValue(activeCell, value, isFormula);
    }
  });

  // Handle formula bar submission (Enter key)
  formulaInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && activeCell) {
      e.preventDefault();
      // Move to the cell below when pressing Enter in formula bar
      const nextRow = parseInt(activeCell.dataset.row) + 1;
      const nextCell = document.getElementById(
        `${activeCell.dataset.col}${nextRow}`
      );
      if (nextCell) nextCell.focus();
    }
  });

  // Save button
  saveBtn.addEventListener("click", saveSpreadsheet);

  // Load button
  loadBtn.addEventListener("click", loadSpreadsheet);

  // Clear button
  clearBtn.addEventListener("click", clearSpreadsheet);

  // Keyboard navigation
  document.addEventListener("keydown", handleKeyNavigation);
};

// Set the active cell
const setActiveCell = (cell) => {
  // Remove active class from previous active cell
  if (activeCell) {
    activeCell.classList.remove("active");
  }

  // Set new active cell
  activeCell = cell;
  activeCell.classList.add("active");

  // Update formula bar
  const cellId = cell.id;
  const cellData = cells.get(cellId);

  if (cellData) {
    activeCellDisplay.textContent = cellId;
    formulaInput.value = cellData.formula || cellData.value || "";
    formulaInput.focus();
  }
};

// Update cell value
const updateCellValue = (cell, value, isFormula = false) => {
  const cellId = cell.id;
  const cellData = cells.get(cellId);

  if (!cellData) return false;

  try {
    if (isFormula && value.startsWith("=") && value.length > 1) {
      // Handle formula
      try {
        const result = evaluateFormula(value.substring(1));
        cellData.formula = value;
        cellData.value = result;
        cell.value = result;
        return true;
      } catch (error) {
        console.error("Formula error:", error);
        cell.value = "#ERROR";
        updateStatus(`Formula error: ${error.message}`, "error");
        return false;
      }
    } else {
      // Handle plain value
      cellData.formula = "";
      cellData.value = value;
      cell.value = value;
      return true;
    }
  } catch (error) {
    console.error("Error updating cell:", error);
    updateStatus(`Error: ${error.message}`, "error");
    return false;
  }
};

// Evaluate formula
const evaluateFormula = (formula) => {
  // This is a simplified version - you would expand this to handle
  // all the formula logic from the original code
  try {
    // For now, just evaluate simple arithmetic
    // In a real app, you'd want to use a proper formula parser
    return new Function(`return ${formula}`)();
  } catch (error) {
    throw new Error("Invalid formula");
  }
};

// Handle keyboard navigation
const handleKeyNavigation = (e) => {
  if (!activeCell) return;

  const currentRow = parseInt(activeCell.dataset.row);
  const currentCol = activeCell.dataset.col.charCodeAt(0);

  let nextCell = null;

  switch (e.key) {
    case "ArrowUp":
      if (currentRow > 1) {
        nextCell = document.getElementById(
          `${String.fromCharCode(currentCol)}${currentRow - 1}`
        );
      }
      break;
    case "ArrowDown":
      nextCell = document.getElementById(
        `${String.fromCharCode(currentCol)}${currentRow + 1}`
      );
      break;
    case "ArrowLeft":
      if (currentCol > 65) {
        // 'A' char code is 65
        nextCell = document.getElementById(
          `${String.fromCharCode(currentCol - 1)}${currentRow}`
        );
      }
      break;
    case "ArrowRight":
      if (currentCol < 74) {
        // 'J' char code is 74
        nextCell = document.getElementById(
          `${String.fromCharCode(currentCol + 1)}${currentRow}`
        );
      }
      break;
    case "Enter":
      e.preventDefault();
      const nextRowCell = document.getElementById(
        `${String.fromCharCode(currentCol)}${currentRow + 1}`
      );
      if (nextRowCell) nextRowCell.focus();
      return;
    case "Tab":
      e.preventDefault();
      if (e.shiftKey) {
        // Shift+Tab - move left
        if (currentCol > 65) {
          nextCell = document.getElementById(
            `${String.fromCharCode(currentCol - 1)}${currentRow}`
          );
        }
      } else {
        // Tab - move right
        if (currentCol < 74) {
          nextCell = document.getElementById(
            `${String.fromCharCode(currentCol + 1)}${currentRow}`
          );
        }
      }
      break;
    default:
      return; // Exit if no navigation needed
  }

  if (nextCell) {
    e.preventDefault();
    nextCell.focus();
  }
};

// Save spreadsheet to localStorage
const saveSpreadsheet = () => {
  try {
    const dataToSave = {};
    cells.forEach((cellData, cellId) => {
      dataToSave[cellId] = {
        value: cellData.value,
        formula: cellData.formula,
      };
    });

    localStorage.setItem("spreadsheetData", JSON.stringify(dataToSave));
    updateStatus("Spreadsheet saved successfully");
  } catch (error) {
    console.error("Error saving spreadsheet:", error);
    updateStatus("Error saving spreadsheet", "error");
  }
};

// Load spreadsheet from localStorage
const loadSpreadsheet = () => {
  try {
    const savedData = localStorage.getItem("spreadsheetData");
    if (!savedData) {
      updateStatus("No saved data found");
      return;
    }

    const data = JSON.parse(savedData);
    Object.entries(data).forEach(([cellId, cellData]) => {
      const cell = document.getElementById(cellId);
      if (cell) {
        const cellInfo = cells.get(cellId);
        if (cellInfo) {
          cellInfo.value = cellData.value || "";
          cellInfo.formula = cellData.formula || "";
          cell.value = cellData.formula ? cellData.value : cellData.value || "";
        }
      }
    });

    updateStatus("Spreadsheet loaded successfully");
  } catch (error) {
    console.error("Error loading spreadsheet:", error);
    updateStatus("Error loading spreadsheet", "error");
  }
};

// Clear the entire spreadsheet
const clearSpreadsheet = () => {
  if (
    confirm(
      "Are you sure you want to clear the entire spreadsheet? This cannot be undone."
    )
  ) {
    cells.forEach((cellData, cellId) => {
      cellData.value = "";
      cellData.formula = "";
      cellData.element.value = "";
    });
    updateStatus("Spreadsheet cleared");
  }
};

// Update status message
const updateStatus = (message, type = "info") => {
  statusMessage.textContent = message;
  statusMessage.className = "";
  statusMessage.classList.add(type);

  // Clear status after 5 seconds if it's an info message
  if (type === "info") {
    setTimeout(() => {
      if (statusMessage.textContent === message) {
        statusMessage.textContent = "Ready";
        statusMessage.className = "";
      }
    }, 5000);
  }
};
// Initialize the spreadsheet when the DOM is loaded
document.addEventListener("DOMContentLoaded", initSpreadsheet);
