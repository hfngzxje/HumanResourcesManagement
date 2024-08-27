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
    const formClone = { ...formValue }

    return formClone
}

function getImage() {
    $.ajax({
        url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/Image/getImage?maNV=' + maDetail,
        method: 'GET',
        success: function(data) {
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
            if(!data.dantoc){
                data.dantoc = 1
            }
            if(!data.tongiao){
                data.tongiao = 1
            }
            if(!data.ngachcongchuc){
                data.ngachcongchuc = 1
            }
            setFormValue('resume_form', data)
            console.log("Data: ", data)
        },
        error: (err) => {
            console.log('fetchEmployee err :: ', err);
        },
        complete: () => {
            setLoading(false)
        }
    });
}
var isHopDong = false
async function getHopDong() {
    try {
        const response = await $.ajax({
            url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/HopDong/GetHopDongByMaNV/id?id=' + maDetail,
            method: 'GET',
            contentType: 'application/json',
        });
        if (Array.isArray(response) && response.length > 0) {
            
            isHopDong = true
        }
        else {
            isHopDong = false
        }
    } catch (error) {
        console.log("Error")
    }
}
async function handleSave() {
    await showConfirm("Bạn có chắc chắn muốn sửa lý lịch tư pháp ?")
    const valid = validateForm('resume_form')
    if (!valid) return

    const { anh, ...rest } = getFormValues('resume_form')

    const formValue = getFormValues('resume_form')
    const payload = buildPayload(rest)
    setLoading(true)
    $.ajax({
        url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/NhanVien/ChinhSuaNhanVien/' + maDetail,
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(payload),
        success: async function (data) {
            if (anh) {
                uploadImage(anh);
                await showSuccess("Cập nhật thành công !")
                recordActivityAdmin(maNhanVien, `Cập nhập thông tin nhân viên: ${maDetail}`);
                if(!isHopDong){
                    await showNavigation('Nhân viên chưa có hợp đồng, hãy tạo hợp đồng !', 'laborContract.html')
                    resolve();
                }
            } else {
                setLoading(false);
                await showSuccess("Cập nhật thành công !")
                recordActivityAdmin(maNhanVien, `Cập nhập thông tin nhân viên: ${maDetail}`);
                if(!isHopDong){
                    await showNavigation('Nhân viên chưa có hợp đồng, hãy tạo hợp đồng !', 'laborContract.html')
                    resolve();
                }
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
    const clear = buildButton('Clear', 'plain', 'bx bx-eraser')

    saveBtn.addEventListener('click', handleSave)
    clear.addEventListener('click', function () {
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
document.addEventListener('DOMContentLoaded',async () => {

    await getHopDong()
    renderActionByStatus()
    if (maDetail) {
        fetchEmployee()
        getImage()
        const apiUrl = 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/NhanVien/GetById?id=' + maDetail;

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
                if (data.gioitinh === true) {
                    gioitinh.textContent = "Nam";
                }
                else {
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

