let currentPage = 1;
const itemsPerPage = 2;
let totalPages = 0;

document.getElementById("filterButton").addEventListener("click", handleSearch);
document
  .getElementById("prevPage")
  .addEventListener("click", () => changePage(currentPage - 1));
document
  .getElementById("nextPage")
  .addEventListener("click", () => changePage(currentPage + 1));

async function fetchData(searchTerm = "", filterOption = "", page = 1) {
  try {
    let url = `https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=${itemsPerPage}`;
    if (searchTerm) {
      url += `&q=${searchTerm}`;
    }
    if (filterOption) {
      url += `&${filterOption}`;
    }
    const response = await fetch(url);
    const data = await response.json();
    const totalItems = response.headers.get("x-total-count");
    totalPages = Math.ceil(totalItems / itemsPerPage);
    renderTable(data);
    renderPagination();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function renderTable(data) {
  const tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";

  data.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="py-4 px-6">${item.id}</td>
      <td class="py-4 px-6">${item.name}</td>
      <td class="py-4 px-6">${item.email}</td>
      <td class="py-4 px-6">
        <span class="status-tag ${getStatusClass(item.status)}">${
      item.status || 'Không xác định'
    }</span>
      </td>
      <td class="py-4 px-6">${formatDate(item.createdAt)}</td>
    `;
    tableBody.appendChild(row);
  });
}

function renderPagination() {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement("button");
    pageButton.textContent = i;
    pageButton.classList.add(
      "bg-blue-600",
      "hover:bg-blue-700",
      "text-white",
      "font-bold",
      "py-2",
      "px-4",
      "rounded"
    );
    if (i === currentPage) {
      pageButton.classList.add("bg-blue-800");
    }
    pageButton.addEventListener("click", () => changePage(i));
    pagination.appendChild(pageButton);
  }

  document.getElementById(
    "totalPages"
  ).textContent = `Total Pages: ${totalPages}`;
}

function changePage(page) {
  if (page < 1 || page > totalPages) return;
  currentPage = page;
  handleSearch();
}

function handleSearch() {
  const searchTerm = document.getElementById("filterInput").value;
  const filterOption = document.getElementById("filterOption").value;
  fetchData(searchTerm, filterOption, currentPage);
}

function getStatusClass(status) {
  switch (status) {
    case "active":
      return "status-active";
    case "inactive":
      return "status-inactive";
    case "pending":
      return "status-pending";
    default:
      return "status-inactive";
  }
}

function formatDate(dateString) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

// Sample data for testing (you can replace this with actual API response)
const sampleData = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    status: "active",
    createdAt: "2024-07-10T10:00:00Z",
  },
  {
    id: 2,
    name: "Jane Doe",
    email: "jane@example.com",
    status: "inactive",
    createdAt: "2024-07-11T11:00:00Z",
  },
  {
    id: 3,
    name: "Jim Doe",
    email: "jim@example.com",
    status: "pending",
    createdAt: "2024-07-12T12:00:00Z",
  },
];

// Initial fetch (using sample data for testing)
// renderTable(sampleData);
// totalPages = 1; // Set to 1 for testing purposes
// renderPagination();
handleSearch();
