const isEdit = !!id;
// const ma = localStorage.getItem("maNhanVien");
let idNguoiThan = null;
const ma = localStorage.getItem("maNhanVien")

var TableColumnsSalary = [
    {
        label: 'Mã Hợp Đồng',
        key: 'mahopdong'
    },
    {
        label: 'Tổng Lương',
        key: 'tongluong',
        type: 'currency'
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
    }
]
var TableColumnsLaborContract = [
    {
        label: 'Mã hợp đồng',
        key: 'mahopdong',
    },
    {
        label: 'Lương cơ bản',
        key: 'luongcoban',
        type: 'currency'
    },
    {
        label: 'Từ ngày',
        key: 'hopdongtungay',
        type: 'datetime'
    },
    {
        label: 'Đến ngày',
        key: 'hopdongdenngay',
        type: 'datetime'
    }
]

function buildApiUrlSalary() {
    return 'https://localhost:7141/api/HoSoLuong/getAllLuongByMaNV/' + 'NV01'
}
function buildApiUrlLaborContract() {
    return 'https://localhost:7141/api/HopDong/GetHopDongByMaNV/id?id=' + 'NV01'
}

function fetchFamilyRelationshipCount() {
   
    $.ajax({
        url: 'https://localhost:7141/api/NguoiThan/getNguoiThanByMaNV/'+'NV01',
        method: 'GET',
        success: function(data) {

            const familyCount = data.length;
            const baseImageEl = document.querySelector('base-image[description="Quan Hệ Gia Đình"]');
            if (baseImageEl) {
                let newTitle = `${familyCount}`;

                console.log("Ma: ", ma)
                baseImageEl.setAttribute('title', newTitle);

                const h2Element = baseImageEl.querySelector('h2.text-7xl');
                if (h2Element) {
                    h2Element.textContent = newTitle;
                }
            }
        },
        error: (err) => {
            console.log('fetchFamilyRelationshipCount err :: ', err);
        }
    });
}

function fetchLaborContractCount() {
   
    $.ajax({
        url: 'https://localhost:7141/api/HopDong/GetHopDongByMaNV/id?id='+'NV01',
        method: 'GET',
        success: function(data) {

            const laborCount = data.length;
            const baseImageEl = document.querySelector('base-image[description="Hợp Đồng"]');
            if (baseImageEl) {
                let newTitle = `${laborCount}`;

                console.log(newTitle)
                baseImageEl.setAttribute('title', newTitle);

                const h2Element = baseImageEl.querySelector('h2.text-7xl');
                if (h2Element) {
                    if(laborCount === 0){
                        alert("dsd")
                        h2Element.textContent = "0"
                    }
                    else{
                        h2Element.textContent = newTitle;
                    }
                }
            }
        },
        error: (err) => {
            console.log('fetchFamilyRelationshipCount err :: ', err);
        }
    });
}

function fetchSalaryCount() {
  
    $.ajax({
        url: 'https://localhost:7141/api/HoSoLuong/getAllLuongByMaNV/'+'NV01',
        method: 'GET',
        success: function(data) {
            const salaryCount = data.length;
            const baseImageEl = document.querySelector('base-image[description="Bảng lương"]');
            if (baseImageEl) {
                let newTitle = `${salaryCount}`;

                console.log(newTitle)
                baseImageEl.setAttribute('title', newTitle);

                const h2Element = baseImageEl.querySelector('h2.text-7xl');
                if (h2Element) {
                    h2Element.textContent = newTitle;
                }
            }
        },
        error: (err) => {
            console.log('fetchFamilyRelationshipCount err :: ', err);
        }
    });
}
function fetchAwardCount() {
    let string1 = 'https://localhost:7141/api/KhenThuongKiLuat/getKhenThuongKiLuatByMaNV/NV01' 
    let string2 = '/1'
    $.ajax({
        url: string1 + string2,
        method: 'GET',
        success: function(data) {

            const awardCount = data.length;
            const baseImageEl = document.querySelector('base-image[description="Khen Thưởng"]');
            if (baseImageEl) {
                let newTitle = `${awardCount}`;

                console.log(newTitle)
                baseImageEl.setAttribute('title', newTitle);

                const h2Element = baseImageEl.querySelector('h2.text-7xl');
                if (h2Element) {
                    h2Element.textContent = newTitle;
                }
            }
        },
        error: (err) => {
            console.log('fetchFamilyRelationshipCount err :: ', err);
        }
    });
}
function fetchDisciplineCount() {
    let string1 = 'https://localhost:7141/api/KhenThuongKiLuat/getKhenThuongKiLuatByMaNV/NV01' 
    let string2 = '/2'
    $.ajax({
        url: string1 + string2,
        method: 'GET',
        success: function(data) {

            const disciplineCount = data.length;
            const baseImageEl = document.querySelector('base-image[description="Kỷ Luật"]');
            if (baseImageEl) {
                let newTitle = `${disciplineCount}`;

                console.log(newTitle)
                baseImageEl.setAttribute('title', newTitle);

                const h2Element = baseImageEl.querySelector('h2.text-7xl');
                if (h2Element) {
                    h2Element.textContent = newTitle;
                }
            }
        },
        error: (err) => {
            console.log('fetchFamilyRelationshipCount err :: ', err);
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    fetchFamilyRelationshipCount();
    fetchLaborContractCount();
    fetchSalaryCount();
    fetchAwardCount();
    fetchDisciplineCount();
});
