class CustomHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <header class="bg-gray-700 p-3 flex">
      <div class="flex items-center text-white w-[300px]">
        <i class='bx bx-menu text-white text-2xl cursor-pointer transition hover:brightness-90'></i>
        <span class="ml-3 text-xl font-bold">HR App</span>
      </div>
      <div class="flex-1 flex gap-3">
        <div class="bg-gray-500 px-2 flex items-center rounded-full w-fit flex items-center cursor-pointer transition hover:brightness-90">
          <i class='bx bx-calendar-minus text-lg text-white' ></i>
          <span class="text-sm text-white mx-1">Đơn nghỉ phép</span>
        </div>
        <div class="bg-gray-500 px-2 flex items-center rounded-full w-fit flex items-center cursor-pointer transition hover:brightness-90">
          <i class='bx bxs-user-rectangle text-lg text-white' ></i>
          <span class="text-sm text-white mx-1">Hồ sơ nhân viên</span>
        </div>
      </div>
      <div class="flex gap-3">
        <div class="bg-gray-500 px-1 flex items-center rounded-full relative cursor-pointer transition hover:brightness-90">
          <i class='bx bxs-bell text-2xl text-white' ></i>
          <span class="absolute -top-2 -right-2 border-2 border-gray-700 text-xs text-white bg-red-500 rounded-full px-1">12</span>
        </div>
        <div class="bg-gray-500 px-1 flex items-center rounded-full cursor-pointer transition hover:brightness-90">
          <i class='bx bxs-user-circle text-2xl text-white' ></i>
          <i class='bx bxs-down-arrow text-xs ml-2 text-white' ></i>
        </div>
      </div>
    </header>
      `;
  }
}

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
                <a href="#" class="block p-2 hover:bg-gray-100 submenu-item" style="width: 200px;">Đăng xuất</a>
                <a href="#" class="block p-2 hover:bg-gray-100 submenu-item" style="width: 200px;">Đổi mật khẩu</a>
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
                <a href="#" class="block p-2 hover:bg-gray-100 submenu-item" style="width: 200px;">Kiểm tra hạn hợp đồng</a>
              </div>
            </div>
            <div
            class="p-3 flex items-center cursor-pointer transition hover:bg-gray-200 relative" id="menu3"">
              <span class="w-10">
              <i class='bx bx-category-alt'></i>
              </span>
              <span> Danh mục </span>
              <div class="absolute top-[calc(-100% - 1px)] left-full bg-white border border-gray-200 hidden p-3 mt-[-1px] sub-menu z-index:10;" id="submenu3">
                <a href="#" class="block p-2 hover:bg-gray-100 submenu-item" style="width: 200px;">
                     <i class='bx bxs-detail'></i> 
                     <span> Danh mục dân tộc </span>
                </a> 
               <a href="#" class="block p-2 hover:bg-gray-100 submenu-item" style="width: 200px;">
                     <i class='bx bxs-detail'></i> 
                     <span> Danh mục chức danh </span>
                </a>
                <a href="#" class="block p-2 hover:bg-gray-100 submenu-item" style="width: 250px;">
                     <i class='bx bxs-detail'></i> 
                     <span> Danh mục chuyên môn </span>
                </a>
                <a href="#" class="block p-2 hover:bg-gray-100 submenu-item" style="width: 200px;">
                     <i class='bx bxs-detail'></i> 
                     <span> Danh mục trình độ </span>
                </a>
                <a href="#" class="block p-2 hover:bg-gray-100 submenu-item" style="width: 200px;">
                     <i class='bx bxs-detail'></i> 
                     <span> Danh mục ngoại ngữ </span>
                </a>
                <a href="#" class="block p-2 hover:bg-gray-100 submenu-item" style="width: 200px;">
                     <i class='bx bxs-detail'></i> 
                     <span> Danh mục tổ </span>
                </a> 
               <a href="#" class="block p-2 hover:bg-gray-100 submenu-item" style="width: 200px;">
                     <i class='bx bxs-detail'></i> 
                     <span> Danh mục tôn giáp </span>
                </a>
                <a href="#" class="block p-2 hover:bg-gray-100 submenu-item" style="width: 280px;">
                     <i class='bx bxs-detail'></i> 
                     <span> Danh mục khen thưởng-kỷ luật </span>
                </a>
                <a href="#" class="block p-2 hover:bg-gray-100 submenu-item" style="width: 200px;">
                     <i class='bx bxs-detail'></i> 
                     <span> Danh mục phòng ban </span>
                </a>
                <a href="#" class="block p-2 hover:bg-gray-100 submenu-item" style="width: 250px;">
                     <i class='bx bxs-detail'></i> 
                     <span> Danh mục loại hợp đồng </span>
                </a>
                <a href="#" class="block p-2 hover:bg-gray-100 submenu-item" style="width: 200px;">
                     <i class='bx bxs-detail'></i> 
                     <span> Danh mục nhóm lương </span>
                </a>
                <a href="#" class="block p-2 hover:bg-gray-100 submenu-item" style="width: 250px;">
                     <i class='bx bxs-detail'></i> 
                     <span> Danh mục hình thức đào tạo </span>
                </a>
                <a href="#" class="block p-2 hover:bg-gray-100 submenu-item" style="width: 250px;">
                     <i class='bx bxs-detail'></i> 
                     <span> Danh mục ngạch công chức </span>
                </a>
                <a href="#" class="block p-2 hover:bg-gray-100 submenu-item" style="width: 200px;">
                     <i class='bx bxs-detail'></i> 
                     <span> Danh mục quan hệ </span>
                </a>
              </div>
            </div>
            <div
            class="p-3 flex items-center cursor-pointer transition hover:bg-gray-200 relative" id="menu4"">
              <span class="w-10">
              <i class='bx bxs-report'></i>
              </span>
              <span> Báo cáo </span>
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
        </div>`;

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

    const menuItem3 = this.querySelector("#menu3");
    const subMenu3 = this.querySelector("#submenu3");

    menuItem3.addEventListener("mouseenter", function () {
      subMenu3.classList.remove("hidden");
    });

    menuItem3.addEventListener("mouseleave", function () {
      subMenu3.classList.add("hidden");
    });
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
class BaseInput extends HTMLElement {
  static observedAttributes = ["label", "hide-label", "name", "required"];

  connectedCallback() {
    const label = this.getAttribute("label") || "Base input";
    const hideLabel = !this.getAttribute("hide-label");
    const name = this.getAttribute("name");
    const required = this.getAttribute("required");
    
    this.innerHTML = `
    <div>
      <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 ${hideLabel ? "" : "hidden"
      }">${label}</label>
      <input type="text" name="${name}" required="${required}" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
    </div>
    `;
  }
}
class BaseTextArea extends HTMLElement {
  static observedAttributes = ["label", "hide-label", "name", "required"];

  connectedCallback() {
    const label = this.getAttribute("label") || "Base input";
    const hideLabel = !this.getAttribute("hide-label");
    const name = this.getAttribute("name");
    const required = this.getAttribute("required");

    this.innerHTML = `
    <div class="flex flex-col h-full w-full"> <!-- Thiết lập chiều cao và chiều rộng của textarea -->
    <label for="base-textarea" class="block mb-2 text-sm font-medium text-gray-900 ${hideLabel ? "" : "hidden"}">${label}</label>
      <textarea rows="8" cols="50" name="${name}" required="${required}" class="bg-gray-50 border border-gray-300" placeholder="Nhập thông tin..." > </textarea>
    </div>
    `;
  }
}

class BaseDatePicker extends HTMLElement {
  static observedAttributes = ["label", "name", "required"];

  connectedCallback() {
    const label = this.getAttribute("label") || "Base input";
    const name = this.getAttribute("name")
    const required = this.getAttribute("required");

    this.innerHTML = `
    <div>
      <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900">${label}</label>
      <div class="relative max-w-sm">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
          <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlsn="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
          </svg>
        </div>
        <input datepicker type="text" name="${name}" required="${required}" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 " placeholder="Select date">
      </div>
    </div>
    `;
  }
}

