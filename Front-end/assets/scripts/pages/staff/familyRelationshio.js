const isEdit = !!id

let idNguoiThan = null

var MaritalOptions = [
    { label: 'Hợp đồng còn thời hạn', value: 1 },
    { label: 'Hợp đồng quá hạn', value: 0 },
];
var relationshipOptions = []
var TableColumns = [
    {
      label: 'Họ Tên',
      key: 'ten'
    },
    {
      label: 'Quan Hệ',
      key: 'quanheTen',
      
    },
    {
      label: 'Ngày Sinh',
      key: 'ngaysinh',
      type: 'datetime'
    },
    {
      label: 'Địa chỉ',
      key: 'diachi',
    },
    {
      label: 'Điện thoại',
      key: 'dienthoai'
    },
    {
        label: 'Nghề nghiệp',
        key: 'nghenghiep'
      },
      {
        label: 'Thông tin khác',
        key: 'khac'
      },
    {
      label: 'Hành động',
      key: 'action',
      actions: [
        { type: 'plain', icon: 'bx bx-show', label: 'Chi tiết', onClick: (row) => { fetchEmployee(row.id)} },
        { type: 'red', icon: 'bx bx-trash', label: 'Xóa', onClick: (row) => { console.log(id)  ,handleRemoveRow(row.id) } }
      ]
    }
  ]

function backToList() {
    const url = new URL("/pages/staff/FamilyRelationship.html", window.location.origin);
    url.searchParams.set("id", id);
    window.location.replace(url.toString());
}

function buildPayload(formValue) {
    const formClone = {...formValue}

    formClone['trangThai'] = Number(formClone['trangThai'])
    formClone['id'] = idNguoiThan
    // formClone['ma'] = employeeId
    return formClone
}

function fetchEmployee(id) {
    setLoading(true)
    idNguoiThan = id
    $.ajax({
        url: 'https://localhost:7141/api/NguoiThan/getNguoiThanById/' + id,
        method: 'GET',
        success: function(data) {
            setFormValue('relationship_form', data)
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
    const valid = validateForm('relationship_form')
    if(!valid) return
    const formValue = getFormValues('relationship_form')

    const urlParams = new URLSearchParams(window.location.search);
    const employeeId = urlParams.get('id');

    formValue['ma'] = employeeId;

    console.log('formValue ', formValue);
    const payload = buildPayload(formValue)
    
    setLoading(true)
    $.ajax({
        url: 'https://localhost:7141/api/NguoiThan/addNguoiThan',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(payload),
        success: function(data) {
            console.log('fetchEmployee res :: ', data);
            backToList()
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
        url: 'https://localhost:7141/api/NguoiThan/removeNguoiThan/' + idNguoiThan,
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
function handleRemoveRow(id) {
    const isConfirm = confirm('Xác nhận xóa')
    if (!isConfirm) return
    setLoading(true)
    $.ajax({
        url: 'https://localhost:7141/api/NguoiThan/removeNguoiThan/' + id,
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
    const valid = validateForm('relationship_form')
    if(!valid) return
    
    const formValue = getFormValues('relationship_form')
    const payload = buildPayload(formValue)
    setLoading(true)
    $.ajax({
        url: 'https://localhost:7141/api/NguoiThan/updateNguoiThan',
        method: 'PUT',
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
                alert("Cập nhật thất bại!")
            }
        },
        complete: () => {
            setLoading(false)
        }
    });
}

function renderActionByStatus() {
    const actionEl = document.getElementById('relationship_form_action')
    const buildButton = (label, type, icon) => {
        const btnEl = document.createElement('base-button')
        btnEl.setAttribute('label', label)
        btnEl.setAttribute('type', type)
        btnEl.setAttribute('icon', icon)
        return btnEl
    }
        const createBtn = buildButton('Thêm', 'green', 'bx bx-plus')
        createBtn.addEventListener('click', handleCreate)
        actionEl.append(createBtn)


    const removeBtn = buildButton('Xóa', 'red', 'bx bx-trash')
    const saveBtn = buildButton('Lưu', '', 'bx bx-save')
    const exportBtn = buildButton('In', 'plain', 'bx bx-printer')

    removeBtn.addEventListener('click', handleRemove)
    saveBtn.addEventListener('click', handleSave)

    actionEl.append(removeBtn, saveBtn, exportBtn)
}

function buildApiUrl() {
    return 'https://localhost:7141/api/NguoiThan/getNguoiThanByMaNV/' + id
}

function getNameQuanHe(){
  
    $.ajax({
        url: 'https://localhost:7141/api/NguoiThan/getDanhMucNguoiThan',
        method: 'GET',
        success: function(data) {
            relationshipOptions = data;
        },
        error: (err) => {
            console.log('fetchEmployee err :: ', err);
        }
    });
}

getNameQuanHe()
document.addEventListener('DOMContentLoaded', () => {
    renderActionByStatus()
    
})
