let idLuongHienTai = null
const vaiTroID = localStorage.getItem("vaiTroID")
const maDetail = localStorage.getItem("maDetail")
const table = document.querySelector('base-table')
const popupRemoveBtn = document.getElementById("deleteBtn")
const popupSaveBtn = document.getElementById("updateBtn")
let danhSachMaHopDong = []
let thongTinNgachLuong = null
let thongTinNgachCongChuc = null
let danhSachluongCoBanHeSo = []

let phuCapInput = null
let phuCapKhacInput = null
let phuCapInputPop = null
let maHopDong = null
let idNhomLuong = null
let luongCoBanPop = null
let heSoPop = null
let phuCapKhacInputPop = null
let ngachCongChucPop = null
let danhSachluongCoBanHeSoPop = []
let danhSachHopDongPop = []
let thongTinNgachCongChucPop = null

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
        key: 'heSoLuong'
    },
    {
        label: 'Bậc Lương',
        key: 'bacLuong'
    },
    {
        label: 'Phụ Cấp trách nhiệm',
        key: 'phucaptrachnhiem',
        type: 'currency'
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
        label: 'Ngày bắt đầu',
        key: 'ngaybatdau',
        type: 'datetime'
    },
    {
        label: 'Ngày kết thúc',
        key: 'ngayketthuc',
        type: 'datetime'
    },
    {
        label: 'Trạng thái',
        key: 'trangthai',
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
        label: 'Hành động',
        key: 'action',
        actions: [
            {
                type: 'plain', icon: 'bx bx-save', label: 'Sửa', onClick: async (row) => {
                    if (row.ngaybatdau === null && row.ngayketthuc === null && row.thoihanlenluong === null || row.trangthai === 1) {
                        isPopupEdit = true
                        await fetchSalaryToEdit(row.id)
                        showPopup()
                    }
                    else if (row.trangthai === 2) {
                        showError('Hồ sơ lương đã hết hiệu lực, không thể sửa');
                        return;
                    }
                }
            }
        ]
    }
]
function formatGiaTri(value, label1, label2) {
    if (value === 1) {
        return label1; // Ví dụ: 'Hết hạn'
    } else if (value === 2) {
        return label2; // Ví dụ: 'Còn hạn' hoặc giá trị ngược lại của 'Hết hạn'
    }
    return value; // Nếu không phải 1 hoặc 2, trả lại giá trị gốc
}

function backToList() {
    const url = new URL("/pages/staff/laborcontract.html", window.location.origin);
    window.location.replace(url.toString());
}

