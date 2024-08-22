var maDetail = null
const table = document.querySelectorAll('base-table')

let maHopDongHienTai = null
var TableColumns = [
    {
        label: 'Mã nhân viên',
        key: 'ma'
    },
    {
        label: 'Tên nhân viên',
        key: 'tenNV'
    },
    {
        label: 'Tên',
        key: 'ten'
    },
    {
        label: 'Thời gian',
        key: 'ngay',
        type: 'datetime'
    },
    {
        label: 'Nội dung',
        key: 'noidung',
    },
    {
        label: 'Lý do',
        key: 'lido'
    },
    {
        label: 'Hành động',
        key: 'action',
        actions: [
            { type: 'red', icon: 'bx bx-trash', label: 'Xóa', onClick: (row) => { handleRemoveRow(row.id) } }
        ]
    }
]


function buildPayload(formValue) {
    const formClone = { ...formValue }
    return formClone
}

async function showPopup() {
    var modal = document.getElementById("createAward");
    modal.style.display = "block";
    await getMaNhanVienDauTien()
    await maNhanVienChange()
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            clearFormValues("createAward");
        }
    }
}
function closePopUp() {
    var modal = document.getElementById("createAward");
    modal.style.display = "none";
    clearFormValues("createAward");
}

async function getMaNhanVienDauTien() {
    try {
        const response = await $.ajax({
            url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/NhanVien',
            method: 'GET',
            contentType: 'application/json',
        });
        const nhanVienDauTien = response[0]
        maDetail = nhanVienDauTien.ma

    } catch (error) {
        console.log("Error", "ajaj")
    }
}
async function maNhanVienChange() {
    const ma = document.querySelector('#maNhanVien select')
    ma.addEventListener("change", (event) => {
        maDetail = event.target.value;
    });
}

async function handleCreate() {

    await showConfirm("Bạn có chắc chắn muốn thêm mới khen thưởng ?")
    const valid = validateForm('createAward')
    if (!valid) return

    const formValue = getFormValues('createAward')
    formValue['ma'] = maDetail;
    formValue['khenthuongkiluat'] = '1'
    const payload = buildPayload(formValue)
    setLoading(true)
    setTimeout(() => {
    $.ajax({
        url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/KhenThuongKiLuat/addKhenThuongKiLuat',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(payload),
        success: function (data) {
            showSuccess('Tạo Thành Công!');
            table.forEach(table => {
                if (table.handleCallFetchData) {
                    table.handleCallFetchData();
                }
            });
            clearFormValues("createAward")
            closePopUp()
        },
        error: (err) => {
            console.log('err ', err);
            try {
                if (!err.responseJSON) {
                    showError(err.responseText)
                    return
                }
                const errObj = err.responseJSON.errors
                const firtErrKey = Object.keys(errObj)[0]
                const message = errObj[firtErrKey][0]
                showError(message)
            } catch (error) {
                showError("Tạo mới không thành công!")
            }


            },
            complete: () => {
                setLoading(false)
            }
        });
    }, 1000);
}

async function handleRemoveRow(id) {
    await showConfirm("Bạn có chắc chắn muốn xóa khen thưởng ?")
    setLoading(true)
    setTimeout(() => {
    $.ajax({
        url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/KhenThuongKiLuat/deleteKhenThuongKiLuat/' + id,
        method: 'DELETE',
        success: function (data) {
            showSuccess('Xóa Thành Công!');
            table.forEach(table => {
                if (table.handleCallFetchData) {
                    table.handleCallFetchData();
                }
            });
        },
        error: (err) => {
            console.log('fetchContract err :: ', err);
            showError("Xóa thất bại!")
        },
        complete: () => {
            setLoading(false)
        }
    });
}, 1000); 
}


function renderActionByStatus() {
    const actionEl = document.getElementById('award_form_action')
    const buildButton = (label, type, icon) => {
        const btnEl = document.createElement('base-button')
        btnEl.setAttribute('label', label)
        btnEl.setAttribute('type', type)
        btnEl.setAttribute('icon', icon)
        return btnEl
    }
    const createBtn = buildButton('Thêm', 'green', 'bx bx-plus')

    createBtn.addEventListener('click', handleCreate)

    actionEl.append(createBtn)
}

function buildApiUrlKhenThuong() {
    let string1 = 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/KhenThuongKiLuat/khen-thuong' 
    return string1 
}

async function handleSearch() {
    try {
        const formValue = getFormValues("report_form");
        const tableReport = document.getElementById("tableReport");

        // Khởi tạo đối tượng params
        const params = {
            fromDate: formValue.fromDate || ""
        };

        // Giả sử handleCallFetchData là một hàm không đồng bộ
        await tableReport.handleCallFetchData(params);

    } catch (error) {
        console.error("Error in handleSearch:", error);
    }

}

function dateChange() {
    const ngay = document.querySelector('#ngaykhenthuong input')
    ngay.addEventListener("changeDate", (event) => {
        handleSearch()
    });
    const ngay1 = document.querySelector('#ngaykhenthuong input')
    ngay1.addEventListener("change", (event) => {
        handleSearch()
    });
}

document.addEventListener('DOMContentLoaded', () => {
    dateChange()
     renderActionByStatus()
})

