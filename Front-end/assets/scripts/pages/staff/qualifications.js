
let idTrinhDo = null
let idNgoaiNgu = null
let isPopupEdit = false
const vaiTroID = localStorage.getItem("vaiTroID")
const maDetail = localStorage.getItem("maDetail")
const table = document.querySelectorAll('base-table')
const popupRemoveTrinhDoBtn = document.getElementById("deleteBtn")
const popupUpdateTrinhDobtn = document.getElementById("updateBtn")
const popupCreateTrinhDoBtn = document.getElementById("createBtn")
const popupClearTrinhDobtn = document.getElementById("clearBtn")

const popupRemoveNgoaiNguBtn = document.getElementById("deleteNgoaiNguBtn")
const popupUpdateNgoaiNgubtn = document.getElementById("updateNgoaiNguBtn")
const popupCreateNgoaiNguBtn = document.getElementById("createNgoaiNguBtn")
const popupClearNgoaiNgubtn = document.getElementById("clearNgoaiNguBtn")

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
                    fetchTrinhDo(row.id);
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
    if (isPopupEdit && formId==="editTrinhDo") {
        const popupTitle = modal.querySelector('h2')
        popupTitle.textContent = "Sửa Trình độ"
        popupRemoveTrinhDoBtn.classList.remove('hidden')
        popupUpdateTrinhDobtn.classList.remove('hidden')
        popupCreateTrinhDoBtn.classList.add('hidden')
        popupClearTrinhDobtn.classList.add('hidden')
    } else if (!isPopupEdit && formId==="editTrinhDo") {
        const popupTitle = modal.querySelector('h2')
        popupTitle.textContent = "Thêm mới trình độ"
        popupUpdateTrinhDobtn.classList.add('hidden')
        popupRemoveTrinhDoBtn.classList.add('hidden')
        popupCreateTrinhDoBtn.classList.remove('hidden')
        popupClearTrinhDobtn.classList.remove('hidden')
    }
    else if (isPopupEdit && formId==="editNgoaiNgu") {
        const popupTitle = modal.querySelector('h2') 
        popupTitle.textContent = "Sửa ngoại ngữ"
        popupRemoveNgoaiNguBtn.classList.remove('hidden')
        popupUpdateNgoaiNgubtn.classList.remove('hidden')
        popupCreateNgoaiNguBtn.classList.add('hidden')
        popupClearNgoaiNgubtn.classList.add('hidden')
    }
    else if (!isPopupEdit && formId==="editNgoaiNgu") {
        const popupTitle = modal.querySelector('h2')
        popupTitle.textContent = "Thêm mới ngoại ngữ"
        popupUpdateNgoaiNgubtn.classList.add('hidden')
        popupRemoveNgoaiNguBtn.classList.add('hidden')
        popupCreateNgoaiNguBtn.classList.remove('hidden')
        popupClearNgoaiNgubtn.classList.remove('hidden')
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

        url: 'https://localhost:7141/api/HopDong/id?id=' + id,
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
    const valid = validateForm('editTrinhDo')
    if (!valid) return
    const formValue = getFormValues('editTrinhDo')

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
                closePopup("editTrinhDo")
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
    const valid = validateForm('editNgoaiNgu')
    if (!valid) return
    const formValue = getFormValues('editNgoaiNgu')
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
    const createTrinhDo = buildButton('Thêm', 'green', 'bx bx-plus')
    // createTrinhDo.addEventListener('click', handleCreateTrinhDo)
    createTrinhDo.addEventListener('click', function () {
        isPopupEdit = false
        showPopup("editTrinhDo")
    });

    actionEl.append(createTrinhDo)

    const actionE2 = document.getElementById('Language_form_action')

    const createNgoaiNgu = buildButton('Thêm', 'green', 'bx bx-plus')
    // createNgoaiNgu.addEventListener('click', handleCreateNgoaiNgu)
    createNgoaiNgu.addEventListener('click', function () {
        isPopupEdit = false
        showPopup("editNgoaiNgu")
    });

    actionE2.append(createNgoaiNgu)
}

function buildApiUrl1() {
    return 'https://localhost:7141/api/TrinhDoVanHoa/getTrinhDoVanHoaByMaNV/' + maDetail
}

function buildApiUrl2() {
    return 'https://localhost:7141/api/NgoaiNgu/getNgoaiNguByMaNV/' + maDetail
}
document.addEventListener('DOMContentLoaded', () => {
    renderActionByStatus()
    popupRemoveTrinhDoBtn.addEventListener("click", handleRemoveTrinhDo)
    popupUpdateTrinhDobtn.addEventListener("click", handleSaveTrinhDo)
    popupCreateTrinhDoBtn.addEventListener("click", handleCreateTrinhDo)
    popupClearTrinhDobtn.addEventListener("click", clearFormValues("editTrinhDo"))

    popupRemoveNgoaiNguBtn.addEventListener("click", handleRemoveNgoaiNgu)
    popupUpdateNgoaiNgubtn.addEventListener("click", handleSaveNgoaiNgu)
    popupCreateNgoaiNguBtn.addEventListener("click", handleCreateNgoaiNgu)
    popupClearNgoaiNgubtn.addEventListener("click", clearFormValues("editNgoaiNgu"))

})

