// DOM Elements
const colorInput = document.getElementById("color");
const generateBtn = document.getElementById("generate");
const copyBtn = document.getElementById("copy");
const colorPreview = document.getElementById("colorPreview");
const toast = document.getElementById("toast");
const body = document.body;
const colorPalette = document.getElementById("colorPalette");
const paletteButtons = document.querySelectorAll(".palette-btn");

// Current active palette type
let activePaletteType = "complementary";

// Array of predefined colors for random generation
const colors = [
  "#4a6cf7", // Primary
  "#6b7cff", // Secondary
  "#f44336", // Red
  "#e91e63", // Pink
  "#9c27b0", // Purple
  "#673ab7", // Deep Purple
  "#3f51b5", // Indigo
  "#2196f3", // Blue
  "#03a9f4", // Light Blue
  "#00bcd4", // Cyan
  "#009688", // Teal
  "#4caf50", // Green
  "#8bc34a", // Light Green
  "#cddc39", // Lime
  "#ffeb3b", // Yellow
  "#ffc107", // Amber
  "#ff9800", // Orange
  "#ff5722", // Deep Orange
  "#795548", // Brown
  "#607d8b", // Blue Grey
];

// Initialize the application
function init() {
  // Create toast element if it doesn't exist
  if (!toast) {
    createToastElement();
  }

  // Set a default color on load
  const defaultColor = colors[0];
  colorInput.value = defaultColor;
  updateColorPreview(defaultColor);
  updateBackgroundColor(defaultColor);
  generateColorPalette(defaultColor);

  // Event Listeners
  generateBtn.addEventListener("click", generateRandomColor);
  copyBtn.addEventListener("click", copyColorToClipboard);
  colorInput.addEventListener("input", handleColorInputChange);

  // Add event listeners to palette type buttons
  paletteButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons
      paletteButtons.forEach((b) => b.classList.remove("active"));

      // Add active class to clicked button
      btn.classList.add("active");

      // Update active palette type
      activePaletteType = btn.dataset.type;

      // Generate new palette with current color
      generateColorPalette(colorInput.value);
    });
  });

  // Add keydown event for pressing Enter in the input
  colorInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      updateColorPreview(colorInput.value);
    }
  });
}

// Create toast element if it doesn't exist
function createToastElement() {
  const toastElement = document.createElement("div");
  toastElement.id = "toast";
  toastElement.className = "toast";
  toastElement.textContent = "Color copied to clipboard!";
  document.body.appendChild(toastElement);
  // Update the toast variable
  toast = document.getElementById("toast");
}

// Generate and display a random color
function generateRandomColor() {
  const randomIndex = Math.floor(Math.random() * colors.length);
  const randomColor = colors[randomIndex];

  colorInput.value = randomColor;
  updateColorPreview(randomColor);

  // Apply a subtle animation to the color preview
  colorPreview.style.transform = "scale(1.05)";
  setTimeout(() => {
    colorPreview.style.transform = "scale(1)";
  }, 300);
}

// Update the color preview based on input
function updateColorPreview(color) {
  try {
    // Attempt to set the background color
    colorPreview.style.backgroundColor = color;

    // If successful, add a border that complements the color
    colorPreview.style.borderColor = "var(--border-color)";

    // Reset error styling if it was previously applied
    colorInput.style.borderColor = "var(--border-color)";
    colorInput.style.boxShadow = "none";

    // Update the background color as well
    updateBackgroundColor(color);

    // Generate palette based on this color
    generateColorPalette(color);
  } catch (error) {
    // If the color is invalid, show an error state
    colorPreview.style.backgroundColor = "#ffffff";
    colorPreview.style.borderColor = "#f44336";

    // Apply error styling to the input
    colorInput.style.borderColor = "#f44336";
    colorInput.style.boxShadow = "0 0 0 3px rgba(244, 67, 54, 0.2)";
  }
}

