const vaiTroID = localStorage.getItem("vaiTroID")
const popupCreateBtn = document.getElementById("createBtn")
const popupClearBtn = document.getElementById("clearBtn")
const maNhanVien = localStorage.getItem("maNhanVien")
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
    key: 'thuongtru',
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
      clearFormValues();
    }
  }
  const popupTitle = modal.querySelector('h2')
  popupTitle.textContent = "Thêm mới nhân viên"
}
function clearFormValues(formId) {
  const form = document.getElementById('createNhanVien');
  const inputs = form.querySelectorAll('input, textarea, select');

  inputs.forEach(input => {
    if (input.type === 'checkbox' || input.type === 'radio') {
      input.checked = false;
    }
    else {
      input.value = '';
      input.selectedIndex = 0;
    }
  });
}
function recordActivityAdmin(actor, action){
  setLoading(true)
  setLoading(true);

  const payload = {
      createdBy: actor,
      action: action,
  };
      $.ajax({
          url: 'https://localhost:7141/api/LichSuHoatDong',
          method: 'POST',
          contentType: 'application/json',
          data: JSON.stringify(payload),
          success: function (data) {
              console.log('Lịch sử hoạt động đã được lưu:');
          },
          error: (err) => {
              console.log('Lỗi khi lưu lịch sử hoạt động:', err);
              try {
                  if (!err.responseJSON) {
                      alert(err.responseText)
                      return
                  }
                  const errObj = err.responseJSON.errors
                  const firtErrKey = Object.keys(errObj)[0]
                  const message = errObj[firtErrKey][0]
                  alert(message)
              } catch (error) {
                  alert("Lưu lịch sử hoạt động không thành công!");
              }
          },
          complete: () => {
              setLoading(false)
          }
      });
}
function handleCreate() {
  const isConfirm = confirm('Bạn chắc chắn muốn thêm Lý lịch tư pháp ?')
  if (!isConfirm) return
  const valid = validateForm('createNhanVien')
  if (!valid) return
  const { anh, ...rest } = getFormValues('createNhanVien')
  const payload = buildPayload(rest)
  setLoading(true)
  $.ajax({
    url: 'https://localhost:7141/api/NhanVien/TaoMoiNhanVien',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(payload),
    success: function (data) {
      alert("Thêm mới thành công !")
      recordActivityAdmin(maNhanVien, `Thêm mới nhân viên: ${payload.ten}`)
      backToListAfterCreate()
    },

    error: (err) => {
      console.log('err ', err);
      try {
        if (!err.responseJSON) {
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
function addNewEmp() {
  localStorage.removeItem("maNhanVien")
}

document.addEventListener('DOMContentLoaded', () => {
  popupCreateBtn.addEventListener("click", handleCreate)
  popupClearBtn.addEventListener("click", clearFormValues)
  

})