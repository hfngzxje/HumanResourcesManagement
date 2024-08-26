const vaiTroID = localStorage.getItem("vaiTroID")
const popupCreateBtn = document.getElementById("createBtn")
const popupClearBtn = document.getElementById("clearBtn")
const maNhanVien = localStorage.getItem("maNhanVien")
const table = document.querySelector('base-table')
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
var TableColumns = [
  {
    label: 'Mã nhân viên',
    key: 'ma'
  },
  {
    label: 'Họ và tên',
    key: 'ten',
  },
  {
    label: 'Ngày sinh',
    key: 'ngaysinh',
    type: 'datetime'
  },
  {
    label: 'Giới tính',
    key: 'gioitinh',
    type: "gender"
  },
  {
    label: 'Địa chỉ',
    key: 'quequan',
  },
  {
    label: 'SĐT',
    key: 'didong',
  },
  {
    label: 'Chức vụ',
    key: 'tenChucVu',

  },
  {
    label: 'Phòng ban',
    key: 'tenPhongBan',
  },
  {
    label: 'Hành động',
    key: 'action',
    actions: [
      {
        type: 'plain', icon: 'bx bx-show', label: 'Chi tiết', onClick: (row) => {

          localStorage.setItem("maDetail", row.ma)
          const maDetail = localStorage.getItem("maDetail")
          backToList(row.ma)
        }
      }
    ]
  }
]
var vaiTro = [
  { label: 'Nhân viên', value: 2 },
  { label: 'HR', value: 1 }
];

window.history.pushState(null, null, window.location.href);
window.onpopstate = function () {
  window.history.pushState(null, null, window.location.href);
};

function backToList(id) {

  window.location.replace(`/pages/staff/resume.html`);
}
function backToListAfterCreate() {

  window.location.replace(`/pages/staff/list.html`);
}


function showPopup() {
  var modal = document.getElementById("createNhanVien");
  modal.style.display = "block";
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
      clearFormValues("createNhanVien");
    }
  }
  var closeButton = modal.querySelector('.close');
  closeButton.onclick = function () {
    modal.style.display = "none";
    clearFormValues("createNhanVien");
  }
  const popupTitle = modal.querySelector('h2')
  popupTitle.textContent = "Thêm mới nhân viên"
}
function closePopup() {
  var modal = document.getElementById("createNhanVien");
  modal.style.display = "none"
}
async function getMaNew(email) {
  try {
    const response = await $.ajax({
      url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/NhanVien',
      method: 'GET',
      contentType: 'application/json',
    });
    if (Array.isArray(response) && response.length > 0) {
      const nhanVien = response.find(nv => nv.email === email);
      if (nhanVien) {
        return nhanVien.ma
      }
      else {
        console.error("Không tìm thấy nhân viên với email:", email);
        return null
      }
    }
    else {
      console.error("Danh sách nhân viên rỗng hoặc không phải là mảng.");
      return null
    }
  } catch (error) {
    console.log("Error")
  }
}
async function handleCreate() {
  await showConfirm("Bạn có chắc chắn muốn thêm mới nhân viên ?")
  const valid = validateForm('createNhanVien')
  if (!valid) return
  const { anh, ...rest } = getFormValues('createNhanVien')
  const payload = buildPayload(rest)
  setLoading(true)
  $.ajax({
    url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/NhanVien/TaoMoiNhanVien',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(payload),
    success: async function (data) {

      await showSuccess("Thêm mới thành công !")
      table.handleCallFetchData()
      clearFormValues("createNhanVien")
      recordActivityAdmin(maNhanVien, `Thêm mới nhân viên: ${payload.ten}`)
      await closePopup()
      var ma = await getMaNew(payload.email)
      localStorage.setItem("maDetail", ma);
      await showNavigation('Thêm mới lý lịch tư pháp cho nhân viên !', 'resume.html')
      resolve();
    },

    error: (err) => {
      console.log('err ', err);
      try {
        if (!err.responseJSON) {
          showError(err.responseText)
          return
        }
        const errObj = err.responseJSON.errors
        const firtErrKey = Object.keys(errObj)[0]
        const message = errObj[firtErrKey][0]
        showError(message)
      } catch (error) {
        showError("Tạo thất bại!")
      }
    },
    complete: () => {
      setLoading(false)
    }
  });
}

function clearFormValue() {
  const form = document.getElementById('createNhanVien');
  const inputs = form.querySelectorAll('input, textarea, select,#error');

  inputs.forEach(input => {
    if (input.type === 'checkbox') {
      input.checked = false;
    }
    else {
      input.value = '';
      input.selectedIndex = 0;
    }
  });
}

var thongTinPhongBan = null

function apiTo() {
  if (!thongTinPhongBan) {
    return false
  }
  return 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/DanhMucTo/GetDanhMucToByPhong/' + thongTinPhongBan
}
function layThongTinTo() {
  const to = document.getElementById('to')
  to.renderOption()
}
async function getToTheoPhongBanDauTien() {
  try {
    const response = await $.ajax({
      url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/PhongBan/getAllPhongBan',
      method: 'GET',
      contentType: 'application/json',
    });
    const phongBanDauTien = response[0]
    thongTinPhongBan = phongBanDauTien.id
    layThongTinTo()
  } catch (error) {
    console.log("Error", "ajaj")
  }
}
function handlePhongBan() {
  const phongBan = document.querySelector('#phong select')
  phongBan.addEventListener("change", (event) => {
    thongTinPhongBan = event.target.value
    layThongTinTo()
  });
}
function inits() {
  handlePhongBan()
  getToTheoPhongBanDauTien()
}


document.addEventListener('DOMContentLoaded', () => {
  popupCreateBtn.addEventListener("click", handleCreate)
  popupClearBtn.addEventListener("click", clearFormValue)
  inits()
})