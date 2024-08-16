
let idNgoaiNgu = null
let isPopupEdit = false
const vaiTroID = localStorage.getItem("vaiTroID")
const maDetail = localStorage.getItem("maDetail")
const table = document.querySelectorAll('base-table')

const popupRemoveNgoaiNguBtn = document.getElementById("deleteNgoaiNguBtn")
const popupUpdateNgoaiNgubtn = document.getElementById("updateNgoaiNguBtn")


var TableColumns2 = [
    {
        label: 'Mã nhân viên',
        key: 'ma'
    },
    {
        label: 'Ngoại ngữ',
        key: 'tenNgoaiNgu'
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
    var closeButton = modal.querySelector('.close');
    closeButton.onclick = function () {
        modal.style.display = "none";
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

        url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/NgoaiNgu/getNgoaiNguById/' + id,
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

async function handleCreateNgoaiNgu() {
    await showConfirm("Bạn có chắc chắn muốn thêm mới ngoại ngữ ?")
    const valid = validateForm('ngoaiNgu_form')
    if (!valid) return
    const formValue = getFormValues('ngoaiNgu_form')
    formValue['ma'] = maDetail;
    console.log('formValue ', formValue);
    const payload = buildPayload1(formValue)
    setLoading(true)
    setTimeout(() => {
        $.ajax({

            url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/NgoaiNgu/addNgoaiNgu',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(payload),
            success: function (data) {
                showSuccess('Tạo Thành Công!');
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

async function handleRemoveNgoaiNgu(id) {
    await showConfirm("Bạn có chắc chắn muốn xóa ngoại ngữ ?")
    setLoading(true)
    setTimeout(() => {
        $.ajax({
            url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/NgoaiNgu/deleteNgoaiNgu/' + idNgoaiNgu,
            method: 'DELETE',
            success: function (data) {
                showSuccess('Xóa Thành Công!');
                // recordActivityAdmin(maNhanVien, `Xóa ngoại ngữ ${maDetail} : ${oldng}`);
                closePopup("editNgoaiNgu")
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

async function handleSaveNgoaiNgu() {
    await showConfirm("Bạn có chắc chắn muốn sửa ngoại ngữ ?")
    const formValue = getFormValues('editNgoaiNgu')
    formValue['id'] = idNgoaiNgu
    const payload = buildPayload1(formValue)
    setLoading(true)
    setTimeout(() => {
        $.ajax({
            url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/NgoaiNgu/updateNgoaiNgu',
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(payload),
            success: function (data) {
                console.log('fetchNgoaiNgu res :: ', data);
                showSuccess('Lưu Thành Công!');
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
    return 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/NgoaiNgu/getNgoaiNguByMaNV/' + maDetail
}
document.addEventListener('DOMContentLoaded', () => {
    renderActionByStatus()

    popupRemoveNgoaiNguBtn.addEventListener("click", handleRemoveNgoaiNgu)
    popupUpdateNgoaiNgubtn.addEventListener("click", handleSaveNgoaiNgu)

})

