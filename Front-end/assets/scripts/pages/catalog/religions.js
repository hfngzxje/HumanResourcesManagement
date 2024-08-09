let isPopupEdit = false
const popupCreateBtn = document.getElementById("createBtn")
const popupSaveBtn = document.getElementById("saveBtn")
const popupRemoveBtn = document.getElementById("removeBtn")
const table = document.querySelector('base-table')
const maNhanVien = localStorage.getItem('maNhanVien')

let idTonGiao = null

var oldValue = null;

var TableColumns = [
    {
        label: 'ID',
        key: 'id',
        type: 'disabled'
    },
    {
        label: 'Tên Tôn Giáo',
        key: 'ten'
    },
    {
        label: 'Hành động',
        key: 'action',
        actions: [
            {
                type: 'plain', icon: 'bx bx-save', label: 'Sửa', onClick: (row) => {
                    isPopupEdit = true
                    fetchTonGiao(row.id);
                    showPopup()
                }
            }
        ]
    }
]
var tableEvent = {

    rowDoubleClick: (row) => {

        isPopupEdit = true

        fetchTonGiao(row.id)
        showPopup()
        console.log('row double click ', row);
    }
};
function backToList() {
    window.location.replace("/pages/catalog/religions.html");
}

function buildPayload(formValue) {
    const formClone = { ...formValue }
    formClone['id'] = idTonGiao
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
function fetchTonGiao(id) {
    console.log("Name:", id);
    setLoading(true)
    idTonGiao = id
    $.ajax({
        url: 'https://localhost:7141/api/DanhMucTonGiao/getDanhMucTonGiaoById/' + id,
        method: 'GET',
        success: function (data) {
            setFormValue('editTonGiao', data, 'fetch');
            setFormValue('editTonGiao', data)
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
    const isConfirm = confirm('Bạn chắc chắn muốn tạo danh mục tôn giáo?')
    if (!isConfirm) return
    const valid = validateForm('editTonGiao')
    if (!valid) return
    const formValue = getFormValues('editTonGiao')
    console.log('formValue ', formValue);
    const payload = buildPayload(formValue)
    setLoading(true)
    setTimeout(() => {
        $.ajax({
            url: 'https://localhost:7141/api/DanhMucTonGiao/addDanhMucTonGiao',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(payload),
            success: function (data) {
                console.log('fetchTonGiao res :: ', data);
                alert("Thêm thành công !")
                recordActivityAdmin(maNhanVien, `Thêm danh mục tôn giáo: ${formValue.ten}`);
                closePopup()
                clearFormValues()
                table.handleCallFetchData();
            },
            error: (err) => {
                console.log('err ', err);
                try {
                    if (!err.responseJSON) {
                        alert(err.responseText)
                        // $('.error-message').text(err.responseText).show();
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
    const isConfirm = confirm('Bạn chắc chắn muốn xóa danh mục tôn giáo?')
    if (!isConfirm) return
    setLoading(true)
    setTimeout(() => {
        $.ajax({
            url: 'https://localhost:7141/api/DanhMucTonGiao/removeTonGiao?id=' + idTonGiao,
            method: 'DELETE',
            success: function (data) {
                console.log('fetchTonGiao res :: ', data);
                alert("Xóa thành công !")
                recordActivityAdmin(maNhanVien, `Xóa danh mục tôn giáo: ${oldValue}`);
                closePopup()
                clearFormValues()
                table.handleCallFetchData();
            },
            error: (err) => {
                console.log('fetchTonGiao err :: ', err);
                alert("Xóa thất bại!")
            },
            complete: () => {
                setLoading(false)
            }
        });
    }, 1000);
}
function handleSave() {
    const isConfirm = confirm('Bạn chắc chắn muốn sửa danh mục tôn giáo?')
    if (!isConfirm) return
    const valid = validateForm('editTonGiao')
    if (!valid) return
    const formValue = getFormValues('editTonGiao')
    formValue['id'] = idTonGiao
    const payload = buildPayload(formValue)
    setLoading(true)
    setTimeout(() => {
        $.ajax({
            url: 'https://localhost:7141/api/DanhMucTonGiao/updateTonGiao',
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(payload),
            success: function (data) {
                console.log('fetchTonGiao res :: ', data);
                alert('Lưu Thành Công!')
                recordActivityAdmin(maNhanVien, `Sửa danh mục tôn giáo: ${oldValue} => ${payload.ten} `);
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
    const form = document.getElementById('editTonGiao');
    const inputs = form.querySelectorAll('input, textarea');

    inputs.forEach(input => {
        if (input.type === 'checkbox' || input.type === 'radio') {
            input.checked = false;
        } else {
            input.value = '';
            input.checked = false;
        }
    });
}


function buildApiUrl() {
    return 'https://localhost:7141/api/DanhMucTonGiao/getDanhMucTonGiao'
}

function showPopup() {
    var modal = document.getElementById("editTonGiao");
    modal.style.display = "block";
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            // setFormValue('editTonGiao', {ten: "" })
            clearFormValues();
        }
    }

    console.log('isPopupEdit ', isPopupEdit);

    if (isPopupEdit) {
        const popupTitle = modal.querySelector('h2')
        popupTitle.textContent = "Sửa Tiêu Đề Tôn Giáo"
        popupRemoveBtn.classList.remove('hidden')
        popupSaveBtn.classList.remove('hidden')
        popupSaveBtn.setAttribute('disabled','');
        popupCreateBtn.classList.add('hidden')
    } else {
        const popupTitle = modal.querySelector('h2')
        popupTitle.textContent = "Thêm mới Tiêu Tôn Giáo"
        popupSaveBtn.classList.add('hidden')
        popupRemoveBtn.classList.add('hidden')
        popupCreateBtn.classList.remove('hidden')
    }
}
function checkValues() {
    const formValue = getFormValues('editTonGiao');
    const newValue = formValue.ten;
    console.log("oldValue: ", oldValue, "newValue: ", newValue);
    if (oldValue === newValue) {
        popupSaveBtn.setAttribute('disabled','');
        console.log(popupSaveBtn)
    } else {
        popupSaveBtn.removeAttribute('disabled') ; 
        console.log(popupSaveBtn)
    }
}
function closePopup() {
    var modal = document.getElementById("editTonGiao");
    modal.style.display = "none"
}
document.addEventListener('DOMContentLoaded', () => {
    popupSaveBtn.addEventListener("click", () => {
        console.log('save click');
        handleSave()
    })
    popupCreateBtn.addEventListener("click", handleCreate)
    popupRemoveBtn.addEventListener("click", handleRemoveRow)

    const inputTenTonGiao = document.querySelector('base-input[name="ten"]');
    if (inputTenTonGiao) {
        inputTenTonGiao.addEventListener('input', checkValues);
    }
})
