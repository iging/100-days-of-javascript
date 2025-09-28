const postsContainer = document.getElementById("posts-container");

// Sample NBA player data (in a real app, you would fetch this from an API)
const nbaPlayers = [
  {
    id: 1,
    name: "Nikola Jokić",
    team: "DEN",
    ppg: 26.4,
    rpg: 12.4,
    apg: 9.0,
    fgp: 58.3,
    fg3p: 35.9,
    image: "jokic.jpg",
  },
  {
    id: 2,
    name: "Giannis Antetokounmpo",
    team: "MIL",
    ppg: 31.1,
    rpg: 11.8,
    apg: 5.7,
    fgp: 55.3,
    fg3p: 27.5,
    image: "giannis.jpg",
  },
  {
    id: 3,
    name: "Luka Dončić",
    team: "DAL",
    ppg: 32.4,
    rpg: 8.6,
    apg: 8.0,
    fgp: 49.6,
    fg3p: 34.2,
    image: "luka.jpg",
  },
  {
    id: 4,
    name: "Joel Embiid",
    team: "PHI",
    ppg: 33.1,
    rpg: 10.2,
    apg: 4.2,
    fgp: 54.8,
    fg3p: 33.0,
    image: "embiid.jpg",
  },
  {
    id: 5,
    name: "Shai Gilgeous-Alexander",
    team: "OKC",
    ppg: 30.1,
    rpg: 4.8,
    apg: 5.5,
    fgp: 51.0,
    fg3p: 34.5,
    image: "shai.jpg",
  },
  {
    id: 6,
    name: "Jayson Tatum",
    team: "BOS",
    ppg: 30.1,
    rpg: 8.8,
    apg: 4.6,
    fgp: 46.6,
    fg3p: 35.0,
    image: "tatum.jpg",
  },
  {
    id: 7,
    name: "Kevin Durant",
    team: "PHX",
    ppg: 29.1,
    rpg: 6.7,
    apg: 5.0,
    fgp: 52.1,
    fg3p: 41.3,
    image: "durant.jpg",
  },
  {
    id: 8,
    name: "Stephen Curry",
    team: "GSW",
    ppg: 29.4,
    rpg: 6.1,
    apg: 6.3,
    fgp: 49.3,
    fg3p: 42.7,
    image: "curry.jpg",
  },
  {
    id: 9,
    name: "Donovan Mitchell",
    team: "CLE",
    ppg: 28.3,
    rpg: 4.3,
    apg: 4.4,
    fgp: 48.4,
    fg3p: 38.6,
    image: "mitchell.jpg",
  },
  {
    id: 10,
    name: "Devin Booker",
    team: "PHX",
    ppg: 27.8,
    rpg: 4.5,
    apg: 6.8,
    fgp: 49.4,
    fg3p: 35.1,
    image: "booker.jpg",
  },
];

// Format percentage
const formatPercentage = (value) => {
  return `${value}%`;
};

// Format team abbreviation with logo
const formatTeam = (team) => {
  return `<span class="team-logo team-${team.toLowerCase()}">${team}</span>`;
};

// Display the player stats in the table
const displayPlayerStats = () => {
  postsContainer.innerHTML = nbaPlayers
    .map((player, index) => {
      return `
      <tr>
        <td>${index + 1}</td>
        <td class="player-name">
          <div class="player-avatar">
            <i class="fas fa-user"></i>
          </div>
          ${player.name}
        </td>
        <td>${formatTeam(player.team)}</td>
        <td class="highlight">${player.ppg.toFixed(1)}</td>
        <td>${player.rpg.toFixed(1)}</td>
        <td>${player.apg.toFixed(1)}</td>
        <td>${formatPercentage(player.fgp)}</td>
        <td>${formatPercentage(player.fg3p)}</td>
      </tr>`;
    })
    .join("");
};

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  displayPlayerStats();
});
