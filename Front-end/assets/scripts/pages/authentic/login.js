let Eid = null;
const popupCreateBtn = document.getElementById("createBtn")
const maInput = document.getElementById("userName")
const matKhauInput = document.getElementById("password-field")
const buttonLogin = document.getElementById("submit")
function LoginSuccess() {
    window.location.replace("/pages/staff/list.html");
}

function buildPayload(formValue) {
    const formClone = { ...formValue }
    return formClone
}
function handleLoginSuccess(vaitroID) {
    if (vaitroID === 1) {
        window.location.replace("/pages/staff/index.html");
    } else {
        window.location.replace("/pages/employee/overview.html");
    }
}
function Login() {
    const valid = validateForm('login_form')
    if (!valid) return
    const formValue = getFormValues('login_form')

    console.log('formValue ', formValue);
    const payload = buildPayload(formValue)
    // setLoading(true)
    $.ajax({
        url: 'https://localhost:7141/api/DangNhap/Login',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(payload),
        success: function (data) {

            const maNhanVien = data.nhanVien.ma
            localStorage.setItem("maNhanVien", maNhanVien);
            const vaitroID = data.nhanVien.vaiTroId
            const tenNhanVien = data.nhanVien.ten
            const anh = data.nhanVien.anh

            if (vaitroID !== undefined) {
                localStorage.setItem("vaiTroId", vaitroID);
                localStorage.setItem("tenNhanVien", tenNhanVien)
                localStorage.setItem("userAvatar", anh)
                handleLoginSuccess(vaitroID)
                alert("Đăng Nhập Thành Công")

            }
            else {
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

// function showPopup() {
//     var modal = document.getElementById("forgetPassword");
//     modal.style.display = "block";
//     window.onclick = function (event) {
//         if (event.target == modal) {
//             modal.style.display = "none";
//             clearFormValues();
//         }
//     }
//         const popupTitle = modal.querySelector('h2')
//         popupTitle.textContent = "Quên mật khẩu" 
//   }
//   function clearFormValues(formId) {
//     const form = document.getElementById('forgetPassword');
//     const inputs = form.querySelectorAll('input, textarea, select');
  
//     inputs.forEach(input => {
//         if (input.type === 'checkbox' || input.type === 'radio') {
//             input.checked = false;
//         } 
//         else {
//             input.value = '';
//             input.selectedIndex = 0;
//         }
//     });
//   }

//   function handleCreate() {
//     const formValue = getFormValues('forgetPassword')
//     const email = formValue['email']
//     const payload = buildPayload(formValue)
//     console.log('Payload:', payload); 
//     console.log("Email value: " + email)
//     setLoading(true)
//     $.ajax({
//         url: 'https://localhost:7141/api/DangNhap/forgot-password?email=' + email ,
//         method: 'POST',
//         contentType: 'application/json',
//         data: JSON.stringify(payload),
//         success: function(data) {
//             alert("Vui lòng kiểm tra email để lấy lại mật khẩu")
//         },
//         error: (err) => {
//             console.log('err ', err);
//             try {
//                 if(!err.responseJSON) {
//                     alert(err.responseText)
//                     return 
//                 }
//                 const errObj = err.responseJSON.errors
//                 const firtErrKey = Object.keys(errObj)[0]
//                 const message = errObj[firtErrKey][0]
//                 alert(message)
//             } catch (error) {
//                 alert("Gửi email thất bại")
//             }
//         },
//         complete: () => {
//             setLoading(false)
//         }
//     });
// }


document.addEventListener('DOMContentLoaded', () => {
    buttonLogin.addEventListener("click", Login)
})

