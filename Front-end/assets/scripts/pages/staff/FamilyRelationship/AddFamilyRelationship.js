// call api add

function addRelationship() {
    const ten = document.getElementById('ten').value;
    const gioitinh = document.querySelector('input[name="gioitinh"]:checked').value;
    const relationship = document.getElementById('relationship').value;
    const nghenghiep = document.getElementById('nghenghiep').value;
    const ngaysinh = document.getElementById('ngaysinh').value;
    const dienthoai = document.getElementById('dienthoai').value;
    const diachi = document.getElementById('diachi').value;
    const khac = document.getElementById('khac').value;
    const maNV = new URLSearchParams(window.location.search).get('maNV');
    const formData = {
        ten,
        gioitinh,
        quanhe:relationship,
        nghenghiep,
        ngaysinh,
        dienthoai,
        diachi,
        khac,
        ma:maNV
    };
    console.log(formData)
    const submitObject = {...formData, gioitinh:formData.gioitinh === "true" ? true : false, quanhe:Number(formData.quanhe??"0")}
    fetch('https://localhost:7141/api/NguoiThan/addNguoiThan', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(submitObject)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response;
        })
        .then(data => {
            console.log(data)
            if (data.status === 200) {
                alert('Thêm quan hệ gia đình thành công!');
                // Clear input fields after successful addition
                document.getElementById('ten').value = '';
                document.querySelector('input[name="gioitinh"]:checked').checked = false;
                document.getElementById('relationship').selectedIndex = 0;
                document.getElementById('nghenghiep').value = '';
                document.getElementById('ngaysinh').value = '';
                document.getElementById('dienthoai').value = '';
                document.getElementById('diachi').value = '';
                document.getElementById('khac').value = '';
                // Refresh family list
                getFamilyRelationship(maNV).then(renderFamilyRelationship);
            } else {
                alert('Có lỗi xảy ra khi thêm quan hệ gia đình.');
            }
        })
        .catch(error => {
            console.error('Error adding family relationship:', error);
            alert('Có lỗi xảy ra khi thêm quan hệ gia đình.');
        });
}
