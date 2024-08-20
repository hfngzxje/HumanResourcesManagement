
const maDetail = localStorage.getItem('maNhanVien')
var TableColumns = [
    {
        label: 'ID',
        key: 'id'
    },
    {
        label: 'Mã nhân viên',
        key: 'ma'
    },
    {
        label: 'Ngày Điều Chuyển',
        key: 'ngayDieuChuyen'
    },
    {
        label: 'từ phòng',
        key: 'tuPhong',
    },
    {
        label: 'Đến phòng',
        key: 'denPhong',
    },
    {
        label: 'Từ tổ',
        key: 'tuTo',

    },
    {
        label: 'Đến tổ',
        key: 'denTo',

    },
    {
        label: 'Từ Chức vụ',
        key: 'tuChucVu',

    },
    {
        label: 'Đến chức vụ',
        key: 'denChucVu',

    },
    {
        label: 'Chi tiết',
        key: 'chiTiet',

    },
    {
        label: 'Trạng thái',
        key: 'trangThai',
        formatGiaTri: (value) => {
            let result = { text: 'Đang chờ', color: 'green' };
        if (value === 1) {
            result.text = 'Đã điều chuyển';
            result.color = 'blue';
        }
        else if(value === -1){
            result.text = 'Đã hủy';
            result.color = 'red';
        }
        return result;
        }

    }
]

function buildApiUrl() {
    return 'https://localhost:7141/api/DieuChuyen/getLichSuDieuChuyen?maNV=' + maDetail
}