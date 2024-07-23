var logout = document.getElementById("logOut");


function handleLogOut() {
    var MaNhanVien = localStorage.getItem("maNhanVien");
    var vaiTroID = localStorage.getItem("vaiTroID")
    console.log("Trước khi đăng xuất:");
    console.log("Mã Nhân Viên: ", MaNhanVien);
    console.log("Vai trò ID: ", vaiTroID);
    const isConfirm = confirm('Bạn chắc chắn muốn đăng xuất?')
    if (!isConfirm) return
    setLoading(true)
    $.ajax({
        url: 'https://localhost:7141/api/DangNhap/Logout',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({}),
        success: function (data) {
            localStorage.removeItem("maNhanVien");
            localStorage.removeItem("vaiTroID");
            localStorage.removeItem("maDetail");

            MaNhanVien = localStorage.getItem("maNhanVien");
            vaiTroID = localStorage.getItem("vaiTroID");

            console.log("Sau khi đăng xuất:");
            console.log("Mã Nhân Viên: ", MaNhanVien); 
            console.log("Vai trò ID: ", vaiTroID);

            window.location.href = '/pages/authentic/login.html';

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
                alert("Lỗi Đăng Xuất")
            }
        },
        complete: () => {
            setLoading(false)
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    console.log(logout)
    if (logout) {
        logout.addEventListener('click', handleLogOut);
    }
})
