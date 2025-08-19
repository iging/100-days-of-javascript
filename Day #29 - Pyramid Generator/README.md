# Pyramid Generator

A modern web application that generates customizable text pyramids with an elegant dark theme UI.

![Pyramid Generator](../assets/js.png)

## 📝 Description

The Pyramid Generator is an interactive web tool that allows users to create customized ASCII art pyramids. It offers options for character selection, row count adjustment, and pyramid orientation, making it a versatile text art generator that's both fun and practical.

## 🔑 Features

- **Character Customization**: Select any character to create your pyramid
- **Adjustable Size**: Choose the number of rows (1-50) to control pyramid height
- **Orientation Options**: Toggle between normal and inverted pyramid styles
- **Real-time Preview**: See pyramid changes as you adjust settings
- **Copy Functionality**: Easily copy generated pyramids to clipboard
- **Responsive Design**: Works seamlessly across desktop and mobile devices

## 🛠️ Technical Implementation

The project consists of three main components:

- **HTML**: Structured interface with form controls and output display
- **CSS**: Modern dark theme with professional styling using CSS variables
- **JavaScript**: Dynamic pyramid generation with real-time updates

### Pyramid Generation Algorithm

The core pyramid generation algorithm:

1. Takes user input for character, rows, and orientation
2. Calculates proper spacing for each row to create the pyramid shape
3. Builds the pyramid row by row, managing spacing and character repetition
4. Handles orientation by either pushing rows to end (normal) or beginning (inverted)

## 📋 Usage

1. Select a character in the input field (default: "!")
2. Adjust the number of rows (1-50)
3. Toggle "Inverted Pyramid" checkbox if desired
4. Click "Generate" or simply change any input for real-time update
5. Use "Copy to Clipboard" button to copy the result

## 📊 Example Outputs

### Standard Pyramid (5 rows with "\*")

```
    *
   ***
  *****
 *******
*********
```

### Inverted Pyramid (5 rows with "+")

```
+++++++++
 +++++++
  +++++
   +++
    +
```

## 🧪 Technical Features

- Efficient DOM manipulation for real-time updates
- Modern Clipboard API with fallback for older browsers
- CSS animations for visual feedback
- Responsive design using CSS Grid and Flexbox
- Event delegation for optimal performance

## 🚀 Future Enhancements

- Additional pyramid patterns (hollow, stepped, etc.)
- Color customization options
- Save generated pyramids as images
- Multiple character patterns
- Social media sharing integration

## 📝 License

This project is part of the "100 Days of JavaScript" challenge and is licensed under the MIT License.
