const taskForm = document.getElementById("task-form");
const confirmCloseDialog = document.getElementById("confirm-close-dialog");
const taskDetailsDialog = document.getElementById("task-details-dialog");
const openTaskFormBtn = document.getElementById("open-task-form-btn");
const closeTaskFormBtn = document.getElementById("close-task-form-btn");
const addOrUpdateTaskBtn = document.getElementById("add-or-update-task-btn");
const cancelBtn = document.getElementById("cancel-btn");
const discardBtn = document.getElementById("discard-btn");
const tasksContainer = document.getElementById("tasks-container");
const titleInput = document.getElementById("title-input");
const dateInput = document.getElementById("date-input");
const descriptionInput = document.getElementById("description-input");
const categoryInput = document.getElementById("category-input");
const priorityInput = document.getElementById("priority-input");
const statusInput = document.getElementById("status-input");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const filterCategory = document.getElementById("filter-category");
const filterPriority = document.getElementById("filter-priority");
const filterStatus = document.getElementById("filter-status");
const undoBtn = document.getElementById("undo-btn");
const redoBtn = document.getElementById("redo-btn");
const themeToggleCheckbox = document.getElementById("theme-toggle-checkbox");
const closeDetailsBtn = document.getElementById("close-details-btn");
const detailsCloseBtn = document.getElementById("details-close-btn");

const APP_STATE = {
  version: "1.0.0",
  lastUpdated: new Date().toISOString(),
  taskData: [],
  currentTask: {},
  filteredTasks: [],
  undoStack: [],
  redoStack: [],
  filters: {
    search: "",
    category: "all",
    priority: "all",
    status: "all",
  },
  isDarkTheme: false,
  autoSaveTimerId: null,
};

const initializeApp = () => {
  try {
    const savedData = JSON.parse(localStorage.getItem("todoAppState")) || {};

    APP_STATE.taskData = savedData.taskData || [];
    APP_STATE.isDarkTheme = savedData.isDarkTheme || false;
    APP_STATE.version = savedData.version || APP_STATE.version;
    APP_STATE.lastUpdated = savedData.lastUpdated || APP_STATE.lastUpdated;

    applyTheme(APP_STATE.isDarkTheme);
    themeToggleCheckbox.checked = APP_STATE.isDarkTheme;

    APP_STATE.filteredTasks = [...APP_STATE.taskData];

    APP_STATE.autoSaveTimerId = setInterval(autoSave, 30000);

    console.log("App initialized with version:", APP_STATE.version);
  } catch (error) {
    console.error("Error loading data from localStorage:", error);
    APP_STATE.taskData = [];
    APP_STATE.filteredTasks = [];
  }

  if (APP_STATE.taskData.length) {
    updateTaskContainer();
  }
};

const removeSpecialChars = (val) => {
  return val?.trim().replace(/[^A-Za-z0-9\-\s]/g, "") || "";
};

const generateTaskId = (title) => {
  return `${removeSpecialChars(title)
    .toLowerCase()
    .split(" ")
    .join("-")}-${Date.now()}`;
};

const saveToLocalStorage = () => {
  const dataToSave = {
    taskData: APP_STATE.taskData,
    version: APP_STATE.version,
    lastUpdated: new Date().toISOString(),
    isDarkTheme: APP_STATE.isDarkTheme,
  };

  localStorage.setItem("todoAppState", JSON.stringify(dataToSave));
};

const autoSave = () => {
  saveToLocalStorage();
  console.log("Auto-saved at", new Date().toLocaleTimeString());
};

const pushToUndoStack = (actionType, data) => {
  APP_STATE.undoStack.push({
    actionType,
    data: JSON.parse(JSON.stringify(data)),
  });

  APP_STATE.redoStack = [];

  updateUndoRedoButtons();
};

const updateUndoRedoButtons = () => {
  undoBtn.disabled = APP_STATE.undoStack.length === 0;
  redoBtn.disabled = APP_STATE.redoStack.length === 0;

  undoBtn.style.opacity = undoBtn.disabled ? "0.5" : "1";
  redoBtn.style.opacity = redoBtn.disabled ? "0.5" : "1";
};

const applyFilters = () => {
  const { search, category, priority, status } = APP_STATE.filters;

  APP_STATE.filteredTasks = APP_STATE.taskData.filter((task) => {
    const searchMatch = search
      ? task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description.toLowerCase().includes(search.toLowerCase())
      : true;

    const categoryMatch = category === "all" || task.category === category;

    const priorityMatch = priority === "all" || task.priority === priority;

    const statusMatch = status === "all" || task.status === status;

    return searchMatch && categoryMatch && priorityMatch && statusMatch;
  });

  updateTaskContainer();
};

