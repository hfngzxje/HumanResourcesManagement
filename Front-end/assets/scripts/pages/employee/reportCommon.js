const params = new URL(document.location.toString()).searchParams;
const id = params.get("id");
const maNhanVien = localStorage.getItem("maNhanVien");
const vaitro = localStorage.getItem("vaiTroID");
const TAB = {
  FAMILY: 1,
  SALARY_RECORD: 2,
 
};

const TAB_LIST = [
  {
    key: TAB.FAMILY,
    label: "Danh sách người thân",
    activeByPath: "/pages/employee/reportFamilyRelationship.html",
  },
  {
    key: TAB.SALARY_RECORD,
    label: "Danh sách bảng lương",
    activeByPath: "/pages/employee/reportSalaryRecord.html",
  }
  
];

const tabList = document.querySelector("#tabList");

function populateSelectOptions() {
    const baseSelectElement = document.querySelector("#tabList select");
  
    if (!baseSelectElement) return;
  
    baseSelectElement.innerHTML = ''; // Xóa các tùy chọn hiện tại nếu có
  
    TAB_LIST.forEach((tab) => {
      const optionEl = document.createElement('option');
      optionEl.value = tab.key;
      optionEl.textContent = tab.label;
      baseSelectElement.appendChild(optionEl);
    });
  
    // Đặt giá trị của select tương ứng với đường dẫn hiện tại
    const currentTab = TAB_LIST.find(tab => tab.activeByPath !== "" && window.location.pathname.includes(tab.activeByPath));
    if (currentTab) {
      baseSelectElement.value = currentTab.key;
    }
  }
  

function handleSelectChange() {
  tabList.addEventListener('change', (event) => {
    const selectedValue = event.target.value;
    const selectedTab = TAB_LIST.find(tab => tab.key === Number(selectedValue));
    if (selectedTab) {
      const href = '../..' + selectedTab.activeByPath 
      window.location.href = href; // Chuyển hướng đến trang mới
    }
  });
}

function init() {
  populateSelectOptions();
  handleSelectChange();
}

window.addEventListener('DOMContentLoaded', () => {
  init();
});
