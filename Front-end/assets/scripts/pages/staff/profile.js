
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
var MaritalOptions = [
    { label: 'Đã kết hôn', value: 1 },
    { label: 'Chưa kết hôn', value: 0 },
]

function backToListUpdate() {
    const url = new URL("/pages/staff/profile.html", window.location.origin);
    url.searchParams.set("id", maNhanVien);
    window.location.replace(url.toString());
}
function getImage() {
    $.ajax({
        url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/Image/getImage?maNV=' + maDetail,
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
        url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/NhanVien/GetById?id=' + maDetail,
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
    payloadUploadImage.append('maNV', maDetail)
    payloadUploadImage.append('file', anh)

    $.ajax({
        url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/Image/uploadImage',
        method: 'POST',
        contentType: false,
        processData: false,
        data: payloadUploadImage,
        success: function (data) {
            setLoading(false);
            backToListUpdate();
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
    await showConfirm("Bạn có chắc chắn muốn sửa thông tin nhân viên ?")
    const valid = validateForm('profile_form')
    if (!valid) return
    const { anh, ...rest } = getFormValues('profile_form')

    const formValue = getFormValues('profile_form')
    const payload = buildPayload(rest)
    setLoading(true)
    $.ajax({
        url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/NhanVien/ChinhSuaNhanVien/' + maDetail,
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(payload),
        success: function (data) {
            if (anh) {
                uploadImage(anh);
                showSuccess("Cập nhật thành công !")
                recordActivityAdmin(maNhanVien, `Cập nhập thông tin nhân viên: ${maDetail}`);
            } else {
                setLoading(false);
                showSuccess("Cập nhật thành công !")
                recordActivityAdmin(maNhanVien, `Cập nhập thông tin nhân viên: ${maDetail}`);
                // backToListUpdate();
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
    const saveBtn = buildButton('Lưu', '', 'bx bx-save')
    const clear = buildButton('Clear', 'plain', 'bx bx-eraser')

    saveBtn.addEventListener('click', handleSave)
    clear.addEventListener('click', function () {
        clearFormValues('profile_form');
    });

    actionEl.append(saveBtn, clear)
}

document.addEventListener('DOMContentLoaded',async () => {
    await checkIsUpdateResume()
    await checkIsCreatedLabor()
    await checkIsCreatedSalary()
    renderActionByStatus()
    fetchEmployee()
    getImage()
})