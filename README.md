# 49 Days of JavaScript Projects

A comprehensive collection of 49 progressively complex web applications demonstrating modern JavaScript development patterns, from vanilla JavaScript fundamentals to advanced React applications with state management.

## 🎯 Project Overview

This repository serves as a complete learning path and reference implementation for JavaScript developers at all levels. Each project is self-contained, production-ready, and demonstrates specific programming concepts, design patterns, and best practices. The collection spans from simple DOM manipulation exercises to complex single-page applications with external API integrations, state management, and advanced UI patterns.

**Target Audience:** JavaScript learners, bootcamp students, self-taught developers, and anyone looking to build a strong portfolio of practical web applications.

## ✨ Key Features

- **49 Complete Projects**: Each with full source code, documentation, and working implementations
- **Progressive Complexity**: Structured learning path from beginner to advanced concepts
- **Multiple Tech Stacks**: Vanilla JavaScript, React, Node.js, and modern tooling
- **Real-World Applications**: Games, utilities, productivity tools, and API integrations
- **Responsive Design**: Mobile-first approach with Tailwind CSS and custom styling
- **Local Storage Integration**: Persistent data across multiple applications
- **External API Integration**: Weather data, superhero information, and more
- **Modern Development Practices**: ES6+, component architecture, hooks, and state management
- **Production-Ready Code**: Clean, documented, and maintainable implementations

## 🛠️ Tech Stack

### Core Technologies

- **JavaScript (ES6+)**: Modern syntax, async/await, destructuring, modules
- **HTML5**: Semantic markup, Canvas API, Web APIs
- **CSS3**: Flexbox, Grid, animations, transitions

### React Ecosystem

- **React 18.3.1 / 19.0.0**: Functional components, hooks, context
- **React DOM**: Virtual DOM rendering and reconciliation
- **React Icons**: Comprehensive icon library

### State Management

- **Zustand**: Lightweight state management (Music Player)
- **Local Storage**: Client-side persistence
- **React Hooks**: useState, useEffect, useRef, custom hooks

### Styling Frameworks

- **Tailwind CSS 3.4.17 / 4.x**: Utility-first CSS framework
- **Material-UI (MUI)**: Component library with Emotion styling
- **Custom CSS**: Hand-crafted styles for specific projects

### Build Tools & Development

- **Vite 6.x**: Next-generation frontend tooling
- **ESLint**: Code quality and consistency
- **PostCSS**: CSS transformations
- **Autoprefixer**: Vendor prefix automation

### Backend & APIs

- **Express.js**: Lightweight Node.js server (Face Detector)
- **OpenWeatherMap API**: Real-time weather data
- **Superhero API**: Character information database
- **Bootstrap 5.3.3**: UI framework for specific projects

### Game Development

- **p5.js**: Creative coding library (Tetris)
- **Canvas API**: 2D graphics rendering
- **Web Audio API**: Sound effects and music playback

## 📦 Installation & Setup

### Prerequisites

```bash
# Node.js 16+ and npm required for React projects
node --version
npm --version
```

### Clone the Repository

```bash
git clone https://github.com/iging/49-days-javascript-projects.git
cd 49-days-javascript-projects
```

### Running Vanilla JavaScript Projects

Projects using only HTML, CSS, and JavaScript can be opened directly:

```bash
# Navigate to any vanilla JS project
cd "Day #01 - New Year Countdown"

# Open index.html in your browser
# Windows
start index.html

# macOS
open index.html

# Linux
xdg-open index.html
```

### Running React Projects

React projects require dependency installation:

```bash
# Navigate to a React project
cd "Day #05 - Calculator"

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Running Node.js Projects

```bash
# Navigate to Node.js project
cd "Day #15 - Face Detector"

# Install dependencies
npm install

# Start server
npm start
```

### Environment Variables

Some projects require API keys:

```bash
# Day #06 - Weather Application
# Create .env file in project root
VITE_API_KEY=your_openweathermap_api_key

# Day #12 - Superhero Search
# API key embedded in script.js (replace with your own)
```

## 🎮 Usage

### Project Categories

#### **Beginner Projects (Days 1-10)**

Simple DOM manipulation, event handling, and basic algorithms:

- New Year Countdown: Date manipulation and interval timers
- Analog & Digital Clock: Real-time updates and canvas drawing
- Snake Game: Game loop and collision detection
- BMI Calculator: Form handling and calculations

#### **Intermediate Projects (Days 11-25)**

API integration, local storage, and component architecture:

- Weather Application: Geolocation API, fetch requests, conditional rendering
- To Do List: CRUD operations, localStorage persistence
- Tic Tac Toe: Game state management, win condition algorithms
- Superhero Search: External API integration, dynamic content

#### **Advanced Projects (Days 26-49)**

Complex state management, advanced algorithms, and full-featured applications:

- 2048 Game: Matrix manipulation, game logic, animations
- Tetris Game: Collision detection, rotation algorithms, scoring system
- Spreadsheet: Formula evaluation, cell references, data structures
- Advanced Todo App: Drag-and-drop, undo/redo, filtering, theming

### Example: Running the Weather Application

```bash
cd "Day #06 - Weather Application"
npm install

