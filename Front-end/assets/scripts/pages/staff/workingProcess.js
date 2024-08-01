const vaiTroID = localStorage.getItem("vaiTroID")
let maHopDongHienTai = null
const table = document.querySelector('base-table')
const popupRemoveBtn = document.getElementById("deleteBtn")
const popupSaveBtn = document.getElementById("updateBtn")
var maDetail = localStorage.getItem('maDetail')



var TableColumnsChuyenDen = [
    {
        label: 'id',
        key: 'id',
    },
    {
        label: 'Ngày Điều Chuyển',
        key: 'ngayDieuChuyen',
        type: 'datetime'
    },
    {
        label: 'Phòng Ban',
        key: 'phong',
    },
    {
        label: 'Chức vụ',
        key: 'chucVu',
    },
    {
        label: 'Tổ',
        key: 'to',

    },
    {
        label: 'Chi Tiết',
        key: 'chiTiet',

    },
    {
        label: 'Hành động',
        key: 'action',
        actions: [
            {
                type: 'plain', icon: 'bx bx-eraser', label: 'Xóa', onClick: (row) => {
                    handleRemove(row.id)
                }
            }
        ]
    }
]

function backToList() {
    
        const url = new URL("/pages/staff/laborContract.html", window.location.origin);
  
}

function buildPayload(formValue) {
    const formClone = { ...formValue }

    formClone['trangThai'] = Number(formClone['trangThai'])

    return formClone
}

function fetchDieuChuyen() {
    setLoading(true)
    $.ajax({

        url: 'https://localhost:7141/api/DieuChuyen/CongViecHienTai/' + maDetail,
        method: 'GET',
        success: function (data) {
            setFormValue('workingProcessHienTai_form', data)
            console.log(data.chucvuhientai)
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
            url: 'https://localhost:7141/api/DieuChuyen/GetAllDieuChuyen?maNV=' + maDetail,
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
    const isConfirm = confirm('Bạn chắc chắn muốn tạo điều chuyển?');
    if (!isConfirm) return;
    const valid = validateForm('workingProcessChuyenDen_form');
    if (!valid) return;
    const formValue = getFormValues('workingProcessChuyenDen_form');
    formValue['ma'] = maDetail;
    const id = 2;
    const payload = buildPayload(formValue);

    console.log(payload);
    setLoading(true);
    setTimeout(async () => {  // Thêm từ khóa async vào hàm này
        $.ajax({
            url: 'https://localhost:7141/api/DieuChuyen/LuuLichSuDieuChuyen',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(payload),
            success: async function (data) {  // Thêm từ khóa async vào hàm này
                alert('Tạo Thành Công!');
                console.log("Data", data);
                const dulieu = await apiGetDuLieu();  // Sử dụng await để đợi giá trị trả về
                alert(dulieu);
                handleDieuChuyen(id);
                table.handleCallFetchData();
            },
            error: (err) => {
                console.log('err ', err);
                try {
                    if (!err.responseJSON) {
                        alert(err.responseText);
                        return;
                    }
                    const errObj = err.responseJSON.errors;
                    const firtErrKey = Object.keys(errObj)[0];
                    const message = errObj[firtErrKey][0];
                    alert(message);
                } catch (error) {
                    alert("Tạo điều chuyển không thành công!");
                }
            },
            complete: () => {
                setLoading(false);
            }
        });
    }, 1000);
}

function handleDieuChuyen(id) {
    const valid = validateForm('workingProcessChuyenDen_form')
    if (!valid) return
    const formValue = getFormValues('workingProcessChuyenDen_form')
    formValue['maNV'] = maDetail;
    formValue['id'] = id
    const payload = buildPayload(formValue)
    const apiUrl = `https://localhost:7141/api/DieuChuyen/DieuChuyen?maNV=${encodeURIComponent(formValue['maNV'])}&id=${encodeURIComponent(formValue['id'])}`;
    setLoading(true)
    setTimeout(() => {
    $.ajax({
        
        url: apiUrl, 
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(payload),
        success: function (data) {
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
                alert("điều chuyển không thành công!")
            }
        },
        complete: () => {
            setLoading(false)
        }
    });
}, 1000); 
}
function handleRemove(id) {
    const isConfirm = confirm('Bạn chắc chắn muốn xóa điều chuyển?')
    if (!isConfirm) return
    setLoading(true)
    setTimeout(() => {
    $.ajax({
        url: 'https://localhost:7141/api/DieuChuyen/RemoveDieuChuyen?id=' + id,
        method: 'DELETE',
        success: function (data) {
            alert('Xóa Thành Công!');
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
    return 'https://localhost:7141/api/DieuChuyen/GetAllDieuChuyen?maNV=' + maDetail
}

document.addEventListener('DOMContentLoaded', () => {
    fetchDieuChuyen()
    renderActionByStatus()
    alert(maDetail)
    // popupRemoveBtn.addEventListener("click", handleRemove)
    // popupSaveBtn.addEventListener("click", handleSave)
})

