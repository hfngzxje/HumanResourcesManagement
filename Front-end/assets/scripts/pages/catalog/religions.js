const isEdit = !!id
let Eid = null;
let temp = false
let isPopupEdit = false



let idTonGiao = null

var TableColumns = [
    {
        label: 'ID',
        key: 'id'
    },
    {
        label: 'Tên Tôn Giáo',
        key: 'ten'
    },
    {
        label: 'Hành động',
        key: 'action',
        actions: [
            {
                type: 'plain', icon: 'bx bx-save', label: 'Sửa', onClick: (row) => {
                    // temp = true
                    Eid = row.id
                    isPopupEdit = true
                    fetchTonGiao(row.id);
                    var modal = document.getElementById("editChuyenMon");
                    showPopup()
                }
            },
            { type: 'red', icon: 'bx bx-trash', label: 'Xóa', onClick: (row) => { handleRemoveRow(row.id) } }
        ]
    }
]

function backToList() {
    window.location.replace("/pages/catalog/religions.html");
}

function buildPayload(formValue) {
    const formClone = { ...formValue }
    formClone['id'] = idTonGiao
    return formClone
}

function fetchTonGiao(id) {
    console.log("Name:", id);
    setLoading(true)
    idTonGiao = id
    $.ajax({
        url: 'https://localhost:7141/api/DanhMucTonGiao/getDanhMucTonGiaoById/' + id,
        method: 'GET',
        success: function (data) {
            setFormValue('editTonGiao', data, 'fetch');
            setFormValue('editTonGiao', data)
        },
        error: (err) => {
            console.log('fetchDepartments err :: ', err);
        },
        complete: () => {
            setLoading(false)
        }
    });
}

function handleCreate() {
    const valid = validateForm('editTonGiao')
    if (!valid) return
    const formValue = getFormValues('editTonGiao')

    console.log('formValue ', formValue);
    const payload = buildPayload(formValue)
    setLoading(true)
    $.ajax({
        url: 'https://localhost:7141/api/DanhMucTonGiao/addDanhMucTonGiao',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(payload),
        success: function (data) {
            console.log('fetchTonGiao res :: ', data);
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

function handleRemoveRow(id) {
    
    const isConfirm = confirm('Xác nhận xóa')
    if (!isConfirm) return
    setLoading(true)
    $.ajax({
        url: 'https://localhost:7141/api/DanhMucTonGiao/removeTonGiao?id=' + id,
        method: 'DELETE',
        success: function (data) {
            console.log('fetchTonGiao res :: ', data);
            alert("Xóa thành công !")
            backToList()
        },
        error: (err) => {
            console.log('fetchTonGiao err :: ', err);
            alert("Xóa thất bại!")
        },
        complete: () => {
            setLoading(false)
        }
    });
}
function handleSave() {
    const valid = validateForm('editTonGiao')
    if(!valid) return
    const formValue = getFormValues('editTonGiao')
    formValue['id'] = idTonGiao
    const payload = buildPayload(formValue)
    setLoading(true)
    $.ajax({
        url: 'https://localhost:7141/api/DanhMucTonGiao/updateTonGiao',
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(payload),
        success: function (data) {
            console.log('fetchTonGiao res :: ', data);
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

function clearFormValues(formId) {
    const form = document.getElementById(formId);
    const inputs = form.querySelectorAll('input, textarea, select');

    inputs.forEach(input => {
        if (input.type === 'checkbox' || input.type === 'radio') {
            input.checked = false;
        } else {
            input.value = '';
        }
    });
}

function renderActionByStatus() {
    const actionEl = document.getElementById('religions_form_action')
    const actionE2 = document.getElementById('editTonGiao_Action');
    const actionE3 = document.getElementById('createTonGiao_Action')
    const buildButton = (label, type, icon) => {
        const btnEl = document.createElement('base-button')
        btnEl.setAttribute('label', label)
        btnEl.setAttribute('type', type)
        btnEl.setAttribute('icon', icon)

        return btnEl
    }
    const createBtn = buildButton('Thêm', 'green', 'bx bx-plus')
    const saveBtn = buildButton('Lưu', '', 'bx bx-save')
    const saveCreateBtn = buildButton('Thêm', '', 'bx bx-save')


    createBtn.addEventListener('click', function () {
        isPopupEdit = false
        temp = true
        saveBtn.style.display = "none";
        saveCreateBtn.style.display = "block";
        showPopup()
    });
    saveBtn.addEventListener('click', handleSave)
    saveCreateBtn.addEventListener('click', handleCreate)

    actionEl.append(createBtn)
    actionE2.append(saveBtn)
    actionE3.append(saveCreateBtn)


    saveBtn.style.display = 'none';
    saveCreateBtn.style.display = 'none';
    if (!temp) {
        saveBtn.style.display = 'block';
        saveCreateBtn.style.display = 'none';
    }
    // -----------------------------------------------------------------------
    // ------------------------------------------------------------------------
}

function buildApiUrl() {
    return 'https://localhost:7141/api/DanhMucTonGiao/getDanhMucTonGiao'
}

function showPopup() {
    var modal = document.getElementById("editTonGiao");
    modal.style.display = "block";
    window.onclick = function (event) {
        if (event.target == modal) {
            temp = false
            modal.style.display = "none";
            clearFormValues('editTonGiao')
        }
    }
    if (isPopupEdit) {
        const popupTitle = modal.querySelector('h2')
        popupTitle.textContent = "Sửa Tiêu Đề Tôn Giao"
    } else {
        const popupTitle = modal.querySelector('h2')
        popupTitle.textContent = "Thêm mới Tiêu Đề Tôn Giáo"
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderActionByStatus()
})

