const isEdit = !!id

let maHopDongHienTai = null

var MaritalOptions = [
    { label: 'Hợp đồng còn thời hạn', value: 1 },
    { label: 'Hợp đồng quá hạn', value: 0 },
];

var TableColumns = [
    {
      label: 'Họ Tên',
      key: 'ten'
    },
    {
      label: 'Quan Hệ',
      key: 'quanhe',
      type: 'int',
      formatter: (value) => {
        const relationship = relationshipOptions.find(item => item.id === value);
        return relationship ? relationship.name : 'Không xác định';}
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
        { type: 'plain', icon: 'bx bx-show', label: 'Chi tiết', onClick: (row) => { fetchEmployee(row.mahopdong)} },
        { type: 'red', icon: 'bx bx-trash', label: 'Xóa', onClick: () => { console.log('click') } }
      ]
    }
  ]

function backToList() {
    window.location.replace("/pages/staff/familyRelationship.html");
}

function buildPayload(formValue) {
    const formClone = {...formValue}
    const dateKey = ['hopdongdenngay','hopdongtungay']
    dateKey.forEach(key => {
        if(!formClone[key]) {
            formClone[key] = null;
        }
        else{
            formClone[key] = convertToISODate(formClone[key])
        }  
    })
    
    formClone['trangThai'] = Number(formClone['trangThai'])

    return formClone
}

function fetchEmployee(maHD) {
    setLoading(true)
    maHopDongHienTai = maHD
    $.ajax({
        url: 'https://localhost:7141/api/HopDong/id?id=' + maHD,
        method: 'GET',
        success: function(data) {
            setFormValue('laborContract_form', data)
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
            // backToList()
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
        url: 'hhttps://localhost:7141/api/NguoiThan/removeNguoiThan/' + id,
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
    const formValue = getFormValues('laborContract_form')
    const payload = buildPayload(formValue)
    setLoading(true)
    $.ajax({
        url: 'https://localhost:7141/api/HopDong/SuaMoiHopDong/' + maHopDongHienTai,
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
    // if (id) {
    //     fetchEmployee()
    // }
})

