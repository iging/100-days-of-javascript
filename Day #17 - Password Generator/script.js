const passBox = document.getElementById("password");
const length = 12;
const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCase = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+-=[]{}|;':\",./<>? ~` \\";
const allChars = upperCase + lowerCase + numbers + symbols;

function createPassword() {
  let pass = "";
  pass += upperCase[Math.floor(Math.random() * upperCase.length)];
  pass += lowerCase[Math.floor(Math.random() * lowerCase.length)];
  pass += numbers[Math.floor(Math.random() * numbers.length)];
  pass += symbols[Math.floor(Math.random() * symbols.length)];

  while (length > pass.length) {
    pass += allChars[Math.floor(Math.random() * allChars.length)];
  }
  passBox.value = pass;
}

function copyPassword() {
  passBox.select();
  document.execCommand("copy");
  alert("Password copied to clipboard");
}
