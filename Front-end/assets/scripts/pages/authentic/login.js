let Eid = null;
const popupCreateBtn = document.getElementById("createBtn")

function LoginSuccess() {
    window.location.replace("/pages/staff/list.html");
}

function buildPayload(formValue) {
    const formClone = { ...formValue }
    return formClone
}
function handleLoginSuccess(vaitroID) {
    if (vaitroID === 1) {
        window.location.replace("/pages/staff/list.html");
    } else {
        window.location.replace("/pages/employee/overview.html");
    }
}
function handleLogin() {
    const valid = validateForm('login_form')
    if (!valid) return
    const formValue = getFormValues('login_form')

    console.log('formValue ', formValue);
    const payload = buildPayload(formValue)
    setLoading(true)
    $.ajax({
        url: 'https://localhost:7141/api/DangNhap/Login',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(payload),
        success: function (data) {

            
        const maNhanVien = data.nhanVien.ma
        localStorage.setItem("maNhanVien", maNhanVien);
        const vaitroID = data.nhanVien.vaiTroId
    //    localStorage.setItem("vaiTroId", vaitroID)

       
        if(vaitroID !== undefined){
            localStorage.setItem("vaiTroId", vaitroID);
            handleLoginSuccess(vaitroID)
            alert("Đăng Nhập Thành Công")
           
        }
        else{
            alert("Không tìm thấy vai trò người dùng")
        }
            
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
                alert("Lỗi Đăng Nhập")
            }


        },
        complete: () => {
            setLoading(false)
        }
    });
}

  // Hàm xóa lịch sử trình duyệt
  function preventBack() {
    window.history.forward();
}

// Xử lý sự kiện khi trang được tải
window.onload = function() {
    preventBack();
    window.onpageshow = function(evt) {
        if (evt.persisted) preventBack();
    };
};

function renderActionByStatus() {
    const actionEl = document.getElementById('login_form_action')
    const buildButton = (label, type, icon) => {
        const btnEl = document.createElement('base-button')
        btnEl.setAttribute('label', label)
        btnEl.setAttribute('type', type)
        btnEl.setAttribute('icon', icon)
        return btnEl
    }
    const loginBtn = buildButton('Đăng Nhập', 'green', 'bx bx-plus')

    loginBtn.addEventListener('click', handleLogin)


    actionEl.append(loginBtn)
}


function showPopup() {
    var modal = document.getElementById("forgetPassword");
    modal.style.display = "block";
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            clearFormValues();
        }
    }
        const popupTitle = modal.querySelector('h2')
        popupTitle.textContent = "Quên mật khẩu" 
  }
  function clearFormValues(formId) {
    const form = document.getElementById('forgetPassword');
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

  function handleCreate() {
    const formValue = getFormValues('forgetPassword')
    const email = formValue['email']
    const payload = buildPayload(formValue)
    console.log('Payload:', payload); 
    console.log("Email value: " + email)
    setLoading(true)
    $.ajax({
        url: 'https://localhost:7141/api/DangNhap/forgot-password?email=' + email ,
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(payload),
        success: function(data) {
            alert("Vui lòng kiểm tra email để lấy lại mật khẩu")
        },
        error: (err) => {
            console.log('err ', err);
            try {
                if(!err.responseJSON) {
                    alert(err.responseText)
                    return 
                }
                const errObj = err.responseJSON.errors
                const firtErrKey = Object.keys(errObj)[0]
                const message = errObj[firtErrKey][0]
                alert(message)
            } catch (error) {
                alert("Gửi email thất bại")
            }
        },
        complete: () => {
            setLoading(false)
        }
    });
}


document.addEventListener('DOMContentLoaded', () => {
    renderActionByStatus()
    popupCreateBtn.addEventListener("click", handleCreate)
})

