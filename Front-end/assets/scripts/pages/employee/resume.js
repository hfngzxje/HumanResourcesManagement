
const vaiTroID = localStorage.getItem("vaiTroID")
const maNhanVien = localStorage.getItem("maNhanVien")

var MaritalOptions = [
    { label: 'Đã kết hôn', value: 1 },
    { label: 'Chưa kết hôn', value: 0 },
]
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

function backToListDelete() {
    window.location.replace("/pages/staff/list.html");
}

function buildPayload(formValue) {
    const formClone = {...formValue}
  
    return formClone
}

function getImage() {
    $.ajax({
        url: 'https://localhost:7141/api/Image/getImage?maNV=' + maNhanVien,
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
        url: 'https://localhost:7141/api/NhanVien/GetById?id=' + maNhanVien,
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

async function handleSave() {
    await showConfirm("Bạn có chắc chắn muốn sửa lý lịch tư pháp ?")
    const valid = validateForm('resume_form')
    if(!valid) return
    
    const {anh, ...rest} = getFormValues('resume_form')

    const formValue = getFormValues('resume_form')
    // formValue['ten'] = 
    const payload = buildPayload(rest)
    setLoading(true)
    $.ajax({
        url: 'https://localhost:7141/api/NhanVien/ChinhSuaNhanVien/' + maNhanVien,
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(payload),
        success: function(data) {
            if (anh) {
                showSuccess("Sửa lý lịch tư pháp thành công")
                uploadImage(anh);
            } else {
                showSuccess("Sửa lý lịch tư pháp thành công")
                setLoading(false);
            }
        },
        error: (err) => {
            console.log('err ', err);
            try {
                if(!err.responseJSON) {
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

function uploadImage(anh) {
    const payloadUploadImage = new FormData()
    payloadUploadImage.append('maNV', maNhanVien)
    payloadUploadImage.append('file', anh)

    $.ajax({
        url: 'https://localhost:7141/api/Image/uploadImage',
        method: 'POST',
        contentType: false,
        processData: false,
        data: payloadUploadImage,
        success: function(data) {
            setLoading(false);
        },
        error: (err) => {
            console.log('err ', err);
            try {
                if(!err.responseJSON) {
                    showError(err.responseText)
                    setLoading(false)
                    return 
                }
                const errObj = err.responseJSON.errors
                const firtErrKey = Object.keys(errObj)[0]
                const message = errObj[firtErrKey][0]
                showError(message)
                setLoading(false)            } catch (error) {
                showError("Cập nhật thất bại!")
                setLoading(false)
            }
        },
        complete: () => {
            
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
    const saveBtn = buildButton('Lưu', '', 'bx bx-save')
    const clear = buildButton('cLear', 'plain', 'bx bx-eraser')

    saveBtn.addEventListener('click', handleSave)
    clear.addEventListener('click', function() {
        clearFormValues('resume_form');
    });

    actionEl.append(saveBtn, clear)
}
function formatDateTime(dateTimeStr) {
    const dateTime = new Date(dateTimeStr);
    const year = dateTime.getFullYear();
    const month = String(dateTime.getMonth() + 1).padStart(2, "0");
    const day = String(dateTime.getDate()).padStart(2, "0");
    const hours = String(dateTime.getHours()).padStart(2, "0");
    const minutes = String(dateTime.getMinutes()).padStart(2, "0");

    return `${day}-${month}-${year} `;
  }
document.addEventListener('DOMContentLoaded', () => {
    renderActionByStatus()
    if (maNhanVien) {
        fetchEmployee()
        getImage()
        const apiUrl = 'https://localhost:7141/api/NhanVien/GetById?id=' + maNhanVien;

        // Thực hiện yêu cầu API
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                // Cập nhật nội dung của thẻ <p>
                const maText = document.getElementById('ma-text');
                maText.textContent = data.ma; // Giả sử API trả về một thuộc tính `description`
                const name = document.getElementById('name');
                name.textContent = data.ten; 
                const phong = document.getElementById('phong');
                phong.textContent = data.tenPhongBan; 
                const chucDanh = document.getElementById('chucdanh');
                chucDanh.textContent = data.tenChucVu; 
                const sdt = document.getElementById('sdt');
                sdt.textContent = data.didong; 
                const email = document.getElementById('email');
                email.textContent = data.email; 
                const ngaysinh = document.getElementById('ngaysinh');
                ngaysinh.textContent = formatDateTime(data.ngaysinh); 
                const gioitinh = document.getElementById('gioitinh');
                if(data.gioitinh === true){
                    gioitinh.textContent = "Nam";
                }
                else{
                    gioitinh.textContent = "Nữ"
                }
                const ngayvaolam = document.getElementById('ngayvaolam');
                ngayvaolam.textContent = formatDateTime(data.ngaychinhthuc);
                
            })
            .catch(error => {
                console.error('Error fetching the data:', error);
            });
    }

    
})

                                        