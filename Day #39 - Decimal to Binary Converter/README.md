# Decimal to Binary Converter

![Decimal to Binary Converter](../assets/project-screenshots/decimal-to-binary-converter.webp)

## 📝 Overview

The Decimal to Binary Converter is an interactive web application that demonstrates how recursion works in the process of converting decimal numbers to their binary representation. This project not only provides the binary equivalent of a decimal number but also visualizes the recursive call stack animation, making it an excellent educational tool.

## ✨ Features

- **Decimal to Binary Conversion**: Convert any positive decimal number to binary
- **Visual Call Stack Animation**: See how recursion works for number 5 with step-by-step visualization
- **Interactive UI**: Modern, responsive interface with smooth transitions
- **Error Handling**: Clear feedback for invalid inputs
- **Simplified Conversion Steps**: Visual representation of the conversion algorithm
- **Accessibility**: Built with accessibility features for inclusive user experience

## 🛠️ Technologies Used

- HTML5
- CSS3 (with CSS variables for theming)
- JavaScript (ES6+)
- Responsive Design

## 💻 How to Run Locally

1. Clone the repository:

```bash
git clone https://github.com/your-username/decimal-to-binary-converter.git
```

2. Navigate to the project directory:

```bash
cd decimal-to-binary-converter/Day\ \#39
```

3. Open `index.html` in your web browser.

No build process or dependencies are required; this is a standalone web application.

## 🧠 How It Works

1. The user enters a decimal number in the input field.
2. When the "Convert" button is clicked (or Enter is pressed), the application:

   - Validates the input to ensure it's a non-negative number
   - Uses a recursive function to convert the decimal number to binary
   - Displays the result
   - Shows a visualization of the conversion process

3. For the special case of number 5, an animated call stack demonstration shows:

   - The recursive function calls
   - How values are returned up the stack
   - The building of the final binary result

4. The recursive algorithm follows these steps:
   - If the number is 0 or 1, return the number as a string (base case)
   - Otherwise, divide the number by 2, recursively convert the quotient, and append the remainder

## 📂 Project Structure

```
Day #39/
├── index.html      # Main HTML document
├── style.css       # CSS styles with modern theming
├── script.js       # JavaScript with conversion logic and animation
└── README.md       # Project documentation
```

## 🔮 Future Improvements

- Add ability to convert from binary back to decimal
- Implement conversion to other number systems (octal, hexadecimal)
- Create additional visualization modes for the conversion process
- Add the option to adjust animation speed
- Implement dark/light theme toggle
- Create sharable links for specific conversions

## 📱 Responsive Design

The application is fully responsive and works well on:

- Desktop computers
- Tablets
- Mobile phones

The layout adjusts dynamically based on screen size for the best user experience.

## ⚙️ Compatibility

- Chrome, Firefox, Safari, Edge (latest versions)
- Internet Explorer is not supported

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Created with ❤️ as part of the 100 Days of JavaScript challenge.
