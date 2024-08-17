const apiTable = "https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/BaoCao/getBaoCaoDanhSachDienChinhSach";
var TableColumns = [
    {
        label: 'Mã nhân viên',
        key: 'maNV',
    },
    {
        label: 'Họ tên',
        key: 'tenNV',
    },
    {
        label: 'Ngày sinh',
        key: 'ngaySinh'
    },
    {
        label: 'Giới tính',
        key: 'gioiTinh',
        type:'gender'
    },
    {
        label: 'Điện thoại',
        key: 'dienThoai'
    },
    {
        label: 'Phòng ban',
        key: 'phongBan',
    },
    {
        label: 'Diện chính sách',
        key: 'dienChinhSach',
    }
  ]
  
  var gioiTinh = [
    { label: 'Tất cả', value: '' },
    { label: 'Nam', value: 'true' },
    { label: 'Nữ', value: 'false' }
  ]

// _____________________________________excel_________________________________________________________
async function handleExportExcel() {
  const formValue = getFormValues("report_form");
  const params = new FormData();
  params.append('searchRulesDiaChi', formValue.searchRulesDiaChi );
  params.append('searchRulesNgayThang', formValue.searchRulesNgayThang );
  params.append('FromDate', formValue.FromDate || '');
  params.append('ToDate', formValue.ToDate || '');
  params.append('GioiTinh', formValue.GioiTinh || '');
  params.append('PhongBan', formValue.PhongBan || '');
  params.append('QueQuan', formValue.QueQuan || '');

  try {
    const response = await fetch('https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/BaoCao/ExportBaoCaoDienChinhSachToExecl', {
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
  link.download = 'BaoCao_DanhSachDienChinhSach.xlsx';
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
  params.append('searchRulesDiaChi', formValue.searchRulesDiaChi || 'Quê quán');
  params.append('searchRulesNgayThang', formValue.searchRulesNgayThang || 'Năm sinh');
  params.append('FromDate', formValue.FromDate || '');
  params.append('ToDate', formValue.ToDate || '');
  params.append('GioiTinh', formValue.GioiTinh || '');
  params.append('PhongBan', formValue.PhongBan || '');
  params.append('QueQuan', formValue.QueQuan || '');

  try {
    const response = await fetch('https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/BaoCao/ExportBaoCaoDienChinhSachToPDF', {
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
  link.download = 'BaoCao_DanhSachDienChinhSach.pdf';
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
    
    // Khởi tạo đối tượng params
    const params = {
      GioiTinh: formValue.GioiTinh || "Tất cả",
      PhongBan: formValue.PhongBan || "",
    };
   
    // Giả sử handleCallFetchData là một hàm không đồng bộ
    await tableReport.handleCallFetchData(params);
     
  } catch (error) {
    console.error("Error in handleSearch:", error);
  }
  
}

function phongBanChange() {
  const phongban = document.querySelector('#phongban select')
  phongban.addEventListener("change", (event) => {
      handleSearch()
  });
}
function gioiTinhChange() {
  const gioitinh = document.querySelector('#gioitinh select')
  gioitinh.addEventListener("change", (event) => {
      handleSearch()
  });
}

function buildApiUrl() {
  return apiTable;
}
function inits(){
  phongBanChange()
  gioiTinhChange()
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

document.addEventListener("DOMContentLoaded", () => {
  renderActionByStatus()
  handleSearch()
  inits()
});
