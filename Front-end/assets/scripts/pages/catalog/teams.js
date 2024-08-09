
let isPopupEdit = false
const popupCreateBtn = document.getElementById("createBtn")
const popupSaveBtn = document.getElementById("saveBtn")
const popupRemoveBtn = document.getElementById("removeBtn")
const table = document.querySelector('base-table')
const maNhanVien = localStorage.getItem('maNhanVien')
var oldValue = null;

let idToHienTai = null

var TableColumns = [
    {
        label: 'ID',
        key: 'id',
        type: 'disabled'
    },
    {
        label: 'Mã',
        key: 'ma'
    },
    {
        label: 'Tên',
        key: 'ten'
    },
    {
        label: 'Tên phòng',
        key: 'tenPhong'
    },
    {
        label: 'Hành động',
        key: 'action',
        actions: [
            {
                type: 'plain', icon: 'bx bx-save', label: 'Sửa', onClick: (row) => {
                    isPopupEdit = true
                    fetchTo(row.id);
                    showPopup()
                }
            }
        ]
    }
]
var tableEvent = {

    rowDoubleClick: (row) => {

        isPopupEdit = true

        fetchTo(row.id)
        showPopup()
        console.log('row double click ', row);
    }
};
function backToList() {
    window.location.replace("/pages/catalog/teams.html");
}

function buildPayload(formValue) {
    const formClone = { ...formValue }
    return formClone
}


function recordActivityAdmin(actor, action){
    setLoading(true)
    setLoading(true);

    const payload = {
        createdBy: actor,
        action: action,
    };
  
        $.ajax({
            url: 'https://localhost:7141/api/LichSuHoatDong',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(payload),
            success: function (data) {
                console.log('Lịch sử hoạt động đã được lưu:');
            },
            error: (err) => {
                console.log('Lỗi khi lưu lịch sử hoạt động:', err);
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
                    alert("Lưu lịch sử hoạt động không thành công!");
                }
            },
            complete: () => {
                setLoading(false)
            }
        });
}


function fetchTo(id) {
    setLoading(true)
    idToHienTai = id
    $.ajax({
        url: 'https://localhost:7141/api/DanhMucTo/getDanhMucToById/' + id,
        method: 'GET',
        success: function (data) {

            // setFormValue('editTeam', data, 'fetch');
            setFormValue('editTeam', data)
            oldValue = data.ten

        },
        error: (err) => {
            console.log('fetchDepartments err :: ', err);
        },
        complete: () => {
            setLoading(false)
        }
    });
}


function handleCreate() {
    const isConfirm = confirm('Bạn chắc chắn muốn thêm danh mục tổ?')
    if (!isConfirm) return
    const valid = validateForm('editTeam')
    if (!valid) return
    const formValue = getFormValues('editTeam')

    console.log('formValue ', formValue);
    const payload = buildPayload(formValue)
    setLoading(true)
    setTimeout(() => {
        $.ajax({
            url: 'https://localhost:7141/api/DanhMucTo/addDanhMucTo',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(payload),
            success: function (data) {
                console.log('fetchEmployee res :: ', data);
                alert("Thêm thành công !")
                recordActivityAdmin(maNhanVien, `Thêm danh mục tổ: ${formValue.ten}`);
                closePopup()
                clearFormValues()
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

function handleRemoveRow() {
    const isConfirm = confirm('Bạn chắc chắn muốn xóa danh mục tổ?')
    if (!isConfirm) return
    setLoading(true)
    setTimeout(() => {
        $.ajax({
            url: 'https://localhost:7141/api/DanhMucTo/deleteDanhMucTo/' + idToHienTai,
            method: 'DELETE',
            success: function (data) {
                console.log('fetchPhongBan res :: ', data);
                alert("Xóa thành công !")
                recordActivityAdmin(maNhanVien, `Xóa danh mục tổ: ${oldValue}`);
                closePopup()
                clearFormValues()
                table.handleCallFetchData();
            },
            error: (err) => {
                console.log('fetchPhongBan err :: ', err);
                alert("Xóa thất bại!")
            },
            complete: () => {
                setLoading(false)
            }
        });
    }, 1000);
}
function handleSave() {
    const isConfirm = confirm('Bạn chắc chắn muốn sửa danh mục tổ?')
    if (!isConfirm) return
    const formValue = getFormValues('editTeam')
    const payload = buildPayload(formValue)
    console.log('payload ', payload);
    setLoading(true)
    setTimeout(() => {
        $.ajax({
            url: 'https://localhost:7141/api/DanhMucTo/updateDanhMucTo/' + idToHienTai,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(payload),
            success: function (data) {
                console.log('fetchLanguage res :: ', data);
                alert('Lưu Thành Công!')
                recordActivityAdmin(maNhanVien, `Sửa danh mục tổ: ${oldValue} => ${payload.ten} `);
                closePopup()
                clearFormValues()
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

function clearFormValues() {
    const form = document.getElementById('editTeam');
    const inputs = form.querySelectorAll('input, textarea, select');

    inputs.forEach(input => {
        if (input.type === 'checkbox' || input.type === 'radio') {
            input.checked = false;
        } else {
            input.value = '';
            input.selectedIndex = 0;
        }
    });
}


function buildApiUrl() {
    return 'https://localhost:7141/api/DanhMucTo/getDanhMucTo'
}

function showPopup() {
    var modal = document.getElementById("editTeam");
    modal.style.display = "block";
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            clearFormValues();
        }
    }

    console.log('isPopupEdit ', isPopupEdit);

    if (isPopupEdit) {
        const popupTitle = modal.querySelector('h2')
        popupTitle.textContent = "Sửa Tiêu Đề Tổ"
        popupRemoveBtn.classList.remove('hidden')
        popupSaveBtn.classList.remove('hidden')
        // popupSaveBtn.setAttribute('disabled','');
        popupCreateBtn.classList.add('hidden')
    } else {
        const popupTitle = modal.querySelector('h2')
        popupTitle.textContent = "Thêm mới Tiêu Đề Tổ"
        popupSaveBtn.classList.add('hidden')
        popupRemoveBtn.classList.add('hidden')
        popupCreateBtn.classList.remove('hidden')
    }
}
// function checkValues() {
//     const formValue = getFormValues('editTeam');
//     const newValue = formValue.ten;
//     console.log("oldValue: ", oldValue, "newValue: ", newValue);
//     if (oldValue === newValue) {
//         popupSaveBtn.setAttribute('disabled','');
//         console.log(popupSaveBtn)
//     } else {
//         popupSaveBtn.removeAttribute('disabled') ; 
//         console.log(popupSaveBtn)
//     }
// }
function closePopup() {
    var modal = document.getElementById("editTeam");
    modal.style.display = "none"
}
document.addEventListener('DOMContentLoaded', () => {
    popupSaveBtn.addEventListener("click", () => {
        console.log('save click');
        handleSave()
    })
    popupCreateBtn.addEventListener("click", handleCreate)
    popupRemoveBtn.addEventListener("click", handleRemoveRow)

    // const inputTenTo = document.querySelector('base-input[name="ten"]');
    // if (inputTenTo) {
    //     inputTenTo.addEventListener('input', checkValues);
    // }
})

