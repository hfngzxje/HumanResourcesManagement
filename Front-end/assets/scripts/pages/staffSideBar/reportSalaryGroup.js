const apiTable = "https://localhost:7141/api/BaoCao/getBaoCaoDanhSachNhomLuong";
var TableColumns = [
  {
    label: "Chức danh",
    key: "chucDanh",
  },
  {
    label: "Bậc lương",
    key: "bacLuong",
  },
  {
    label: "Hệ số lương",
    key: "heSoLuong"
  },
  {
    label: "Lương co bản",
    key: "luongCoBan",
    type: 'currency',
  },
  {
    label: "Phụ cấp",
    key: "phuCap",
    type: 'currency'
  },
  {
    label: "Ghi chú",
    key: "khac"
  }
];

var bacLuong = [
  { label: "Tất cả", value: "" },
  { label: "Bậc 1", value: 1 },
  { label: "Bậc 2", value: 2 },
  { label: "Bậc 3", value: 3 },
  { label: "Bậc 4", value: 4 },
  { label: "Bậc 5", value: 5 },
  { label: "Bậc 6", value: 6 },
  { label: "Bậc 7", value: 7 }
];


async function handleSearch() {
  try {
    const formValue = getFormValues("report_form");
    const tableReport = document.getElementById("tableReport");
    const params = {
      ChucDanh: formValue.ChucDanh || "",
      BacLuong: formValue.BacLuong || ""
    };
    await tableReport.handleCallFetchData(params);
  }
  catch (error) {
    console.error("Error in handleSearch:", error);
  }
}
function chucDanhChange() {
  const phongban = document.querySelector('#chucdanh select')
  phongban.addEventListener("change", (event) => {
    handleSearch()
  });
}

function bacLuongChange() {
  const phongban = document.querySelector('#bacluong select')
  phongban.addEventListener("change", (event) => {
    handleSearch()
  });
}

function buildApiUrl() {
  return apiTable;
}
function inits() {
  chucDanhChange()
  bacLuongChange()
}

function renderActionByStatus() {
  const actionEl = document.getElementById("report_form_action");
  const buildButton = (label, type, icon) => {
    const btnEl = document.createElement("base-button");
    btnEl.setAttribute("label", label);
    btnEl.setAttribute("type", type);
    btnEl.setAttribute("icon", icon);
    return btnEl;
  };
  const pdfBtn = buildButton("PDF", "red", "bx bx-file-blank");
  const excelBtn = buildButton("Excel", "", "bx bx-spreadsheet");

  actionEl.append(pdfBtn, excelBtn);
}


document.addEventListener("DOMContentLoaded", () => {
  renderActionByStatus();
  handleSearch();
  inits();
});
