let isPopupEdit = false
const popupCreateBtn = document.getElementById("createBtn")
const popupSaveBtn = document.getElementById("saveBtn")
const popupRemoveBtn = document.getElementById("removeBtn")
// const popupClearBtn = document.getElementById("clearBtn")
const table = document.querySelector('base-table')

let idKhenThuong = null
var oldValue = null;

var TableColumns = [
    {
        label: 'ID',
        key: 'id'
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
        console.log('row double click ', row);
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

function handleCreate() {
    const isConfirm = confirm('Bạn chắc chắn muốn thêm danh mục khen thưởng - kỷ luật?')
    if (!isConfirm) return
    const valid = validateForm('editKhenThuong')
    if (!valid) return
    const formValue = getFormValues('editKhenThuong')

    console.log('formValue ', formValue);
    const payload = buildPayload(formValue)
    setLoading(true)
    setTimeout(() => {
        $.ajax({
            url: 'https://localhost:7141/api/DanhMucKhenThuongKyLuat/addDanhMucKhenThuongKyLuat',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(payload),
            success: function (data) {
                console.log('fetchKhenThuong res :: ', data);
                alert("Thêm thành công !")
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
    const isConfirm = confirm('Bạn chắc chắn muốn xóa danh mục khen thưởng - kỷ luật?')
    if (!isConfirm) return
    setLoading(true)
    setTimeout(() => {
        $.ajax({
            url: 'https://localhost:7141/api/DanhMucKhenThuongKyLuat/deleteDanhMucKhenThuongKyLuat/' + idKhenThuong,
            method: 'DELETE',
            success: function (data) {
                console.log('fetchKhenThuong res :: ', data);
                alert("Xóa thành công !")
                closePopup()
                clearFormValues()
                table.handleCallFetchData();
            },
            error: (err) => {
                console.log('fetchKhenThuong err :: ', err);
                alert("Xóa thất bại!")
            },
            complete: () => {
                setLoading(false)
            }
        });
    }, 1000);
}
function handleSave() {
    const isConfirm = confirm('Bạn chắc chắn muốn sửa danh mục khen thưởng - kỷ luật?')
    if (!isConfirm) return
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
                console.log('fetchKhenThuong res :: ', data);
                alert('Lưu Thành Công!');
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
    const form = document.getElementById('editKhenThuong');
    const inputs = form.querySelectorAll('input, textarea');

    inputs.forEach(input => {
        if (input.type === 'checkbox') {
            input.checked = false;
        } else {
            input.value = '';
        }
    });
}

// function renderActionByStatus() {
//     const actionEl = document.getElementById('award_form_action')
//     const buildButton = (label, type, icon) => {
//         const btnEl = document.createElement('base-button')
//         btnEl.setAttribute('label', label)
//         btnEl.setAttribute('type', type)
//         btnEl.setAttribute('icon', icon)

//         return btnEl
//     }
//     const createBtn = buildButton('Thêm', 'green', 'bx bx-plus')
//     createBtn.addEventListener('click', function () {
//         isPopupEdit = false
//         showPopup()
//     });
//     actionEl.append(createBtn)
// }

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

    console.log('isPopupEdit ', isPopupEdit);

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
    var modal = document.getElementById("editKhenThuong");
    modal.style.display = "none"
}
document.addEventListener('DOMContentLoaded', () => {
    // renderActionByStatus()
    popupSaveBtn.addEventListener("click", () => {
        console.log('save click');
        handleSave()
    })
    popupCreateBtn.addEventListener("click", handleCreate)
    popupRemoveBtn.addEventListener("click", handleRemoveRow)
    // popupClearBtn.addEventListener("click", clearFormValues)
    const inputTenKhenThuong = document.querySelector('base-input[name="ten"]');
    if (inputTenKhenThuong) {
        inputTenKhenThuong.addEventListener('input', checkValues);
    }
})

