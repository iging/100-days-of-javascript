const currentDateParagraph = document.getElementById("current-date");
const dateOptionsSelect = document.getElementById("date-options");
const copyBtn = document.getElementById("copy-btn");
const copyStatus = document.getElementById("copy-status");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");
const amPmElement = document.getElementById("am-pm");

let currentDate = new Date();
let formattedDate = "";

function updateClock() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const displayHours = hours % 12 || 12;
  const amPm = hours >= 12 ? "PM" : "AM";

  hoursElement.textContent = displayHours.toString().padStart(2, "0");
  minutesElement.textContent = minutes.toString().padStart(2, "0");
  secondsElement.textContent = seconds.toString().padStart(2, "0");
  amPmElement.textContent = amPm;
}

function formatDate(date, format) {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  const dayOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ][date.getDay()];

  switch (format) {
    case "yyyy-mm-dd":
      return `${year}-${month}-${day}`;
    case "mm-dd-yyyy-h-mm":
      return `${month}-${day}-${year} ${hours}:${minutes}`;
    case "full-date":
      return date.toLocaleDateString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    case "time-only":
      return `${hours}:${minutes}:${seconds}`;
    case "day-name":
      return `${dayOfWeek}, ${month}-${day}-${year}`;
    default:
      return `${day}-${month}-${year}`;
  }
}

function updateDateDisplay() {
  currentDate = new Date();
  formattedDate = formatDate(currentDate, dateOptionsSelect.value);
  currentDateParagraph.textContent = formattedDate;

  currentDateParagraph.classList.add("highlight");
  setTimeout(() => {
    currentDateParagraph.classList.remove("highlight");
  }, 300);
}

function copyToClipboard() {
  navigator.clipboard
    .writeText(formattedDate)
    .then(() => {
      copyStatus.textContent = "Copied to clipboard!";
      copyStatus.style.opacity = 1;

      setTimeout(() => {
        copyStatus.style.opacity = 0;
      }, 2000);
    })
    .catch((err) => {
      copyStatus.textContent = "Failed to copy";
      copyStatus.style.opacity = 1;

      setTimeout(() => {
        copyStatus.style.opacity = 0;
      }, 2000);
    });
}

dateOptionsSelect.addEventListener("change", updateDateDisplay);
copyBtn.addEventListener("click", copyToClipboard);

updateDateDisplay();
updateClock();
setInterval(updateClock, 1000);

window.addEventListener("load", () => {
  updateDateDisplay();
});
