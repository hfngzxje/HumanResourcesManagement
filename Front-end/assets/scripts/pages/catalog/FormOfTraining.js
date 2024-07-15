let isPopupEdit = false
const popupCreateBtn = document.getElementById("createBtn")
const popupSaveBtn = document.getElementById("saveBtn")
const popupRemoveBtn = document.getElementById("removeBtn")
const popupClearBtn = document.getElementById("clearBtn")


let idDaoTao = null

var TableColumns = [
    {
        label: 'ID',
        key: 'id'
    },
    {
        label: 'Tên ',
        key: 'ten'
    },
    // {
    //     label: 'Hành động',
    //     key: 'action',
    //     actions: [
    //         {
    //             type: 'plain', icon: 'bx bx-save', label: 'Sửa', onClick: (row) => {
    //                 isPopupEdit = true
    //                 fetchKhenThuong(row.id);
    //                 var modal = document.getElementById("editChuyenMon");
    //                 showPopup()
    //             }
    //         },
    //         { type: 'red', icon: 'bx bx-trash', label: 'Xóa', onClick: (row) => { handleRemoveRow(row.id) } }
    //     ]
    // }
]
var tableEvent = {
    
    rowDoubleClick: (row) => {
   
        isPopupEdit = true
       
        fetchDaoTao(row.id)
        showPopup()
        console.log('row double click ',row);
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
        url: 'https://localhost:7141/api/DanhMucHinhThucDaoTao/getDanhMucHinhThucDaoTaoById/' + id,
        method: 'GET',
        success: function (data) {
            setFormValue('editDaoTao', data)
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
    const isConfirm = confirm('Bạn chắc chắn muốn thêm danh mục hình thức đào tạo?')
    if (!isConfirm) return
    const valid = validateForm('editDaoTao')
    if (!valid) return
    const formValue = getFormValues('editDaoTao')

    console.log('formValue ', formValue);
    const payload = buildPayload(formValue)
    setLoading(true)
    $.ajax({
        url: 'https://localhost:7141/api/DanhMucHinhThucDaoTao/addDanhMucHinhThucDaoTao',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(payload),
        success: function (data) {
            console.log('fetchKhenThuong res :: ', data);
            alert("Thêm thành công !")
            backToList()
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
}

function handleRemoveRow() {
    const isConfirm = confirm('Bạn chắc chắn muốn xóa danh mục hình thức đào tạo?')
    if (!isConfirm) return
    setLoading(true)
    $.ajax({
        url: 'https://localhost:7141/api/DanhMucHinhThucDaoTao/deleteDanhMucHinhThucDaoTao?id=' + idDaoTao,
        method: 'DELETE',
        success: function (data) {
            console.log('fetchKhenThuong res :: ', data);
            alert("Xóa thành công !")
            backToList()
        },
        error: (err) => {
            console.log('fetchKhenThuong err :: ', err);
            alert("Xóa thất bại!")
        },
        complete: () => {
            setLoading(false)
        }
    });
}
function handleSave() {
    const isConfirm = confirm('Bạn chắc chắn muốn sửa danh mục hình thức đào tạo?')
    if (!isConfirm) return
    const valid = validateForm('editDaoTao')
    if(!valid) return
    const formValue = getFormValues('editDaoTao')
    formValue['id'] = idDaoTao
    const payload = buildPayload(formValue)
    setLoading(true)
    $.ajax({
        url: 'https://localhost:7141/api/DanhMucHinhThucDaoTao/updateDanhMucHinhThucDaoTao',
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(payload),
        success: function (data) {
            console.log('fetchKhenThuong res :: ', data);
            alert('Lưu Thành Công!');
            backToList();
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

function renderActionByStatus() {
    const actionEl = document.getElementById('DaoTao_form_action')
    const buildButton = (label, type, icon) => {
        const btnEl = document.createElement('base-button')
        btnEl.setAttribute('label', label)
        btnEl.setAttribute('type', type)
        btnEl.setAttribute('icon', icon)

        return btnEl
    }
    const createBtn = buildButton('Thêm', 'green', 'bx bx-plus')
    createBtn.addEventListener('click', function () {
        isPopupEdit = false
        showPopup()
    });
    actionEl.append(createBtn)
}

function buildApiUrl() {
    return 'https://localhost:7141/api/DanhMucHinhThucDaoTao/getDanhMucHinhThucDaoTao'
}

function showPopup() {
    var modal = document.getElementById("editDaoTao");
    modal.style.display = "block";
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            setFormValue('editDaoTao', {ten: "" })
        }
    }

    console.log('isPopupEdit ', isPopupEdit);

    if (isPopupEdit) {
        const popupTitle = modal.querySelector('h2')
        popupTitle.textContent = "Sửa Tiêu Đề Hình Thức Đào Tạo"
        popupRemoveBtn.classList.remove('hidden')
        popupSaveBtn.classList.remove('hidden') 
        popupCreateBtn.classList.add('hidden') 
        popupClearBtn.classList.add('hidden')
    } else {
        const popupTitle = modal.querySelector('h2')
        popupTitle.textContent = "Thêm mới Tiêu Đề Hình Thức Đào Tạo"
        popupSaveBtn.classList.add('hidden') 
        popupRemoveBtn.classList.add('hidden')
        popupCreateBtn.classList.remove('hidden') 
        popupClearBtn.classList.remove('hidden')
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderActionByStatus()
    popupSaveBtn.addEventListener("click", () => {
        console.log('save click');
        handleSave()
    })
    popupCreateBtn.addEventListener("click", handleCreate)
    popupRemoveBtn.addEventListener("click", handleRemoveRow)
    popupClearBtn.addEventListener("click", clearFormValues)
})

