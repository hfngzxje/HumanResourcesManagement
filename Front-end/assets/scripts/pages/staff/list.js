const vaiTroID = localStorage.getItem("vaiTroID")

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
        { type: 'plain', icon: 'bx bx-show', label: 'Chi tiết',onClick: (row) => { 
          
          localStorage.setItem("maNhanVien", row.ma)
         const maNhanVien = localStorage.getItem("maNhanVien")
          alert(maNhanVien)
          backToList(row.ma)
        } },
        { type: 'red', icon: 'bx bx-trash', label: 'Xóa', onClick: () => { console.log('click') } }
      ]
    }
  ]

  
  window.history.pushState(null, null, window.location.href);
  window.onpopstate = function () {
      window.history.pushState(null, null, window.location.href);
  };

  function backToList(id) {

    window.location.replace(`/pages/staff/resume.html`);
}

// document.addEventListener('DOMContentLoaded', () => {
//   if (vaiTroID !== "1") {
//       window.location.href = "/pages/error.html";
//       return;
//   }
// })

function addNewEmp(){
  localStorage.removeItem("maNhanVien")
}