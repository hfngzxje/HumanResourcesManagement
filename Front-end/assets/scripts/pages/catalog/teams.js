const isEdit = !!id
let Eid = null;
let temp = false
let isPopupEdit = false


let idToHienTai = null

var TableColumns = [
    {
        label: 'ID',
        key: 'id'
    },
    {
        label: 'Mã',
        key: 'ma'    },
    {
        label: 'Tên',
        key: 'ten'
    },
    {
        label: 'Tên phòng',
        key: 'idphong'
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
                    fetchTo(row.id);
                    var modal = document.getElementById("editTeam");
                    showPopup()
                }
            },
            { type: 'red', icon: 'bx bx-trash', label: 'Xóa', onClick: (row) => { handleRemoveRow(row.id) } }
        ]
    }
]

function backToList() {
    window.location.replace("/pages/catalog/teams.html");
}

function buildPayload(formValue) {
    const formClone = { ...formValue }
    formClone['id'] = Eid
    return formClone
}

function fetchTo(id) {
    console.log("Name:", id);
    setLoading(true)
    idToHienTai = id
    $.ajax({
        url: 'https://localhost:7141/api/DanhMucTo/getDanhMucToById/' + id,
        method: 'GET',
        success: function (data) {
            setFormValue('editTeam', data, 'fetch');
            setFormValue('editTeam', data)
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
    const valid = validateForm('editTeam')
    if (!valid) return
    const formValue = getFormValues('editTeam')

    console.log('formValue ', formValue);
    const payload = buildPayload(formValue)
    setLoading(true)
    $.ajax({
        url: 'https://localhost:7141/api/DanhMucTo/addDanhMucTo',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(payload),
        success: function (data) {
            console.log('fetchEmployee res :: ', data);
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
        url: 'https://localhost:7141/api/DanhMucTo/deleteDanhMucTo/' + id,
        method: 'DELETE',
        success: function (data) {
            console.log('fetchPhongBan res :: ', data);
            alert("Xóa thành công !")
            backToList()
        },
        error: (err) => {
            console.log('fetchPhongBan err :: ', err);
            alert("Xóa thất bại!")
        },
        complete: () => {
            setLoading(false)
        }
    });
}
function handleSave() {
    const formValue = getFormValues('editTeam')
    const payload = buildPayload(formValue)
    setLoading(true)
    console.log('maTo: ', idToHienTai)
    $.ajax({
        url: 'https://localhost:7141/api/DanhMucTo/updateDanhMucTo/' + idToHienTai,
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(payload),
        success: function (data) {
            console.log('fetchLanguage res :: ', data);
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
    const actionEl = document.getElementById('teams_form_action')
    const actionE2 = document.getElementById('editTeam_Action');
    const actionE3 = document.getElementById('createTeam_Action')
    const buildButton = (label, type, icon) => {
        const btnEl = document.createElement('base-button')
        btnEl.setAttribute('label', label)
        btnEl.setAttribute('type', type)
        btnEl.setAttribute('icon', icon)

        const btnE2 = document.createElement('base-button')
        btnE2.setAttribute('label', label)
        btnE2.setAttribute('type', type)
        btnE2.setAttribute('icon', icon)

        const btnE3 = document.createElement('base-button')
        btnE3.setAttribute('label', label)
        btnE3.setAttribute('type', type)
        btnE3.setAttribute('icon', icon)
        return btnEl, btnE2, btnE3
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
    // if (temp) {
    //     // saveBtn.style.display = "none"
    //     saveCreateBtn.style.display = "block"
    // }
    // else {
    //     // saveBtn.style.display = "block"
    //     saveCreateBtn.style.display = "none"

    // }
    // -----------------------------------------------------------------------
    // ------------------------------------------------------------------------
}

function buildApiUrl() {
    return 'https://localhost:7141/api/DanhMucTo/getDanhMucTo'
}

function showPopup() {
    var modal = document.getElementById("editTeam");
    modal.style.display = "block";
    window.onclick = function (event) {
        if (event.target == modal) {
            temp = false
            modal.style.display = "none";
            clearFormValues('editTeam')
        }
    }
    if (isPopupEdit) {
        const popupTitle = modal.querySelector('h2')
        popupTitle.textContent = "Sửa Tiêu Đề Tổ"
    } else {
        const popupTitle = modal.querySelector('h2')
        popupTitle.textContent = "Thêm mới Tiêu Đề Tổ"
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderActionByStatus()
})

