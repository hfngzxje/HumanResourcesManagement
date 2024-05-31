function convertToISODate(dateString) {
    try {
        // Tách chuỗi theo dấu "/"
        const [month, day, year] = dateString.split('/');

        // Kiểm tra nếu các giá trị không hợp lệ
        if (!day || !month || !year) {
            throw new Error("Invalid date format");
        }

        // Tạo chuỗi theo định dạng ISO
        const isoDateString = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T00:00:00`;

        return isoDateString;
    } catch (error) {
        return null;
    }

}

function convertToPhoneNumber(phoneString) {
    try {
        // Xóa bỏ tất cả ký tự không phải số
        const cleanedPhoneNumber = phoneString.replace(/\D/g, '');

        // Kiểm tra nếu số điện thoại không hợp lệ
        if (cleanedPhoneNumber.length < 10 || cleanedPhoneNumber.length > 11) {
            throw new Error("Invalid phone number format");
        }

        return cleanedPhoneNumber;
    } catch (error) {
        return null;
    }
}