document.addEventListener('DOMContentLoaded', function() {
    const maNhanVien = localStorage.getItem('maNhanVien');
    if (maNhanVien === null) {
        window.location.href = '/pages/authentic/login.html';
        return; // Chuyển hướng nếu không có mã nhân viên
    }
    
    const vaiTroID = localStorage.getItem('vaiTroId');
    if (vaiTroID !== "1") {
        window.location.href = "/pages/error.html";
        return; // Chuyển hướng nếu vai trò không phải là 1
    }
});