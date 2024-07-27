let idLuongHienTai = null
const vaiTroID = localStorage.getItem("vaiTroID")
const maDetail = localStorage.getItem("maDetail")
const table = document.querySelector('base-table')
const popupRemoveBtn = document.getElementById("deleteBtn")
const popupSaveBtn = document.getElementById("updateBtn")

var MaritalOptions = [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 }
];

var MaritalOptionsBacLuong = [
    { label: '1/7', value: '1/7' },
    { label: '2/7', value: '2/7' },
    { label: '3/7', value: '3/7' },
    { label: '4/7', value: '4/7' },
    { label: '5/7', value: '5/7' },
    { label: '6/7', value: '6/7' },
    { label: '7/7', value: '7/7' }
];

var TableColumns = [
    {
        label: 'Mã Hợp Đồng',
        key: 'mahopdong'
    },
    {
        label: 'Nhóm Lương',
        key: 'nhomluong'
    },
    {
        label: 'Hệ Số Lương',
        key: 'hesoluong'
    },
    {
        label: 'Bậc Lương',
        key: 'bacluong'
    },
    {
        label: 'Phụ Cấp trách nhiệm',
        key: 'phucaptrachnhiem'
    },
    {
        label: 'Phụ Cấp Khác',
        key: 'phucapkhac'
    },
    {
        label: 'Tổng Lương',
        key: 'tongluong',
        type: 'currency'
    },
    {
        label: 'Thời Hạn Lên Lương',
        key: 'thoihanlenluong',
        formatter: (giatri) => giatri + ' năm'
    },
    {
        label: 'Ngày Hiệu Lực',
        key: 'ngayhieuluc',
        type: 'datetime'
    },
    {
        label: 'Ngày Kết Thúc',
        key: 'ngayketthuc',
        type: 'datetime'
    },
    {
        label: 'Ghi chú',
        key: 'ghichu'
    },
    {
        label: 'Hành động',
        key: 'action',
        actions: [
            {
                type: 'plain', icon: 'bx bx-save', label: 'Sửa', onClick: (row) => {
                    isPopupEdit = true
                    fetchSalaryToEdit(row.id)
                    showPopup()
                }
            }
        ]
    }
]
var tableEvent = { // global: ở đau cũng truy cập được
    rowClick: (row) => {
        console.log('row click ', row);
        fetchSalaryToEdit(row.id)
    }
}



function backToList() {
    const url = new URL("/pages/staff/salaryRecord.html", window.location.origin);
    // url.searchParams.set("id", id);
    window.location.replace(url.toString());
}

function buildPayload(formValue) {
    const formClone = { ...formValue }
    formClone['trangThai'] = Number(formClone['trangThai'])

    return formClone
}
function showPopup() {
    var modal = document.getElementById("editSalaryRecord");
    modal.style.display = "block";
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            clearFormValues("editSalaryRecord");
        }
    }
}
function closePopup() {
    var modal = document.getElementById("editSalaryRecord");
    modal.style.display = "none"
}
function fetchSalaryToEdit(id) {
    setLoading(true)
    idLuongHienTai = id
    $.ajax({

        url: 'https://localhost:7141/api/HoSoLuong/getLuongById/' + id,
        method: 'GET',
        success: function (data) {
            setFormValue('editSalaryRecord', data)
        },
        error: (err) => {
            console.log('fetchSalary err :: ', err);
        },
        complete: () => {
            setLoading(false)
        }
    });
}

async function handleCreate() {
    const isConfirm = confirm('Bạn chắc chắn muốn thêm bảng lương?')
    if (!isConfirm) return
    const valid = validateForm('salaryRecord_form')
    if (!valid) return
    const formValue = getFormValues('salaryRecord_form')

    // alert(fetchContractCodeStatus(formValue.mahopdong));
    try {
        // Lấy trạng thái mã hợp đồng
        const contractCodeStatus = await fetchContractCodeStatus(formValue.mahopdong);
        console.log('contractCodeStatus', contractCodeStatus);
        // Kiểm tra trạng thái mã hợp đồng
        if (contractCodeStatus === 0) {
            alert('Đây là hợp đồng chưa chính thức, không thể tạo bảng lương.');
            return;
        }
    } catch (error) {
        console.error('Error fetching contract code status:', error);
        alert('Xảy ra lỗi khi lấy trạng thái mã hợp đồng. Vui lòng thử lại.');
        return;
    }

    const payload = buildPayload(formValue)
    setLoading(true)
    setTimeout(() => {
        $.ajax({
            url: 'https://localhost:7141/api/HoSoLuong/TaoMoiHoSoLuong',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(payload),
            success: function (data) {
                alert('Tạo Thành Công!');
                table.handleCallFetchData();
                clearFormValues("salaryRecord_form")
            },
            error: (err) => {
                console.log('err ', err);
                try {
                    if (!err.responseJSON) {
                        alert(err.responseText)
                        return
                    }
                    const errObj = err.responseJSON.errors
                    const firtErrKey = Object.keys(errObj)[0]
                    const message = errObj[firtErrKey][0]
                    alert(message)
                } catch (error) {
                    alert("Tạo mới không thành công!")
                }
            },
            complete: () => {
                setLoading(false)
            }
        });
    }, 1000);
}

async function fetchContractCodeStatus(mahopdong) {
    const response = await $.ajax({
        url: 'https://localhost:7141/api/HopDong/id?id=' + mahopdong,
        method: 'GET',
    });
    return response.trangThai; // Giả sử API trả về trạng thái của mã hợp đồng trong phản hồi
}

