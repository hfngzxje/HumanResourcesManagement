const apiTable = "https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/BaoCao/getBaoCaoHoSoLuong";
const maDetail = localStorage.getItem('maNhanVien')
var TableColumns = [
    {
        label: "Mã hợp đồng",
        key: "mahopdong",
    },
    {
        label: "Phụ cấp trách nhiệm",
        key: "phucaptrachnhiem",
        type: 'currency'
    },
    {
        label: "Phụ cấp khác",
        key: "phucapkhac",
        type: 'currency'
    },
    {
        label: "Tổng lương",
        key: "tongluong",
        type: 'currency'
    },
    {
        label: "Thời hạn lên lương",
        key: "thoihanlenluong",
        formatter: (giatri) => giatri + ' năm'
    },
    {
        label: "Trạng thái",
        key: "trangthai",
        formatGiaTri: (value) => {
            let result = { text: 'Hết hạn', color: 'red' };
            if (value === 1) {
                result.text = 'Còn hạn';
                result.color = 'blue';
            }
            return result;
        }
    },
    {
        label: "Ngày bắt đầu",
        key: "ngaybatdau",
    },
    {
        label: "Ngày kết thúc",
        key: "ngayketthuc",
    },
    {
        label: "Ghi chú",
        key: "ghichu",
    },
];
var trangthaiselect = [
    { label: "Tất cả", value: "" },
    { label: "Còn hạn", value: 1 },
    { label: "Hết hạn", value: 2 }
];

// _____________________________________excel_________________________________________________________
async function handleExportExcel() {
    const formValue = getFormValues("report_form");
    const params = new FormData();
    params.append('TongLuongTu', parseCurrency(formValue.TongLuongTu) || "");
    params.append('TongLuongDen', parseCurrency(formValue.TongLuongDen) || "");
    params.append('NgayBatDau', formValue.NgayBatDau || "");
    params.append('NgayKetThuc', formValue.NgayKetThuc || "");
    params.append('TrangThai', formValue.TrangThai || "");
    params.append('MaNV', maDetail || "");
    

    try {
        const response = await fetch('https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/BaoCao/ExportBaoCaoHoSoLuongToExcel', {
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
    link.download = 'BaoCao_DanhSachHoSoLuong.xlsx';
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
    params.append('TongLuongTu', parseCurrency(formValue.TongLuongTu) || "");
    params.append('TongLuongDen', parseCurrency(formValue.TongLuongDen) || "");
    params.append('NgayBatDau', formValue.NgayBatDau || "");
    params.append('NgayKetThuc', formValue.NgayKetThuc || "");
    params.append('TrangThai', formValue.TrangThai || "");
    params.append('MaNV', maDetail || "");

    try {
        const response = await fetch('https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/BaoCao/ExportBaoCaoHoSoLuongToPDF', {
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
    link.download = 'BaoCao_DanhSachHoSoLuong.pdf';
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
            TongLuongTu: parseCurrency(formValue.TongLuongTu) || "",
            TongLuongDen: parseCurrency(formValue.TongLuongDen) || "",
            NgayBatDau: formValue.NgayBatDau || "",
            NgayKetThuc: formValue.NgayKetThuc || "",
            TrangThai: formValue.TrangThai || "",
            MaNV: maDetail
        };

        // Giả sử handleCallFetchData là một hàm không đồng bộ
        await tableReport.handleCallFetchData(params);

    } catch (error) {
        console.error("Error in handleSearch:", error);
    }

}

function trangThaiChange() {
    const phongban = document.querySelector('#trangthai select')
    phongban.addEventListener("change", (event) => {
        handleSearch()
    });
}

let tongTuChanged = false;
let tongDenChanged = false;
function tongLuongTuChange() {
    const quequan = document.querySelector('#tongluongtu input')
    quequan.addEventListener("change", (event) => {
        tongTuChanged = true
        tongLuongChange()
    });
}
function tongLuongDenChange(){
    const quequan = document.querySelector('#tongluongden input')
    quequan.addEventListener("change", (event) => {
        tongDenChanged = true
        tongLuongChange()
    });
}
function tongLuongChange() {
    if (tongTuChanged && tongDenChanged) {
        handleSearch();
    }
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
function buildApiUrl() {
    return apiTable;
}
function handleTongLuongTu() {
    const tongLuongtu = document.querySelector('#tongluongtu input')

    tongLuongtu.addEventListener("change", (event) => {
        const value = event.target.value;
            const numericValue = parseFloat(value.replace(/[^0-9.-]+/g, ""));
            tongLuongtu.value = formatCurrency(numericValue);
    });
}
function handleTongLuongDen() {
    const tongLuongden = document.querySelector('#tongluongden input')

    tongLuongden.addEventListener("change", (event) => {
        const value = event.target.value;
            const numericValue = parseFloat(value.replace(/[^0-9.-]+/g, ""));
            tongLuongden.value = formatCurrency(numericValue);
    });
}
function formatCurrency(val) {
    if (val) {
        return val.toLocaleString("it-IT", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        });
    }
    else {
        return null
    }
}
function parseCurrency(value) {
    const cleanedValue = value.replace(/[^0-9,]/g, '').replace(',', '.');
    return parseFloat(cleanedValue);
}
function inits() {
    tongLuongTuChange()
    tongLuongDenChange()
    fromChange()
    toChange()
    trangThaiChange()
    handleTongLuongTu()
    handleTongLuongDen()
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
    renderActionByStatus()
    handleSearch()
    inits()

});
