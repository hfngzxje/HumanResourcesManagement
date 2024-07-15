const apiTable = 'https://localhost:7141/api/NhanVien';
var TableColumns = [
    {
        label: 'Mã nhân viên',
        key: 'ma',
    },
    {
        label: 'Họ tên',
        key: 'ten',
    },
    {
        label: 'Ngày sinh',
        key: 'ngaysinh',
        type:'datetime'
    },
    {
        label: 'Giới tính',
        key: 'gioitinh',
        type:'gender'
    },
    {
        label: 'Điện thoại',
        key: 'didong'
    },
    {
        label: 'Phòng ban',
        key: 'phong',
    },
    {
        label: 'Trạng thái',
        key: 'trangthai'
    }
]
var locTheo = [
    { label: 'Tất cả', value: 0 },
    { label: 'Trạng thái', value: 1 },
    { label: 'Phòng ban', value: 2 },
    { label: 'Ngày tháng', value: 3 },
    { label: 'Giới tính', value: 4 }
]
var trangThai = [
    { label: 'Tất cả', value: 0 },
    { label: 'Hoạt động', value: 1 },
    { label: 'Nghỉ việc', value: 2 }
]
var gioiTinh = [
    { label: 'Tất cả', value: 0 },
    { label: 'Nam', value: 1 },
    { label: 'Nữ', value: 2 }
]


document.addEventListener('DOMContentLoaded', () => {
    const filterSelect = document.querySelector('base-select[description="Lọc theo"]');
    const fromDate = document.querySelector('base-datepicker[description="Từ ngày"]');
    const toDate = document.querySelector('base-datepicker[description="Đến ngày"]');
    const statusSelect = document.querySelector('base-select[description="Trạng thái"]');
    const departmentSelect = document.querySelector('base-select[description="Phòng ban"]');
    const genderSelect = document.querySelector('base-select[description="Giới tính"]');

    // Hàm để bật hoặc tắt trạng thái của các thẻ input và select
    function toggleInputs(enabled) {
        fromDate.disabled = !enabled;
        toDate.disabled = !enabled;
        statusSelect.disabled = !enabled;
        departmentSelect.disabled = !enabled;
        genderSelect.disabled = !enabled;
    }

    // Cập nhật trạng thái của các thẻ khi chọn giá trị từ "Lọc theo"
    filterSelect.addEventListener('change', (event) => {
        if (event.target.value === 'Tất cả') {
            toggleInputs(true); // Bật tất cả các thẻ
        } else {
            toggleInputs(false); // Tắt tất cả các thẻ
        }
    });

    // Khởi tạo trạng thái ban đầu
    toggleInputs(filterSelect.value === 'Tất cả');
});
  
function renderActionByStatus() {
    const actionEl = document.getElementById('report_form_action')
    const buildButton = (label, type, icon) => {
        const btnEl = document.createElement('base-button')
        btnEl.setAttribute('label', label)
        btnEl.setAttribute('type', type)
        btnEl.setAttribute('icon', icon)
        return btnEl
    }
    const DisplayBtn = buildButton('Tìm báo cáo', 'green', 'bx bx-search')
    const pdfBtn = buildButton('PDF', 'red', 'bx bx-file-blank')
    const excelBtn = buildButton('Excel', '', 'bx bx-spreadsheet')

    // removeBtn.addEventListener('click', handleRemove)
    // saveBtn.addEventListener('click', handleSave)
    // createBtn.addEventListener('click', handleCreate)

    actionEl.append(DisplayBtn,pdfBtn, excelBtn)
}

function showDateTimeNow(){
    const dateTimeElement = document.getElementById('datetime');
    const now = new Date();
    const formattedDate = formatVietnameseDate(now);
    dateTimeElement.textContent = `Hà Nội, ${formattedDate}`;
}
function formatVietnameseDate(date) {
    const day = date.getDate();
    const month = date.toLocaleString('vi-VN', { month: 'long' });
    const year = date.getFullYear();
    return `${day} ${month} năm ${year}`;
}
function buildApiUrl() {
    
    return apiTable
}

document.addEventListener('DOMContentLoaded', () => {
    renderActionByStatus();
    showDateTimeNow();
})