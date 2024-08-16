const apiTable = "https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/BaoCao/getBaoCaoDanhSachBaoHiem";
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
        key: 'ngaySinh',
        type: 'datetime'
    },
    {
        label: 'BHYT',
        key: 'bhyt'
    },
    {
        label: 'BHXH',
        key: 'bhxh'
    },
    {
        label: 'Giới tính',
        key: 'gioiTinh',
        type:'gender'
    },
    {
        label: 'Phòng ban',
        key: 'tenPhongBan',
    }
  ]


// _____________________________________excel_________________________________________________________
async function handleExportExcel() {
    const formValue = getFormValues("report_form");
    const params = new FormData();
    params.append('MaNV', formValue.MaNV || '');
    params.append('idPhongBan', formValue.idPhongBan || '');

  try {
    const response = await fetch('https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/BaoCao/ExportBaoCaoBaoHiemToExcel', {
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
  link.download = 'BaoCao_DanhSachBaoHiem.xlsx';
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
  params.append('MaNV', formValue.MaNV || '');
  params.append('idPhongBan', formValue.idPhongBan || '');

  try {
    const response = await fetch('https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/BaoCao/ExportBaoCaoBaoHiemToPDF', {
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
  link.download = 'BaoCao_DanhSachBaoHiem.pdf';
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
        MaNV: formValue.MaNV || "",
        idPhongBan: formValue.idPhongBan || "",
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
function maNhanVienChange() {
  const gioitinh = document.querySelector('#manhanvien select')
  gioitinh.addEventListener("change", (event) => {
      handleSearch()
  });
}

function buildApiUrl() {
  return apiTable;
}
function inits(){
  phongBanChange()
  maNhanVienChange()
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
