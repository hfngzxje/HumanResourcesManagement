const apiTable = "https://localhost:7141/api/BaoCao/getBaoCaoDanhSachNhanVien";
var TableColumns = [
  {
    label: "Mã nhân viên",
    key: "ma",
  },
  {
    label: "Họ tên",
    key: "ten",
  },
  {
    label: "Ngày sinh",
    key: "ngaysinh",
    type: "datetime",
  },
  {
    label: "Giới tính",
    key: "gioitinh",
    type: "gender",
  },
  {
    label: "Điện thoại",
    key: "didong",
  },
  {
    label: "Phòng ban",
    key: "phong",
  },
  {
    label: "Trạng thái",
    key: "trangthai",
  },
];
var locTheo = [
  { label: "Tất cả", value: 'Tất cả' },
  { label: "Trạng thái", value: 'Trạng thái' },
  { label: "Phòng ban", value: 'Phòng ban' },
  { label: "Ngày tháng", value: 'Ngày tháng' },
  { label: "Giới tính", value: 'Giới tính' },
];
var trangThai = [
  { label: "Tất cả", value: 0 },
  { label: "Hoạt động", value: 1 },
  { label: "Nghỉ việc", value: 2 },
];
var gioiTinh = [
  { label: "Tất cả", value: 'Tất cả' },
  { label: "Nam", value: 'true' },
  { label: "Nữ", value: 'false' },
];

document.addEventListener("DOMContentLoaded", () => {
  const filterSelect = document.querySelector(
    'base-select[description="Lọc theo"]'
  );
  const fromDate = document.querySelector(
    'base-datepicker[description="Từ ngày"]'
  );
  const toDate = document.querySelector(
    'base-datepicker[description="Đến ngày"]'
  );
  const statusSelect = document.querySelector(
    'base-select[description="Trạng thái"]'
  );
  const departmentSelect = document.querySelector(
    'base-select[description="Phòng ban"]'
  );
  const genderSelect = document.querySelector(
    'base-select[description="Giới tính"]'
  );

  // Hàm để bật hoặc tắt trạng thái của các thẻ input và select
  function toggleInputs(enabled) {
    fromDate.disabled = !enabled;
    toDate.disabled = !enabled;
    statusSelect.disabled = !enabled;
    departmentSelect.disabled = !enabled;
    genderSelect.disabled = !enabled;
  }

  // Cập nhật trạng thái của các thẻ khi chọn giá trị từ "Lọc theo"
  // filterSelect.addEventListener("change", (event) => {
  //   if (event.target.value === "Tất cả") {
  //     toggleInputs(true); // Bật tất cả các thẻ
  //   } else {
  //     toggleInputs(false); // Tắt tất cả các thẻ
  //   }
  // });

  // Khởi tạo trạng thái ban đầu
  toggleInputs(filterSelect.value === "Tất cả");
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

  // removeBtn.addEventListener('click', handleRemove)
  // saveBtn.addEventListener('click', handleSave)
  // createBtn.addEventListener('click', handleCreate)

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
    searchRules: formValue.searchRules,
    GioiTinh: "Tất cả",
    ToDate: "",
    FromDate:"",
    PhongBan: ""
  };
  if (formValue.searchRules === "Trạng thái") {
    params.trangthai = formValue.trangthai;
  }
  if (formValue.searchRules === "Phòng ban") {
    params.PhongBan = formValue.PhongBan;
  }
  if (formValue.searchRules === "Ngày tháng") {
    params.FromDate = formValue.FromDate;
    params.ToDate = formValue.ToDate;
  }
  if (formValue.searchRules === "Giới tính") {
    params.GioiTinh = formValue.GioiTinh;
  }

  
  tableReport.handleCallFetchData(params);


}

function showDateTimeNow() {
  const dateTimeElement = document.getElementById("datetime");
  if (!dateTimeElement) return;
  const now = new Date();
  const formattedDate = formatVietnameseDate(now);
  dateTimeElement.textContent = `Hà Nội, ${formattedDate}`;
}
function formatVietnameseDate(date) {
  const day = date.getDate();
  const month = date.toLocaleString("vi-VN", { month: "long" });
  const year = date.getFullYear();
  return `${day} ${month} năm ${year}`;
}
function buildApiUrl() {
  return apiTable;
}

function handleSelectFilterBy() {
  const locTheoEl = document.querySelector("#loctheo select");
  const trangThaiEl = document.querySelector("#trangthai select");
  const phongBanEl = document.querySelector("#phongban select");
  const tuNgayEl = document.querySelector("#tungay input");
  const denNgayEl = document.querySelector("#denngay input");
  const gioiTinhEl = document.querySelector("#gioitinh select");
  locTheoEl.addEventListener("input", () => {
    const locTheoValue = locTheoEl.value;
    console.log("locTheoValue ", locTheoValue);

    if (locTheoValue === "Tất cả") {
      trangThaiEl.disabled = false;
      phongBanEl.disabled = false;
      tuNgayEl.disabled = false;
      denNgayEl.disabled = false;
      gioiTinhEl.disabled = false;
      return;
    }

    trangThaiEl.disabled = true;
    phongBanEl.disabled = true;
    tuNgayEl.disabled = true;
    denNgayEl.disabled = true;
    gioiTinhEl.disabled = true;
    if (locTheoValue === "Trạng thái") {
      trangThaiEl.disabled = false;
      phongBanEl.value ="";
    }
    if (locTheoValue === "Phòng ban") {
      phongBanEl.disabled = false;
      gioiTinhEl.value= "Tất cả"
    }
    if (locTheoValue === "Ngày tháng") {
      tuNgayEl.disabled = false;
      denNgayEl.disabled = false;
      phongBanEl.value ="";
      gioiTinhEl.value= "Tất cả"
    }
    if (locTheoValue === "Giới tính") {
      gioiTinhEl.disabled = false;
      phongBanEl.value ="";
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  console.log(123);
  renderActionByStatus();
  showDateTimeNow();
  handleSelectFilterBy();
  handleSearch();
});
