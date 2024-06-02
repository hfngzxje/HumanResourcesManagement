const isEdit = !!id

var MaritalOptions = [
    { label: 'Đã kết hôn', value: 1 },
    { label: 'Chưa kết hôn', value: 0 },
]

function backToList() {
    window.location.replace("/pages/staff/list.html");
}

function buildPayload(formValue) {
    const formClone = {...formValue}
    formClone['gioitinh'] = formClone['gioitinh'] === '1'
    return formClone
}

function fetchEmployee() {
    setLoading(true)
    $.ajax({
        url: 'https://localhost:7141/api/NhanVien/id?id=' + id,
        method: 'GET',
        success: function(data) {
            setFormValue('resume_form', data)
        },
        error: (err) => {
            console.log('fetchEmployee err :: ', err);
        },
        complete: () => {
            setLoading(false)
        } 
    });
}

function handleCreate() {
    const valid = validateForm('resume_form')
    if(!valid) return
    const formValue = getFormValues('resume_form')
    const payload = buildPayload(formValue)
    setLoading(true)
    $.ajax({
        url: 'https://localhost:7141/api/NhanVien/TaoMoiNhanVien',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(payload),
        success: function(data) {
            console.log('fetchEmployee res :: ', data);
        },
        error: (err) => {
            console.log('handleCreate err :: ', err);
            alert("Tạo mới không thành công!")
        },
        complete: () => {
            setLoading(false)
        }
    });
}

function handleRemove() {
    const isConfirm = confirm('Xác nhận xóa')
    if (!isConfirm) return
    setLoading(true)
    $.ajax({
        url: 'https://localhost:7141/api/NhanVien/XoaNhanVien/' + id,
        method: 'DELETE',
        success: function(data) {
            console.log('fetchEmployee res :: ', data);
            backToList()
        },
        error: (err) => {
            console.log('fetchEmployee err :: ', err);
            alert("Xóa thất bại!")
        },
        complete: () => {
            setLoading(false)
        }
    });
}

function handleSave() {
    const valid = validateForm('resume_form')
    if(!valid) return
    
    const formValue = getFormValues('resume_form')
    const payload = buildPayload(formValue)
    setLoading(true)
    $.ajax({
        url: 'https://localhost:7141/api/NhanVien/ChinhSuaNhanVien/' + id,
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(payload),
        success: function(data) {
            console.log('fetchEmployee res :: ', data);
            backToList()
        },
        error: (err) => {
            console.log('fetchEmployee err :: ', err);
            alert("Cập nhật thất bại!")
        },
        complete: () => {
            setLoading(false)
        }
    });
}

function renderActionByStatus() {
    const actionEl = document.getElementById('resume_form_action')
    const buildButton = (label, type, icon) => {
        const btnEl = document.createElement('base-button')
        btnEl.setAttribute('label', label)
        btnEl.setAttribute('type', type)
        btnEl.setAttribute('icon', icon)
        return btnEl
    }
    if (!isEdit) {
        const createBtn = buildButton('Thêm', 'green', 'bx bx-plus')
        createBtn.addEventListener('click', handleCreate)
        actionEl.append(createBtn)
        return
    }

    const removeBtn = buildButton('Xóa', 'red', 'bx bx-trash')
    const saveBtn = buildButton('Lưu', '', 'bx bx-save')
    const exportBtn = buildButton('In', 'plain', 'bx bx-printer')

    removeBtn.addEventListener('click', handleRemove)
    saveBtn.addEventListener('click', handleSave)

    actionEl.append(removeBtn, saveBtn, exportBtn)
}

document.addEventListener('DOMContentLoaded', () => {
    renderActionByStatus()
    console.log('id ', id);
    if (id) {
        fetchEmployee()
    }
 

})

