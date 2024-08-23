const apiTable = "https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/BaoCao/getBaoCaoDanhSachNhomLuong";
var TableColumns = [
  {
    label: "Ngạch công chức",
    key: "ngachCongChuc",
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
  { label: "Bậc 7", value: 7 },
  { label: "Bậc 8", value: 8 },
  { label: "Bậc 9", value: 9 }
];


// _____________________________________excel_________________________________________________________
async function handleExportExcel() {
  const formValue = getFormValues("report_form");
  const params = new FormData();
  params.append('NgachCongChuc', formValue.NgachCongChuc || '');
  params.append('BacLuong', formValue.BacLuong || '');

  try {
    const response = await fetch('https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/BaoCao/ExportBaoCaoNhomLuongToExcel', {
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
  link.download = 'BaoCao_DanhSachNhomLuong.xlsx';
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
  params.append('NgachCongChuc', formValue.NgachCongChuc || '');
  params.append('BacLuong', formValue.BacLuong || '');

  try {
    const response = await fetch('https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/BaoCao/ExportBaoCaoNhomLuongToPDF', {
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
  link.download = 'BaoCao_DanhSachNhomLuong.pdf';
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
      NgachCongChuc: formValue.NgachCongChuc || "",
      BacLuong: formValue.BacLuong || ""
    };
    await tableReport.handleCallFetchData(params);
  }
  catch (error) {
    console.error("Error in handleSearch:", error);
  }
}
function chucDanhChange() {
  const phongban = document.querySelector('#ngachcongchuc select')
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


document.addEventListener("DOMContentLoaded", () => {
  renderActionByStatus();
  handleSearch();
  inits();
});
