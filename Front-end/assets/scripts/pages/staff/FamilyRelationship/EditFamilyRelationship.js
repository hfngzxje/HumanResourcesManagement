function handleEditButtonClick(person) {
    document.getElementById('ten').value = person.ten;
    document.querySelector('input[name="gioitinh"][value="' + person.gioitinh + '"]').checked = true;
    document.getElementById('ngaysinh').value = person.ngaysinh;
        var select = document.getElementById('relationship');
    for (var i = 0; i < select.options.length; i++) {
        if (parseInt(select.options[i].value) === person.quanhe) {
            select.selectedIndex = i;
            break;
        }
    }
    document.getElementById('nghenghiep').value = person.nghenghiep;
    document.getElementById('dienthoai').value = person.dienthoai;
    document.getElementById('diachi').value = person.diachi;
    document.getElementById('khac').value = person.khac;

    // Hiển thị nút Lưu và Xóa, ẩn nút Thêm
    document.querySelector('base-button[label="Thêm"]').style.display = 'none';
    document.querySelector('base-button[label="Lưu"]').style.display = 'inline-block';
    document.querySelector('base-button[label="Xóa"]').style.display = 'inline-block';
}

function saveFamilyRelationship(id) {
    const data = {
        id: id,
        ten: document.getElementById('ten').value,
        gioitinh: document.querySelector('input[name="gioitinh"]:checked').value === 'true',
        ngaysinh: document.getElementById('ngaysinh').value,
        quanhe: document.getElementById('relationship').value,
        nghenghiep: document.getElementById('nghenghiep').value,
        diachi: document.getElementById('diachi').value,
        dienthoai: document.getElementById('dienthoai').value,
        khac: document.getElementById('khac').value
    };
    console.log(data)
    fetch(`https://localhost:7141/api/NguoiThan/updateNguoiThan`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // If successful, show success message
        alert('Cập nhật thông tin thành công');
        // Refresh family list
        getFamilyRelationship(maNV);
    })
    .catch(error => {
        console.error('Error updating family relationship:', error);
    });
}
