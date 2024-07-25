class CustomSidebar extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
          <div class="w-[300px] bg-gray-100/70 h-full border-r border-gray-300">
            <div class="p-3 flex items-center border-b border-gray-200">
              <i class="bx bxs-user-circle text-6xl text-gray-700"></i>
              <div class="ml-3">
                <p class="text-lg text-gray-700">Nguyễn Sinh Duy</p>
                <span
                  class="text-xs bg-blue-200 py- px-2 rounded-full text-blue-700"
                  >Admin</span
                >
              </div>
            </div>
            <div class="border-b border-gray-200 ">
              <div
              class="p-3 flex items-center cursor-pointer transition hover:bg-gray-200 relative" id="menu1"">
                <span class="w-10">
                <i class='bx bxs-badge-dollar'></i>
                </span>
                <span> Hệ thống </span>
                <div class="absolute top-0 left-full bg-white border border-gray-200 hidden p-3 mt-[-1px] sub-menu" id="submenu1">
                  <a href="#" class="block p-2 hover:bg-gray-100 submenu-item" style="width: 200px;" id="logOut">Đăng xuất</a>
                  <a id="btn"  class="block p-2 hover:bg-gray-100 submenu-item" style="width: 200px;" id="myBtn">Đổi mật khẩu</a>
                  <a href="#" class="block p-2 hover:bg-gray-100 submenu-item" style="width: 200px;">Close</a>
                  <a href="#" class="block p-2 hover:bg-gray-100 submenu-item" style="width: 200px;">Close All</a>
                  <a href="#" class="block p-2 hover:bg-gray-100 submenu-item" style="width: 200px;">Thoát</a>
                 
                </div>
              </div>
              <div
              class="p-3 flex items-center cursor-pointer transition hover:bg-gray-200 relative" id="menu2"">
                <span class="w-10">
                  <i class='bx bx-group text-lg' ></i>
                </span>
                <span> Hồ sơ </span>
                <div class="absolute top-0 left-full bg-white border border-gray-200 hidden p-3 mt-[-1px] sub-menu" id="submenu2">
                  <a href="#" class="block p-2 hover:bg-gray-100 submenu-item" style="width: 200px;">Hồ sơ</a>
                  <a href="#" class="block p-2 hover:bg-gray-100 submenu-item" style="width: 200px;">Điều chuyển</a>
                  <a href="#" class="block p-2 hover:bg-gray-100 submenu-item" style="width: 200px;">Khen thưởng-Kỷ luật</a>
                  <a href="/pages/staffSideBar/listLaborContract.html" class="block p-2 hover:bg-gray-100 submenu-item" style="width: 200px;">Kiểm tra hợp đồng</a>
                </div>
              </div>
              <a href="/pages/catalog/catalog.html">
              <div
              class="p-3 flex items-center cursor-pointer transition hover:bg-gray-200 relative" id="menu3"">
                <span class="w-10">
                <i class='bx bx-category-alt'></i>
                </span>
                <span> Danh mục </span>
              </div>
              </a>
              <div
              class="p-3 flex items-center cursor-pointer transition hover:bg-gray-200 relative" id="menu4"">
                <span class="w-10">
                <i class='bx bxs-report'></i>
                </span>
                <a href="/pages/staffSideBar/report.html">
                <span> Báo cáo </span> </a>
                <div class="absolute top-[calc(-100% - 1px)] left-full bg-white border border-gray-200 hidden p-3 mt-[-1px] sub-menu" id="submenu4">
                <a href="#" class="block p-2 hover:bg-gray-100 submenu-item" style="width: 200px;">Danh sách nhân viên</a>
                <div class="flex items-center cursor-pointer transition relative" id="menu-child4">
                <a href="#" class="block p-2 hover:bg-gray-100 submenu-item" style="width: 200px; display: flex; justify-content: space-between; align-items: center;">
                  <span>Hồ sơ lương</span>
                  <i class='bx bxs-chevron-right'></i>
               </a>
                     <div class="absolute top-0 left-full bg-white border border-gray-200 hidden p-3 mt-[-1px] sub-menu"" id="submenu4-child"> <!-- Mục con mới -->
                       <a href="#" class="block p-1 hover:bg-gray-100 submenu-item" style="width: 180px;" >Tạm ứng lương</a>
                       <a href="#" class="block p-1 hover:bg-gray-100 submenu-item" style="width: 180px;">Bảng lương tháng</a>
                       <a href="#" class="block p-1 hover:bg-gray-100 submenu-item" style="width: 180px;">Bảng chấm công</a>
                     </div>
                </div>
                <a href="#" class="block p-2 hover:bg-gray-100 submenu-item" style="width: 200px;">Danh sách sinh nhật</a>
                <a href="#" class="block p-2 hover:bg-gray-100 submenu-item" style="width: 200px;">Danh sách đảng viên</a>
                <a href="#" class="block p-2 hover:bg-gray-100 submenu-item" style="width: 200px;">Danh sách trình độ CBCNV</a>
                <a href="#" class="block p-2 hover:bg-gray-100 submenu-item" style="width: 200px;">Danh sách nhóm lương</a>
                <a href="#" class="block p-2 hover:bg-gray-100 submenu-item" style="width: 200px;">Danh sách người thân</a>
                <a href="#" class="block p-2 hover:bg-gray-100 submenu-item" style="width: 200px;">Danh sách diện chính sách</a>
                <a href="#" class="block p-2 hover:bg-gray-100 submenu-item" style="width: 200px;">Danh sách sổ bảo hiểm</a>
              </div>
              </div>
              <div
                class="p-3 flex items-center cursor-pointer transition hover:bg-gray-200"
              >
                <span class="w-10">
                <i class='bx bxs-help-circle'></i>
                </span>
                <span> Trợ giúp </span>
              </div>
            </div>
            <div>
              <div
                class="p-3 flex items-center cursor-pointer transition hover:bg-gray-200"
              >
                <span class="w-10">
                  <i class="bx bx-cog text-lg"></i>
                </span>
                <span> Cấu hình hệ thống </span>
              </div>
              <div
                class="p-3 flex items-center cursor-pointer transition hover:bg-gray-200"
              >
                <span class="w-10">
                  <i class='bx bx-shape-triangle text-lg'></i>
                </span>
                <span> Quản lý phân quyền </span>
              </div>
              <div
                class="p-3 flex items-center cursor-pointer transition hover:bg-gray-200"
              >
                <span class="w-10">
                  <i class="bx bx-cog text-lg"></i>
                </span>
                <span> Quản lý tài khoản </span>
              </div>
            </div>
          </div>
         
         <div id="myModal" class="modal" style="z-index: 100;">
            <div class="change-container">
             <span class="close">&times;</span>
              <form id="change_form">
                  <div class="form-header">
                     <h2>Đổi Mật Khẩu</h2>
                  </div>
                
                <base-input type="password" label="Mật Khẩu Cũ" name="matKhauCu" required="true"></base-input>
                <base-input type="password" label="Mật Khẩu Mới" name="matKhauMoi" required="true"></base-input>
                <base-input type="password" label="Xác Nhận Mật Khẩu Mới" name="xacNhanMatKhauMoi" required="true"></base-input>
             </form>
            <div id="change_form_action" class="flex gap-x-5 mt-5 justify-center"></div>
           </div>
          </div>
          `;
  
      const menuItem = this.querySelector("#menu1");
      const subMenu = this.querySelector("#submenu1");
  
      menuItem.addEventListener("mouseenter", function () {
        subMenu.classList.remove("hidden");
      });
  
      menuItem.addEventListener("mouseleave", function () {
        subMenu.classList.add("hidden");
      });
  
      const menuItem2 = this.querySelector("#menu2");
      const subMenu2 = this.querySelector("#submenu2");
  
      menuItem2.addEventListener("mouseenter", function () {
        subMenu2.classList.remove("hidden");
      });
  
      menuItem2.addEventListener("mouseleave", function () {
        subMenu2.classList.add("hidden");
      });
  
      // const menuItem3 = this.querySelector("#menu3");
      // const subMenu3 = this.querySelector("#submenu3");
  
      // menuItem3.addEventListener("mouseenter", function () {
      //   subMenu3.classList.remove("hidden");
      // });
  
      // menuItem3.addEventListener("mouseleave", function () {
      //   subMenu3.classList.add("hidden");
      // });
      const menuItem4 = this.querySelector("#menu4");
      const subMenu4 = this.querySelector("#submenu4");
      const menu4Child = this.querySelector("#menu-child4");
      const submenu4Child = this.querySelector("#submenu4-child");
  
      menuItem4.addEventListener("mouseenter", function () {
        subMenu4.classList.remove("hidden");
      });
  
      menuItem4.addEventListener("mouseleave", function () {
        subMenu4.classList.add("hidden");
      });
  
      menu4Child.addEventListener("mouseenter", function () {
        submenu4Child.classList.remove("hidden");
      });
  
      menu4Child.addEventListener("mouseleave", function () {
        submenu4Child.classList.add("hidden");
      });
    }
  }