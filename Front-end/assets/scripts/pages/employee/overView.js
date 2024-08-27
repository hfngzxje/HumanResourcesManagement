const isEdit = !!id;
// const ma = localStorage.getItem("maNhanVien");
const maDetail = localStorage.getItem('maDetail')
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

    return 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/HoSoLuong/getAllLuongByMaNV/' + ma
}
function buildApiUrlLaborContract() {
    return 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/HopDong/GetHopDongByMaNV/id?id=' + ma
}

function fetchFamilyRelationshipCount() {
    const baseImageEl = document.querySelector('base-image[description="Quan Hệ Gia Đình"]');
    const h2Element = baseImageEl.querySelector('h2.text-7xl');
    $.ajax({
        url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/NguoiThan/getNguoiThanByMaNV/' + ma,
        method: 'GET',
        success: function (data) {

            const familyCount = data.length;

            if (baseImageEl) {
                let newTitle = `${familyCount}`;

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
        url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/HopDong/GetHopDongByMaNV/id?id=' + ma,
        method: 'GET',
        success: function (data) {
            if (data && Array.isArray(data)) {
                const laborCount = data.length;

                if (baseImageEl) {
                    let newTitle = `${laborCount}`;

                    baseImageEl.setAttribute('title', newTitle);

                    if (h2Element) {
                        h2Element.textContent = newTitle;
                    }
                }
            }
            else {
                h2Element.textContent = "0"
            }

        },
        error: (err) => {
            console.log('fetchFamilyRelationshipCount err :: ', err);
        }
    });
}

function fetchSalaryCount() {
    const baseImageEl = document.querySelector('base-image[description="Bảng lương"]');
    const h2Element = baseImageEl.querySelector('h2.text-7xl');
    $.ajax({
        url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/HoSoLuong/getAllLuongByMaNV/' + ma,
        method: 'GET',
        success: function (data) {
            if (data && Array.isArray(data)) {
                const salaryCount = data.length;
                if (baseImageEl) {
                    let newTitle = `${salaryCount}`;

                    baseImageEl.setAttribute('title', newTitle);


                    if (h2Element) {
                        h2Element.textContent = newTitle;
                    }
                }
            }
            else {
                h2Element.textContent = "0"
            }
        },
        error: (err) => {
            console.log('fetchFamilyRelationshipCount err :: ', err);
        }
    });
}
function fetchAwardCount() {
    const baseImageEl = document.querySelector('base-image[description="Khen Thưởng"]');
    const h2Element = baseImageEl.querySelector('h2.text-7xl');

    let string1 = 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/KhenThuongKiLuat/getKhenThuongKiLuatByMaNV/' + ma
    let string2 = '/Khen thưởng'
    $.ajax({
        url: string1 + string2,
        method: 'GET',
        success: function (data) {
            if (data && Array.isArray(data)) {

                const awardCount = data.length;

                if (baseImageEl) {
                    let newTitle = `${awardCount}`;

                    baseImageEl.setAttribute('title', newTitle);


                    if (h2Element) {
                        h2Element.textContent = newTitle;
                    }
                }
            }
            else {
                h2Element.textContent = "0"
            }
        },
        error: (err) => {
            console.log('fetchFamilyRelationshipCount err :: ', err);
        }
    });
}
function fetchDisciplineCount() {
    const baseImageEl = document.querySelector('base-image[description="Kỷ Luật"]');
    const h2Element = baseImageEl.querySelector('h2.text-7xl');

    let string1 = 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/KhenThuongKiLuat/getKhenThuongKiLuatByMaNV/' + ma
    let string2 = '/Kỷ luật'
    $.ajax({
        url: string1 + string2,
        method: 'GET',
        success: function (data) {
            if (data && Array.isArray(data)) {
                const disciplineCount = data.length;

                if (baseImageEl) {
                    let newTitle = `${disciplineCount}`;

                    console.log(newTitle)
                    baseImageEl.setAttribute('title', newTitle);


                    if (h2Element) {
                        h2Element.textContent = newTitle;
                    }
                }
            }
            else {
                h2Element.textContent = "0"
            }
        },
        error: (err) => {
            console.log('fetchFamilyRelationshipCount err :: ', err);
        }
    });
}
// function fetchBaoCao() {
//     const baseImageEl = document.querySelector('base-image[description="Xuất Báo Cáo"]');
//     const h2Element = baseImageEl.querySelector('h2.text-7xl');

//     let string1 = 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/KhenThuongKiLuat/getKhenThuongKiLuatByMaNV/'+ma 
//     let string1 = 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/KhenThuongKiLuat/getKhenThuongKiLuatByMaNV/'+ma 
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

document.addEventListener('DOMContentLoaded', async () => {
    await checkIsUpdateResume()
    await checkIsCreatedLabor()
    await checkIsCreatedSalary()
    fetchFamilyRelationshipCount();
    fetchLaborContractCount();
    fetchSalaryCount();
    fetchAwardCount();
    fetchDisciplineCount();
});
