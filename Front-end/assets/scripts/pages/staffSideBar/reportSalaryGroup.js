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

var locTheo = [
  { label: "Tất cả", value: 'Tất cả' },
  { label: "Chức danh", value: 'Chức danh' },
  { label: "Bậc lương", value: 'Bậc lương' }
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

document.addEventListener("DOMContentLoaded", () => {
  const filterSelect = document.querySelector(
    'base-select[description="Lọc theo"]'
  );
  const ChucDanh = document.querySelector(
    'base-datepicker[description="Chức danh"]'
  );
  const BacLuong = document.querySelector(
    'base-datepicker[description="Bậc lương"]'
  );

  // Hàm để bật hoặc tắt trạng thái của các thẻ input và select
  function toggleInputs(enabled) {
    ChucDanh.disabled = !enabled;
    BacLuong.disabled = !enabled;
  }
//   toggleInputs(filterSelect.value === "Tất cả");
});

function renderActionByStatus() {
  const actionEl = document.getElementById("report_form_action");
  const buildButton = (label, type, icon) => {
    const btnEl = document.createElement("base-button");
    btnEl.setAttribute("label", label);
    btnEl.setAttribute("type", type);
    btnEl.setAttribute("icon", icon);
    return btnEl;
  };
  const DisplayBtn = buildButton("Tìm báo cáo", "green", "bx bx-search");
  const pdfBtn = buildButton("PDF", "red", "bx bx-file-blank");
  const excelBtn = buildButton("Excel", "", "bx bx-spreadsheet");

  DisplayBtn.addEventListener("click", () => {
    handleSearch();
  });

  actionEl.append(DisplayBtn, pdfBtn, excelBtn);

  document.addEventListener("DOMContentLoaded", () => {
    DisplayBtn.click();
  });
}

function handleSearch() {
  
  const formValue = getFormValues("report_form");
  console.log("Form: " , formValue)
  const tableReport = document.getElementById("tableReport");
  if (formValue.searchRules === "Tất cả") {
    tableReport.handleCallFetchData(formValue);
    return;
  }
  const params = {
    ChucDanh: "",
    BacLuong: ""
  };
  if (formValue.searchRules === "Chức danh") {
    params.ChucDanh = formValue.ChucDanh
  }
  if (formValue.searchRules === "Bậc lương") {
    params.BacLuong = formValue.BacLuong;
  }
  tableReport.handleCallFetchData(params);
}

function buildApiUrl() {
  return apiTable;
}

function handleSelectFilterBy() {
  const locTheoEl = document.querySelector("#loctheo select");
  const chucDanhE1 = document.querySelector("#chucdanh select");
  const bacLuongE1 = document.querySelector("#bacluong select");

  locTheoEl.addEventListener("input", () => {
    const locTheoValue = locTheoEl.value;
    console.log("locTheoValue ", locTheoValue);

    if (locTheoValue === "Tất cả") {
      chucDanhE1.disabled = false;
      bacLuongE1.disabled = false;

      chucDanhE1.value ="";
      return;
    }

    chucDanhE1.disabled = true;
    bacLuongE1.disabled = true;

    if (locTheoValue === "Chức danh") {
        chucDanhE1.disabled = false;
      }
    if (locTheoValue === "Bậc lương") {
      bacLuongE1.disabled = false;
      chucDanhE1.value=""
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderActionByStatus();
  handleSelectFilterBy();
  handleSearch();

 
});
