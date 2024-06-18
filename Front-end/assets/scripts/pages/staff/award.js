const isEdit = !!id
// const maNhanVien = localStorage.getItem("maNhanVien")

let maHopDongHienTai = null

var MaritalOptions = [
    { label: 'Khen Thưởng', value: 1 },
    { label: 'Kỷ Luật', value: 2 },
];

var TableColumns = [
    {
        label: 'Thời gian',
        key: 'ngay',
        type: 'datetime'
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

function handleCreate() {
    const valid = validateForm('award_form')
    if (!valid) return
    const formValue = getFormValues('award_form')

    // const urlParams = new URLSearchParams(window.location.search);
    // const employeeId = urlParams.get('id');
    formValue['ma'] = maNhanVien;

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

    createBtn.addEventListener('click', handleCreate)

    actionEl.append(createBtn)
}

function buildApiUrlKhenThuong() {
    
    let string1 = 'https://localhost:7141/api/KhenThuongKiLuat/getKhenThuongKiLuatByMaNV/' + maNhanVien;
    let string2 = '/1'
    return string1 + string2;
}
function buildApiUrlKyLuat() {
    let string1 = 'https://localhost:7141/api/KhenThuongKiLuat/getKhenThuongKiLuatByMaNV/' + maNhanVien;
    let string2 = '/0'
    return string1 + string2;
}

document.addEventListener('DOMContentLoaded', () => {
    renderActionByStatus()
})

