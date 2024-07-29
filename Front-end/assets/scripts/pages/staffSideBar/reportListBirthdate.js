const apiTable = "https://localhost:7141/api/BaoCao/getBaoCaoSinhNhat";
var TableColumns = [
  {
    label: "Mã nhân viên",
    key: "maNV",
  },
  {
    label: "Họ tên",
    key: "tenNV",
  },
  {
    label: "Tên phòng",
    key: "tenPhong"
  },
  {
    label: "Ngày sinh",
    key: "ngaySinh",
    type: 'datetime',
  },
  {
    label: "Tháng sinh",
    key: "thangSinh",
  },
  {
    label: "Sinh nhật",
    key: "sinhNhat",
    type: 'datetime'
  },
  {
    label: "Tình trạng",
    key: "tinhTrang",
    type: 'noticeBirthdate'
  },
];

var locTheo = [
  { label: "Tất cả", value: 'Tất cả' },
  { label: "Phòng ban", value: 'Phòng ban' },
  { label: "Ngày tháng", value: 'Ngày tháng' },
  { label: "Tháng", value: 'Tháng' },
  { label: "Quý", value: 'Quý' },
];
var thangSinh = [
  { label: "Tất cả", value: "" },
  { label: "Tháng 1", value: 1 },
  { label: "Tháng 2", value: 2 },
  { label: "Tháng 3", value: 3 },
  { label: "Tháng 4", value: 4 },
  { label: "Tháng 5", value: 5 },
  { label: "Tháng 6", value: 6 },
  { label: "Tháng 7", value: 7 },
  { label: "Tháng 8", value: 8 },
  { label: "Tháng 9", value: 9 },
  { label: "Tháng 10", value: 10 },
  { label: "Tháng 11", value: 11 },
  { label: "Tháng 12", value: 12 },
];
var Quy = [
  { label: "Tất cả", value: "" },
  { label: "Quý 1", value: 1 },
  { label: "Quý 2", value: 2 },
  { label: "Quý 3", value: 3 },
  { label: "Quý 4", value: 4 },
];

document.addEventListener("DOMContentLoaded", () => {
  const filterSelect = document.querySelector(
    'base-select[description="Lọc theo"]'
  );
  const StartDate = document.querySelector(
    'base-datepicker[description="Từ ngày"]'
  );
  const EndDate = document.querySelector(
    'base-datepicker[description="Đến ngày"]'
  );
  const PhongBan = document.querySelector(
    'base-select[description="Phòng ban"]'
  );
  const Thang = document.querySelector(
    'base-select[description="Tháng sinh"]'
  );
  const Quy = document.querySelector(
    'base-select[description="Quý"]'
  );

  // Hàm để bật hoặc tắt trạng thái của các thẻ input và select
  function toggleInputs(enabled) {
    StartDate.disabled = !enabled;
    EndDate.disabled = !enabled;
    PhongBan.disabled = !enabled;
    Thang.disabled = !enabled;
    Quy.disabled = !enabled;
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
    PhongBan: "",
    StartDate: "",
    EndDate:"",
    Thang: "",
    Quy: ""
  };
  if (formValue.searchRules === "Ngày tháng") {
    params.StartDate = formValue.StartDate;
    params.EndDate = formValue.EndDate
  }
  if (formValue.searchRules === "Phòng ban") {
    params.PhongBan = formValue.PhongBan;
  }
  if (formValue.searchRules === "Tháng") {
    params.Thang = formValue.Thang;
  }
  if (formValue.searchRules === "Quý") {
    params.Quy = formValue.Quy;
  }

  
  tableReport.handleCallFetchData(params);


}

function buildApiUrl() {
  return apiTable;
}

function handleSelectFilterBy() {
  const locTheoEl = document.querySelector("#loctheo select");
  const tuNgayEl = document.querySelector("#tungay input");
  const denNgayEl = document.querySelector("#denngay input");
  const phongBanEl = document.querySelector("#phongban select");
  const thangSinhEl = document.querySelector("#thangsinh select");
  const quyEl = document.querySelector("#quy select");
  locTheoEl.addEventListener("input", () => {
    const locTheoValue = locTheoEl.value;
    console.log("locTheoValue ", locTheoValue);

    if (locTheoValue === "Tất cả") {
      tuNgayEl.disabled = false;
      denNgayEl.disabled = false;
      phongBanEl.disabled = false;
      thangSinhEl.disabled = false;
      quyEl.disabled = false;

      tuNgayEl.value ="";
      denNgayEl.value="";
      phongBanEl.value="";
      return;
    }

    tuNgayEl.disabled = true;
    denNgayEl.disabled = true;
    phongBanEl.disabled = true;
    thangSinhEl.disabled = true;
    quyEl.disabled = true;
    if (locTheoValue === "Ngày tháng") {
        tuNgayEl.disabled = false;
        denNgayEl.disabled = false;
        phongBanEl.value = null
      }
    if (locTheoValue === "Phòng ban") {
      phongBanEl.disabled = false;
      if (phongBanEl.options.length > 0) {
        phongBanEl.value = phongBanEl.options[0].value;
      }
      tuNgayEl.value ="";
      denNgayEl.value="";
    }
    if (locTheoValue === "Tháng") {
      thangSinhEl.disabled = false;
      phongBanEl.value = null
      tuNgayEl.value ="";
      denNgayEl.value="";
    }
    
    if (locTheoValue === "Quý") {
      quyEl.disabled = false;
      phongBanEl.value = null
      tuNgayEl.value ="";
      denNgayEl.value="";
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderActionByStatus();
  handleSelectFilterBy();
  handleSearch();

 
});
