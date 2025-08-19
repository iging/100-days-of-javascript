const key = "YOUR API KEY";

// State object to store application data
const state = {
  openedDrawer: null,
  currencies: [],
  filteredCurrencies: [],
  base: "USD",
  target: "PHP",
  rates: {},
  baseValue: 1,
};

// UI elements
const ui = {
  controls: document.getElementById("controls"),
  drawer: document.getElementById("drawer"),
  dismissBtn: document.getElementById("dismiss-btn"),
  currencyList: document.getElementById("currency-list"),
  searchInput: document.getElementById("search"),
  baseBtn: document.getElementById("base"),
  targetBtn: document.getElementById("target"),
  exchangeRate: document.getElementById("exchange-rate"),
  baseInput: document.getElementById("base-input"),
  targetInput: document.getElementById("target-input"),
  swapBtn: document.getElementById("swap-btn"),
};

// Function to set up event listeners
const setupEventListeners = () => {
  document.addEventListener("DOMContentLoaded", initApp);
  ui.controls.addEventListener("click", showDrawer);
  ui.dismissBtn.addEventListener("click", hideDrawer);
  ui.searchInput.addEventListener("input", filterCurrency);
  ui.currencyList.addEventListener("click", selectPair);
  ui.baseInput.addEventListener("change", convertInput);
  ui.swapBtn.addEventListener("click", switchPair);
};

// Function to initialize the application
const initApp = () => {
  fetchCurrencies();
  fetchExchangeRate();
};

// Function to show the drawer for selecting currencies
const showDrawer = (e) => {
  if (e.target.hasAttribute("data-drawer")) {
    state.openedDrawer = e.target.id;
    ui.drawer.classList.add("show");
  }
};

// Function to hide the drawer
const hideDrawer = () => {
  clearSearchInput();
  state.openedDrawer = null;
  ui.drawer.classList.remove("show");
};

// Function to filter currencies based on user input
const filterCurrency = () => {
  const keyword = ui.searchInput.value.trim().toLowerCase();

  state.filteredCurrencies = getAvailableCurrencies().filter(
    ({ code, name }) => {
      return (
        code.toLowerCase().includes(keyword) ||
        name.toLowerCase().includes(keyword)
      );
    }
  );

  displayCurrencies();
};

// Function to select a currency pair
const selectPair = (e) => {
  if (e.target.hasAttribute("data-code")) {
    const { openedDrawer } = state;

    state[openedDrawer] = e.target.dataset.code;

    loadExchangeRate();

    hideDrawer();
  }
};

// Function to convert the input value based on the exchange rate
const convertInput = () => {
  state.baseValue = parseFloat(ui.baseInput.value) || 1;
  loadExchangeRate();
};

// Function to switch the base and target currencies
const switchPair = () => {
  const { base, target } = state;
  state.base = target;
  state.target = base;
  state.baseValue = parseFloat(ui.targetInput.value) || 1;
  loadExchangeRate();
};

// Function to display the list of filtered currencies
const displayCurrencies = () => {
  ui.currencyList.innerHTML = state.filteredCurrencies
    .map(({ code, name }) => {
      return `
      <li data-code="${code}">
        <img src="${getImageURL(code)}" alt="${name}" />
        <div>
          <h4>${code}</h4>
          <p>${name}</p>
        </div>
      </li>
    `;
    })
    .join("");
};

// Function to display the conversion result
const displayConversion = () => {
  updateButtons();
  updateInputs();
  updateExchangeRate();
};

// Function to show loading state
const showLoading = () => {
  ui.controls.classList.add("skeleton");
  ui.exchangeRate.classList.add("skeleton");
};

// Function to hide loading state
const hideLoading = () => {
  ui.controls.classList.remove("skeleton");
  ui.exchangeRate.classList.remove("skeleton");
};

// Function to update the buttons with the selected currencies
const updateButtons = () => {
  [ui.baseBtn, ui.targetBtn].forEach((btn) => {
    const code = state[btn.id];

    btn.textContent = code;
    btn.style.setProperty("--image", `url(${getImageURL(code)})`);
  });
};

// Function to update the input fields with the conversion result
const updateInputs = () => {
  const { base, baseValue, target, rates } = state;

  const result = baseValue * rates[base][target];

  ui.targetInput.value = result.toFixed(2);
  ui.baseInput.value = baseValue;
};

// Function to update the exchange rate display
const updateExchangeRate = () => {
  const { base, target, rates } = state;

  const rate = rates[base][target].toFixed(2);

  ui.exchangeRate.textContent = `1 ${base} = ${rate} ${target}`;
};

// Function to get the available currencies excluding the base and target
const getAvailableCurrencies = () => {
  return state.currencies.filter(({ code }) => {
    return state.base !== code && state.target !== code;
  });
};

// Function to clear the search input field
const clearSearchInput = () => {
  ui.searchInput.value = "";
  ui.searchInput.dispatchEvent(new Event("input"));
};

// Function to get the image URL for a currency code
const getImageURL = (code) => {
  const flag =
    "https://wise.com/public-resources/assets/flags/rectangle/{code}.png";

  return flag.replace("{code}", code.toLowerCase());
};

// Function to load the exchange rate for the selected currencies
const loadExchangeRate = () => {
  const { base, rates } = state;
  if (typeof rates[base] !== "undefined") {
    displayConversion();
  } else {
    fetchExchangeRate();
  }
};

// Function to fetch the list of currencies from the API
const fetchCurrencies = () => {
  fetch(`https://api.freecurrencyapi.com/v1/currencies?apikey=${key}`)
    .then((response) => response.json())
    .then(({ data }) => {
      state.currencies = Object.values(data);
      state.filteredCurrencies = getAvailableCurrencies();
      displayCurrencies();
    })
    .catch(console.error);
};

// Function to fetch the exchange rate from the API
const fetchExchangeRate = () => {
  const { base } = state;

  showLoading();

  fetch(
    `https://api.freecurrencyapi.com/v1/latest?apikey=${key}&base_currency=${base}`
  )
    .then((response) => response.json())
    .then(({ data }) => {
      state.rates[base] = data;
      displayConversion();
    })
    .catch(console.error)
    .finally(hideLoading);
};

// Initialize event listeners
setupEventListeners();
