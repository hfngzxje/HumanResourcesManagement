const vaiTroID = localStorage.getItem("vaiTroID")
let idNguoiThan = null
const table = document.querySelector('base-table')
const popupRemoveBtn = document.getElementById("deleteBtn")
const popupUpdatebtn = document.getElementById("updateBtn")
var maDetail = localStorage.getItem('maDetail')
var MaritalOptions = [
    { label: 'Hợp đồng còn thời hạn', value: 1 },
    { label: 'Hợp đồng quá hạn', value: 0 },
];
var relationshipOptions = []
var TableColumns = [
    {
        label: 'Họ Tên',
        key: 'ten'
    },
    {
        label: 'Quan Hệ',
        key: 'quanheTen',

    },
    {
        label: 'Ngày Sinh',
        key: 'ngaysinh',
        type: 'datetime'
    },
    {
        label: 'Giới tính',
        key: 'gioitinh',
        type: 'gender'
    },
    {
        label: 'Địa chỉ',
        key: 'diachi',
    },
    {
        label: 'Điện thoại',
        key: 'dienthoai'
    },
    {
        label: 'Nghề nghiệp',
        key: 'nghenghiep'
    },
    {
        label: 'Thông tin khác',
        key: 'khac'
    },
    {
        label: 'Hành động',
        key: 'action',
        actions: [
            {
                type: 'plain', icon: 'bx bx-save', label: 'Sửa', onClick: (row) => {
                    isPopupEdit = true
                    fetchRelationship(row.id);
                    showPopup()
                }
            }
        ]
    }
]


var tableEvent = { // global: ở đau cũng truy cập được
    rowClick: (row) => {
        console.log('row click ', row);
        fetchRelationship(row.id)
    }
}
function showPopup() {
    var modal = document.getElementById("editFamily");
    modal.style.display = "block";
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            clearFormValues("editFamily");
        }
    }
    var closeButton = modal.querySelector('.close');
    closeButton.onclick = function () {
        modal.style.display = "none";
    }
}
function closePopup() {
    var modal = document.getElementById("editFamily");
    modal.style.display = "none"
}
function backToList() {
    const url = new URL("/pages/staff/FamilyRelationship.html", window.location.origin);
    window.location.replace(url.toString());
}

function buildPayload(formValue) {
    const formClone = { ...formValue }
    return formClone
}

function fetchRelationship(id) {
    setLoading(true)
    idNguoiThan = id
    $.ajax({
        url: 'https://localhost:7141/api/NguoiThan/getNguoiThanById/' + id,
        method: 'GET',
        success: function (data) {
            setFormValue('editFamily', data)
        },
        error: (err) => {
            console.log('fetchEmployee err :: ', err);
        },
        complete: () => {
            setLoading(false)
        }
    });
}
function clearError(formId) {
    const form = document.getElementById(formId);
    const inputs = form.querySelectorAll('.error');

    inputs.forEach(input => {
       input.value = null
    });
}
async function handleCreate() {
    await showConfirm("Bạn có chắc chắn muốn thêm mới quan hệ ?")
    const valid = validateForm('relationship_form')
    if (!valid) return
    const formValue = getFormValues('relationship_form')
    const employeeId = maDetail
    formValue['ma'] = employeeId;
    console.log('formValue ', formValue);
    const payload = buildPayload(formValue)

    setLoading(true)
    setTimeout(() => {
        $.ajax({
            url: 'https://localhost:7141/api/NguoiThan/addNguoiThan',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(payload),
            success: function (data) {
                if (table) {
                    showSuccess("Thêm thành công!");
                    table.handleCallFetchData();
                    clearFormValues("relationship_form")
                }
                else {
                    console.err("Không tìm thấy")
                }
            },
            error: (err) => {
                console.log('err ', err);
                try {
                    if (!err.responseJSON) {
                        showError(err.responseText);
                        return;
                    }
                    const errObj = err.responseJSON.errors;
                    const firtErrKey = Object.keys(errObj)[0];
                    const message = errObj[firtErrKey][0];
                    showError(message);
                } catch (error) {
                    showError("Tạo mới thất bại!");
                }
            },
            complete: () => {
                setLoading(false);
            }
        });
    }, 1000);
}

async function handleRemove() {
    await showConfirm("Bạn có chắc chắn muốn xóa quan hệ ?")
    setLoading(true)
    setTimeout(() => {
        $.ajax({
            url: 'https://localhost:7141/api/NguoiThan/removeNguoiThan/' + idNguoiThan,
            method: 'DELETE',
            success: function (data) {
                showSuccess("Xóa thành công!")
                closePopup()
                table.handleCallFetchData();
            },
            error: (err) => {
                console.log('fetchEmployee err :: ', err);
                showError("Xóa thất bại!")
            },
            complete: () => {
                setLoading(false)
            }
        });
    }, 1000);
}
async function handleSave() {
    await showConfirm("Bạn có chắc chắn muốn sửa quan hệ ?")
    const valid = validateForm('editFamily')
    if (!valid) return

    const formValue = getFormValues('editFamily')
    formValue['id'] = idNguoiThan
    const payload = buildPayload(formValue)
    setTimeout(() => {
        setLoading(true)
        $.ajax({
            url: 'https://localhost:7141/api/NguoiThan/updateNguoiThan',
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(payload),
            success: function (data) {
                showSuccess("Sửa thành công!")
                closePopup()
                table.handleCallFetchData();
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
                    showError("Cập nhật thất bại!")
                }
            },
            complete: () => {
                setLoading(false)
            }
        });
    }, 1000);
}
function renderActionByStatus() {
    const actionEl = document.getElementById('relationship_form_action')
    const buildButton = (id, label, type, icon) => {
        const btnEl = document.createElement('base-button')
        btnEl.setAttribute('id', id)
        btnEl.setAttribute('label', label)
        btnEl.setAttribute('type', type)
        btnEl.setAttribute('icon', icon)
        return btnEl
    }
    const createBtn = buildButton('createId','Thêm', 'green', 'bx bx-plus')
    const clear = buildButton('clearId', 'cLear', 'plain', 'bx bx-eraser')

    createBtn.addEventListener('click', handleCreate)
    clear.addEventListener('click', function () {
        clearFormValues('relationship_form');
    });

    actionEl.append(createBtn, clear)
}

function buildApiUrl() {
    return 'https://localhost:7141/api/NguoiThan/getNguoiThanByMaNV/' + maDetail
}
document.addEventListener('DOMContentLoaded', () => {
    renderActionByStatus();
    popupRemoveBtn.addEventListener("click", handleRemove)
    popupUpdatebtn.addEventListener("click", handleSave)

})
