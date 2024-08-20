let isPopupEdit = false
const popupCreateBtn = document.getElementById("createBtn")
const popupSaveBtn = document.getElementById("saveBtn")
const popupRemoveBtn = document.getElementById("removeBtn")
const table = document.querySelector('base-table')
const maNhanVien = localStorage.getItem('maNhanVien')

var oldValue = null;

let idChuyenMon = null

var TableColumns = [
    {
        label: 'ID',
        key: 'id',
        type: 'disabled'
    },
    {
        label: 'Mã Chuyên Môn',
        key: 'ma'
    },
    {
        label: 'Tên Chuyên Môn',
        key: 'ten'
    },
    {
        label: 'Hành động',
        key: 'action',
        actions: [
            {
                type: 'plain', icon: 'bx bx-save', label: 'Sửa', onClick: (row) => {
                    isPopupEdit = true
                    fetchChuyenMon(row.id);
                    showPopup()
                }
            }
        ]
    }
]
var tableEvent = {

    rowDoubleClick: (row) => {

        isPopupEdit = true

        fetchChuyenMon(row.id)
        showPopup()
        console.log('row double click ', row);
    }
};
function backToList() {
    window.location.replace("/pages/catalog/specializations.html");
}

function buildPayload(formValue) {
    const formClone = { ...formValue }
    return formClone
}
function fetchChuyenMon(id) {
    console.log("Name:", id);
    setLoading(true)
    idChuyenMon = id
    $.ajax({
        url: 'https://localhost:7141/api/ChuyenMon/getChuyenMonById/' + id,
        method: 'GET',
        success: function (data) {
            // setFormValue('editChuyenMon', data, 'fetch');
            setFormValue('editChuyenMon', data)
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
    await showConfirm("Bạn có chắc chắn muốn thêm danh mục chuyên môn ?")
    const valid = validateForm('editChuyenMon')
    if (!valid) return
    const formValue = getFormValues('editChuyenMon')

    console.log('formValue ', formValue);
    const payload = buildPayload(formValue)
    setLoading(true)
    setTimeout(() => {
        $.ajax({
            url: 'https://localhost:7141/api/ChuyenMon/addChuyenMon',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(payload),
            success: function (data) {
                console.log('fetchChuyenMon res :: ', data);
                showSuccess("Thêm thành công !")
                recordActivityAdmin(maNhanVien, `Thêm danh mục chuyên môn: ${formValue.ten}`);
                closePopup()
                clearFormValues('editChuyenMon')
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
    await showConfirm("Bạn có chắc chắn muốn xóa danh mục chuyên môn ?")
    setLoading(true)
    setTimeout(() => {
        $.ajax({
            url: 'https://localhost:7141/api/ChuyenMon/deleteChuyenMon/' + idChuyenMon,
            method: 'DELETE',
            success: function (data) {
                console.log('fetchChuyenMon res :: ', data);
                showSuccess("Xóa thành công !")
                recordActivityAdmin(maNhanVien, `Xóa danh mục chuyên môn: ${oldValue}`);
                closePopup()
                clearFormValues('editChuyenMon')
                table.handleCallFetchData();
            },
            error: (err) => {
                console.log('fetchChuyenMon err :: ', err);
                showError("Xóa thất bại!")
            },
            complete: () => {
                setLoading(false)
            }
        });
    }, 1000);
}
async function handleSave() {
    await showConfirm("Bạn có chắc chắn muốn sửa danh mục chuyên môn ?")
    const valid = validateForm('editChuyenMon')
    if (!valid) return
    const formValue = getFormValues('editChuyenMon')
    const payload = buildPayload(formValue)
    console.log("Ten Truong: " + payload["ten"])
    setLoading(true)
    console.log('maTo: ', idChuyenMon)
    setTimeout(() => {
        $.ajax({
            url: 'https://localhost:7141/api/ChuyenMon/updateChuyenMon/' + idChuyenMon,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(payload),
            success: function (data) {
                console.log('fetchChuyenMon res :: ', data);
                showSuccess('Lưu Thành Công!')
                recordActivityAdmin(maNhanVien, `Sửa danh mục chuyên môn: ${oldValue} => ${payload.ten} `);
                closePopup()
                clearFormValues('editChuyenMon')
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
    return 'https://localhost:7141/api/ChuyenMon/getChuyenMon'
}

function showPopup() {
    var modal = document.getElementById("editChuyenMon");
    modal.style.display = "block";
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            setFormValue('editChuyenMon', { ma: "", ten: "" })
        }
    }
    var closeButton = modal.querySelector('.close');
    closeButton.onclick = function () {
        modal.style.display = "none";
        clearFormValues('editChuyenMon');
    }
    if (isPopupEdit) {
        const popupTitle = modal.querySelector('h2')
        popupTitle.textContent = "Sửa Tiêu Đề Chuyên Môn"
        popupRemoveBtn.classList.remove('hidden')
        popupSaveBtn.classList.remove('hidden')
        popupSaveBtn.setAttribute('disabled','');
        popupCreateBtn.classList.add('hidden')
    } else {
        const popupTitle = modal.querySelector('h2')
        popupTitle.textContent = "Thêm mới Tiêu Chuyên Môn"
        popupSaveBtn.classList.add('hidden')
        popupRemoveBtn.classList.add('hidden')
        popupCreateBtn.classList.remove('hidden')
    }
}


function checkValues() {
    const formValue = getFormValues('editChuyenMon');
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
    var modal = document.getElementById("editChuyenMon");
    modal.style.display = "none"
}
document.addEventListener('DOMContentLoaded', () => {
    popupSaveBtn.addEventListener("click", () => {
        console.log('save click');
        handleSave()
    })
    popupCreateBtn.addEventListener("click", handleCreate)
    popupRemoveBtn.addEventListener("click", handleRemoveRow)

    const inputTenChuyenMon = document.querySelector('base-input[name="ten"]');
    if (inputTenChuyenMon) {
        inputTenChuyenMon.addEventListener('input', checkValues);
    }
})