class BaseInputPhone extends HTMLElement {
  static observedAttributes = ["label", "name", "required"];

  connectedCallback() {
    const label = this.getAttribute("label") || "Base input";
    const name = this.getAttribute("name");
    const required = this.getAttribute("required");

    this.innerHTML = `
    <div class="">
      <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900">${label}</label>
      <input type="text" name="${name}" required="${required}" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
    </div>
    `;
  }
}

class BaseInputNumber extends HTMLElement {
  static observedAttributes = ["label", "name", "required"];

  connectedCallback() {
    const label = this.getAttribute("label") || "Base input";
    const name = this.getAttribute("name");
    const required = this.getAttribute("required");

    this.innerHTML = `
    <div class="">
      <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900">${label}</label>
      <input type="text" name="${name}" required="${required}" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
    </div>
    `;
  }
}

class BaseRadio extends HTMLElement {
  static observedAttributes = ["label", "name", "value"];

  connectedCallback() {
    const label = this.getAttribute("label");
    const name = this.getAttribute("name");
    const value = this.getAttribute("value");

    this.innerHTML = `
    <div class="flex items-center mb-4">
      <input type="radio" value="${value}" name="${name}" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600">
      <label for="default-radio-1" class="ms-2 text-sm font-medium text-gray-900 ">${label}</label>
  </div>
    `;
  }
}

class LabelFormItem extends HTMLElement {
  static observedAttributes = ["name"];

  connectedCallback() {
    const name = this.getAttribute("name") || "Base input";

    this.innerHTML = `
      <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900">${name}</label>
    `;
  }
}

class BaseSelect extends HTMLElement {
  static observedAttributes = ["label", "name", "options", "api", "keyValue", "keyLabel", "required"];

  connectedCallback() {
    const label = this.getAttribute("label") || "Base input";
    const name = this.getAttribute("name");
    const optionsKey = this.getAttribute("options");
    const api = this.getAttribute("api");
    const keyValue = this.getAttribute("keyValue") || 'value';
    const keyLabel = this.getAttribute("keyLabel") || 'label';
    const required = this.getAttribute("required");
    

    document.addEventListener('DOMContentLoaded', () => {
      
      if (!!api) {
        $.ajax({
          url: api,
          method: 'GET',
          success: (data) => {
            data.forEach((item) => {
              const option = document.createElement('option')
              option.value = item[keyValue]
              option.innerText = item[keyLabel]
              this.querySelector('select').append(option)
            })
          },
          error: (err) => {
            console.log('Base select api err :: ', err);
          }
        })
        return
      }
      const options = window[optionsKey] || []
      options.forEach(({ value, label }) => {
        const option = document.createElement('option')
        option.value = value
        option.innerText = label
        this.querySelector('select').append(option)
      })
    })

    this.innerHTML = `
    <div class="max-w-sm mx-auto" style="margin: 0;">
      <label class="block mb-2 text-sm font-medium text-gray-900">${label}</label>
      <select name="${name}" required="${required}" class="h-[42px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
      </select>
    </div>
    `;
  }
}
class BaseCheckbox extends HTMLElement {
  static observedAttributes = ["label", "class", "value", "name"];

  connectedCallback() {
    const label = this.getAttribute("label") || "Base input";
    const contentClass = this.getAttribute("class") || "";
    const name = this.getAttribute("name") || "";
    const value = this.getAttribute("value") || "";

    this.innerHTML = `
    <div class="flex items-center mb-4 ${contentClass}">
        <input type="checkbox" value="${value}" name="${name}" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500">
        <label for="default-checkbox" class="ms-2 text-sm font-medium text-gray-900">${label}</label>
    </div>
    `;
  }
}

class BaseUpload extends HTMLElement {
  static observedAttributes = ["label", "class"];

  connectedCallback() {
    const label = this.getAttribute("label") || "Base input";
    const contentClass = this.getAttribute("class") || "";

    this.innerHTML = `
      <div class="flex items-center justify-center w-full h-full">
          <label for="dropzone-file" class="flex flex-col items-center justify-center w-full min-h-64 h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">
              <div class="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                  </svg>
                  <p class="mb-2 text-sm text-gray-50 "><span class="font-semibold">Click to upload</span> or drag and drop</p>
                  <p class="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
              </div>
              <input id="dropzone-file" type="file" class="hidden" />
          </label>
      </div> 
    `;
  }
}

class BaseButton extends HTMLElement {
  static observedAttributes = ["label", "type", "icon", "mini"];

  connectedCallback() {
    const label = this.getAttribute("label") || "Base input";
    const type = this.getAttribute("type") || "primary";
    const icon = this.getAttribute("icon");
    const mini = this.getAttribute("mini") === 'true';

    // Các class chung
    let commonClasses =
      "focus:outline-none font-medium rounded-lg text-sm";
    
      if(mini) {
        commonClasses += ' py-1 px-2'
      } else {
        commonClasses += ' py-2.5 px-5'
      }

    // Các class riêng cho từng button
    const BtnClass = {
      primary: "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300",
      green: "text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300",
      red: "text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300",
      plain: "text-sm font-medium text-blue-900 focus:outline-none bg-blue-50 rounded-lg border border-blue-500 hover:bg-blue-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-blue-100",
    };

    const contentClass = BtnClass[type] || BtnClass.primary;

    this.innerHTML = `
    <button type="button" class="${commonClasses} ${contentClass}">
      ${icon ? `<i class='${icon} mr-1'></i>` : ""} ${label}
    </button>
  `;
  }
}

