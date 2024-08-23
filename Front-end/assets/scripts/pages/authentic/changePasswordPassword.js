var modal = document.getElementById("myModal");
var btn = document.getElementById("btn");
var span = document.getElementsByClassName("close")[0];
const maNV = localStorage.getItem('maNhanVien');
btn.onclick = function () {
  modal.style.display = "block";

}
var closeButton = modal.querySelector('.close');
closeButton.onclick = function () {
  modal.style.display = "none";
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
      location = reload()
    }
  }
}
function buildPayload(formValue) {
  const formClone = { ...formValue }
  return formClone
}

function handleChangePassword() {
  const valid = validateForm('change_form')
  if (!valid) return
  const formValue = getFormValues('change_form')
  formValue['maNhanVien'] = maNV

  const payload = buildPayload(formValue)
  setLoading(true)
  $.ajax({
    url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/DangNhap/ChangePassword',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(payload),
    success: function (data) {
      // ChangeSuccess();
      showSuccess("Đổi Mật Khẩu Thành Công")
      modal.style.display = "none";
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
        showError("Lỗi Đổi mật khẩu")
      }
    },
    complete: () => {
      setLoading(false)
    }
  });
}


let actionRendered = false;


function renderActionByStatusChangePass() {

  if (actionRendered) {
    return;
  }

  const actionEl = document.getElementById('change_form_action')

  const buildButton = (label, type, icon) => {
    const btnEl = document.createElement('base-button')
    btnEl.setAttribute('label', label)
    btnEl.setAttribute('type', type)
    btnEl.setAttribute('icon', icon)
    return btnEl
  }
  const ChangeBtn = buildButton('Đổi Mật Khẩu', 'green', 'bx bx-plus')
  ChangeBtn.addEventListener('click', handleChangePassword)
  actionEl.append(ChangeBtn)
  actionRendered = true;
}


document.addEventListener('DOMContentLoaded', () => {
  renderActionByStatusChangePass()
})

