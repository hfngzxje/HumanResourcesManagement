var TableColumns = [
    {
        label: 'Mã nhân viên',
        key: 'ma'
    },
    {
        label: 'Tên nhân viên',
        key: 'ten',
    },
    {
        label: 'Chức vụ',
        key: 'tenChucVu',

    },
    {
        label: 'Phòng ban',
        key: 'tenPhongBan',
    }
]

var TableColumnsHopDong = [
    {
        label: 'Mã nhân viên',
        key: 'ma',
    },
    {
        label: 'Loại hợp đồng',
        key: 'loaihopdong',
    },
    {
        label: 'Chức danh',
        key: 'chucdanh',
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
        label: 'Trạng thái',
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

async function soLuongNhanVien() {
    const soLuongNhanVien = document.querySelector('p#countNhanVien');
    try {
        const response = await fetch('https://localhost:7141/api/NhanVien');
        const nhanVien = await response.json();
        soLuongNhanVien.textContent = `${nhanVien.length} Nhân viên`;
    } catch (error) {
        console.error('Có lỗi xảy ra khi lấy dữ liệu:', error);
        soLuongNhanVien.textContent = 'Không thể lấy dữ liệu';
    }
}

async function soLuongHopDong() {
    const soLuongHopDong = document.querySelector('p#countHopDong');
    try {
        const response = await fetch('https://localhost:7141/api/HopDong');
        const hopDong = await response.json();
        soLuongHopDong.textContent = `${hopDong.length} Hợp đồng`;
    } catch (error) {
        console.error('Có lỗi xảy ra khi lấy dữ liệu:', error);
        soLuongNhanVien.textContent = 'Không thể lấy dữ liệu';
    }
}
async function soLuongKhenThuong() {
    const soLuongKhenThuong = document.querySelector('p#countKhenThuong');
    try {
        const khenThuong = await getKhenThuongLength();
        soLuongKhenThuong.textContent = `${khenThuong} Khen thưởng`;
    } catch (error) {
        console.error('Có lỗi xảy ra khi lấy dữ liệu:', error);
        soLuongKhenThuong.textContent = 'Không thể lấy dữ liệu';
    }
}
async function soLuongKyLuat() {
    const soLuongKyLuat = document.querySelector('p#countKyLuat');
    try {
        const kyLuat = await getKyLuatLength();
        soLuongKyLuat.textContent = `${kyLuat} Kỷ luật`;
    } catch (error) {
        console.error('Có lỗi xảy ra khi lấy dữ liệu:', error);
        soLuongKyLuat.textContent = 'Không thể lấy dữ liệu';
    }
}

async function getKhenThuongLength() {
    try {
        const response = await $.ajax({
            url: 'https://localhost:7141/api/KhenThuongKiLuat/getAllKhenThuongKyLuat',
            method: 'GET',
            contentType: 'application/json',
        });
        const awards = response.filter(item => item.khenthuongkiluat === 1)

        return awards.length        
    } catch (error) {
        console.log("Error")
    }
}

async function getKyLuatLength() {
    try {
        const response = await $.ajax({
            url: 'https://localhost:7141/api/KhenThuongKiLuat/getAllKhenThuongKyLuat',
            method: 'GET',
            contentType: 'application/json',
        });
        const disciplines = response.filter(item => item.khenthuongkiluat === 2)

        return disciplines.length        
    } catch (error) {
        console.log("Error")
    }
}

async function fetchData() {    
    const rewardData = await getKhenThuongLength();
    const disciplineData = await getKyLuatLength();
    return {
        reward: rewardData,
        discipline: disciplineData
    };
}
async function fetchDataHopDong() {
    const response = await fetch('https://localhost:7141/api/HopDong');
    const contracts = await response.json();

    // Tính tổng số hợp đồng theo trạng thái
    const statusCount = {
        1: 0,
        2: 0
    };

    contracts.forEach(contract => {
        if (statusCount[contract.loaihopdongId] !== undefined) {
            statusCount[contract.loaihopdongId]++;
        }
    });

    return statusCount;
}
// Tạo biểu đồ tròn
async function createPieChart() {
    const data = await fetchData();
    const ctx = document.getElementById('myPieChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Khen Thưởng', 'Kỷ Luật'],
            datasets: [{
                label: 'Số lượng',
                data: [data.reward, data.discipline],
                backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false, // Cho phép thay đổi tỷ lệ
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            return tooltipItem.label + ': ' + tooltipItem.raw;
                        }
                    }
                }
            }
        }
    });
    //biểu đồ hợp đồng
    const dataHopDong = await fetchDataHopDong();
    const ctxHopDong = document.getElementById('myPieChartHopDong').getContext('2d');
    new Chart(ctxHopDong, {
        type: 'pie',
        data: {
            labels: ['Còn thời hạn', 'Hết hạn'],
            datasets: [{
                label: 'Số lượng hợp đồng',
                data: [dataHopDong[1], dataHopDong[2]],
                backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 159, 64, 0.2)'],
                borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 159, 64, 1)'],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false, // Cho phép thay đổi tỷ lệ
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            return tooltipItem.label + ': ' + tooltipItem.raw;
                        }
                    }
                }
            }
        }
    });

}

createPieChart();




document.addEventListener('DOMContentLoaded', () => {
    soLuongNhanVien()
    soLuongHopDong()
    soLuongKhenThuong()
    soLuongKyLuat()
})