const tableData = [
  {
    "mahopdong": "003                           ",
    "loaihopdong": "1 năm",
    "chucdanh": "Nhân viên",
    "luongcoban": 730000,
    "hopdongtungay": "2010-06-01T08:42:13",
    "hopdongdenngay": "2010-09-01T08:42:13",
    "ghichu": null,
    "ma": "NV0003    "
  },
  {
    "mahopdong": "004                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Đội trưởng",
    "luongcoban": 730000,
    "hopdongtungay": "2010-08-23T09:08:31.97",
    "hopdongdenngay": "2010-08-23T09:08:31.97",
    "ghichu": null,
    "ma": "NV0004    "
  },
  {
    "mahopdong": "005                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Trưởng phòng",
    "luongcoban": 730000,
    "hopdongtungay": "2010-08-23T10:14:08.093",
    "hopdongdenngay": "2010-08-23T10:14:08.093",
    "ghichu": null,
    "ma": "NV0005    "
  },
  {
    "mahopdong": "011                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Nhân viên",
    "luongcoban": 730000,
    "hopdongtungay": "2007-04-28T14:41:24",
    "hopdongdenngay": "2010-08-28T14:41:24.64",
    "ghichu": null,
    "ma": "NV0011    "
  },
  {
    "mahopdong": "026                           ",
    "loaihopdong": "1 năm",
    "chucdanh": "Nhân viên",
    "luongcoban": 730000,
    "hopdongtungay": "2009-01-01T11:03:16",
    "hopdongdenngay": "2010-01-01T11:03:16",
    "ghichu": null,
    "ma": "NV0026    "
  },
  {
    "mahopdong": "027                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Nhân viên",
    "luongcoban": 1591400,
    "hopdongtungay": "2010-08-24T15:33:38.36",
    "hopdongdenngay": "2010-08-24T15:33:38.36",
    "ghichu": null,
    "ma": "NV0027    "
  },
  {
    "mahopdong": "07                            ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Trưởng phòng",
    "luongcoban": 730000,
    "hopdongtungay": "1997-12-28T14:23:18",
    "hopdongdenngay": "2010-08-28T14:23:18.47",
    "ghichu": null,
    "ma": "NV0007    "
  },
  {
    "mahopdong": "08                            ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Phó phòng",
    "luongcoban": 730000,
    "hopdongtungay": "1991-08-28T14:28:58",
    "hopdongdenngay": "2010-08-28T14:28:58.203",
    "ghichu": null,
    "ma": "NV0008    "
  },
  {
    "mahopdong": "09                            ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Nhân viên",
    "luongcoban": 730000,
    "hopdongtungay": "1974-09-28T14:32:58",
    "hopdongdenngay": "2010-08-28T14:32:58.97",
    "ghichu": null,
    "ma": "NV0009    "
  },
  {
    "mahopdong": "10                            ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Nhân viên",
    "luongcoban": 730000,
    "hopdongtungay": "2001-01-28T14:47:00",
    "hopdongdenngay": "2010-08-28T14:47:00.077",
    "ghichu": null,
    "ma": "NV0010    "
  },
  {
    "mahopdong": "100                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "1989-06-01T14:46:53",
    "hopdongdenngay": "2010-09-08T14:46:53.877",
    "ghichu": null,
    "ma": "NV0100    "
  },
  {
    "mahopdong": "101                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "2003-01-01T16:15:24",
    "hopdongdenngay": "2010-09-08T16:15:24.297",
    "ghichu": null,
    "ma": "NV0101    "
  },
  {
    "mahopdong": "102                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "2002-01-01T17:06:01",
    "hopdongdenngay": "2010-09-08T17:06:01.047",
    "ghichu": null,
    "ma": "NV0102    "
  },
  {
    "mahopdong": "103                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "2002-01-01T10:47:01",
    "hopdongdenngay": "2010-09-09T10:47:01.39",
    "ghichu": null,
    "ma": "NV0103    "
  },
  {
    "mahopdong": "104                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "2003-04-01T11:20:23",
    "hopdongdenngay": "2010-09-09T11:20:23.127",
    "ghichu": null,
    "ma": "NV0104    "
  },
  {
    "mahopdong": "105                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "2006-05-01T11:27:26",
    "hopdongdenngay": "2010-09-09T11:27:26.297",
    "ghichu": null,
    "ma": "NV0105    "
  },
  {
    "mahopdong": "106                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "2005-03-01T14:30:33",
    "hopdongdenngay": "2010-09-09T14:30:33.03",
    "ghichu": null,
    "ma": "NV0106    "
  },
  {
    "mahopdong": "107                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "2009-06-30T14:51:14",
    "hopdongdenngay": "2010-09-09T14:51:14.03",
    "ghichu": "",
    "ma": "NV0107    "
  },
  {
    "mahopdong": "108                           ",
    "loaihopdong": "1 năm",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "2009-04-01T14:58:39",
    "hopdongdenngay": "2010-03-31T14:58:39",
    "ghichu": null,
    "ma": "NV0108    "
  },
  {
    "mahopdong": "109                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Trưởng trang",
    "luongcoban": 730000,
    "hopdongtungay": "1985-11-01T15:54:37",
    "hopdongdenngay": "2010-09-14T15:54:37.707",
    "ghichu": null,
    "ma": "NV0109    "
  },
  {
    "mahopdong": "110                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "1998-10-01T09:39:44",
    "hopdongdenngay": "2010-09-15T09:39:44.343",
    "ghichu": null,
    "ma": "NV0110    "
  },
  {
    "mahopdong": "111                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "2007-04-01T09:48:46",
    "hopdongdenngay": "2010-09-15T09:48:46.47",
    "ghichu": null,
    "ma": "NV0111    "
  },
  {
    "mahopdong": "112                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Bảo vệ",
    "luongcoban": 730000,
    "hopdongtungay": "2002-06-01T10:06:42",
    "hopdongdenngay": "2010-09-15T10:06:42.36",
    "ghichu": null,
    "ma": "NV0112    "
  },
  {
    "mahopdong": "113                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "2008-07-01T10:23:37",
    "hopdongdenngay": "2010-09-15T10:23:37.843",
    "ghichu": null,
    "ma": "NV0113    "
  },
  {
    "mahopdong": "114                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "1996-01-01T15:45:11",
    "hopdongdenngay": "2010-09-15T15:45:11.97",
    "ghichu": null,
    "ma": "NV0114    "
  },
  {
    "mahopdong": "115                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "1986-01-01T15:52:47",
    "hopdongdenngay": "2010-09-15T15:52:47.827",
    "ghichu": null,
    "ma": "NV0115    "
  },
  {
    "mahopdong": "116                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "2009-08-01T16:40:51",
    "hopdongdenngay": "2010-07-31T16:40:51",
    "ghichu": null,
    "ma": "NV0116    "
  },
  {
    "mahopdong": "117                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "1999-03-01T07:51:27",
    "hopdongdenngay": "2010-09-16T07:51:27.423",
    "ghichu": null,
    "ma": "NV0117    "
  },
  {
    "mahopdong": "118                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "1985-12-01T07:58:38",
    "hopdongdenngay": "2010-09-16T07:58:38.327",
    "ghichu": null,
    "ma": "NV0118    "
  },
  {
    "mahopdong": "119                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "2000-01-01T08:03:39",
    "hopdongdenngay": "2010-09-16T08:03:39.953",
    "ghichu": null,
    "ma": "NV0119    "
  },
  {
    "mahopdong": "12                            ",
    "loaihopdong": "1 năm",
    "chucdanh": "Nhân viên",
    "luongcoban": 730000,
    "hopdongtungay": "2010-04-01T09:03:22",
    "hopdongdenngay": "2011-04-01T09:03:22",
    "ghichu": null,
    "ma": "NV0012    "
  },
  {
    "mahopdong": "120                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "2005-07-01T08:10:20",
    "hopdongdenngay": "2010-09-16T08:10:20.157",
    "ghichu": null,
    "ma": "NV0120    "
  },
  {
    "mahopdong": "121                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "2007-10-01T08:22:42",
    "hopdongdenngay": "2010-09-16T08:22:42.813",
    "ghichu": null,
    "ma": "NV0121    "
  },
  {
    "mahopdong": "122                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "2004-09-01T08:43:36",
    "hopdongdenngay": "2010-09-16T08:43:36.47",
    "ghichu": null,
    "ma": "NV0122    "
  },
  {
    "mahopdong": "123                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "2001-04-01T09:16:47",
    "hopdongdenngay": "2010-09-16T09:16:47.64",
    "ghichu": null,
    "ma": "NV0123    "
  },
  {
    "mahopdong": "124                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "1983-01-01T09:48:58",
    "hopdongdenngay": "2010-09-16T09:48:58.97",
    "ghichu": null,
    "ma": "NV0124    "
  },
  {
    "mahopdong": "125                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "1997-03-01T10:28:10",
    "hopdongdenngay": "2010-09-16T10:28:10.22",
    "ghichu": null,
    "ma": "NV0125    "
  },
  {
    "mahopdong": "126                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Trưởng trang",
    "luongcoban": 730000,
    "hopdongtungay": "2006-01-01T11:04:47",
    "hopdongdenngay": "2010-09-16T11:04:47.97",
    "ghichu": null,
    "ma": "NV0126    "
  },
  {
    "mahopdong": "127                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "1998-01-01T14:42:10",
    "hopdongdenngay": "2010-09-16T14:42:10.233",
    "ghichu": null,
    "ma": "NV0127    "
  },
  {
    "mahopdong": "128                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "1985-06-01T15:09:00",
    "hopdongdenngay": "2010-09-16T15:09:00",
    "ghichu": null,
    "ma": "NV0128    "
  },
  {
    "mahopdong": "13                            ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Nhân viên",
    "luongcoban": 730000,
    "hopdongtungay": "1988-11-28T15:06:31",
    "hopdongdenngay": "2010-08-28T15:06:31.563",
    "ghichu": null,
    "ma": "NV0013    "
  },
  {
    "mahopdong": "130                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "1994-07-01T16:16:54",
    "hopdongdenngay": "2010-09-16T16:16:54.39",
    "ghichu": null,
    "ma": "NV0130    "
  },
  {
    "mahopdong": "131                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "1994-06-01T16:28:29",
    "hopdongdenngay": "2010-09-16T16:28:29.89",
    "ghichu": null,
    "ma": "NV0131    "
  },
  {
    "mahopdong": "132                           ",
    "loaihopdong": "1 năm",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "2008-07-01T17:07:23",
    "hopdongdenngay": "2009-06-30T17:07:23",
    "ghichu": null,
    "ma": "NV0132    "
  },
  {
    "mahopdong": "133                           ",
    "loaihopdong": "1 năm",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "2008-07-01T17:13:15",
    "hopdongdenngay": "2009-06-30T17:13:15",
    "ghichu": null,
    "ma": "NV0133    "
  },
  {
    "mahopdong": "134                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Trưởng phòng",
    "luongcoban": 730000,
    "hopdongtungay": "1989-06-01T08:14:43",
    "hopdongdenngay": "2010-09-17T08:14:43.313",
    "ghichu": null,
    "ma": "NV0134    "
  },
  {
    "mahopdong": "135                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Phó phòng",
    "luongcoban": 730000,
    "hopdongtungay": "1978-09-01T08:36:30",
    "hopdongdenngay": "2010-09-17T08:36:30.36",
    "ghichu": null,
    "ma": "NV0135    "
  },
  {
    "mahopdong": "136                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Trưởng trang",
    "luongcoban": 730000,
    "hopdongtungay": "1983-10-01T08:47:11",
    "hopdongdenngay": "2010-09-17T08:47:11.267",
    "ghichu": null,
    "ma": "NV0136    "
  },
  {
    "mahopdong": "137                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Bảo vệ",
    "luongcoban": 730000,
    "hopdongtungay": "1999-06-01T08:54:26",
    "hopdongdenngay": "2010-09-17T08:54:26.407",
    "ghichu": null,
    "ma": "NV0137    "
  },
  {
    "mahopdong": "138                           ",
    "loaihopdong": "1 năm",
    "chucdanh": "Bảo vệ",
    "luongcoban": 730000,
    "hopdongtungay": "2010-01-01T09:23:19",
    "hopdongdenngay": "2010-12-31T09:23:19",
    "ghichu": null,
    "ma": "NV0138    "
  },
  {
    "mahopdong": "139                           ",
    "loaihopdong": "2 năm",
    "chucdanh": "Nhân viên",
    "luongcoban": 730000,
    "hopdongtungay": "2008-08-01T09:36:18",
    "hopdongdenngay": "2010-07-31T09:36:18",
    "ghichu": "",
    "ma": "NV0139    "
  },
  {
    "mahopdong": "14                            ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Tổ trưởng",
    "luongcoban": 730000,
    "hopdongtungay": "1978-01-28T14:59:37",
    "hopdongdenngay": "2010-08-28T14:59:37.47",
    "ghichu": null,
    "ma": "NV0014    "
  },
  {
    "mahopdong": "140                           ",
    "loaihopdong": "1 năm",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "2008-12-01T15:01:32",
    "hopdongdenngay": "2009-11-30T15:01:32",
    "ghichu": null,
    "ma": "NV0140    "
  },
  {
    "mahopdong": "141                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "1997-10-01T15:46:07",
    "hopdongdenngay": "2010-09-17T15:46:07.563",
    "ghichu": null,
    "ma": "NV0141    "
  },
  {
    "mahopdong": "142                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Bảo vệ",
    "luongcoban": 730000,
    "hopdongtungay": "2003-02-01T15:53:43",
    "hopdongdenngay": "2010-09-17T15:53:43.017",
    "ghichu": null,
    "ma": "NV0142    "
  },
  {
    "mahopdong": "143                           ",
    "loaihopdong": "1 năm",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "2008-07-01T16:54:03",
    "hopdongdenngay": "2009-06-30T16:54:03",
    "ghichu": null,
    "ma": "NV0143    "
  },
  {
    "mahopdong": "144                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "2003-02-01T14:11:16",
    "hopdongdenngay": "2010-09-20T14:11:16.437",
    "ghichu": null,
    "ma": "NV0144    "
  },
  {
    "mahopdong": "145                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "2001-04-01T14:14:23",
    "hopdongdenngay": "2010-09-20T14:14:23.657",
    "ghichu": null,
    "ma": "NV0145    "
  },
  {
    "mahopdong": "146                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "2002-06-01T14:24:46",
    "hopdongdenngay": "2010-09-20T14:24:46.843",
    "ghichu": null,
    "ma": "NV0146    "
  },
  {
    "mahopdong": "147                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "2003-02-01T14:33:45",
    "hopdongdenngay": "2010-09-20T14:33:45.983",
    "ghichu": null,
    "ma": "NV0147    "
  },
  {
    "mahopdong": "148                           ",
    "loaihopdong": "1 năm",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "2009-01-01T08:30:55",
    "hopdongdenngay": "2010-01-01T08:30:55",
    "ghichu": null,
    "ma": "NV0148    "
  },
  {
    "mahopdong": "149                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "2003-02-01T08:47:54",
    "hopdongdenngay": "2010-09-21T08:47:54.86",
    "ghichu": null,
    "ma": "NV0149    "
  },
  {
    "mahopdong": "15                            ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Bảo vệ",
    "luongcoban": 730000,
    "hopdongtungay": "1978-01-28T14:54:46",
    "hopdongdenngay": "2010-08-28T14:54:46.093",
    "ghichu": null,
    "ma": "NV0015    "
  },
  {
    "mahopdong": "150                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "2001-04-01T08:40:50",
    "hopdongdenngay": "2010-09-21T08:40:50.643",
    "ghichu": null,
    "ma": "NV0150    "
  },
  {
    "mahopdong": "151                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "2003-02-01T08:52:55",
    "hopdongdenngay": "2010-09-21T08:52:55.643",
    "ghichu": null,
    "ma": "NV0151    "
  },
  {
    "mahopdong": "152                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "2003-02-01T08:58:24",
    "hopdongdenngay": "2010-09-21T08:58:24.877",
    "ghichu": null,
    "ma": "NV0152    "
  },
  {
    "mahopdong": "153                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Tổ trưởng",
    "luongcoban": 730000,
    "hopdongtungay": "2003-12-01T09:02:27",
    "hopdongdenngay": "2010-09-21T09:02:27.503",
    "ghichu": null,
    "ma": "NV0153    "
  },
  {
    "mahopdong": "154                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "2003-02-01T10:19:22",
    "hopdongdenngay": "2010-09-21T10:19:22.253",
    "ghichu": null,
    "ma": "NV0154    "
  },
  {
    "mahopdong": "155                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "2003-02-01T10:26:48",
    "hopdongdenngay": "2010-09-21T10:26:48.063",
    "ghichu": null,
    "ma": "NV0155    "
  },
  {
    "mahopdong": "156                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "2003-02-01T10:45:32",
    "hopdongdenngay": "2010-09-21T10:45:32.563",
    "ghichu": null,
    "ma": "NV0156    "
  },
  {
    "mahopdong": "157                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "2003-02-01T11:03:31",
    "hopdongdenngay": "2010-09-21T11:03:31.457",
    "ghichu": null,
    "ma": "NV0157    "
  },
  {
    "mahopdong": "158                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "2002-11-01T11:17:38",
    "hopdongdenngay": "2010-09-21T11:17:38.61",
    "ghichu": null,
    "ma": "NV0158    "
  },
  {
    "mahopdong": "159                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "1987-05-01T09:24:39",
    "hopdongdenngay": "2010-09-20T09:24:39.25",
    "ghichu": null,
    "ma": "NV0159    "
  },
  {
    "mahopdong": "16                            ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Bảo vệ",
    "luongcoban": 730000,
    "hopdongtungay": "1996-05-28T15:13:23",
    "hopdongdenngay": "2010-08-28T15:13:23.577",
    "ghichu": null,
    "ma": "NV0016    "
  },
  {
    "mahopdong": "160                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "2000-12-01T09:32:09",
    "hopdongdenngay": "2010-09-20T09:32:09.077",
    "ghichu": null,
    "ma": "NV0160    "
  },
  {
    "mahopdong": "161                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "1987-07-01T09:58:23",
    "hopdongdenngay": "2010-09-20T09:58:23.437",
    "ghichu": null,
    "ma": "NV0161    "
  },
  {
    "mahopdong": "162                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "1984-04-01T10:04:39",
    "hopdongdenngay": "2010-09-20T10:04:39.687",
    "ghichu": null,
    "ma": "NV0162    "
  },
  {
    "mahopdong": "163                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "1981-11-01T10:13:55",
    "hopdongdenngay": "2010-09-20T10:13:55.28",
    "ghichu": null,
    "ma": "NV0163    "
  },
  {
    "mahopdong": "164                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "1994-06-01T11:25:38",
    "hopdongdenngay": "2010-09-20T11:25:38.22",
    "ghichu": null,
    "ma": "NV0164    "
  },
  {
    "mahopdong": "165                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "2007-04-01T09:21:11",
    "hopdongdenngay": "2010-09-22T09:21:11.233",
    "ghichu": null,
    "ma": "NV0165    "
  },
  {
    "mahopdong": "166                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "1990-12-01T09:35:44",
    "hopdongdenngay": "2010-09-22T09:35:44.5",
    "ghichu": null,
    "ma": "NV0166    "
  },
  {
    "mahopdong": "167                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Đội trưởng",
    "luongcoban": 730000,
    "hopdongtungay": "1970-01-01T10:28:58",
    "hopdongdenngay": "2010-09-22T10:28:58.813",
    "ghichu": null,
    "ma": "NV0167    "
  },
  {
    "mahopdong": "168                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "1985-12-01T15:32:19",
    "hopdongdenngay": "2010-09-22T15:32:19.983",
    "ghichu": null,
    "ma": "NV0168    "
  },
  {
    "mahopdong": "169                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "1994-12-01T09:59:02",
    "hopdongdenngay": "2010-09-23T09:59:02",
    "ghichu": null,
    "ma": "NV0169    "
  },
  {
    "mahopdong": "17                            ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Bảo vệ",
    "luongcoban": 730000,
    "hopdongtungay": "2004-03-01T15:03:07",
    "hopdongdenngay": "2010-08-28T15:03:07.75",
    "ghichu": null,
    "ma": "NV0017    "
  },
  {
    "mahopdong": "170                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "1985-12-01T10:50:26",
    "hopdongdenngay": "2010-09-23T10:50:26.72",
    "ghichu": null,
    "ma": "NV0170    "
  },
  {
    "mahopdong": "171                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "2007-04-01T14:16:22",
    "hopdongdenngay": "2010-09-23T14:16:22.843",
    "ghichu": null,
    "ma": "NV0171    "
  },
  {
    "mahopdong": "172                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "1993-04-01T15:21:26",
    "hopdongdenngay": "2010-09-23T15:21:26.453",
    "ghichu": null,
    "ma": "NV0172    "
  },
  {
    "mahopdong": "173                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "1998-08-01T15:30:06",
    "hopdongdenngay": "2010-09-23T15:30:06.39",
    "ghichu": null,
    "ma": "NV0173    "
  },
  {
    "mahopdong": "174                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "2000-12-01T15:34:15",
    "hopdongdenngay": "2010-09-23T15:34:15.577",
    "ghichu": null,
    "ma": "NV0174    "
  },
  {
    "mahopdong": "175                           ",
    "loaihopdong": "Công nhật",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "2000-12-01T15:42:02",
    "hopdongdenngay": "2010-09-23T15:42:02",
    "ghichu": null,
    "ma": "NV0175    "
  },
  {
    "mahopdong": "176                           ",
    "loaihopdong": "1 năm",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "2009-10-01T15:54:00",
    "hopdongdenngay": "2010-09-23T15:54:00.78",
    "ghichu": null,
    "ma": "NV0176    "
  },
  {
    "mahopdong": "177                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "2009-09-01T17:02:58",
    "hopdongdenngay": null,
    "ghichu": null,
    "ma": "NV0177    "
  },
  {
    "mahopdong": "178                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "2010-09-27T10:22:35.377",
    "hopdongdenngay": "2010-09-27T10:22:35.377",
    "ghichu": null,
    "ma": "NV0178    "
  },
  {
    "mahopdong": "179                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "1990-12-01T16:22:23",
    "hopdongdenngay": "2010-08-27T16:22:23.937",
    "ghichu": null,
    "ma": "NV0179    "
  },
  {
    "mahopdong": "18                            ",
    "loaihopdong": "Công nhật",
    "chucdanh": "Bảo vệ",
    "luongcoban": 0,
    "hopdongtungay": "2010-08-28T15:19:06.813",
    "hopdongdenngay": "2010-08-28T15:19:06.813",
    "ghichu": null,
    "ma": "NV0018    "
  },
  {
    "mahopdong": "180                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "1997-11-01T15:04:43",
    "hopdongdenngay": "2010-08-28T15:04:43.97",
    "ghichu": null,
    "ma": "NV0180    "
  },
  {
    "mahopdong": "181                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "2003-12-01T15:17:14",
    "hopdongdenngay": "2010-08-28T15:17:14.157",
    "ghichu": null,
    "ma": "NV0181    "
  },
  {
    "mahopdong": "182                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "2003-12-01T15:43:24",
    "hopdongdenngay": "2010-08-28T15:43:24.22",
    "ghichu": null,
    "ma": "NV0182    "
  },
  {
    "mahopdong": "183                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "1999-06-01T17:13:18",
    "hopdongdenngay": "2010-08-28T17:13:18.127",
    "ghichu": null,
    "ma": "NV0183    "
  },
  {
    "mahopdong": "184                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "1981-11-01T17:16:22",
    "hopdongdenngay": "2010-08-28T17:16:22.813",
    "ghichu": null,
    "ma": "NV0184    "
  },
  {
    "mahopdong": "185                           ",
    "loaihopdong": "1 năm",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "2010-02-01T17:20:27",
    "hopdongdenngay": "2011-02-01T17:20:27",
    "ghichu": null,
    "ma": "NV0185    "
  },
  {
    "mahopdong": "186                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Đội trưởng",
    "luongcoban": 730000,
    "hopdongtungay": "1989-04-01T10:19:19",
    "hopdongdenngay": "2010-08-29T10:19:19.36",
    "ghichu": null,
    "ma": "NV0186    "
  },
  {
    "mahopdong": "187                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Đội phó",
    "luongcoban": 730000,
    "hopdongtungay": "2006-04-01T10:36:50",
    "hopdongdenngay": "2010-08-29T10:36:50.5",
    "ghichu": null,
    "ma": "NV0187    "
  },
  {
    "mahopdong": "188                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "1995-02-01T16:43:32",
    "hopdongdenngay": "2010-08-29T16:43:32.72",
    "ghichu": null,
    "ma": "NV0188    "
  },
  {
    "mahopdong": "189                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "1995-09-01T08:47:43",
    "hopdongdenngay": "2010-08-30T08:47:43.28",
    "ghichu": null,
    "ma": "NV0189    "
  },
  {
    "mahopdong": "19                            ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Trưởng ban",
    "luongcoban": 730000,
    "hopdongtungay": "2010-08-28T09:24:08.61",
    "hopdongdenngay": "2010-08-28T09:24:08.61",
    "ghichu": null,
    "ma": "NV0019    "
  },
  {
    "mahopdong": "190                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "1994-06-01T09:11:27",
    "hopdongdenngay": "2010-08-30T09:11:27.203",
    "ghichu": null,
    "ma": "NV0190    "
  },
  {
    "mahopdong": "191                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Nhân viên",
    "luongcoban": 730000,
    "hopdongtungay": "1998-11-01T09:43:28",
    "hopdongdenngay": "2010-08-30T09:43:28.563",
    "ghichu": null,
    "ma": "NV0191    "
  },
  {
    "mahopdong": "192                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Bảo vệ",
    "luongcoban": 730000,
    "hopdongtungay": "1984-04-01T10:23:42",
    "hopdongdenngay": "2010-08-30T10:23:42.39",
    "ghichu": null,
    "ma": "NV0192    "
  },
  {
    "mahopdong": "193                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Nhân viên",
    "luongcoban": 730000,
    "hopdongtungay": "1993-12-01T14:27:27",
    "hopdongdenngay": "2010-08-30T14:27:27",
    "ghichu": null,
    "ma": "NV0193    "
  },
  {
    "mahopdong": "194                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Bảo vệ",
    "luongcoban": 730000,
    "hopdongtungay": "1992-05-01T14:45:19",
    "hopdongdenngay": "2010-08-30T14:45:19.47",
    "ghichu": null,
    "ma": "NV0194    "
  },
  {
    "mahopdong": "195                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Bảo vệ",
    "luongcoban": 730000,
    "hopdongtungay": "2004-04-01T16:59:09",
    "hopdongdenngay": "2010-08-30T16:59:09.703",
    "ghichu": null,
    "ma": "NV0195    "
  },
  {
    "mahopdong": "20                            ",
    "loaihopdong": "1 năm",
    "chucdanh": "Nhân viên",
    "luongcoban": 730000,
    "hopdongtungay": "2010-04-01T14:14:23",
    "hopdongdenngay": "2011-04-01T14:14:23",
    "ghichu": null,
    "ma": "NV0020    "
  },
  {
    "mahopdong": "206                           ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "1985-11-01T16:27:12",
    "hopdongdenngay": "2010-09-03T16:27:12.937",
    "ghichu": null,
    "ma": "NV0206    "
  },
  {
    "mahopdong": "21                            ",
    "loaihopdong": "3 năm",
    "chucdanh": "Nhân viên",
    "luongcoban": 730000,
    "hopdongtungay": "2009-12-01T14:09:18",
    "hopdongdenngay": "2011-12-01T14:09:18",
    "ghichu": null,
    "ma": "NV0021    "
  },
  {
    "mahopdong": "23                            ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Trưởng phòng",
    "luongcoban": 730000,
    "hopdongtungay": "2010-08-28T09:35:14.687",
    "hopdongdenngay": "2010-08-28T09:35:14.687",
    "ghichu": null,
    "ma": "NV0023    "
  },
  {
    "mahopdong": "24                            ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Nhân viên",
    "luongcoban": 730000,
    "hopdongtungay": "2010-08-28T14:02:21.907",
    "hopdongdenngay": "2010-08-28T14:02:21.907",
    "ghichu": null,
    "ma": "NV0024    "
  },
  {
    "mahopdong": "28                            ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Nhân viên",
    "luongcoban": 2562300,
    "hopdongtungay": "1996-01-01T16:02:34",
    "hopdongdenngay": "2001-08-24T16:02:34",
    "ghichu": null,
    "ma": "NV0028    "
  },
  {
    "mahopdong": "30                            ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Nhân viên",
    "luongcoban": 730000,
    "hopdongtungay": "1981-01-01T16:27:46",
    "hopdongdenngay": "2010-09-23T16:27:46.687",
    "ghichu": null,
    "ma": "NV0030    "
  },
  {
    "mahopdong": "31                            ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Nhân viên",
    "luongcoban": 0,
    "hopdongtungay": "2004-08-25T09:02:22",
    "hopdongdenngay": "2010-08-25T09:02:22.61",
    "ghichu": null,
    "ma": "NV0031    "
  },
  {
    "mahopdong": "32                            ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Nhân viên",
    "luongcoban": 2810500,
    "hopdongtungay": "1994-08-25T09:19:07",
    "hopdongdenngay": "2010-08-25T09:19:07.14",
    "ghichu": null,
    "ma": "NV0032    "
  },
  {
    "mahopdong": "34                            ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Nhân viên",
    "luongcoban": 2146200,
    "hopdongtungay": "1994-08-25T09:51:36",
    "hopdongdenngay": "2010-08-25T09:51:36.077",
    "ghichu": null,
    "ma": "NV0034    "
  },
  {
    "mahopdong": "35                            ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Tổ trưởng",
    "luongcoban": 2007500,
    "hopdongtungay": "2001-08-25T10:33:39",
    "hopdongdenngay": "2010-08-25T10:33:39.14",
    "ghichu": null,
    "ma": "NV0035    "
  },
  {
    "mahopdong": "36                            ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Nhân viên",
    "luongcoban": 1868800,
    "hopdongtungay": "1997-08-25T10:46:38",
    "hopdongdenngay": "2010-08-25T10:46:38.797",
    "ghichu": null,
    "ma": "NV0036    "
  },
  {
    "mahopdong": "37                            ",
    "loaihopdong": "3 năm",
    "chucdanh": "Nhân viên",
    "luongcoban": 1730100,
    "hopdongtungay": "2004-05-26T08:14:42",
    "hopdongdenngay": "2007-05-26T08:14:42",
    "ghichu": null,
    "ma": "NV0037    "
  },
  {
    "mahopdong": "38                            ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Trưởng phòng",
    "luongcoban": 0,
    "hopdongtungay": "1984-08-26T08:25:15",
    "hopdongdenngay": "2010-08-26T08:25:15.14",
    "ghichu": null,
    "ma": "NV0038    "
  },
  {
    "mahopdong": "39                            ",
    "loaihopdong": "1 năm",
    "chucdanh": "Nhân viên",
    "luongcoban": 1452700,
    "hopdongtungay": "2008-01-01T09:03:53",
    "hopdongdenngay": "2010-08-26T09:03:53.937",
    "ghichu": null,
    "ma": "NV0039    "
  },
  {
    "mahopdong": "40                            ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Nhân viên",
    "luongcoban": 2430900,
    "hopdongtungay": "2000-07-26T09:24:13",
    "hopdongdenngay": "2000-07-26T09:24:13",
    "ghichu": null,
    "ma": "NV0040    "
  },
  {
    "mahopdong": "41                            ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Nhân viên",
    "luongcoban": 1452700,
    "hopdongtungay": "2008-06-26T09:39:10",
    "hopdongdenngay": "2010-08-26T09:39:10.83",
    "ghichu": null,
    "ma": "NV0041    "
  },
  {
    "mahopdong": "42                            ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Phó trưởng ban",
    "luongcoban": 4124500,
    "hopdongtungay": "1999-08-26T09:58:26",
    "hopdongdenngay": "2010-08-26T09:58:26.937",
    "ghichu": null,
    "ma": "NV0042    "
  },
  {
    "mahopdong": "43                            ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Nhân viên",
    "luongcoban": 0,
    "hopdongtungay": "2006-08-26T10:02:34",
    "hopdongdenngay": "2010-08-26T10:02:34.093",
    "ghichu": null,
    "ma": "NV0043    "
  },
  {
    "mahopdong": "44                            ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Tổ trưởng",
    "luongcoban": 2146200,
    "hopdongtungay": "1999-05-26T10:25:05",
    "hopdongdenngay": "2010-08-26T10:25:05.547",
    "ghichu": null,
    "ma": "NV0044    "
  },
  {
    "mahopdong": "45                            ",
    "loaihopdong": "1 năm",
    "chucdanh": "Nhân viên",
    "luongcoban": 0,
    "hopdongtungay": "2009-10-01T08:44:46",
    "hopdongdenngay": "2011-08-27T08:44:46",
    "ghichu": "",
    "ma": "NV0045    "
  },
  {
    "mahopdong": "46                            ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Nhân viên",
    "luongcoban": 1452700,
    "hopdongtungay": "2006-08-27T09:35:34",
    "hopdongdenngay": "2010-08-27T09:35:34.407",
    "ghichu": null,
    "ma": "NV0046    "
  },
  {
    "mahopdong": "48                            ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Nhân viên",
    "luongcoban": 2146200,
    "hopdongtungay": "1995-08-27T14:57:00",
    "hopdongdenngay": "2010-08-27T14:57:00.75",
    "ghichu": null,
    "ma": "NV0048    "
  },
  {
    "mahopdong": "51                            ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Đội trưởng",
    "luongcoban": 730000,
    "hopdongtungay": "1992-12-01T14:32:06",
    "hopdongdenngay": "2010-09-10T14:32:06.297",
    "ghichu": null,
    "ma": "NV0051    "
  },
  {
    "mahopdong": "52                            ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Đội phó",
    "luongcoban": 730000,
    "hopdongtungay": "1985-03-01T11:02:18",
    "hopdongdenngay": "2010-09-14T11:02:18.207",
    "ghichu": "",
    "ma": "NV0052    "
  },
  {
    "mahopdong": "53                            ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "2005-03-01T14:12:04",
    "hopdongdenngay": "2010-09-14T14:12:04.237",
    "ghichu": null,
    "ma": "NV0053    "
  },
  {
    "mahopdong": "54                            ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "1984-04-01T11:06:50",
    "hopdongdenngay": "2010-09-14T11:06:50.237",
    "ghichu": "",
    "ma": "NV0054    "
  },
  {
    "mahopdong": "55                            ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "1986-10-01T14:15:00",
    "hopdongdenngay": "2010-09-14T14:15:00.407",
    "ghichu": null,
    "ma": "NV0055    "
  },
  {
    "mahopdong": "56                            ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "1985-01-01T16:17:33",
    "hopdongdenngay": "2010-09-09T16:17:33.593",
    "ghichu": null,
    "ma": "NV0056    "
  },
  {
    "mahopdong": "57                            ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "1994-06-01T10:51:50",
    "hopdongdenngay": "2010-09-14T10:51:50.407",
    "ghichu": null,
    "ma": "NV0057    "
  },
  {
    "mahopdong": "58                            ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "1996-06-01T10:43:24",
    "hopdongdenngay": "2010-09-12T10:43:24.983",
    "ghichu": null,
    "ma": "NV0058    "
  },
  {
    "mahopdong": "59                            ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "2002-06-01T09:25:11",
    "hopdongdenngay": "2010-09-12T09:25:11.797",
    "ghichu": null,
    "ma": "NV0059    "
  },
  {
    "mahopdong": "60                            ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "2002-06-01T08:42:45",
    "hopdongdenngay": "2010-09-12T08:42:45.89",
    "ghichu": null,
    "ma": "NV0060    "
  },
  {
    "mahopdong": "61                            ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "2002-06-01T08:52:57",
    "hopdongdenngay": "2010-09-12T08:52:57.75",
    "ghichu": null,
    "ma": "NV0061    "
  },
  {
    "mahopdong": "62                            ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "2002-06-01T16:00:45",
    "hopdongdenngay": "2010-09-10T16:00:45.563",
    "ghichu": null,
    "ma": "NV0062    "
  },
  {
    "mahopdong": "63                            ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "2003-02-01T08:33:56",
    "hopdongdenngay": "2010-09-12T08:33:56.22",
    "ghichu": null,
    "ma": "NV0063    "
  },
  {
    "mahopdong": "64                            ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "2003-02-01T11:18:26",
    "hopdongdenngay": "2010-09-10T11:18:26.233",
    "ghichu": null,
    "ma": "NV0064    "
  },
  {
    "mahopdong": "65                            ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "2003-02-09T16:28:49",
    "hopdongdenngay": "2010-09-09T16:28:49.627",
    "ghichu": null,
    "ma": "NV0065    "
  },
  {
    "mahopdong": "66                            ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "1995-01-01T09:30:54",
    "hopdongdenngay": "2010-09-12T09:30:54.25",
    "ghichu": null,
    "ma": "NV0066    "
  },
  {
    "mahopdong": "67                            ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "1994-06-01T09:30:20",
    "hopdongdenngay": "2010-09-14T09:30:20.407",
    "ghichu": null,
    "ma": "NV0067    "
  },
  {
    "mahopdong": "68                            ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "2002-06-01T09:21:25",
    "hopdongdenngay": "2010-09-10T09:21:25.923",
    "ghichu": null,
    "ma": "NV0068    "
  },
  {
    "mahopdong": "69                            ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "1997-09-09T15:14:17",
    "hopdongdenngay": "2010-09-09T15:14:17.343",
    "ghichu": null,
    "ma": "NV0069    "
  },
  {
    "mahopdong": "70                            ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "1994-12-01T09:35:38",
    "hopdongdenngay": "2010-09-14T09:35:38.003",
    "ghichu": null,
    "ma": "NV0070    "
  },
  {
    "mahopdong": "71                            ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "2005-11-01T09:09:25",
    "hopdongdenngay": "2010-09-12T09:09:25.657",
    "ghichu": null,
    "ma": "NV0071    "
  },
  {
    "mahopdong": "72                            ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "2004-03-10T08:19:35",
    "hopdongdenngay": "2010-09-10T08:19:35.813",
    "ghichu": null,
    "ma": "NV0072    "
  },
  {
    "mahopdong": "73                            ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "2010-09-13T07:55:15.907",
    "hopdongdenngay": "2010-09-13T07:55:15.907",
    "ghichu": null,
    "ma": "NV0073    "
  },
  {
    "mahopdong": "74                            ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "2010-09-14T09:06:18.783",
    "hopdongdenngay": "2010-09-14T09:06:18.783",
    "ghichu": null,
    "ma": "NV0074    "
  },
  {
    "mahopdong": "75                            ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "1999-02-01T11:23:32",
    "hopdongdenngay": "2010-09-14T11:23:32.8",
    "ghichu": null,
    "ma": "NV0075    "
  },
  {
    "mahopdong": "76                            ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "1996-01-01T09:00:01",
    "hopdongdenngay": "2010-09-10T09:00:01.11",
    "ghichu": null,
    "ma": "NV0076    "
  },
  {
    "mahopdong": "77                            ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "2008-02-01T17:12:22",
    "hopdongdenngay": "2010-09-10T17:12:22.14",
    "ghichu": null,
    "ma": "NV0077    "
  },
  {
    "mahopdong": "78                            ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Trưởng phòng",
    "luongcoban": 730000,
    "hopdongtungay": "1995-06-15T16:57:35",
    "hopdongdenngay": "2010-08-28T16:57:35.657",
    "ghichu": null,
    "ma": "NV0078    "
  },
  {
    "mahopdong": "79                            ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Nhân viên",
    "luongcoban": 730000,
    "hopdongtungay": "2002-04-01T09:51:16",
    "hopdongdenngay": "2010-08-30T09:51:16.907",
    "ghichu": null,
    "ma": "NV0079    "
  },
  {
    "mahopdong": "80                            ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Nhân viên",
    "luongcoban": 730000,
    "hopdongtungay": "1983-10-01T10:36:55",
    "hopdongdenngay": "2010-08-30T10:36:55.86",
    "ghichu": null,
    "ma": "NV0080    "
  },
  {
    "mahopdong": "81                            ",
    "loaihopdong": "3 năm",
    "chucdanh": "Nhân viên",
    "luongcoban": 730000,
    "hopdongtungay": "2010-06-01T10:50:55",
    "hopdongdenngay": "2013-05-31T10:50:55",
    "ghichu": null,
    "ma": "NV0081    "
  },
  {
    "mahopdong": "82                            ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Nhân viên",
    "luongcoban": 730000,
    "hopdongtungay": "1986-04-01T11:15:14",
    "hopdongdenngay": "2010-08-30T11:15:14.627",
    "ghichu": "",
    "ma": "NV0083    "
  },
  {
    "mahopdong": "84                            ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "2003-02-01T14:10:57",
    "hopdongdenngay": "2010-08-31T14:10:57.203",
    "ghichu": null,
    "ma": "NV0084    "
  },
  {
    "mahopdong": "85                            ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "2002-06-01T14:27:54",
    "hopdongdenngay": "2010-08-31T14:27:54.047",
    "ghichu": null,
    "ma": "NV0085    "
  },
  {
    "mahopdong": "86                            ",
    "loaihopdong": "1 năm",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "2010-08-31T15:06:23.25",
    "hopdongdenngay": "2010-08-31T15:06:23.25",
    "ghichu": "",
    "ma": "NV0086    "
  },
  {
    "mahopdong": "87                            ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "1981-10-01T16:35:11",
    "hopdongdenngay": "2010-08-31T16:35:11.377",
    "ghichu": null,
    "ma": "NV0087    "
  },
  {
    "mahopdong": "88                            ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "1992-01-01T08:32:22",
    "hopdongdenngay": "2010-09-01T08:32:22.733",
    "ghichu": null,
    "ma": "NV0088    "
  },
  {
    "mahopdong": "89                            ",
    "loaihopdong": "3 năm",
    "chucdanh": "Nhân viên",
    "luongcoban": 730000,
    "hopdongtungay": "2010-04-01T08:10:26",
    "hopdongdenngay": "2013-04-01T08:10:26",
    "ghichu": null,
    "ma": "NV0089    "
  },
  {
    "mahopdong": "91                            ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "2010-09-06T09:06:00.017",
    "hopdongdenngay": "2010-09-06T09:06:00.017",
    "ghichu": null,
    "ma": "NV0091    "
  },
  {
    "mahopdong": "92                            ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "1984-04-01T15:01:24",
    "hopdongdenngay": "2010-09-07T15:01:24.333",
    "ghichu": null,
    "ma": "NV0092    "
  },
  {
    "mahopdong": "93                            ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "1998-01-01T15:28:24",
    "hopdongdenngay": "2010-09-07T15:28:24.753",
    "ghichu": null,
    "ma": "NV0093    "
  },
  {
    "mahopdong": "94                            ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "2007-01-01T08:32:08",
    "hopdongdenngay": "2010-09-08T08:32:08.953",
    "ghichu": null,
    "ma": "NV0094    "
  },
  {
    "mahopdong": "95                            ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "1984-05-01T08:45:39",
    "hopdongdenngay": "2010-09-08T08:45:39.97",
    "ghichu": null,
    "ma": "NV0095    "
  },
  {
    "mahopdong": "96                            ",
    "loaihopdong": "1 năm",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "2010-08-01T08:53:29",
    "hopdongdenngay": "2011-07-31T08:53:29",
    "ghichu": null,
    "ma": "NV0096    "
  },
  {
    "mahopdong": "97                            ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 730000,
    "hopdongtungay": "2004-07-01T09:06:21",
    "hopdongdenngay": "2010-09-08T09:06:21.97",
    "ghichu": null,
    "ma": "NV0097    "
  },
  {
    "mahopdong": "98                            ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Trưởng trang",
    "luongcoban": 730000,
    "hopdongtungay": "1995-07-01T11:11:43",
    "hopdongdenngay": "2010-09-08T11:11:43.453",
    "ghichu": null,
    "ma": "NV0098    "
  },
  {
    "mahopdong": "99                            ",
    "loaihopdong": "Dài hạn",
    "chucdanh": "Công nhân",
    "luongcoban": 7300000,
    "hopdongtungay": "2003-04-01T11:23:19",
    "hopdongdenngay": "2010-09-08T11:23:19.703",
    "ghichu": null,
    "ma": "NV0099    "
  },
  {
    "mahopdong": "NV0002                        ",
    "loaihopdong": "1 năm",
    "chucdanh": "Trưởng ban",
    "luongcoban": 730000,
    "hopdongtungay": "2010-08-20T11:08:32.593",
    "hopdongdenngay": "2010-08-20T11:08:32.593",
    "ghichu": "",
    "ma": "NV0002    "
  }
]

