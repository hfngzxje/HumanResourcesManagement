
const isEdit = !!maNhanVien
const vaiTroID = localStorage.getItem("vaiTroID")
const maDetail = localStorage.getItem("maDetail")

var BankList = [
    { label: 'Vietcombank', value: 'VCB' },
    { label: 'BIDV', value: 'BIDV' },
    { label: 'Agribank', value: 'AGB' },
    { label: 'VietinBank', value: 'VTB' },
    { label: 'ACB', value: 'ACB' },
    { label: 'Techcombank', value: 'TCB' },
    { label: 'MB Bank', value: 'MB' },
    { label: 'TPBank', value: 'TPB' },
    { label: 'VPBank', value: 'VPB' },
    { label: 'SHB', value: 'SHB' },
    { label: 'SeABank', value: 'SEA' },
    { label: 'HDBank', value: 'HDB' },
    { label: 'OCB', value: 'OCB' },
    { label: 'NCB', value: 'NCB' },
    { label: 'PVcomBank', value: 'PVC' },
    { label: 'Sacombank', value: 'SCB' },
    { label: 'LienVietPostBank', value: 'LPB' },
    { label: 'VIB', value: 'VIB' },
    { label: 'MSB', value: 'MSB' },
    { label: 'VP Bank', value: 'VPB' }
  ];

function backToListUpdate() {
    const url = new URL("/pages/staff/profile.html", window.location.origin);
    url.searchParams.set("id", maNhanVien);
    window.location.replace(url.toString());
}
function getImage() {
    $.ajax({
        url: 'https://localhost:7141/api/Image/getImage?maNV=' + maDetail,
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
        url: 'https://localhost:7141/api/NhanVien/id?id=' + maDetail,
        method: 'GET',
        success: function(data) {
            setFormValue('profile_form', data)
        },
        error: (err) => {
            console.log('fetchEmployee err :: ', err);
        },
        complete: () => {
            setLoading(false)
        }
    });
}



function uploadImage(anh) {
    const payloadUploadImage = new FormData()
    payloadUploadImage.append('maNV', maDetail)
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
                setLoading(false)            } catch (error) {
                alert("Cập nhật thất bại!")
                setLoading(false)
            }
        },
        complete: () => {
            
        }
    });
}

function handleSave() {
    const isConfirm = confirm('Bạn chắc chắn muốn sửa hồ sơ ?')
    if (!isConfirm) return
    const valid = validateForm('profile_form')
    if(!valid) return
    
    const {anh, ...rest} = getFormValues('profile_form')

    const formValue = getFormValues('profile_form')
    const payload = buildPayload(rest)
    setLoading(true)
    $.ajax({
        url: 'https://localhost:7141/api/NhanVien/ChinhSuaNhanVien/' + maDetail,
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(payload),
        success: function(data) {
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
    const actionEl = document.getElementById('profile_form_action')
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
        // createBtn.addEventListener('click', handleCreate)
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
        clearFormValues('profile_form');
    });

    actionEl.append(saveBtn, clear)
}

document.addEventListener('DOMContentLoaded', () => {
    // if (vaiTroID !== "1") {
    //     window.location.href = "/pages/error.html";
    //     return;
    // }
    renderActionByStatus()
    if (maNhanVien) {
        fetchEmployee()
        getImage()
        
    }

    const apiUrl = 'https://localhost:7141/api/NhanVien/id?id=' + maDetail;

    // Thực hiện yêu cầu API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Cập nhật nội dung của thẻ <p>
            const nameText = document.getElementById('name-text');
            nameText.textContent = data.ten; // Giả sử API trả về một thuộc tính `description`
            const emailText = document.getElementById('email-text');
            emailText.textContent = data.email; 
            const anh = document.getElementById('anh_text');
            // anh.alt = data.anh; 
        })
        .catch(error => {
            console.error('Error fetching the data:', error);
        });
})