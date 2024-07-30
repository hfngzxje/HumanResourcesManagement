const apiTable = "https://localhost:7141/api/BaoCao/getBaoCaoDanhSachNguoiThan";
var TableColumns = [
    {
        label: 'Họ tên',
        key: 'ten',
    },
    {
        label: 'Giới tính',
        key: 'gioiTinh',
    },
    {
        label: 'Ngày sinh',
        key: 'ngaysinh',
        type:'datetime'
    },
    {
        label: 'Quan hệ',
        key: 'quanHe',
        type:'gender'
    },
    {
        label: 'Nghề nghiệp',
        key: 'ngheNghiep'
    },
    {
        label: 'Quan hệ',
        key: 'quanHe',
    },
    {
        label: 'Địa chỉ',
        key: 'diaChi'
    },
    {
        label: 'Điện thoại',
        key: 'dienThoai'
    },
    {
        label: 'Nhân viên tham chiếu',
        key: 'tenNV'
    }
    ,
    {
        label: 'Ghi chú',
        key: 'khac'
    }
]
var locTheo = [
    { label: "Tất cả", value: 'Tất cả' },
    { label: "Mã nhân viên", value: 'Mã nhân viên' },
    { label: 'Quan hệ', value: 'Quan hệ' },
    { label: 'Tuổi', value: 'Tuổi' },
    { label: 'Giới tính', value: 'Giới tính' },
    { label: 'Phòng ban', value: 'Phòng ban' },
];
var gioiTinh = [
  { label: 'Tất cả', value: 'Tất cả' },
  { label: 'Nam', value: 'true' },
  { label: 'Nữ', value: 'false' },
];

document.addEventListener("DOMContentLoaded", () => {
  const filterSelect = document.querySelector(
    'base-select[description="Lọc theo"]'
  );
  const ma = document.querySelector(
    'base-select[description="Mã Nhân Viên"]'
  );
  const quanhe = document.querySelector(
    'base-select[description="Quan hệ"]'
  );
  const tuoitu = document.querySelector(
    'base-input-number[description="Tuổi từ"]'
  );
  const tuoiden = document.querySelector(
    'base-input-number[description="Tuổi đến"]'
  );
  const gioitinh = document.querySelector(
    'base-select[description="Giới tính"]'
  );
  const phongban = document.querySelector(
    'base-select[description="Phòng ban"]'
  );

  // Hàm để bật hoặc tắt trạng thái của các thẻ input và select
  function toggleInputs(enabled) {
    ma.disabled = !enabled;
    quanhe.disabled = !enabled;
    tuoitu.disabled = !enabled;
    tuoiden.disabled = !enabled;
    gioitinh.disabled = !enabled;
    phongban.disabled = !enabled;
  }
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
    GioiTinh: "Tất cả",
    MaNV:"",
    QuanHe: "",
    TuoiTu: "",
    TuoiDen:"",
    PhongBan: ""
  };
  if (formValue.searchRules === "Mã nhân viên") {
    params.MaNV = formValue.MaNV;
  }
  if (formValue.searchRules === "Quan hệ") {
    params.QuanHe = formValue.QuanHe;
  }
  if (formValue.searchRules === "Tuổi") {
    params.TuoiTu = formValue.TuoiTu;
    params.TuoiDen = formValue.TuoiDen;
  }
  if (formValue.searchRules === "Giới tính") {
    params.GioiTinh = formValue.GioiTinh;
  }
  if (formValue.searchRules === "Phòng ban") {
    params.PhongBan = formValue.PhongBan;
  }

  tableReport.handleCallFetchData(params);

  console.log("Param: " , params)
}

function buildApiUrl() {
  return apiTable;
}

function handleSelectFilterBy() {
  const locTheoEl = document.querySelector("#loctheo select");
  const maEl = document.querySelector("#manhanvien select");
  const quanHeEl = document.querySelector("#quanhe select");
  const tuoiTuEl = document.querySelector("#tuoitu input");
  const tuoiDenEl = document.querySelector("#tuoiden input");
  const gioiTinhEl = document.querySelector("#gioitinh select");
  const phongBanEl = document.querySelector("#phongban select");
  locTheoEl.addEventListener("input", () => {
    const locTheoValue = locTheoEl.value;
    console.log("locTheoValue ", locTheoValue);

    if (locTheoValue === "Tất cả") {
      maEl.disabled = false;
      quanHeEl.disabled = false;
      tuoiTuEl.disabled = false;
      tuoiDenEl.disabled = false;
      gioiTinhEl.disabled = false;
      phongBanEl.disabled = false;
      return;
    }

    maEl.disabled = true;
    quanHeEl.disabled = true;
    tuoiTuEl.disabled = true;
    tuoiDenEl.disabled = true;
    gioiTinhEl.disabled = true;
    phongBanEl.disabled = true;

    
    if (locTheoValue === "Mã nhân viên") {
      maEl.disabled = false;
      alert("Ma nhan vien")
    }
    if (locTheoValue === "Quan hệ") {
      quanHeEl.disabled = false;
    }
    if (locTheoValue === "Tuổi") {
        tuoiTuEl.disabled = false;
        tuoiDenEl.disabled = false
      }
    if (locTheoValue === "Giới tính") {
      gioiTinhEl.disabled = false;
    }
    if (locTheoValue === "Phòng ban") {
        phongBanEl.disabled = false;
      }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderActionByStatus();
  handleSelectFilterBy();
  handleSearch();
});
