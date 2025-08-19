class BMRCalculator {
  constructor(weight, height, age, sex) {
    // Initialize the BMRCalculator with weight, height, age, and sex
    this.weight = weight;
    this.height = height;
    this.age = age;
    this.sex = sex;
  }

  calculateBMR() {
    // Calculate the Basal Metabolic Rate (BMR) using the Mifflin-St Jeor Equation
    let bmr = 10 * this.weight + 6.25 * this.height - 5 * this.age;

    // Adjust BMR based on sex
    if (this.sex === "male") {
      bmr += 5;
    } else if (this.sex === "female") {
      bmr -= 161;
    }
    return bmr;
  }

  getResult() {
    // Calculate BMR and activity levels
    const bmr = this.calculateBMR();
    const activityLevels = {
      sedentary: bmr * 1.2, // Little or no exercise
      light: bmr * 1.375, // Light exercise/sports 1-3 days/week
      moderate: bmr * 1.55, // Moderate exercise/sports 3-5 days/week
      active: bmr * 1.725, // Hard exercise/sports 6-7 days a week
      veryActive: bmr * 1.9, // Very hard exercise/sports & physical job
      extraActive: bmr * 1.9, // Extra active or very hard exercise & physical job
    };
    return { bmr, activityLevels };
  }
}

const selector = {
  form: document.getElementById("calculator"), // Form element
  result: document.getElementById("result"), // Result container
  bmr: document.getElementById("bmr"), // BMR result element
  sedentary: document.getElementById("sedentary"), // Sedentary activity level element
  light: document.getElementById("light"), // Light activity level element
  moderate: document.getElementById("moderate"), // Moderate activity level element
  active: document.getElementById("active"), // Active activity level element
  veryActive: document.getElementById("very-active"), // Very active activity level element
  extraActive: document.getElementById("extra-active"), // Extra active activity level element
};

const render = ({ bmr, activityLevels }) => {
  // Render the BMR and activity levels to the DOM
  selector.bmr.textContent = Math.round(bmr).toLocaleString("ph");

  for (const k in activityLevels) {
    const calories = Math.round(activityLevels[k]);
    selector[k].textContent = calories.toLocaleString("ph");
  }
};

const onFormSubmit = (event) => {
  // Handle form submission
  event.preventDefault();

  const form = event.target;
  const weight = Number(form.weight.value);
  const height = Number(form.height.value);
  const age = Number(form.age.value);
  const sex = form.sex.value;

  // Validate input values
  if (isNaN(weight) || isNaN(height) || isNaN(age)) {
    alert("Weight, Height, and Age must be numeric.");
    return;
  }

  // Hide result container
  selector.result.classList.remove("show");

  // Calculate and render results after a delay
  setTimeout(() => {
    const calc = new BMRCalculator(weight, height, age, sex);
    render(calc.getResult());
    selector.result.classList.add("show");
  }, 400);
};

const onFormReset = (event) => {
  // Handle form reset
  selector.result.classList.remove("show");
};

// Add event listeners for form submission and reset
selector.form.addEventListener("submit", onFormSubmit);
selector.form.addEventListener("reset", onFormReset);
