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
        key: 'ngaybatdau',
        type: 'datetime'
    },
    {
        label: 'Ngày Kết Thúc',
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
var TableColumnsLaborContract = [
    {
        label: 'Mã hợp đồng',
        key: 'mahopdong',
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

function buildApiUrlSalary() {
    
    return 'https://localhost:7141/api/HoSoLuong/getAllLuongByMaNV/' + ma
}
function buildApiUrlLaborContract() {
    return 'https://localhost:7141/api/HopDong/GetHopDongByMaNV/id?id=' + ma
}

function fetchFamilyRelationshipCount() {
    const baseImageEl = document.querySelector('base-image[description="Quan Hệ Gia Đình"]');
    const h2Element = baseImageEl.querySelector('h2.text-7xl');
    $.ajax({
        url: 'https://localhost:7141/api/NguoiThan/getNguoiThanByMaNV/'+ma,
        method: 'GET',
        success: function(data) {
            
            const familyCount = data.length;
            
            if (baseImageEl) {
                let newTitle = `${familyCount}`;

                console.log("Ma: ", ma)
                baseImageEl.setAttribute('title', newTitle);

              
                if (h2Element) {
                    h2Element.textContent = newTitle;
                }
            }
        },
        error: (err) => {
            h2Element.textContent = "0"
            console.log('fetchFamilyRelationshipCount err :: ', err);
        }
    });
}

function fetchLaborContractCount() {
    const baseImageEl = document.querySelector('base-image[description="Hợp Đồng"]');
    const h2Element = baseImageEl.querySelector('h2.text-7xl');
   
    $.ajax({
        url: 'https://localhost:7141/api/HopDong/GetHopDongByMaNV/id?id='+ma,
        method: 'GET',
        success: function(data) {

            const laborCount = data.length;
            
            if (baseImageEl) {
                let newTitle = `${laborCount}`;

                console.log(newTitle)
                baseImageEl.setAttribute('title', newTitle);

                if (h2Element) {
                    if(laborCount === 0){
                        h2Element.textContent = "0"
                    }
                    else{
                        h2Element.textContent = newTitle;
                    }
                }
            }
        },
        error: (err) => {
            h2Element.textContent = "0"
            console.log('fetchFamilyRelationshipCount err :: ', err);
        }
    });
}

function fetchSalaryCount() {
    const baseImageEl = document.querySelector('base-image[description="Bảng lương"]');
    const h2Element = baseImageEl.querySelector('h2.text-7xl');
    $.ajax({
        url: 'https://localhost:7141/api/HoSoLuong/getAllLuongByMaNV/'+ma,
        method: 'GET',
        success: function(data) {
            const salaryCount = data.length;
            if (baseImageEl) {
                let newTitle = `${salaryCount}`;

                console.log(newTitle)
                baseImageEl.setAttribute('title', newTitle);

                
                if (h2Element) {
                    h2Element.textContent = newTitle;
                }
            }
        },
        error: (err) => {
            console.log('fetchFamilyRelationshipCount err :: ', err);
            h2Element.textContent = 0;
        }
    });
}
function fetchAwardCount() {
    const baseImageEl = document.querySelector('base-image[description="Khen Thưởng"]');
    const h2Element = baseImageEl.querySelector('h2.text-7xl');

    let string1 = 'https://localhost:7141/api/KhenThuongKiLuat/getKhenThuongKiLuatByMaNV/' + ma 
    let string2 = '/1'
    $.ajax({
        url: string1 + string2,
        method: 'GET',
        success: function(data) {

            const awardCount = data.length;
           
            if (baseImageEl) {
                let newTitle = `${awardCount}`;

                console.log(newTitle)
                baseImageEl.setAttribute('title', newTitle);

               
                if (h2Element) {
                    h2Element.textContent = newTitle;
                }
            }
        },
        error: (err) => {
            h2Element.textContent = "0"
            console.log('fetchFamilyRelationshipCount err :: ', err);
        }
    });
}
function fetchDisciplineCount() {
    const baseImageEl = document.querySelector('base-image[description="Kỷ Luật"]');
    const h2Element = baseImageEl.querySelector('h2.text-7xl');

    let string1 = 'https://localhost:7141/api/KhenThuongKiLuat/getKhenThuongKiLuatByMaNV/'+ma 
    let string2 = '/2'
    $.ajax({
        url: string1 + string2,
        method: 'GET',
        success: function(data) {

            const disciplineCount = data.length;
          
            if (baseImageEl) {
                let newTitle = `${disciplineCount}`;

                console.log(newTitle)
                baseImageEl.setAttribute('title', newTitle);

             
                if (h2Element) {
                    h2Element.textContent = newTitle;
                }
            }
        },
        error: (err) => {
            h2Element.textContent = "0"
            console.log('fetchFamilyRelationshipCount err :: ', err);
        }
    });
}
// function fetchBaoCao() {
//     const baseImageEl = document.querySelector('base-image[description="Xuất Báo Cáo"]');
//     const h2Element = baseImageEl.querySelector('h2.text-7xl');

//     let string1 = 'https://localhost:7141/api/KhenThuongKiLuat/getKhenThuongKiLuatByMaNV/'+ma 
//     let string2 = '/2'
//     $.ajax({
//         url: string1 + string2,
//         method: 'GET',
//         success: function(data) {

//             const disciplineCount = data.length;
          
//             if (baseImageEl) {
//                 let newTitle = `${disciplineCount}`;

//                 console.log(newTitle)
//                 baseImageEl.setAttribute('title', newTitle);

             
//                 if (h2Element) {
//                     h2Element.textContent = newTitle;
//                 }
//             }
//         },
//         error: (err) => {
//             h2Element.textContent = "0"
//             console.log('fetchBaoCao err :: ', err);
//         }
//     });
// }

document.addEventListener('DOMContentLoaded', () => {
    fetchFamilyRelationshipCount();
    fetchLaborContractCount();
    fetchSalaryCount();
    fetchAwardCount();
    fetchDisciplineCount();
    // fetchBaoCao();
});
