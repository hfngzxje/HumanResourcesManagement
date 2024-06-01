


var TableColumns = [
    {
      label: 'Mã nhân viên',
      key: 'ma'
    },
    {
      label: 'Tên nhân viên',
      key: 'ten',
    },
    {
      label: 'Chức vụ',
      key: 'chucvuhientai',
     
    },
    {
      label: 'Phòng ban',
      key: 'phong',
    },
    {
      label: 'Hành động',
      key: 'action',
      actions: [
        { type: 'plain', icon: 'bx bx-show', label: 'Chi tiết',onClick: (row) => { backToList(row.ma)} },
        { type: 'red', icon: 'bx bx-trash', label: 'Xóa', onClick: () => { console.log('click') } }
      ]
    }
  ]

  function backToList(id) {

    window.location.replace(`/pages/staff/resume.html?id=${id}`);
}


