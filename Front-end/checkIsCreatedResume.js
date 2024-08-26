async function checkIsCreatedLabor() {
    console.log(maDetail)
    try {
        const response = await $.ajax({
            url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/HopDong/GetHopDongByMaNV/id?id='+maDetail ,
            method: 'GET',
            contentType: 'application/json',
        });
        if (Array.isArray(response) && response.length > 0) {

            console.log("OKE , vao dc trang")
        }
        else {
            await showNavigation('Bạn chưa tạo xong hợp đồng, quay lại trang web !', 'laborContract.html')
            resolve();
        }
    } catch (error) {
        console.log("Error",error)
    }
}

async function checkIsUpdateResume() {
    console.log(maDetail)
    try {
        const response = await $.ajax({
            url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/NhanVien/GetById?id=' + maDetail ,
            method: 'GET',
            contentType: 'application/json',
        });
        if (response.noisinh === null && response.thuongtru=== null && response.tamtru === null) {

            await showNavigation('Bạn chưa cập nhật xong sơ yếu lý lịch, quay lại trang web !', 'resume.html')
            resolve();
        }
        else {
            console.log("Vao dc trang")
        }
    } catch (error) {
        console.log("Error",error)
    }
}

