const apiTable = "https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/BaoCao/getBaoCaoSinhNhat";
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
    key: "ngaySinh"
  },
  {
    label: "Tháng sinh",
    key: "thangSinh",
  },
  {
    label: "Sinh nhật",
    key: "sinhNhat"
  },
  {
    label: "Tình trạng",
    key: "tinhTrang",
    type: 'noticeBirthdate'
  },
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
    const response = await fetch('https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/BaoCao/ExportBaoCaoSinhNhatToExcel', {
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
  link.download = 'BaoCao_DanhSachSinhNhat.xlsx';
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
    const response = await fetch('https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/BaoCao/ExportBaoCaoSinhNhatToPDF', {
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
  link.download = 'BaoCao_DanhSachSinhNhat.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}
// _______________________________________________________________________________________________________

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
  const pdfBtn = buildButton("PDFId","PDF", "red", "bx bx-file-blank");
  const excelBtn = buildButton("ExcelId","Excel", "", "bx bx-spreadsheet");

  excelBtn.addEventListener("click", () => {
    handleExportExcel();
  });
  pdfBtn.addEventListener("click", () => {
    handleExportPDF();
  });

  actionEl.append(pdfBtn, excelBtn);
}

async function handleSearch() {
  try {
    const formValue = getFormValues("report_form");
    const tableReport = document.getElementById("tableReport");

    const params = {
      PhongBan: formValue.PhongBan,
      StartDate: formValue.StartDate || "",
      EndDate: formValue.EndDate || "",
      Thang: formValue.Thang || "",
      Quy: formValue.Quy || ""
    };

    await tableReport.handleCallFetchData(params);

  } catch (error) {
    console.error("Error in handleSearch:", error);
  }
}
function buildApiUrl() {
  return apiTable;
}
function phongBanChange() {
  const phongban = document.querySelector('#phongban select')
  phongban.addEventListener("change", (event) => {
    handleSearch()
  });
}
function ThangChange() {
  const thang = document.querySelector('#thangsinh select')
  thang.addEventListener("change", (event) => {
    handleSearch()
  });
}
function QuyChange() {
  const quy = document.querySelector('#quy select')
  quy.addEventListener("change", (event) => {
    handleSearch()
  });
}
let fromDateChanged = false;
let toDateChanged = false;
function fromChange() {
  const fromDatePicker = document.querySelector('#tungay input');
  fromDatePicker.addEventListener("change", (event) => {
    fromDateChanged = true;
    dateChange();
  });
}

function toChange() {
  const toDatePicker = document.querySelector('#denngay input');
  toDatePicker.addEventListener("change", (event) => {
    toDateChanged = true;
    dateChange();
  });
}
function dateChange() {
  if (fromDateChanged && toDateChanged) {
    handleSearch();
  }
}
function inits() {
  phongBanChange()
  ThangChange()
  QuyChange()
  fromChange()
  toChange()
}
document.addEventListener("DOMContentLoaded", () => {
  renderActionByStatus();
  handleSearch();
  inits();
});
