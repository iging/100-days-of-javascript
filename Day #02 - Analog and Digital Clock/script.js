let hour = document.querySelector("#hours"); // Select the hour hand for the analog clock
let minute = document.querySelector("#minutes"); // Select the minute hand for the analog clock
let second = document.querySelector("#seconds"); // Select the second hand for the analog clock

setInterval(() => {
  // Analog Clock
  // This section updates the analog clock hands based on the current time
  let day = new Date(); // Get the current date and time
  let hours = day.getHours() * 30; // Calculate the hour rotation (360°/12 hours = 30° per hour)
  let minutes = day.getMinutes() * 6; // Calculate the minute rotation (360°/60 minutes = 6° per minute)
  let seconds = day.getSeconds() * 6; // Calculate the second rotation (360°/60 seconds = 6° per second)

  hour.style.transform = `rotateZ( ${hours + minutes / 12}deg )`; // Rotate hour hand
  minute.style.transform = `rotateZ( ${minutes}deg )`; // Rotate minute hand
  second.style.transform = `rotateZ( ${seconds}deg )`; // Rotate second hand

  // Digital Clock
  // Select the elements for displaying digital time
  let digitalHour = document.getElementById("digital-hour"); // Hour display
  let digitalMinute = document.getElementById("digital-minute"); // Minute display
  let digitalSecond = document.getElementById("digital-second"); // Second display
  let digitalPeriod = document.getElementById("period"); // AM/PM display

  // Get the current time values
  let hourValue = new Date().getHours(); // Current hour (0-23)
  let minuteValue = new Date().getMinutes(); // Current minute (0-59)
  let secondValue = new Date().getSeconds(); // Current second (0-59)

  // Determine AM or PM
  var period = hourValue >= 12 ? "PM" : "AM";

  // Convert 24 Hour Clock to 12 Hour Clock
  if (hourValue > 12) {
    hourValue = hourValue - 12; // Adjust hour for 12-hour format
  }

  // Add Zero before single digit number for formatting
  hourValue = hourValue < 10 ? "0" + hourValue : hourValue; // Format hour
  minuteValue = minuteValue < 10 ? "0" + minuteValue : minuteValue; // Format minute
  secondValue = secondValue < 10 ? "0" + secondValue : secondValue; // Format second

  // Update the digital clock display
  digitalHour.innerHTML = hourValue; // Set hour display
  digitalMinute.innerHTML = minuteValue; // Set minute display
  digitalSecond.innerHTML = secondValue; // Set second display
  digitalPeriod.innerHTML = period; // Set AM/PM display
});
