// Retrieve transactions from localStorage or initialize an empty array if none exist
const transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// Formatter for currency display in PHP with always showing the sign
const formatter = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
  signDisplay: "always",
});

// DOM elements for transaction list, form, status text, balance, income, and expense
const list = document.getElementById("transactionList");
const form = document.getElementById("transactionForm");
const statusText = document.getElementById("status");
const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");

// Add event listener to the form for handling transaction submissions
form.addEventListener("submit", addTransaction);

/**
 * Format a currency value, removing the sign for zero values.
 * @param {number} value - The value to format.
 * @returns {string} - The formatted currency string.
 */
function formatCurrency(value) {
  if (value === 0) {
    return formatter.format(0).replace(/^[+-]/, "");
  }
  return formatter.format(value);
}

/**
 * Update the total balance, income, and expense displayed on the page.
 */
function updateTotal() {
  const incomeTotal = transactions
    .filter((trx) => trx.type === "income")
    .reduce((total, trx) => total + trx.amount, 0);

  const expenseTotal = transactions
    .filter((trx) => trx.type === "expense")
    .reduce((total, trx) => total + trx.amount, 0);

  const balanceTotal = incomeTotal - expenseTotal;

  balance.textContent = formatCurrency(balanceTotal).replace(/^\+/, "");
  income.textContent = formatCurrency(incomeTotal);
  expense.textContent = formatCurrency(expenseTotal * -1);
}

/**
 * Render the list of transactions on the page.
 */
function renderList() {
  list.innerHTML = "";

  statusText.textContent = "";
  if (transactions.length === 0) {
    statusText.textContent = "No transactions.";
    return;
  }

  transactions.forEach(({ id, name, amount, date, type }) => {
    const sign = "income" === type ? 1 : -1;

    const li = document.createElement("li");

    li.innerHTML = `
      <div class="name">
        <h4>${name}</h4>
        <p>${new Date(date).toLocaleDateString()}</p>
      </div>

      <div class="amount ${type}">
        <span>${formatCurrency(amount * sign)}</span>
      </div>

      <div class="action" onclick="deleteTransaction(${id})">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    `;

    list.appendChild(li);
  });
}

// Initial rendering of the transaction list and updating totals
renderList();
updateTotal();

/**
 * Delete a transaction by its ID.
 * @param {number} id - The ID of the transaction to delete.
 */
function deleteTransaction(id) {
  const index = transactions.findIndex((trx) => trx.id === id);
  transactions.splice(index, 1);

  updateTotal();
  saveTransactions();
  renderList();
}

/**
 * Add a new transaction from the form data.
 * @param {Event} e - The form submission event.
 */
function addTransaction(e) {
  e.preventDefault();

  const formData = new FormData(this);

  transactions.push({
    id: transactions.length + 1,
    name: formData.get("name"),
    amount: parseFloat(formData.get("amount")),
    date: new Date(formData.get("date")),
    type: "on" === formData.get("type") ? "income" : "expense",
  });

  this.reset();

  updateTotal();
  saveTransactions();
  renderList();
}

/**
 * Save the transactions to localStorage and sort them by date.
 */
function saveTransactions() {
  transactions.sort((a, b) => new Date(b.date) - new Date(a.date));

  localStorage.setItem("transactions", JSON.stringify(transactions));
}
