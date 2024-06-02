async function fetchCryptoData() {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching cryptocurrency data:", error);
    return [];
  }
}
// Function to display cryptocurrency data in the table
function displayCryptoData(coins) {
  const cryptoTable = document.getElementById("cryptoTable");
  cryptoTable.innerHTML = "";
  coins.forEach((coin) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><img src="${coin.image}" class="crypto-logo" alt="${coin.name}"></td>
      <td>${coin.name}</td>
      <td>${coin.symbol.toUpperCase()}</td>
      <td>$${coin.current_price.toFixed(2)}</td>
      <td>${coin.price_change_percentage_24h.toFixed(2)}%</td>
      <td>${coin.total_volume ? coin.total_volume.toLocaleString() : "-"}</td>
      <td>${coin.market_cap ? coin.market_cap.toLocaleString() : "-"}</td>
    `;
    cryptoTable.appendChild(row);
  });
}
// Function to filter cryptocurrencies based on user input
function filterCryptoData(coins, searchTerm) {
  searchTerm = searchTerm.toLowerCase();
  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(searchTerm) ||
      coin.symbol.toLowerCase().includes(searchTerm)
  );
  return filteredCoins;
}
// Function to handle search input
function handleSearchInput() {
  const searchInput = document.getElementById("searchInput");
  const searchTerm = searchInput.value.trim();
  fetchCryptoData().then((coins) => {
    const filteredCoins = filterCryptoData(coins, searchTerm);
    displayCryptoData(filteredCoins);
  });
}
// Function to initialize the app
async function initializeApp() {
  try {
    const coins = await fetchCryptoData();
    displayCryptoData(coins);
  } catch (error) {
    console.error("Error initializing app:", error);
    // Handle the error appropriately
  }
}
// Example usage:
initializeApp();
// Add event listener to search input
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", handleSearchInput);
// Call initializeApp function when the DOM content is loaded
document.addEventListener("DOMContentLoaded", initializeApp)