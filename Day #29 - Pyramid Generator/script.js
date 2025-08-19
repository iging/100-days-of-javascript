document.addEventListener("DOMContentLoaded", () => {
  const characterInput = document.getElementById("character-input");
  const rowsInput = document.getElementById("rows-input");
  const invertedCheckbox = document.getElementById("inverted-checkbox");
  const generateBtn = document.getElementById("generate-btn");
  const copyBtn = document.getElementById("copy-btn");
  const pyramidOutput = document.getElementById("pyramid-output");

  function generatePyramid() {
    const character = characterInput.value || "!";
    const count = parseInt(rowsInput.value) || 10;
    const inverted = invertedCheckbox.checked;
    const rows = [];

    for (let i = 1; i <= count; i++) {
      const rowContent = padRow(i, count);

      if (inverted) {
        rows.unshift(rowContent);
      } else {
        rows.push(rowContent);
      }
    }

    const result = rows.join("\n");

    pyramidOutput.textContent = result;

    pyramidOutput.classList.remove("animate");
    setTimeout(() => {
      pyramidOutput.classList.add("animate");
    }, 10);
  }

  function padRow(rowNumber, rowCount) {
    return (
      " ".repeat(rowCount - rowNumber) +
      characterInput.value.repeat(2 * rowNumber - 1) +
      " ".repeat(rowCount - rowNumber)
    );
  }

  function copyToClipboard() {
    const textToCopy = pyramidOutput.textContent;

    if (!textToCopy) return;

    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          copyBtn.textContent = "Copied!";
          setTimeout(() => {
            copyBtn.textContent = "Copy to Clipboard";
          }, 2000);
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = textToCopy;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);

      copyBtn.textContent = "Copied!";
      setTimeout(() => {
        copyBtn.textContent = "Copy to Clipboard";
      }, 2000);
    }
  }

  generateBtn.addEventListener("click", generatePyramid);
  copyBtn.addEventListener("click", copyToClipboard);

  characterInput.addEventListener("input", generatePyramid);
  rowsInput.addEventListener("input", generatePyramid);
  invertedCheckbox.addEventListener("change", generatePyramid);

  generatePyramid();
});
