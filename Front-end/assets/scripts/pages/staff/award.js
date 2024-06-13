const isEdit = !!id
let Eid = null;
let temp = false
let isPopupEdit = false


var MaritalOptions = [
    { label: 'Khen Thưởng', value: 1 },
    { label: 'Kỷ Luật', value: 2 },
];

let idKhenThuong = null

var TableColumns = [
    {
        label: 'Thời gian',
        key: 'ngay',
        type: 'datetime'
    },
    {
        label: 'Tên',
        key: 'ten',
    },
    {
        label: 'Nội dung',
        key: 'noidung',
    },
    {
        label: 'Lý do',
        key: 'lido'
    },
    {
        label: 'Hành động',
        key: 'action',
        actions: [
            {
                type: 'plain', icon: 'bx bx-save', label: 'Sửa', onClick: (row) => {
                    // temp = true
                    Eid = row.id
                    isPopupEdit = true
                    fetchAward(row.id);
                    var modal = document.getElementById("editChuyenMon");
                    showPopup()
                }
            },
            { type: 'red', icon: 'bx bx-trash', label: 'Xóa', onClick: (row) => { handleRemoveRow(row.id) } }
        ]
    }
]

function backToList() {
    const url = new URL("/pages/staff/award.html", window.location.origin);
    url.searchParams.set("id", id);
    window.location.replace(url.toString());
}

function buildPayload(formValue) {
    const formClone = { ...formValue }
    return formClone
}

function fetchAward(id) {
    setLoading(true)
    idKhenThuong = id
    $.ajax({
        url: 'https://localhost:7141/api/PhongBan/getPhongBanById/' + id,
        method: 'GET',
        success: function (data) {
            setFormValue('editPhongBan', data)
        },
        error: (err) => {
            console.log('fetchDepartments err :: ', err);
        },
        complete: () => {
            setLoading(false)
        }
    });
}

function handleCreate() {
    const valid = validateForm('editKhenThuongKyLuat')
    if (!valid) return
    const formValue = getFormValues('editKhenThuongKyLuat')

    const urlParams = new URLSearchParams(window.location.search);
    const employeeId = urlParams.get('id');
    formValue['ma'] = employeeId;

    console.log('formValue ', formValue);
    const payload = buildPayload(formValue)
    setLoading(true)
    $.ajax({
        url: 'https://localhost:7141/api/KhenThuongKiLuat/addKhenThuongKiLuat',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(payload),
        success: function (data) {
            alert('Tạo Thành Công!');
            backToList();
        },
        error: (err) => {
            console.log('err ', err);
            try {
                if (!err.responseJSON) {
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

function handleRemoveRow(id) {
    const isConfirm = confirm('Xác nhận xóa')
    // console.log("abcbc", id)
    if (!isConfirm) return
    setLoading(true)
    $.ajax({
        url: 'https://localhost:7141/api/KhenThuongKiLuat/deleteKhenThuongKiLuat/' + id,
        method: 'DELETE',
        success: function (data) {
            alert('Xóa Thành Công!');
            backToList();
        },
        error: (err) => {
            console.log('fetchContract err :: ', err);
            alert("Xóa thất bại!")
        },
        complete: () => {
            setLoading(false)
        }
    });
}
function handleSave() {
    const formValue = getFormValues('editKhenThuongKyLuat')
    const payload = buildPayload(formValue)
    setLoading(true)
    $.ajax({
        url: 'https://localhost:7141/api/PhongBan/updatePhongBan?id=' + idPhongBan,
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(payload),
        success: function (data) {
            console.log('fetchPhongBan res :: ', data);
            alert('Lưu Thành Công!');
            backToList();
        },
        error: (err) => {
            console.log('err ', err);
            try {
                if (!err.responseJSON) {
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
    const inputs = form.querySelectorAll('input, textarea, select');

    inputs.forEach(input => {
        if (input.type === 'checkbox' || input.type === 'radio') {
            input.checked = false;
        } else {
            input.value = '';
        }
    });
}

function renderActionByStatus() {
    const actionEl = document.getElementById('award_form_action')
    const actionE2 = document.getElementById('editAward_Action');
    const actionE3 = document.getElementById('createAward_Action')
    const buildButton = (label, type, icon) => {
        const btnEl = document.createElement('base-button')
        btnEl.setAttribute('label', label)
        btnEl.setAttribute('type', type)
        btnEl.setAttribute('icon', icon)

        return btnEl
    }
    const createBtn = buildButton('Thêm', 'green', 'bx bx-plus')
    const saveBtn = buildButton('Lưu', '', 'bx bx-save')
    const saveCreateBtn = buildButton('Thêm', '', 'bx bx-save')


    createBtn.addEventListener('click', function () {
        isPopupEdit = false
        temp = true
        saveBtn.style.display = "none";
        saveCreateBtn.style.display = "block";
        showPopup()
    });
    saveBtn.addEventListener('click', handleSave)
    saveCreateBtn.addEventListener('click', handleCreate)

    actionEl.append(createBtn)
    actionE2.append(saveBtn)
    actionE3.append(saveCreateBtn)


    saveBtn.style.display = 'none';
    saveCreateBtn.style.display = 'none';
    if (!temp) {
        saveBtn.style.display = 'block';
        saveCreateBtn.style.display = 'none';
    }
    // -----------------------------------------------------------------------
    // ------------------------------------------------------------------------
}

function buildApiUrlKhenThuong() {
    
    let string1 = 'https://localhost:7141/api/KhenThuongKiLuat/getKhenThuongKiLuatByMaNV/' + id;
    let string2 = '/1'
    return string1 + string2;
}
function buildApiUrlKyLuat() {
    let string1 = 'https://localhost:7141/api/KhenThuongKiLuat/getKhenThuongKiLuatByMaNV/' + id;
    let string2 = '/0'
    return string1 + string2;
}

function showPopup() {
    var modal = document.getElementById("editKhenThuongKyLuat");
    modal.style.display = "block";
    window.onclick = function (event) {
        if (event.target == modal) {
            temp = false
            modal.style.display = "none";
            clearFormValues('editPhongBan')
        }
    }
    if (isPopupEdit) {
        const popupTitle = modal.querySelector('h2')
        popupTitle.textContent = "Sửa Khen Thưởng Kỷ Luật"
    } else {
        const popupTitle = modal.querySelector('h2')
        popupTitle.textContent = "Thêm mới Khen Thưởng Kỷ Luật"
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderActionByStatus()
})

