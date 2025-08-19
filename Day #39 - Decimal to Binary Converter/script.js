/**
 * Decimal to Binary Converter
 *
 * This application converts decimal numbers to binary using recursion
 * and visualizes the recursive call stack process.
 */

// DOM elements
const elements = {
  numberInput: document.getElementById("number-input"),
  convertBtn: document.getElementById("convert-btn"),
  result: document.getElementById("result"),
  animationContainer: document.getElementById("animation-container"),
};

// Animation data for the special case of number 5
const animationData = [
  {
    inputVal: 5,
    addElDelay: 1000,
    msg: 'decimalToBinary(5) returns "10" + 1 (5 % 2). Then it pops off the stack.',
    showMsgDelay: 15000,
    removeElDelay: 20000,
  },
  {
    inputVal: 2,
    addElDelay: 1500,
    msg: 'decimalToBinary(2) returns "1" + 0 (2 % 2) and gives that value to the stack below. Then it pops off the stack.',
    showMsgDelay: 10000,
    removeElDelay: 15000,
  },
  {
    inputVal: 1,
    addElDelay: 2000,
    msg: "decimalToBinary(1) returns '1' (base case) and gives that value to the stack below. Then it pops off the stack.",
    showMsgDelay: 5000,
    removeElDelay: 10000,
  },
];

/**
 * Converts a decimal number to binary using recursion
 * @param {number} input - The decimal number to convert
 * @returns {string} The binary representation
 */
const decimalToBinary = (input) => {
  // Base case: 0 or 1 returns itself as string
  if (input === 0 || input === 1) {
    return String(input);
  } else {
    // Recursive case: convert quotient and append remainder
    return decimalToBinary(Math.floor(input / 2)) + (input % 2);
  }
};

/**
 * Shows the animation of recursive call stack for number 5
 */
const showAnimation = () => {
  // Clear any previous content and set loading state
  elements.animationContainer.innerHTML = "";
  elements.result.innerHTML =
    '<div class="loading">Visualizing call stack...</div>';

  // Add animation frames with delays
  animationData.forEach((obj) => {
    // Create and add the frame element
    setTimeout(() => {
      const frameElement = document.createElement("p");
      frameElement.id = obj.inputVal;
      frameElement.className = "animation-frame";
      frameElement.textContent = `decimalToBinary(${obj.inputVal})`;
      elements.animationContainer.appendChild(frameElement);
    }, obj.addElDelay);

    // Update the frame with detailed message
    setTimeout(() => {
      const frameElement = document.getElementById(obj.inputVal);
      if (frameElement) {
        frameElement.textContent = obj.msg;
      }
    }, obj.showMsgDelay);

    // Remove the frame
    setTimeout(() => {
      const frameElement = document.getElementById(obj.inputVal);
      if (frameElement) {
        frameElement.classList.add("removing");
        setTimeout(() => frameElement.remove(), 500);
      }
    }, obj.removeElDelay);
  });

  // Show final result after animation completes
  setTimeout(() => {
    elements.result.textContent = decimalToBinary(5);
  }, 20000);
};

/**
 * Validates user input and performs the conversion
 */
const processUserInput = () => {
  // Get and validate input
  const userInput = elements.numberInput.value.trim();
  const inputInt = parseInt(userInput);

  // Clear previous animation
  elements.animationContainer.innerHTML = "";

  // Error handling for empty or invalid input
  if (!userInput || isNaN(inputInt)) {
    elements.result.textContent = "Please enter a valid number";
    elements.result.classList.add("error");
    setTimeout(() => elements.result.classList.remove("error"), 1500);
    return;
  }

  // Error handling for negative numbers
  if (inputInt < 0) {
    elements.result.textContent = "Please enter a non-negative number";
    elements.result.classList.add("error");
    setTimeout(() => elements.result.classList.remove("error"), 1500);
    return;
  }

  // Special case for number 5 - show animation
  if (inputInt === 5) {
    showAnimation();
    return;
  }

  // Normal conversion for other numbers
  try {
    const binaryResult = decimalToBinary(inputInt);
    elements.result.textContent = binaryResult;

    // Add a simple visualization for other numbers
    const steps = [];
    let tempNum = inputInt;

    while (tempNum > 0) {
      steps.unshift({
        quotient: Math.floor(tempNum / 2),
        remainder: tempNum % 2,
        original: tempNum,
      });
      tempNum = Math.floor(tempNum / 2);
    }

    // Create simple visualization
    if (steps.length > 0) {
      steps.forEach((step, index) => {
        setTimeout(() => {
          const stepElement = document.createElement("div");
          stepElement.className = "animation-frame";
          stepElement.textContent = `${step.original} ÷ 2 = ${step.quotient} remainder ${step.remainder}`;
          elements.animationContainer.appendChild(stepElement);
        }, index * 500);
      });
    } else {
      // Handle special case for input = 0
      const zeroElement = document.createElement("div");
      zeroElement.className = "animation-frame";
      zeroElement.textContent = 'Base case: 0 returns "0"';
      elements.animationContainer.appendChild(zeroElement);
    }
  } catch (error) {
    console.error("Conversion error:", error);
    elements.result.textContent = "Error in conversion";
    elements.result.classList.add("error");
  }

  // Clear input for next conversion
  elements.numberInput.value = "";
};

/**
 * Initialize the application
 */
const initApp = () => {
  // Set up event listeners
  elements.convertBtn.addEventListener("click", processUserInput);

  elements.numberInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      processUserInput();
    }
  });

  // Focus the input on page load
  elements.numberInput.focus();

  // Add placeholder animation
  const placeholderElement = document.createElement("div");
  placeholderElement.className = "animation-frame";
  placeholderElement.textContent =
    "Enter a number and click Convert to see the conversion process";
  elements.animationContainer.appendChild(placeholderElement);
};

// Start the app when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", initApp);
