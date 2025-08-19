const teamName = document.getElementById("team");
const typeOfSport = document.getElementById("sport");
const worldCupYear = document.getElementById("year");
const headCoach = document.getElementById("head-coach");
const playerCards = document.getElementById("player-cards");
const playersDropdownList = document.getElementById("players");

const myFavoriteFootballTeam = {
  team: "Argentina",
  sport: "Football",
  year: 1986,
  isWorldCupWinner: true,
  headCoach: {
    coachName: "Carlos Bilardo",
    matches: 7,
  },
  players: [
    {
      name: "Sergio Almirón",
      position: "forward",
      number: 1,
      isCaptain: false,
      nickname: null,
    },
    {
      name: "Sergio Batista",
      position: "midfielder",
      number: 2,
      isCaptain: false,
      nickname: null,
    },
    {
      name: "Ricardo Bochini",
      position: "midfielder",
      number: 3,
      isCaptain: false,
      nickname: "El Bocha",
    },
    {
      name: "Claudio Borghi",
      position: "midfielder",
      number: 4,
      isCaptain: false,
      nickname: "Bichi",
    },
    {
      name: "José Luis Brown",
      position: "defender",
      number: 5,
      isCaptain: false,
      nickname: "Tata",
    },
    {
      name: "Daniel Passarella",
      position: "defender",
      number: 6,
      isCaptain: false,
      nickname: "El Gran Capitán",
    },
    {
      name: "Jorge Burruchaga",
      position: "forward",
      number: 7,
      isCaptain: false,
      nickname: "Burru",
    },
    {
      name: "Néstor Clausen",
      position: "defender",
      number: 8,
      isCaptain: false,
      nickname: null,
    },
    {
      name: "José Luis Cuciuffo",
      position: "defender",
      number: 9,
      isCaptain: false,
      nickname: "El Cuchu",
    },
    {
      name: "Diego Maradona",
      position: "midfielder",
      number: 10,
      isCaptain: true,
      nickname: "El Pibe de Oro",
    },
    {
      name: "Jorge Valdano",
      position: "forward",
      number: 11,
      isCaptain: false,
      nickname: "The Philosopher of Football",
    },
    {
      name: "Héctor Enrique",
      position: "midfielder",
      number: 12,
      isCaptain: false,
      nickname: null,
    },
    {
      name: "Oscar Garré",
      position: "defender",
      number: 13,
      isCaptain: false,
      nickname: null,
    },
    {
      name: "Ricardo Giusti",
      position: "midfielder",
      number: 14,
      isCaptain: false,
      nickname: null,
    },
    {
      name: "Luis Islas",
      position: "goalkeeper",
      number: 15,
      isCaptain: false,
      nickname: "El loco",
    },
    {
      name: "Julio Olarticoechea",
      position: "defender",
      number: 16,
      isCaptain: false,
      nickname: null,
    },
    {
      name: "Pedro Pasculli",
      position: "forward",
      number: 17,
      isCaptain: false,
      nickname: null,
    },
    {
      name: "Nery Pumpido",
      position: "goalkeeper",
      number: 18,
      isCaptain: false,
      nickname: null,
    },
    {
      name: "Oscar Ruggeri",
      position: "defender",
      number: 19,
      isCaptain: false,
      nickname: "El Cabezón",
    },
    {
      name: "Carlos Tapia",
      position: "midfielder",
      number: 20,
      isCaptain: false,
      nickname: null,
    },
    {
      name: "Marcelo Trobbiani",
      position: "midfielder",
      number: 21,
      isCaptain: false,
      nickname: "Calesita",
    },
    {
      name: "Héctor Zelada",
      position: "goalkeeper",
      number: 22,
      isCaptain: false,
      nickname: null,
    },
  ],
};

Object.freeze(myFavoriteFootballTeam);
const { sport, team, year, players } = myFavoriteFootballTeam;
const { coachName } = myFavoriteFootballTeam.headCoach;