# Create .env file
echo "VITE_API_KEY=your_api_key_here" > .env

npm run dev
# Open http://localhost:5173
```

The application will:

1. Request geolocation permission
2. Fetch weather data for your location
3. Display temperature, humidity, wind speed
4. Allow searching for other cities
5. Show appropriate weather icons based on conditions

### Example: Using the Advanced Todo App

```bash
cd "Day #37 - Advanced Todo App"
# Open index.html in browser
```

Features demonstrated:

- **Add Tasks**: Title, description, category, priority, status, due date
- **Filter & Search**: Multi-criteria filtering with live search
- **Drag & Drop**: Reorder tasks by dragging
- **Undo/Redo**: Full action history with state restoration
- **Dark Mode**: Theme toggle with localStorage persistence
- **Auto-Save**: Periodic data persistence every 30 seconds

## 🏗️ Architecture Brief

### Project Structure Patterns

#### Vanilla JavaScript Projects

```
Day #XX - Project Name/
├── index.html          # Entry point with semantic HTML
├── style.css           # Custom styling and animations
├── script.js           # Application logic and DOM manipulation
├── README.md           # Project-specific documentation
└── assets/             # Images, sounds, fonts (if needed)
```

**Architecture**: Event-driven with direct DOM manipulation. State managed through closures and global variables. Modular functions for separation of concerns.

#### React Projects (Vite)

```
Day #XX - Project Name/
├── public/             # Static assets
├── src/
│   ├── components/     # Reusable React components
│   ├── assets/         # Images, icons, media
│   ├── data/           # Constants, configuration
│   ├── App.jsx         # Root component
│   ├── main.jsx        # React DOM entry point
│   └── index.css       # Global styles
├── index.html          # HTML template
├── package.json        # Dependencies and scripts
├── vite.config.js      # Vite configuration
├── tailwind.config.js  # Tailwind customization
└── eslint.config.js    # Linting rules
```

**Architecture**: Component-based with unidirectional data flow. Props for parent-child communication, hooks for state and side effects, context for global state (when needed).

### Data Flow Patterns

#### Vanilla JavaScript Example (New Year Countdown)

```
User loads page
    ↓
Initialize countdown target date
    ↓
setInterval (1000ms)
    ↓
Calculate time remaining
    ↓
Update DOM elements
    ↓
Check if countdown complete
    ↓
Display "Happy New Year" or continue loop
```

#### React Example (Weather Application)

```
App Component (State Container)
    ├── city (state)
    ├── weatherData (state)
    └── error (state)
    ↓
useEffect → fetchWeatherData()
    ↓
Geolocation API → getCurrentPosition()
    ↓
Fetch API → OpenWeatherMap
    ↓
Update weatherData state
    ↓
Conditional Rendering
    ├── Search Component (input handling)
    ├── Box Component (weather display)
    └── Data Component (humidity, wind)
```

#### Advanced State Management (Music Player with Zustand)

```
Zustand Store (Global State)
    ├── currentSong
    ├── isPlaying
    ├── playlist
    └── actions (play, pause, next, previous)
    ↓
Player Component subscribes to store
    ↓
User interaction (button click)
    ↓
Dispatch action to store
    ↓
Store updates state
    ↓
All subscribed components re-render
```

### Component Interaction Patterns

#### Props Down, Events Up (Todo List)

```
Todo (Parent)
    ├── State: todoList, inputRef
    ├── Methods: add(), deleteTodo(), toggle()
    └── Props passed to Items Component
        ↓
Items (Child)
    ├── Receives: text, id, isComplete, deleteTodo, toggle
    ├── Renders: Individual todo item
    └── Emits: onClick events to parent methods
```

#### Composition Pattern (Weather Application)

```
App
├── Search (user input + actions)
├── Box (main weather display)
│   ├── City name
│   ├── Weather icon
│   ├── Temperature
│   └── Description
└── Data (additional metrics)
    ├── Humidity
    └── Wind speed
```

### State Management Strategies

1. **Local Component State**: Simple projects use useState for isolated state
2. **Lifted State**: Shared state lifted to common ancestor component
3. **Local Storage**: Persistent state across sessions (Todo apps, settings)
4. **Zustand**: Lightweight global state for complex applications
5. **Reducer Pattern**: Complex state transitions (Advanced Todo with undo/redo)

### API Integration Pattern

```javascript
// Centralized API configuration
const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = `https://api.service.com/endpoint`;

// Async data fetching with error handling
const fetchData = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    setData(processData(data));
  } catch (error) {
    setError({ msg: "Error message" });
  }
};

// Effect hook for initial load
useEffect(() => {
  fetchData();
}, []);
```

### Game Architecture (Tetris)

```
Game Loop (setInterval)
    ↓
Update Game State
    ├── fallingPiece.fall()
    ├── Check collisions
    ├── Update grid
    └── Check line completion
    ↓
