const params = new URL(document.location.toString()).searchParams;
const id = params.get("id");
const maNhanVien = localStorage.getItem("maNhanVien")
const vaitro = localStorage.getItem("vaiTroID");
const TAB = {
  RESUME: 1,
  PROFILE: 2,
  PERSON_HISTORY: 3,
  CULTURAL_PROFICIENCY: 4,
  FAMILY_RELATIONSHIP: 5,
  EMPLOYMENT_CONTRACT: 6,
  SALARY_PROFILE: 7,
  EMPLOYMENT_HISTORY: 8,
  REWARDS_DISCIPLINE: 9,
};
const tabList = document.querySelector("#tabList");
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
    key: TAB.PERSON_HISTORY,
    label: "Lịch sử bản thân",
    activeByPath: "",
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

    liElement.appendChild(aElement);
    tabList.appendChild(liElement);
    tabListEl.push(liElement);
  });
}

function init() {
  renderTab();
}

window.addEventListener("DOMContentLoaded", () => {
  init();
});