class BaseTable extends HTMLElement {

  // {
  //   "mahopdong": "003                           ",
  //   "loaihopdong": "1 năm",
  //   "chucdanh": "Nhân viên",
  //   "luongcoban": 730000,
  //   "hopdongtungay": "2010-06-01T08:42:13",
  //   "hopdongdenngay": "2010-09-01T08:42:13",
  //   "ghichu": null,
  //   "ma": "NV0003    "
  // },

  connectedCallback() {
    const columns = [
      {
        label: 'Mã hợp đồng',
        key: 'mahopdong'
      },
      {
        label: 'Lương cơ bản',
        key: 'luongcoban',
        type: 'currency'
      },
      {
        label: 'Từ ngày',
        key: 'hopdongtungay',
        type: 'datetime'
      },
      {
        label: 'Đến ngày',
        key: 'hopdongdenngay',
        type: 'datetime'
      },
      {
        label: 'Ghi chú',
        key: 'ghichu'
      },
      {
        label: 'Hành động',
        key: 'action',
        actions: [
          { type: 'plain', icon: 'bx bx-show', label: 'Chi tiết', onClick: () => { console.log('click') } },
          { type: 'red', icon: 'bx bx-trash', label: 'Xóa', onClick: () => { console.log('click') } }
        ]
      }
    ]

    function formatDateTime(dateTimeStr) {
      const dateTime = new Date(dateTimeStr);
      const year = dateTime.getFullYear();
      const month = String(dateTime.getMonth() + 1).padStart(2, '0');
      const day = String(dateTime.getDate()).padStart(2, '0');
      const hours = String(dateTime.getHours()).padStart(2, '0');
      const minutes = String(dateTime.getMinutes()).padStart(2, '0');
      
      return `${year}-${month}-${day} ${hours}:${minutes}`;
    }

    function formatCurrency(val) {
      return val.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})
    }

    document.addEventListener('DOMContentLoaded', () => {
      const headEl = this.querySelector('thead')
      const headTrEl = document.createElement('tr')
      columns.forEach(col => {
        const thEl = document.createElement('th')
        thEl.setAttribute('scope', 'col')
        thEl.setAttribute('class', 'px-6 py-3')
        thEl.innerText = col.label
        headTrEl.appendChild(thEl)
      })
      headEl.appendChild(headTrEl)

      const bodyEl = this.querySelector('tbody')
      const tableDataDisplay = tableData.slice(0, 10)
      tableDataDisplay.forEach(row => {
        const trEl = document.createElement('tr')
        trEl.setAttribute('class','bg-white border-b')
        columns.forEach(col => {
          const thEl = document.createElement('th')
          thEl.setAttribute('scope', 'col')
          thEl.setAttribute('class', 'px-6 py-3 font-normal text-gray-500')
          let value = row[col.key]

          if(col.key === 'action') {
            col.actions.forEach(({ label, type, icon, onClick }) => {
              const btnEl = document.createElement('base-button')
              btnEl.setAttribute('label', label)
              btnEl.setAttribute('type', type)
              btnEl.setAttribute('icon', icon)
              btnEl.setAttribute('mini', "true")
              btnEl.addEventListener('click', onClick)
              thEl.appendChild(btnEl)
            })
          } else {
            if(col.type === 'datetime') {
              value = formatDateTime(value)
            } else if(col.type === 'currency') {
              value = formatCurrency(value)
            }
            thEl.innerText = value
          }
          
          trEl.appendChild(thEl)
        })
        bodyEl.appendChild(trEl)
      })
    })

    this.innerHTML = `
    <div class="relative overflow-x-auto">
      <table id="employee-table" class="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          
        </thead>
        <tbody>
         
        </tbody>
      </table>
    </div>
    `
  }
}

//  1 : Tên thẻ mình tự địnch nghĩa dùng trong các file html phải nhúng file registerComponent.js này vào file js mới dùng được
customElements.define(/** 1*/"layout-header", /** 2*/ CustomHeader); // 2 Class định nghĩa rằng khi dùng thẻ có tên được định nghĩa kia thì màn hình sẽ hiện thị như thế nào
customElements.define("layout-sidebar", CustomSidebar);
customElements.define("base-input", BaseInput);
customElements.define("base-textarea", BaseTextArea);
customElements.define("base-datepicker", BaseDatePicker);
customElements.define("base-input-phone", BaseInputPhone);
customElements.define("base-radio", BaseRadio);
customElements.define("label-form-item", LabelFormItem);
customElements.define("base-input-number", BaseInputNumber);
customElements.define("base-select", BaseSelect);
customElements.define("base-checkbox", BaseCheckbox);
customElements.define("base-upload", BaseUpload);
customElements.define("base-button", BaseButton);
customElements.define("base-table", BaseTable);