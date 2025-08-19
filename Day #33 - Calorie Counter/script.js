document.addEventListener("DOMContentLoaded", () => {
  const calorieCounter = document.getElementById("calorie-counter");
  const budgetNumberInput = document.getElementById("budget");
  const entryDropdown = document.getElementById("entry-dropdown");
  const addEntryButton = document.getElementById("add-entry");
  const clearButton = document.getElementById("clear");
  const output = document.getElementById("output");

  // Store history of calorie calculations
  const calorieHistory = [];
  let isError = false;

  // Cleans the input string by removing plus, minus signs and whitespace
  function cleanInputString(str) {
    return str.replace(/[+-\s]/g, "");
  }

  // Checks if the input contains scientific notation (e.g., 1e10)
  function isInvalidInput(str) {
    return /\d+e\d+/i.test(str);
  }

  // Saves the current calculation to history
  function saveToHistory(budget, consumed, exercise, remaining, type) {
    const date = new Date();

    calorieHistory.push({
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      budget,
      consumed,
      exercise,
      remaining,
      type,
    });

    // Keep only the last 7 entries
    if (calorieHistory.length > 7) {
      calorieHistory.shift();
    }
  }

  // Add new entry fields to the selected meal/exercise section
  function addEntry() {
    const targetId = entryDropdown.value;
    const targetInputContainer = document.querySelector(
      `#${targetId} .input-container`
    );

    const entryNumber =
      targetInputContainer.querySelectorAll('input[type="text"]').length + 1;
    const entryType = targetId === "exercise" ? "Activity" : "Food";

    const HTMLString = `
    <div class="entry-row">
      <label for="${targetId}-${entryNumber}-name">${entryType} ${entryNumber}</label>
      <input type="text" id="${targetId}-${entryNumber}-name" placeholder="${entryType} name" autocomplete="off" />
      <label for="${targetId}-${entryNumber}-calories">${
      entryType === "Activity" ? "Calories Burned" : "Calories"
    }</label>
      <input
        type="number"
        min="0"
        id="${targetId}-${entryNumber}-calories"
        placeholder="Calories"
        class="calorie-input"
      />
    </div>`;

    targetInputContainer.insertAdjacentHTML("beforeend", HTMLString);

    // Focus on the newly added name input
    const newInput = document.getElementById(`${targetId}-${entryNumber}-name`);
    if (newInput) {
      newInput.focus();
    }

    // Add event listener for real-time calorie totaling
    const newCalorieInput = document.getElementById(
      `${targetId}-${entryNumber}-calories`
    );
    if (newCalorieInput) {
      newCalorieInput.addEventListener("input", updateTotals);
    }
  }

  // Calculate and update calorie totals based on form inputs
  function calculateCalories(e) {
    e.preventDefault();
    isError = false;

    const breakfastInputs = document.querySelectorAll(
      "#breakfast input[type='number']"
    );
    const lunchInputs = document.querySelectorAll(
      "#lunch input[type='number']"
    );
    const dinnerInputs = document.querySelectorAll(
      "#dinner input[type='number']"
    );
    const snacksInputs = document.querySelectorAll(
      "#snacks input[type='number']"
    );
    const exerciseInputs = document.querySelectorAll(
      "#exercise input[type='number']"
    );

    const breakfastCalories = getCaloriesFromInputs(breakfastInputs);
    const lunchCalories = getCaloriesFromInputs(lunchInputs);
    const dinnerCalories = getCaloriesFromInputs(dinnerInputs);
    const snacksCalories = getCaloriesFromInputs(snacksInputs);
    const exerciseCalories = getCaloriesFromInputs(exerciseInputs);
    const budgetCalories = getCaloriesFromInputs([budgetNumberInput]);

    if (isError) {
      return;
    }

    const consumedCalories =
      breakfastCalories + lunchCalories + dinnerCalories + snacksCalories;
    const remainingCalories =
      budgetCalories - consumedCalories + exerciseCalories;
    const surplusOrDeficit = remainingCalories < 0 ? "Surplus" : "Deficit";

    // Save to history
    saveToHistory(
      budgetCalories,
      consumedCalories,
      exerciseCalories,
      Math.abs(remainingCalories),
      surplusOrDeficit.toLowerCase()
    );

    // Create detailed output
    renderOutput(
      budgetCalories,
      consumedCalories,
      exerciseCalories,
      remainingCalories,
      surplusOrDeficit
    );

    // Show the output with animation
    output.classList.remove("hide");
    output.scrollIntoView({ behavior: "smooth" });
  }

  // Render output with detailed information
  function renderOutput(
    budget,
    consumed,
    exercise,
    remaining,
    surplusOrDeficit
  ) {
    const mealBreakdown = getMealBreakdown();

    output.innerHTML = `
      <span class="${surplusOrDeficit.toLowerCase()}">${Math.abs(
      remaining
    )} Calorie ${surplusOrDeficit}</span>
      <hr>
      <p><strong>${budget}</strong> Calories Budgeted</p>
      <p><strong>${consumed}</strong> Calories Consumed</p>
      <p><strong>${exercise}</strong> Calories Burned</p>
      
      <div class="meal-breakdown">
        <h4>Meal Breakdown:</h4>
        <ul>
          ${mealBreakdown}
        </ul>
      </div>
      
      <div class="recommendation">
        <h4>Recommendation:</h4>
        <p>${getRecommendation(remaining, surplusOrDeficit)}</p>
      </div>
    `;
  }

  // Get the breakdown of calories by meal
  function getMealBreakdown() {
    const meals = [
      { id: "breakfast", title: "Breakfast" },
      { id: "lunch", title: "Lunch" },
      { id: "dinner", title: "Dinner" },
      { id: "snacks", title: "Snacks" },
      { id: "exercise", title: "Exercise (burned)" },
    ];

    return meals
      .map((meal) => {
        const inputs = document.querySelectorAll(
          `#${meal.id} input[type='number']`
        );
        let calories = 0;

        inputs.forEach((input) => {
          if (input.value) {
            calories += parseInt(cleanInputString(input.value)) || 0;
          }
        });

        if (calories > 0 || meal.id === "exercise") {
          return `<li><strong>${meal.title}:</strong> ${calories} calories</li>`;
        }
        return "";
      })
      .join("");
  }

  // Generate a recommendation based on the calorie results
  function getRecommendation(remaining, surplusOrDeficit) {
    if (surplusOrDeficit === "Deficit" && remaining > 500) {
      return "You have a significant calorie deficit. Consider increasing your food intake to maintain health.";
    } else if (surplusOrDeficit === "Deficit" && remaining <= 500) {
      return "You're in a moderate calorie deficit which is good for weight loss.";
    } else if (surplusOrDeficit === "Surplus" && remaining > 500) {
      return "You have a significant calorie surplus. Consider more exercise or reducing intake.";
    } else {
      return "You have a slight calorie surplus. This is fine for an occasional day but monitor over time.";
    }
  }

  // Update calorie totals in real-time as user enters values
  function updateTotals() {
    const budgetValue = budgetNumberInput.value
      ? parseInt(budgetNumberInput.value)
      : 0;

    if (budgetValue <= 0) return;

    const allCalorieInputs = document.querySelectorAll(".calorie-input");
    let consumedTotal = 0;
    let exerciseTotal = 0;

    allCalorieInputs.forEach((input) => {
      if (!input.value) return;

      const value = parseInt(input.value) || 0;
      const isExercise = input.id.includes("exercise");

      if (isExercise) {
        exerciseTotal += value;
      } else {
        consumedTotal += value;
      }
    });

    const remainingCalories = budgetValue - consumedTotal + exerciseTotal;
    const surplusOrDeficit = remainingCalories < 0 ? "Surplus" : "Deficit";

    // Only update the output if it's already visible and we have a budget
    if (!output.classList.contains("hide") && budgetValue > 0) {
      renderOutput(
        budgetValue,
        consumedTotal,
        exerciseTotal,
        remainingCalories,
        surplusOrDeficit
      );
    }
  }

  // Calculate total calories from a list of input elements
  function getCaloriesFromInputs(list) {
    let calories = 0;

    for (const item of list) {
      const currVal = cleanInputString(item.value);
      if (!currVal) continue;

      const invalidInputMatch = isInvalidInput(currVal);

      if (invalidInputMatch) {
        alert(`Invalid Input: ${invalidInputMatch[0]}`);
        isError = true;
        return 0;
      }

      calories += parseInt(currVal) || 0;
    }

    return calories;
  }

  // Clear all form fields and hide output
  function clearForm() {
    const inputContainers = Array.from(
      document.querySelectorAll(".input-container")
    );

    for (const container of inputContainers) {
      container.innerHTML = "";
    }

    budgetNumberInput.value = "";
    output.innerHTML = "";
    output.classList.add("hide");
  }

  // Event Listeners
  addEntryButton.addEventListener("click", addEntry);
  calorieCounter.addEventListener("submit", calculateCalories);
  clearButton.addEventListener("click", clearForm);
  budgetNumberInput.addEventListener("input", updateTotals);

  // Initialize with one entry in each category to make it more user-friendly
  entryDropdown.value = "breakfast";
  addEntry();
  entryDropdown.value = "lunch";
  addEntry();
  entryDropdown.value = "dinner";
  addEntry();
});

const getFullYear = new Date().getFullYear();
