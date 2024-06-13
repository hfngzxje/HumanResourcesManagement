const isEdit = !!id

var MaritalOptions = [
    { label: 'Đã kết hôn', value: 1 },
    { label: 'Chưa kết hôn', value: 0 },
]


function backToListDelete() {
    window.location.replace("/pages/staff/list.html");
}
function backToListUpdate() {
    const url = new URL("/pages/staff/resume.html", window.location.origin);
    url.searchParams.set("id", id);
    window.location.replace(url.toString());
}

function buildPayload(formValue) {
    const formClone = {...formValue}
  
    return formClone
}

function getImage() {
    $.ajax({
        url: 'https://localhost:7141/api/Image/getImage?maNV=' + id,
        method: 'GET',
        success: function(data) {
            const imgEl = document.querySelector('#employeeImage')
            imgEl.setAttribute('src', `data:image/png;base64, ${data}`)
            imgEl.classList.remove('opacity-0')
        },
        error: (err) => {
            console.log('fetchEmployee err :: ', err);
        },
        complete: () => {
            setLoading(false)
        }
    });
}

function fetchEmployee() {
    setLoading(true)
    $.ajax({
        url: 'https://localhost:7141/api/NhanVien/id?id=' + id,
        method: 'GET',
        success: function(data) {
            setFormValue('resume_form', data)
        },
        error: (err) => {
            console.log('fetchEmployee err :: ', err);
        },
        complete: () => {
            setLoading(false)
        }
    });
}

function handleCreate() {
    const valid = validateForm('resume_form')
    if(!valid) return
    const {anh, ...rest} = getFormValues('resume_form')
    const payload = buildPayload(rest)
    setLoading(true)
    $.ajax({
        url: 'https://localhost:7141/api/NhanVien/TaoMoiNhanVien',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(payload),
        success: function(data) {
            console.log('fetchEmployee res :: ', data);
            // backToList()
        },
      
        error: (err) => {
            console.log('err ', err);
            try {
                if(!err.responseJSON) {
                    alert(err.responseText)
                    return 
                }
                const errObj = err.responseJSON.errors
                const firtErrKey = Object.keys(errObj)[0]
                const message = errObj[firtErrKey][0]
                alert(message)
            } catch (error) {
                alert("Tạo thất bại!")
            }
        },
        complete: () => {
            setLoading(false)
        }
    });
}

function handleSave() {
    const valid = validateForm('resume_form')
    if(!valid) return
    
    const {anh, ...rest} = getFormValues('resume_form')

    const formValue = getFormValues('resume_form')
    const payload = buildPayload(rest)
    setLoading(true)
    $.ajax({
        url: 'https://localhost:7141/api/NhanVien/ChinhSuaNhanVien/' + id,
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(payload),
        success: function(data) {
            // Lưu thông tin nhân viên thành công
            if (anh) {
                uploadImage(anh);
            } else {
                setLoading(false);
                backToListUpdate();
            }
        },
        error: (err) => {
            console.log('err ', err);
            try {
                if(!err.responseJSON) {
                    alert(err.responseText)
                    setLoading(false)
                    return 
                }
                const errObj = err.responseJSON.errors
                const firtErrKey = Object.keys(errObj)[0]
                const message = errObj[firtErrKey][0]
                alert(message)
                setLoading(false)
            } catch (error) {
                alert("Cập nhật thất bại!")
                setLoading(false)
            }
        },
        complete: () => {
            
        }
    });
}

function uploadImage(anh) {
    const payloadUploadImage = new FormData()
    payloadUploadImage.append('maNV', id)
    payloadUploadImage.append('file', anh)

    $.ajax({
        url: 'https://localhost:7141/api/Image/uploadImage',
        method: 'POST',
        contentType: false,
        processData: false,
        data: payloadUploadImage,
        success: function(data) {
            setLoading(false);
            backToListUpdate();
        },
        error: (err) => {
            console.log('err ', err);
            try {
                if(!err.responseJSON) {
                    alert(err.responseText)
                    setLoading(false)
                    return 
                }
                const errObj = err.responseJSON.errors
                const firtErrKey = Object.keys(errObj)[0]
                const message = errObj[firtErrKey][0]
                alert(message)
                setLoading(false)
            } catch (error) {
                alert("Cập nhật thất bại!")
                setLoading(false)
            }
        },
        complete: () => {
            
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
    const actionEl = document.getElementById('resume_form_action')
    const buildButton = (label, type, icon) => {
        const btnEl = document.createElement('base-button')
        btnEl.setAttribute('label', label)
        btnEl.setAttribute('type', type)
        btnEl.setAttribute('icon', icon)
        return btnEl
    }
    if (!isEdit) {
        const createBtn = buildButton('Thêm', 'green', 'bx bx-plus')
        const clear = buildButton('cLear', 'plain', 'bx bx-eraser')
        createBtn.addEventListener('click', handleCreate)
        clear.addEventListener('click', function() {
            clearFormValues('resume_form');
        });
        actionEl.append(createBtn,clear)
        return
    }
    const saveBtn = buildButton('Lưu', '', 'bx bx-save')
    const clear = buildButton('cLear', 'plain', 'bx bx-eraser')

    saveBtn.addEventListener('click', handleSave)
    clear.addEventListener('click', function() {
        clearFormValues('resume_form');
    });

    actionEl.append(saveBtn, clear)
}

document.addEventListener('DOMContentLoaded', () => {
    renderActionByStatus()
    console.log('id ', id);
    if (id) {
        fetchEmployee()
        getImage()
    }
})

