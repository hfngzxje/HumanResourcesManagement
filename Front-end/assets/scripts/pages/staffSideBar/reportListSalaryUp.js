const apiTable = "https://localhost:7141/api/DanhSachLenLuong/getDanhSachLenLuong";
const table = document.querySelector('base-table')
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
async function handleCreate() {
    const isConfirm = confirm('Bạn chắc chắn muốn thêm bảng lương?')
    if (!isConfirm) return
    const valid = validateForm('salaryRecord_form')
    if (!valid) return
    const formValue = getFormValues('salaryRecord_form')
    formValue['phucaptrachnhiem'] = parseCurrency(formValue['phucaptrachnhiem'])
    formValue['phucapkhac'] = parseCurrency(formValue['phucapkhac'])
    formValue['tongluong'] = parseCurrency(formValue['tongluong'])
    // formValue['mahopdong'] = formValue['mahopdong']
    const payload = buildPayload(formValue)
    setLoading(true)
    setTimeout(() => {
        $.ajax({
            url: 'https://localhost:7141/api/DanhSachLenLuong/taoMoiHoSoLuongKhongActive',
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
// ------------- Add nâng lương --------------------------
var danhSachMaHopDong = []
var phuCapInput = null
var thongTinNgachCongChuc = null
var phuCapKhacInput = null
function buidApiBacLuong() {
    return 'https://localhost:7141/api/HoSoLuong/getBacLuongByNgachCongChuc/' + thongTinNgachCongChuc;
}
function tinhLuong(luongcobanInput, hesoInput, phucapInput, phucapkhacInput) {
    phucapkhacInput = phucapkhacInput || 0;
    const tongLuong = document.querySelector('#tongLuong input')
    const tongLuongTinhToan = (luongcobanInput * hesoInput) + phucapInput + phucapkhacInput
    tongLuong.value = formatCurrency(tongLuongTinhToan)
}

function formatCurrency(val) {
    return val.toLocaleString("it-IT", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    });
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
            url: 'https://localhost:7141/api/HopDong/GetHopDongActiveByMaNV/id?id='+ maDetail,
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
function layThongTinBacLuong() {
    const bacLuong = document.getElementById('bacLuong')
    bacLuong.renderOption()
}
async function getBacLuongTheoNgachDauTien() {
    try {
        const response = await $.ajax({
            url: 'https://localhost:7141/api/NhanVien/ngachCongChuc',
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
            url: 'https://localhost:7141/api/HoSoLuong/getBacLuongByNgachCongChuc/' + thongTinNgachCongChuc,
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

async function inits(){
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
            url: 'https://localhost:7141/api/HoSoLuong/getAllLuongByMaNV/' + ma,
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
            document.querySelector('#phuCapKhacPop input').value = formatCurrency(lastItem.phucapkhac);
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
            url: 'https://localhost:7141/api/DanhMucNhomLuong/' + idNhomLuong,
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
            url: 'https://localhost:7141/api/NhanVien/getNgachCongChucById/' + idNgachCongChuc,
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
function clearFormValues(formId) {
    const form = document.getElementById(formId);
    const inputs = form.querySelectorAll('input, textarea,select');
    inputs.forEach(input => {
        if (input.type === 'checkbox') {
            input.checked = false;
        } 
        else if (input.tagName.toLowerCase() === 'select') {
            input.selectedIndex = 0; // Reset select về item đầu tiên
        } else {
            input.value = '';
        }
    });
}
function buildApiUrl() {
    return apiTable;
}
function formatCurrency(val) {
    return val.toLocaleString("it-IT", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    });
}
function parseCurrency(value) {
    const cleanedValue = value.replace(/[^0-9,]/g, '').replace(',', '.');
    return parseFloat(cleanedValue);
}
document.addEventListener("DOMContentLoaded", () => {

});