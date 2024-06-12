const isEdit = !!id

// function buildPayload(formValue) {
//     const formClone = {...formValue}
//     formClone['gioitinh'] = formClone['gioitinh'] === '1'
//     return formClone
// }

// function fetchCongViecHienTaiByID(maHD) {
//     setLoading(true)
//     maHopDongHienTai = maHD
//     $.ajax({
//         url: 'https://localhost:7141/api/DieuChuyen/CongViecHienTai/' + maHD,
//         method: 'GET',
//         success: function (data) {
//             setFormValue('Working_Process_formm', data)
//         },
//         error: (err) => {
//             console.log('fetchEmployee err :: ', err);
//         },
//         complete: () => {
//             setLoading(false)
//         }
//     });
// }

var TableColumns = [
    {
        label: 'Ngày điều chuyển',
        key: 'ngayDieuChuyen',
        type: 'datetime'
    },
    {
        label: 'Phòng',
        key: 'phong',

    },
    {
        label: 'Tổ',
        key: 'to',
    },
    {
        label: 'Chức vụ',
        key: 'chucVu'
    },
    {
        label: 'Chi tiết',
        key: 'chiTiet'
    },
    {
        label: 'Hành động',
        key: 'action',
        actions: [
            // { type: 'red', icon: 'bx bx-trash', label: 'Xóa', onClick: () => { console.log('click') } }
            { type: 'red', icon: 'bx bx-trash', label: 'Xóa', onClick: handleRemove }
        ]
    }
]

function backToList() {
    window.location.replace("/pages/staff/WorkingProcess.html?id="+id);
}

function buildApiUrl() {
    return 'https://localhost:7141/api/DieuChuyen/GetAllDieuChuyen/' + id
}

// function handleCreate() {
//     const valid = validateForm('Working_Process_form');
//     if (!valid) return;

//     const formValue = getFormValues('Working_Process_form');
//     formValue.maNhanVien = id; // Add employee ID to the form values

//     console.log('formValue ', formValue);

//     setLoading(true);
//     $.ajax({
//         url: 'https://localhost:7141/api/DieuChuyen/DieuChuyen',
//         method: 'POST',
//         contentType: 'application/json',
//         data: JSON.stringify(formValue),
//         success: function (data) {
//             console.log('fetchEmployee res :: ', data);
//             alert("Tạo mới thành công!");
//             backToList();
//         },
//         error: (err) => {
//             console.log('handleCreate err :: ', err);
//             alert("Tạo mới không thành công!");
//         },
//         complete: () => {
//             setLoading(false);
//         }
//     });
// }
function handleCreate() {
    const valid = validateForm('Working_Process_form');
    if (!valid) {
        console.log('Form is not valid');
        return;
    }
    const formValue = getFormValues('Working_Process_form');
    // Constructing the payload
    const payload = {
        ma: id,  // Assuming 'id' is the unique identifier you want to send as 'ma'
        ngayHieuLuc: formValue.ngayHieuLuc, // Make sure this is in the correct format
        phong: parseInt(formValue.phong), // Convert to integer
        to: parseInt(formValue.to), // Convert to integer
        chucvu: parseInt(formValue.chucvu), // Convert to integer
        chiTiet: formValue.chiTiet
    };
    console.log('Payload being sent: ', payload);

    setLoading(true);
    $.ajax({
        url: 'https://localhost:7141/api/DieuChuyen/DieuChuyen',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(payload),
        success: function (data) {
            console.log('API Response: ', data);
            alert("Tạo mới thành công!");
            backToList();
        },
        error: function (err) {
            console.log('handleCreate error: ', err);
            alert("Tạo mới không thành công!");
        },
        complete: function () {
            setLoading(false);
        }
    });
}

function renderActionByStatus() {
    const actionEl = document.getElementById('Working_Process_form_action')
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


    // const removeBtn = buildButton('Xóa', 'red', 'bx bx-trash')
    // const saveBtn = buildButton('Lưu', '', 'bx bx-save')
    // const exportBtn = buildButton('In', 'plain', 'bx bx-printer')

    // removeBtn.addEventListener('click', handleRemove)
    // saveBtn.addEventListener('click', handleSave)

    // actionEl.append(removeBtn, saveBtn, exportBtn)
}

function fetchCongViecHienTaiByID() {
    setLoading(true)
    $.ajax({
        url: 'https://localhost:7141/api/NhanVien/id?id=' + id,
        method: 'GET',
        success: function (data) {
            setFormValue('Working_Process_formm', data)
        },
        error: (err) => {
            console.log('fetchCongViecHienTai err :: ', err);
        },
        complete: () => {
            setLoading(false)
        }
    });
}


function handleRemove(event) {
    const id = event.currentTarget.closest('tr').getAttribute('data-id'); // Retrieve the ID from the closest table row's data attribute
    const isConfirm = confirm('Xác nhận xóa');
    if (!isConfirm) return;
    setLoading(true);
    $.ajax({
        url: 'https://localhost:7141/api/DieuChuyen/RemoveDieuChuyen/' + id,
        method: 'DELETE',
        success: function (data) {
            console.log('Delete response: ', data);
            alert("Xóa thành công!");
            backToList(); // Refresh or update the list
        },
        error: function (err) {
            console.log('Delete error: ', err);
            alert("Xóa thất bại!");
        },
        complete: function () {
            setLoading(false);
        }
    });
}



document.addEventListener('DOMContentLoaded', () => {
    renderActionByStatus()
    console.log('id: ', id);
    if (id) {
        fetchCongViecHienTaiByID()
    }
})