const isEdit = !!id

function fetchCongViecHienTaiByID(maHD) {
    setLoading(true)
    maHopDongHienTai = maHD
    $.ajax({
        url: 'https://localhost:7141/api/DieuChuyen/CongViecHienTai/' + maHD,
        method: 'GET',
        success: function (data) {
            setFormValue('Working_Process_formm', data)
        },
        error: (err) => {
            console.log('fetchEmployee err :: ', err);
        },
        complete: () => {
            setLoading(false)
        }
    });
}

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
            { type: 'red', icon: 'bx bx-trash', label: 'Xóa', onClick: () => { console.log('click') } }
        ]
    }
]

function backToList() {
    window.location.replace("/pages/staff/WorkingProcess.html");
}

function buildApiUrl() {
    return 'https://localhost:7141/api/DieuChuyen/GetAllDieuChuyen/' + id
}

function handleCreate() {
    const valid = validateForm('Working_Process_form')
    if(!valid) return
    const formValue = getFormValues('Working_Process_form')
    console.log('formValue ', formValue);
    const payload = buildPayload(formValue)
    setLoading(true)
    $.ajax({
        url: 'https://localhost:7141/api/DieuChuyen/DieuChuyen',
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

function renderActionByStatus() {
    const actionEl = document.getElementById('Working_Process_form_action')
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

    // const removeBtn = buildButton('Xóa', 'red', 'bx bx-trash')
    // const saveBtn = buildButton('Lưu', '', 'bx bx-save')
    // const exportBtn = buildButton('In', 'plain', 'bx bx-printer')

    // removeBtn.addEventListener('click', handleRemove)
    // saveBtn.addEventListener('click', handleSave)

    // actionEl.append(removeBtn, saveBtn, exportBtn)
}


// function handleRemove() {
//     const isConfirm = confirm('Xác nhận xóa')
//     if (!isConfirm) return
//     setLoading(true)
//     $.ajax({
//         url: 'https://localhost:7141/api/HopDong/xoaHopDong/' + maHopDongHienTai,
//         method: 'DELETE',
//         success: function(data) {
//             console.log('fetchEmployee res :: ', data);
//             backToList()
//         },
//         error: (err) => {
//             console.log('fetchEmployee err :: ', err);
//             alert("Xóa thất bại!")
//         },
//         complete: () => {
//             setLoading(false)
//         }
//     });
// }