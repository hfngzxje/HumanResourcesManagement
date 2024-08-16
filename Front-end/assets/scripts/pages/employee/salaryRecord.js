
const ma = localStorage.getItem("maNhanVien")
var TableColumns = [
    {
        label: 'Mã Hợp Đồng',
        key: 'mahopdong'
    },
    {
        label: 'Nhóm Lương',
        key: 'nhomluong'
    },
    {
        label: 'Hệ Số Lương',
        key: 'heSoLuong'
    },
    {
        label: 'Bậc Lương',
        key: 'bacLuong'
    },
    {
        label: 'Phụ Cấp trách nhiệm',
        key: 'phucaptrachnhiem',
        type: 'currency'
    },
    {
        label: 'Phụ Cấp Khác',
        key: 'phucapkhac',
        type: 'currency'
    },
    {
        label: 'Tổng Lương',
        key: 'tongluong',
        type: 'currency'
    },
    {
        label: 'Thời Hạn Lên Lương',
        key: 'thoihanlenluong',
        formatter: (giatri) => giatri + ' năm'
    },
    {
        label: 'Ngày bắt đầu',
        key: 'ngaybatdau',
        type: 'datetime'
    },
    {
        label: 'Ngày kết thúc',
        key: 'ngayketthuc',
        type: 'datetime'
    },
    {
        label: 'Trạng thái',
        key: 'trangthai',
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
    return 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/HoSoLuong/getAllLuongByMaNV/' + ma;
}