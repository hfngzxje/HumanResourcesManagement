const vaiTroID = localStorage.getItem("vaiTroID")
let maHopDongHienTai = null
let isPopupEdit = false
const popupCreateBtn = document.getElementById("createBtn")
const popupSaveBtn = document.getElementById("saveBtn")
const popupRemoveBtn = document.getElementById("removeBtn")
const popupClearBtn = document.getElementById("clearBtn")

const table = document.querySelector('base-table')

var MaritalOptions = [
    { label: 'Hợp đồng còn thời hạn', value: 1 },
    { label: 'Hợp đồng quá hạn', value: 2 },
];

var TableColumns = [
    {
        label: 'Mã nhân viên',
        key: 'ma',
    },
    {
        label: 'Mã hợp đồng',
        key: 'mahopdong',
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
        label: 'Trạng thái',
        key: 'trangThai',
        formatGiaTri: (value) => {
            let result = { text: 'Hết hạn', color: 'red' };
        if (value === 1) {
            result.text = 'Còn hạn';
            result.color = 'blue';
        }
        return result;
        }
    },
    ,
    {
        label: 'Hành động',
        key: 'action',
        actions: [
            {
                type: 'plain', icon: 'bx bx-save', label: 'Sửa', onClick: (row) => {
                    isPopupEdit = true
                    fetchContract(row.mahopdong)
                    hiddenMaNhanVien();
                    showPopup()
                    console.log('row double click ', row);
                }
            }
        ]
    }
]

var tableEvent = {

    rowDoubleClick: (row) => {

        isPopupEdit = true

        fetchContract(row.mahopdong)
        hiddenMaNhanVien();
        showPopup()
        console.log('row double click ', row);
    }
};

function hiddenMaNhanVien() {
    var modal = document.getElementById("maNhanVien");
    const popupMa = modal.querySelector('base-select');
    popupMa.classList.add('hidden');
}
function RemovehiddenMaNhanVien() {
    var modal = document.getElementById("maNhanVien");
    const popupMa = modal.querySelector('base-select');
    popupMa.classList.remove('hidden');
}
function backToList() {
    const url = new URL("/pages/staffSideBar.html", window.location.origin);
}

function buildPayload(formValue) {
    const formClone = { ...formValue }

    formClone['trangThai'] = Number(formClone['trangThai'])

    return formClone
}

function fetchContract(mahopdong) {
    console.log(mahopdong);
    setLoading(true)
    maHopDongHienTai = mahopdong
    $.ajax({

        url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/HopDong/id?id=' + mahopdong,
        method: 'GET',
        success: function (data) {
            setFormValue('editHopDong', data)
        },
        error: (err) => {
            console.log('fetchContract err :: ', err);
        },
        complete: () => {
            setLoading(false)
        }
    });
}

function handleCreate() {
    const valid = validateForm('editHopDong')
    if (!valid) return
    const formValue = getFormValues('editHopDong')

    console.log('formValue ', formValue);
    const payload = buildPayload(formValue)
    setLoading(true)
    setTimeout(() => {
        $.ajax({

            url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/HopDong/TaoMoiHopDong',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(payload),
            success: function (data) {
                alert('Tạo Thành Công!');
                closePopup()
                clearFormValues("editHopDong")
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
                    alert("Tạo mới không thành công!")
                }


            },
            complete: () => {
                setLoading(false)
            }
        });
    }, 1000);
}

function handleRemove() {
    const isConfirm = confirm('Xác nhận xóa')
    if (!isConfirm) return
    setLoading(true)
    setTimeout(() => {
        $.ajax({
            url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/HopDong/xoaHopDong/' + maHopDongHienTai,
            method: 'DELETE',
            success: function (data) {
                alert('Xóa Thành Công!');
                closePopup()
                clearFormValues("editHopDong")
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

function handleSave() {
    const formValue = getFormValues('editHopDong')

    const payload = buildPayload(formValue)
    setLoading(true)
    setTimeout(() => {
        $.ajax({
            url: 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/HopDong/SuaMoiHopDong/' + maHopDongHienTai,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(payload),
            success: function (data) {
                console.log('fetchContract res :: ', data);
                alert('Lưu Thành Công!');
                closePopup()
                clearFormValues("editHopDong")
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





function buildApiUrl() {
    return 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/HopDong'
}
function showPopup() {
    var modal = document.getElementById("editHopDong");
    modal.style.display = "block";
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            clearFormValues("editHopDong");
        }
    }
    var closeButton = modal.querySelector('.close');
    closeButton.onclick = function () {
        modal.style.display = "none";
    }

    console.log('isPopupEdit ', isPopupEdit);

    if (isPopupEdit) {
        const popupTitle = modal.querySelector('h2')
        popupTitle.textContent = "Sửa Hợp Đồng"
        popupRemoveBtn.classList.remove('hidden')
        popupSaveBtn.classList.remove('hidden')
        popupCreateBtn.classList.add('hidden')
        popupClearBtn.classList.add('hidden')
    } else {
        const popupTitle = modal.querySelector('h2')
        RemovehiddenMaNhanVien();
        popupTitle.textContent = "Thêm Hợp Đồng"
        popupSaveBtn.classList.add('hidden')
        popupRemoveBtn.classList.add('hidden')
        popupCreateBtn.classList.remove('hidden')
        popupClearBtn.classList.remove('hidden')
    }
}

function closePopup() {
    var modal = document.getElementById("editHopDong");
    modal.style.display = "none"
}

document.addEventListener('DOMContentLoaded', () => {

    popupSaveBtn.addEventListener("click", () => {
        console.log('save click');
        handleSave()
    })
    popupCreateBtn.addEventListener("click", handleCreate)
    popupRemoveBtn.addEventListener("click", handleRemove)
    popupClearBtn.addEventListener("click", clearFormValues("editHopDong"))
})

