var TableColumns = [
  {
      label: 'Mã nhân viên',
      key: 'maNV',
  },
  {
      label: 'Họ tên',
      key: 'tenNV',
  },
  {
      label: 'Ngày sinh',
      key: 'ngaySinh'
  },
  {
      label: 'Giới tính',
      key: 'gioiTinh',
      type:'gender'
  },
  {
      label: 'Điện thoại',
      key: 'dienThoai'
  },
  {
      label: 'Phòng ban',
      key: 'phongBan',
  },
  {
      label: 'Diện chính sách',
      key: 'dienChinhSach',
  }
]

var gioiTinh = [
  { label: 'Tất cả', value: '' },
  { label: 'Nam', value: 'true' },
  { label: 'Nữ', value: 'false' }
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
  const pdfBtn = buildButton('PDF', 'red', 'bx bx-file-blank')
  const excelBtn = buildButton('Excel', '', 'bx bx-spreadsheet')


  actionEl.append(pdfBtn, excelBtn)
}

function buildApiUrl() {
  return 'https://localhost:7141/api/BaoCao/getBaoCaoDanhSachDienChinhSach'
}

document.addEventListener('DOMContentLoaded', () => {
  renderActionByStatus();
  showDateTimeNow();
})