

const vaiTroID = localStorage.getItem("vaiTroID")
const maNhanVien = localStorage.getItem("maNhanVien")
const isEdit = !!maNhanVien

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


function getImage() {
    $.ajax({
        url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/Image/getImage?maNV=' + maNhanVien,
        method: 'GET',
        success: function (data) {
            const imgEl = document.querySelector('#employeeImage');
            if (!imgEl) {
                console.error('Image element not found');
                return;
            }
            if (data && typeof data === 'string' && data.trim() !== '') {
                imgEl.setAttribute('src', `data:image/png;base64,${data}`);
                imgEl.classList.remove('opacity-0');
            } else {

                imgEl.setAttribute('src', '');
            }
        },
        error: (err) => {
            console.error('fetchEmployee err :: ', err);
        },
        complete: () => {
            setLoading(false);
        }
    });
}

function fetchEmployee() {
    setLoading(true)
    $.ajax({
        url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/NhanVien/GetById?id=' + maNhanVien,
        method: 'GET',
        success: function (data) {

            setTimeout(() => {
                setFormValue('profile_form', data)
            }, 1000);
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
    payloadUploadImage.append('maNV', maNhanVien)
    payloadUploadImage.append('file', anh)

    $.ajax({
        url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/Image/uploadImage',
        method: 'POST',
        contentType: false,
        processData: false,
        data: payloadUploadImage,
        success: function (data) {
            setLoading(false);
        },
        error: (err) => {
            console.log('err ', err);
            try {
                if (!err.responseJSON) {
                    showError(err.responseText)
                    setLoading(false)
                    return
                }
                const errObj = err.responseJSON.errors
                const firtErrKey = Object.keys(errObj)[0]
                const message = errObj[firtErrKey][0]
                showError(message)
                setLoading(false)
            } catch (error) {
                showError("Cập nhật thất bại!")
                setLoading(false)
            }
        },
        complete: () => {

        }
    });
}

async function handleSave() {
    await showConfirm("Bạn có chắc chắn muốn sửa thông tin cá nhân ?")
    const valid = validateForm('profile_form')
    if (!valid) return

    const { anh, ...rest } = getFormValues('profile_form')

    const formValue = getFormValues('profile_form')
    const payload = buildPayload(rest)
    setLoading(true)
    $.ajax({
        url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/NhanVien/ChinhSuaNhanVien/' + maNhanVien,
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(payload),
        success: function (data) {
            if (anh) {
                showSuccess('Cập nhật thành công!');
                uploadImage(anh);
            } else {
                showSuccess('Cập nhật thành công!');
                setLoading(false);
            }
        },
        error: (err) => {
            console.log('err ', err);
            try {
                if (!err.responseJSON) {
                    showError(err.responseText)
                    setLoading(false)
                    return
                }
                const errObj = err.responseJSON.errors
                const firtErrKey = Object.keys(errObj)[0]
                const message = errObj[firtErrKey][0]
                showError(message)
                setLoading(false)
            } catch (error) {
                showError("Cập nhật thất bại!")
                setLoading(false)
            }
        },
        complete: () => {

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
        clear.addEventListener('click', function () {
            clearFormValues('resume_form');
        });
        actionEl.append(createBtn, clear)
        return
    }
    const saveBtn = buildButton('Lưu', '', 'bx bx-save')
    const clear = buildButton('cLear', 'plain', 'bx bx-eraser')

    saveBtn.addEventListener('click', handleSave)
    clear.addEventListener('click', function () {
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
        fetchEmployee()
        getImage()
        
    // const apiUrl = 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/NhanVien/id?id=' + maNhanVien;

    // // Thực hiện yêu cầu API
    // fetch(apiUrl)
    //     .then(response => response.json())
    //     .then(data => {
    //         // Cập nhật nội dung của thẻ <p>
    //         const nameText = document.getElementById('name-text');
    //         nameText.textContent = data.ten; // Giả sử API trả về một thuộc tính `description`
    //         const emailText = document.getElementById('email-text');
    //         emailText.textContent = data.email; 
    //         const anh = document.getElementById('anh_text');
    //         // anh.alt = data.anh; 
    //     })
    //     .catch(error => {
    //         console.error('Error fetching the data:', error);
    //     });
})