var TableColumns = [
    {
        label: 'Bậc lương',
        key: '',
    },
    {
        label: 'Hệ số lương',
        key: 'ten',
    },
    {
        label: 'Mức lương',
        key: 'ngaysinh',
        type:'datetime'
    },
    {
        label: 'Từ ngày',
        key: '',
        type:'datetime'
    },
    {
        label: 'Tới ngày',
        key: '',
        type:'datetime'
    },
  
]
var locTheo = [
    { label: 'Tất cả', value: 0 },
    { label: 'Hệ số lương', value: 1 },
    { label: 'Thời gian', value: 2 }
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