function handleRemove() {
    const isConfirm = confirm('Bạn chắc chắn muốn xóa bảng lương?')
    if (!isConfirm) return
    setLoading(true)
    setTimeout(() => {
        $.ajax({
            url: 'https://localhost:7141/api/HoSoLuong/xoaHoSoLuong/' + idLuongHienTai,
            method: 'DELETE',
            success: function (data) {
                alert('Xóa Thành Công!');
                closePopup();
                table.handleCallFetchData();
            },
            error: (err) => {
                console.log('fetchContract err :: ', err);
                alert("Xóa thất bại!")
            },
            complete: () => {
                setLoading(false)
            }
        });
    }, 1000);
}

// function handleRemoveRow(id) {
//     const isConfirm = confirm('Bạn chắc chắn muốn xóa bảng lương?')
//     if (!isConfirm) return
//     setLoading(true)
//     $.ajax({
//         url: 'https://localhost:7141/api/HoSoLuong/xoaHoSoLuong/' + id,
//         method: 'DELETE',
//         success: function (data) {
//             alert('Xóa Thành Công!');
//             backToList();
//         },
//         error: (err) => {
//             console.log('fetchContract err :: ', err);
//             alert("Xóa thất bại!")
//         },
//         complete: () => {
//             setLoading(false)
//         }
//     });
// }

function handleSave() {
    const isConfirm = confirm('Bạn chắc chắn muốn sửa bảng lương?')
    if (!isConfirm) return
    const formValue = getFormValues('editSalaryRecord')
    const payload = buildPayload(formValue)
    setLoading(true)
    setTimeout(() => {
    $.ajax({
        url: 'https://localhost:7141/api/HoSoLuong/ChinhSuaHoSoLuong/' + idLuongHienTai,
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(payload),
        success: function (data) {
            console.log('fetchContract res :: ', data);
            alert('Lưu Thành Công!');
            closePopup();
            table.handleCallFetchData();
        },
        error: (err) => {
            console.log('err ', err);
            try {
                if (!err.responseJSON) {
                    alert(err.responseText)
                    return
                }
                const errObj = err.responseJSON.errors
                const firtErrKey = Object.keys(errObj)[0]
                const message = errObj[firtErrKey][0]
                alert(message)
            } catch (error) {
                alert("Cập nhật thất bại!")
            }
        },
        complete: () => {
            setLoading(false)
        }
    });
}, 1000); 
}

async function fetchSalary() {
    const formValue = getFormValues('salaryRecord_form');
    const payload = buildPayload(formValue);
    setLoading(true);

    try {
        const salary = await $.ajax({
            url: 'https://localhost:7141/api/HoSoLuong/TinhLuong',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(payload),
        });

        // Gán giá trị lương vào trường input số
        const inputElement = document.querySelector('base-input-number[name="tongluong"]');
        if (inputElement instanceof BaseInputNumber) {
            inputElement.value = salary;
        }

        // alert(salary);
        return salary;
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        setLoading(false);
    }
}

const hesoluongInput = document.querySelector('base-input-number[name="hesoluong"]');
const phucaptrachnhiemInput = document.querySelector('base-input-number[name="phucaptrachnhiem"]');
const phucapkhacInput = document.querySelector('base-input-number[name="phucapkhac"]');

hesoluongInput.addEventListener('input', handleInputChange);
phucaptrachnhiemInput.addEventListener('input', handleInputChange);
phucapkhacInput.addEventListener('input', handleInputChange);

function handleInputChange() {
    // Lấy giá trị từ các trường input
    const hesoluongValue = hesoluongInput.value;
    const phucaptrachnhiemValue = phucaptrachnhiemInput.value;
    const phucapkhacValue = phucapkhacInput.value;

    // Kiểm tra nếu đủ dữ liệu đã được nhập
    if (hesoluongValue !== '' || phucaptrachnhiemValue !== '' || phucapkhacValue !== '') {
        // Gọi hàm fetchSalary()
        fetchSalary()
            .catch(error => {
                // Xử lý lỗi nếu cần
                console.error(error);
            });
    }
}
function clearFormValues(formId) {
    const form = document.getElementById(formId);
    const inputs = form.querySelectorAll('input, textarea');

    inputs.forEach(input => {
        if (input.type === 'checkbox') {
            input.checked = false;
        } else {
            input.value = '';
        }
    });
}

function renderActionByStatus() {
    const actionEl = document.getElementById('salary_form_action')
    const buildButton = (label, type, icon) => {
        const btnEl = document.createElement('base-button')
        btnEl.setAttribute('label', label)
        btnEl.setAttribute('type', type)
        btnEl.setAttribute('icon', icon)
        return btnEl
    }
    const createBtn = buildButton('Thêm', 'green', 'bx bx-plus')
    const clear = buildButton('cLear', 'plain', 'bx bx-eraser')

    createBtn.addEventListener('click', handleCreate)
    clear.addEventListener('click', function () {
        clearFormValues('salaryRecord_form');
    });

    actionEl.append(createBtn, clear)
}

function buildApiHopDong() {
    return 'https://localhost:7141/api/HopDong/GetHopDongByMaNV/id?id=' + maDetail;
}
async function buildApiHopDongA(id) {
    return 'https://localhost:7141/api/HopDong/id?id=' + id;
}

function buildApiUrl() {
    return 'https://localhost:7141/api/HoSoLuong/getAllLuongByMaNV/' + maDetail;
}
document.addEventListener('DOMContentLoaded', () => {
    renderActionByStatus()
    popupRemoveBtn.addEventListener("click", handleRemove)
    popupSaveBtn.addEventListener("click", handleSave)
})

