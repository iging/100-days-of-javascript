// This object stores references to the UI elements
const ui = {
  form: document.querySelector(".calculator"),
  tips: document.querySelector(".tips"),
  tipAmount: document.querySelector(".tip-amount"),
  tipPerGuest: document.querySelector(".tip-guest"),
  totalPerGuest: document.querySelector(".total-guest"),
};

function initApp() {
  ui.form.addEventListener("submit", handleSubmit);
  ui.form.addEventListener("reset", handleReset);
  document.addEventListener("DOMContentLoaded", handleReset);
}

function handleSubmit(e) {
  e.preventDefault();

  // Get the bill amount and guest count from the form
  const billAmount = parseFloat(ui.form.billAmount.value);
  const guestCount = parseInt(ui.form.guestCount.value);

  // If the bill amount is invalid, alert the user and exit
  if (!billAmount) {
    alert("Please provide a valid bill amount.");
    return;
  }

  // Calculate the tip amount, tip per guest, and total per guest
  const tipAmount = calculateTip(billAmount);
  const tipPerGuest = tipAmount / guestCount;
  const totalPerGuest = (billAmount + tipAmount) / guestCount;

  displayResult(tipAmount, tipPerGuest, totalPerGuest);
}

function handleReset() {
  // Display the default values
  displayResult(0, 0, 0);
}
function displayResult(tipAmount, tipPerGuest, totalPerGuest) {
  // Update the tip amount
  ui.tipAmount.textContent = formatNumber(tipAmount);
  // Update the tip per guest
  ui.tipPerGuest.textContent = formatNumber(tipPerGuest);
  // Update the total per guest
  ui.totalPerGuest.textContent = formatNumber(totalPerGuest);
}

// This function calculates the tip amount based on the selected tip
function calculateTip(billAmount) {
  // Get the selected tip radio button
  const selectedTip = ui.tips.querySelector("input:checked");

  // If the custom tip is selected, use the custom tip amount
  if (selectedTip.id === "custom") {
    return parseInt(ui.form.customTip.value);
  }

  // Otherwise, use the selected tip percentage
  return (billAmount * parseInt(selectedTip.value)) / 100;
}

function formatNumber(number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number);
}

initApp();
