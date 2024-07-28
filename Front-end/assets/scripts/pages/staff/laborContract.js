const vaiTroID = localStorage.getItem("vaiTroID")
let maHopDongHienTai = null
const table = document.querySelector('base-table')
const popupRemoveBtn = document.getElementById("deleteBtn")
const popupSaveBtn = document.getElementById("updateBtn")
var maDetail = localStorage.getItem('maDetail')

var MaritalOptions = [
    { label: 'Hợp đồng còn thời hạn', value: 1 },
    { label: 'Hợp đồng quá hạn', value: 0 },
];

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
        key: 'trangThai'
    },
    {
        label: 'Ghi chú',
        key: 'ghichu'
    },
    {
      label: 'Hành động',
      key: 'action',
      actions: [
        {
                        type: 'plain', icon: 'bx bx-save', label: 'Sửa', onClick: (row) => {
                            isPopupEdit = true
                            fetchContract(row.mahopdong);
                            showPopup()
                        }
                    }
      ]
    }
]

// var tableEvent = { 
//     rowClick: (row) => {
//         console.log('row click ', row);
//         fetchContract(row.mahopdong)
//     }
// }


function backToList() {
    
        const url = new URL("/pages/staff/laborContract.html", window.location.origin);
  
}

function buildPayload(formValue) {
    const formClone = { ...formValue }

    formClone['trangThai'] = Number(formClone['trangThai'])

    return formClone
}
function showPopup() {
    var modal = document.getElementById("editLaborContract");
    modal.style.display = "block";
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            clearFormValues("editLaborContract");
        }
    } 
}

function closePopup(){
    var modal = document.getElementById("editLaborContract");
    modal.style.display="none"
}

function fetchContract(mahopdong) {
    console.log("ma hợp đồng : " +mahopdong);
    setLoading(true)
    maHopDongHienTai = mahopdong
    $.ajax({

        url: 'https://localhost:7141/api/HopDong/id?id=' + mahopdong,
        method: 'GET',
        success: function (data) {
            setFormValue('editLaborContract', data, 'fetch');
            setFormValue('editLaborContract', data)
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
    
    formValue['ma'] = maDetail;

    console.log('formValue ', formValue);
    const payload = buildPayload(formValue)
    setLoading(true)
    setTimeout(() => {
    $.ajax({
        
        url: 'https://localhost:7141/api/HopDong/TaoMoiHopDong',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(payload),
        success: function (data) {
            alert('Tạo Thành Công!');
            table.handleCallFetchData();
            clearFormValues("laborContract_form")
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

function handleRemove() {
    const isConfirm = confirm('Bạn chắc chắn muốn xóa hợp đồng lao động?')
    if (!isConfirm) return
    setLoading(true)
    setTimeout(() => {
    $.ajax({
        url: 'https://localhost:7141/api/HopDong/xoaHopDong/' + maHopDongHienTai,
        method: 'DELETE',
        success: function (data) {
            alert('Xóa Thành Công!');
            closePopup();
            table.handleCallFetchData();
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

function handleSave() {
    const isConfirm = confirm('Bạn chắc chắn muốn sửa hợp đồng lao động?')
    if (!isConfirm) return
    const formValue = getFormValues('editLaborContract')

    formValue['ma'] = maDetail;

    const payload = buildPayload(formValue)
    setLoading(true)
    setTimeout(() => {
    $.ajax({
        url: 'https://localhost:7141/api/HopDong/SuaMoiHopDong/' + maHopDongHienTai,
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(payload),
        success: function (data) {
            console.log('fetchContract res :: ', data);
            alert('Lưu Thành Công!');
            closePopup();
            table.handleCallFetchData();
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
    const clear = buildButton('cLear', 'plain', 'bx bx-eraser')

    createBtn.addEventListener('click', handleCreate)
    clear.addEventListener('click', function() {
        clearFormValues('laborContract_form');
    });

    actionEl.append(createBtn,clear)
}

function buildApiUrl() {
    return 'https://localhost:7141/api/HopDong/GetHopDongByMaNV/id?id=' + maDetail
}

document.addEventListener('DOMContentLoaded', () => {
    renderActionByStatus()
    popupRemoveBtn.addEventListener("click", handleRemove)
    popupSaveBtn.addEventListener("click", handleSave)
})

