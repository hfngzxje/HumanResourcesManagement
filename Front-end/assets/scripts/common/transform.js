function convertToISODate(dateString) {
    try {
        // Tách chuỗi theo dấu "/"
        const [day, month, year] = dateString.split('/');

        // Kiểm tra nếu các giá trị không hợp lệ
        if (!day || !month || !year) {
            throw new Error("Invalid date format");
        }

        // Tạo chuỗi theo định dạng ISO
        const isoDateString = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T00:00:00`;

        return isoDateString;
    } catch (error) {
        return dateString
    }

}