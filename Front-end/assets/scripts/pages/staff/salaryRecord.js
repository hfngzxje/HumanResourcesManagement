let idLuongHienTai = null
const vaiTroID = localStorage.getItem("vaiTroID")
const maDetail = localStorage.getItem("maDetail")
const table = document.querySelector('base-table')
const popupRemoveBtn = document.getElementById("deleteBtn")
const popupSaveBtn = document.getElementById("updateBtn")
let danhSachMaHopDong = []
let thongTinNgachLuong = null
let danhSachluongCoBanHeSo = []

let luongCoBan = null
let heSo = null
let phuCapInput = null
let phuCapKhacInput = null
let tongLuongVal = null
let maHopDongDauTien = null

var TableColumns = [
    {
        label: 'Mã Hợp Đồng',
        key: 'mahopdong'
    },
    {
        label: 'Nhóm Lương',
        key: 'nhomluong'
    },
    {
        label: 'Hệ Số Lương',
        key: 'hesoluong'
    },
    {
        label: 'Bậc Lương',
        key: 'bacluong'
    },
    {
        label: 'Phụ Cấp trách nhiệm',
        key: 'phucaptrachnhiem',
        type:'currency'
    },
    {
        label: 'Phụ Cấp Khác',
        key: 'phucapkhac',
        type: 'currency'
    },
    {
        label: 'Tổng Lương',
        key: 'tongluong',
        type: 'currency'
    },
    {
        label: 'Thời Hạn Lên Lương',
        key: 'thoihanlenluong',
        formatter: (giatri) => giatri + ' năm'
    },
    {
        label: 'Ngày Hiệu Lực',
        key: 'ngayhieuluc',
        type: 'datetime'
    },
    {
        label: 'Ngày Kết Thúc',
        key: 'ngayketthuc',
        type: 'datetime'
    },
    {
        label: 'Ghi chú',
        key: 'ghichu'
    },
    {
        label: 'Hành động',
        key: 'action',
        actions: [
            {
                type: 'plain', icon: 'bx bx-save', label: 'Sửa', onClick: (row) => {
                    isPopupEdit = true
                    fetchSalaryToEdit(row.id)
                    showPopup()
                }
            }
        ]
    }
]


function backToList() {
    const url = new URL("/pages/staff/laborcontract.html", window.location.origin);
    window.location.replace(url.toString());
}

function buildPayload(formValue) {
    const formClone = { ...formValue }
    formClone['trangThai'] = Number(formClone['trangThai'])

    return formClone
}
function showPopup() {
    var modal = document.getElementById("editSalaryRecord");
    apiDanhSachHopDongPopUp()
    handleBacLuongPopUp()
    handleBacLuongPopUp()
    handlePhuCapKhacPop()
    modal.style.display = "block";
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";

            clearFormValues("editSalaryRecord");
        }
    }
}
function closePopup() {
    var modal = document.getElementById("editSalaryRecord");
    modal.style.display = "none"
}
function fetchSalaryToEdit(id) {
    setLoading(true)
    idLuongHienTai = id
    $.ajax({

        url: 'https://localhost:7141/api/HoSoLuong/getLuongById/' + id,
        method: 'GET',
        success: function (data) {
            setFormValue('editSalaryRecord', data)
            // document.querySelector('#luongCoBanPop input').value = formatCurrency(document.querySelector('#luongCoBanPop input').value)
            // document.querySelector('#phuCapPop input').value = formatCurrency(document.querySelector('#phuCapPop input').value)

        },
        error: (err) => {
            console.log('fetchSalary err :: ', err);
        },
        complete: () => {
            setLoading(false)
        }
    });
}

async function handleCreate() {
    const isConfirm = confirm('Bạn chắc chắn muốn thêm bảng lương?')
    if (!isConfirm) return
    const valid = validateForm('salaryRecord_form')
    if (!valid) return
    const formValue = getFormValues('salaryRecord_form')
    formValue['phucaptrachnhiem'] = parseCurrency(formValue['phucaptrachnhiem'])
    formValue['phucapkhac'] = parseCurrency(formValue['phucapkhac'])
    formValue['tongluong'] = parseCurrency(formValue['tongluong'])

    alert(formValue['tongluong'])

    try {
        // Lấy trạng thái mã hợp đồng
        const contractCodeStatus = await fetchContractCodeStatus(formValue.mahopdong);
        // Kiểm tra trạng thái mã hợp đồng
        if (contractCodeStatus === 0) {
            alert('Đây là hợp đồng chưa chính thức, không thể tạo bảng lương.');
            return;
        }
    } catch (error) {
        console.error('Error fetching contract code status:', error);
        alert('Xảy ra lỗi khi lấy trạng thái mã hợp đồng. Vui lòng thử lại.');
        return;
    }

    const payload = buildPayload(formValue)
    setLoading(true)
    setTimeout(() => {
        $.ajax({
            url: 'https://localhost:7141/api/HoSoLuong/TaoMoiHoSoLuong',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(payload),
            success: function (data) {
                alert('Tạo Thành Công!');
                table.handleCallFetchData();
            },
            error: (err) => {
                console.log('err ', err);
                try {
                    if (!err.responseJSON) {
                        alert(err.responseText)
                        return
                    }
                    const errObj = err.responseJSON.errors
                    const firtErrKey = Object.keys(errObj)[0]
                    const message = errObj[firtErrKey][0]
                    alert(message)
                } catch (error) {
                    alert("Tạo mới không thành công!")
                }
            },
            complete: () => {
                setLoading(false)
            }
        });
    }, 1000);
}