Render Frame
    ├── Draw grid pieces
    ├── Draw falling piece
    ├── Draw UI (score, level)
    └── Draw next piece preview
    ↓
Handle Input
    ├── Keyboard events
    ├── Validate moves
    └── Update piece position/rotation
```

## 📚 Project Index

### Days 1-10: Fundamentals

1. **New Year Countdown** - Date manipulation, intervals, DOM updates
2. **Analog and Digital Clock** - Canvas API, trigonometry, real-time rendering
3. **Snake Game** - Game loop, collision detection, array manipulation
4. **Ping Pong Game** - Canvas animation, physics, sound integration
5. **Calculator** - React state, mathematical operations, UI design
6. **Weather Application** - API integration, geolocation, conditional rendering
7. **To Do List** - CRUD operations, localStorage, React hooks
8. **Tic Tac Toe Game** - Game logic, win conditions, state management
9. **BMI Calculator** - Form handling, calculations, result display
10. **Currency Converter** - API calls, real-time conversion, input validation

### Days 11-20: Intermediate Concepts

11. **BMR Calculator** - Complex calculations, form validation
12. **Superhero Search** - External API, dynamic content, error handling
13. **Expense Tracker** - Data persistence, calculations, filtering
14. **Typing Speed Test** - Timer logic, accuracy calculation, performance metrics
15. **Face Detector** - Node.js server, static file serving
16. **Quote Generator** - API integration, Bootstrap UI
17. **Password Generator** - Randomization, security patterns, clipboard API
18. **Image Color Picker** - Canvas manipulation, color extraction
19. **Tetris Game** - Complex game logic, rotation algorithms, p5.js
20. **Tip Calculator** - Mathematical operations, split calculations

### Days 21-30: Advanced Patterns

21. **Image Slider** - DOM manipulation, transitions, event handling
22. **Rock Paper Scissors Game** - Game logic, animations, score tracking
23. **Color Palette Generator** - Color theory, randomization, UI design
24. **Music Player App** - Audio API, Zustand state management, playlist
25. **Text Editor** - Content editable, formatting, localStorage
26. **2048 Game** - Matrix operations, merge logic, animations
27. **JSON Reader App** - File handling, JSON parsing, display
28. **Palindrome Checker** - String manipulation, algorithms
29. **Pyramid Generator** - Loops, pattern generation, visualization
30. **Gradebook App** - Data structures, calculations, statistics

### Days 31-40: Complex Applications

31. **Dragon Repeller** - RPG mechanics, inventory system, combat
32. **Background Color Generator** - Color manipulation, gradients
33. **Calorie Counter** - Form handling, calculations, data tracking
34. **Rock, Paper, Scissors, Lizard, Spock** - Extended game logic
35. **Date Formatter** - Date manipulation, formatting options
36. **Football Team Cards** - Data display, filtering, sorting
37. **Advanced Todo App** - Drag-drop, undo/redo, filtering, theming
38. **Advanced Music Player** - Playlist management, controls, visualization
39. **Decimal to Binary Converter** - Number systems, algorithms
40. **Roman Numeral Converter** - Conversion algorithms, validation

### Days 41-49: Expert Level

41. **Spam Filter** - Text analysis, pattern matching, classification
42. **Number Sorter** - Sorting algorithms, visualization
43. **Statistics Calculator** - Statistical functions, data analysis
44. **Spreadsheet** - Formula evaluation, cell references, complex state
45. **Shopping Cart** - E-commerce logic, cart management, totals
46. **Platformer Game** - Physics engine, collision detection, level design
47. **Dice Game** - Probability, game mechanics, animations
48. **Tech Writers Hub** - Content management, markdown support
49. **NBA Player Stats** - Data visualization, API integration, statistics

## 🤝 Contributing

Contributions are welcome! Each project is self-contained, making it easy to:

- Fix bugs or improve existing implementations
- Add new features to existing projects
- Improve documentation and code comments
- Optimize performance and accessibility
- Add new projects following the established patterns

## 📄 License

MIT License - Copyright (c) 2025 iging

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## 🎓 Learning Path Recommendations

### For Beginners

Start with Days 1-4 to understand:

- DOM manipulation and event handling
- Timers and intervals
- Basic game loops
- Canvas API fundamentals

### For Intermediate Developers

Focus on Days 5-25 to learn:

- React component architecture
- State management with hooks
- API integration patterns
- Local storage and persistence
- Modern build tools (Vite)

### For Advanced Developers

Explore Days 26-49 to master:

- Complex state management (Zustand)
- Advanced algorithms (game logic, formula evaluation)
- Drag-and-drop interactions
- Undo/redo patterns
- Performance optimization
- Production-ready application architecture

## 🔗 Resources

- **React Documentation**: https://react.dev
- **Vite Guide**: https://vitejs.dev
- **Tailwind CSS**: https://tailwindcss.com
- **MDN Web Docs**: https://developer.mozilla.org
- **OpenWeatherMap API**: https://openweathermap.org/api

---

**Built with ❤️ by iging** | [GitHub Repository](https://github.com/iging/49-days-javascript-projects)
