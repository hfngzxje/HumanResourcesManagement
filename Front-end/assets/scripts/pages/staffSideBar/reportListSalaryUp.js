
const apiTable = "https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/DanhSachLenLuong/getDanhSachLenLuong";
const apiTableBaoCao = "https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/DanhSachLenLuong/getAll";


const table = document.querySelectorAll('base-table')
var idNhomLuong = null
var maDetail = null
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
        label: 'Chức vụ hiện tại',
        key: 'tenChucVu'
    },
    {
        label: 'Phòng',
        key: 'tenPhongBan'
    },
    {
        label: 'Tổ',
        key: 'tenTo'
    },
    {
        label: 'Hành động',
        key: 'action',
        actions: [
            {
                type: 'plain', icon: 'bx bx-save', label: 'Nâng lương', onClick: (row) => {
                    isPopupEdit = true
                    console.log('row click ', row);
                    fetchSalaryToEdit(row.maNV);
                    showPopup("showPopUp")
                }
            }
        ]
    }
]
var TableColumnsBaoCao = [
    {
        label: 'Mã nhân viên',
        key: 'manv',
    },
    {
        label: 'Tên nhân viên',
        key: 'tenNv',
    },
    {
        label: 'Mã hợp đồng',
        key: 'mahopdong',
    },
    {
        label: 'Phòng',
        key: 'phong',
    },
    {
        label: 'Chức danh',
        key: 'chucdanh',
    }
]
async function handleCreate() {
    await showConfirm('Bạn chắc chắn muốn thêm bảng lương?')
    const valid = validateForm('salaryRecord_form')
    if (!valid) return
    const formValue = getFormValues('salaryRecord_form')
    formValue['phucaptrachnhiem'] = parseCurrency(formValue['phucaptrachnhiem'])
    formValue['phucapkhac'] = parseCurrency(formValue['phucapkhac'])
    formValue['tongluong'] = parseCurrency(formValue['tongluong'])
    const payload = buildPayload(formValue)
    setLoading(true)
    setTimeout(() => {
        $.ajax({
            url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/DanhSachLenLuong/taoVaThemDanhSachNangLuong',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(payload),
            success: async function (data) {
                await showSuccess('Tạo Thành Công!');
                table.forEach(table => {
                    if (table.handleCallFetchData) {
                        table.handleCallFetchData();
                    }
                });
                await closePopup()
            },
            error: (err) => {
                console.log('err ', err);
                try {
                    if (!err.responseJSON) {
                        showError(err.responseText)
                        return
                    }
                    const errObj = err.responseJSON.errors
                    const firtErrKey = Object.keys(errObj)[0]
                    const message = errObj[firtErrKey][0]
                    showError(message)
                } catch (error) {
                    showError("Tạo mới không thành công!")
                }
            },
            complete: () => {
                setLoading(false)
            }
        });
    }, 1000);
}
function closePopup() {
    var modal = document.getElementById("showPopUp");
    modal.style.display = "none"
}
async function handleSearch() {
    try {
        const formValue = getFormValues("report_form");
        const tableReport = document.getElementById("tableReport1");

        const params = {
            phongId: formValue.phongId || "",
            chucDanhId: formValue.chucDanhId || ""
        };

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
function chucDanhChange() {
    const phongban = document.querySelector('#chucdanh select')
    phongban.addEventListener("change", (event) => {
        handleSearch()
    });
}

// ------------- Add nâng lương --------------------------
var danhSachMaHopDong = []
var phuCapInput = null
var thongTinNgachCongChuc = null
var phuCapKhacInput = null
function buidApiBacLuong() {
    if (!thongTinNgachCongChuc) {
        return false
    }
    return 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/HoSoLuong/getBacLuongByNgachCongChuc/' + thongTinNgachCongChuc;
}
function tinhLuong(luongcobanInput, hesoInput, phucapInput, phucapkhacInput) {
    phucapkhacInput = phucapkhacInput || 0;
    const tongLuong = document.querySelector('#tongLuong input')
    const tongLuongTinhToan = (luongcobanInput * hesoInput) + phucapInput + phucapkhacInput
    tongLuong.value = formatCurrency(tongLuongTinhToan)
}

function formatCurrency(val) {
    // Kiểm tra nếu giá trị là một số hợp lệ
    if (val != null && !isNaN(val)) {
        // Chuyển đổi giá trị thành số nếu nó không phải là số
        const num = Number(val);
        // Định dạng số thành chuỗi tiền tệ
        return num.toLocaleString("it-IT", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        });
    }
    // Nếu giá trị không hợp lệ, trả về một chuỗi rỗng hoặc giá trị gốc tùy ý
    return "";
}
function parseCurrency(value) {
    const cleanedValue = value.replace(/[^0-9,]/g, '').replace(',', '.');
    return parseFloat(cleanedValue);
}

function setGiaTriLuong(value) {
    const luongCoBan = document.querySelector('#luongCoBan input')
    luongCoBan.value = formatCurrency(value)
}
function setGiaTriHeSo(valueHeSo) {
    const heSo = document.querySelector('#hesoluong input')
    heSo.value = valueHeSo
}
function setGiaTriNhomLuong(valueNhomLuong) {
    const nhomluong = document.querySelector('#nhomluong input')
    nhomluong.value = valueNhomLuong
}
async function getHopDong() {
    try {
        const response = await $.ajax({
            url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/HopDong/GetHopDongActiveByMaNV/id?id='+ maDetail,
            method: 'GET',
            contentType: 'application/json',
        });
        if (response.length > 0) {
            danhSachMaHopDong = response
            const firstItem = response[0];
            console.log(firstItem);
            document.querySelector('#maHopDong input').value = firstItem.mahopdong
            datGiaTriMacDinhNgachNV(firstItem.mahopdong)
        } else {
            console.log("Không có dữ liệu trả về");
        }
    } catch (error) {
        console.log("Error", "ajaj")
    }
}
function datGiaTriMacDinhNgachNV(mahopdong) {
    const thongTinHopDong = danhSachMaHopDong.find(item => item.mahopdong === mahopdong)
    const ngachNhanVien = document.querySelector('#ngachNhanVien select')
    ngachNhanVien.value = thongTinHopDong.chucdanh
    thongTinNgachLuong = ngachNhanVien.value
    apiPhuCap()
}
async function apiPhuCap() {
    try {
        const response = await $.ajax({
            url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/HoSoLuong/getPhuCapByChucDanh/' + thongTinNgachLuong,
            method: 'GET',
            contentType: 'application/json',
        });
        const valuePhuCap = response.value
        if (!valuePhuCap) {
            console.log("Dữ liệu không tồn tại trong phản hồi");
            return;
        }
        const phuCap = document.querySelector('#phuCap input')
        if (phuCap) {
            phuCap.value = formatCurrency(valuePhuCap.phucap)
            phuCapInput = valuePhuCap.phucap
        }
        else {
            console.log("Khong tim thay ban ghi chua phu cap")
        }

    } catch (error) {
        console.log("Error", error)
    }
}
function layThongTinBacLuong() {
    const bacLuong = document.getElementById('bacLuong')
    bacLuong.renderOption()
}
async function getBacLuongTheoNgachDauTien() {
    try {
        const response = await $.ajax({
            url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/NhanVien/ngachCongChuc',
            url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/NhanVien/ngachCongChuc',
            method: 'GET',
            contentType: 'application/json',
        });
        const ngachCongChucDauTien = response[0]
        thongTinNgachCongChuc = ngachCongChucDauTien.id
        layThongTinBacLuong()
        apiLuongHeSo()
    } catch (error) {
        console.log("Error", "ajaj")
    }
}
function handleBacLuong() {
    const bacLuong = document.querySelector('#bacLuong select')
    bacLuong.addEventListener("change", (event) => {

        const thongTinLuong = danhSachluongCoBanHeSo.find(item => item.bacluong == event.target.value)
        setGiaTriLuong(thongTinLuong.luongcoban)
        setGiaTriHeSo(thongTinLuong.hesoluong)
        setGiaTriNhomLuong(thongTinLuong.nhomluong)
        luongCoBan = thongTinLuong.luongcoban
        heSo = thongTinLuong.hesoluong

        tinhLuong(luongCoBan, heSo, phuCapInput, phuCapKhacInput)

    })
}
function handleNgachCongChuc() {
    const ngachCongChuc = document.querySelector('base-select#ngachCongChuc select')
    ngachCongChuc.addEventListener("change", (event) => {
        console.log("e: ", event.target.value)
        thongTinNgachCongChuc = event.target.value
        console.log("thong tin ngach cong chuc: ", thongTinNgachCongChuc)
        layThongTinBacLuong()
        apiLuongHeSo()
    });
}
async function apiLuongHeSo() {
    try {
        const bacLuong = await $.ajax({
            url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/HoSoLuong/getBacLuongByNgachCongChuc/' + thongTinNgachCongChuc,
            url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/HoSoLuong/getBacLuongByNgachCongChuc/' + thongTinNgachCongChuc,
            method: 'GET',
            contentType: 'application/json',

        });
        danhSachluongCoBanHeSo = bacLuong
        console.log("Danh sach luong co ban:", danhSachluongCoBanHeSo)
        const luongCoBanHeSoDauTien = bacLuong[0]
        if (luongCoBanHeSoDauTien) {
            setGiaTriLuong(luongCoBanHeSoDauTien.luongcoban)
            setGiaTriHeSo(luongCoBanHeSoDauTien.hesoluong)
            setGiaTriNhomLuong(luongCoBanHeSoDauTien.nhomluong)
            tinhLuong(luongCoBanHeSoDauTien.luongcoban, luongCoBanHeSoDauTien.hesoluong, phuCapInput, phuCapKhacInput)
        }
    } catch (error) {
        console.log("Error")
    }
}
function handlePhuCapKhac() {
    let luongVal = null
    let heSoVal = null
    const phuCapKhac = document.querySelector('#phuCapKhac input')

    phuCapKhac.addEventListener("change", (event) => {
        const value = event.target.value;
        if (value) {
            const numericValue = parseFloat(value.replace(/[^0-9.-]+/g, ""));
            phuCapKhac.value = formatCurrency(numericValue);

            luongVal = parseCurrency(document.querySelector('#luongCoBan input').value)
            heSoVal = document.querySelector('#hesoluong input').value

            phuCapKhacInput = parseFloat(value);
        } else {
            phuCapKhacInput = 0;
        }

        tinhLuong(luongVal, heSoVal, phuCapInput, phuCapKhacInput);
    });
}

async function inits() {
    await getHopDong()
    await handleNgachCongChuc()
    await getBacLuongTheoNgachDauTien()
    await handleBacLuong()
    await handlePhuCapKhac()
}
// ---------- Fetch lương hiện tại---------

async function fetchSalaryToEdit(ma) {
    setLoading(true);
    maDetail = ma;
    try {
        const response = await $.ajax({
            url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/HoSoLuong/getAllLuongByMaNV/' + ma,
            url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/HoSoLuong/getAllLuongByMaNV/' + ma,
            method: 'GET',
            contentType: 'application/json',
        });

        // Lọc dữ liệu để chỉ lấy những hồ sơ có trạng thái === 1
        const filteredData = response.filter(item => item.trangthai === 1);

        if (Array.isArray(filteredData) && filteredData.length > 0) {
            const lastItem = filteredData[filteredData.length - 1];
            setFormValue('editSalaryUp', lastItem);
            idNhomLuong = lastItem.nhomluong;
            document.querySelector('#tongLuongPop input').value = formatCurrency(lastItem.tongluong);
            document.querySelector('#phuCapPop input').value = formatCurrency(lastItem.phucaptrachnhiem);
            document.querySelector('#phuCapKhacPop input').value = lastItem.phucapkhac;
            await getDuLieuNhomLuong();
            await getNgachCongChuc();

            // ---------------Nâng lương ---------------
            await inits();
        } else {
            console.log("Không có dữ liệu trả về hoặc không có hồ sơ nào với trạng thái === 1");
        }
    } catch (err) {
        console.log('fetchSalary err :: ', err);
    } finally {
        setLoading(false);
    }
}

var idNgachCongChuc = null
async function getDuLieuNhomLuong() {
    try {
        const response = await $.ajax({
            url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/DanhMucNhomLuong/' + idNhomLuong,
            method: 'GET',
            contentType: 'application/json',
        });
        document.querySelector('#luongCoBanPop input').value = formatCurrency(response.luongcoban)
        idNgachCongChuc = response.ngachcongchuc
    } catch (error) {
        console.log("Error", "ajaj")
    }
}
async function getNgachCongChuc() {
    try {
        const response = await $.ajax({
            url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/NhanVien/getNgachCongChucById/' + idNgachCongChuc,
            method: 'GET',
            contentType: 'application/json',
        });
        document.querySelector('#ngachCongChucPop input').value = response.ten
    } catch (error) {
        console.log("Error", "ajaj")
    }
}
function showPopup(formId) {
    var modal = document.getElementById(formId);
    modal.style.display = "block";
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            clearFormValues("showPopUp");
            clearFormValues("salaryRecord_form");
        }
    }
}

function buildApiUrl() {
    return apiTable;
}
function buildApiUrlBaoCao() {
    return apiTableBaoCao
}
function formatCurrency(val) {
    if (val != null && !isNaN(val)) {
        const num = Number(val);
        return num.toLocaleString("it-IT", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        });
    }
    return "";
}

function parseCurrency(value) {
    const cleanedValue = value.replace(/[^0-9,]/g, '').replace(',', '.');
    return parseFloat(cleanedValue);
}


async function handleExportExcel() {
    const formValue = getFormValues("report_form");
    const params = new FormData();
    params.append('phongban', formValue.phongban || '');
    params.append('MaNV', formValue.chucdanh || '');
  
    try {
      const response = await fetch('https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/DanhSachLenLuong/ExportDanhSachNhanVienLenLuongToExcel', {
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
    link.download = 'BaoCao_DanhSachNangLuong.xlsx';
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
    params.append('phongban', formValue.phongban || '');
    params.append('MaNV', formValue.chucdanh || '');
  
    try {
      const response = await fetch('https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/DanhSachLenLuong/ExportDanhSachNhanVienLenLuongToPdf', {
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
    link.download = 'BaoCao_DanhSachNangLuong.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
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
    phongBanChange()
    chucDanhChange()
});