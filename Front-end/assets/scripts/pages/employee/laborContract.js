const ma = localStorage.getItem("maNhanVien")
var TableColumns = [
    {
        label: 'Mã Hợp Đồng',
        key: 'mahopdong'
    },
    {
        label: 'Loại Hợp Đồng',
        key: 'loaihopdong'
    },
    {
        label: 'Chức Danh',
        key: 'chucdanh'
    },
    {
        label: 'Hợp Đồng Từ Ngày',
        key: 'hopdongtungay',
        type: 'datetime'
    },
    {
        label: 'Hợp Đồng Đến Ngày',
        key: 'hopdongdenngay',
        type: 'datetime'
    },
    {
        label: 'Ghi Chú',
        key: 'ghichu',
       
    },
    {
        label: 'Trạng Thái',
        key: 'trangThai',
        
    }
]
function buildApiUrl() {
    return 'https://localhost:7141/api/HopDong/GetHopDongByMaNV/id?id='+ma ;
}