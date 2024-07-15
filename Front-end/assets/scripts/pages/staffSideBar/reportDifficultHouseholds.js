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
        label: 'Diện chính sách',
        key: '',
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