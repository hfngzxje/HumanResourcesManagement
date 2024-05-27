const TAB = {
    RESUME: 1,
    PERSON_HISTORY: 2,
    CULTURAL_PROFICIENCY: 3,
    FAMILY_RELATIONSHIP: 4,
    EMPLOYMENT_CONTRACT: 5,
    SALARY_PROFILE: 6,
    EMPLOYMENT_HISTORY: 7,
    REWARDS_DISCIPLINE: 8,
};
const tabList = document.querySelector("#tabList");
let tabActive = TAB.RESUME; // text-white bg-blue-600 active
const tabListEl = [];

const TAB_LIST = [
    { key: TAB.RESUME, label: "Sơ yếu lý lịch" },
    { key: TAB.PERSON_HISTORY, label: "Lịch sử bản thân" },
    { key: TAB.CULTURAL_PROFICIENCY, label: "Trình độ văn hóa" },
    { key: TAB.FAMILY_RELATIONSHIP, label: "Quan hệ gia đình" },
    { key: TAB.EMPLOYMENT_CONTRACT, label: "Hợp đồng lao động" },
    { key: TAB.SALARY_PROFILE, label: "Hồ sơ lương" },
    { key: TAB.EMPLOYMENT_HISTORY, label: "Quá trình công tác" },
    { key: TAB.REWARDS_DISCIPLINE, label: "Khen thưởng & Kỷ luật" },
];

function getTabId(key) {
    return "tab_" + key;
}

function getContentId(key) {
    return "content_" + key;
}

function renderTab() {
    TAB_LIST.forEach((tab) => {
        const liElement = document.createElement("li");
        liElement.className = "me-2";

        const aElement = document.createElement("a");
        aElement.id = getTabId(tab.key);
        aElement.href = "#";
        aElement.className =
            "inline-block px-4 py-3 rounded-t-lg hover:text-gray-900 hover:bg-gray-100";
        aElement.onclick = () => changeActiveTab(tab.key);
        aElement.textContent = tab.label;

        liElement.appendChild(aElement);
        tabList.appendChild(liElement);
        tabListEl.push(liElement);
    });
}

function handleTabInactive(key) {
    const tabId = getTabId(key);
    const tabEL = document.querySelector("#" + tabId);
    tabEL.classList.add("hover:text-gray-900", "hover:bg-gray-100");
    tabEL.classList.remove("text-white", "bg-blue-600", "active");
    const contentId = getContentId(key);
    const contentEl = document.querySelector("#" + contentId);
    console.log("contentEl ", contentEl);
    contentEl.classList.add("hidden");
}

function handleTabActive(key) {
    const tabId = getTabId(key);
    const tabEL = document.querySelector("#" + tabId);
    tabEL.classList.remove("hover:text-gray-900", "hover:bg-gray-100");
    tabEL.classList.add("text-white", "bg-blue-600", "active");
    const contentId = getContentId(key);
    const contentEl = document.querySelector("#" + contentId);
    contentEl.classList.remove("hidden");
}

function init() {
    renderTab();
    handleTabActive(tabActive);
}

function changeActiveTab(tabKey) {
    if (tabKey === tabActive) return;
    handleTabInactive(tabActive);
    tabActive = tabKey;
    handleTabActive(tabActive);
}

window.addEventListener("DOMContentLoaded", () => {
    init();
});


// call api get danh sách người thân by id của nhân viên
function getFamilyRelationship(maNV) {
    return fetch(`https://localhost:7141/api/NguoiThan/getNguoiThanByMaNV/${maNV}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error fetching family relationship data:', error);
        });
}

function renderFamilyRelationship(data) {
    const familyList = document.getElementById('family-relationship-list');
    if (!familyList) {
        console.error('Family relationship list element not found');
        return;
    }
    familyList.innerHTML = ''; // Clear previous data
    data.forEach(person => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="px-6 py-3">${person.ten}</td>
            <td class="px-6 py-3">${person.gioitinh}</td>
            <td class="px-6 py-3">${person.quanhe}</td>
            <td class="px-6 py-3">${person.nghenghiep}</td>
            <td class="px-6 py-3">${person.ngaysinh}</td>
            <td class="px-6 py-3">${person.dienthoai}</td>
            <td class="px-6 py-3">${person.diachi}</td>
            <td class="px-6 py-3">${person.khac}</td>
        `;
        familyList.appendChild(row);
    });
}

