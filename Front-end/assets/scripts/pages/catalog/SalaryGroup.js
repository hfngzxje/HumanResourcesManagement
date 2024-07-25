
let isPopupEdit = false
const popupCreateBtn = document.getElementById("createBtn")
const popupSaveBtn = document.getElementById("saveBtn")
const popupRemoveBtn = document.getElementById("removeBtn")
const popupClearBtn = document.getElementById("clearBtn")
const table = document.querySelector('base-table')

var TableColumns = [
    {
        label: 'ID',
        key: 'id'
    },
    {
        label: 'Nhóm ngạch nhân viên',
        key: 'ten'
    }
    ,
    {
        label: 'Bậc lương',
        key: 'ten'
    }
    ,
    {
        label: 'Hệ số lương',
        key: 'ten'
    },
    {
        label: 'Lương cơ bản',
        key: 'ten'
    }
    ,
    {
        label: 'Ghi chú',
        key: 'ten'
    },
    {
        label: 'Hành động',
        key: 'action',
        actions: [
            {
                type: 'plain', icon: 'bx bx-save', label: 'Sửa', onClick: (row) => {
                    isPopupEdit = true
                    // fetchDanToc(row.id);
                    showPopup()
                }
            }
        ]
    } 
]

var tableEvent = {
    
    rowDoubleClick: (row) => {
   
        isPopupEdit = true
       
        // fetchNgachCongChuc(row.id)
        showPopup()
        console.log('row double click ',row);
    }
};
function backToList() {
    window.location.replace("/pages/catalog/salaryGroup.html");
}

function buildPayload(formValue) {
    const formClone = { ...formValue }
    return formClone
}


function showPopup() {
    var modal = document.getElementById("editNhomLuong");
    modal.style.display = "block";
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            // setFormValue('editTeam', { ma: "", ten: "", tenPhong: "", })
            clearFormValues()
        }
    }

    console.log('isPopupEdit ', isPopupEdit);

    if (isPopupEdit) {
        const popupTitle = modal.querySelector('h2')
        popupTitle.textContent = "Sửa nhóm lương"
        popupRemoveBtn.classList.remove('hidden')
        popupSaveBtn.classList.remove('hidden') 
        popupCreateBtn.classList.add('hidden') 
        popupClearBtn.classList.add('hidden')
    } else {
        const popupTitle = modal.querySelector('h2')
        popupTitle.textContent = "Thêm mới nhóm lương"
        popupSaveBtn.classList.add('hidden') 
        popupRemoveBtn.classList.add('hidden')
        popupCreateBtn.classList.remove('hidden') 
        popupClearBtn.classList.remove('hidden')
    }
}
function clearFormValues() {
    const form = document.getElementById('editNhomLuong');
    const inputs = form.querySelectorAll('input, textarea');

    inputs.forEach(input => {
        if (input.type === 'checkbox') {
            input.checked = false;
        } else {
            input.value = '';
        }
    });
}
function closePopup(){
    var modal = document.getElementById("editNhomLuong");
    modal.style.display="none"
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


    createBtn.addEventListener('click', function () {
        isPopupEdit = false
        showPopup()
    });

    actionEl.append(createBtn)

}

function buildApiUrl() {
    return 'https://localhost:7141/api/ChucDanh/getAllChucDanh'
}
document.addEventListener('DOMContentLoaded', () => {
    renderActionByStatus()
    // popupSaveBtn.addEventListener("click", () => {
    //     console.log('save click');
    //     handleSave()
    // })
    // popupCreateBtn.addEventListener("click", handleCreate)
    // popupRemoveBtn.addEventListener("click", handleRemoveRow)
    // popupClearBtn.addEventListener("click", clearFormValues)
})