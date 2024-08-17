const apiTable = "https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/DanhSachLenLuong/getAll";
// const apiTableBaoCao = "https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/DanhSachLenLuong/getAll";


const table = document.querySelector('base-table')
var idNhomLuong = null
var maDetail = null
var TableColumns = [
    {
        label: 'Mã nhân viên',
        key: 'manv',
    },
    {
        label: 'Mã hợp đồng',
        key: 'mahopdong',
    },
    {
        label: 'Hành động',
        key: 'action',
        actions: [
            {
                type: 'plain', icon: 'bx bx-detail', label: 'Thao tác', onClick: (row) => {
                    isPopupEdit = true
                    console.log('row click ', row)
                    fetchSalaryRecent(row.manv)
                    fetchSalaryUp(row.manv)
                    showPopup("showPopUp")
                }
            }
        ]
    }
]
var TableColumnsBaoCao = [
    {
        label: 'Mã nhân viên',
        key: 'manv',
    },
    {
        label: 'Mã hợp đồng',
        key: 'mahopdong',
    },
    {
        label: 'Trạng thái',
        key: 'trangthai',
        formatGiaTri: (value) => {
            let result = { text: 'Đã phê duyệt', color: 'green' };
        if (value === -1) {
            result.text = 'Đã hủy';
            result.color = 'red';
        }
        else if(value === 2){
            result.text = 'Đang chờ';
            result.color = 'blue'
        }
        return result;
        }

    }
]

// ---------- Fetch lương hiện tại---------
async function fetchSalaryRecent(ma) {
    setLoading(true);
    maDetail = ma;
    try {
        const response = await $.ajax({
            url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/HoSoLuong/getAllLuongByMaNV/' + ma,
            method: 'GET',
            contentType: 'application/json',
        });

        // Lọc dữ liệu để chỉ lấy những hồ sơ có trạng thái === 1
        const filteredData = response.filter(item => item.trangthai === 1);

        if (Array.isArray(filteredData) && filteredData.length > 0) {
            const lastItem = filteredData[filteredData.length - 1];
            setFormValue('editSalaryUp', lastItem);
            idNhomLuong = lastItem.nhomluong;
            document.querySelector('#tongLuongPop input').value = formatCurrency(lastItem.tongluong);
            document.querySelector('#phuCapPop input').value = formatCurrency(lastItem.phucaptrachnhiem);
            document.querySelector('#phuCapKhacPop input').value = formatCurrency(lastItem.phucapkhac);
            await getDuLieuNhomLuong('#luongCoBanPop input');
            await getNgachCongChuc('#ngachCongChucPop input');
        } else {
            console.log("Không có dữ liệu trả về hoặc không có hồ sơ nào với trạng thái === 1");
        }
    } catch (err) {
        console.log('fetchSalary err :: ', err);
    } finally {
        setLoading(false);
    }
}

async function fetchSalaryUp(ma) {
    setLoading(true);
    maDetail = ma;
    try {
        const response = await $.ajax({
            url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/HoSoLuong/getAllLuongByMaNV/' + ma,
            method: 'GET',
            contentType: 'application/json',
        });

        // Lọc dữ liệu để chỉ lấy những hồ sơ có trạng thái === 1
        const filteredData = response.filter(item => item.trangthai === 2);

        if (Array.isArray(filteredData) && filteredData.length > 0) {
            const lastItem = filteredData[filteredData.length - 1];
            setFormValue('salaryRecord_form', lastItem);
            idNhomLuong = lastItem.nhomluong;
            document.querySelector('#tongLuongPop input').value = formatCurrency(lastItem.tongluong);
            document.querySelector('#phuCapPop input').value = formatCurrency(lastItem.phucaptrachnhiem);
            document.querySelector('#phuCapKhacPop input').value = formatCurrency(lastItem.phucapkhac);
            await getDuLieuNhomLuong('#luongCoBanNangLuong input');
            await getNgachCongChuc('#ngachCongChucNangLuong input');
        } else {
            console.log("Không có dữ liệu trả về hoặc không có hồ sơ nào mới tạo nâng lương với trạng thái === 2");
        }
    } catch (err) {
        console.log('fetchSalary err :: ', err);
    } finally {
        setLoading(false);
    }
}

var idNgachCongChuc = null
async function getDuLieuNhomLuong(idData) {
    try {
        const response = await $.ajax({
            url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/DanhMucNhomLuong/' + idNhomLuong,
            method: 'GET',
            contentType: 'application/json',
        });
        document.querySelector(idData).value = formatCurrency(response.luongcoban)
        idNgachCongChuc = response.ngachcongchuc
    } catch (error) {
        console.log("Error", "ajaj")
    }
}
async function getNgachCongChuc(idData) {
    try {
        const response = await $.ajax({
            url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/NhanVien/getNgachCongChucById/' + idNgachCongChuc,
            method: 'GET',
            contentType: 'application/json',
        });
        document.querySelector(idData).value = response.ten
    } catch (error) {
        console.log("Error", "ajaj")
    }
}
function showPopup(formId) {
    var modal = document.getElementById(formId);
    modal.style.display = "block";
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            clearFormValues("showPopUp");
            clearFormValues("salaryRecord_form");
        }
    }
}
function clearFormValues(formId) {
    const form = document.getElementById(formId);
    const inputs = form.querySelectorAll('input, textarea,select');
    inputs.forEach(input => {
        if (input.type === 'checkbox') {
            input.checked = false;
        } 
        else if (input.tagName.toLowerCase() === 'select') {
            input.selectedIndex = 0; // Reset select về item đầu tiên
        } else {
            input.value = '';
        }
    });
}
function buildApiUrl() {
    return apiTable;
}
function buildApiUrlBaoCao(){
    return null
}
function formatCurrency(val) {
    return val.toLocaleString("it-IT", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    });
}
document.addEventListener("DOMContentLoaded", () => {

});