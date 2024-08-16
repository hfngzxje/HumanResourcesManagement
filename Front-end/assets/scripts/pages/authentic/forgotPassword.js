const email = document.getElementById("email")
const forgotBtn = document.getElementById("submit")


function buildPayload(formValue) {
    const formClone = { ...formValue }
    return formClone
}

function handleSendEmail() {
        const formValue = getFormValues('forgotPassword_form')
        const email = formValue['email']
        const payload = buildPayload(formValue)
        console.log('Payload:', payload); 
        console.log("Email value: " + email)
        $.ajax({
            url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/DangNhap/forgot-password?email=' + email ,
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
    forgotBtn.addEventListener("click", handleSendEmail)
})