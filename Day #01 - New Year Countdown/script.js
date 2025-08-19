// Get references to the HTML elements that will display the countdown
let day = document.getElementById("day");
let hour = document.getElementById("hour");
let minute = document.getElementById("minute");
let second = document.getElementById("second");

// Set the end date for the countdown to the next New Year
let currentYear = new Date().getFullYear(); // Get the current year
let endDate = new Date(currentYear + 1, 0, 1, 0o0, 0o0); // Set to January 1st of the next year
let endTime = endDate.getTime(); // Convert the end date to milliseconds

// Update the heading to display the next year
document.querySelector(".heading h1").textContent = currentYear + 1; // Set the heading to the next year

// Function to calculate and update the countdown
function countdown() {
  let todayDate = new Date(); // Get the current date and time
  let todayTime = todayDate.getTime(); // Convert current date to milliseconds
  let remainingTime = endTime - todayTime; // Calculate remaining time until the end date
  let oneMinute = 60 * 1000; // Milliseconds in one minute
  let oneHour = oneMinute * 60; // Milliseconds in one hour
  let oneDay = oneHour * 24; // Milliseconds in one day

  // Function to add a leading zero to single-digit numbers
  let addZero = (number) => (number < 10 ? `0${number}` : number);

  // Check if the countdown has ended
  if (endTime < todayTime) {
    clearInterval(time); // Stop the countdown
    document.querySelector(".countdown").innerHTML = `<h1>Happy New Year</h1>`; // Display message
  } else {
    // Calculate the time left in days, hours, minutes, and seconds
    let daysLeft = Math.floor(remainingTime / oneDay);
    let hoursLeft = Math.floor((remainingTime % oneDay) / oneHour);
    let minutesLeft = Math.floor((remainingTime % oneHour) / oneMinute);
    let secondsLeft = Math.floor((remainingTime % oneMinute) / 1000);

    // Update the HTML elements with the formatted time left
    day.textContent = addZero(daysLeft);
    hour.textContent = addZero(hoursLeft);
    minute.textContent = addZero(minutesLeft);
    second.textContent = addZero(secondsLeft);
  }
}

// Set an interval to update the countdown every second
let time = setInterval(countdown, 1000);
countdown(); // Initial call to display the countdown immediately
