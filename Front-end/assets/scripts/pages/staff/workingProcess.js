const vaiTroID = localStorage.getItem("vaiTroID")
let maHopDongHienTai = null
const table = document.querySelector('base-table')
const popupRemoveBtn = document.getElementById("deleteBtn")
const popupSaveBtn = document.getElementById("updateBtn")
var maDetail = localStorage.getItem('maDetail')



var TableColumnsChuyenDen = [
    {
        label: 'ID',
        key: 'id'
    },
    {
        label: 'Mã nhân viên',
        key: 'ma'
    },
    {
        label: 'Ngày Điều Chuyển',
        key: 'ngayDieuChuyen'
    },
    {
        label: 'từ phòng',
        key: 'tuPhong',
    },
    {
        label: 'Đến phòng',
        key: 'denPhong',
    },
    {
        label: 'Từ tổ',
        key: 'tuTo',

    },
    {
        label: 'Đến tổ',
        key: 'denTo',

    },
    {
        label: 'Từ Chức vụ',
        key: 'tuChucVu',

    },
    {
        label: 'Đến chức vụ',
        key: 'denChucVu',

    },
    {
        label: 'Chi tiết',
        key: 'chiTiet',

    },
    {
        label: 'Trạng thái',
        key: 'trangThai',
        formatGiaTri: (value) => {
            let result = { text: 'Đang chờ', color: 'green' };
            if (value === 1) {
                result.text = 'Đã điều chuyển';
                result.color = 'blue';
            }
            else if (value === -1) {
                result.text = 'Đã hủy';
                result.color = 'red';
            }
            return result;
        }

    },
    {
        label: 'Hành động',
        key: 'action',
        actions: [
            {
                type: 'red', icon: 'bx bx-x-circle', label: 'Hủy', onClick: (row) => {
                    handleHuyDieuChuyen(row.idDieuChuyen)
                }
            }
        ]
    }
]

let thongTinPhongBan = null
function backToList() {
    const url = new URL("/pages/staff/laborContract.html", window.location.origin);
}

function buildPayload(formValue) {
    const formClone = { ...formValue }

    formClone['trangThai'] = Number(formClone['trangThai'])

    return formClone
}
function apiTo() {
    if (!thongTinPhongBan) {
        return false
    }
    return 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/DanhMucTo/GetDanhMucToByPhong/' + thongTinPhongBan
}
function layThongTinTo() {
    const to = document.getElementById('to')
    to.renderOption()
}
async function getToTheoPhongBanDauTien() {
    try {
        const response = await $.ajax({
            url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/PhongBan/getAllPhongBan',
            method: 'GET',
            contentType: 'application/json',
        });
        const phongBanDauTien = response[0]
        thongTinPhongBan = phongBanDauTien.id
        layThongTinTo()
    } catch (error) {
        console.log("Error", "ajaj")
    }
}
function handlePhongBan() {
    const phongBan = document.querySelector('#phong select')
    phongBan.addEventListener("change", (event) => {
        thongTinPhongBan = event.target.value
        layThongTinTo()
    });
}
function inits() {
    handlePhongBan()
    getToTheoPhongBanDauTien()
}

function fetchDieuChuyen() {
    setLoading(true)
    $.ajax({

        url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/DieuChuyen/CongViecHienTai/' + maDetail,
        method: 'GET',
        success: function (data) {
            setFormValue('workingProcessHienTai_form', data)
        },
        error: (err) => {
            console.log('fetchContract err :: ', err);
        },
        complete: () => {
            setLoading(false)
        }
    });
}


async function apiGetDuLieu() {
    try {
        const response = await $.ajax({
            url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/DieuChuyen/GetAllDieuChuyen?maNV=' + maDetail,
            method: 'GET',
            contentType: 'application/json',
        });
        const lastRecord = response[response.length - 2];
        const ten = lastRecord.chucVu;  // Sử dụng lastRecord để lấy bản ghi đầu tiên
        return ten;
    } catch (error) {
        console.log("Error", "abc");
        return null;  // Trả về null nếu có lỗi
    }
}

