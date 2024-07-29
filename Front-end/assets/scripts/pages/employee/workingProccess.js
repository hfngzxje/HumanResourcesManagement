const vaiTroID = localStorage.getItem("vaiTroID")
let idDieuChuyen = null
const table = document.querySelector('base-table')
const popupRemoveBtn = document.getElementById("deleteBtn")
const popupUpdatebtn = document.getElementById("updateBtn")
const ma = localStorage.getItem("maNhanVien")

var MaritalOptions = [
    { label: 'Hợp đồng còn thời hạn', value: 1 },
    { label: 'Hợp đồng quá hạn', value: 0 },
];
var working_Proccess_Options = []
var TableColumns = [
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
                type: 'plain', icon: 'bx bx-save', label: 'Sửa', onClick: (row) => {
                    isPopupEdit = true
                    fetchworkingProccess(row.id);
                    showPopup()
                }
            }
        ]
    }
]


var tableEvent = { // global: ở đau cũng truy cập được
    rowClick: (row) => {
        console.log('row click ', row);
        fetchworkingProccess(row.id)
    }
}
function showPopup() {
    var modal = document.getElementById("editFamily");
    modal.style.display = "block";
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            clearFormValues("editFamily");
        }
    }
}
function closePopup() {
    var modal = document.getElementById("editFamily");
    modal.style.display = "none"
}
function backToList() {
    const url = new URL("/pages/employee/workingProccess.html", window.location.origin);
    window.location.replace(url.toString());
}

function buildPayload(formValue) {
    const formClone = { ...formValue }
    return formClone
}

function fetchworkingProccess(id) {
    setLoading(true)
    idDieuChuyen = id
    $.ajax({
        url: 'https://localhost:7141/api/DieuChuyen/CongViecHienTai/' + id,
        method: 'GET',
        success: function (data) {
            setFormValue('editFamily', data)
        },
        error: (err) => {
            console.log('fetchEmployee err :: ', err);
        },
        complete: () => {
            setLoading(false)
        }
    });
}

function handleCreate() {
    const isConfirm = confirm('Bạn chắc chắn muốn điều chuyển nhân viên sang vị trí này ?')
    if (!isConfirm) return
    const valid = validateForm('Working_Process_form')
    if (!valid) return
    const formValue = getFormValues('Working_Process_form')
    const employeeId = maNhanVien
    formValue['ma'] = employeeId;
    console.log('formValue ', formValue);
    const payload = buildPayload(formValue)

    setLoading(true)
    setTimeout(() => {
        $.ajax({
            url: 'https://localhost:7141/api/DieuChuyen/DieuChuyen',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(payload),
            success: function (data) {
                if (table) {
                    alert("Thêm thành công!");
                    table.handleCallFetchData();
                    clearFormValues("Working_Process_form")
                }
                else {
                    console.err("Không tìm thấy")
                }
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
                    alert("Tạo mới thất bại!");
                }
            },
            complete: () => {
                setLoading(false);
            }
        });
    }, 1000);
}

function handleRemove() {
    const isConfirm = confirm('Bạn chắc chắn muốn xóa điều chuyển này không ?')
    if (!isConfirm) return
    setLoading(true)
    setTimeout(() => {
        $.ajax({
            url: 'https://localhost:7141/api/NguoiThan/removeNguoiThan/' + idDieuChuyen,
            method: 'DELETE',
            success: function (data) {
                alert("Xóa thành công!")
                closePopup()
                table.handleCallFetchData();
            },
            error: (err) => {
                console.log('fetchEmployee err :: ', err);
                alert("Xóa thất bại!")
            },
            complete: () => {
                setLoading(false)
            }
        });
    }, 1000);
}
function handleSave() {
    const isConfirm = confirm('Bạn chắc chắn muốn sửa quan hệ gia đình?')
    if (!isConfirm) return
    const valid = validateForm('editFamily')
    if (!valid) return

    const formValue = getFormValues('editFamily')
    formValue['id'] = idDieuChuyen
    const payload = buildPayload(formValue)
    setTimeout(() => {
        setLoading(true)
        $.ajax({
            url: 'https://localhost:7141/api/NguoiThan/updateNguoiThan',
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(payload),
            success: function (data) {
                alert("Sửa thành công!")
                closePopup()
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
    const actionEl = document.getElementById('Working_Process_form_action')
    const buildButton = (label, type, icon) => {
        const btnEl = document.createElement('base-button')
        btnEl.setAttribute('label', label)
        btnEl.setAttribute('type', type)
        btnEl.setAttribute('icon', icon)
        return btnEl
    }
    const createBtn = buildButton('Thêm', 'green', 'bx bx-plus')
    const clear = buildButton('Clear', 'plain', 'bx bx-eraser')

    createBtn.addEventListener('click', handleCreate)
    clear.addEventListener('click', function () {
        clearFormValues('Working_Process_form');
    });

    actionEl.append(createBtn, clear)
}

function buildApiUrl() {
    return 'https://localhost:7141/api/DieuChuyen/GetAllDieuChuyen?maNV=' + ma
}

// function getNameQuanHe() {

//     $.ajax({
//         url: 'https://localhost:7141/api/Dieu/getDanhMucNguoiThan',
//         method: 'GET',
//         success: function (data) {
//             workingProccessOptions = data;
//         },
//         error: (err) => {
//             console.log('fetchEmployee err :: ', err);
//         }
//     });
// }

// getNameQuanHe()


document.addEventListener('DOMContentLoaded', () => {
    // if (vaiTroID !== "1") {
    //     window.location.href = "/pages/error.html";
    //     return;
    // }
    renderActionByStatus();
    popupRemoveBtn.addEventListener("click", handleRemove)
    popupUpdatebtn.addEventListener("click", handleSave)

})
