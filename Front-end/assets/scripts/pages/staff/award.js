const isEdit = !!id
const vaiTroID = localStorage.getItem("vaiTroID")
const maDetail = localStorage.getItem("maDetail")
const table = document.querySelectorAll('base-table')

let maHopDongHienTai = null

// var MaritalOptions = [
//     { label: 'Khen Thưởng', value: 1 }
// ];

var TableColumns = [
    {
        label: 'Tên',
        key: 'ten'
    },
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
    const isConfirm = confirm('Bạn chắc chắn muốn thêm khen thưởng?')
    if (!isConfirm) return
    const valid = validateForm('award_form')
    if (!valid) return
    const formValue = getFormValues('award_form')

    
    formValue['ma'] = maDetail;

    console.log('formValue ', formValue);
    formValue['khenthuongkiluat'] = '2'
    const payload = buildPayload(formValue)
    setLoading(true)
    setTimeout(() => {
    $.ajax({
        url: 'https://localhost:7141/api/KhenThuongKiLuat/addKhenThuongKiLuat',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(payload),
        success: function (data) {
            alert('Tạo Thành Công!');
            table.forEach(table => {
                if (table.handleCallFetchData) {
                    table.handleCallFetchData();
                }
            });
            clearFormValues("award_form")
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
}, 1000); 
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
function handleRemoveRow(id) {
    const isConfirm = confirm('Bạn chắc chắn muốn xóa  khen thưởng ?')
    if (!isConfirm) return
    setLoading(true)
    setTimeout(() => {
    $.ajax({
        url: 'https://localhost:7141/api/KhenThuongKiLuat/deleteKhenThuongKiLuat/' + id,
        method: 'DELETE',
        success: function (data) {
            alert('Xóa Thành Công!');
            table.forEach(table => {
                if (table.handleCallFetchData) {
                    table.handleCallFetchData();
                }
            });
        },
        error: (err) => {
            console.log('fetchContract err :: ', err);
            alert("Xóa thất bại!")
        },
        complete: () => {
            setLoading(false)
        }
    });
}, 1000); 
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
    
    let string1 = 'https://localhost:7141/api/KhenThuongKiLuat/getKhenThuongKiLuatByMaNV/' + maDetail;
    let string2 = '/1'
    return string1 + string2;
}

document.addEventListener('DOMContentLoaded', () => {
    renderActionByStatus()
})