async function fetchContractCodeStatus(mahopdong) {
    const response = await $.ajax({
        url: 'https://localhost:7141/api/HopDong/id?id=' + mahopdong,
        method: 'GET',
    });
    return response.trangThai; // Giả sử API trả về trạng thái của mã hợp đồng trong phản hồi
}

function handleRemove() {
    const isConfirm = confirm('Bạn chắc chắn muốn xóa bảng lương?')
    if (!isConfirm) return
    setLoading(true)
    setTimeout(() => {
        $.ajax({
            url: 'https://localhost:7141/api/HoSoLuong/xoaHoSoLuong/' + idLuongHienTai,
            method: 'DELETE',
            success: function (data) {
                alert('Xóa Thành Công!');
                closePopup();
                table.handleCallFetchData();
            },
            error: (err) => {
                console.log('fetchContract err :: ', err);
                alert("Xóa thất bại!")
            },
            complete: () => {
                setLoading(false)
            }
        });
    }, 1000);
}


function handleSave() {
    const isConfirm = confirm('Bạn chắc chắn muốn sửa bảng lương?')
    if (!isConfirm) return
    const formValue = getFormValues('editSalaryRecord')
    const payload = buildPayload(formValue)
    setLoading(true)
    setTimeout(() => {
        $.ajax({
            url: 'https://localhost:7141/api/HoSoLuong/ChinhSuaHoSoLuong/' + idLuongHienTai,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(payload),
            success: function (data) {
                console.log('fetchContract res :: ', data);
                alert('Lưu Thành Công!');
                closePopup();
                table.handleCallFetchData();
            },
            error: (err) => {
                console.log('err ', err);
                try {
                    if (!err.responseJSON) {
                        alert(err.responseText)
                        return
                    }
                    const errObj = err.responseJSON.errors
                    const firtErrKey = Object.keys(errObj)[0]
                    const message = errObj[firtErrKey][0]
                    alert(message)
                } catch (error) {
                    alert("Cập nhật thất bại!")
                }
            },
            complete: () => {
                setLoading(false)
            }
        });
    }, 1000);
}


function clearFormValues(formId) {
    const form = document.getElementById(formId);
    const inputs = form.querySelectorAll('input, textarea');

    inputs.forEach(input => {
        if (input.type === 'checkbox') {
            input.checked = false;
        } else {
            input.value = '';
        }
    });
}

function renderActionByStatus() {
    const actionEl = document.getElementById('salary_form_action')
    const buildButton = (label, type, icon) => {
        const btnEl = document.createElement('base-button')
        btnEl.setAttribute('label', label)
        btnEl.setAttribute('type', type)
        btnEl.setAttribute('icon', icon)
        return btnEl
    }
    const createBtn = buildButton('Thêm', 'green', 'bx bx-plus')
    const clear = buildButton('cLear', 'plain', 'bx bx-eraser')

    createBtn.addEventListener('click', handleCreate)
    clear.addEventListener('click', function () {
        clearFormValues('salaryRecord_form');
    });

    actionEl.append(createBtn, clear)
}

function buildApiHopDong() {
    return 'https://localhost:7141/api/HopDong/GetHopDongByMaNV/id?id=' + maDetail;
}
async function buildApiHopDongA(id) {
    return 'https://localhost:7141/api/HopDong/id?id=' + id;
}

function buildApiUrl() {
    return 'https://localhost:7141/api/HoSoLuong/getAllLuongByMaNV/' + maDetail;
}
function buidApiBacLuong() {
    return 'https://localhost:7141/api/HoSoLuong/getBacLuongByChucDanh/' + thongTinNgachLuong;

}


