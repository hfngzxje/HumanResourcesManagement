const isEdit = !!id
const vaiTroID = localStorage.getItem("vaiTroID")
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
        { type: 'red', icon: 'bx bx-trash', label: 'Xóa', onClick: (row) => { console.log(id)  ,handleRemoveRow(row.id)  } }
      ]
    }
  ]


  var tableEvent = { // global: ở đau cũng truy cập được
    rowClick: (row) => {
        console.log('row click ', row);
        fetchRelationship(row.id)
    }
}
function backToList() {
    const url = new URL("/pages/staff/FamilyRelationship.html", window.location.origin);
    // url.searchParams.set("id", maNhanVien);
    window.location.replace(url.toString());
}

function buildPayload(formValue) {
    const formClone = {...formValue}
    return formClone
}

function fetchRelationship(id) {
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
    alert(maNhanVien)
    const valid = validateForm('relationship_form')
    if(!valid) return
    const formValue = getFormValues('relationship_form')

    // const urlParams = new URLSearchParams(window.location.search);
    // const employeeId = urlParams.get('id');
    const employeeId = maNhanVien
 
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
            alert("Thêm thành công!")
            backToList()
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
                alert("Tạo mới thất bại!")
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
    formValue['id'] = idNguoiThan
    const payload = buildPayload(formValue)
    setLoading(true)
    $.ajax({
        url: 'https://localhost:7141/api/NguoiThan/updateNguoiThan',
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(payload),
        success: function(data) {
            alert("Sửa thành công!")
            console.log('fetchEmployee res :: ', data);
            backToList()
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
function clearFormValues(formId) {
    const form = document.getElementById(formId);
    const inputs = form.querySelectorAll('input, textarea');

    inputs.forEach(input => {
        if (input.type === 'checkbox') {
            input.checked = false;
        } else {
            input.value = '';
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
    const removeBtn = buildButton('Xóa', 'red', 'bx bx-trash')
    const saveBtn = buildButton('Lưu', '', 'bx bx-save')
    const clear = buildButton('Clear', 'plain', 'bx bx-eraser')

    removeBtn.addEventListener('click', handleRemove)
    saveBtn.addEventListener('click', handleSave)
    createBtn.addEventListener('click', handleCreate)
    clear.addEventListener('click', function() {
        clearFormValues('relationship_form');
    });

    actionEl.append(createBtn,removeBtn, saveBtn, clear)
}

function buildApiUrl() {
    return 'https://localhost:7141/api/NguoiThan/getNguoiThanByMaNV/' + maNhanVien
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
    alert(vaiTroID)
    if (vaiTroID !== "1") {
        window.location.href = "/pages/error.html";
        return;
    }
    renderActionByStatus();

    
})
