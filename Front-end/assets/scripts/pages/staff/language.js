
let idNgoaiNgu = null
let isPopupEdit = false
const vaiTroID = localStorage.getItem("vaiTroID")
const maDetail = localStorage.getItem("maDetail")
const table = document.querySelectorAll('base-table')

const popupRemoveNgoaiNguBtn = document.getElementById("deleteNgoaiNguBtn")
const popupUpdateNgoaiNgubtn = document.getElementById("updateNgoaiNguBtn")


var TableColumns2 = [
    {
        label: 'Ngoại ngữ',
        key: 'ngoaingu'
    },
    {
        label: 'Ngày cấp',
        key: 'ngaycap',
        type: 'datetime'
    },
    {
        label: 'Nơi cấp',
        key: 'noicap'
    },
    {
        label: 'Trình độ',
        key: 'trinhdo'
    },
    {
        label: 'Hành động',
        key: 'action',
        actions: [
            {
                type: 'plain', icon: 'bx bx-save', label: 'Sửa', onClick: (row) => {
                    isPopupEdit = true
                    fetchNgoaiNgu(row.id);
                    showPopup("editNgoaiNgu")
                }
            }
        ]
    }
]
var tableEventLanguage = { // global: ở đau cũng truy cập được
    rowClick: (row) => {
        console.log('row click ', row);
        fetchNgoaiNgu(row.idNgoaiNgu)
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
            clearFormValues("editNgoaiNgu")
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

// -------------------------------------------------------------------------------------------------------------------------------


function fetchNgoaiNgu(id) {
    setLoading(true)
    idNgoaiNgu = id
    $.ajax({

        url: 'https://localhost:7141/api/HopDong/id?id=' + id,
        method: 'GET',
        success: function (data) {
            setFormValue('editNgoaiNgu', data, 'fetch');
            setFormValue('editNgoaiNgu', data)
        },
        error: (err) => {
            console.log('fetchContract err :: ', err);
        },
        complete: () => {
            setLoading(false)
        }
    });
}

function handleCreateNgoaiNgu() {
    const isConfirm = confirm('Bạn chắc chắn muốn thêm ngoại ngữ?')
    if (!isConfirm) return
    const valid = validateForm('ngoaiNgu_form')
    if (!valid) return
    const formValue = getFormValues('ngoaiNgu_form')
    formValue['ma'] = maDetail;
    console.log('formValue ', formValue);
    const payload = buildPayload1(formValue)
    setLoading(true)
    setTimeout(() => {
        $.ajax({

            url: 'https://localhost:7141/api/NgoaiNgu/addNgoaiNgu',
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

function handleRemoveNgoaiNgu(id) {

    const isConfirm = confirm('Bạn chắc chắn muốn Xóa ngoại ngữ?')
    if (!isConfirm) return
    setLoading(true)
    setTimeout(() => {
        $.ajax({
            url: 'https://localhost:7141/api/NgoaiNgu/deleteNgoaiNgu/' + id,
            method: 'DELETE',
            success: function (data) {
                alert('Xóa Thành Công!');
                closePopup("editNgoaiNgu")
                table.forEach(table => {
                    if (table.handleCallFetchData) {
                        table.handleCallFetchData();
                    }
                });
            },
            error: (err) => {
                console.log('fetchNgoaiNgu err :: ', err);
                alert("Xóa thất bại!")
            },
            complete: () => {
                setLoading(false)
            }
        });
    }, 1000);
}

function handleSaveNgoaiNgu() {
    const isConfirm = confirm('Bạn chắc chắn muốn sửa ngoại ngữ?')
    if (!isConfirm) return
    const formValue = getFormValues('editNgoaiNgu')
    const payload = buildPayload1(formValue)
    setLoading(true)
    setTimeout(() => {
        $.ajax({
            url: 'https://localhost:7141/api/NgoaiNgu/updateNgoaiNgu',
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(payload),
            success: function (data) {
                console.log('fetchNgoaiNgu res :: ', data);
                alert('Lưu Thành Công!');
                closePopup("editNgoaiNgu")
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


// -----------------------------------------------------------------------------------------------------------------------------------
function renderActionByStatus() {
    const actionEl = document.getElementById('qualification_form_action')
    const buildButton = (label, type, icon) => {
        const btnEl = document.createElement('base-button')
        btnEl.setAttribute('label', label)
        btnEl.setAttribute('type', type)
        btnEl.setAttribute('icon', icon)
        return btnEl
    }

    const actionE2 = document.getElementById('Language_form_action')

    const createNgoaiNgu = buildButton('Thêm', 'green', 'bx bx-plus')
    // createNgoaiNgu.addEventListener('click', handleCreateNgoaiNgu)
    createNgoaiNgu.addEventListener('click', handleCreateNgoaiNgu)

    actionE2.append(createNgoaiNgu)
}

function buildApiUrl2() {
    return 'https://localhost:7141/api/NgoaiNgu/getNgoaiNguByMaNV/' + maDetail
}
document.addEventListener('DOMContentLoaded', () => {
    renderActionByStatus()

    popupRemoveNgoaiNguBtn.addEventListener("click", handleRemoveNgoaiNgu)
    popupUpdateNgoaiNgubtn.addEventListener("click", handleSaveNgoaiNgu)

})

