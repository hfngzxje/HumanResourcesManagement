const params = new URL(document.location.toString()).searchParams;
const id = params.get("id");
const isEdit = !!id

var MaritalOptions = [
    { label: 'Hợp đồng còn thời hạn', value: 1 },
    { label: 'Hợp đồng quá hạn', value: 0 },
];

function backToList() {
    window.location.replace("/pages/staff/laborContract.html");
}

function buildPayload(formValue) {
    const formClone = {...formValue}
    const phoneKey = ['']
    const dateKey = ['hopdongdenngay','hopdongtungay']
    dateKey.forEach(key => {
        if(!formClone[key]) {
            formClone[key] = null;
        }
        else{
            formClone[key] = convertToISODate(formClone[key])
        }
        
    })
    
    phoneKey.forEach(key => {
        if(!formClone[key]) {
            formClone[key] = null
        } else {
            formClone[key] = convertToPhoneNumber(formClone[key])
        }
    })
    
   
    formClone['trangThai'] = Number(formClone['trangThai']) === '1' ? 1:0
    return formClone
}

function fetchEmployee() {
    setLoading(true)
    $.ajax({
        url: 'https://localhost:7141/api/HopDong/id?id=' + id,
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
    const valid = validateForm('laborContract_form')
    if(!valid) return
    const formValue = getFormValues('laborContract_form')
    const payload = buildPayload(formValue)
    setLoading(true)
    $.ajax({
        url: 'https://localhost:7141/api/HopDong/TaoMoiHopDong',
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
        url: 'https://localhost:7141/api/HopDong/xoaHopDong/' + id,
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
        url: 'https://localhost:7141/api/HopDong/SuaMoiHopDong/' + id,
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
    const actionEl = document.getElementById('laborContract_form_action')
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
    if (id) {
        fetchEmployee()
    }
 

})

