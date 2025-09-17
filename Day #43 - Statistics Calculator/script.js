const formatNumber = (num, decimals = 2) => {
  if (num === null || num === undefined) return "N/A";
  // Check if the number is an integer to avoid unnecessary decimal places
  if (Number.isInteger(num)) return num.toString();
  // Format with specified decimal places otherwise
  return Number(num.toFixed(decimals)).toString();
};

const getMean = (array) => {
  if (!array.length) return null;
  const sum = array.reduce((acc, el) => acc + el, 0);
  return sum / array.length;
};

const getMedian = (array) => {
  if (!array.length) return null;
  const sorted = [...array].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);

  return sorted.length % 2 !== 0
    ? sorted[mid]
    : (sorted[mid - 1] + sorted[mid]) / 2;
};

const getMode = (array) => {
  if (!array.length) return null;

  const frequencyMap = array.reduce((acc, val) => {
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {});

  const maxFrequency = Math.max(...Object.values(frequencyMap));
  const modes = Object.keys(frequencyMap)
    .filter((key) => frequencyMap[key] === maxFrequency)
    .map(Number);

  // If all values appear the same number of times, there is no mode
  const allSameFrequency = Object.values(frequencyMap).every(
    (val) => val === maxFrequency
  );

  return allSameFrequency && array.length > 1 ? null : modes;
};

const getRange = (array) => {
  if (!array.length) return null;
  return Math.max(...array) - Math.min(...array);
};

const getVariance = (array) => {
  if (array.length < 2) return null;
  const mean = getMean(array);
  const squaredDiffs = array.map((num) => Math.pow(num - mean, 2));
  return getMean(squaredDiffs);
};

const getStandardDeviation = (array) => {
  if (array.length < 2) return null;
  const variance = getVariance(array);
  return Math.sqrt(variance);
};

const updateResult = (id, value) => {
  const element = document.getElementById(id);
  if (!element) return;

  if (
    value === null ||
    value === undefined ||
    (Array.isArray(value) && !value.length)
  ) {
    element.textContent = "N/A";
    return;
  }

  if (Array.isArray(value)) {
    element.textContent = value.map((v) => formatNumber(v)).join(", ");
  } else if (typeof value === "number") {
    element.textContent = formatNumber(value);
  } else {
    element.textContent = value;
  }
};

const showError = (message) => {
  const errorElement = document.getElementById("error");
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.style.display = "block";
    setTimeout(() => {
      errorElement.style.display = "none";
    }, 5000);
  }
};

const calculate = (event) => {
  if (event) event.preventDefault();

  const input = document.querySelector("#numbers").value.trim();
  if (!input) {
    showError("Please enter some numbers to calculate");
    return;
  }

  // Parse input into an array of numbers
  const numbers = input
    .split(",")
    .map((num) => num.trim())
    .filter(Boolean)
    .map(Number);

  // Validate input
  if (numbers.some(isNaN)) {
    showError("Please enter only valid numbers separated by commas");
    return;
  }

  if (numbers.length < 1) {
    showError("Please enter at least one valid number");
    return;
  }

  // Calculate statistics
  const results = {
    mean: getMean(numbers),
    median: getMedian(numbers),
    mode: getMode(numbers),
    range: getRange(numbers),
    variance: getVariance(numbers),
    standardDeviation: getStandardDeviation(numbers),
  };

  // Update the UI with results
  Object.entries(results).forEach(([key, value]) => {
    updateResult(key, value);
  });

  // Show results section if it was hidden
  const resultsSection = document.getElementById("results");
  if (resultsSection) {
    resultsSection.style.display = "block";
    resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("statsForm");
  if (form) {
    form.addEventListener("submit", calculate);
  }

  // Add input validation
  const numberInput = document.getElementById("numbers");
  if (numberInput) {
    numberInput.addEventListener("input", (e) => {
      // Basic input validation - allow only numbers, commas, and spaces
      e.target.value = e.target.value.replace(/[^0-9,\s]/g, "");
    });
  }
});
