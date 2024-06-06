const isEdit = !!id

let idChuyenMonHienTai = null

var TableColumns = [
    {
      label: 'ID',
      key: 'id'
    },
    {
      label: 'Mã Chuyên Môn',
      key: 'ma'
    },
    {
      label: 'Tên Chuyên Môn',
      key: 'ten'
    },
    {
      label: 'Hành động',
      key: 'action',
      actions: [
        { type: 'plain', icon: 'bx bx-show', label: 'Chi tiết', onClick: (row) => { fetchChuyenMon(row.id)} },
        { type: 'red', icon: 'bx bx-trash', label: 'Xóa', onClick: (row) => { handleRemoveRow(row.id) } }
      ]
    }
  ]

function backToList() {
    window.location.replace("/pages/catalog/specializations.html");
}

function buildPayload(formValue) {
    const formClone = {...formValue}

    

    return formClone
}

function fetchChuyenMon(id) {
    console.log("Name:" , id);
    setLoading(true)
    idChuyenMonHienTai = id
    $.ajax({
        url: 'https://localhost:7141/api/ChuyenMon/getChuyenMonById/' + id,
        method: 'GET',
        success: function(data) {
            setFormValue('specializations_form', data)
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
    const valid = validateForm('specializations_form')
    if(!valid) return
    const formValue = getFormValues('specializations_form')
    console.log('formValue ', formValue);
    const payload = buildPayload(formValue)
    setLoading(true)
    $.ajax({
        url: 'https://localhost:7141/api/ChuyenMon/addChuyenMon',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(payload),
        success: function(data) {
            console.log('fetchEmployee res :: ', data);
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
        url: 'https://localhost:7141/api/ChuyenMon/deleteChuyenMon/' + idChuyenMonHienTai,
        method: 'DELETE',
        success: function(data) {
            console.log('fetchChuyenMon res :: ', data);
            backToList()
        },
        error: (err) => {
            console.log('fetchChuyenMon err :: ', err);
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
        url: 'https://localhost:7141/api/ChuyenMon/deleteChuyenMon/' + id,
        method: 'DELETE',
        success: function(data) {
            console.log('fetchChuyenMon res :: ', data);
            backToList()
        },
        error: (err) => {
            console.log('fetchChuyenMon err :: ', err);
            alert("Xóa thất bại!")
        },
        complete: () => {
            setLoading(false)
        }
    });
}

function handleSave() {
    const formValue = getFormValues('specializations_form')
    const payload = buildPayload(formValue)
    setLoading(true)
    $.ajax({
        url: 'https://localhost:7141/api/ChuyenMon/updateChuyenMon/' + idChuyenMonHienTai,
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(payload),
        success: function(data) {
            console.log('fetchChuyenMon res :: ', data);
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
    const actionEl = document.getElementById('specializations_form_action')
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
    return 'https://localhost:7141/api/ChuyenMon/getChuyenMon' 
}

document.addEventListener('DOMContentLoaded', () => {
    renderActionByStatus()
})

