const isEdit = !!id

let idTrinhDo = null
let idNgoaiNgu = null


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
            { type: 'plain', icon: 'bx bx-show', label: 'Chi tiết', onClick: (row) => { fetchContract(row.mahopdong) } },
            { type: 'red', icon: 'bx bx-trash', label: 'Xóa', onClick: (row) => { handleRemoveRow(row.mahopdong) } }
        ]
    }
]

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
            { type: 'plain', icon: 'bx bx-show', label: 'Chi tiết', onClick: (row) => { fetchContract(row.mahopdong) } },
            { type: 'red', icon: 'bx bx-trash', label: 'Xóa', onClick: (row) => { handleRemoveRow(row.mahopdong) } }
        ]
    }
]
function backToList() {
    const url = new URL("/pages/staff/laborContract.html", window.location.origin);
    url.searchParams.set("id", id);
    window.location.replace(url.toString());
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

function handleCreateTrinhDo() {
    const valid = validateForm('qualification_form')
    if (!valid) return
    const formValue = getFormValues('qualification_form')

    const urlParams = new URLSearchParams(window.location.search);
    const employeeId = urlParams.get('id');
    formValue['ma'] = employeeId;

    console.log(employeeId);
    console.log('formValue ', formValue);
    const payload = buildPayload(formValue)
    setLoading(true)
    $.ajax({
        
        url: 'https://localhost:7141/api/TrinhDoVanHoa/addTrinhDoVanHoa',
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

function handleRemoveRowTrinhDo(id) {
    const isConfirm = confirm('Xác nhận xóa')
    if (!isConfirm) return
    setLoading(true)
    $.ajax({
        url: 'https://localhost:7141/api/TrinhDoVanHoa/addTrinhDoVanHoa' + id,
        method: 'DELETE',
        success: function (data) {
            alert('Xóa Thành Công!');
            backToList();
        },
        error: (err) => {
            console.log('fetchTrinhDo err :: ', err);
            alert("Xóa thất bại!")
        },
        complete: () => {
            setLoading(false)
        }
    });
}

function handleSaveTrinhDo() {
    const formValue = getFormValues('qualification_form')
    const payload = buildPayload(formValue)
    setLoading(true)
    $.ajax({
        url: 'https://localhost:7141/api/TrinhDoVanHoa/updateTrinhDoVanHoa'  ,
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(payload),
        success: function (data) {
            console.log('fetchTrinhDo res :: ', data);
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

// -------------------------------------------------------------------------------------------------------------------------------


function fetchNgoaiNgu(id) {
    setLoading(true)
    idNgoaiNgu = id
    $.ajax({

        url: 'https://localhost:7141/api/HopDong/id?id=' + id,
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

function handleCreateNgoaiNgu() {
    const valid = validateForm('Language_form')
    if (!valid) return
    const formValue = getFormValues('Language_form')

    const urlParams = new URLSearchParams(window.location.search);
    const employeeId = urlParams.get('id');
    formValue['ma'] = employeeId;

    console.log(employeeId);
    console.log('formValue ', formValue);
    const payload = buildPayload1(formValue)
    setLoading(true)
    $.ajax({
        
        url: 'https://localhost:7141/api/NgoaiNgu/addNgoaiNgu',
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

function handleRemoveRowNgoaiNgu(id) {
    const isConfirm = confirm('Xác nhận xóa')
    if (!isConfirm) return
    setLoading(true)
    $.ajax({
        url: 'https://localhost:7141/api/NgoaiNgu/deleteNgoaiNgu/' + id,
        method: 'DELETE',
        success: function (data) {
            alert('Xóa Thành Công!');
            backToList();
        },
        error: (err) => {
            console.log('fetchNgoaiNgu err :: ', err);
            alert("Xóa thất bại!")
        },
        complete: () => {
            setLoading(false)
        }
    });
}

function handleSaveNgoaiNgu() {
    const formValue = getFormValues('Language_form')
    const payload = buildPayload1(formValue)
    setLoading(true)
    $.ajax({
        url: 'https://localhost:7141/api/NgoaiNgu/updateNgoaiNgu'  ,
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(payload),
        success: function (data) {
            console.log('fetchNgoaiNgu res :: ', data);
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
    const createBtn = buildButton('Thêm', 'green', 'bx bx-plus')
    const saveBtn = buildButton('Lưu', '', 'bx bx-save')
    createBtn.addEventListener('click', handleCreateTrinhDo)
    saveBtn.addEventListener('click', handleSaveTrinhDo)

    actionEl.append(createBtn, saveBtn)

    const actionE2 = document.getElementById('Language_form_action')
    const buildButton2 = (label, type, icon) => {
        const btnEl = document.createElement('base-button')
        btnE2.setAttribute('label', label)
        btnE2.setAttribute('type', type)
        btnE2.setAttribute('icon', icon)
        return btnE2
    }
    const createBtn2 = buildButton('Thêm', 'green', 'bx bx-plus')
    const saveBtn2 = buildButton('Lưu', '', 'bx bx-save')
    createBtn.addEventListener('click', handleCreateNgoaiNgu)
    saveBtn.addEventListener('click', handleSaveNgoaiNgu)

    actionE2.append(createBtn2, saveBtn2)
}

function buildApiUrl1() {
    return 'https://localhost:7141/api/TrinhDoVanHoa/getTrinhDoVanHoaByMaNV/' + id
}

function buildApiUrl2() {
    return 'https://localhost:7141/api/NgoaiNgu/getNgoaiNguByMaNV/' + id
}
document.addEventListener('DOMContentLoaded', () => {
    renderActionByStatus()
})

