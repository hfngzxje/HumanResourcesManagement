

var token = null;
function buildPayload(formValue) {
    const formClone = { ...formValue }
    return formClone
}
function backToList(){
    window.location.replace(`/pages/authentic/login.html`);
}

function handleReset() {
    const formValue = getFormValues('reset_form')
    const payload = buildPayload(formValue)

    payload['token'] = token;
    console.log("payload: " , payload)
    setLoading(true)
    $.ajax({
        url: 'https://localhost:7141/api/DangNhap/reset-password',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(payload),
        success: function (data) {
            alert('Lấy lại mật khẩu thành công!');
            backToList();
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
                alert("Cập nhật thất bại!")
            }
        },
        complete: () => {
            setLoading(false)
        }
    });
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function renderActionByStatus() {
    const actionEl = document.getElementById('reset_form_action')
    const buildButton = (label, type, icon) => {
        const btnEl = document.createElement('base-button')
        btnEl.setAttribute('label', label)
        btnEl.setAttribute('type', type)
        btnEl.setAttribute('icon', icon)
        return btnEl
    }
    const loginBtn = buildButton('Reset', 'green', 'bx bx-plus')

    loginBtn.addEventListener('click', handleReset)


    actionEl.append(loginBtn)
}

document.addEventListener('DOMContentLoaded', () => {
    renderActionByStatus()
    const url = new URL(window.location.href);
    
    // Tạo đối tượng URLSearchParams từ URL
    const params = new URLSearchParams(url.search);
    
    // Lấy giá trị của tham số 'token'
    const tokenURL = params.get('token');
     console.log("Token: " , tokenURL)
    
    if (tokenURL) {
        // Lưu token vào cookie (có thể sử dụng HttpOnly và Secure nếu cần)
        document.cookie = `AuthToken=${tokenURL}; path=/; secure; samesite=strict`;
        
        // Xóa token khỏi URL
        window.history.replaceState({}, document.title, window.location.pathname);
        
        // Sử dụng token (nếu cần)
        console.log("Token stored in cookie.");
    }
    token = getCookie('AuthToken');
    console.log("Token from cookie: ", token);
})
