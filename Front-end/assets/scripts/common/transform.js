function convertToISODate(dateString) {
    try {
        // Tách chuỗi theo dấu "/"
        const [day, month, year] = dateString.split('/');

        // Kiểm tra nếu các giá trị không hợp lệ
        if (!day || !month || !year) {
            throw new Error("Invalid date format");
        }

        // Tạo chuỗi theo định dạng ISO
        const isoDateString = `${year}-${day.padStart(2, '0')}-${month.padStart(2, '0')}T00:00:00`;

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

function formatDate(isoDate) {
    // Create a new Date object from the ISO 8601 date string
    const date = new Date(isoDate);
  
    // Get the month, day, and year from the Date object
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so add 1
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
  
    // Format the date as MM/DD/YYYY
    return `${month}/${day}/${year}`;
  }
