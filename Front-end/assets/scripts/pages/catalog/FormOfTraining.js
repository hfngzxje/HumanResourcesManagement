let isPopupEdit = false
const popupCreateBtn = document.getElementById("createBtn")
const popupSaveBtn = document.getElementById("saveBtn")
const popupRemoveBtn = document.getElementById("removeBtn")
const table = document.querySelector('base-table')
const maNhanVien = localStorage.getItem('maNhanVien')
let idDaoTao = null
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
                    fetchDaoTao(row.id);
                    showPopup()
                }
            }
        ]
    }
]
var tableEvent = {

    rowDoubleClick: (row) => {

        isPopupEdit = true

        fetchDaoTao(row.id)
        showPopup()
        console.log('row double click ', row);
    }
};
function backToList() {
    window.location.replace("/pages/catalog/FormOfTraining.html");
}

function buildPayload(formValue) {
    const formClone = { ...formValue }
    return formClone
}
function fetchDaoTao(id) {
    setLoading(true)
    idDaoTao = id
    $.ajax({
        url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/DanhMucHinhThucDaoTao/getDanhMucHinhThucDaoTaoById/' + id,
        method: 'GET',
        success: function (data) {
            setFormValue('editDaoTao', data)
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
    await showConfirm("Bạn có chắc chắn muốn thêm danh mục hình thức đào tạo ?")
    const valid = validateForm('editDaoTao')
    if (!valid) return
    const formValue = getFormValues('editDaoTao')

    console.log('formValue ', formValue);
    const payload = buildPayload(formValue)
    setLoading(true)
    setTimeout(() => {
        $.ajax({
            url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/DanhMucHinhThucDaoTao/addDanhMucHinhThucDaoTao',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(payload),
            success: function (data) {
                console.log('fetchKhenThuong res :: ', data);
                showSuccess("Thêm thành công !")
                recordActivityAdmin(maNhanVien, `Thêm danh mục hình thức đào tạo: ${formValue.ten}`);
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
    await showConfirm("Bạn có chắc chắn muốn xóa danh mục hình thức đào tạo ?")
    setLoading(true)
    setTimeout(() => {
        $.ajax({
            url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/DanhMucHinhThucDaoTao/deleteDanhMucHinhThucDaoTao?id=' + idDaoTao,
            method: 'DELETE',
            success: function (data) {
                console.log('fetchKhenThuong res :: ', data);
                showSuccess("Xóa thành công !")
                recordActivityAdmin(maNhanVien, `Xóa danh mục hình thức đào tạo: ${oldValue}`);
                closePopup()
                clearFormValues()
                table.handleCallFetchData();
            },
            error: (err) => {
                console.log('fetchKhenThuong err :: ', err);
                showError("Xóa thất bại!")
            },
            complete: () => {
                setLoading(false)
            }
        });
    }, 1000);
}
async function handleSave() {
    await showConfirm("Bạn có chắc chắn muốn sửa danh mục hình thức đào tạo ?")
    const valid = validateForm('editDaoTao')
    if (!valid) return
    const formValue = getFormValues('editDaoTao')
    formValue['id'] = idDaoTao
    const payload = buildPayload(formValue)
    setLoading(true)
    setTimeout(() => {
        $.ajax({
            url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/DanhMucHinhThucDaoTao/updateDanhMucHinhThucDaoTao?id='+idDaoTao,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(payload),
            success: function (data) {
                console.log('fetchKhenThuong res :: ', data);
                showSuccess('Lưu Thành Công!');
                recordActivityAdmin(maNhanVien, `Sửa danh mục đào tạo: ${oldValue} => ${payload.ten} `);
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
    const form = document.getElementById('editDaoTao');
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
    return 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/DanhMucHinhThucDaoTao/getDanhMucHinhThucDaoTao'
}

function showPopup() {
    var modal = document.getElementById("editDaoTao");
    modal.style.display = "block";
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            setFormValue('editDaoTao', { ten: "" })
        }
    }

    var closeButton = modal.querySelector('.close');
    closeButton.onclick = function () {
        modal.style.display = "none";
        clearFormValues();
    }

    if (isPopupEdit) {
        const popupTitle = modal.querySelector('h2')
        popupTitle.textContent = "Sửa Tiêu Đề Hình Thức Đào Tạo"
        popupRemoveBtn.classList.remove('hidden')
        popupSaveBtn.classList.remove('hidden')
        popupSaveBtn.setAttribute('disabled','');
        popupCreateBtn.classList.add('hidden')
    } else {
        const popupTitle = modal.querySelector('h2')
        popupTitle.textContent = "Thêm mới Tiêu Đề Hình Thức Đào Tạo"
        popupSaveBtn.classList.add('hidden')
        popupRemoveBtn.classList.add('hidden')
        popupCreateBtn.classList.remove('hidden')
    }
}
function checkValues() {
    const formValue = getFormValues('editDaoTao');
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
    var modal = document.getElementById("editDaoTao");
    modal.style.display = "none"
}
document.addEventListener('DOMContentLoaded', () => {
    popupSaveBtn.addEventListener("click", () => {
        console.log('save click');
        handleSave()
    })
    popupCreateBtn.addEventListener("click", handleCreate)
    popupRemoveBtn.addEventListener("click", handleRemoveRow)

    
    const inputTenHinhThucDaoTao = document.querySelector('base-input[name="ten"]');
    if (inputTenHinhThucDaoTao) {
        inputTenHinhThucDaoTao.addEventListener('input', checkValues);
    }
})

