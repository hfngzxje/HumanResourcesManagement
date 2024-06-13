const isEdit = !!id
let Eid = null;
let temp = false
let isPopupEdit = false



let idTrinhDo = null

var TableColumns = [
    {
        label: 'ID',
        key: 'id'
    },
    {
        label: 'Tên Trình Độ',
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
                    fetchTrinhDo(row.id);
                    var modal = document.getElementById("editChuyenMon");
                    showPopup()
                }
            },
            { type: 'red', icon: 'bx bx-trash', label: 'Xóa', onClick: (row) => { handleRemoveRow(row.id) } }
        ]
    }
]

function backToList() {
    window.location.replace("/pages/catalog/qualifications.html");
}

function buildPayload(formValue) {
    const formClone = { ...formValue }
    return formClone
}

function fetchTrinhDo(id) {
    console.log("Name:", id);
    setLoading(true)
    idTrinhDo = id
    $.ajax({
        url: 'https://localhost:7141/api/TrinhDo/getTrinhDoById/' + id,
        method: 'GET',
        success: function (data) {
            setFormValue('editTrinhDo', data, 'fetch');
            setFormValue('editTrinhDo', data)
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
    const valid = validateForm('editTrinhDo')
    if (!valid) return
    const formValue = getFormValues('editTrinhDo')

    console.log('formValue ', formValue);
    const payload = buildPayload(formValue)
    setLoading(true)
    $.ajax({
        url: 'https://localhost:7141/api/TrinhDo/addTrinhDo',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(payload),
        success: function (data) {
            console.log('fetchTrinhDo res :: ', data);
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
        url: 'https://localhost:7141/api/TrinhDo/deleteTrinhDo/' + id,
        method: 'DELETE',
        success: function (data) {
            console.log('fetchTrinhDo res :: ', data);
            alert("Xóa thành công !")
            backToList()
        },
        error: (err) => {
            console.log('fetchTrinhDo err :: ', err);
            alert("Xóa thất bại!")
        },
        complete: () => {
            setLoading(false)
        }
    });
}
function handleSave() {
    const formValue = getFormValues('editTrinhDo')
    const payload = buildPayload(formValue)
    setLoading(true)
    console.log('maTo: ', idTrinhDo)
    $.ajax({
        url: 'https://localhost:7141/api/TrinhDo/updateTrinhDo/' + idTrinhDo,
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(payload),
        success: function (data) {
            console.log('fetchTrinhDo res :: ', data);
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
    const actionEl = document.getElementById('qualifications_form_action')
    const actionE2 = document.getElementById('editTrinhDo_Action');
    const actionE3 = document.getElementById('createTrinhDo_Action')
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
    return 'https://localhost:7141/api/TrinhDo/getTrinhDo'
}

function showPopup() {
    var modal = document.getElementById("editTrinhDo");
    modal.style.display = "block";
    window.onclick = function (event) {
        if (event.target == modal) {
            temp = false
            modal.style.display = "none";
            clearFormValues('editTrinhDo')
        }
    }
    if (isPopupEdit) {
        const popupTitle = modal.querySelector('h2')
        popupTitle.textContent = "Sửa Tiêu Đề Trình Độ"
    } else {
        const popupTitle = modal.querySelector('h2')
        popupTitle.textContent = "Thêm mới Tiêu Đề Trình Độ"
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderActionByStatus()
})

