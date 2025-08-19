// Select all tab body elements
const allTabsBody = document.querySelectorAll(".tab-body-single");

// Select all tab head elements
const allTabsHead = document.querySelectorAll(".tab-head-single");

// Select the search form element
const searchForm = document.querySelector(".app-header-search");

// Get the search list element by its ID
let searchList = document.getElementById("search-list");

// Initialize active tab and data variables
let activeTab = 1,
  allData;

// Initialize the tabs and search functionality
const init = () => {
  showActiveTabBody();
  showActiveTabHead();
};

// Show the active tab head
const showActiveTabHead = () =>
  allTabsHead[activeTab - 1].classList.add("active-tab");

// Show the active tab body
const showActiveTabBody = () => {
  hideAllTabBody();
  allTabsBody[activeTab - 1].classList.add("show-tab");
};

// Hide all tab bodies
const hideAllTabBody = () =>
  allTabsBody.forEach((singleTabBody) =>
    singleTabBody.classList.remove("show-tab")
  );

// Hide all tab heads
const hideAllTabHead = () =>
  allTabsHead.forEach((singleTabHead) =>
    singleTabHead.classList.remove("active-tab")
  );

// Initialize the tabs when the DOM content is loaded
window.addEventListener("DOMContentLoaded", () => init());

// Add click event listeners to each tab head
allTabsHead.forEach((singleTabHead) => {
  singleTabHead.addEventListener("click", () => {
    hideAllTabHead();
    activeTab = singleTabHead.dataset.id;
    showActiveTabHead();
    showActiveTabBody();
  });
});

// Get the input value from the search form
const getInputValue = (event) => {
  event.preventDefault();
  let searchText = searchForm.search.value;
  fetchAllSuperHero(searchText);
};

// Add submit event listener to the search form
searchForm.addEventListener("submit", getInputValue);

// Fetch superhero data from the API
const fetchAllSuperHero = async (searchText) => {
  let url = `https://www.superheroapi.com/api.php/YOUR-API-KEY-HERE/search/${searchText}`;
  try {
    const response = await fetch(url);
    allData = await response.json();
    if (allData.response === "success") {
      showSearchList(allData.results);
    }
  } catch (error) {
    console.log(error);
  }
};

// Show the search results in the search list
const showSearchList = (data) => {
  searchList.innerHTML = "";
  data.forEach((dataItem) => {
    const divElem = document.createElement("div");
    divElem.classList.add("search-list-item");
    divElem.innerHTML = `
      <img src="${dataItem.image.url ? dataItem.image.url : ""}" alt="">
      <p data-id="${dataItem.id}">${dataItem.name}</p>
    `;
    searchList.appendChild(divElem);
  });
};

// Add keyup event listener to the search input
searchForm.search.addEventListener("keyup", () => {
  if (searchForm.search.value.length > 1) {
    fetchAllSuperHero(searchForm.search.value);
  } else {
    searchList.innerHTML = "";
  }
});

// Add click event listener to the search list
searchList.addEventListener("click", (event) => {
  let searchId = event.target.dataset.id;
  let singleData = allData.results.filter((singleData) => {
    return searchId === singleData.id;
  });
  showSuperheroDetails(singleData);
  searchList.innerHTML = "";
});

// Show the details of the selected superhero
const showSuperheroDetails = (data) => {
  console.log(data);
  document.querySelector(".app-body-content-thumbnail").innerHTML = `
    <img src="${data[0].image.url}">
  `;
  document.querySelector(".name").textContent = data[0].name;
  document.querySelector(".powerstats").innerHTML = `
    <li>
      <div>
        <i class="fa-solid fa-shield-halved"></i>
        <span>intelligence</span>
      </div>
      <span>${data[0].powerstats.intelligence}</span>
    </li>
    <li>
      <div>
        <i class="fa-solid fa-shield-halved"></i>
        <span>strength</span>
      </div>
      <span>${data[0].powerstats.strength}</span>
    </li>
    <li>
      <div>
        <i class="fa-solid fa-shield-halved"></i>
        <span>speed</span>
      </div>
      <span>${data[0].powerstats.speed}</span>
    </li>
    <li>
      <div>
        <i class="fa-solid fa-shield-halved"></i>
        <span>durability</span>
      </div>
      <span>${data[0].powerstats.durability}</span>
    </li>
    <li>
      <div>
        <i class="fa-solid fa-shield-halved"></i>
        <span>power</span>
      </div>
      <span>${data[0].powerstats.power}</span>
    </li>
    <li>
      <div>
        <i class="fa-solid fa-shield-halved"></i>
        <span>combat</span>
      </div>
      <span>${data[0].powerstats.combat}</span>
    </li>
  `;
  document.querySelector(".biography").innerHTML = `
    <li>
      <span>full name</span>
      <span>${data[0].biography["full-name"]}</span>
    </li>
    <li>
      <span>alert-egos</span>
      <span>${data[0].biography["alter-egos"]}</span>
    </li>
    <li>
      <span>aliases</span>
      <span>${data[0].biography["aliases"]}</span>
    </li>
    <li>
      <span>place-of-birth</span>
      <span>${data[0].biography["place-of-birth"]}</span>
    </li>
    <li>
      <span>first-apperance</span>
      <span>${data[0].biography["first-appearance"]}</span>
    </li>
    <li>
      <span>publisher</span>
      <span>${data[0].biography["publisher"]}</span>
    </li>
  `;
  document.querySelector(".appearance").innerHTML = `
    <li>
      <span>
        <i class="fas fa-star"></i> gender
      </span>
      <span>${data[0].appearance["gender"]}</span>
    </li>
    <li>
      <span>
        <i class="fas fa-star"></i> race
      </span>
      <span>${data[0].appearance["race"]}</span>
    </li>
    <li>
      <span>
        <i class="fas fa-star"></i> height
      </span>
      <span>${data[0].appearance["height"][0]}</span>
    </li>
    <li>
      <span>
        <i class="fas fa-star"></i> weight
      </span>
      <span>${data[0].appearance["weight"][0]}</span>
    </li>
    <li>
      <span>
        <i class="fas fa-star"></i> eye-color
      </span>
      <span>${data[0].appearance["eye-color"]}</span>
    </li>
    <li>
      <span>
        <i class="fas fa-star"></i> hair-color
      </span>
      <span>${data[0].appearance["hair-color"]}</span>
    </li>
  `;
  document.querySelector(".connections").innerHTML = `
    <li>
      <span>group--affiliation</span>
      <span>${data[0].connections["group-affiliation"]}</span>
    </li>
    <li>
      <span>relatives</span>
      <span>${data[0].connections["relatives"]}</span>
    </li>
  `;
};