function buildPayload(formValue) {
    const formClone = { ...formValue }
    formClone['trangThai'] = Number(formClone['trangThai'])

    return formClone
}
async function showPopup() {
    var modal = document.getElementById("editSalaryRecord");
    await apiDanhSachHopDongPop()
    await getBacLuongTheoNgachDauTienPopUp()
    await handleNgachCongChucPopUp()
    await handleBacLuongPopUp()
    await handlePhuCapKhacPop()
    modal.style.display = "block";
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            clearFormValues("editSalaryRecord");
        }
    }
    var closeButton = modal.querySelector('.close');
    closeButton.onclick = function () {
        modal.style.display = "none";
    }
}
function closePopup() {
    var modal = document.getElementById("editSalaryRecord");
    modal.style.display = "none"
    clearFormValues("editSalaryRecord");
}
async function fetchSalaryToEdit(id) {
    setLoading(true)
    idLuongHienTai = id
    await $.ajax({

        url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/HoSoLuong/getLuongById/' + id,
        method: 'GET',
        success: function (data) {
            setFormValue('editSalaryRecord', data)
            maHopDong = data.mahopdong
            idNhomLuong = data.nhomluong
            phuCapInputPop = data.phucaptrachnhiem
            document.querySelector('#tongLuongPop input').value = formatCurrency(data.tongluong)
            document.querySelector('#phuCapPop input').value = formatCurrency(data.phucaptrachnhiem)
            document.querySelector('#phuCapKhacPop input').value = formatCurrency(data.phucapkhac)

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
    await showConfirm("Bạn có chắc chắn muốn thêm mới hồ sơ lương ?")
    const valid = validateForm('salaryRecord_form')
    if (!valid) return
    const formValue = getFormValues('salaryRecord_form')
    formValue['phucaptrachnhiem'] = parseCurrency(formValue['phucaptrachnhiem'])
    formValue['phucapkhac'] = parseCurrency(formValue['phucapkhac'])
    formValue['tongluong'] = parseCurrency(formValue['tongluong'])

    try {
        // Lấy trạng thái mã hợp đồng
        const contractCodeStatus = await fetchContractCodeStatus(formValue.mahopdong);
        // Kiểm tra trạng thái mã hợp đồng
        if (contractCodeStatus === 2) {
            showError('Đây là hợp đồng chưa chính thức, không thể tạo bảng lương.');
            return;
        }
    } catch (error) {
        console.error('Error fetching contract code status:', error);
        showError('Xảy ra lỗi khi lấy trạng thái mã hợp đồng. Vui lòng thử lại.');
        return;
    }

    const payload = buildPayload(formValue)
    setLoading(true)
    setTimeout(() => {
        $.ajax({
            url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/HoSoLuong/TaoMoiHoSoLuong',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(payload),
            success: function (data) {
                showSuccess('Tạo Thành Công!');
                table.handleCallFetchData();
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

async function fetchContractCodeStatus(mahopdong) {
    const response = await $.ajax({
        url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/HopDong/id?id=' + mahopdong,
        method: 'GET',
    });
    return response.trangThai; // Giả sử API trả về trạng thái của mã hợp đồng trong phản hồi
}

async function handleRemove() {
    await showConfirm("Bạn có chắc chắn muốn xóa hồ sơ lương?")
    setLoading(true)
    setTimeout(() => {
        $.ajax({
            url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/HoSoLuong/xoaHoSoLuong/' + idLuongHienTai,
            method: 'DELETE',
            success: function (data) {
                showSuccess('Xóa Thành Công!');
                closePopup();
                table.handleCallFetchData();
            },
            error: (err) => {
                console.log('fetchContract err :: ', err);
                showError("Xóa thất bại!")
            },
            complete: () => {
                setLoading(false)
            }
        });
    }, 1000);
}

async function handleSave() {
    await showConfirm("Bạn có chắc chắn muốn sửa hồ sơ lương ?")
    const valid = validateForm('editSalaryRecord')
    if (!valid) return
    const formValue = getFormValues('editSalaryRecord')
    formValue['tongluong'] = parseCurrency(formValue['tongluong'])
    formValue['phucaptrachnhiem'] = parseCurrency(formValue['phucaptrachnhiem'])
    formValue['phucapkhac'] = parseCurrency(formValue['phucapkhac'])

    const payload = buildPayload(formValue)
    setLoading(true)
    setTimeout(() => {
        $.ajax({
            url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/HoSoLuong/ChinhSuaHoSoLuong/' + idLuongHienTai,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(payload),
            success: function (data) {
                console.log('fetchContract res :: ', data);
                showSuccess('Lưu Thành Công!');
                closePopup();
                table.handleCallFetchData();
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
                    showError("Cập nhật thất bại!")
                }
            },
            complete: () => {
                setLoading(false)
            }
        });
    }, 1000);
}



function renderActionByStatus() {
    const actionEl = document.getElementById('salary_form_action')
    const buildButton = (id, label, type, icon) => {
        const btnEl = document.createElement('base-button')
        btnEl.setAttribute('id', id)
        btnEl.setAttribute('label', label)
        btnEl.setAttribute('type', type)
        btnEl.setAttribute('icon', icon)
        return btnEl
    }
    const createBtn = buildButton('createId', 'Thêm', 'green', 'bx bx-plus')
    const clear = buildButton('clearId', 'cLear', 'plain', 'bx bx-eraser')

    createBtn.addEventListener('click', handleCreate)
    clear.addEventListener('click', function () {
        clearFormValues('salaryRecord_form');
    });

    actionEl.append(createBtn, clear)
}

function buildApiHopDong() {
    return 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/HopDong/GetHopDongActiveByMaNV/id?id=' + maDetail;
}
async function buildApiHopDongA(id) {
    return 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/HopDong/id?id=' + id;
}

function buildApiUrl() {
    return 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/HoSoLuong/getAllLuongByMaNV/' + maDetail;
}
function buidApiBacLuong() {
    if (!thongTinNgachCongChuc) {
        return false
    }
    return 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/HoSoLuong/getBacLuongByNgachCongChuc/' + thongTinNgachCongChuc;
}

async function apiDanhSachHopDong() {
    try {
        const hopDong = await $.ajax({
            url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/HopDong/GetHopDongActiveByMaNV/id?id=' + maDetail,
            method: 'GET',
            contentType: 'application/json',
        });
        danhSachMaHopDong = hopDong
        const hopDongDautien = hopDong[0]
        datGiaTriMacDinhNgachNV(hopDongDautien.mahopdong)
    } catch (error) {
        console.log("Error", "ajaj")
    }
}

function handleMaHopDong() {
    const maHopDong = document.querySelector('base-select#maHopDong select')
    maHopDong.addEventListener("change", (event) => {
        console.log("e: ", event.target.value)

        datGiaTriMacDinhNgachNV(event.target.value)
    });
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

async function apiLuongHeSo() {
    try {
        const bacLuong = await $.ajax({
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
function tinhLuong(luongcobanInput, hesoInput, phucapInput, phucapkhacInput) {
    phucapkhacInput = phucapkhacInput || 0;
    const tongLuong = document.querySelector('#tongLuong input')
    const tongLuongTinhToan = (luongcobanInput * hesoInput) + phucapInput + phucapkhacInput
    tongLuong.value = formatCurrency(tongLuongTinhToan)
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
    apiDanhSachHopDong()
    handleMaHopDong()
    handleNgachCongChuc()
    getBacLuongTheoNgachDauTien()
    handleBacLuong()
    handlePhuCapKhac()
}
document.addEventListener('DOMContentLoaded', () => {
    renderActionByStatus()
    inits()
    popupRemoveBtn.addEventListener("click", handleRemove)
    popupSaveBtn.addEventListener("click", handleSave)
})



// _____________________________________POP UP _________________________________

// ------------------fetch ngach nhan vien theo hop dong ----------------------



function buidApiBacLuongPop() {
    if (!thongTinNgachCongChucPop) {
        return false
    }
    return 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/HoSoLuong/getBacLuongByNgachCongChuc/' + thongTinNgachCongChucPop;
}

async function apiDanhSachHopDongPop() {
    try {
        const hopDong = await $.ajax({
            url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/HopDong/GetHopDongByMaNV/id?id=' + maDetail,
            method: 'GET',
            contentType: 'application/json',
        });
        danhSachHopDongPop = hopDong

        setTimeout(() => {
            datGiaTriMacDinhNgachNVPopUp(maHopDong)
            fetchNgachCongChuc()
        }, 100);
    } catch (error) {
        console.log("Error", "ajaj")
    }
}

function datGiaTriMacDinhNgachNVPopUp(mahopdong) {
    const thongTinHopDong = danhSachHopDongPop.find(item => item.mahopdong === mahopdong)
    const ngachNhanVien = document.querySelector('#ngachNhanVienPop input')
    ngachNhanVien.value = thongTinHopDong.chucdanh
}
async function fetchNgachCongChuc() {
    try {
        const response = await $.ajax({
            url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/DanhMucNhomLuong/' + idNhomLuong,
            method: 'GET',
            contentType: 'application/json',
        });
        setNgachCongChucPopUp(response.ngachcongchuc)
        setBacLuongPopUp(response.bacluong)

    } catch (error) {
        console.log("Error", "ajaj")
    }
}

function setNgachCongChucPopUp(value) {
    const ngach = document.querySelector('#ngachCongChucPop select')
    ngach.value = value
}
function setBacLuongPopUp(value) {
    const bac = document.querySelector('#bacLuongPop select')
    bac.value = value
}
function setGiaTriLuongPopUp(value) {
    const luongCoBan = document.querySelector('#luongCoBanPop input')
    luongCoBan.value = formatCurrency(value)
}
function setGiaTriHeSoPopUp(valueHeSo) {
    const heSo = document.querySelector('#hesoluongPop input')
    heSo.value = valueHeSo
}
function setGiaTriNhomLuongPopUp(valueNhomLuong) {
    const nhomluong = document.querySelector('#nhomluongPop input')
    nhomluong.value = valueNhomLuong
}
function layThongTinBacLuongPopUp() {
    const bacLuong = document.getElementById('bacLuongPop')
    bacLuong.renderOption()
}
function tinhLuongPopUp(luongcobanInput, hesoInput, phucapInput, phucapkhacInput) {
    phucapkhacInput = phucapkhacInput || 0;
    const tongLuong = document.querySelector('#tongLuongPop input')
    const tongLuongTinhToan = (luongcobanInput * hesoInput) + phucapInput + phucapkhacInput
    tongLuong.value = formatCurrency(tongLuongTinhToan)
}

async function getBacLuongTheoNgachDauTienPopUp() {
    try {
        ngachCongChucPop = null;
        const response = await $.ajax({
            url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/DanhMucNhomLuong/' + idNhomLuong,
            method: 'GET',
            contentType: 'application/json',
        });

        ngachCongChucPop = response.ngachcongchuc
        thongTinNgachCongChucPop = ngachCongChucPop
        layThongTinBacLuongPopUp()
        apiLuongHeSoPopUp()
    } catch (error) {
        console.log("Error", "ajaj")
    }
}
function handleNgachCongChucPopUp() {
    const ngachCongChuc = document.querySelector('#ngachCongChucPop select')
    ngachCongChuc.removeEventListener("change", handleNgachCongChucChange);
    ngachCongChuc.addEventListener("change", handleNgachCongChucChange);

}
function handleNgachCongChucChange(event) {
    thongTinNgachCongChucPop = event.target.value;
    layThongTinBacLuongPopUp();
    apiLuongHeSoPopChangeNgach()
    handleBacLuongPopUp()
}

async function apiLuongHeSoPopUp() {
    try {
        const response = await $.ajax({
            url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/DanhMucNhomLuong/' + idNhomLuong,
            method: 'GET',
            contentType: 'application/json',
        });
        if (response) {
            setGiaTriLuongPopUp(response.luongcoban)
            setGiaTriHeSoPopUp(response.hesoluong)
            setGiaTriNhomLuongPopUp(response.nhomluong)
        }
    } catch (error) {
        console.log("Error")
    }
}
async function apiLuongHeSoPopChangeNgach() {
    try {
        const bacLuong = await $.ajax({
            url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/HoSoLuong/getBacLuongByNgachCongChuc/' + thongTinNgachCongChucPop,
            method: 'GET',
            contentType: 'application/json',

        });
        const luongCoBanHeSoDauTien = bacLuong[0]
        if (luongCoBanHeSoDauTien) {
            setGiaTriLuongPopUp(luongCoBanHeSoDauTien.luongcoban)
            setGiaTriHeSoPopUp(luongCoBanHeSoDauTien.hesoluong)
            setGiaTriNhomLuongPopUp(luongCoBanHeSoDauTien.nhomluong)
            tinhLuongPopUp(luongCoBanHeSoDauTien.luongcoban, luongCoBanHeSoDauTien.hesoluong, phuCapInputPop, phuCapKhacInputPop)
        }
    } catch (error) {
        console.log("Error")
    }
}

async function handleBacLuongPopUp() {
    phuCapKhacInputPop = parseCurrency(document.querySelector('#phuCapKhacPop input').value)
    danhSachluongCoBanHeSoPop = await getDanhSachluongCoBanHeSoPop();
    const bacLuong = document.querySelector('#bacLuongPop select');
    bacLuong.addEventListener("change", (event) => {

        if (Array.isArray(danhSachluongCoBanHeSoPop)) {
            const thongTinLuong = danhSachluongCoBanHeSoPop.find(item => item.bacluong == event.target.value);
            if (thongTinLuong) {
                setGiaTriLuongPopUp(thongTinLuong.luongcoban);
                setGiaTriHeSoPopUp(thongTinLuong.hesoluong);
                setGiaTriNhomLuongPopUp(thongTinLuong.nhomluong);
                luongCoBanPop = thongTinLuong.luongcoban
                heSoPop = thongTinLuong.hesoluong
                tinhLuongPopUp(luongCoBanPop, heSoPop, phuCapInputPop, phuCapKhacInputPop)

            } else {
                console.log("Không tìm thấy thông tin lương phù hợp");
            }
        } else {
            console.error("danhSachluongCoBanHeSoPop không phải là mảng");
        }
    });
}
async function getDanhSachluongCoBanHeSoPop() {
    try {
        const bacLuong = await $.ajax({
            url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/HoSoLuong/getBacLuongByNgachCongChuc/' + thongTinNgachCongChucPop,
            method: 'GET',
            contentType: 'application/json',

        });
        return bacLuong
    } catch (error) {
        console.log("Error")
        return []
    }
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
            luongVal = parseCurrency(document.querySelector('#luongCoBanPop input').value)
            heSoVal = document.querySelector('#hesoluongPop input').value
            phuCapKhacInputPop = 0;
        }
        // console.log("Luong", luongVal)
        // console.log("he so", heSoVal)
        // console.log("phu cap ", phuCapInputPop)
        // console.log("phu cap khac", phuCapKhacInputPop)

        tinhLuongPopUp(luongVal, heSoVal, phuCapInputPop, phuCapKhacInputPop);
    });
}
