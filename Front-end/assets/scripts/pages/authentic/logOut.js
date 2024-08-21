var logout = document.getElementById("logOut");


async function handleLogOut() {
    var MaNhanVien = localStorage.getItem("maNhanVien");
    var vaiTroID = localStorage.getItem("vaiTroID")
    await showConfirm('Bạn chắc chắn muốn đăng xuất?')

    setLoading(true)
    $.ajax({
        url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/DangNhap/Logout',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({}),
        success: function (data) {
            localStorage.removeItem("maNhanVien");
            localStorage.removeItem("vaiTroID");
            localStorage.removeItem("maDetail");
            MaNhanVien = localStorage.getItem("maNhanVien");
            vaiTroID = localStorage.getItem("vaiTroID");
            window.location.href = '/pages/authentic/login.html';

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
                showError("Lỗi Đăng Xuất")
            }
        },
        complete: () => {
            setLoading(false)
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    if (logout) {
        logout.addEventListener('click', handleLogOut);
    }
})
