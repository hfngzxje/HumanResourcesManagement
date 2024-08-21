const apiTable = "https://localhost:7141/api/DieuChuyen";
const table = document.querySelector('base-table')
var manhanvien = null
var TableColumns = [
    {
        label: 'Mã nhân viên',
        key: 'ma'
    },
    {
        label: 'Ngày Điều Chuyển',
        key: 'ngayDieuChuyen',
        type: 'datetime'
    },
    {
        label: 'từ phòng',
        key: 'tenPhongCu',
    },
    {
        label: 'Đến phòng',
        key: 'tenPhongMoi',
    },
    {
        label: 'Từ tổ',
        key: 'tenToCu',

    },
    {
        label: 'Đến tổ',
        key: 'tenToMoi',

    },
    {
        label: 'Từ Chức vụ',
        key: 'tuChucVu',

    },
    {
        label: 'Đến chức vụ',
        key: 'tenChucVuMoi',

    },
    {
        label: 'Chi tiết',
        key: 'ghiChu',

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

var trangThaiSelect = [
    { label: "Tất cả", value: '' },
    { label: "Đang chờ", value: 0 },
    { label: "Đã điều chuyển", value: 1 },
    { label: "Đã hủy", value: -1 },
];

async function showPopup() {
    var modal = document.getElementById("createTransfer");
    modal.style.display = "block";
    await getMaNhanVienDauTien()
    await maNhanVienChange()
    await fetchViTriHienTai()
    await handlePhongBan()
    await getToTheoPhongBanDauTien()
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            clearFormValues("fetchTransfer");
            clearFormValues("create");
        }
    }
}
function closePopUp() {
    var modal = document.getElementById("createTransfer");
    modal.style.display = "none";
    clearFormValues("fetchTransfer");
    clearFormValues("create");
}
async function getMaNhanVienDauTien() {
    try {
        const response = await $.ajax({
            url: 'https://localhost:7141/api/NhanVien',
            method: 'GET',
            contentType: 'application/json',
        });
        const nhanVienDauTien = response[0]
        manhanvien = nhanVienDauTien.ma

    } catch (error) {
        console.log("Error", "ajaj")
    }
}
async function maNhanVienChange() {
    const ma = document.querySelector('#maNhanVien select')
    ma.addEventListener("change", (event) => {
        manhanvien = event.target.value;
        fetchViTriHienTai()
    });
}
function fetchViTriHienTai() {
    setLoading(true)
    $.ajax({

        url: 'https://localhost:7141/api/DieuChuyen/CongViecHienTai/' + manhanvien,
        method: 'GET',
        success: function (data) {
            setFormValue('fetchTransfer', data)
        },
        error: (err) => {
            console.log('fetchContract err :: ', err);
        },
        complete: () => {
            setLoading(false)
        }
    });
}


async function handleLuuLichSuDieuChuyen() {
    await showConfirm("Bạn có chắc chắn muốn tạo lịch điều chuyển ?")
    const valid = validateForm('create');
    if (!valid) return;
    const formValue = getFormValues('create');
    formValue['ma'] = manhanvien;
    const id = 2;
    const payload = buildPayload(formValue);

    console.log(payload);
    setLoading(true);
    setTimeout(async () => {
        $.ajax({
            url: 'https://localhost:7141/api/DieuChuyen/LuuLichSuDieuChuyen',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(payload),
            success: async function (data) {
                showSuccess('Tạo Thành Công!');
                console.log("Data", data);
                table.handleCallFetchData();
                closePopUp()
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
            url: 'https://localhost:7141/api/DieuChuyen/HuyDieuChuyen?idDieuChuyen=' + id,
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
// ----------------------------------------

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
    return 'https://localhost:7141/api/DanhMucTo/GetDanhMucToByPhong/' + thongTinPhongBan
}
function layThongTinTo() {
    const to = document.getElementById('to')
    to.renderOption()
}
async function getToTheoPhongBanDauTien() {
    try {
        const response = await $.ajax({
            url: 'https://localhost:7141/api/PhongBan/getAllPhongBan',
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

// --------------------------------------------------------
async function handleSearch() {
    try {
        const formValue = getFormValues("report_form");
        const tableReport = document.getElementById("tableReport");

        // Khởi tạo đối tượng params
        const params = {
            trangThai: formValue.trangThai || "",
            ngayDieuChuyen: formValue.ngayDieuChuyen || "",
        };

        // Giả sử handleCallFetchData là một hàm không đồng bộ
        await tableReport.handleCallFetchData(params);

    } catch (error) {
        console.error("Error in handleSearch:", error);
    }

}

function trangThaiChange() {
    const trangthai = document.querySelector('#trangthai select')
    trangthai.addEventListener("change", (event) => {
        handleSearch()
    });
}
function ngayDieuChuyenChangeDate() {
    const ngay = document.querySelector('#ngaydieuchuyen input')
    ngay.addEventListener("changeDate", (event) => {
        handleSearch()
    });
    const ngay1 = document.querySelector('#ngaydieuchuyen input')
    ngay1.addEventListener("change", (event) => {
        handleSearch()
    });
}

function buildApiUrl() {
    return apiTable;
}
function inits() {
    trangThaiChange()
    ngayDieuChuyenChangeDate()
}

document.addEventListener("DOMContentLoaded", () => {
    handleSearch()
    inits()
});
