let allCoins = [];
async function fetchCryptoData() {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    );
    const data = await response.json();
    if(!response.ok){
      return []
    }
    console.log({response});
    // allCoins = data;
    return data;
  } catch (error) {
    console.error("Error fetching cryptocurrency data:", error);
    return [];
  }
}
// Function to display cryptocurrency data in the table
function displayCryptoData(coins) {
  console.log({coins});
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
  if (searchTerm === "") {
    displayCryptoData(allCoins);
  } else {
    const filteredCoins = filterCryptoData(allCoins, searchTerm);
    displayCryptoData(filteredCoins);
  }
}
// Function to initialize the app
async function initializeApp() {
  try {
    allCoins = await fetchCryptoData();
    console.log({allCoins});
    console.log('are we here');
    displayCryptoData(allCoins);
  } catch (error) {
    console.error("Error initializing app:", error);
  }
}
initializeApp();
// Add event listener to search input
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", handleSearchInput); 


const data = [
  { coinName: "bitcoin", coinSymbol: "btn"},
  // More data...
];
const rowsPerPage = 7;
let currentPage = 1;
function displayTable(page) {
  const table = document.getElementById("myT");
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const slicedData = data.slice(startIndex, endIndex);
  // Clear existing table rows
  table.innerHTML = '';
  // Add new rows to the table
  slicedData.forEach(item => {
    const row = table.insertRow();
    row.insertCell().innerHTML = item.coinName;
    row.insertCell().innerHTML = item.coinSymbol;
  });
  // Update pagination
  updatePagination(page);
}
function updatePagination(currentPage) {
  const pageCount = Math.ceil(data.length / rowsPerPage);
  const paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = '';
  for (let i = 1; i <= pageCount; i++) {
    const pageLink = document.createElement("a");
    pageLink.href = "#";
    pageLink.innerText = i;
    pageLink.onclick = function () {
      displayTable(i);
    };
    if (i === currentPage) {
      pageLink.style.fontWeight = "bold";
    }
    paginationContainer.appendChild(pageLink);
    paginationContainer.appendChild(document.createTextNode(" "));
  }
}
// Initial display
displayTable(currentPage)