// Generate color palette based on the selected color and palette type
function generateColorPalette(baseColor) {
  try {
    // Clear current palette
    colorPalette.innerHTML = "";

    // Convert the base color to HSL for easier manipulation
    const hsl = hexToHSL(baseColor);
    if (!hsl) return;

    let paletteColors = [];

    // Generate different palette types
    switch (activePaletteType) {
      case "complementary":
        paletteColors = generateComplementaryPalette(hsl);
        break;
      case "analogous":
        paletteColors = generateAnalogousPalette(hsl);
        break;
      case "triadic":
        paletteColors = generateTriadicPalette(hsl);
        break;
      case "monochromatic":
        paletteColors = generateMonochromaticPalette(hsl);
        break;
      default:
        paletteColors = generateComplementaryPalette(hsl);
    }

    // Create swatches for each color
    paletteColors.forEach((color) => {
      const swatch = document.createElement("div");
      swatch.className = "color-swatch";
      swatch.style.backgroundColor = color;

      // Add color info that appears on hover
      const swatchInfo = document.createElement("div");
      swatchInfo.className = "color-swatch-info";
      swatchInfo.textContent = color;
      swatch.appendChild(swatchInfo);

      // Add click event to copy color
      swatch.addEventListener("click", () => {
        copyToClipboard(color);
        showToast(`Color ${color} copied!`);
      });

      colorPalette.appendChild(swatch);
    });
  } catch (error) {
    console.error("Error generating palette:", error);
  }
}

// Generate complementary color palette (base + complement + variations)
function generateComplementaryPalette(hsl) {
  const palette = [];

  // Add a lighter version of the base color
  palette.push(hslToHex(hsl.h, hsl.s, Math.min(hsl.l + 20, 95)));

  // Add base color
  palette.push(hslToHex(hsl.h, hsl.s, hsl.l));

  // Add a darker version of the base color
  palette.push(hslToHex(hsl.h, hsl.s, Math.max(hsl.l - 20, 15)));

  // Add complementary color (opposite hue)
  const complementHue = (hsl.h + 180) % 360;
  palette.push(hslToHex(complementHue, hsl.s, hsl.l));

  // Add a variation of the complementary color
  palette.push(
    hslToHex(complementHue, Math.min(hsl.s + 10, 100), Math.max(hsl.l - 10, 20))
  );

  return palette;
}

// Generate analogous color palette (colors next to each other on the color wheel)
function generateAnalogousPalette(hsl) {
  const palette = [];

  // Add colors with hues before the base color
  palette.push(hslToHex((hsl.h - 40 + 360) % 360, hsl.s, hsl.l));
  palette.push(hslToHex((hsl.h - 20 + 360) % 360, hsl.s, hsl.l));

  // Add base color
  palette.push(hslToHex(hsl.h, hsl.s, hsl.l));

  // Add colors with hues after the base color
  palette.push(hslToHex((hsl.h + 20) % 360, hsl.s, hsl.l));
  palette.push(hslToHex((hsl.h + 40) % 360, hsl.s, hsl.l));

  return palette;
}

// Generate triadic color palette (three colors evenly spaced on the color wheel)
function generateTriadicPalette(hsl) {
  const palette = [];

  // First triadic color
  const triad1 = (hsl.h + 120) % 360;
  palette.push(hslToHex(triad1, hsl.s, hsl.l));
  palette.push(
    hslToHex(triad1, Math.max(hsl.s - 10, 0), Math.min(hsl.l + 10, 90))
  );

  // Base color
  palette.push(hslToHex(hsl.h, hsl.s, hsl.l));

  // Second triadic color
  const triad2 = (hsl.h + 240) % 360;
  palette.push(
    hslToHex(triad2, Math.max(hsl.s - 10, 0), Math.min(hsl.l + 10, 90))
  );
  palette.push(hslToHex(triad2, hsl.s, hsl.l));

  return palette;
}

// Generate monochromatic color palette (variations of the same hue)
function generateMonochromaticPalette(hsl) {
  const palette = [];

  // Lightest shade
  palette.push(
    hslToHex(hsl.h, Math.max(hsl.s - 30, 0), Math.min(hsl.l + 30, 95))
  );

  // Light shade
  palette.push(
    hslToHex(hsl.h, Math.max(hsl.s - 15, 0), Math.min(hsl.l + 15, 85))
  );

  // Base color
  palette.push(hslToHex(hsl.h, hsl.s, hsl.l));

  // Dark shade
  palette.push(
    hslToHex(hsl.h, Math.min(hsl.s + 15, 100), Math.max(hsl.l - 15, 20))
  );

  // Darkest shade
  palette.push(
    hslToHex(hsl.h, Math.min(hsl.s + 30, 100), Math.max(hsl.l - 30, 10))
  );

  return palette;
}

// Convert hex to HSL color format
function hexToHSL(hex) {
  // Get RGB values
  const rgb = hexToRgb(hex);
  if (!rgb) return null;

  // Convert RGB to HSL
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;

  if (max === min) {
    // Achromatic
    h = 0;
    s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h *= 60;
  }

  return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
}

