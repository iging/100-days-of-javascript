const colorPalette = [
  "#2C3E50",
  "#34495E",
  "#2C2C2C",
  "#616A6B",
  "#4A235A",
  "#2F4F4F",
  "#0E4B5A",
  "#36454F",
  "#2C3E50",
  "#800020",
  "#1A1A2E",
  "#16213E",
  "#0F3460",
  "#1A1A40",
  "#210B61",
  "#0B0C10",
  "#1F2833",
  "#252A34",
  "#1B1B2F",
  "#28282B",
];

const body = document.body;
const appContainer = document.querySelector(".app-container");
const bgHexCode = document.querySelector("#bg-hex-code");
const colorPreview = document.querySelector("#color-preview");
const changeBtn = document.querySelector("#change-btn");
const copyBtn = document.querySelector("#copy-btn");
const generatePaletteBtn = document.querySelector("#generate-palette-btn");
const paletteContainer = document.querySelector("#palette-container");
const colorPaletteEl = document.querySelector("#color-palette");
const historyColorsEl = document.querySelector("#history-colors");
const toast = document.querySelector("#toast");

let currentColor = "#110815";
let colorHistory = [];
const maxHistoryItems = 8;

function initialize() {
  setColor(currentColor);
  setupEventListeners();
}

function setupEventListeners() {
  changeBtn.addEventListener("click", changeColor);
  copyBtn.addEventListener("click", copyColorToClipboard);
  generatePaletteBtn.addEventListener("click", generateColorPalette);
  historyColorsEl.addEventListener("click", handleHistoryClick);
  colorPaletteEl.addEventListener("click", handlePaletteClick);
}

function getRandomColor() {
  if (Math.random() > 0.5) {
    return colorPalette[Math.floor(Math.random() * colorPalette.length)];
  } else {
    return generateRandomHex();
  }
}

function generateRandomHex() {
  const hexChars = "0123456789ABCDEF";
  let hex = "#";

  for (let i = 0; i < 6; i++) {
    hex += hexChars[Math.floor(Math.random() * 16)];
  }

  return hex;
}

function setColor(color) {
  currentColor = color;
  colorPreview.style.backgroundColor = color;
  bgHexCode.textContent = color;
  bgHexCode.style.color = getContrastColor(color);

  addToHistory(color);
  updateHistoryDisplay();
}

function changeColor() {
  const newColor = getRandomColor();
  setColor(newColor);

  colorPreview.classList.add("animate");
  setTimeout(() => colorPreview.classList.remove("animate"), 500);
}

function getShades(baseColor, count = 5) {
  const shades = [];

  const hex = baseColor.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  for (let i = 0; i < count; i++) {
    const factor = 0.8 - i * 0.15;

    const newR = Math.min(255, Math.floor(r * factor));
    const newG = Math.min(255, Math.floor(g * factor));
    const newB = Math.min(255, Math.floor(b * factor));

    const newHex =
      "#" +
      newR.toString(16).padStart(2, "0") +
      newG.toString(16).padStart(2, "0") +
      newB.toString(16).padStart(2, "0");

    shades.push(newHex);
  }

  return shades;
}

function getHarmonious(baseColor, count = 5) {
  const colors = [baseColor];

  const hex = baseColor.replace("#", "");
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  const step = 360 / count;

  for (let i = 1; i < count; i++) {
    const hsv = rgbToHsv(r, g, b);
    hsv.h = (hsv.h + step * i) % 360;

    const rgb = hsvToRgb(hsv.h, hsv.s, hsv.v);
    const newHex =
      "#" +
      rgb.r.toString(16).padStart(2, "0") +
      rgb.g.toString(16).padStart(2, "0") +
      rgb.b.toString(16).padStart(2, "0");

    colors.push(newHex);
  }

  return colors;
}

function rgbToHsv(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h,
    s,
    v = max;

  const d = max - min;
  s = max === 0 ? 0 : d / max;

  if (max === min) {
    h = 0;
  } else {
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
    h /= 6;
  }

  return { h: h * 360, s, v };
}

function hsvToRgb(h, s, v) {
  h /= 360;
  let r, g, b;

  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0:
      r = v;
      g = t;
      b = p;
      break;
    case 1:
      r = q;
      g = v;
      b = p;
      break;
    case 2:
      r = p;
      g = v;
      b = t;
      break;
    case 3:
      r = p;
      g = q;
      b = v;
      break;
    case 4:
      r = t;
      g = p;
      b = v;
      break;
    case 5:
      r = v;
      g = p;
      b = q;
      break;
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

function generateColorPalette() {
  paletteContainer.classList.add("show");
  colorPaletteEl.innerHTML = "";

  const type = Math.random() > 0.5 ? "shades" : "harmonious";
  const colors =
    type === "shades"
      ? getShades(currentColor, 8)
      : getHarmonious(currentColor, 8);

  colors.forEach((color) => {
    const colorEl = document.createElement("div");
    colorEl.className = "palette-color";
    colorEl.style.backgroundColor = color;

    const colorCode = document.createElement("div");
    colorCode.className = "palette-color-code";
    colorCode.textContent = color;

    colorEl.appendChild(colorCode);
    colorEl.dataset.color = color;

    colorPaletteEl.appendChild(colorEl);
  });
}

function getContrastColor(hexColor) {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);

  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  return brightness > 128 ? "#000000" : "#FFFFFF";
}

function addToHistory(color) {
  if (colorHistory.includes(color)) {
    colorHistory = colorHistory.filter((c) => c !== color);
  }

  colorHistory.unshift(color);

  if (colorHistory.length > maxHistoryItems) {
    colorHistory.pop();
  }
}

function updateHistoryDisplay() {
  historyColorsEl.innerHTML = "";

  colorHistory.forEach((color) => {
    const colorEl = document.createElement("div");
    colorEl.className = "history-color";
    colorEl.style.backgroundColor = color;
    colorEl.dataset.color = color;
    colorEl.title = color;

    historyColorsEl.appendChild(colorEl);
  });
}

function copyColorToClipboard() {
  navigator.clipboard
    .writeText(currentColor)
    .then(() => showToast())
    .catch((err) => console.error("Could not copy color: ", err));
}

function showToast() {
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}

function handleHistoryClick(event) {
  if (event.target.classList.contains("history-color")) {
    setColor(event.target.dataset.color);
  }
}

function handlePaletteClick(event) {
  if (event.target.classList.contains("palette-color")) {
    setColor(event.target.dataset.color);
  }
}

document.addEventListener("DOMContentLoaded", initialize);
