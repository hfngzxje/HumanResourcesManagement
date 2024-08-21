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
        formatGiaTri: (value) => {
            let result = { text: 'Hết hạn', color: 'red' };
            if (value === 1) {
                result.text = 'Còn hạn';
                result.color = 'blue';
            }
            return result;
        }

    }
]
function buildApiUrl() {
    return 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/HopDong/GetHopDongByMaNV/id?id=' + ma;
}