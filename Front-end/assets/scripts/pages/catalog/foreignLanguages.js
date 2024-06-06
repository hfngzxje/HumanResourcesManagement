const isEdit = !!id

let idNgoaiNguHienTai = null

var MaritalOptions = [
    { label: 'Hợp đồng còn thời hạn', value: 1 },
    { label: 'Hợp đồng quá hạn', value: 0 },
];

var TableColumns = [
    {
      label: 'ID',
      key: 'id'
    },
    {
      label: 'Tên',
      key: 'ten'
    },
    {
      label: 'Hành động',
      key: 'action',
      actions: [
        { type: 'plain', icon: 'bx bx-show', label: 'Chi tiết', onClick: (row) => { fetchNgoaiNgu(row.id)} },
        { type: 'red', icon: 'bx bx-trash', label: 'Xóa', onClick: (row) => { handleRemoveRow(row.id) } }
      ]
    }
  ]

function backToList() {
    window.location.replace("/pages/catalog/foreignLanguages.html");
}

function buildPayload(formValue) {
    const formClone = {...formValue}
    return formClone
}

function fetchNgoaiNgu(id) {
    console.log(maChuyenMon);
    setLoading(true)
    idNgoaiNguHienTai = id
    $.ajax({
        
        url: 'https://localhost:7141/api/ChuyenMon/getChuyenMon',
        method: 'GET',
        success: function(data) {
            setFormValue('Language_form', data)
        },
        error: (err) => {
            console.log('fetchLanguage err :: ', err);
        },
        complete: () => {
            setLoading(false)
        }
    });
}

function handleCreate() {
    const valid = validateForm('Language_form')
    if(!valid) return
    const formValue = getFormValues('Language_form')

    console.log('formValue ', formValue);
    const payload = buildPayload(formValue)
    setLoading(true)
    $.ajax({
        url: 'https://localhost:7141/api/DanhMucNgoaiNgu/addDanhMucNgoaiNgu',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(payload),
        success: function(data) {
            console.log('fetchLanguage res :: ', data);
            // backToList()
        },
        error: (err) => {
            console.log('err ', err);
            try {
                if(!err.responseJSON) {
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

function handleRemove() {
    const isConfirm = confirm('Xác nhận xóa')
    if (!isConfirm) return
    setLoading(true)
    $.ajax({
        url: 'https://localhost:7141/api/DanhMucNgoaiNgu/deleteDanhMucNgoaiNgu/' + idNgoaiNguHienTai,
        method: 'DELETE',
        success: function(data) {
            console.log('fetchLanguage res :: ', data);
            backToList()
        },
        error: (err) => {
            console.log('fetchLanguage err :: ', err);
            alert("Xóa thất bại!")
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
        url: 'https://localhost:7141/api/DanhMucNgoaiNgu/deleteDanhMucNgoaiNgu/' + id,
        method: 'DELETE',
        success: function(data) {
            console.log('fetchLanguage res :: ', data);
            backToList()
        },
        error: (err) => {
            console.log('fetchLanguage err :: ', err);
            alert("Xóa thất bại!")
        },
        complete: () => {
            setLoading(false)
        }
    });
}

function handleSave() {
    const formValue = getFormValues('Language_form')
    const payload = buildPayload(formValue)
    setLoading(true)
    $.ajax({
        url: 'https://localhost:7141/api/DanhMucNgoaiNgu/updateDanhMucNgoaiNgu/' + idNgoaiNguHienTai,
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(payload),
        success: function(data) {
            console.log('fetchLanguage res :: ', data);
            backToList();
        },
        error: (err) => {
            console.log('err ', err);
            try {
                if(!err.responseJSON) {
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
    const actionEl = document.getElementById('Language_form_action')
    const buildButton = (label, type, icon) => {
        const btnEl = document.createElement('base-button')
        btnEl.setAttribute('label', label)
        btnEl.setAttribute('type', type)
        btnEl.setAttribute('icon', icon)
        return btnEl
    }
    const createBtn = buildButton('Thêm', 'green', 'bx bx-plus')
    const removeBtn = buildButton('Xóa', 'red', 'bx bx-trash')
    const saveBtn = buildButton('Lưu', '', 'bx bx-save')

    createBtn.addEventListener('click', handleCreate)
    removeBtn.addEventListener('click', handleRemove)
    saveBtn.addEventListener('click', handleSave)

    actionEl.append(createBtn,removeBtn, saveBtn)
}

function buildApiUrl() {
    return 'https://localhost:7141/api/DanhMucNgoaiNgu/getDanhMucNgoaiNgu' 
}

document.addEventListener('DOMContentLoaded', () => {
    renderActionByStatus()
    // if (id) {
    //     fetchEmployee()
    // }
})

