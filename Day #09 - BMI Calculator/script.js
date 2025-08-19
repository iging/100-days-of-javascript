// Get references to the BMI text element, description text element, and the form
const bmiText = document.getElementById("bmi");
const descText = document.getElementById("desc");
const form = document.querySelector("form");

// Add event listeners for form submission and reset
form.addEventListener("submit", onFormSubmit);
form.addEventListener("reset", onFormReset);

// Function to handle form reset event
function onFormReset() {
  // Reset the BMI text and description to their initial values
  bmiText.textContent = 0;
  bmiText.className = "";
  descText.textContent = "N/A";
}

// Function to handle form submission event
function onFormSubmit(e) {
  e.preventDefault(); // Prevent the default form submission behavior

  // Get the weight and height values from the form inputs
  const weight = parseFloat(form.weight.value);
  const height = parseFloat(form.height.value);

  // Validate the weight and height values
  if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
    alert("Please enter a valid weight and height");
    return;
  }

  // Calculate BMI
  const heightInMeters = height / 100;
  const bmi = weight / Math.pow(heightInMeters, 2);

  // Interpret the BMI value to get the description
  const desc = interpretBMI(bmi);

  // Update the BMI text and description elements with the calculated values
  bmiText.textContent = bmi.toFixed(2);
  bmiText.className = desc;
  descText.innerHTML = `You are <strong>${desc}</strong>`;
}

// Function to interpret the BMI value and return the corresponding description
function interpretBMI(bmi) {
  if (bmi < 18.5) {
    return "underweight";
  } else if (bmi < 25) {
    return "healthy";
  } else if (bmi < 30) {
    return "overweight";
  } else {
    return "obese";
  }
}
