const params = new URL(document.location.toString()).searchParams;
const id = params.get("id");
const isEdit = !!id

var MaritalOptions = [
  { label: 'Đã kết hôn', value: 0 },
  { label: 'Chưa kết hôn', value: 1 },
]

function backToList() {
  window.location.replace("/pages/staff/list.html");
}

function fetchEmployee() {
  setLoading(true)
  $.ajax({
    url: 'https://localhost:7141/api/NhanVien/' + id,
    method: 'GET',
    success: function (data) {
      console.log('fetchEmployee res :: ', data);
      // setFormValue('resume_form', formValue)
    },
    error: (err) => {
      console.log('fetchEmployee err :: ', err);
    },
    complete: () => {
      setLoading(false)
    }
  });
}

function handleCreate() {
  const formValue = getFormValues('resume_form')
  setLoading(true)
  $.ajax({
    url: 'https://localhost:7141/api/NhanVien/',
    method: 'POST',
    success: function (data) {
      console.log('fetchEmployee res :: ', data);
      backToList()
    },
    error: (err) => {
      console.log('fetchEmployee err :: ', err);
      alert("Xóa không thành công!")
    },
    complete: () => {
      setLoading(false)
    }
  });
}

function handleRemove() {
  const isConfirm = confirm('Xác nhận xóa')
  if(!isConfirm) return
  setLoading(true)
  $.ajax({
    url: 'https://localhost:7141/api/NhanVien/' + id,
    method: 'DELETE',
    success: function (data) {
      console.log('fetchEmployee res :: ', data);
      backToList()
    },
    error: (err) => {
      console.log('fetchEmployee err :: ', err);
      alert("Xóa thất bại!")
    },
    complete: () => {
      setLoading(false)
    }
  });
}

function handleSave() {
  const formValue = getFormValues('resume_form')
  setLoading(true)
  $.ajax({
    url: 'https://localhost:7141/api/NhanVien/' + id,
    method: 'PUT',
    contentType: 'application/json',
    data: JSON.stringify(formValue),
    success: function (data) {
      console.log('fetchEmployee res :: ', data);
      backToList()
    },
    error: (err) => {
      console.log('fetchEmployee err :: ', err);
      alert("Cập nhật thất bại!")
    },
    complete: () => {
      setLoading(false)
    }
  });
}

function renderActionByStatus() {
  const actionEl = document.getElementById('resume_form_action')
  const buildButton = (label, type, icon) => {
    const btnEl = document.createElement('base-button')
    btnEl.setAttribute('label', label)
    btnEl.setAttribute('type', type)
    btnEl.setAttribute('icon', icon)
    return btnEl
  }
  if(!isEdit) {
    const createBtn = buildButton('Thêm', 'green', 'bx bx-plus')
    createBtn.addEventListener('click', () => {
      backToList()
    })
    actionEl.append(createBtn)
    return
  }

  const removeBtn = buildButton('Xóa', 'red', 'bx bx-trash')
  const saveBtn = buildButton('Lưu', '', 'bx bx-save')
  const exportBtn = buildButton('In', 'plain', 'bx bx-printer')

  removeBtn.addEventListener('click', handleRemove)
  saveBtn.addEventListener('click', handleSave)

  actionEl.append(removeBtn, saveBtn, exportBtn)
}

document.addEventListener('DOMContentLoaded', () => {
  renderActionByStatus()
  if (id) {
    fetchEmployee()
  }
})