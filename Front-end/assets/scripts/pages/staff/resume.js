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
