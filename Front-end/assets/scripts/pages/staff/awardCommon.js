// const param = new URL(document.location.toString()).searchParams;
// const id = param.get("id");
// const maNhanVien = localStorage.getItem("maNhanVien");
// const vaitro = localStorage.getItem("vaiTroID");
const TABAWARD = {
  RESUME: 10,
  SALARY_UP: 11,
};

const TAB_LIST_AWARD = [
  {
    key: TABAWARD.RESUME,
    label: "Khen thưởng",
    activeByPath: "/pages/staff/award.html",
  },
  {
    key: TABAWARD.SALARY_UP,
    label: "Kỷ luật",
    activeByPath: "/pages/staff/displince.html",
  }
  
];

const tabListAward = document.querySelector("#tabAward");

function populateSelectOptions() {
    const baseSelectElement = document.querySelector("#tabAward select");
  
    if (!baseSelectElement) return;
  
    baseSelectElement.innerHTML = ''; // Xóa các tùy chọn hiện tại nếu có
  
    TAB_LIST_AWARD.forEach((tab) => {
      const optionEl = document.createElement('option');
      optionEl.value = tab.key;
      optionEl.textContent = tab.label;
      baseSelectElement.appendChild(optionEl);
    });
  
    // Đặt giá trị của select tương ứng với đường dẫn hiện tại
    const currentTab = TAB_LIST_AWARD.find(tab => tab.activeByPath !== "" && window.location.pathname.includes(tab.activeByPath));
    if (currentTab) {
      baseSelectElement.value = currentTab.key;
    }
  }
  

function handleSelectChange() {
  tabListAward.addEventListener('change', (event) => {
    const selectedValue = event.target.value;
    const selectedTab = TAB_LIST_AWARD.find(tab => tab.key === Number(selectedValue));
    if (selectedTab) {
      const href = '../..' + selectedTab.activeByPath + '?id=' + id;
      window.location.href = href; // Chuyển hướng đến trang mới
    }
  });
}

function inits() {
  populateSelectOptions();
  handleSelectChange();
}

window.addEventListener('DOMContentLoaded', () => {
  inits();
});
