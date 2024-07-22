const isEdit = !!id
const vaiTroID = localStorage.getItem("vaiTroID")
let maHopDongHienTai = null
// const maNhanVien = localStorage.getItem("maNhanVien")

var MaritalOptions = [
    { label: 'Hợp đồng còn thời hạn', value: 1 },
    { label: 'Hợp đồng quá hạn', value: 0 },
];

// Khai báo giá trị định nghĩa columns biến "var" là biến toàn cục
var TableColumns = [
    {
        label: 'Mã hợp đồng',
        key: 'mahopdong',
    },
    {
        label: 'Loại hợp đồng',
        key: 'loaihopdong'
    },
    {
        label: 'Chức danh',
        key: 'chucdanh'
    },
    {
        label: 'Từ ngày',
        key: 'hopdongtungay',
        type: 'datetime'
    },
    {
        label: 'Đến ngày',
        key: 'hopdongdenngay',
        type: 'datetime'
    },
    {
        label: 'Trạng thái',
        key: 'trangthai'
    },
    {
        label: 'Ghi chú',
        key: 'ghichu'
    }
    // {
    //     label: 'Hành động',
    //     key: 'action',
    //     actions: [
            
    //         { type: 'red', icon: 'bx bx-trash', label: 'Xóa', onClick: (row) => { handleRemoveRow(row.mahopdong) } }
    //     ]
    // }
]
// ctrl K 0
// Biến định nghĩa các sự kiện của table
var tableEvent = { // global: ở đau cũng truy cập được
    rowClick: (row) => {
        console.log('row click ', row);
        fetchContract(row.mahopdong)
    }
}


function backToList() {
    
        const url = new URL("/pages/staff/laborContract.html", window.location.origin);
        // url.searchParams.set("id", maNhanVien);
  
}

function buildPayload(formValue) {
    const formClone = { ...formValue }

    formClone['trangThai'] = Number(formClone['trangThai'])

    return formClone
}

function fetchContract(mahopdong) {
    console.log(mahopdong);
    setLoading(true)
    maHopDongHienTai = mahopdong
    $.ajax({

        url: 'https://localhost:7141/api/HopDong/id?id=' + mahopdong,
        method: 'GET',
        success: function (data) {
            setFormValue('laborContract_form', data, 'fetch');
            setFormValue('laborContract_form', data)
        },
        error: (err) => {
            console.log('fetchContract err :: ', err);
        },
        complete: () => {
            setLoading(false)
        }
    });
}

function handleCreate() {
    const isConfirm = confirm('Bạn chắc chắn muốn thêm hợp đồng lao động?')
    if (!isConfirm) return
    const valid = validateForm('laborContract_form')
    if (!valid) return
    const formValue = getFormValues('laborContract_form')

    // const urlParams = new URLSearchParams(window.location.search);
    // const employeeId = urlParams.get('id');
    formValue['ma'] = maNhanVien;

    console.log('formValue ', formValue);
    const payload = buildPayload(formValue)
    setLoading(true)
    $.ajax({
        
        url: 'https://localhost:7141/api/HopDong/TaoMoiHopDong',
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

function handleRemove() {
    const isConfirm = confirm('Bạn chắc chắn muốn xóa hợp đồng lao động?')
    if (!isConfirm) return
    setLoading(true)
    $.ajax({
        url: 'https://localhost:7141/api/HopDong/xoaHopDong/' + maHopDongHienTai,
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

function handleRemoveRow(mahopdong) {
    const isConfirm = confirm('Bạn chắc chắn muốn xóa hợp đồng lao động?')
    if (!isConfirm) return
    setLoading(true)
    $.ajax({
        url: 'https://localhost:7141/api/HopDong/xoaHopDong/' + mahopdong,
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
    const isConfirm = confirm('Bạn chắc chắn muốn sửa hợp đồng lao động?')
    if (!isConfirm) return
    const formValue = getFormValues('laborContract_form')

    // const urlParams = new URLSearchParams(window.location.search);
    // const employeeId = urlParams.get('id');

    formValue['ma'] = maNhanVien;

    const payload = buildPayload(formValue)
    setLoading(true)
    $.ajax({
        url: 'https://localhost:7141/api/HopDong/SuaMoiHopDong/' + maHopDongHienTai,
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(payload),
        success: function (data) {
            console.log('fetchContract res :: ', data);
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
    const actionEl = document.getElementById('laborContract_form_action')
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
    const clear = buildButton('cLear', 'plain', 'bx bx-eraser')

    createBtn.addEventListener('click', handleCreate)
    removeBtn.addEventListener('click', handleRemove)
    saveBtn.addEventListener('click', handleSave)
    clear.addEventListener('click', function() {
        clearFormValues('laborContract_form');
    });

    actionEl.append(createBtn, removeBtn, saveBtn,clear)
}

function buildApiUrl() {
    return 'https://localhost:7141/api/HopDong/GetHopDongByMaNV/id?id=' + maNhanVien
}

document.addEventListener('DOMContentLoaded', () => {
    if (vaiTroID !== "1") {
        window.location.href = "/pages/error.html";
        return;
    }
    renderActionByStatus()
})

