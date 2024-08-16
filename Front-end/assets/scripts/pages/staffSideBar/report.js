const apiTable = "https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/BaoCao/getBaoCaoDanhSachNhanVien";
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
    label: "Phòng ban",
    key: "tenPhong",
  },
  {
    label: "Quê quán",
    key: "queQuan",
  },
  {
    label: "Thường trú",
    key: "thuongTru",
  },
  {
    label: "Tạm trú",
    key: "tamTru",
  },
];
var QueQuan = [
  { label: "Quê quán", value: "Quê quán" },
  { label: "Thường trú", value: "Thường trú" },
  { label: "Tạm trú", value: "Tạm trú" },
];
var NgayThang = [
  { label: "Năm sinh", value: "Năm sinh" },
  { label: "Tháng sinh", value: "Tháng sinh" }
];
var gioiTinh = [
  { label: "Tất cả", value: '' },
  { label: "Nam", value: 'true' },
  { label: "Nữ", value: 'false' },
];

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
    const response = await fetch('https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/BaoCao/ExportBaoCaoNhanVienToExcel', {
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
  link.download = 'BaoCao_DanhSachNhanVien.xlsx';
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
    const response = await fetch('https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/BaoCao/ExportBaoCaoNhanVienToPDF', {
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
  link.download = 'BaoCao_DanhSachNhanVien.pdf';
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
      searchRulesNgayThang: formValue.searchRulesNgayThang,
      ToDate: formValue.ToDate || "",
      FromDate: formValue.FromDate || "",
      PhongBan: formValue.PhongBan || "",
      searchRulesDiaChi: formValue.searchRulesDiaChi,
      QueQuan: formValue.QueQuan || ""
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
function queQuanSelectChange() {
  const queQuanSelect = document.querySelector('#selectquequan select')
  queQuanSelect.addEventListener("change", (event) => {
      document.querySelector('#quequan input').value =""
  });
}
function queQuanChange() {
  const quequan = document.querySelector('#quequan input')
  quequan.addEventListener("change", (event) => {
      handleSearch()
  });
}
let fromDateChanged = false;
let toDateChanged = false;

function selectDateChange(){
  const selectDate = document.querySelector('#selectngaythang select')
  selectDate.addEventListener("change", (event) => {
    document.querySelector('#tungay input').value = ""
    document.querySelector('#denngay input').value = ""
  });
}
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
function dateChange(){
  if(fromDateChanged && toDateChanged){
    handleSearch();
  }
}
function buildApiUrl() {
  return apiTable;
}
function inits(){
  phongBanChange()
  gioiTinhChange()
  queQuanSelectChange()
  queQuanChange()
  selectDateChange()
  fromChange()
  toChange()
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
