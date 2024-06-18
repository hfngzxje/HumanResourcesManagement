
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
            { type: 'red', icon: 'bx bx-trash', label: 'Xóa', onClick: (row) => { handleRemoveRowTrinhDo(row.id) } }
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
            { type: 'red', icon: 'bx bx-trash', label: 'Xóa', onClick: (row) => { handleRemoveRowNgoaiNgu(row.id) } }
        ]
    }
]
var tableEventLanguage = { // global: ở đau cũng truy cập được
    rowClick: (row) => {
        console.log('row click ', row);
        fetchNgoaiNgu(row.idNgoaiNgu)
    }
}
function backToList() {
    const url = new URL("/pages/staff/qualifications.html", window.location.origin);
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
        url: 'https://localhost:7141/api/TrinhDoVanHoa/deleteTrinhDoVanHoa/' + id,
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
    const createTrinhDo = buildButton('Thêm', 'green', 'bx bx-plus')
    const saveTrinhDo = buildButton('Lưu', '', 'bx bx-save')
    createTrinhDo.addEventListener('click', handleCreateTrinhDo)
    saveTrinhDo.addEventListener('click', handleSaveTrinhDo)

    actionEl.append(createTrinhDo, saveTrinhDo)

    const actionE2 = document.getElementById('Language_form_action')

    const createNgoaiNgu = buildButton('Thêm', 'green', 'bx bx-plus')
    const saveNgoaiNgu = buildButton('Lưu', '', 'bx bx-save')
    createNgoaiNgu.addEventListener('click', handleCreateNgoaiNgu)
    saveNgoaiNgu.addEventListener('click', handleSaveNgoaiNgu)

    actionE2.append(createNgoaiNgu, saveNgoaiNgu)
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

