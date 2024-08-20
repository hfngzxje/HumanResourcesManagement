
const ma = localStorage.getItem("maNhanVien")
var TableColumns = [
    {
        label: 'Mã Nhân Viên',
        key: 'ma'
    },
    {
        label: 'Ngày',
        key: 'ngay',
        type: 'datetime'
    },
    {
        label: 'Nội dung',
        key: 'noidung'
    },
    {
        label: 'Lý do',
        key: 'lido'
    },
    {
        label: 'Tên',
        key: 'ten'
    }
]
function buildApiUrl() {
    let string1 = 'https://localhost:7141/api/KhenThuongKiLuat/getKhenThuongKiLuatByMaNV/' + ma
    let string2 = '/Khen thưởng'
    return string1 + string2;
}