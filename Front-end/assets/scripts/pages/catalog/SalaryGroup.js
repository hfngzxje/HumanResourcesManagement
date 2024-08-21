
let isPopupEdit = false
const popupCreateBtn = document.getElementById("createBtn")
const popupSaveBtn = document.getElementById("saveBtn")
const popupRemoveBtn = document.getElementById("removeBtn")
const popupClearBtn = document.getElementById("clearBtn")
const table = document.querySelector('base-table')
const maNhanVien = localStorage.getItem('maNhanVien')

let idNhomLuong = null
var oldValue = null
var oldNgachCongChuc = null
var oldBacLuong = null

var oldNgach = null
var oldBac = null
var oldHeSo = null
var oldLuong = null
var oldGhiChu = null

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
async function getNgachCongChucByID(idNgachCongChuc) {
    try {
        const response = await $.ajax({
            url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/NhanVien/getNgachCongChucById/' + idNgachCongChuc,
            method: 'GET',
            contentType: 'application/json'
        });
        return response.ten;
    } catch (error) {
        console.log("Error");
    }
}
async function fetchNhomLuong(id) {
    console.log("Name:", id);
    setLoading(true);
    idNhomLuong = id;
    let idNgach = null;

    try {
        const data = await $.ajax({
            url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/DanhMucNhomLuong/' + id,
            method: 'GET',
            contentType: 'application/json'
        });
        oldBacLuong = data.bacluong
        idNgach = data.ngachcongchuc;
        oldNgachCongChuc = await  getNgachCongChucByID(idNgach); 

        oldNgach = data.ngachcongchuc
        oldBac = data.bacluong
        oldHeSo = data.hesoluong
        oldLuong = data.luongcoban
        oldGhiChu = data.ghichu

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
                recordActivityAdmin(maNhanVien, `Thêm nhóm lương: Ngạch công chức=${formValue.ngachcongchuc}, Bậc lương=${formValue.bacluong}`)
                closePopup()
                clearFormValues('editNhomLuong')
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
                recordActivityAdmin(maNhanVien, `Xóa danh mục nhóm lương:Ngạch công chức = ${oldNgachCongChuc} , Bậc lương= ${oldBacLuong}`);
                closePopup()
                clearFormValues('editNhomLuong')
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
                recordActivityAdmin(maNhanVien, `Sửa danh mục nhóm lương:Ngạch công chức = ${oldNgachCongChuc} , Bậc lương= ${oldBacLuong}`);
                closePopup()
                clearFormValues('editNhomLuong')
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
            clearFormValues('editNhomLuong')
        }
    }

    var closeButton = modal.querySelector('.close');
    closeButton.onclick = function () {
        modal.style.display = "none";
        clearFormValues('editNhomLuong');
    }

    if (isPopupEdit) {
        const popupTitle = modal.querySelector('h2')
        popupTitle.textContent = "Sửa nhóm lương"
        popupRemoveBtn.classList.remove('hidden')
        popupSaveBtn.setAttribute('disabled', '');
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

function closePopup(){
    var modal = document.getElementById("editNhomLuong");
    modal.style.display="none"
}

function checkValues() {
    const formValue = getFormValues('editNhomLuong');
    const newNgach = formValue.ngachcongchuc;
    const newBac = formValue.bacluong
    const newHeSo = formValue.hesoluong
    const newLuong = formValue.luongcoban
    const newGhiChu = formValue.ghichu

    if (oldNgach === parseInt(newNgach) && oldBac === parseInt(newBac) && oldHeSo === parseFloat(newHeSo) && oldLuong === parseFloat(newLuong) && oldGhiChu === newGhiChu) {
        popupSaveBtn.setAttribute('disabled', '');
    } else {
        popupSaveBtn.removeAttribute('disabled');
    }
}

function buildApiUrl() {
    return 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/DanhMucNhomLuong/all'
}
document.addEventListener('DOMContentLoaded', () => {
    popupSaveBtn.addEventListener("click", () => {
        console.log('save click');
        handleSave()
    })
    popupCreateBtn.addEventListener("click", handleCreate)
    popupRemoveBtn.addEventListener("click", handleRemoveRow)
    popupClearBtn.addEventListener("click", clearFormValues('editNhomLuong'))


    const selectNgach = document.querySelector('base-select[name="ngachcongchuc"]');
    const selectBac = document.querySelector('base-select[name="bacluong"]');
    const inputHeSo = document.querySelector('base-input-number[name="hesoluong"]');
    const inputLuong = document.querySelector('base-input-number[name="luongcoban"]');
    const inputGhiChu = document.querySelector('base-textarea[name="ghichu"]');

    if (selectNgach) {
        selectNgach.addEventListener('change', checkValues);
    }
    if (selectBac) {
        selectBac.addEventListener('change', checkValues);
    }
    if (inputHeSo) {
        inputHeSo.addEventListener('input', checkValues);
    }
    if (inputLuong) {
        inputLuong.addEventListener('input', checkValues);
    }
    if (inputGhiChu) {
        inputGhiChu.addEventListener('input', checkValues);
    }
})