function tinhLuong(luongcobanInput, hesoInput, phucapInput, phucapkhacInput) {
    phucapkhacInput = phucapkhacInput || 0;
    const tongLuong = document.querySelector('#tongLuong input')
    const tongLuongTinhToan = (luongcobanInput * hesoInput) + phucapInput + phucapkhacInput
    tongLuong.value = formatCurrency(tongLuongTinhToan)
}
function tinhLuongPopUp(luongcobanInput, hesoInput, phucapInput, phucapkhacInput) {
    phucapkhacInput = phucapkhacInput || 0;
    const tongLuong = document.querySelector('#tongLuongPop input')
    const tongLuongTinhToan = (luongcobanInput * hesoInput) + phucapInput + phucapkhacInput
    tongLuong.value = formatCurrency(tongLuongTinhToan)
}
function handleBacLuong() {
    const bacLuong = document.querySelector('#bacLuong select')
    bacLuong.addEventListener("change", (event) => {

        const thongTinLuong = danhSachluongCoBanHeSo.find(item => item.bacluong == event.target.value)
        setGiaTriLuong(thongTinLuong.luongcoban)
        setGiaTriHeSo(thongTinLuong.hesoluong)

        luongCoBan = thongTinLuong.luongcoban
        heSo = thongTinLuong.hesoluong

        tinhLuong(luongCoBan, heSo, phuCapInput, phuCapKhacInput)

    })
}
let danhSachMaHopDongPop = []
let maHopDongDauTienPop = null
let danhSachluongCoBanHeSoPop = []
let luongCoBanPop = null
let heSoPop = null
let phuCapKhacInputPop = null

function handleBacLuongPopUp() {
    const bacLuong = document.querySelector('#bacLuongPop select')
    bacLuong.addEventListener("change", (event) => {

        const thongTinLuong = danhSachluongCoBanHeSoPop.find(item => item.bacluong == event.target.value)
        setGiaTriLuongPopUp(thongTinLuong.luongcoban)
        setGiaTriHeSoPopUp(thongTinLuong.hesoluong)

        luongCoBanPop = thongTinLuong.luongcoban
        heSoPop = thongTinLuong.hesoluong

        tinhLuongPopUp(luongCoBanPop, heSoPop, phuCapInput, phuCapKhacInputPop)

    })
}
async function apiLuongHeSo() {
    try {
        const bacLuong = await $.ajax({
            url: 'https://localhost:7141/api/HoSoLuong/getBacLuongByChucDanh/' + thongTinNgachLuong,
            method: 'GET',
            contentType: 'application/json',

        });
        danhSachluongCoBanHeSo = bacLuong
        const luongCoBanHeSoDauTien = bacLuong[0]
        if (luongCoBanHeSoDauTien) {
            setGiaTriLuong(luongCoBanHeSoDauTien.luongcoban)
            setGiaTriHeSo(luongCoBanHeSoDauTien.hesoluong)

            tinhLuong(luongCoBanHeSoDauTien.luongcoban, luongCoBanHeSoDauTien.hesoluong, phuCapInput, phuCapKhacInput)
        }
    } catch (error) {
        console.log("Error")
    }
}

async function apiLuongHeSoPopUp() {
    try {
        const bacLuong = await $.ajax({
            url: 'https://localhost:7141/api/HoSoLuong/getBacLuongByChucDanh/' + thongTinNgachLuong,
            method: 'GET',
            contentType: 'application/json',

        });
        danhSachluongCoBanHeSoPop = bacLuong
        const luongCoBanHeSoDauTien = bacLuong[0]
        if (luongCoBanHeSoDauTien) {
            setGiaTriLuongPopUp(luongCoBanHeSoDauTien.luongcoban)
            setGiaTriHeSoPopUp(luongCoBanHeSoDauTien.hesoluong)

            // tinhLuong(luongCoBanHeSoDauTien.luongcoban, luongCoBanHeSoDauTien.hesoluong, phuCapInput, phuCapKhacInput)
        }
    } catch (error) {
        console.log("Error")
    }
}

function setGiaTriLuong(value) {
    const luongCoBan = document.querySelector('#luongCoBan input')
    luongCoBan.value = formatCurrency(value)
}
function setGiaTriHeSo(valueHeSo) {
    const heSo = document.querySelector('#hesoluong input')
    heSo.value = valueHeSo
}
function setGiaTriLuongPopUp(value) {
    const luongCoBan = document.querySelector('#luongCoBanPop input')
    luongCoBan.value = formatCurrency(value)
}
function setGiaTriHeSoPopUp(valueHeSo) {
    const heSo = document.querySelector('#hesoluongPop input')
    heSo.value = valueHeSo
}
function layThongTinBacLuong() {
    const bacLuong = document.getElementById('bacLuong')
    bacLuong.renderOption()
}

function layThongTinBacLuongPopUp() {
    const bacLuong = document.getElementById('bacLuongPop')
    bacLuong.renderOption();
}
// ------------------fetch ngach nhan vien theo hop dong ----------------------

