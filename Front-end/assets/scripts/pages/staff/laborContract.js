const vaiTroID = localStorage.getItem("vaiTroID")
let maHopDongHienTai = null
const table = document.querySelector('base-table')
const popupRemoveBtn = document.getElementById("deleteBtn")
const popupSaveBtn = document.getElementById("updateBtn")
var maDetail = localStorage.getItem('maDetail')

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
        key: 'trangThai',
        formatGiaTri: (value) => {
            let result = { text: 'Hết hạn', color: 'red' };
            if (value === 1) {
                result.text = 'Còn hạn';
                result.color = 'blue';
            }
            return result;
        }
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
    var closeButton = modal.querySelector('.close');
    closeButton.onclick = function () {
        modal.style.display = "none";
    }
}

function closePopup() {
    var modal = document.getElementById("editLaborContract");
    modal.style.display = "none"
}

function fetchContract(mahopdong) {
    console.log("ma hợp đồng : " + mahopdong);
    setLoading(true)
    maHopDongHienTai = mahopdong
    $.ajax({

        url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/HopDong/id?id=' + mahopdong,
        url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/HopDong/id?id=' + mahopdong,
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

async function handleCreate() {
    await showConfirm("Bạn có chắc chắn muốn thêm mới hợp đồng ?")
    const valid = validateForm('laborContract_form')
    if (!valid) return
    const formValue = getFormValues('laborContract_form')

    formValue['ma'] = maDetail;

    console.log('formValue ', formValue);
    const payload = buildPayload(formValue)
    setLoading(true)
    setTimeout(() => {
    $.ajax({
        
        url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/HopDong/TaoMoiHopDong',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(payload),
        success:async function (data) {
           await showSuccess('Tạo Thành Công!');
            table.handleCallFetchData();
            clearFormValues("laborContract_form")
            await closePopup()
                await  showNavigation('Tạo mới hồ sơ lương cho hợp đồng !', 'salaryRecord.html')
                resolve();

            },
            error: (err) => {
                console.log('err ', err);
                try {
                    if (!err.responseJSON) {
                        showError(err.responseText)
                        return
                    }
                    const errObj = err.responseJSON.errors
                    const firtErrKey = Object.keys(errObj)[0]
                    const message = errObj[firtErrKey][0]
                    showError(message)
                } catch (error) {
                    showError("Tạo mới không thành công!")
                }


            },
            complete: () => {
                setLoading(false)
            }
        });
    }, 1000);
}

async function handleRemove() {
    await showConfirm("Bạn có chắc chắn muốn xóa hợp đồng ?")
    setLoading(true)
    setTimeout(() => {
    $.ajax({
        url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/HopDong/xoaHopDong/' + maHopDongHienTai,
        method: 'DELETE',
        success: function (data) {
            showSuccess('Xóa Thành Công!');
            closePopup();
            table.handleCallFetchData();
        },
        error: (err) => {
            console.log('fetchContract err :: ', err);
            showError("Xóa thất bại!")
        },
        complete: () => {
            setLoading(false)
        }
    });
}, 1000); 
}

async function handleSave() {
    await showConfirm("Bạn có chắc chắn muốn sửa hợp đồng ?")
    const valid = validateForm('editLaborContract')
    if (!valid) return
    const formValue = getFormValues('editLaborContract')
    formValue['ma'] = maDetail;

    const payload = buildPayload(formValue)
    setLoading(true)
    setTimeout(() => {
    $.ajax({
        url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/HopDong/SuaMoiHopDong/' + maHopDongHienTai,
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(payload),
        success: function (data) {
            console.log('fetchContract res :: ', data);
            showSuccess('Lưu Thành Công!');
            closePopup();
            table.handleCallFetchData();
        },
        error: (err) => {
            console.log('err ', err);
            try {
                if (!err.responseJSON) {
                    showError(err.responseText)
                    return
                }
                const errObj = err.responseJSON.errors
                const firtErrKey = Object.keys(errObj)[0]
                const message = errObj[firtErrKey][0]
                showError(message)
            } catch (error) {
                showError("Cập nhật thất bại!")
            }
        },
        complete: () => {
            setLoading(false)
        }
    });
}, 1000); 
}

function renderActionByStatus() {
    const actionEl = document.getElementById('laborContract_form_action')
    const buildButton = (id, label, type, icon) => {
        const btnEl = document.createElement('base-button')
        btnEl.setAttribute('id', id)
        btnEl.setAttribute('label', label)
        btnEl.setAttribute('type', type)
        btnEl.setAttribute('icon', icon)
        return btnEl
    }
    const createBtn = buildButton('themId', 'Thêm', 'green', 'bx bx-plus')
    const clear = buildButton('clearId', 'cLear', 'plain', 'bx bx-eraser')

    createBtn.addEventListener('click', handleCreate)
    clear.addEventListener('click', function () {
        clearFormValues('laborContract_form');
    });

    actionEl.append(createBtn, clear)
}

function buildApiUrl() {
    return 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/HopDong/GetHopDongByMaNV/id?id=' + maDetail
    return 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/HopDong/GetHopDongByMaNV/id?id=' + maDetail
}

document.addEventListener('DOMContentLoaded', () => {
    renderActionByStatus()
    popupRemoveBtn.addEventListener("click", handleRemove)
    popupSaveBtn.addEventListener("click", handleSave)
})

