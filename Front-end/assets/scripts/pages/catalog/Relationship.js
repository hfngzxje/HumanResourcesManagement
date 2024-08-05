
let isPopupEdit = false
const popupCreateBtn = document.getElementById("createBtn")
const popupSaveBtn = document.getElementById("saveBtn")
const popupRemoveBtn = document.getElementById("removeBtn")
const table = document.querySelector('base-table')
const maNhanVien = localStorage.getItem('maNhanVien')

var oldValue = null;

let idQuanhe = null

var TableColumns = [
    {
        label: 'ID',
        key: 'id'
    },
    {
        label: 'Tên',
        key: 'ten'
    },
    {
        label: 'Hành động',
        key: 'action',
        actions: [
            {
                type: 'plain', icon: 'bx bx-save', label: 'Sửa', onClick: (row) => {
                    isPopupEdit = true
                    fetchNguoiThan(row.id);
                    showPopup()
                }
            }
        ]
    }
]
var tableEvent = {

    rowDoubleClick: (row) => {

        isPopupEdit = true

        fetchNguoiThan(row.id)
        showPopup()
        console.log('row double click ', row);
    }
};
function backToList() {
    window.location.replace("/pages/catalog/Relationship.html");
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
                console.log('Lịch sử hoạt động đã được lưu:');
            },
            error: (err) => {
                console.log('Lỗi khi lưu lịch sử hoạt động:', err);
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
function fetchNguoiThan(id) {
    setLoading(true)
    idQuanhe = id
    $.ajax({
        url: 'https://localhost:7141/api/DanhMucQuanHe/getDanhMucDanTocById/' + id,
        method: 'GET',
        success: function (data) {

            // setFormValue('editTeam', data, 'fetch');
            setFormValue('editRelationship', data)
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
    const isConfirm = confirm('Bạn chắc chắn muốn thêm danh mục người thân?')
    if (!isConfirm) return
    const valid = validateForm('editRelationship')
    if (!valid) return
    const formValue = getFormValues('editRelationship')

    console.log('formValue ', formValue);
    const payload = buildPayload(formValue)
    setLoading(true)
    setTimeout(() => {
        $.ajax({
            url: 'https://localhost:7141/api/DanhMucQuanHe/addDanhMucQuanHe',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(payload),
            success: function (data) {
                console.log('fetchEmployee res :: ', data);
                alert("Thêm thành công !")
                recordActivityAdmin(maNhanVien, `Thêm danh mục người thân: ${formValue.ten}`);
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
    const isConfirm = confirm('Bạn chắc chắn muốn xóa danh người thân?')
    if (!isConfirm) return
    setLoading(true)
    setTimeout(() => {
        $.ajax({
            url: 'https://localhost:7141/api/DanhMucQuanHe/removeQuanHe?id=' + idQuanhe,
            method: 'DELETE',
            success: function (data) {
                console.log('fetchPhongBan res :: ', data);
                alert("Xóa thành công !")
                recordActivityAdmin(maNhanVien, `Xóa danh mục người than: ${oldValue}`);
                closePopup()
                clearFormValues()
                table.handleCallFetchData();
            },
            error: (err) => {
                console.log('fetchPhongBan err :: ', err);
                alert("Xóa thất bại!")
            },
            complete: () => {
                setLoading(false)
            }
        });
    }, 1000);
}
function handleSave() {
    const isConfirm = confirm('Bạn chắc chắn muốn sửa danh mục quan hệ?')
    if (!isConfirm) return
    const formValue = getFormValues('editRelationship')
    const payload = buildPayload(formValue)
    console.log('payload ', payload);
    setLoading(true)
    setTimeout(() => {
        $.ajax({
            url: 'https://localhost:7141/api/DanhMucQuanHe/updateQuanHe?id=' + idQuanhe,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(payload),
            success: function (data) {
                console.log('fetchLanguage res :: ', data);
                alert('Lưu Thành Công!')
                recordActivityAdmin(maNhanVien, `Sửa danh mục người thân: ${oldValue} => ${payload.ten} `);
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
    const form = document.getElementById('editRelationship');
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
    return 'https://localhost:7141/api/DanhMucQuanHe/getDanhMucDanToc'
}

function showPopup() {
    var modal = document.getElementById("editRelationship");
    modal.style.display = "block";
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            clearFormValues();
        }
    }

    console.log('isPopupEdit ', isPopupEdit);

    if (isPopupEdit) {
        const popupTitle = modal.querySelector('h2')
        popupTitle.textContent = "Sửa Tiêu Đề Quan Hệ"
        popupRemoveBtn.classList.remove('hidden')
        popupSaveBtn.classList.remove('hidden')
        popupSaveBtn.setAttribute('disabled','');
        popupCreateBtn.classList.add('hidden')
    } else {
        const popupTitle = modal.querySelector('h2')
        popupTitle.textContent = "Thêm mới Tiêu Đề Quan Hệ"
        popupSaveBtn.classList.add('hidden')
        popupRemoveBtn.classList.add('hidden')
        popupCreateBtn.classList.remove('hidden')
    }
}
function checkValues() {
    const formValue = getFormValues('editRelationship');
    const newValue = formValue.ten;
    console.log("oldValue: ", oldValue, "newValue: ", newValue);
    if (oldValue === newValue) {
        popupSaveBtn.setAttribute('disabled','');
        console.log(popupSaveBtn)
    } else {
        popupSaveBtn.removeAttribute('disabled') ; 
        console.log(popupSaveBtn)
    }
}
function closePopup() {
    var modal = document.getElementById("editRelationship");
    modal.style.display = "none"
}
document.addEventListener('DOMContentLoaded', () => {
    popupSaveBtn.addEventListener("click", () => {
        console.log('save click');
        handleSave()
    })
    popupCreateBtn.addEventListener("click", handleCreate)
    popupRemoveBtn.addEventListener("click", handleRemoveRow)

    const inputTenQuanHe = document.querySelector('base-input[name="ten"]');
    if (inputTenQuanHe) {
        inputTenQuanHe.addEventListener('input', checkValues);
    }
})

