const params = new URL(document.location.toString()).searchParams;
const id = params.get("id");
const maNhanVien = localStorage.getItem("maNhanVien");
const vaitro = localStorage.getItem("vaiTroID");
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

const TAB_LIST = [
  {
    key: TAB.RESUME,
    label: "Danh sách nhân viên",
    activeByPath: "/pages/staffSideBar/report.html",
  },
  {
    key: TAB.PERSON_HISTORY,
    label: "Danh sách nâng lương",
    activeByPath: "/pages/staffSideBar/reportListSalaryUp.html",
  },
  {
    key: TAB.CULTURAL_PROFICIENCY,
    label: "Quyết định lên lương",
    activeByPath: "/pages/staff/qualifications.html",
  },
  {
    key: TAB.FAMILY_RELATIONSHIP,
    label: "Hồ sơ lương",
    activeByPath: "/pages/staff/FamilyRelationship.html",
  },
  {
    key: TAB.EMPLOYMENT_CONTRACT,
    label: "Danh sách sinh nhật",
    activeByPath: "/pages/staff/laborContract.html",
  },
  {
    key: TAB.SALARY_PROFILE,
    label: "Danh sách đảng viên",
    activeByPath: "/pages/staff/salaryRecord.html",
  },
  {
    key: TAB.EMPLOYMENT_HISTORY,
    label: "Danh sách nhóm lương",
    activeByPath: "",
  },
  {
    key: TAB.REWARDS_DISCIPLINE,
    label: "Danh sách người thân",
    activeByPath: "/pages/staff/award.html",
  },
  {
    key: TAB.REWARDS_DISCIPLINE,
    label: "Danh sách diện chính sách",
    activeByPath: "/pages/staff/award.html",
  },
  {
    key: TAB.REWARDS_DISCIPLINE,
    label: "Danh sách sổ bảo hiểm",
    activeByPath: "/pages/staff/award.html",
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