window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const maNV = params.get('maNV');
    if (maNV) {
        getFamilyRelationship(maNV)
            .then(data => {
                renderFamilyRelationship(data);
            })
            .catch(error => {
                console.error('Error getting family relationship data:', error);
            });
    } else {
        console.error('Employee ID not found in URL');
    }
});




function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

// Function to render a row in the family relationship table
function renderFamilyRow(person) {
    const formattedNgaySinh = formatDate(person.ngaysinh);
    const row = document.createElement('tr');
    row.innerHTML = `
        <td class="px-6 py-3">${person.ten}</td>
        <td class="px-6 py-3">${person.gioitinh ? 'Nam' : 'Nữ'}</td>
        <td class="px-6 py-3">${person.quanheTen}</td>
        <td class="px-6 py-3">${person.nghenghiep}</td>
        <td class="px-6 py-3">${formattedNgaySinh}</td>
        <td class="px-6 py-3">${person.dienthoai}</td>
        <td class="px-6 py-3">${person.diachi}</td>
        <td class="px-6 py-3">${person.khac}</td>
        <td class="px-6 py-3">
            <button type="button" class="py-1 px-2 me-2 text-sm font-medium text-blue-700 bg-white rounded-lg border border-blue-200 hover:bg-blue-100 hover:text-blue-700 edit-btn">
                            <i class="bx bx-pencil mr-1"></i>
                        </button>
            
            <button type="button" class="py-1 px-2 me-2 text-sm font-medium text-red-600 bg-white rounded-lg border border-red-200 hover:bg-red-100 hover:text-red-700 delete-btn">
                            <i class="bx bx-trash mr-1"></i>
                        </button>
        </td>
    `;

    // Add event listener for edit button
    const editBtn = row.querySelector('.edit-btn');
    editBtn.addEventListener('click', () => handleEditButtonClick(person));

    // Add event listener for delete button
    const deleteBtn = row.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => handleDeleteButtonClick(person.id));

    return row;
}

// Function to handle click on delete button
function handleDeleteButtonClick(id) {
    const confirmDelete = confirm('Bạn có muốn xóa quan hệ này không?');
    if (confirmDelete) {
        fetch(`https://localhost:7141/api/NguoiThan/removeNguoiThan/${id}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // If successful, show success message
                alert('Xóa quan hệ thành công');
                // Refresh family list
                getFamilyRelationship(maNV);
            })
            .catch(error => {
                console.error('Error deleting family relationship:', error);
            });
    }
}

// Function to render family relationship data
function renderFamilyRelationship(data) {
    const familyList = document.getElementById('family-relationship-list');
    if (!familyList) {
        console.error('Family relationship list element not found');
        return;
    }
    familyList.innerHTML = ''; // Clear previous data
    data.forEach(person => {
        const row = renderFamilyRow(person);
        familyList.appendChild(row);
    });
}




window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const maNV = params.get('maNV');
    if (maNV) {
        getFamilyRelationship(maNV)
            .then(data => {
                renderFamilyRelationship(data);
            })
            .catch(error => {
                console.error('Error getting family relationship data:', error);
            });
    } else {
        console.error('Employee ID not found in URL');
    }
});



// call api get all danh muc nguoi than
function getFamilyRelationshipCategory() {
    return fetch(`https://localhost:7141/api/NguoiThan/getDanhMucNguoiThan`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Assuming the data is an array of categories
            return data.map(category => ({
                id: category.id,
                name: category.ten
            }));
        })
        .catch(error => {
            console.error('Error fetching family relationship category data:', error);
        });
}

function populateFamilyRelationshipCategory() {
    const selectElement = document.getElementById('relationship');
    if (!selectElement) {
        console.error('Select element not found');
        return;
    }
    selectElement.innerHTML = ''; // Clear previous options
    getFamilyRelationshipCategory()
        .then(data => {
            data.forEach(category => {
                const optionElement = document.createElement('option');
                optionElement.value = category.id;
                optionElement.textContent = category.name;
                selectElement.appendChild(optionElement);
            });
        })
        .catch(error => {
            console.error('Error populating family relationship category:', error);
        });
}

// Call populateFamilyRelationshipCategory when DOM content is loaded
window.addEventListener('DOMContentLoaded', () => {
    populateFamilyRelationshipCategory();
});


