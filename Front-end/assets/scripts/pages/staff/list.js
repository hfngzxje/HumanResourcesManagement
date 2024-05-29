const itemsPerPage = 5;
let employees = [];
let currentPage = 1;

// Function to render employees table
function renderTable(page) {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedEmployees = employees.slice(start, end);

    $('#employee-table tbody').empty();
    $.each(paginatedEmployees, function (index, nhanVien) {
        $('#employee-table tbody').append(`
            <tr class="bg-white border-b">
                <td class="px-6 py-4">${nhanVien.ten}</td>
                <td class="px-6 py-4">${nhanVien.ma.trim()}</td>
                <td class="px-6 py-4">${nhanVien.didong}</td>
                <td class="px-6 py-4">${nhanVien.tenPhong}</td>
                <td class="px-6 py-4">${nhanVien.chucvuhientai}</td>
                <td class="px-6 py-4">
                    <div class="flex gap-3">
                        <button type="button" class="py-1 px-2 me-2 text-sm font-medium text-blue-700 bg-white rounded-lg border border-blue-200 hover:bg-blue-100 hover:text-blue-700 edit-button">
                            <i class="bx bx-pencil mr-1"></i>
                        </button>
                        <button type="button" class="py-1 px-2 me-2 text-sm font-medium text-red-600 bg-white rounded-lg border border-red-200 hover:bg-red-100 hover:text-red-700 delete-button" data-id="${nhanVien.ma.trim()}">
                            <i class="bx bx-trash mr-1"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `);
    });
}

// Function to render pagination controls
function renderPagination() {
    const totalPages = Math.ceil(employees.length / itemsPerPage);
    $('#pagination').empty();

    // Previous button
    $('#pagination').append(`
        <li>
            <a href="#" class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''}" data-page="${currentPage - 1}">Previous</a>
        </li>
    `);

    // Current page number
    $('#pagination').append(`
        <li>
            <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-blue-700 bg-gray-100 border border-gray-300" data-page="${currentPage}">${currentPage}</a>
        </li>
    `);

    // Next button
    $('#pagination').append(`
        <li>
            <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 ${currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''}" data-page="${currentPage + 1}">Next</a>
        </li>
    `);
}

// Event delegation for pagination links
$('#pagination').on('click', 'a', function (e) {
    e.preventDefault();
    const page = $(this).data('page');
    const totalPages = Math.ceil(employees.length / itemsPerPage);

    if (page >= 1 && page <= totalPages) {
        currentPage = page;
        renderTable(currentPage);
        renderPagination();
    }
});

// Event delegation for delete buttons
$('#employee-table').on('click', '.delete-button', function () {
    const employeeId = $(this).data('id');
    if (confirm("Bạn có muốn xóa nhân viên này không?")) {
        console.log(`Attempting to delete employee with ID: ${employeeId}`);
        $.ajax({
            url: `https://localhost:7141/api/NhanVien/xoaNhanVien/${employeeId}`,
            method: 'DELETE',
            success: function () {
                // Remove the employee from the array
                employees = employees.filter(nhanVien => nhanVien.ma.trim() !== employeeId);
                // Re-render the table and pagination
                renderTable(currentPage);
                renderPagination();
                alert("Nhân viên đã được xóa thành công.");
            },
            error: function (xhr, status, error) {
                console.error(`Error deleting employee: ${xhr.responseText}`);
                alert(`Xóa nhân viên thất bại: ${xhr.responseText}`);
            }
        });
    }
});

// Fetch employees data on page load
$(document).ready(function () {
    $.ajax({
        url: 'https://localhost:7141/api/NhanVien',
        method: 'GET',
        success: function (data) {
            employees = data;
            renderTable(currentPage);
            renderPagination();
        },
        error: function (xhr, status, error) {
            console.error(`Error fetching employees: ${xhr.responseText}`);
        }
    });
});

$('#employee-table').on('click', '.edit-button', function () {
    const employeeId = $(this).closest('tr').find('td:nth-child(2)').text().trim();
    window.location.href = `FamilyRelationship.html?maNV=${employeeId}`;
});