async function handleLuuLichSuDieuChuyen() {
    await showConfirm("Bạn có chắc chắn muốn tạo lịch điều chuyển ?")
    const valid = validateForm('workingProcessChuyenDen_form');
    if (!valid) return;
    const formValue = getFormValues('workingProcessChuyenDen_form');
    formValue['ma'] = maDetail;
    const id = 2;
    const payload = buildPayload(formValue);

    console.log(payload);
    setLoading(true);
    setTimeout(async () => {
        $.ajax({
            url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/DieuChuyen/LuuLichSuDieuChuyen',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(payload),
            success: async function (data) {
                showSuccess('Tạo Thành Công!');
                console.log("Data", data);
                table.handleCallFetchData();
            },
            error: (err) => {
                console.log('err ', err);
                try {
                    if (!err.responseJSON) {
                        showError(err.responseText);
                        return;
                    }
                    const errObj = err.responseJSON.errors;
                    const firtErrKey = Object.keys(errObj)[0];
                    const message = errObj[firtErrKey][0];
                    showError(message);
                } catch (error) {
                    showError("Tạo điều chuyển không thành công!");
                }
            },
            complete: () => {
                setLoading(false);
            }
        });
    }, 1000);
}

async function handleHuyDieuChuyen(id) {
    await showConfirm("Bạn có chắc chắn muốn hủy lịch điều chuyển ?")
    setLoading(true)
    setTimeout(() => {
        $.ajax({
            url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/DieuChuyen/HuyDieuChuyen?idDieuChuyen=' + id,
            method: 'PUT',
            success: function (data) {
                showSuccess('Hủy Thành Công!');
                table.handleCallFetchData();
            },
            error: (err) => {
                console.log('err ', err);
                try {
                    if (!err.responseJSON) {
                        showError(err.responseText);
                        return;
                    }
                    const errObj = err.responseJSON.errors;
                    const firtErrKey = Object.keys(errObj)[0];
                    const message = errObj[firtErrKey][0];
                    showError(message);
                } catch (error) {
                    showError("Hủy điều chuyển không thành công!");
                }
            },
            complete: () => {
                setLoading(false)
            }
        });
    }, 1000);
}

async function getHopDong() {
    try {
        const response = await $.ajax({
            url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/HopDong/GetHopDongActiveByMaNV/id?id=' + maDetail,
            method: 'GET',
            contentType: 'application/json',
        });
        if (Array.isArray(response) && response.length > 0) { 
            console.log("Hợp lệ")
        }
        else {
            showNavigationAlert("Nhân viên chưa có hợp đồng chính thức, vui lòng tạo hợp đồng trước tiên", "laborContract.html")
        }
    } catch (error) {
        console.log("Error")
    }
}

function renderActionByStatus() {
    const actionEl = document.getElementById('workingProcessChuyenDen_form_action')
    const buildButton = (label, type, icon) => {
        const btnEl = document.createElement('base-button')
        btnEl.setAttribute('label', label)
        btnEl.setAttribute('type', type)
        btnEl.setAttribute('icon', icon)
        return btnEl
    }
    const createBtn = buildButton('Tạo mới', 'green', 'bx bx-plus')
    const clear = buildButton('cLear', 'plain', 'bx bx-eraser')

    createBtn.addEventListener('click', handleLuuLichSuDieuChuyen)

    actionEl.append(createBtn)
}

function buildApiUrlChuyenDen() {
    return 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/DieuChuyen/getLichSuDieuChuyen?maNV=' + maDetail
}
document.addEventListener('DOMContentLoaded',async () => {
    await checkIsUpdateResume()
    await checkIsCreatedLabor()
    await checkIsCreatedSalary()
    await getHopDong()
    fetchDieuChuyen()
    renderActionByStatus()
    inits()
})

