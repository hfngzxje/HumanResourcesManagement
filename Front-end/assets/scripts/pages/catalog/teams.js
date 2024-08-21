
let isPopupEdit = false
const popupCreateBtn = document.getElementById("createBtn")
const popupSaveBtn = document.getElementById("saveBtn")
const popupRemoveBtn = document.getElementById("removeBtn")
const table = document.querySelector('base-table')
const maNhanVien = localStorage.getItem('maNhanVien')
var oldValue = null;

let idToHienTai = null

var oldTen = null
var oldPhong = null

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
        label: 'Tên phòng',
        key: 'tenPhong'
    },
    {
        label: 'Hành động',
        key: 'action',
        actions: [
            {
                type: 'plain', icon: 'bx bx-save', label: 'Sửa', onClick: (row) => {
                    isPopupEdit = true
                    fetchTo(row.id);
                    showPopup()
                }
            }
        ]
    }
]
var tableEvent = {

    rowDoubleClick: (row) => {

        isPopupEdit = true

        fetchTo(row.id)
        showPopup()
        console.log('row double click ', row);
    }
};
function backToList() {
    window.location.replace("/pages/catalog/teams.html");
}

function buildPayload(formValue) {
    const formClone = { ...formValue }
    return formClone
}

function fetchTo(id) {
    setLoading(true)
    idToHienTai = id
    $.ajax({
        url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/DanhMucTo/getDanhMucToById/' + id,
        method: 'GET',
        success: function (data) {

            // setFormValue('editTeam', data, 'fetch');
            setFormValue('editTeam', data)
            oldValue = data.ten
            oldTen = data.ten
            oldPhong = data.idphong
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
    await showConfirm("Bạn có chắc chắn muốn thêm danh mục tổ ?")
    const valid = validateForm('editTeam')
    if (!valid) return
    const formValue = getFormValues('editTeam')

    console.log('formValue ', formValue);
    const payload = buildPayload(formValue)
    setLoading(true)
    setTimeout(() => {
        $.ajax({
            url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/DanhMucTo/addDanhMucTo',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(payload),
            success: function (data) {
                console.log('fetchEmployee res :: ', data);
                showSuccess("Thêm thành công !")
                recordActivityAdmin(maNhanVien, `Thêm danh mục tổ: ${formValue.ten}`);
                closePopup()
                clearFormValues('editTeam')
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
    await showConfirm("Bạn có chắc chắn muốn xóa danh mục tổ ?")
    setLoading(true)
    setTimeout(() => {
        $.ajax({
            url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/DanhMucTo/deleteDanhMucTo/' + idToHienTai,
            method: 'DELETE',
            success: function (data) {
                console.log('fetchPhongBan res :: ', data);
                showSuccess("Xóa thành công !")
                recordActivityAdmin(maNhanVien, `Xóa danh mục tổ: ${oldValue}`);
                closePopup()
                clearFormValues('editTeam')
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
    await showConfirm("Bạn có chắc chắn muốn sửa danh mục tổ ?")
    const valid = validateForm('editTeam')
    if (!valid) return
    const formValue = getFormValues('editTeam')
    const payload = buildPayload(formValue)
    console.log('payload ', payload);
    setLoading(true)
    setTimeout(() => {
        $.ajax({
            url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/DanhMucTo/updateDanhMucTo/' + idToHienTai,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(payload),
            success: function (data) {
                console.log('fetchLanguage res :: ', data);
                showSuccess('Lưu Thành Công!')
                recordActivityAdmin(maNhanVien, `Sửa danh mục tổ: ${oldValue} => ${payload.ten} `);
                closePopup()
                clearFormValues('editTeam')
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
    return 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/DanhMucTo/getDanhMucTo'
}

function showPopup() {
    var modal = document.getElementById("editTeam");
    modal.style.display = "block";
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            clearFormValues('editTeam');
        }
    }

    var closeButton = modal.querySelector('.close');
    closeButton.onclick = function () {
        modal.style.display = "none";
        clearFormValues('editTeam');
    }

    if (isPopupEdit) {
        const popupTitle = modal.querySelector('h2')
        popupTitle.textContent = "Sửa Tiêu Đề Tổ"
        popupRemoveBtn.classList.remove('hidden')
        popupSaveBtn.classList.remove('hidden')
        popupSaveBtn.setAttribute('disabled', '');
        popupCreateBtn.classList.add('hidden')
    } else {
        const popupTitle = modal.querySelector('h2')
        popupTitle.textContent = "Thêm mới Tiêu Đề Tổ"
        popupSaveBtn.classList.add('hidden')
        popupRemoveBtn.classList.add('hidden')
        popupCreateBtn.classList.remove('hidden')
    }
}
function checkValues() {
    const formValue = getFormValues('editTeam');
    const newTen = formValue.ten;
    const newPhong = formValue.idphong

    // console.log('Type of oldTen:',  oldTen);
    // console.log('Type of oldPhong:',  oldPhong);
    // console.log('Type of newTen:',  newTen);
    // console.log('Type of newPhong:',  newPhong);

    if (oldTen === newTen && oldPhong === parseInt(newPhong)) {
        popupSaveBtn.setAttribute('disabled', '');
    } else {
        popupSaveBtn.removeAttribute('disabled');
    }
}
function closePopup() {
    var modal = document.getElementById("editTeam");
    modal.style.display = "none"
}
document.addEventListener('DOMContentLoaded', () => {
    popupSaveBtn.addEventListener("click", () => {
        console.log('save click');
        handleSave()
    })
    popupCreateBtn.addEventListener("click", handleCreate)
    popupRemoveBtn.addEventListener("click", handleRemoveRow)

    const inputTen = document.querySelector('base-input[name="ten"]');
    const inputPhong = document.querySelector('base-select[name="idphong"]');

    if (inputTen) {
        inputTen.addEventListener('input', checkValues);
    }
    if (inputPhong) {
        inputPhong.addEventListener('change', checkValues);
    }
})

