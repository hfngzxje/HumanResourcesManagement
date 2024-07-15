var TableColumns = [
    {
        label: 'Họ tên',
        key: '',
    },
    {
        label: 'Giới tính',
        key: '',
    },
    {
        label: 'Ngày sinh',
        key: 'ngaysinh',
        type:'datetime'
    },
    {
        label: 'Quan hệ',
        key: 'gioitinh',
        type:'gender'
    },
    {
        label: 'Nghề nghiệp',
        key: ''
    },
    {
        label: 'Địa chỉ',
        key: '',
    },
    {
        label: 'Số điện thoại',
        key: ''
    },
    {
        label: 'Nhân viên tham chiếu',
        key: ''
    },
    {
        label: 'Sự kiện',
        key: ''
    }
]
var locTheo = [
    { label: 'Tất cả', value: 0 },
    { label: 'Mã nhân viên', value: 1 },
    { label: 'Quan hệ', value: 2 },
    { label: 'Giới tính', value: 3 },
    { label: 'Sự kiện', value: 4 }
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
function buildApiUrl() {
    return 'https://localhost:7141/api/NhanVien'
}

document.addEventListener('DOMContentLoaded', () => {
    renderActionByStatus();
    showDateTimeNow();
})