const applyTheme = (isDark) => {
  document.body.setAttribute("data-theme", isDark ? "dark" : "light");
};

const addOrUpdateTask = () => {
  if (!titleInput.value.trim()) {
    alert("Please provide a title");
    return;
  }

  const isEditing = !!APP_STATE.currentTask.id;
  const dataArrIndex = APP_STATE.taskData.findIndex(
    (item) => item.id === APP_STATE.currentTask.id
  );

  const taskObj = {
    id: isEditing ? APP_STATE.currentTask.id : generateTaskId(titleInput.value),
    title: removeSpecialChars(titleInput.value),
    date: dateInput.value,
    description: removeSpecialChars(descriptionInput.value),
    category: categoryInput.value,
    priority: priorityInput.value,
    status: statusInput.value,
    createdAt: isEditing
      ? APP_STATE.currentTask.createdAt
      : new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  if (isEditing && dataArrIndex !== -1) {
    const oldTask = APP_STATE.taskData[dataArrIndex];
    pushToUndoStack("edit", { oldTask, newTask: taskObj });
    APP_STATE.taskData[dataArrIndex] = taskObj;
  } else {
    pushToUndoStack("add", { task: taskObj });
    APP_STATE.taskData.unshift(taskObj);
  }

  saveToLocalStorage();
  applyFilters();
  reset();
};

const updateTaskContainer = () => {
  tasksContainer.innerHTML = "";

  if (APP_STATE.filteredTasks.length === 0) {
    tasksContainer.innerHTML = `
      <div class="empty-state">
        <p>No tasks found</p>
        <p class="empty-state-subtext">Create a new task or adjust your filters</p>
      </div>
    `;
    return;
  }

  APP_STATE.filteredTasks.forEach((task) => {
    const taskElement = document.createElement("div");
    taskElement.className = "task";
    taskElement.id = task.id;
    taskElement.draggable = true;

    const priorityDiv = document.createElement("div");
    priorityDiv.className = `task-priority priority-${task.priority}`;

    const contentDiv = document.createElement("div");
    contentDiv.className = "task-content";

    const headerDiv = document.createElement("div");
    headerDiv.className = "task-header";

    const title = document.createElement("h3");
    title.className = "task-title";
    title.textContent = task.title;

    const category = document.createElement("span");
    category.className = `task-category cat-${task.category}`;
    category.textContent =
      task.category.charAt(0).toUpperCase() + task.category.slice(1);

    headerDiv.appendChild(title);
    headerDiv.appendChild(category);

    const metaDiv = document.createElement("div");
    metaDiv.className = "task-meta";

    const date = document.createElement("span");
    date.className = "task-date";
    date.textContent = task.date
      ? new Date(task.date).toLocaleDateString()
      : "No due date";

    const status = document.createElement("span");
    status.className = `task-status status-${task.status}`;
    status.textContent = task.status
      .replace("-", " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    metaDiv.appendChild(date);
    metaDiv.appendChild(status);

    const description = document.createElement("p");
    description.className = "task-description";
    description.textContent = task.description || "No description";

    const actionsDiv = document.createElement("div");
    actionsDiv.className = "task-actions";

    const editBtn = document.createElement("button");
    editBtn.className = "btn secondary-btn";
    editBtn.textContent = "Edit";
    editBtn.onclick = (e) => {
      e.stopPropagation();
      editTask(task.id);
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn danger-btn";
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = (e) => {
      e.stopPropagation();
      deleteTask(task.id);
    };

    actionsDiv.appendChild(editBtn);
    actionsDiv.appendChild(deleteBtn);

    contentDiv.appendChild(headerDiv);
    contentDiv.appendChild(metaDiv);
    contentDiv.appendChild(description);
    contentDiv.appendChild(actionsDiv);

    taskElement.appendChild(priorityDiv);
    taskElement.appendChild(contentDiv);

    taskElement.addEventListener("click", () => showTaskDetails(task.id));

    taskElement.addEventListener("dragstart", handleDragStart);
    taskElement.addEventListener("dragover", handleDragOver);
    taskElement.addEventListener("dragenter", handleDragEnter);
    taskElement.addEventListener("dragleave", handleDragLeave);
    taskElement.addEventListener("drop", handleDrop);
    taskElement.addEventListener("dragend", handleDragEnd);

    tasksContainer.appendChild(taskElement);
  });
};

const deleteTask = (taskId) => {
  const taskIndex = APP_STATE.taskData.findIndex((item) => item.id === taskId);

  if (taskIndex === -1) return;

  const deletedTask = APP_STATE.taskData[taskIndex];
  pushToUndoStack("delete", { task: deletedTask, index: taskIndex });

  APP_STATE.taskData.splice(taskIndex, 1);
  saveToLocalStorage();
  applyFilters();
};

const editTask = (taskId) => {
  const task = APP_STATE.taskData.find((item) => item.id === taskId);

  if (!task) return;

  APP_STATE.currentTask = { ...task };

  titleInput.value = task.title;
  dateInput.value = task.date;
  descriptionInput.value = task.description;
  categoryInput.value = task.category;
  priorityInput.value = task.priority;
  statusInput.value = task.status;

  addOrUpdateTaskBtn.innerText = "Update Task";
  document.getElementById("form-title").innerText = "Edit Task";

  taskForm.classList.remove("hidden");
};

const showTaskDetails = (taskId) => {
  const task = APP_STATE.taskData.find((item) => item.id === taskId);

  if (!task) return;

  const detailsContent = document.getElementById("task-details-content");
  document.getElementById("details-title").textContent = task.title;

  const formattedDate = task.date
    ? new Date(task.date).toLocaleDateString()
    : "No due date";
  const createdDate = new Date(task.createdAt).toLocaleString();
  const updatedDate = new Date(task.updatedAt).toLocaleString();

  detailsContent.innerHTML = `
    <div class="details-row">
      <span class="details-label">Category:</span>
      <span class="task-category cat-${task.category}">${task.category}</span>
    </div>
    <div class="details-row">
      <span class="details-label">Priority:</span>
      <span class="task-status priority-${task.priority}-text">${
    task.priority
  }</span>
    </div>
    <div class="details-row">
      <span class="details-label">Status:</span>
      <span class="task-status status-${task.status}">${task.status.replace(
    "-",
    " "
  )}</span>
    </div>
    <div class="details-row">
      <span class="details-label">Due Date:</span>
      <span>${formattedDate}</span>
    </div>
    <div class="details-row">
      <span class="details-label">Description:</span>
      <p class="details-description">${task.description || "No description"}</p>
    </div>
    <div class="details-meta">
      <div>Created: ${createdDate}</div>
      <div>Last Updated: ${updatedDate}</div>
    </div>
  `;

  taskDetailsDialog.showModal();
};

const reset = () => {
  addOrUpdateTaskBtn.innerText = "Add Task";
  document.getElementById("form-title").innerText = "Add New Task";
  titleInput.value = "";
  dateInput.value = "";
  descriptionInput.value = "";
  categoryInput.value = "work";
  priorityInput.value = "low";
  statusInput.value = "not-started";
  taskForm.classList.add("hidden");
  APP_STATE.currentTask = {};
};

let draggedTask = null;

const handleDragStart = (e) => {
  draggedTask = e.target;
  e.target.classList.add("dragging");
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/plain", e.target.id);
};

const handleDragOver = (e) => {
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";
};

const handleDragEnter = (e) => {
  e.target.closest(".task")?.classList.add("drag-over");
};

const handleDragLeave = (e) => {
  e.target.closest(".task")?.classList.remove("drag-over");
};

const handleDrop = (e) => {
  e.preventDefault();
  const dropTarget = e.target.closest(".task");

  if (!dropTarget || dropTarget === draggedTask) return;

  dropTarget.classList.remove("drag-over");

  const draggedId = draggedTask.id;
  const targetId = dropTarget.id;

  const draggedIndex = APP_STATE.taskData.findIndex(
    (task) => task.id === draggedId
  );
  const targetIndex = APP_STATE.taskData.findIndex(
    (task) => task.id === targetId
  );

  if (draggedIndex !== -1 && targetIndex !== -1) {
    pushToUndoStack("reorder", {
      taskId: draggedId,
      oldIndex: draggedIndex,
      newIndex: targetIndex,
    });

    const [movedTask] = APP_STATE.taskData.splice(draggedIndex, 1);
    APP_STATE.taskData.splice(targetIndex, 0, movedTask);

    saveToLocalStorage();
    applyFilters();
  }
};

const handleDragEnd = (e) => {
  e.target.classList.remove("dragging");
  document.querySelectorAll(".drag-over").forEach((el) => {
    el.classList.remove("drag-over");
  });
};

const undo = () => {
  if (APP_STATE.undoStack.length === 0) return;

  const action = APP_STATE.undoStack.pop();
  APP_STATE.redoStack.push(action);

  switch (action.actionType) {
    case "add":
      const addedTaskIndex = APP_STATE.taskData.findIndex(
        (task) => task.id === action.data.task.id
      );
      if (addedTaskIndex !== -1) APP_STATE.taskData.splice(addedTaskIndex, 1);
      break;

    case "edit":
      const editedTaskIndex = APP_STATE.taskData.findIndex(
        (task) => task.id === action.data.oldTask.id
      );
      if (editedTaskIndex !== -1)
        APP_STATE.taskData[editedTaskIndex] = action.data.oldTask;
      break;

    case "delete":
      APP_STATE.taskData.splice(action.data.index, 0, action.data.task);
      break;

    case "reorder":
      const taskId = action.data.taskId;
      const currentIndex = APP_STATE.taskData.findIndex(
        (task) => task.id === taskId
      );

      if (currentIndex !== -1) {
        const [task] = APP_STATE.taskData.splice(currentIndex, 1);
        APP_STATE.taskData.splice(action.data.oldIndex, 0, task);
      }
      break;
  }

  updateUndoRedoButtons();
  saveToLocalStorage();
  applyFilters();
};

const redo = () => {
  if (APP_STATE.redoStack.length === 0) return;

  const action = APP_STATE.redoStack.pop();
  APP_STATE.undoStack.push(action);

  switch (action.actionType) {
    case "add":
      APP_STATE.taskData.unshift(action.data.task);
      break;

    case "edit":
      const editedTaskIndex = APP_STATE.taskData.findIndex(
        (task) => task.id === action.data.newTask.id
      );
      if (editedTaskIndex !== -1)
        APP_STATE.taskData[editedTaskIndex] = action.data.newTask;
      break;

    case "delete":
      const deleteTaskIndex = APP_STATE.taskData.findIndex(
        (task) => task.id === action.data.task.id
      );
      if (deleteTaskIndex !== -1) APP_STATE.taskData.splice(deleteTaskIndex, 1);
      break;

    case "reorder":
      const taskId = action.data.taskId;
      const currentIndex = APP_STATE.taskData.findIndex(
        (task) => task.id === taskId
      );

      if (currentIndex !== -1) {
        const [task] = APP_STATE.taskData.splice(currentIndex, 1);
        APP_STATE.taskData.splice(action.data.newIndex, 0, task);
      }
      break;
  }

  updateUndoRedoButtons();
  saveToLocalStorage();
  applyFilters();
};

openTaskFormBtn.addEventListener("click", () => {
  taskForm.classList.remove("hidden");
});

closeTaskFormBtn.addEventListener("click", () => {
  const formInputsContainValues =
    titleInput.value || dateInput.value || descriptionInput.value;
  const formInputValuesUpdated =
    titleInput.value !== (APP_STATE.currentTask.title || "") ||
    dateInput.value !== (APP_STATE.currentTask.date || "") ||
    descriptionInput.value !== (APP_STATE.currentTask.description || "") ||
    categoryInput.value !== (APP_STATE.currentTask.category || "work") ||
    priorityInput.value !== (APP_STATE.currentTask.priority || "low") ||
    statusInput.value !== (APP_STATE.currentTask.status || "not-started");

  if (formInputsContainValues && formInputValuesUpdated) {
    confirmCloseDialog.showModal();
  } else {
    reset();
  }
});

cancelBtn.addEventListener("click", () => {
  confirmCloseDialog.close();
});

discardBtn.addEventListener("click", () => {
  confirmCloseDialog.close();
  reset();
});

closeDetailsBtn.addEventListener("click", () => {
  taskDetailsDialog.close();
});

detailsCloseBtn.addEventListener("click", () => {
  taskDetailsDialog.close();
});

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addOrUpdateTask();
});

searchInput.addEventListener("input", () => {
  APP_STATE.filters.search = searchInput.value;
  applyFilters();
});

searchBtn.addEventListener("click", () => {
  applyFilters();
});

filterCategory.addEventListener("change", () => {
  APP_STATE.filters.category = filterCategory.value;
  applyFilters();
});

filterPriority.addEventListener("change", () => {
  APP_STATE.filters.priority = filterPriority.value;
  applyFilters();
});

filterStatus.addEventListener("change", () => {
  APP_STATE.filters.status = filterStatus.value;
  applyFilters();
});

undoBtn.addEventListener("click", undo);
redoBtn.addEventListener("click", redo);

themeToggleCheckbox.addEventListener("change", () => {
  APP_STATE.isDarkTheme = themeToggleCheckbox.checked;
  applyTheme(APP_STATE.isDarkTheme);
  saveToLocalStorage();
});

initializeApp();
