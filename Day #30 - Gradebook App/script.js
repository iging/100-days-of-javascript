document.addEventListener("DOMContentLoaded", function () {
  // Tab navigation
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const tabName = btn.dataset.tab;

      // Update active button
      tabBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // Show selected tab content
      tabContents.forEach((content) => {
        content.classList.remove("active");
        if (content.id === `${tabName}-tab`) {
          content.classList.add("active");
        }
      });
    });
  });

  // Student View Functionality
  const studentNameInput = document.getElementById("student-name");
  const studentScoreInput = document.getElementById("student-score");
  const checkResultBtn = document.getElementById("check-result-btn");
  const studentResult = document.getElementById("student-result");
  const gradeDisplay = studentResult.querySelector(".grade-display");
  const messageDisplay = studentResult.querySelector(".message-display");

  checkResultBtn.addEventListener("click", () => {
    const name = studentNameInput.value.trim();
    const score = parseFloat(studentScoreInput.value);

    if (!name) {
      showAlert("Please enter your name");
      return;
    }

    if (isNaN(score) || score < 0 || score > 100) {
      showAlert("Please enter a valid score between 0 and 100");
      return;
    }

    // Default class scores for student view
    const classScores = [65, 72, 81, 89, 91, 77, 85, 62, 95, 79];

    // Get grade and message
    const grade = getGrade(score);
    const message = studentMsg(classScores, score);

    // Update UI with results
    gradeDisplay.textContent = grade;
    gradeDisplay.className = "grade-display"; // Reset class
    gradeDisplay.classList.add(getGradeClass(grade));
    messageDisplay.textContent = message;

    // Show result with animation
    studentResult.style.display = "block";
    setTimeout(() => {
      studentResult.classList.add("show");
    }, 10);
  });

  // Teacher View Functionality
  const addStudentBtn = document.getElementById("add-student-btn");
  const calculateBtn = document.getElementById("calculate-btn");
  const studentsContainer = document.getElementById("students-container");
  const classNameInput = document.getElementById("class-name");

  // Initialize with first student entry
  addStudentEntry();

  // Event listeners for teacher view
  addStudentBtn.addEventListener("click", addStudentEntry);
  calculateBtn.addEventListener("click", calculateClassResults);

  // Add event listener to the container for handling add buttons (event delegation)
  studentsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-btn")) {
      addStudentEntry();
    }
    if (e.target.classList.contains("remove-btn")) {
      e.target.closest(".student-entry").remove();
    }
  });

  function addStudentEntry() {
    const entry = document.createElement("div");
    entry.className = "student-entry";

    entry.innerHTML = `
      <input type="text" placeholder="Student name" class="student-name-input">
      <input type="number" placeholder="Score" class="student-score-input" min="0" max="100">
      <button class="remove-btn">-</button>
    `;

    studentsContainer.appendChild(entry);
  }

  function calculateClassResults() {
    const entries = document.querySelectorAll(".student-entry");
    const students = [];

    // Collect student data
    entries.forEach((entry) => {
      const name = entry.querySelector(".student-name-input").value.trim();
      const score = parseFloat(
        entry.querySelector(".student-score-input").value
      );

      if (name && !isNaN(score) && score >= 0 && score <= 100) {
        students.push({ name, score });
      }
    });

    if (students.length < 1) {
      showAlert("Please add at least one student with valid data");
      return;
    }

    // Extract scores for calculations
    const scores = students.map((student) => student.score);

    // Calculate statistics
    const classAverage = getAverage(scores);
    const highestScore = Math.max(...scores);
    const lowestScore = Math.min(...scores);
    const passingCount = scores.filter((score) =>
      hasPassingGrade(score)
    ).length;
    const passRate = (passingCount / scores.length) * 100;

    // Update statistics display
    document.getElementById("class-average").textContent =
      classAverage.toFixed(1);
    document.getElementById("highest-score").textContent = highestScore;
    document.getElementById("lowest-score").textContent = lowestScore;
    document.getElementById("pass-rate").textContent = `${passRate.toFixed(
      0
    )}%`;

    // Generate grade distribution
    generateGradeDistribution(scores);

    // Highlight statistics with animation
    animateStatistics();
  }

  function generateGradeDistribution(scores) {
    const gradeDistribution = {
      "A++": 0,
      A: 0,
      B: 0,
      C: 0,
      D: 0,
      F: 0,
    };

    // Count grades
    scores.forEach((score) => {
      const grade = getGrade(score);
      gradeDistribution[grade]++;
    });

    // Create HTML for grade distribution
    const container = document.getElementById("grade-distribution");
    container.innerHTML = "<h3>Grade Distribution</h3>";

    const distributionDiv = document.createElement("div");
    distributionDiv.className = "grade-bars";

    for (const [grade, count] of Object.entries(gradeDistribution)) {
      const percentage = (count / scores.length) * 100;
      const barDiv = document.createElement("div");
      barDiv.className = "grade-bar-container";

      barDiv.innerHTML = `
        <div class="grade-label ${getGradeClass(grade)}">${grade}</div>
        <div class="bar-container">
          <div class="bar ${getGradeClass(
            grade
          )}" style="width: ${percentage}%"></div>
        </div>
        <div class="grade-count">${count} students (${percentage.toFixed(
        0
      )}%)</div>
      `;

      distributionDiv.appendChild(barDiv);
    }

    container.appendChild(distributionDiv);
    container.style.display = "block";
  }

  // Helper functions
  function getGradeClass(grade) {
    switch (grade) {
      case "A++":
        return "grade-a-plus";
      case "A":
        return "grade-a";
      case "B":
        return "grade-b";
      case "C":
        return "grade-c";
      case "D":
        return "grade-d";
      default:
        return "grade-f";
    }
  }

  function animateStatistics() {
    const statBoxes = document.querySelectorAll(".stat-box");
    statBoxes.forEach((box, index) => {
      setTimeout(() => {
        box.classList.add("animate");
      }, index * 100);
    });
  }

  function showAlert(message) {
    const alert = document.createElement("div");
    alert.className = "alert";
    alert.textContent = message;
    document.body.appendChild(alert);

    setTimeout(() => {
      alert.classList.add("show");
    }, 10);

    setTimeout(() => {
      alert.classList.remove("show");
      setTimeout(() => {
        alert.remove();
      }, 300);
    }, 3000);
  }
});

// Original grading functions
function getAverage(scores) {
  if (!scores.length) return 0;

  const sum = scores.reduce((total, score) => total + score, 0);
  return sum / scores.length;
}

function getGrade(score) {
  if (score === 100) {
    return "A++";
  } else if (score >= 90) {
    return "A";
  } else if (score >= 80) {
    return "B";
  } else if (score >= 70) {
    return "C";
  } else if (score >= 60) {
    return "D";
  } else {
    return "F";
  }
}

function hasPassingGrade(score) {
  return score >= 60; // D or higher is passing
}

function studentMsg(totalScores, studentScore) {
  const classAverage = getAverage(totalScores).toFixed(1);
  const studentGrade = getGrade(studentScore);
  const aboveAverage = studentScore > classAverage ? "above" : "below";

  let message = `Class average: ${classAverage}. Your score is ${aboveAverage} average.`;

  if (hasPassingGrade(studentScore)) {
    message += " You passed the course!";
  } else {
    message += " You failed the course.";
  }

  return message;
}
