const params = new URL(document.location.toString()).searchParams;
const id = params.get("id");

const TAB = {
  RESUME: 1 ,
  PERSON_HISTORY: 2,
  CULTURAL_PROFICIENCY: 3,
  FAMILY_RELATIONSHIP: 4,
  EMPLOYMENT_CONTRACT: 5,
  SALARY_PROFILE: 6,
  EMPLOYMENT_HISTORY: 7,
  REWARDS_DISCIPLINE: 8,
};
const tabList = document.querySelector("#tabList");
let currentPath = window.location.pathname; // text-white bg-blue-600 active
const tabListEl = [];

const TAB_LIST = [
  {
    key: TAB.RESUME,
    label: "Tổng Quan",
    iconClass: "fas fa-user",
    activeByPath: "",
  },
  {
    key: TAB.PERSON_HISTORY,
    label: "Hồ Sơ",
    activeByPath: "",
  },
  {
    key: TAB.CULTURAL_PROFICIENCY,
    label: "Hợp Đồng",
    activeByPath: "",
  },
  { key: TAB.FAMILY_RELATIONSHIP, 
    label: "Bảng Lương", 
    activeByPath: "" },
  {
    key: TAB.EMPLOYMENT_CONTRACT,
    label: "Thuyên Chuyển",
    activeByPath: "",
  },
  { key: TAB.SALARY_PROFILE, label: "Nghỉ Việc",
    activeByPath: "" },
  {
    key: TAB.EMPLOYMENT_HISTORY,
    label: "Khen Thưởng",
    activeByPath: "",
  },
  {
    key: TAB.REWARDS_DISCIPLINE,
    label: "Báo Cáo",
    activeByPath: "",
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
    const liElement = document.createElement("ul");
    liElement.className = "me-2";

    const aElement = document.createElement("a");
    let _class =
      "inline-block px-4 py-3 rounded-t-lg hover:text-gray-900 hover:bg-gray-100";
    const isActive = tab?.activeByPath !== "" && currentPath.includes(tab?.activeByPath) ;
    if (isActive) {
      _class += " text-white bg-blue-600";
    }
    aElement.id = getTabId(tab.key);
    aElement.href = '../..' + tab.activeByPath + '?id=' + id; // chuyển trang kèm id
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

