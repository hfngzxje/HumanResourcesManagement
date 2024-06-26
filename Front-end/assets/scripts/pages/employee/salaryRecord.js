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
        key: 'hesoluong'
    },
    {
        label: 'Bậc Lương',
        key: 'bacluong'
    },
    {
        label: 'Phụ Cấp trách nhiệm',
        key: 'phucaptrachnhiem'
    },
    {
        label: 'Phụ Cấp Khác',
        key: 'phucapkhac'
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
        label: 'Ngày Hiệu Lực',
        key: 'ngayhieuluc',
        type: 'datetime'
    },
    {
        label: 'Ngày Kết Thúc',
        key: 'ngayketthuc',
        type: 'datetime'
    },
    {
        label: 'Ghi chú',
        key: 'ghichu'
    }
]
function buildApiUrl() {
    return 'https://localhost:7141/api/HoSoLuong/getAllLuongByMaNV/' + 'NV01';
}