const isEdit = !!id

let idKhenThuong = null

var MaritalOptions = [
    { label: 'Khen Thưởng', value: 1 },
    { label: 'Kỷ Luật', value: 0 },
    { label: 'Xuất Sắc', value: 2 },
]

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
        label: 'Mã',
        key: 'ma'
      },
    
    {
        label: 'Ngày',
        key: 'ngay'
      },
      {
        label: 'Nội dung',
        key: 'noidung'
      },
      {
        label: 'Lý Do',
        key: 'lydo'
      },
      {
        label: 'Khen Thưởng Kỷ Luật',
        key: 'khenthuongkiluat'
      },
    {
      label: 'Hành động',
      key: 'action',
      actions: [
        { type: 'plain', icon: 'bx bx-show', label: 'Chi tiết', onClick: (row) => { fetchAward(row.id)} },
        { type: 'red', icon: 'bx bx-trash', label: 'Xóa', onClick: (row) => { handleRemoveRow(row.id) } }
      ]
    }
  ]

function backToList() {
    window.location.replace("/pages/catalog/awardsAndDisciplinaryActions.html");
}

function buildPayload(formValue) {
    const formClone = {...formValue}
    // formClone['id'] = idPhongBanHienTai
    return formClone
}

function fetchAward(id) {
    console.log("Name:" , id);
    setLoading(true)
    idKhenThuong = id
    $.ajax({
        url: 'https://localhost:7141/api/PhongBan/getPhongBanById/' + id,
        method: 'GET',
        success: function(data) {
            setFormValue('award_form', data)
        },
        error: (err) => {
            console.log('fetchAward err :: ', err);
        },
        complete: () => {
            setLoading(false)
        }
    });
}

function handleCreate() {
    const valid = validateForm('teams_form')
    if(!valid) return
    const formValue = getFormValues('teams_form')

    console.log('formValue ', formValue);
    const payload = buildPayload(formValue)
    setLoading(true)
    $.ajax({
        url: 'https://localhost:7141/api/KhenThuongKiLuat/addKhenThuongKiLuat',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(payload),
        success: function(data) {
            console.log('fetchAward res :: ', data);
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
        url: 'https://localhost:7141/api/KhenThuongKiLuat/deleteKhenThuongKiLuat/' + idKhenThuong,
        method: 'DELETE',
        success: function(data) {
            console.log('fetchAward res :: ', data);
            backToList()
        },
        error: (err) => {
            console.log('fetchAward err :: ', err);
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
        url: 'https://localhost:7141/api/KhenThuongKiLuat/deleteKhenThuongKiLuat/' + id,
        method: 'DELETE',
        success: function(data) {
            console.log('fetchAward res :: ', data);
            backToList()
        },
        error: (err) => {
            console.log('fetchAward err :: ', err);
            alert("Xóa thất bại!")
        },
        complete: () => {
            setLoading(false)
        }
    });
}

function handleSave() {
    const formValue = getFormValues('teams_form')
    const payload = buildPayload(formValue)
    setLoading(true)
    $.ajax({
        url: 'https://localhost:7141/api/DanhMucTo/updateDanhMucTo/' + idKhenThuong ,
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(payload),
        success: function(data) {
            console.log('fetchAward res :: ', data);
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
    const actionEl = document.getElementById('award_form_action')
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
    return 'https://localhost:7141/api/DanhMucTo/getDanhMucTo' 
}

document.addEventListener('DOMContentLoaded', () => {
    renderActionByStatus()
})

