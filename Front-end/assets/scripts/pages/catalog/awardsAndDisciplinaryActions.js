let isPopupEdit = false
const popupCreateBtn = document.getElementById("createBtn")
const popupSaveBtn = document.getElementById("saveBtn")
const popupRemoveBtn = document.getElementById("removeBtn")
const table = document.querySelector('base-table')
const maNhanVien = localStorage.getItem('maNhanVien')

let idKhenThuong = null
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
        label: 'Tên ',
        key: 'ten'
    },
    {
        label: 'Hành động',
        key: 'action',
        actions: [
            {
                type: 'plain', icon: 'bx bx-save', label: 'Sửa', onClick: (row) => {
                    isPopupEdit = true
                    fetchKhenThuong(row.id);
                    showPopup()
                }
            }
        ]
    }
]
var tableEvent = {

    rowDoubleClick: (row) => {

        isPopupEdit = true

        fetchKhenThuong(row.id)
        showPopup()
    }
};
function backToList() {
    window.location.replace("/pages/catalog/awardsAndDisciplinaryActions.html");
}

function buildPayload(formValue) {
    const formClone = { ...formValue }
    return formClone
}

function fetchKhenThuong(id) {
    setLoading(true)
    idKhenThuong = id
    $.ajax({
        url: 'https://localhost:7141/api/DanhMucKhenThuongKyLuat/getDanhMucKhenThuongKyLuatById/' + id,
        method: 'GET',
        success: function (data) {
            setFormValue('editKhenThuong', data, 'fetch');
            setFormValue('editKhenThuong', data)
            oldValue = data.ten
        },
        error: (err) => {
            console.log('fetchKhenThuong err :: ', err);
        },
        complete: () => {
            setLoading(false)
        }
    });
}

async function handleCreate() {
    await showConfirm("Bạn có chắc chắn muốn thêm danh mục khen thưởng - kỷ luật ?")
    const valid = validateForm('editKhenThuong')
    if (!valid) return
    const formValue = getFormValues('editKhenThuong')

    const payload = buildPayload(formValue)
    setLoading(true)
    setTimeout(() => {
        $.ajax({
            url: 'https://localhost:7141/api/DanhMucKhenThuongKyLuat/addDanhMucKhenThuongKyLuat',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(payload),
            success: function (data) {
                showSuccess("Thêm thành công !")
                recordActivityAdmin(maNhanVien, `Thêm danh mục khen thưởng: ${formValue.ten}`);
                closePopup()
                clearFormValues('editKhenThuong')
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
    await showConfirm("Bạn có chắc chắn muốn xóa danh mục khen thưởng kỷ luật ?")
    setLoading(true)
    setTimeout(() => {
        $.ajax({
            url: 'https://localhost:7141/api/DanhMucKhenThuongKyLuat/deleteDanhMucKhenThuongKyLuat/' + idKhenThuong,
            method: 'DELETE',
            success: function (data) {
                showSuccess("Xóa thành công !")
                recordActivityAdmin(maNhanVien, `Xóa danh mục khen thưởng: ${oldValue}`);
                closePopup()
                clearFormValues('editKhenThuong')
                table.handleCallFetchData();
            },
            error: (err) => {
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
    const valid = validateForm('editKhenThuong')
    if (!valid) return
    const formValue = getFormValues('editKhenThuong')
    formValue['id'] = idKhenThuong
    const payload = buildPayload(formValue)
    setLoading(true)
    setTimeout(() => {
        $.ajax({
            url: 'https://localhost:7141/api/DanhMucKhenThuongKyLuat/updateDanhMucKhenThuongKyLuat?id=' + idKhenThuong,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(payload),
            success: function (data) {
                showSuccess('Lưu Thành Công!')
                recordActivityAdmin(maNhanVien, `Sửa danh mục khen thưởng: ${oldValue} => ${payload.ten} `);
                closePopup()
                clearFormValues('editKhenThuong')
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
    return 'https://localhost:7141/api/DanhMucKhenThuongKyLuat/getDanhMucKhenThuongKyLuat'
}

function showPopup() {
    var modal = document.getElementById("editKhenThuong");
    modal.style.display = "block";
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            setFormValue('editKhenThuong', { ten: "" })
        }
    }
    var closeButton = modal.querySelector('.close');
    closeButton.onclick = function () {
        modal.style.display = "none";
        clearFormValues('editKhenThuong');
    }
    if (isPopupEdit) {
        const popupTitle = modal.querySelector('h2')
        popupTitle.textContent = "Sửa Tiêu Đề Khen Thưởng - Kỷ Luật"
        popupRemoveBtn.classList.remove('hidden')
        popupSaveBtn.classList.remove('hidden')
        popupSaveBtn.setAttribute('disabled','');
        popupCreateBtn.classList.add('hidden')
        // popupClearBtn.classList.add('hidden')
    } else {
        const popupTitle = modal.querySelector('h2')
        popupTitle.textContent = "Thêm mới Tiêu Đề Khen Thưởng - Kỷ Luật"
        popupSaveBtn.classList.add('hidden')
        popupRemoveBtn.classList.add('hidden')
        popupCreateBtn.classList.remove('hidden')
        // popupClearBtn.classList.remove('hidden')
    }
}
function checkValues() {
    const formValue = getFormValues('editKhenThuong');
    const newValue = formValue.ten;
    if (oldValue === newValue) {
        popupSaveBtn.setAttribute('disabled','');
    } else {
        popupSaveBtn.removeAttribute('disabled') ; 
    }
}
function closePopup() {
    var modal = document.getElementById("editKhenThuong");
    modal.style.display = "none"
}
document.addEventListener('DOMContentLoaded', () => {
    // renderActionByStatus()
    popupSaveBtn.addEventListener("click", () => {
        handleSave()
    })
    popupCreateBtn.addEventListener("click", handleCreate)
    popupRemoveBtn.addEventListener("click", handleRemoveRow)
    const inputTenKhenThuong = document.querySelector('base-input[name="ten"]');
    if (inputTenKhenThuong) {
        inputTenKhenThuong.addEventListener('input', checkValues);
    }
})