const initializeApp = () => {
  displayTeamInfo();
  setPlayerCards();
  setupEventListeners();
};

const displayTeamInfo = () => {
  typeOfSport.textContent = sport;
  teamName.textContent = team;
  worldCupYear.textContent = year;
  headCoach.textContent = coachName;
};

const getPositionIcon = (position) => {
  switch (position) {
    case "forward":
      return '<i class="fas fa-running"></i>';
    case "midfielder":
      return '<i class="fas fa-futbol"></i>';
    case "defender":
      return '<i class="fas fa-shield-alt"></i>';
    case "goalkeeper":
      return '<i class="fas fa-hands"></i>';
    default:
      return "";
  }
};

const setPlayerCards = (arr = players) => {
  playerCards.innerHTML = "";

  if (arr.length === 0) {
    playerCards.innerHTML = `
      <div class="no-results">
        <p>No players match this filter criteria.</p>
      </div>
    `;
    return;
  }

  const fragment = document.createDocumentFragment();

  arr.forEach((player) => {
    const { name, position, number, isCaptain, nickname } = player;

    const playerCard = document.createElement("div");
    playerCard.className = `player-card ${position}`;
    playerCard.style.animationDelay = `${arr.indexOf(player) * 0.05}s`;

    const nameElement = document.createElement("h2");
    if (isCaptain) {
      const captainBadge = document.createElement("span");
      captainBadge.className = "captain-badge";
      captainBadge.textContent = "Captain";
      nameElement.appendChild(captainBadge);
    }
    nameElement.appendChild(document.createTextNode(name));

    const positionElement = document.createElement("p");
    const positionLabel = document.createElement("span");
    positionLabel.className = "info-label";
    positionLabel.innerHTML = `${getPositionIcon(position)} Position:`;
    const positionValue = document.createElement("span");
    positionValue.className = "info-value";
    positionValue.textContent =
      position.charAt(0).toUpperCase() + position.slice(1);
    positionElement.appendChild(positionLabel);
    positionElement.appendChild(positionValue);

    const numberElement = document.createElement("p");
    const numberLabel = document.createElement("span");
    numberLabel.className = "info-label";
    numberLabel.innerHTML = '<i class="fas fa-hashtag"></i> Number:';
    const numberValue = document.createElement("span");
    numberValue.className = "info-value";
    numberValue.textContent = number;
    numberElement.appendChild(numberLabel);
    numberElement.appendChild(numberValue);

    const nicknameElement = document.createElement("p");
    const nicknameLabel = document.createElement("span");
    nicknameLabel.className = "info-label";
    nicknameLabel.innerHTML = '<i class="fas fa-star"></i> Nickname:';
    const nicknameValue = document.createElement("span");
    nicknameValue.className =
      nickname !== null ? "info-value nickname" : "info-value";
    nicknameValue.textContent = nickname !== null ? nickname : "N/A";
    nicknameElement.appendChild(nicknameLabel);
    nicknameElement.appendChild(nicknameValue);

    playerCard.appendChild(nameElement);
    playerCard.appendChild(positionElement);
    playerCard.appendChild(numberElement);
    playerCard.appendChild(nicknameElement);

    fragment.appendChild(playerCard);
  });

  playerCards.appendChild(fragment);
};

const setupEventListeners = () => {
  playersDropdownList.addEventListener("change", handleFilterChange);
};

const handleFilterChange = (e) => {
  const selectedValue = e.target.value;
  let filteredPlayers;

  switch (selectedValue) {
    case "nickname":
      filteredPlayers = players.filter((player) => player.nickname !== null);
      break;
    case "forward":
    case "midfielder":
    case "defender":
    case "goalkeeper":
      filteredPlayers = players.filter(
        (player) => player.position === selectedValue
      );
      break;
    default:
      filteredPlayers = players;
  }

  setPlayerCards(filteredPlayers);
};

document.addEventListener("DOMContentLoaded", initializeApp);
