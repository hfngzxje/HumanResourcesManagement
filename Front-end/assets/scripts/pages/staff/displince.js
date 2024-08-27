const isEdit = !!id
const vaiTroID = localStorage.getItem("vaiTroID")
const maDetail = localStorage.getItem("maDetail")
const table = document.querySelectorAll('base-table')

let maHopDongHienTai = null

var MaritalOptions = [
    { label: 'Kỷ Luật', value: 2 },
];

var TableColumns = [
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

function backToList() {
    const url = new URL("/pages/staff/award.html", window.location.origin);
    url.searchParams.set("id", id);
    window.location.replace(url.toString());
}

function buildPayload(formValue) {
    const formClone = { ...formValue }

    return formClone
}

async function handleCreate() {
    await showConfirm("Bạn có chắc chắn muốn thêm mới kỷ luật ?")
    const valid = validateForm('award_form')
    if (!valid) return
    const formValue = getFormValues('award_form')


    formValue['ma'] = maDetail;
    formValue['khenthuongkiluat'] = '2'
    console.log('formValue ', formValue);
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
            clearFormValues("award_form")
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
    await showConfirm("Bạn có chắc chắn muốn xóa kỷ luật ?")
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

function buildApiUrlKyLuat() {
    if (!maDetail) {
        return false
    }
    let string1 = 'https://hrm70-b4etbsfqg7b7eecg.eastasia-01.azurewebsites.net/api/KhenThuongKiLuat/getKhenThuongKiLuatByMaNV/' + maDetail;
    let string2 = '/Kỷ luật'
    return string1 + string2;
}

document.addEventListener('DOMContentLoaded',async () => {
    await checkIsUpdateResume()
    await checkIsCreatedLabor()
    await checkIsCreatedSalary()
    renderActionByStatus()

})

