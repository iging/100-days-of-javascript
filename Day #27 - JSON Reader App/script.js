function parseAndDisplayJson() {
  const jsonInput = document.getElementById("json-inputs").value.trim();
  if (!jsonInput) {
    document.querySelector(".json-viewer").innerHTML =
      "<p style='color: #ff6666; font-size: 1.2rem; font-weight: 600; text-align: center; position: relative; top: 50%; left: 50%; transform: translate(-50%, -50%);'>Please provide a valid JSON input.</p>";
    return;
  }

  try {
    const jsonObject = JSON.parse(jsonInput);
    document.querySelector(".json-viewer").innerHTML = "";
    buildTree(jsonObject, document.querySelector(".json-viewer"), "root");
    const rootElement = document.querySelector(
      ".json-viewer > div > span.collapsible"
    );
    if (rootElement) {
      rootElement.click();
    }
  } catch (error) {
    document.querySelector(".json-viewer").innerHTML =
      "<p style='color: #ff6666; font-size: 1.2rem; font-weight: bold; text-align: center; position: relative; top: 50%; left: 50%; transform: translate(-50%, -50%);'>Error: Unable to parse the provided JSON input. Please verify the syntax and try again.</p>";
  }
}

function buildTree(object, parentElement, key) {
  const item = document.createElement("div");
  parentElement.appendChild(item);

  if (typeof object === "object" && object !== null) {
    const keySpan = document.createElement("span");
    keySpan.className = "key collapsible";
    keySpan.textContent = key + ": ";
    item.appendChild(keySpan);

    const childContainer = document.createElement("div");
    childContainer.className =
      "hidden " + (Array.isArray(object) ? "array" : "object");
    childContainer.style.display = "none";
    item.appendChild(childContainer);

    for (const childKey in object) {
      buildTree(object[childKey], childContainer, childKey);
    }

    keySpan.onclick = function (event) {
      event.stopPropagation();
      const childDiv = this.parentElement.querySelector(".hidden");
      if (childDiv.style.display === "block") {
        childDiv.style.display = "none";
        this.classList.remove("collapsed");
      } else {
        childDiv.style.display = "block";
        this.classList.add("collapsed");
      }
    };
  } else {
    item.innerHTML =
      '<span class="key">' +
      key +
      ": </span>" +
      '<span class="' +
      getType(object) +
      '">' +
      object +
      "</span>";
  }
}

function getType(value) {
  if (typeof value === "string") {
    return "string";
  }
  if (typeof value === "number") {
    return "number";
  }
  if (Array.isArray(value)) {
    return "array";
  }
  if (typeof value === "object" && value !== null) {
    return "object";
  }
  return "unknown";
}

function loadStoreExample() {
  const exampleJson = {
    Introduction: {
      name: "akosikhada",
      title: "Frontend Developer",
      about:
        "A 21-year-old BSIT student from the Philippines, currently a Frontend Developer in my group, aiming to become a Software Engineer. My goal is to create effective digital experiences using current technologies, and I am dedicated to quickly learning new industry standards.",
      skills: [
        "HTML5",
        "CSS3",
        "JavaScript",
        "React",
        "Tailwind CSS",
        "Bootstrap",
      ],
      interests: ["Web Development", "Programming"],
      projects: [
        {
          name: "100 Days of JavaScript",
          description:
            "Building 100 JavaScript projects to improve coding skills",
          current_day: 27,
          technologies: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS"],
        },
      ],
      social: {
        github: "https://github.com/akosikhada",
      },
      goals: [
        "Master JavaScript and its frameworks",
        "Become a Software Engineer",
      ],
    },
  };

  document.getElementById("json-inputs").value = JSON.stringify(
    exampleJson,
    null,
    2
  );
  parseAndDisplayJson();
}

document
  .getElementById("file-input")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    let reader = new FileReader();
    reader.onload = function (event) {
      const fileContent = event.target.result;
      document.getElementById("json-inputs").value = fileContent;
      parseAndDisplayJson();
    };
    reader.readAsText(file);
  });
