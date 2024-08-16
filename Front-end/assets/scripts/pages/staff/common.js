const params = new URL(document.location.toString()).searchParams;
const id = params.get("id");
const maNhanVien = localStorage.getItem("maNhanVien")
const vaitro = localStorage.getItem("vaiTroID");
const TAB = {
  RESUME: 1,
  PROFILE: 2,
  CULTURAL_PROFICIENCY: 4,
  FAMILY_RELATIONSHIP: 5,
  EMPLOYMENT_CONTRACT: 6,
  SALARY_PROFILE: 7,
  EMPLOYMENT_HISTORY: 8,
  REWARDS_DISCIPLINE: 9,
};
const tabList = document.querySelector("#tabList");
const tabDropdown = document.querySelector("#tabDropdown");

let currentPath = window.location.pathname; // text-white bg-blue-600 active
const tabListEl = [];

const TAB_LIST = [
  {
    key: TAB.RESUME,
    label: "Sơ yếu lý lịch",
    activeByPath: "/pages/staff/resume.html",
  },
  {
    key: TAB.RESUME,
    label: "Hồ sơ",
    activeByPath: "/pages/staff/profile.html",
  },
  {
    key: TAB.CULTURAL_PROFICIENCY,
    label: "Trình độ văn hóa",
    activeByPath: "/pages/staff/qualifications.html",
  },
  {
    key: TAB.FAMILY_RELATIONSHIP,
    label: "Quan hệ gia đình",
    activeByPath: "/pages/staff/FamilyRelationship.html"
  },
  {
    key: TAB.EMPLOYMENT_CONTRACT,
    label: "Hợp đồng lao động",
    activeByPath: "/pages/staff/laborContract.html",
  },
  {
    key: TAB.SALARY_PROFILE, label: "Hồ sơ lương",
    activeByPath: "/pages/staff/salaryRecord.html"
  },
  {
    key: TAB.EMPLOYMENT_HISTORY,
    label: "Quá trình công tác",
    activeByPath: "/pages/staff/workingProcess.html",
  },
  {
    key: TAB.REWARDS_DISCIPLINE,
    label: "Khen thưởng & Kỷ luật",
    activeByPath: "/pages/staff/award.html",
  },
];

function populateSelectOptions() {
  const baseSelectElement = document.querySelector("#tabDropdown select");

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
  tabDropdown.addEventListener('change', (event) => {
    const selectedValue = event.target.value;
    const selectedTab = TAB_LIST.find(tab => tab.key === Number(selectedValue));
    if (selectedTab) {
      const href = '../..' + selectedTab.activeByPath + '?id=' + id;
      window.location.href = href; // Chuyển hướng đến trang mới
    }
  });
}

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
    let _class =
      "inline-block px-4 py-3 rounded-t-lg hover:text-gray-900 hover:bg-gray-100 font-bold";
    const isActive = tab?.activeByPath !== "" && currentPath.includes(tab?.activeByPath);
    if (isActive) {
      _class += " text-white bg-blue-600";
    }
    aElement.id = getTabId(tab.key);
    aElement.href = '../..' + tab.activeByPath; // chuyển trang kèm id
    aElement.className = _class;
    aElement.textContent = tab.label;

    if (aElement.href.includes('award.html') && currentPath.includes('displince.html')) {
      aElement.className = "inline-block px-4 py-3 rounded-t-lg hover:text-gray-900 hover:bg-gray-100 font-bold text-white bg-blue-600";
    }
    if (aElement.href.includes('qualifications.html') && currentPath.includes('language.html')) {
      aElement.className = "inline-block px-4 py-3 rounded-t-lg hover:text-gray-900 hover:bg-gray-100 font-bold text-white bg-blue-600";
    }

    liElement.appendChild(aElement);
    tabList.appendChild(liElement);
    tabListEl.push(liElement);
  });
}

function init() {
  populateSelectOptions();
  handleSelectChange();
  renderTab();
  
}

window.addEventListener("DOMContentLoaded", () => {
  init();
});
