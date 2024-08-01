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
        key: 'chucvuhientai',

    },
    {
        label: 'Phòng ban',
        key: 'phong',
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
        key: 'trangThai'
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
        const response = await fetch('https://localhost:7141/api/HopDong');
        const khenThuong = await response.json();
        soLuongKhenThuong.textContent = `${khenThuong.length} Khen thưởng`;
    } catch (error) {
        console.error('Có lỗi xảy ra khi lấy dữ liệu:', error);
        soLuongKhenThuong.textContent = 'Không thể lấy dữ liệu';
    }
}
async function soLuongKyLuat() {
    const soLuongKyLuat = document.querySelector('p#countKyLuat');
    try {
        const response = await fetch('https://localhost:7141/api/HopDong');
        const kyLuat = await response.json();
        soLuongKyLuat.textContent = `${kyLuat.length} Kỷ luật`;
    } catch (error) {
        console.error('Có lỗi xảy ra khi lấy dữ liệu:', error);
        soLuongKyLuat.textContent = 'Không thể lấy dữ liệu';
    }
}

async function fetchData() {
    const rewardResponse = await fetch('https://localhost:7141/api/KhenThuongKiLuat/getKhenThuongKiLuatByMaNV/vinhtd/1');
    const disciplineResponse = await fetch('https://localhost:7141/api/KhenThuongKiLuat/getKhenThuongKiLuatByMaNV/vinhtd/0');

    const rewardData = await rewardResponse.json();
    const disciplineData = await disciplineResponse.json();

    return {
        reward: rewardData.length,
        discipline: disciplineData.length
    };
}
async function fetchDataHopDong() {
    const response = await fetch('https://localhost:7141/api/HopDong');
    const contracts = await response.json();

    // Tính tổng số hợp đồng theo trạng thái
    const statusCount = {
        1: 0,
        0: 0
    };

    contracts.forEach(contract => {
        if (statusCount[contract.trangThai] !== undefined) {
            statusCount[contract.trangThai]++;
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
            labels: ['Chính thức', 'Chưa chính thức'],
            datasets: [{
                label: 'Số lượng hợp đồng',
                data: [dataHopDong[1], dataHopDong[0]],
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
})