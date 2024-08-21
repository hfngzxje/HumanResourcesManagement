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
        label: 'Mã hợp đồng',
        key: '',
    },
    {
        label: 'Chức danh',
        key: '',
        type:''
    },
    {
        label: 'Phòng ban',
        key: 'phong'
    },
    {
        label: 'Hệ số lương',
        key: 'heso',
    },
    {
        label: 'Phụ cấp trách nhiệm',
        key: 'phucaptrachnhiem'
    },
    {
        label: 'Phụ cấp khác',
        key: 'phucapkhac'
    },
    {
        label: 'Tổng lương',
        key: 'tongluong'
    },
    {
        label: 'Ngày hiệu lực',
        key: 'ngayhieuluc',
        type:'datetime'
    },
    {
        label: 'Ngày kết thúc',
        key: 'ngayketthuc',
        type:'datetime'
    },
]
var locTheo = [
    { label: 'Tất cả', value: 0 },
    { label: 'Mã nhân viên', value: 1 },
    { label: 'Phòng ban', value: 2 },
    { label: 'Chức vụ', value: 3 },
    { label: 'Ngày tháng', value: 4 }
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
    const actionEl = document.getElementById('reportSalary_form_action')
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

    actionEl.append(DisplayBtn,pdfBtn, excelBtn)
}

function buildApiUrl() {
    return 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/NhanVien'
}

document.addEventListener('DOMContentLoaded', () => {
    renderActionByStatus();
})