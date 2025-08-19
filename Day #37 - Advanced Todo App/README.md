# Advanced Todo App

A professional task management application built with vanilla JavaScript, featuring a sleek dark theme UI and advanced functionality using only frontend technologies (HTML, CSS, and JavaScript).

## 🚀 Features

- **Task Categories**: Organize tasks by work, personal, shopping, health, education, or other categories
- **Priority Levels**: Set high, medium, or low priorities with visual indicators
- **Task Progress**: Track status as not started, in progress, or completed
- **Due Dates**: Set and monitor task deadlines
- **Search & Filter**: Find tasks quickly using search or filter by category, priority, or status
- **Drag & Drop**: Reorder tasks with intuitive drag and drop functionality
- **Undo & Redo**: Recover from mistakes with full undo/redo support for all actions
- **Task Details**: View comprehensive task information in a modal dialog
- **Dark/Light Theme**: Toggle between professionally designed dark and light themes
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Advanced LocalStorage**: Persistent data with autosave, versioning, and data integrity

## 📋 Usage Guide

1. **Adding Tasks**: Click "New Task" button to open the form. Fill in the details and submit.
2. **Editing Tasks**: Click "Edit" on any task or click the task itself to view details.
3. **Deleting Tasks**: Click "Delete" on any task you want to remove.
4. **Filtering**: Use the filter dropdowns to narrow down tasks by category, priority, or status.
5. **Searching**: Type in the search box to find tasks by title or description.
6. **Changing Order**: Drag and drop tasks to rearrange their order.
7. **Undo/Redo**: Use the undo/redo buttons to revert or replay changes.
8. **Switching Themes**: Toggle between dark and light themes using the theme switch.

## 💻 Technical Implementation

The app is built using clean, modular JavaScript with a focus on performance and maintainability:

- **State Management**: Uses a centralized app state to track tasks, history, filters, and UI state
- **Rendering System**: DOM-based render functions for optimal performance
- **Event Delegation**: Efficient event handling for dynamic elements
- **Data Persistence**: Enhanced localStorage with versioning and auto-saving
- **Action History**: Full undo/redo stack with action types and serialized data
- **Drag & Drop API**: Native HTML5 drag and drop implementation
- **Custom Components**: Modular UI components built with vanilla JavaScript
- **CSS Variables**: Theme-aware styling with custom properties
- **Responsive Design**: Flexbox and grid-based layouts that adapt to any screen size

## 🔧 Setup Instructions

1. Simply open the `index.html` file in your web browser.
2. No additional dependencies or backend required.
3. Data will be saved automatically to your browser's localStorage.

## 🔍 Code Structure

- `index.html`: Core HTML structure with semantic elements
- `style.css`: CSS styling with variables for theming
- `script.js`: JavaScript application logic, organized in functions

## 🛠️ Future Enhancements

Possible improvements for future versions:

- Export/import data to JSON or CSV
- Task recurrence options
- Subtasks and dependencies
- Task labels and tagging
- Data synchronization with cloud storage
- Notification system for upcoming due dates
- Performance optimizations for large task collections
- Keyboard shortcuts for power users
