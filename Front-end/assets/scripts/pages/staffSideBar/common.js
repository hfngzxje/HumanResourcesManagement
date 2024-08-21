const params = new URL(document.location.toString()).searchParams;
const id = params.get("id");
const maNhanVien = localStorage.getItem("maNhanVien");
const vaitro = localStorage.getItem("vaiTroID");
const TAB = {
  RESUME: 1,
  SALARY_UP: 2,
  RAISE_SALARY: 3,
  SALARY: 4,
  BIRTH_DATE: 5,
  Communist_Party: 6,
  SALARY_GROUP: 7,
  FAMILY_RELATIONSHIP: 8,
  Difficult_Households: 9,
  BHYT_BHXH : 10
};

const TAB_LIST = [
  {
    key: TAB.RESUME,
    label: "Danh sách nhân viên",
    activeByPath: "/pages/staffSideBar/report.html",
  },
  {
    key: TAB.SALARY_UP,
    label: "Danh sách nâng lương",
    activeByPath: "/pages/staffSideBar/reportListSalaryUp.html",
  },
  {
    key: TAB.RAISE_SALARY,
    label: "Quyết định lên lương",
    activeByPath: "/pages/staffSideBar/reportRaiseSalary.html",
  },
  {
    key: TAB.SALARY,
    label: "Hồ sơ lương",
    activeByPath: "/pages/staffSideBar/reportSalary.html",
  },
  {
    key: TAB.BIRTH_DATE,
    label: "Danh sách sinh nhật",
    activeByPath: "/pages/staffSideBar/reportListBirthdate.html",
  },
  {
    key: TAB.Communist_Party,
    label: "Danh sách đảng viên",
    activeByPath: "/pages/staffSideBar/reportCommunistParty.html",
  },
  {
    key: TAB.SALARY_GROUP,
    label: "Danh sách nhóm lương",
    activeByPath: "/pages/staffSideBar/reportSalaryGroup.html",
  },
  {
    key: TAB.FAMILY_RELATIONSHIP,
    label: "Danh sách người thân",
    activeByPath: "/pages/staffSideBar/reportFamilyRelationship.html",
  },
  {
    key: TAB.Difficult_Households,
    label: "Danh sách diện chính sách",
    activeByPath: "/pages/staffSideBar/reportDifficultHouseholds.html",
  },
  {
    key: TAB.BHYT_BHXH,
    label: "Danh sách sổ bảo hiểm",
    activeByPath: "/pages/staffSideBar/reportBhytBhxh.html",
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
      const href = '../..' + selectedTab.activeByPath + '?id=' + id;
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
