const params = new URL(document.location.toString()).searchParams;


var MaritalOptions = [
    { label: 'Đã kết hôn', value: 1 },
    { label: 'Chưa kết hôn', value: 0 },
]
var ngachCongChucGroups =[
    {
        value: '1', label: '1'
    }
]
var tonGiaoGroups =[
    {
        value: '1', label: '1'
    }
]

function backToList() {
    window.location.replace("/pages/staff/list.html");
}

function buildPayload(formValue) {
    const formClone = {...formValue}
    const dateKey = ['ngaysinh','cmndngaycap','ngaytuyendung','ngayvaoban','ngaychinhthuc','ngayvaodang','ngayvaodangchinhthuc','ngaynhapngu','ngayxuatngu','ngayvaodoan']
    dateKey.forEach(key => {
        if(!formClone[key]) return
        formClone[key] = convertToISODate(formClone[key])
    })
    console.log('gioitinh', formClone['gioitinh']);
    formClone['gioitinh'] = formClone['gioitinh'] === '1'
    return formClone
}



function getInputValueByName(id) {
    const inputElement = document.querySelector(`base-input[name="${id}"] input`);
    if (inputElement) {
        return inputElement.value;
    } else {
        console.error(`Input field with name "${id}" not found`);
        return null;
    }
}

function handleCreate() {
    const formValue = getFormValues('relationship_form')
    
    const payload = buildPayload(formValue)
    const idValue = getInputValueByName('id');

    payload = idValue;
    setLoading(true)
    $.ajax({
        url: 'https://localhost:7141/api/NguoiThan/updateNguoiThan',
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
function getInputValueByName(id) {
    const inputElement = document.querySelector(`base-input[name="${id}"] input`);
    if (inputElement) {
        return inputElement.value;
    } else {
        console.error(`Input field with name "${id}" not found`);
        return null;
    }
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
    const formValue = getFormValues('relationship_form');
    const id = getInputValueByName('id');
    
    if (!id) {
        alert('ID không được tìm thấy hoặc không hợp lệ.');
        setLoading(false);
        return;
    }
    const payload = buildPayload(formValue);
    payload.id = id;
    setLoading(true);
    
    fetch('https://localhost:7141/api/NguoiThan/updateNguoiThan', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
        console.log('fetchEmployee res :: ', data);
        backToList();
    })
    .catch(error => {
        console.log('fetchEmployee err :: ', error);
        alert("Cập nhật thất bại!");
    })
    .finally(() => {
        setLoading(false);
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

document.addEventListener('DOMContentLoaded', () => {
    renderActionByStatus()
   
 

})

