const redirectUrlLabor = '../staff/laborContract.html'
async function checkIsCreatedLabor() {
    if(!maDetail){
        console.log("Khong co ma detail")
        return
    }
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
            await showNavigation('Bạn chưa tạo xong hợp đồng, quay lại trang web !', redirectUrlLabor)
            resolve();
        }
    } catch (error) {
        console.log("Error",error)
    }
}
const redirectUrlResume = '../staff/resume.html'
async function checkIsUpdateResume() {
    if(!maDetail){
        console.log("Khong co ma detail")
        return
    }
    console.log(maDetail)
    try {
        const response = await $.ajax({
            url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/NhanVien/GetById?id=' + maDetail ,
            method: 'GET',
            contentType: 'application/json',
        });
        if (response.noisinh === null && response.thuongtru=== null && response.tamtru === null) {

            await showNavigation('Bạn chưa cập nhật xong sơ yếu lý lịch, quay lại trang web !', redirectUrlResume)
            resolve();
        }
        else {
            console.log("Vao dc trang")
        }
    } catch (error) {
        console.log("Error",error)
    }
}

const redirectUrlSalary = '../staff/salaryRecord.html'
async function checkIsCreatedSalary() {
    if(!maDetail){
        console.log("Khong co ma detail")
        return
    }
    console.log(maDetail)
    try {
        const response = await $.ajax({
            url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/HoSoLuong/getAllLuongByMaNV/' + maDetail ,
            method: 'GET',
            contentType: 'application/json',
        });
        if (Array.isArray(response) && response.length > 0) {
            console.log("OKE , vao dc trang")
        }
        else {
            await showNavigation('Bạn chưa tạo xong lương, quay lại trang web !', redirectUrlSalary)
            resolve();
        }
    } catch (error) {
        console.log("Error",error)
    }
}

