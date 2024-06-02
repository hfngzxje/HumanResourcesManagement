const params = new URL(document.location.toString()).searchParams;
const id = params.get("id");
const isEdit = !!id



function backToList() {
    window.location.replace("/pages/staff/list.html");
}



function buildPayload(formValue) {
    const formClone = {...formValue}
    const phoneKey = ['dienthoai']
    const dateKey = ['ngaysinh','cmndngaycap','ngaytuyendung','ngayvaoban','ngaychinhthuc','ngayvaodang','ngayvaodangchinhthuc','ngaynhapngu','ngayxuatngu','ngayvaodoan']
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
    
    console.log('gioitinh', formClone['gioitinh']);
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
    const valid = validateForm('salaryRecord_form')
    if(!valid) return
    const formValue = getFormValues('salaryRecord_form')
    const payload = buildPayload(formValue)
    setLoading(true)
    $.ajax({
        url: 'https://localhost:7141/api/HoSoLuong/TaoMoiHoSoLuong',
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
        url: 'https://localhost:7141/api/HoSoLuong/xoaHoSoLuong/' + id,
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
    const actionEl = document.getElementById('tinhluong_form_Action')
    const actionE2 = document.getElementById('salary_form_action');
    const buildButton = (label, type, icon) => {
        const btnEl = document.createElement('base-button')
        btnEl.setAttribute('label', label)
        btnEl.setAttribute('type', type)
        btnEl.setAttribute('icon', icon)
        return btnEl
    }
    const tinhLuong = buildButton('Tính lương', '', 'bx bx-save')
    tinhLuong.addEventListener('click', handleSave)

    const createBtn = buildButton('Thêm', 'green', 'bx bx-plus')
    const removeBtn = buildButton('Xóa', 'red', 'bx bx-trash')
    const saveBtn = buildButton('Lưu', '', 'bx bx-save')


    createBtn.addEventListener('click', handleCreate)
    removeBtn.addEventListener('click', handleRemove)
    saveBtn.addEventListener('click', handleSave)

    actionEl.append(tinhLuong)
    actionE2.append(createBtn,saveBtn,removeBtn)
}

document.addEventListener('DOMContentLoaded', () => {
    renderActionByStatus()
    if (id) {
        fetchEmployee()
    }
 

})

