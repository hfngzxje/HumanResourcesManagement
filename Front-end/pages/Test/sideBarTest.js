// const apiTable = "https://localhost:7141/api/NhanVien/getByPhongBan?idPhong="+idphong;

var idPhong = null
const ma = localStorage.getItem('maNhanVien')
var TableColumns = [
    {
        label: 'Mã nhân viên',
        key: 'ma'
      },
      {
        label: 'Họ và tên',
        key: 'ten',
      },
      {
        label: 'Ngày sinh',
        key: 'ngaysinh',
        type: 'datetime'
      },
      {
        label: 'Giới tính',
        key: 'gioitinh',
        type: "gender"
      },
      {
        label: 'Địa chỉ',
        key: 'thuongtru',
      },
      {
        label: 'SĐT',
        key: 'didong',
      },
      {
        label: 'Chức vụ',
        key: 'tenChucVu',
    
      },
      {
        label: 'Phòng ban',
        key: 'tenPhongBan',
      }
];

var gioiTinh = [
  { label: "Tất cả", value: '' },
  { label: "Nam", value: 'true' },
  { label: "Nữ", value: 'false' },
];

async function getIdPhongNhanVien() {
    try {
        const response = await $.ajax({
            url: 'https://localhost:7141/api/NhanVien/GetById?id=' + ma,
            method: 'GET',
            contentType: 'application/json',
        });
        const data = response
        idPhong = data.phong
        console.log(idPhong)
    } catch (error) {
        console.log("Error", "ajaj")
    }
}
function buildApiUrl() {
    if(!idPhong){
        return false
    }
    
    return 'https://localhost:7141/api/NhanVien/getByPhongBan?idPhong='+idPhong ;
}

async function handleSearch() {
  try {
    const formValue = getFormValues("report_form");    
    const tableReport = document.getElementById("tableReport");
    getIdPhongNhanVien()
    // Khởi tạo đối tượng params
    const params = {
        gioiTinh: formValue.gioiTinh || "",
        idPhong: idPhong,
    };
       await tableReport.handleCallFetchData(params);
     
  } catch (error) {
    console.error("Error in handleSearch:", error);
  }
  
}

function gioiTinhChange() {
  const gioitinh = document.querySelector('#gioitinh select')
  gioitinh.addEventListener("change", (event) => {
      handleSearch()
  });
}

async function initialize() {
    try {
        await getIdPhongNhanVien(); // Đợi lấy idPhong trước
        
        // Sau khi có idPhong, xây dựng URL API
        const apiUrl = buildApiUrl();
        
        console.log('API URL:', apiUrl);
        // Thực hiện các hành động khác với apiUrl nếu cần
        handleSearch()
        gioiTinhChange()
        
        // Cập nhật tableReport với apiUrl
        const tableReport = document.getElementById("tableReport");
        if (tableReport && typeof tableReport.updateApiUrl === 'function') {
            tableReport.updateApiUrl(apiUrl); // Gọi hàm để cập nhật URL API nếu có
        }
    } catch (error) {
        console.error("Error initializing:", error);
    }
}

document.addEventListener('DOMContentLoaded', initialize);
