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
        label: 'Tháng',
        key: 'gioitinh',
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
    { label: 'Phòng ban', value: 1 },
    { label: 'Ngày tháng', value: 2  }
]

function renderActionByStatus() {
    const actionEl = document.getElementById('report_form_action')
    const buildButton = (label, type, icon) => {
        const btnEl = document.createElement('base-button')
        btnEl.setAttribute('label', label)
        btnEl.setAttribute('type', type)
        btnEl.setAttribute('icon', icon)
        return btnEl
    }
    const DisplayBtn = buildButton('Tìm báo cáo', 'green')
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
    return 'https://localhost:7141/api/NhanVien'
}

document.addEventListener('DOMContentLoaded', () => {
    renderActionByStatus();
    showDateTimeNow();
})