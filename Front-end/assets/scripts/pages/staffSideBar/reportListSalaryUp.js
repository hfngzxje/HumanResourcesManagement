const apiTable = "https://localhost:7141/api/DanhSachLenLuong/getDanhSachLenLuong";
var TableColumns = [
    {
        label: 'Mã nhân viên',
        key: 'ma',
    },
    {
        label: 'Họ tên',
        key: 'ten',
    },
    {
        label: 'Chức vụ hiện tại',
        key: 'chucvuhientai'
    },
    {
        label: 'Phòng',
        key: 'phong'
    },
    {
        label: 'Tổ',
        key: 'to'
    }
  ]

  function buildApiUrl(){
    return apiTable;
  }

  document.addEventListener("DOMContentLoaded", () => {
    
  });