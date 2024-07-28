const isEdit = !!maNhanVien
const vaiTroID = localStorage.getItem("vaiTroID")
const maDetail = localStorage.getItem("maDetail")

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
function backToListUpdate() {
    const url = new URL("/pages/staff/resume.html", window.location.origin);
    url.searchParams.set("id", maNhanVien);
    window.location.replace(url.toString());
}

function buildPayload(formValue) {
    const formClone = {...formValue}
  
    return formClone
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
        url: 'https://localhost:7141/api/NhanVien/GetById?id=' + maDetail,
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
    const isConfirm = confirm('Bạn chắc chắn muốn thêm Lý lịch tư pháp ?')
    if (!isConfirm) return
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
    const isConfirm = confirm('Bạn chắc chắn muốn sửa Lý lịch tư pháp ?')
    if (!isConfirm) return
    const valid = validateForm('resume_form')
    if(!valid) return
    
    const {anh, ...rest} = getFormValues('resume_form')

    const formValue = getFormValues('resume_form')
    // formValue['ten'] = 
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
    // if (vaiTroID !== "1") {
    //     window.location.href = "/pages/error.html";
    //     return;
    // }
    var div1 = document.getElementById("div1");
    var div2 = document.getElementById("div2");

    // Lấy chiều cao của div2
    var div2Height = div2.offsetHeight;
    // Đặt chiều cao của div1 bằng chiều cao của div2
    div1.style.height =( div2Height - 35) + "px";
    renderActionByStatus()
    if (maDetail) {
        fetchEmployee()
        getImage()
        const apiUrl = 'https://localhost:7141/api/NhanVien/GetById?id=' + maDetail;

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
                phong.textContent = data.phong; 
                const chucDanh = document.getElementById('chucdanh');
                chucDanh.textContent = data.chucvuhientai; 
                const sdt = document.getElementById('sdt');
                sdt.textContent = data.didong; 
                const email = document.getElementById('email');
                email.textContent = data.email; 
                const ngaysinh = document.getElementById('ngaysinh');
                ngaysinh.textContent = data.ngaysinh; 
                const gioitinh = document.getElementById('gioitinh');
                if(data.gioitinh === true){
                    gioitinh.textContent = "Nam";
                }
                else{
                    gioitinh.textContent = "Nữ"
                }
                const ngayvaolam = document.getElementById('ngayvaolam');
                ngayvaolam.textContent = data.ngaychinhthuc;
                
            })
            .catch(error => {
                console.error('Error fetching the data:', error);
            });
    }

    
})

                                        