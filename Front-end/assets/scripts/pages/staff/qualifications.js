
let idTrinhDo = null
let isPopupEdit = false
const vaiTroID = localStorage.getItem("vaiTroID")
const maDetail = localStorage.getItem("maDetail")
const table = document.querySelectorAll('base-table')
const popupRemoveTrinhDoBtn = document.getElementById("deleteBtn")
const popupUpdateTrinhDobtn = document.getElementById("updateBtn")


var TableColumns1 = [
    {
        label: 'Tên trường',
        key: 'tentruong'
    },
    {
        label: 'Chuyên ngành',
        key: 'chuyennganh',
        type: 'currency'
    },
    {
        label: 'Trình độ',
        key: 'trinhdo'
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
        key: 'hinhthucdaotao'
    },
    {
        label: 'Hành động',
        key: 'action',
        actions: [
            {
                type: 'plain', icon: 'bx bx-save', label: 'Sửa', onClick: (row) => {
                    isPopupEdit = true
                    fetchTrinhDo(row.id);
                    showPopup("editTrinhDo")
                }
            }
        ]
    }
]
var tableEventQualification = { // global: ở đau cũng truy cập được
    rowClick: (row) => {
        console.log('row click ', row);
        fetchTrinhDo(row.idTrinhDo)
    }
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
}
function closePopup(formId) {
    var modal = document.getElementById(formId);
    modal.style.display = "none"
    clearFormValues(formId)
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

        url: 'https://localhost:7141/api/TrinhDoVanHoa/getTrinhDoVanHoaByMaNV/' + maDetail,
        method: 'GET',
        success: function (data) {
            setFormValue('editTrinhDo', data, 'fetch');
            setFormValue('editTrinhDo', data)
        },
        error: (err) => {
            console.log('fetchContract err :: ', err);
        },
        complete: () => {
            setLoading(false)
        }
    });
}

function handleCreateTrinhDo() {
    const isConfirm = confirm('Bạn chắc chắn muốn thêm trình độ văn hóa?')
    if (!isConfirm) return
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
                alert('Tạo Thành Công!');
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

function handleRemoveTrinhDo() {
    const isConfirm = confirm('Bạn chắc chắn muốn Xóa trình độ văn hóa?')
    if (!isConfirm) return
    setLoading(true)
    setTimeout(() => {
        $.ajax({
            url: 'https://localhost:7141/api/TrinhDoVanHoa/deleteTrinhDoVanHoa/' + id,
            method: 'DELETE',
            success: function (data) {
                alert('Xóa Thành Công!');
                closePopup("editTrinhDo")
                table.forEach(table => {
                    if (table.handleCallFetchData) {
                        table.handleCallFetchData();
                    }
                });

            },
            error: (err) => {
                console.log('fetchTrinhDo err :: ', err);
                alert("Xóa thất bại!")
            },
            complete: () => {
                setLoading(false)
            }
        });
    }, 1000);
}

function handleSaveTrinhDo() {
    const isConfirm = confirm('Bạn chắc chắn muốn sửa trình độ văn hóa?')
    if (!isConfirm) return
    const formValue = getFormValues('editTrinhDo')
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
                alert('Lưu Thành Công!');
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