async function apiDanhSachHopDong() {
    try {
        const hopDong = await $.ajax({
            url: 'https://localhost:7141/api/HopDong/GetHopDongByMaNV/id?id=' + maDetail,
            method: 'GET',
            contentType: 'application/json',
        });
        danhSachMaHopDong = hopDong
        const hopDongDautien = hopDong[0]
        datGiaTriMacDinhNgachNV(hopDongDautien.mahopdong)
        maHopDongDauTien = hopDong.maHopDong
    } catch (error) {
        console.log("Error", "ajaj")
    }
}

async function apiDanhSachHopDongPopUp() {
    try {
        const hopDong = await $.ajax({
            url: 'https://localhost:7141/api/HopDong/GetHopDongByMaNV/id?id=' + maDetail,
            method: 'GET',
            contentType: 'application/json',
        });
        danhSachMaHopDongPop = hopDong
        const hopDongDautien = hopDong[0]
        datGiaTriMacDinhNgachNVPopUp(document.querySelector('#maHopDongPop select').value)
        maHopDongDauTienPop = hopDong.maHopDong
    } catch (error) {
        console.log("Error", "ajaj")
    }
}


function datGiaTriMacDinhNgachNV(mahopdong) {
    const thongTinHopDong = danhSachMaHopDong.find(item => item.mahopdong === mahopdong)
    const ngachNhanVien = document.querySelector('#ngachNhanVien select')
    ngachNhanVien.value = thongTinHopDong.chucdanh
    thongTinNgachLuong = ngachNhanVien.value

    layThongTinBacLuong()
    apiLuongHeSo()
    apiPhuCap()
}
function datGiaTriMacDinhNgachNVPopUp(mahopdong) {
    const thongTinHopDong = danhSachMaHopDongPop.find(item => item.mahopdong === mahopdong)
    const ngachNhanVien = document.querySelector('#ngachNhanVienPop select')
    ngachNhanVien.value = thongTinHopDong.chucdanh
    thongTinNgachLuong = ngachNhanVien.value

    layThongTinBacLuongPopUp();
    apiLuongHeSoPopUp()
    // apiPhuCap()
}
function handleMaHopDong() {
    const maHopDong = document.querySelector('base-select#maHopDong select')
    maHopDong.addEventListener("change", (event) => {
        console.log("e: ", event.target.value)

        datGiaTriMacDinhNgachNV(event.target.value)
    });
}

// -------------------
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
function handlePhuCapKhacPop() {
    let luongVal = null
    let heSoVal = null
    const phuCapKhac = document.querySelector('#phuCapKhacPop input')

    phuCapKhac.addEventListener("change", (event) => {
        const value = event.target.value;
        if (value) {
            const numericValue = parseFloat(value.replace(/[^0-9.-]+/g, ""));
            phuCapKhac.value = formatCurrency(numericValue);

            luongVal = parseCurrency(document.querySelector('#luongCoBanPop input').value)
            heSoVal = document.querySelector('#hesoluongPop input').value

            phuCapKhacInputPop = parseFloat(value);

        } else {
            phuCapKhacInputPop = 0;
        }

        tinhLuongPopUp(luongVal, heSoVal, phuCapInput, phuCapKhacInputPop);
    });
}
function setNullPhuCapKhac() {
    const phuCapKhac = document.querySelector('#phuCapKhac input')
    phuCapKhac.value = ""
}
// ------------- fetch Phu Cap -----------------------

async function apiPhuCap() {
    try {
        const response = await $.ajax({
            url: 'https://localhost:7141/api/HoSoLuong/getPhuCapByChucDanh/' + thongTinNgachLuong,
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

function formatCurrency(val) {
    return val.toLocaleString("it-IT", {
        minimumFractionDigits: 0, // số lượng chữ số thập phân tối thiểu
        maximumFractionDigits: 2
    });
}
function parseCurrency(value) {
    // Loại bỏ ký tự không phải số và dấu thập phân
    const cleanedValue = value.replace(/[^0-9,]/g, '').replace(',', '.');
    return parseFloat(cleanedValue);
}
async function checkSoLuongHopDong() {
    try {
        const hopDong = await $.ajax({
            url: 'https://localhost:7141/api/HopDong/GetHopDongByMaNV/id?id=' + maDetail,
            method: 'GET',
            contentType: 'application/json',
        });
    } catch (error) {
        alert("Nhân viên chưa có hợp đồng nào, vui lòng tạo hợp đồng trước khi truy cập")
        backToList()
    }
}
document.addEventListener('DOMContentLoaded', () => {
    checkSoLuongHopDong()
    handleMaHopDong();
    apiDanhSachHopDong()
    handleBacLuong()
    handlePhuCapKhac()

    renderActionByStatus()
    popupRemoveBtn.addEventListener("click", handleRemove)
    popupSaveBtn.addEventListener("click", handleSave)
})




// ------------------fetch ngach nhan vien theo hop dong ----------------------

