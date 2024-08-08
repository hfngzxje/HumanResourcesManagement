
let Eid = null;
let temp = false
let isPopupEdit = false
const popupCreateBtn = document.getElementById("createBtn")
const popupSaveBtn = document.getElementById("saveBtn")
const popupRemoveBtn = document.getElementById("removeBtn")
const table = document.querySelector('base-table')
const maNhanVien = localStorage.getItem('maNhanVien')

let idPhongBan = null
var oldValue = null;

var TableColumns = [
    {
        label: 'ID',
        key: 'id',
        type: 'disabled'
    },
    {
        label: 'Mã',
        key: 'ma'
    },
    {
        label: 'Tên Phòng Ban',
        key: 'ten'
    },
    {
        label: 'Hành động',
        key: 'action',
        actions: [
            {
                type: 'plain', icon: 'bx bx-save', label: 'Sửa', onClick: (row) => {
                    isPopupEdit = true
                    fetchPhongBan(row.id);
                    showPopup()
                }
            }
        ]
    }
]
var tableEvent = {

    rowDoubleClick: (row) => {

        isPopupEdit = true

        fetchPhongBan(row.id)
        showPopup()
    }
};
function backToList() {
    window.location.replace("/pages/catalog/departments.html");
}

function buildPayload(formValue) {
    const formClone = { ...formValue }
    return formClone
}

function recordActivityAdmin(actor, action){
    setLoading(true)
    setLoading(true);

    const payload = {
        createdBy: actor,
        action: action,
    };
  
        $.ajax({
            url: 'https://localhost:7141/api/LichSuHoatDong',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(payload),
            success: function (data) {
            },
            error: (err) => {
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
                    alert("Lưu lịch sử hoạt động không thành công!");
                }
            },
            complete: () => {
                setLoading(false)
            }
        });
}
function fetchPhongBan(id) {
    setLoading(true)
    idPhongBan = id
    $.ajax({
        url: 'https://localhost:7141/api/PhongBan/getPhongBanById/' + id,
        method: 'GET',
        success: function (data) {
            setFormValue('editPhongBan', data)
            oldValue = data.ten
        },
        error: (err) => {
            console.log('fetchDepartments err :: ', err);
        },
        complete: () => {
            setLoading(false)
        }
    });
}

function handleCreate() {
    const isConfirm = confirm('Bạn chắc chắn muốn thêm danh mục phòng ban?')
    if (!isConfirm) return
    const valid = validateForm('editPhongBan')
    if (!valid) return
    const formValue = getFormValues('editPhongBan')

    const payload = buildPayload(formValue)
    setLoading(true)
    setTimeout(() => {
        $.ajax({
            url: 'https://localhost:7141/api/PhongBan/addPhongBan',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(payload),
            success: function (data) {
                alert("Thêm thành công !")
                recordActivityAdmin(maNhanVien, `Thêm danh mục phòng ban: ${formValue.ten}`);
             
                closePopup()
                clearFormValues()
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

function handleRemoveRow() {
    const isConfirm = confirm('Bạn chắc chắn muốn xóa danh mục phòng ban?')
    if (!isConfirm) return
    setLoading(true)
    setTimeout(() => {
        $.ajax({
            url: 'https://localhost:7141/api/PhongBan/removePhongBan?id=' + idPhongBan,
            method: 'DELETE',
            success: function (data) {
                alert("Xóa thành công !")
                recordActivityAdmin(maNhanVien, `Xóa danh mục phòng ban: ${oldValue}`);
                closePopup()
                clearFormValues()
                table.handleCallFetchData();
            },
            error: (err) => {
                alert("Xóa thất bại!")
            },
            complete: () => {
                setLoading(false)
            }
        });
    }, 1000);
}
function handleSave() {
    const isConfirm = confirm('Bạn chắc chắn muốn sửa danh mục phòng ban?')
    if (!isConfirm) return
    const formValue = getFormValues('editPhongBan')
    const payload = buildPayload(formValue)
    setLoading(true)
    setTimeout(() => {
        $.ajax({
            url: 'https://localhost:7141/api/PhongBan/updatePhongBan?id=' + idPhongBan,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(payload),
            success: function (data) {
                alert('Lưu Thành Công!');
                recordActivityAdmin(maNhanVien, `Sửa danh mục phòng ban: ${oldValue} => ${payload.ten} `);
                closePopup()
                clearFormValues()
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


function clearFormValues() {
    const form = document.getElementById('editPhongBan');
    const inputs = form.querySelectorAll('input, textarea');

    inputs.forEach(input => {
        if (input.type === 'checkbox') {
            input.checked = false;
        } else {
            input.value = '';
        }
    });
}


function buildApiUrl() {
    return 'https://localhost:7141/api/PhongBan/getAllPhongBan'
}

function showPopup() {
    var modal = document.getElementById("editPhongBan");
    modal.style.display = "block";
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            setFormValue('editPhongBan', { ma: "", ten: "", })
        }
    }


    if (isPopupEdit) {
        const popupTitle = modal.querySelector('h2')
        popupTitle.textContent = "Sửa Tiêu Đề Phòng Ban"
        popupRemoveBtn.classList.remove('hidden')
        popupSaveBtn.classList.remove('hidden')
        popupSaveBtn.setAttribute('disabled','');
        popupCreateBtn.classList.add('hidden')
    } else {
        const popupTitle = modal.querySelector('h2')
        popupTitle.textContent = "Thêm mới Tiêu Đề Phòng Ban"
        popupSaveBtn.classList.add('hidden')
        popupRemoveBtn.classList.add('hidden')
        popupCreateBtn.classList.remove('hidden')
    }
}
function checkValues() {
    const formValue = getFormValues('editPhongBan');
    const newValue = formValue.ten;
    if (oldValue === newValue) {
        popupSaveBtn.setAttribute('disabled','');
    } else {
        popupSaveBtn.removeAttribute('disabled') ; 
    }
}
function closePopup() {
    var modal = document.getElementById("editPhongBan");
    modal.style.display = "none"
}
document.addEventListener('DOMContentLoaded', () => {
    popupSaveBtn.addEventListener("click", () => {
        handleSave()
    })
    popupCreateBtn.addEventListener("click", handleCreate)
    popupRemoveBtn.addEventListener("click", handleRemoveRow)

    const inputTenPhongBan = document.querySelector('base-input[name="ten"]');
    if (inputTenPhongBan) {
        inputTenPhongBan.addEventListener('input', checkValues);
    }
})


