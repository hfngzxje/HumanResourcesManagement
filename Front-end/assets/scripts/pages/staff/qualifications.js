
let idTrinhDo = null
let isPopupEdit = false
const vaiTroID = localStorage.getItem("vaiTroID")
const maDetail = localStorage.getItem("maDetail")
const table = document.querySelectorAll('base-table')
const popupRemoveTrinhDoBtn = document.getElementById("deleteBtn")
const popupUpdateTrinhDobtn = document.getElementById("updateBtn")
let oldTruong = null;
let oldChuyenNganh = null;

var TableColumns1 = [
    // {
    //     label: 'ID',
    //     key: 'id'
    // },
    {
        label: 'Mã nhân viên',
        key: 'ma'
    },
    {
        label: 'Tên trường',
        key: 'tentruong'
    },
    {
        label: 'Chuyên ngành',
        key: 'tenChuyenNganh',
    },
    {
        label: 'Trình độ',
        key: 'tenTrinhDo'
    },
    {
        label: 'Từ',
        key: 'tuthoigian',
        type: 'datetime'
    },
    {
        label: 'Đến',
        key: 'denthoigian',
        type: 'datetime'
    },
    {
        label: 'Hình thức đào tạo',
        key: 'tenHinhThuc'
    },
    {
        label: 'Hành động',
        key: 'action',
        actions: [
            {
                type: 'plain', icon: 'bx bx-save', label: 'Sửa', onClick: (row) => {
                    isPopupEdit = true
                    console.log('row click ', row);
                    fetchTrinhDo(row.id);
                    showPopup("editTrinhDo")
                }
            }
        ]
    }
]

function backToList() {
    const url = new URL("/pages/staff/qualifications.html", window.location.origin);
    window.location.replace(url.toString());
}

function showPopup(formId) {
    var modal = document.getElementById(formId);
    modal.style.display = "block";
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            clearFormValues("editTrinhDo");
        }
    }
    var closeButton = modal.querySelector('.close');
    closeButton.onclick = function () {
        modal.style.display = "none";
    }
}
function closePopup(formId) {
    var modal = document.getElementById(formId);
    modal.style.display = "none"
    clearFormValues("editTrinhDo")
}
function buildPayload(formValue) {
    const formClone = { ...formValue }

    formClone['id'] = idTrinhDo

    return formClone
}

function buildPayload1(formValue) {
    const formClone = { ...formValue }
    formClone['id'] = idNgoaiNgu
    return formClone
}
function fetchTrinhDo(id) {
    setLoading(true)
    idTrinhDo = id
    $.ajax({

        url: 'https://localhost:7141/api/TrinhDoVanHoa/getTrinhDoVanHoaById/' + id,
        method: 'GET',
        success: function (data) {
            setFormValue('editTrinhDo', data, 'fetch');
            setFormValue('editTrinhDo', data)
            oldTruong = data.tentruong
            oldChuyenNganh = data.chuyennganh
        },
        error: (err) => {
            console.log('fetchContract err :: ', err);
        },
        complete: () => {
            setLoading(false)
        }
    });
}

async function handleCreateTrinhDo() {
    await showConfirm("Bạn có chắc chắn muốn thêm mới trình độ ?")
    const valid = validateForm('trinhDo_form')
    if (!valid) return
    const formValue = getFormValues('trinhDo_form')

    formValue['ma'] = maDetail;
    console.log('formValue ', formValue);
    const payload = buildPayload(formValue)
    setLoading(true)
    setTimeout(() => {
        $.ajax({

            url: 'https://localhost:7141/api/TrinhDoVanHoa/addTrinhDoVanHoa',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(payload),
            success: function (data) {
                showSuccess('Tạo Thành Công!');
                recordActivityAdmin(maNhanVien, `Thêm mới trình độ nhân viên ${maDetail}: Trường_${formValue.tentruong}`);
                table.forEach(table => {
                    if (table.handleCallFetchData) {
                        table.handleCallFetchData();
                    }
                });
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

async function handleRemoveTrinhDo() {
    await showConfirm("Bạn có chắc chắn muốn xóa trình độ ?")
    setLoading(true)
    setTimeout(() => {
        $.ajax({
            url: 'https://localhost:7141/api/TrinhDoVanHoa/deleteTrinhDoVanHoa/' + idTrinhDo,
            method: 'DELETE',
            success: function (data) {
                showSuccess('Xóa Thành Công!');
                recordActivityAdmin(maNhanVien, `Xóa trình độ nhân viên ${maDetail} : ${oldTruong}`);
                closePopup("editTrinhDo")
                table.forEach(table => {
                    if (table.handleCallFetchData) {
                        table.handleCallFetchData();
                    }
                });

            },
            error: (err) => {
                console.log('fetchTrinhDo err :: ', err);
                showError("Xóa thất bại!")
            },
            complete: () => {
                setLoading(false)
            }
        });
    }, 1000);
}

async function handleSaveTrinhDo() {
    await showConfirm("Bạn có chắc chắn muốn sửa trình độ ?")
    const valid = validateForm('editTrinhDo')
    if (!valid) return
    const formValue = getFormValues('editTrinhDo')
    formValue['id'] = idTrinhDo
    const payload = buildPayload(formValue)
    setLoading(true)
    setTimeout(() => {
        $.ajax({
            url: 'https://localhost:7141/api/TrinhDoVanHoa/updateTrinhDoVanHoa',
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(payload),
            success: function (data) {
                console.log('fetchTrinhDo res :: ', data);
                showSuccess('Lưu Thành Công!')
                recordActivityAdmin(maNhanVien, `Sửa trình độ nhân viên ${maDetail}: ${payload.tentruong}`);
                closePopup("editTrinhDo")
                table.forEach(table => {
                    if (table.handleCallFetchData) {
                        table.handleCallFetchData();
                    }
                });
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

// -------------------------------------------------------------------------------------------------------------------------------

function renderActionByStatus() {
    const actionEl = document.getElementById('qualification_form_action')
    const buildButton = (label, type, icon) => {
        const btnEl = document.createElement('base-button')
        btnEl.setAttribute('label', label)
        btnEl.setAttribute('type', type)
        btnEl.setAttribute('icon', icon)
        return btnEl
    }
    const createTrinhDo = buildButton('Thêm', 'green', 'bx bx-plus')
    // createTrinhDo.addEventListener('click', handleCreateTrinhDo)
    createTrinhDo.addEventListener('click', handleCreateTrinhDo)

    actionEl.append(createTrinhDo)

}

function buildApiUrl1() {
    return 'https://localhost:7141/api/TrinhDoVanHoa/getTrinhDoVanHoaByMaNV/' + maDetail
}

document.addEventListener('DOMContentLoaded', () => {
    renderActionByStatus()
    popupRemoveTrinhDoBtn.addEventListener("click", handleRemoveTrinhDo)
    popupUpdateTrinhDobtn.addEventListener("click", handleSaveTrinhDo)

})


