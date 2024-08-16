
let isPopupEdit = false
const popupCreateBtn = document.getElementById("createBtn")
const popupSaveBtn = document.getElementById("saveBtn")
const popupRemoveBtn = document.getElementById("removeBtn")
const popupClearBtn = document.getElementById("clearBtn")
const table = document.querySelector('base-table')
const maNhanVien = localStorage.getItem('maNhanVien')

let idNhomLuong = null
var oldValue = null
var oldChucDanh = null
var oldBacLuong = null

var MaritalOptions = [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 },
    { label: '6', value: 6 },
    { label: '7', value: 7 },
    { label: '8', value: 8 },
    { label: '9', value: 9 }
]

var TableColumns = [
    {
        label: 'Nhóm lương',
        key: 'nhomluong',
        type: 'disabled'
    }
    ,
    {
        label: 'Nhóm ngạch công chức',
        key: 'tenNgachCongChuc'
    }
    ,
    {
        label: 'Bậc lương',
        key: 'bacluong'
    }
    ,
    {
        label: 'Hệ số lương',
        key: 'hesoluong'
    },
    {
        label: 'Lương cơ bản',
        key: 'luongcoban',
        type:'currency'
    }
    ,
    {
        label: 'Ghi chú',
        key: 'ghichu'
    },
    {
        label: 'Hành động',
        key: 'action',
        actions: [
            {
                type: 'plain', icon: 'bx bx-save', label: 'Sửa', onClick: (row) => {
                    isPopupEdit = true
                    fetchNhomLuong(row.nhomluong)
                    showPopup()
                }
            }
        ]
    } 
]

var tableEvent = {
    
    rowDoubleClick: (row) => {
        isPopupEdit = true
        fetchNhomLuong(row.nhomluong)
        showPopup()
        console.log('row double click ',row);
    }
};

function buildPayload(formValue) {
    const formClone = { ...formValue }
    return formClone
}
async function getChucDanhByID(idChucDanh) {
    try {
        const chucDanh = await $.ajax({
            url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/ChucDanh/getChucDanhById/' + idChucDanh,
            method: 'GET',
            contentType: 'application/json'
        });
        // oldChucDanh = chucDanh.ten; 
        return chucDanh.ten;
    } catch (error) {
        console.log("Error");
    }
}
async function fetchNhomLuong(id) {
    console.log("Name:", id);
    setLoading(true);
    idNhomLuong = id;
    let idChucDanh = null;

    try {
        const data = await $.ajax({
            url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/DanhMucNhomLuong/' + id,
            method: 'GET',
            contentType: 'application/json'
        });
        oldBacLuong = data.bacluong
        idChucDanh = data.chucdanh;
        oldChucDanh = await  getChucDanhByID(idChucDanh); // 
        setFormValue('editNhomLuong', data);
    } catch (err) {
        console.log('fetchDepartments err :: ', err);
    } finally {
        setLoading(false);
    }
}
   

async function handleCreate() {
    await showConfirm("Bạn có chắc chắn muốn thêm danh mục nhóm lương ?")
    const valid = validateForm('editNhomLuong')
    if (!valid) return
    const formValue = getFormValues('editNhomLuong')
    console.log('formValue ', formValue);
    const payload = buildPayload(formValue)
    setLoading(true)
    setTimeout(() => {
        $.ajax({
            url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/DanhMucNhomLuong/add',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(payload),
            success: function (data) {
                console.log('fetch Nhóm Lương res :: ', data);
                showSuccess("Thêm thành công !")
                recordActivityAdmin(maNhanVien, `Thêm nhóm lương: Chức danh=${formValue.chucdanh}, Bậc lương=${formValue.bacluong}`)
                closePopup()
                clearFormValues()
                table.handleCallFetchData();
            },
            error: (err) => {
                console.log('err ', err);
                try {
                    if (!err.responseJSON) {
                        showError(err.responseText)
                        // $('.error-message').text(err.responseText).show();
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
    await showConfirm("Bạn có chắc chắn muốn xóa danh mục nhóm lương ?")
    setLoading(true)
    setTimeout(() => {
        $.ajax({
            url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/DanhMucNhomLuong/delete/' + idNhomLuong,
            method: 'DELETE',
            success: function (data) {
                showSuccess("Xóa thành công !")
                recordActivityAdmin(maNhanVien, `Xóa danh mục nhóm lương:Chức danh = ${oldChucDanh} , Bậc lương= ${oldBacLuong}`);
                closePopup()
                clearFormValues()
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
    await showConfirm("Bạn có chắc chắn muốn sửa danh mục nhóm lương ?")
    const valid = validateForm('editNhomLuong')
    if (!valid) return
    const formValue = getFormValues('editNhomLuong')
    const payload = buildPayload(formValue)
    setLoading(true)
    setTimeout(() => {
        $.ajax({
            url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/DanhMucNhomLuong/update/' + idNhomLuong,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(payload),
            success: function (data) {
                showSuccess('Lưu Thành Công!');
                recordActivityAdmin(maNhanVien, `Sửa danh mục nhóm lương:Chức danh = ${oldChucDanh} , Bậc lương= ${oldBacLuong}`);
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

function showPopup() {
    var modal = document.getElementById("editNhomLuong");
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
        popupTitle.textContent = "Sửa nhóm lương"
        popupRemoveBtn.classList.remove('hidden')
        popupSaveBtn.classList.remove('hidden') 
        popupCreateBtn.classList.add('hidden') 
        popupClearBtn.classList.add('hidden')
    } else {
        const popupTitle = modal.querySelector('h2')
        popupTitle.textContent = "Thêm mới nhóm lương"
        popupSaveBtn.classList.add('hidden') 
        popupRemoveBtn.classList.add('hidden')
        popupCreateBtn.classList.remove('hidden') 
        popupClearBtn.classList.remove('hidden')
    }
}
function clearFormValues() {
    const form = document.getElementById('editNhomLuong');
    const inputs = form.querySelectorAll('input, textarea');

    inputs.forEach(input => {
        if (input.type === 'checkbox') {
            input.checked = false;
        } else {
            input.value = '';
        }
    });
}
function closePopup(){
    var modal = document.getElementById("editNhomLuong");
    modal.style.display="none"
}
// function renderActionByStatus() {
//     const actionEl = document.getElementById('salary_form_action')
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
    return 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/DanhMucNhomLuong/all'
}
document.addEventListener('DOMContentLoaded', () => {
    // renderActionByStatus()
    popupSaveBtn.addEventListener("click", () => {
        console.log('save click');
        handleSave()
    })
    popupCreateBtn.addEventListener("click", handleCreate)
    popupRemoveBtn.addEventListener("click", handleRemoveRow)
    popupClearBtn.addEventListener("click", clearFormValues)
})