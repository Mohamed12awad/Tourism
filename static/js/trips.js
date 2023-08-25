import {
  getFirestore,
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

const firestore = getFirestore();

const prevButton = document.getElementById("prev-page");
const nextButton = document.getElementById("next-page");
const pageInfo = document.getElementById("page-info");
const dataTable = document.getElementById("table");
const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");

const date = new Date().toISOString().split("T")[0];
searchInput.value = date;

let usersPerPage = 10;
let currentPage = 1;
let lastVisibleDoc = null;
let filteredData = [];

dataTable.addEventListener("click", (e) => {
  if (e.target.classList.contains("profile")) {
    sessionStorage.setItem("userID", e.target.id);
    window.location.href = "./profile.html";
  }
});

// Event listener for "Next" button
nextButton.addEventListener("click", async () => {
  currentPage++;
  await displayUsers(currentPage);
});

// Event listener for "Prev" button
prevButton.addEventListener("click", async () => {
  currentPage--;
  await displayUsers(currentPage);
});

// Event listener for search button
searchButton.addEventListener("click", async (e) => {
  e.preventDefault();
  const searchQuery = searchInput.value.trim();
  currentPage = 1;
  filteredData = await filterData(searchQuery);
  await displayUsers(currentPage);
});

// Initial display on page load
// displayUsers(currentPage);
(async () => {
  const searchQuery = searchInput.value.trim();
  filteredData = await filterData(searchQuery);
  await displayUsers(currentPage);
})();

async function filterData(searchQuery) {
  const userQuery = query(
    collection(firestore, "users"),
    orderBy("periodFrom", "desc")
  );
  const userSnapshot = await getDocs(userQuery);
  const sortedData = [];
  userSnapshot.forEach((doc) => {
    const userData = doc.data();
    userData.docID = doc.id;
    sortedData.push(userData);
  });
  return sortedData.filter((doc) => {
    return doc.periodFrom.includes(searchQuery);

    // Add other fields to search
  });
}

async function displayUsers(page) {
  try {
    const startIndex = (page - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;
    const pageData = filteredData.slice(startIndex, endIndex);

    const tbody = document.querySelector("tbody");
    tbody.classList.add("align-middle");
    if (tbody) {
      tbody.innerHTML = "";

      pageData.forEach((doc, i) => {
        const row = document.createElement("tr");
        const dateFrom = new Date(doc.periodFrom);
        const [yearFrom, monthFrom, dayFrom] = [
          dateFrom.getFullYear(),
          dateFrom.getMonth() + 1,
          dateFrom.getDate(),
        ];
        const dateTo = new Date(doc.periodTo);
        const [yearTo, monthTo, dayTo] = [
          dateTo.getFullYear(),
          dateTo.getMonth() + 1,
          dateTo.getDate(),
        ];

        let clientData = `
            <td>${i + 1}</td>
            <td>${doc.userName}</td>
            <td>${doc.clientPhone}</td>
            <td>${doc.tripName} - ${doc.hotel}</td>
            <td>${dayFrom}/${monthFrom}/${yearFrom}</td>
            <td>${dayTo}/${monthTo}/${yearTo}</td>
            <td>
              <a id="${
                doc.docID
              }" class="profile btn-dark fw-light btn text-light px-2 py-1">
                عرض المزيد
              </a>
            </td>
          `;
        row.innerHTML = clientData;

        tbody.appendChild(row);
      });
    }

    // Update lastVisibleDoc with the last document of the current page
    lastVisibleDoc = pageData[pageData.length - 1];
    pageInfo.textContent = `Page ${page}`;

    updatePaginationButtons();
  } catch (err) {
    console.error("Error querying Firestore:", err);
  }
}
function updatePaginationButtons() {
  prevButton.disabled = currentPage === 1;
  nextButton.disabled =
    currentPage === Math.ceil(filteredData.length / usersPerPage);
  // console.log(filteredData.length);
  // console.log(usersPerPage);
}
