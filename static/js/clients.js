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
// const userList = document.getElementById("user-list");
const prevButton = document.getElementById("prev-page");
const nextButton = document.getElementById("next-page");
const pageInfo = document.getElementById("page-info");

let usersPerPage = 10; // Number of users to display per page
let currentPage = 1; // Initialize current page
let lastVisibleDoc = null; // Initialize lastVisibleDoc

async function displayUsers(page) {
  try {
    // Query to fetch users ordered by a field (e.g., name) and limited per page
    let userQuery = query(
      collection(firestore, "users"),
      orderBy("reservDate", "desc"),
      limit(usersPerPage)
    );

    if (page > 1 && lastVisibleDoc) {
      // Fetch users starting after the last document of the previous page
      // const lastVisibleDoc = // Get the last document of the previous page (store it during pagination)
      userQuery = query(userQuery, startAfter(lastVisibleDoc));
    }
    const userSnapshot = await getDocs(userQuery);
    const sortedData = [];
    userSnapshot.forEach((doc) => {
      sortedData.push(doc.data());
    });

    const tbody = document.querySelector("tbody");
    if (tbody) {
      tbody.innerHTML = "";

      sortedData.forEach((doc, i) => {
        const row = document.createElement("tr");
        const date = new Date(doc.reservDate.seconds * 1000);
        const [year, month, day] = [
          date.getFullYear(),
          date.getMonth() + 1,
          date.getDate(),
        ];

        let clientData = `
            <td>${i + 1}</td>
            <td>${doc.userName}</td>
            <td>${doc.clientPhone} - ${doc.clientPhoneSecond}</td>
            <td>${doc.hotel}</td>
            <td>${day}/${month}/${year} - ${date.toLocaleTimeString()}</td>
            
            `;

        row.innerHTML = clientData;

        tbody.appendChild(row);
      });
    }

    // Update lastVisibleDoc with the last document of the current page
    lastVisibleDoc = userSnapshot.docs[userSnapshot.docs.length - 1];
    pageInfo.textContent = `Page ${page}`;
  } catch (err) {
    console.error("Error querying Firestore:", err);
  }
}

//  ------------------- pagnation  ----------------------------
// get the last page
const lastPage = await calculateLastPage();
async function getTotalUsers() {
  const userQuery = query(collection(firestore, "users"));
  const userSnapshot = await getDocs(userQuery);
  return userSnapshot.size; // Total number of users
}
async function calculateLastPage() {
  const totalUsers = await getTotalUsers();
  return Math.ceil(totalUsers / usersPerPage); // Calculate last page
}
calculateLastPage().then((lastPage) => {
  // Initialize the pagination buttons
  updatePaginationButtons(currentPage, lastPage);
});
// Update the pagination buttons based on the current page and last page
function updatePaginationButtons(currentPage, lastPage) {
  if (currentPage === 1) {
    prevButton.disabled = true; // Disable "Prev" button on first page
  } else {
    prevButton.disabled = false;
  }

  if (currentPage === lastPage) {
    nextButton.disabled = true; // Disable "Next" button on last page
  } else {
    nextButton.disabled = false;
  }
}
// Event listener for "Next" button
nextButton.addEventListener("click", async () => {
  currentPage++;
  await displayUsers(currentPage); // Display users for the next page
  updatePaginationButtons(currentPage, lastPage); // Update pagination buttons
});

// Event listener for "Prev" button
prevButton.addEventListener("click", async () => {
  currentPage--;
  await displayUsers(currentPage); // Display users for the previous page
  updatePaginationButtons(currentPage, lastPage); // Update pagination buttons
});

// Example usage:
// console.log("Last page:", lastPage);

// Initial display on page load
displayUsers(currentPage);
