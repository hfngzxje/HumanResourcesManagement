
let isPopupEdit = false
const popupCreateBtn = document.getElementById("createBtn")
const popupSaveBtn = document.getElementById("saveBtn")
const popupRemoveBtn = document.getElementById("removeBtn")
const table = document.querySelector('base-table')
const maNhanVien = localStorage.getItem('maNhanVien')

let idChucDanh = null
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
        label: 'Phụ cấp',
        key: 'phucap',
        type: 'currency'
    },
    {
        label: 'Hành động',
        key: 'action',
        actions: [
            {
                type: 'plain', icon: 'bx bx-save', label: 'Sửa', onClick: (row) => {
                    isPopupEdit = true
                    fetchNgachCongChuc(row.id);
                    showPopup()
                }
            }
        ]
    }
]

var tableEvent = {

    rowDoubleClick: (row) => {

        isPopupEdit = true

        fetchNgachCongChuc(row.id)
        showPopup()
        console.log('row double click ', row);
    }
};
function backToList() {
    window.location.replace("/pages/catalog/CivilServantRank.html");
}

function buildPayload(formValue) {
    const formClone = { ...formValue }
    return formClone
}
function fetchNgachCongChuc(id) {
    console.log("Name:", id);
    setLoading(true)
    idChucDanh = id
    $.ajax({
        url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/ChucDanh/getChucDanhById/' + id,
        method: 'GET',
        success: function (data) {

            // setFormValue('editTeam', data, 'fetch');
            setFormValue('editCivilServantRank', data)
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
    await showConfirm("Bạn có chắc chắn muốn thêm danh mục chức danh ?")
    const valid = validateForm('editCivilServantRank')
    if (!valid) return
    const formValue = getFormValues('editCivilServantRank')

    console.log('formValue ', formValue);
    const payload = buildPayload(formValue)
    setLoading(true)
    setTimeout(() => {
        $.ajax({
            url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/ChucDanh/addChucDanh',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(payload),
            success: function (data) {
                console.log('fetch ngạch công chức res :: ', data);
                showSuccess("Thêm thành công !")
                recordActivityAdmin(maNhanVien, `Thêm danh mục chức danh: ${formValue.ten}`);
                closePopup()
                clearFormValues()
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
    await showConfirm("Bạn có chắc chắn muốn xóa danh mục chức danh ?")
    setLoading(true)
    setTimeout(() => {
        $.ajax({
            url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/ChucDanh/removeChucDanh?id=' + idChucDanh,
            method: 'DELETE',
            success: function (data) {
                console.log('fetchPhongBan res :: ', data);
                showSuccess("Xóa thành công !")
                recordActivityAdmin(maNhanVien, `Xóa danh mục chức danh: ${oldValue}`);
                closePopup()
                clearFormValues()
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
    await showConfirm("Bạn có chắc chắn muốn sửa danh mục chức danh ?")
    const formValue = getFormValues('editCivilServantRank')
    const payload = buildPayload(formValue)
    console.log('payload ', payload);
    setLoading(true)
    setTimeout(() => {
        $.ajax({
            url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/ChucDanh/updateChucDanh?id=' + idChucDanh,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(payload),
            success: function (data) {
                console.log('fetchLanguage res :: ', data);
                showSuccess('Lưu Thành Công!')
                recordActivityAdmin(maNhanVien, `Sửa danh mục chức danh: ${oldValue} => ${payload.ten} `);
                closePopup()
                clearFormValues()
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

function clearFormValues() {
    const form = document.getElementById('editCivilServantRank');
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
    return 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/ChucDanh/getAllChucDanh'
}

function showPopup() {
    var modal = document.getElementById("editCivilServantRank");
    modal.style.display = "block";
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            clearFormValues()
        }
    }

    var closeButton = modal.querySelector('.close');
    closeButton.onclick = function () {
        modal.style.display = "none";
        clearFormValues();
    }

    if (isPopupEdit) {
        const popupTitle = modal.querySelector('h2')
        popupTitle.textContent = "Sửa Tiêu Đề Chức Danh"
        popupRemoveBtn.classList.remove('hidden')
        popupSaveBtn.classList.remove('hidden')
        popupCreateBtn.classList.add('hidden')
    } else {
        const popupTitle = modal.querySelector('h2')
        popupTitle.textContent = "Thêm mới Tiêu Đề Chức Danh"
        popupSaveBtn.classList.add('hidden')
        popupRemoveBtn.classList.add('hidden')
        popupCreateBtn.classList.remove('hidden')
    }
}
function closePopup() {
    var modal = document.getElementById("editCivilServantRank");
    modal.style.display = "none"
}

document.addEventListener('DOMContentLoaded', () => {
    popupSaveBtn.addEventListener("click", () => {
        console.log('save click');
        handleSave()
    })
    popupCreateBtn.addEventListener("click", handleCreate)
    popupRemoveBtn.addEventListener("click", handleRemoveRow)
})

