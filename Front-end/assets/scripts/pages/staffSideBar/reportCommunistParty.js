const apiTable = "https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/BaoCao/getBaoCaoDanhSachDangVien";
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
    key: "ngaysinh"
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
    label: "Ngày vào đảng",
    key: "ngayVaoDang"
  },
  {
    label: "Ngày chính thức",
    key: "ngayVaoDangChinhThuc"
  },
  {
    label: "Phòng ban",
    key: "tenPhong",
  },
  {
    label: "Quê quán",
    key: "queQuan",
  }
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
  params.append('ToDate', formValue.ToDate || '');
  params.append('FromDate', formValue.FromDate || '');
  params.append('PhongBan', formValue.PhongBan || '');
  params.append('QueQuan', formValue.QueQuan || '');
  params.append('NamTuoiDang', formValue.NamTuoiDang || '');
  params.append('NamVaoDang', formValue.NamVaoDang || '');

  try {
    const response = await fetch('https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/BaoCao/ExportBaoCaoDangVienToExecl', {
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
  link.download = 'BaoCao_DanhSachDangVien.xlsx';
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
  params.append('ToDate', formValue.ToDate || '');
  params.append('FromDate', formValue.FromDate || '');
  params.append('PhongBan', formValue.PhongBan || '');
  params.append('QueQuan', formValue.QueQuan || '');
  params.append('NamTuoiDang', formValue.NamTuoiDang || '');
  params.append('NamVaoDang', formValue.NamVaoDang || '');

  try {
    const response = await fetch('https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/BaoCao/ExportBaoCaoDangVienToPDF', {
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
  link.download = 'BaoCao_DanhSachDangVien.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}
// _______________________________________________________________________________________________________


async function handleSearch() {
  try {
    const formValue = getFormValues("report_form");
    const tableReport = document.getElementById("tableReport");
    const params = {
      ToDate: formValue.ToDate,
      FromDate: formValue.FromDate,
      PhongBan: formValue.PhongBan || "",
      QueQuan: formValue.QueQuan,
      NamTuoiDang: formValue.NamTuoiDang,
      NamVaoDang: formValue.NamVaoDang
    };
    await tableReport.handleCallFetchData(params);
  }
  catch (error) {
    console.error("Error in handleSearch:", error);
  }

}
function queQuanChange() {
  const phongban = document.querySelector('#quequan input')
  phongban.addEventListener("change", (event) => {
    handleSearch()
  });
}
function phongBanChange() {
  const phongban = document.querySelector('#phongban select')
  phongban.addEventListener("change", (event) => {
    handleSearch()
  });
}
function namTuoiDangChange() {
  const phongban = document.querySelector('#namtuoidang input')
  phongban.addEventListener("change", (event) => {
    handleSearch()
  });
}
function namVaoDangChange() {
  const phongban = document.querySelector('#namvaodang input')
  phongban.addEventListener("change", (event) => {
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

  const fromDatePicker1 = document.querySelector('#tungay input');
  fromDatePicker1.addEventListener("changeDate", (event) => {
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

  const toDatePicker1 = document.querySelector('#denngay input');
  toDatePicker1.addEventListener("changeDate", (event) => {
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
  queQuanChange()
  phongBanChange()
  namTuoiDangChange()
  namVaoDangChange()
  toChange()
  dateChange()
}

function buildApiUrl() {
  return apiTable;
}
document.addEventListener("DOMContentLoaded", () => {
  renderActionByStatus();
  handleSearch();
  inits()
});
