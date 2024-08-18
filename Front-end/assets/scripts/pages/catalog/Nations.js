let isPopupEdit = false
const popupCreateBtn = document.getElementById("createBtn")
const popupSaveBtn = document.getElementById("saveBtn")
const popupRemoveBtn = document.getElementById("removeBtn")
const table = document.querySelector('base-table')
const maNhanVien = localStorage.getItem('maNhanVien')

let idDanToc = null

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
                    fetchDanToc(row.id);
                    showPopup()
                }
            }
        ]
    }
]
var tableEvent = {

    rowDoubleClick: (row) => {

        isPopupEdit = true

        fetchDanToc(row.id)
        showPopup()
    }
};


function backToList() {
    window.location.replace("/pages/catalog/Nations.html");
}

function buildPayload(formValue) {
    const formClone = { ...formValue }
    return formClone
}

let tenDanToc = null
function fetchDanToc(id) {
    setLoading(true)
    idDanToc = id
    $.ajax({
        url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/DanhMucDanToc/getDanhMucDanTocById/' + id,
        method: 'GET',
        success: function (data) {

            // setFormValue('editTeam', data, 'fetch');
            setFormValue('editNation', data)
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

async function handleCreate() {
    await showConfirm("Bạn có chắc chắn muốn thêm mới danh mục dân tộc ?")
    const valid = validateForm('editNation')
    if (!valid) return
    const formValue = getFormValues('editNation')
    const payload = buildPayload(formValue)
    setLoading(true)
    setTimeout(() => {
        $.ajax({
            url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/DanhMucDanToc/addDanhMucDanToc',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(payload),
            success: function (data) {
                showSuccess("Thêm thành công !")
                recordActivityAdmin(maNhanVien, `Thêm danh mục dân tộc: ${formValue.ten}`);
                closePopup()
                clearFormValues('editNation')
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


async function handleRemoveRow() {
    await showConfirm("Bạn có chắc chắn muốn xóa danh mục dân tộc ?")
    setLoading(true)
    setTimeout(() => {
        $.ajax({
            url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/DanhMucDanToc/removeDanToc?id=' + idDanToc,
            method: 'DELETE',
            success: function (data) {
                showSuccess("Xóa thành công !")
                recordActivityAdmin(maNhanVien, `Xóa danh mục dân tộc: ${oldValue}`);
                closePopup()
                clearFormValues('editNation')
                table.handleCallFetchData();
            },
            error: (err) => {
                console.log('fetchPhongBan err :: ', err);
                showError("Xóa thất bại!")
            },
            complete: () => {
                setLoading(false)
            }
        });
    }, 1000);
}
async function handleSave() {
    await showConfirm("Bạn có chắc chắn muốn sửa danh mục dân tộc ?")
    const valid = validateForm('editNation')
    if (!valid) return
    const formValue = getFormValues('editNation')
    formValue['id'] = idDanToc
    const payload = buildPayload(formValue)
    setLoading(true)
    setTimeout(() => {
        $.ajax({
            url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/DanhMucDanToc/updateDanToc',
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(payload),
            success: function (data) {
                showSuccess('Lưu Thành Công!')
                recordActivityAdmin(maNhanVien, `Sửa danh mục dân tộc: ${oldValue} => ${payload.ten} `);
                closePopup()
                clearFormValues('editNation')
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

function buildApiUrl() {
    return 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/DanhMucDanToc/getDanhMucDanToc'
}

function showPopup() {
    var modal = document.getElementById("editNation");
    modal.style.display = "block";
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            clearFormValues('editNation')
        }
    }
    var closeButton = modal.querySelector('.close');
    closeButton.onclick = function () {
        modal.style.display = "none";
        clearFormValues('editNation');
    }
    if (isPopupEdit) {
        const popupTitle = modal.querySelector('h2')
        popupTitle.textContent = "Sửa Tiêu Đề Dân Tộc"
        popupRemoveBtn.classList.remove('hidden')
        popupSaveBtn.classList.remove('hidden')
        popupSaveBtn.setAttribute('disabled', '');
        popupCreateBtn.classList.add('hidden')
    } else {
        const popupTitle = modal.querySelector('h2')
        popupTitle.textContent = "Thêm mới Tiêu Đề Dân Tộc"
        popupSaveBtn.classList.add('hidden')
        popupRemoveBtn.classList.add('hidden')
        popupCreateBtn.classList.remove('hidden')
    }
}
function checkValues() {
    const formValue = getFormValues('editNation');
    const newValue = formValue.ten;
    if (oldValue === newValue) {
        popupSaveBtn.setAttribute('disabled', '');
    } else {
        popupSaveBtn.removeAttribute('disabled');
    }
}
function closePopup() {
    var modal = document.getElementById("editNation");
    modal.style.display = "none"
}
document.addEventListener('DOMContentLoaded', () => {
    popupSaveBtn.addEventListener("click", () => {
        handleSave()
    })
    popupCreateBtn.addEventListener("click", handleCreate)
    popupRemoveBtn.addEventListener("click", handleRemoveRow)

    const inputTenDanToc = document.querySelector('base-input[name="ten"]');
    if (inputTenDanToc) {
        inputTenDanToc.addEventListener('input', checkValues);
    }
})

