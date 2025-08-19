let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];
let inventoryVisible = false;

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const inventoryToggle = document.querySelector("#inventory-toggle");
const inventoryDisplay = document.querySelector("#inventory-display");
const inventoryItems = document.querySelector("#inventory-items");

const weapons = [
  { name: "stick", power: 5 },
  { name: "dagger", power: 30 },
  { name: "claw hammer", power: 50 },
  { name: "sword", power: 100 },
];

const monsters = [
  { name: "slime", level: 2, health: 15 },
  { name: "fanged beast", level: 8, health: 60 },
  { name: "dragon", level: 20, health: 300 },
];

const locations = [
  {
    name: "town square",
    "button text": ["Go to store", "Go to cave", "Fight dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: 'You are in the town square. You see a sign that says "Store".',
  },
  {
    name: "store",
    "button text": [
      "Buy 10 health (10 gold)",
      "Buy weapon (30 gold)",
      "Go to town square",
    ],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You enter the store.",
  },
  {
    name: "cave",
    "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "You enter the cave. You see some monsters.",
  },
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "You are fighting a monster.",
  },
  {
    name: "kill monster",
    "button text": [
      "Go to town square",
      "Go to town square",
      "Go to town square",
    ],
    "button functions": [goTown, goTown, easterEgg],
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.',
  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You die. &#x2620;",
  },
  {
    name: "win",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You defeat the dragon! YOU WIN THE GAME! &#x1F389;",
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Go to town square?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!",
  },
];

function initialize() {
  button1.onclick = goStore;
  button2.onclick = goCave;
  button3.onclick = fightDragon;
  inventoryToggle.onclick = toggleInventory;
  updateInventoryDisplay();
}

function toggleInventory() {
  inventoryVisible = !inventoryVisible;
  inventoryDisplay.classList.toggle("hidden", !inventoryVisible);
  inventoryToggle.innerHTML = inventoryVisible
    ? '<i class="fas fa-times"></i> Hide Inventory'
    : '<i class="fas fa-backpack"></i> Show Inventory';
  updateInventoryDisplay();
}

function updateInventoryDisplay() {
  if (inventoryVisible) {
    inventoryItems.innerHTML = "";
    inventory.forEach((item) => {
      const weaponDetails = weapons.find((w) => w.name === item);
      const power = weaponDetails ? weaponDetails.power : "?";
      const itemElement = document.createElement("div");
      itemElement.className = "inventory-item";
      itemElement.innerHTML = `
        <span class="item-name">${item}</span>
        <span class="item-power">Power: ${power}</span>
      `;
      inventoryItems.appendChild(itemElement);
    });
  }
}

function update(location) {
  monsterStats.style.display = "none";
  monsterStats.classList.remove("show");

  if (location.name === "fight") {
    monsterStats.style.display = "block";
    setTimeout(() => {
      monsterStats.classList.add("show");
    }, 10);
  }

  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerHTML = location.text;
}

function goTown() {
  update(locations[0]);
}

function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
    text.innerText = "You bought 10 health.";
    animateElement(healthText, "success");
  } else {
    text.innerText = "You do not have enough gold to buy health.";
    animateElement(goldText, "error");
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "You bought a " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " In your inventory you have: " + inventory.join(", ");
      updateInventoryDisplay();
    } else {
      text.innerText = "You do not have enough gold to buy a weapon.";
      animateElement(goldText, "error");
    }
  } else {
    text.innerText = "You already have the most powerful weapon!";
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let soldWeapon = inventory.shift();
    currentWeapon--;
    text.innerText = "You sold a " + soldWeapon + ".";
    text.innerText += " In your inventory you have: " + inventory.join(", ");
    updateInventoryDisplay();
    animateElement(goldText, "success");
  } else {
    text.innerText = "Don't sell your only weapon!";
    animateElement(button2, "error");
  }
}

function fightSlime() {
  fighting = 0;
  goFight();
}

function fightBeast() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
  goFight();
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function attack() {
  text.innerText = "The " + monsters[fighting].name + " attacks.";
  text.innerText +=
    " You attack it with your " + weapons[currentWeapon].name + ".";

  animateElement(button1, "attack-animation");

  health -= getMonsterAttackValue(monsters[fighting].level);

  if (isMonsterHit()) {
    monsterHealth -=
      weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
  } else {
    text.innerText += " You miss.";
  }

  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;

  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }

  if (Math.random() <= 0.1 && inventory.length !== 1) {
    text.innerText += " Your " + inventory.pop() + " breaks.";
    currentWeapon--;
    updateInventoryDisplay();
  }
}

function getMonsterAttackValue(level) {
  const hit = level * 5 - Math.floor(Math.random() * xp);
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > 0.2 || health < 20;
}

function dodge() {
  text.innerText = "You dodge the attack from the " + monsters[fighting].name;
  animateElement(button2, "attack-animation");
}

function defeatMonster() {
  const goldGain = Math.floor(monsters[fighting].level * 6.7);
  gold += goldGain;
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  text.innerText = `You defeated the ${monsters[fighting].name}! You gain ${monsters[fighting].level} XP and find ${goldGain} gold.`;
  animateElement(xpText, "success");
  animateElement(goldText, "success");
  update(locations[4]);
}

function lose() {
  update(locations[5]);
  document.querySelector("#game").classList.add("lose-animation");
}

function winGame() {
  update(locations[6]);
  document.querySelector("#game").classList.add("win-animation");
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["stick"];
  xpText.innerText = xp;
  healthText.innerText = health;
  goldText.innerText = gold;
  document
    .querySelector("#game")
    .classList.remove("lose-animation", "win-animation");
  updateInventoryDisplay();
  goTown();
}

function easterEgg() {
  update(locations[7]);
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  const numbers = Array(10)
    .fill()
    .map(() => Math.floor(Math.random() * 11));

  text.innerText =
    "You picked " +
    guess +
    ". Here are the random numbers:\n" +
    numbers.join(", ");

  if (numbers.includes(guess)) {
    text.innerText += "\nRight! You win 20 gold!";
    gold += 20;
    goldText.innerText = gold;
    animateElement(goldText, "success");
  } else {
    text.innerText += "\nWrong! You lose 10 health!";
    health -= 10;
    healthText.innerText = health;
    animateElement(healthText, "error");
    if (health <= 0) {
      lose();
    }
  }
}

function animateElement(element, className) {
  element.classList.add(className);
  setTimeout(() => {
    element.classList.remove(className);
  }, 500);
}

document.addEventListener("DOMContentLoaded", initialize);
