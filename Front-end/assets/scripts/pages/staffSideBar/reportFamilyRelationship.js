const apiTable = "https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/BaoCao/getBaoCaoDanhSachNguoiThan";
var TableColumns = [
  {
    label: 'Họ tên',
    key: 'ten',

  },
  {
    label: 'Giới tính',
    key: 'gioiTinh',
    type: 'gender'
  },
  {
    label: 'Ngày sinh',
    key: 'ngaySinh'
  },
  {
    label: 'Quan hệ',
    key: 'quanHe'
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

var gioiTinh = [
  { label: "Tất cả", value: '' },
  { label: "Nam", value: 'true' },
  { label: "Nữ", value: 'false' },
];


function renderActionByStatus() {
  const actionEl = document.getElementById("report_form_action");
  const buildButton = (id, label, type, icon) => {
    const btnEl = document.createElement("base-button");
    btnEl.setAttribute('id', id)
    btnEl.setAttribute("label", label);
    btnEl.setAttribute("type", type);
    btnEl.setAttribute("icon", icon);
    return btnEl;
  };
  const pdfBtn = buildButton("PDFId", "PDF", "red", "bx bx-file-blank");
  const excelBtn = buildButton("ExcelId", "Excel", "", "bx bx-spreadsheet");
  excelBtn.addEventListener("click", () => {
    handleExportExcel();
  });
  pdfBtn.addEventListener("click", () => {
    handleExportPDF();
  });
  actionEl.append(pdfBtn, excelBtn);
}

// _____________________________________excel_________________________________________________________
async function handleExportExcel() {
  const formValue = getFormValues("report_form");
  const params = new FormData();
  params.append('GioiTinh', formValue.GioiTinh || '');
  params.append('MaNV', formValue.MaNV || '');
  params.append('QuanHe', formValue.QuanHe || '');
  params.append('TuoiTu', formValue.TuoiTu || '');
  params.append('TuoiDen', formValue.TuoiDen || '');
  params.append('PhongBan', formValue.PhongBan || '');

  try {
    const response = await fetch('https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/BaoCao/ExportBaoCaoNguoiThanToExecl', {
      method: 'POST',
      body: params,
      headers: {
        'accept': '*/*',
      }
    });

    if (response.ok) {
      const blob = await response.blob();
      createDownloadLinkExcel(blob);
    } else {
      console.error('Export failed:', response.statusText);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

function createDownloadLinkExcel(blob) {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'BaoCao_DanhSachNguoiThan.xlsx';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}
// _________________________________________________________________________________________________

// ____________________________________________PDF____________________________________________________
async function handleExportPDF() {
  const formValue = getFormValues("report_form");
  const params = new FormData();
  params.append('GioiTinh', formValue.GioiTinh || '');
  params.append('MaNV', formValue.MaNV || '');
  params.append('QuanHe', formValue.QuanHe || '');
  params.append('TuoiTu', formValue.TuoiTu || '');
  params.append('TuoiDen', formValue.TuoiDen || '');
  params.append('PhongBan', formValue.PhongBan || '');

  try {
    const response = await fetch('https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/BaoCao/ExportBaoCaoNguoiThanToPDF', {
      method: 'POST',
      body: params,
      headers: {
        'accept': '*/*',
      }
    });

    if (response.ok) {
      const blob = await response.blob();
      createDownloadLinkPDF(blob);
    } else {
      console.error('Export failed:', response.statusText);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

function createDownloadLinkPDF(blob) {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'BaoCao_DanhSachNguoiThan.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}
// _______________________________________________________________________________________________________

let thongTinPhongBan = null

function apiMaNV() {
  if (!thongTinPhongBan) {
    return false
  }
  return 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/NhanVien/getByPhongBan?idPhong=' + thongTinPhongBan
}
function layThongTinMaNV() {
  const ma = document.getElementById('manhanvien')
  ma.renderOption()
}
async function getMaNVTheoPhongBanDauTien() {
  try {
    const response = await $.ajax({
      url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/PhongBan/getAllPhongBan',
      method: 'GET',
      contentType: 'application/json',
    });
    const phongBanDauTien = response[0]
    thongTinPhongBan = phongBanDauTien.id
    layThongTinMaNV()
  } catch (error) {
    console.log("Error", "ajaj")
  }
}


function buildApiUrl() {
  return apiTable;
}

async function handleSearch() {
  try {
    const formValue = getFormValues("report_form");
    const tableReport = document.getElementById("tableReport");
    const params = {
      GioiTinh: formValue.GioiTinh || "",
      MaNV: formValue.MaNV || "",
      QuanHe: formValue.QuanHe || "",
      TuoiTu: formValue.TuoiTu || "",
      TuoiDen: formValue.TuoiDen || "",
      PhongBan: formValue.PhongBan || ""
    };
    await tableReport.handleCallFetchData(params);

  } catch (error) {
    console.error("Error in handleSearch:", error);
  }
}
function maNhanVienChange() {
  const phongban = document.querySelector('#manhanvien select')
  phongban.addEventListener("change", (event) => {
    handleSearch()
  });
}
function quanHeChange() {
  const phongban = document.querySelector('#quanhe select')
  phongban.addEventListener("change", (event) => {
    handleSearch()
  });
}
function gioiTinhChange() {
  const phongban = document.querySelector('#gioitinh select')
  phongban.addEventListener("change", (event) => {
    handleSearch()
  });
}
function phongBanChange() {
  const phongban = document.querySelector('#phongban select')
  phongban.addEventListener("change", (event) => {
    thongTinPhongBan = event.target.value
    layThongTinMaNV()
    handleSearch()
  });
}
let tuoiTuChanged = false;
let tuoiDenChanged = false;

function fromChange() {
  const fromDatePicker = document.querySelector('#tuoitu input');
  fromDatePicker.addEventListener("change", (event) => {
    tuoiTuChanged = true;
    dateChange();
  });

  const fromDatePicker1 = document.querySelector('#tuoitu input');
  fromDatePicker1.addEventListener("changeDate", (event) => {
    tuoiTuChanged = true;
    dateChange();
  });
}

function toChange() {
  const toDatePicker = document.querySelector('#tuoiden input');
  toDatePicker.addEventListener("change", (event) => {
    tuoiDenChanged = true;
    dateChange();
  });

  const toDatePicker1 = document.querySelector('#tuoiden input');
  toDatePicker1.addEventListener("changeDate", (event) => {
    tuoiDenChanged = true;
    dateChange();
  });
}
function dateChange() {
  if (tuoiDenChanged && tuoiTuChanged) {
    handleSearch();
  }
}

function inits() {
  maNhanVienChange()
  quanHeChange()
  gioiTinhChange()
  phongBanChange()
  fromChange()
  toChange()
  getMaNVTheoPhongBanDauTien()
}
document.addEventListener("DOMContentLoaded", () => {
  renderActionByStatus()
  handleSearch()
  inits()
});
