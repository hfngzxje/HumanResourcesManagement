function LoginSuccess() {
    window.location.replace("/pages/staff/list.html");
}

function buildPayload(formValue) {
    const formClone = { ...formValue }

    return formClone
}

function handleCreate() {
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
            LoginSuccess();
            alert("Đăng Nhập Thành Công")
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

    loginBtn.addEventListener('click', handleCreate)


    actionEl.append(loginBtn)
}


document.addEventListener('DOMContentLoaded', () => {
    renderActionByStatus()
})

