const isEdit = !!id

let idChucDanh = null


var TableColumns = [
    {
        label: 'ID',
        key: 'id'
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
        key: 'phucap'
    },
    {
        label: 'Hành động',
        key: 'action',
        actions: [
            { type: 'plain', icon: 'bx bx-show', label: 'Chi tiết', onClick: (row) => { fetchTonGiao(row.id) } },
            { type: 'red', icon: 'bx bx-trash', label: 'Xóa', onClick: (row) => { handleRemoveRow(row.id) } }
        ]
    }
]

function backToList() {
    window.location.replace("/Front-end/pages/catalog/JobTittle.html");
}

function buildPayload(formValue) {
    const formClone = { ...formValue }
    formClone['id'] = idChucDanh
    return formClone
}

function fetchTonGiao(id) {
    console.log("Name:", id);
    setLoading(true)
    idChucDanh = id
    $.ajax({
        url: 'https://localhost:7141/api/ChucDanh/getChucDanhById/' + id,
        method: 'GET',
        success: function (data) {
            setFormValue('religions_form', data)
        },
        error: (err) => {
            console.log('fetchReligion err :: ', err);
        },
        complete: () => {
            setLoading(false)
        }
    });
}

function handleCreate() {
    const valid = validateForm('religions_form')
    if (!valid) return
    const formValue = getFormValues('religions_form')

    console.log('formValue ', formValue);
    const payload = buildPayload(formValue)
    setLoading(true)
    $.ajax({
        url: 'https://localhost:7141/api/ChucDanh/addChucDanh',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(payload),
        success: function (data) {
            console.log('fetchReligion res :: ', data);
            alert('Tạo Mới Danh Mục Chức Danh Thành Công!');
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
        url: 'https://localhost:7141/api/ChucDanh/removeChucDanh?id=' + id,
        method: 'DELETE',
        success: function (data) {
            console.log('fetchReligions res :: ', data);
            alert('Xóa Chức Danh Thành Công!');
            backToList()
        },
        error: (err) => {
            console.log('fetchReligions err :: ', err);
            alert("Xóa thất bại!")
        },
        complete: () => {
            setLoading(false)
        }
    });
}

function handleSave() {
    const formValue = getFormValues('religions_form')
    const payload = buildPayload(formValue)
    setLoading(true)
    $.ajax({
        url: 'https://localhost:7141/api/ChucDanh/updateChucDanh',
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(payload),
        success: function (data) {
            console.log('fetchEmployee res :: ', data);
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

function renderActionByStatus() {
    const actionEl = document.getElementById('religions_form_action')
    const buildButton = (label, type, icon) => {
        const btnEl = document.createElement('base-button')
        btnEl.setAttribute('label', label)
        btnEl.setAttribute('type', type)
        btnEl.setAttribute('icon', icon)
        return btnEl
    }
    const createBtn = buildButton('Thêm', 'green', 'bx bx-plus')
    const saveBtn = buildButton('Lưu', '', 'bx bx-save')

    createBtn.addEventListener('click', handleCreate)
    saveBtn.addEventListener('click', handleSave)

    actionEl.append(createBtn, saveBtn)
}

function buildApiUrl() {
    return 'https://localhost:7141/api/ChucDanh/getAllChucDanh'
}

document.addEventListener('DOMContentLoaded', () => {
    renderActionByStatus()
})