// Convert HSL to hex color format
function hslToHex(h, s, l) {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r, g, b;

  if (h >= 0 && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (h >= 60 && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (h >= 180 && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (h >= 240 && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else {
    r = c;
    g = 0;
    b = x;
  }

  r = Math.round((r + m) * 255)
    .toString(16)
    .padStart(2, "0");
  g = Math.round((g + m) * 255)
    .toString(16)
    .padStart(2, "0");
  b = Math.round((b + m) * 255)
    .toString(16)
    .padStart(2, "0");

  return `#${r}${g}${b}`;
}

// Update the background color of the page
function updateBackgroundColor(color) {
  try {
    // Create a color object that works with any valid CSS color
    let colorObj;

    // If it's a hex color, use the hexToRgb function
    if (color.startsWith("#")) {
      colorObj = hexToRgb(color);
    }

    // Create a visually appealing gradient background based on the color
    if (isValidColor(color)) {
      // Create a gradient with the color at low opacity
      const gradientColor1 = color + "15"; // 10% opacity
      const gradientColor2 = color + "30"; // 20% opacity

      // Apply the gradient
      body.style.background = `linear-gradient(135deg, ${gradientColor1}, ${gradientColor2})`;

      // Add a subtle animated gradient effect
      const container = document.querySelector(".container");
      if (container) {
        container.style.boxShadow = `0 10px 30px ${color}40`;
      }

      // Adjust header and footer for better contrast
      const header = document.querySelector(".header");
      const footer = document.querySelector(".footer");

      if (header && footer) {
        // Keep the header and footer with their blur effect but add a slight color tint
        header.style.backgroundColor = `rgba(255, 255, 255, 0.85)`;
        footer.style.backgroundColor = `rgba(255, 255, 255, 0.85)`;
      }
    } else {
      // Fallback to default
      resetBackgroundToDefault();
    }
  } catch (error) {
    // If there's an error, fallback to the default background
    resetBackgroundToDefault();
  }
}

// Reset background to default
function resetBackgroundToDefault() {
  body.style.backgroundColor = "var(--light-color)";
  body.style.backgroundImage = "none";

  const container = document.querySelector(".container");
  if (container) {
    container.style.boxShadow = `0 10px 30px var(--shadow-color)`;
  }

  const header = document.querySelector(".header");
  const footer = document.querySelector(".footer");

  if (header && footer) {
    header.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
    footer.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
  }
}

// Check if a color is valid CSS color
function isValidColor(color) {
  const tempElement = document.createElement("div");
  tempElement.style.color = color;
  return tempElement.style.color !== "";
}

// Helper function to convert hex to RGB
function hexToRgb(hex) {
  // Check if the color is in hex format
  const hexRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
  const result = hexRegex.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

// Handle changes to the color input
function handleColorInputChange(e) {
  updateColorPreview(e.target.value);
}

// Generic function to copy text to clipboard
function copyToClipboard(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).catch((err) => {
      console.error("Could not copy text: ", err);
      fallbackCopyMethod(text);
    });
  } else {
    fallbackCopyMethod(text);
  }
}

// Copy the current color to clipboard
function copyColorToClipboard() {
  const colorValue = colorInput.value;

  // Check if the color input has a value
  if (colorValue.trim() !== "") {
    // Method 1: Using Clipboard API (Modern browsers)
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(colorValue)
        .then(() => {
          showToast();
        })
        .catch((err) => {
          console.error("Could not copy text: ", err);
          // Fallback to method 2 if clipboard API fails
          fallbackCopyMethod(colorValue);
        });
    } else {
      // Method 2: Fallback for browsers without clipboard API
      fallbackCopyMethod(colorValue);
    }
  }
}

// Fallback copy method using document.execCommand
function fallbackCopyMethod(text) {
  try {
    // Create a temporary input element
    const tempInput = document.createElement("textarea");
    tempInput.value = text;

    // Make sure it's invisible
    tempInput.style.position = "absolute";
    tempInput.style.left = "-9999px";

    // Add to DOM, select and execute copy command
    document.body.appendChild(tempInput);
    tempInput.select();

    const successful = document.execCommand("copy");
    document.body.removeChild(tempInput);

    if (successful) {
      showToast(`Color ${text} copied!`);
    } else {
      console.error("Fallback copy method failed");
    }
  } catch (err) {
    console.error("Fallback copy method failed:", err);
  }
}

// Display a toast notification
function showToast(message = null) {
  if (!toast) {
    createToastElement();
  }

  // Set the message
  if (message) {
    toast.textContent = message;
  } else {
    toast.textContent = `Color "${colorInput.value}" copied to clipboard!`;
  }

  // Show the toast
  toast.classList.add("show");

  // Hide after 3 seconds
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// Initialize the app when the DOM is loaded
document.addEventListener("DOMContentLoaded", init);
