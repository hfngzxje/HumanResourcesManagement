class CustomHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
     <header class="app-header">
    <!-- Sidebar toggle button-->
    
          <span id="hrmLink" class="ml-3 text-xl font-bold">
            <a href="/pages/staff/list.html"><b style="color:white;">HRM  </b><a/>
          </span>
    <!-- Navbar Right Menu-->
    <ul class="app-nav">


      <!-- User Menu-->
      <li><a id="logOut" class="app-nav__item" style="cursor: pointer;" ><i class='bx bx-log-out bx-rotate-180'></i> </a>

      </li>
    </ul>
  </header>
      `;

    const hrmLink = this.querySelector("#hrmLink");
    hrmLink.style.setProperty('margin-left', '250px', 'important');
    hrmLink.style.setProperty('margin-top', '12px', 'important');

    // Thêm sự kiện click vào span HRM
    hrmLink.addEventListener("click", () => {
      // Xóa localStorage
      localStorage.removeItem("maDetail");
    });
  }
}


class CustomFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      `;

    //     <footer class="footer">
    //     <div class="text-center" style="font-size: 13px">
    //         <p><b>Copyright
    //             <script type="text/javascript">
    //                 document.write(new Date().getFullYear());
    //             </script> Phần mềm quản lý nhân sự | HRM
    //         </b></p>
    //     </div>
    // </footer>
  }
}
class CustomSidebar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <aside class="app-sidebar">
    <div class="app-sidebar__user" style="display: flex; align-items: center; flex-direction: column;"><img id="userAvatar" class="app-sidebar__user-avatar" src="" width="50px"
        alt="User Image">
      <div>
        <p id="tenNhanVien" class="app-sidebar__user-name" style="font-weight: bold; color: white;"></p>
        <p id="role" style="color: #003366; font-weight: bold; border: 2px solid blue; padding: 2px 20px; border-radius: 25px; display: inline-block;background-color: white;"> </p>
        <p class="app-sidebar__user-designation" style="color: white">Chào mừng bạn trở lại</p>
      </div>
    </div>
    <hr>
    <ul class="app-menu">
      <li><a class="app-menu__item" href="/pages/staff/index.html"><i class='app-menu__icon bx bx-tachometer'></i><span
            class="app-menu__label">Bảng điều khiển</span></a></li>
      <li><a class="app-menu__item" href="/pages/staff/list.html"><i class='app-menu__icon bx bx-id-card'></i> <span
            class="app-menu__label">Quản lý nhân viên</span></a></li>
      <li><a class="app-menu__item" href="/pages/staffSideBar/listLaborContract.html"><i class='app-menu__icon bx bx-file'></i><span
            class="app-menu__label">Quản lý hợp đồng</span></a></li>
      <li><a class="app-menu__item" href="/pages/staffSideBar/listTransfer.html"><i
            class='app-menu__icon bx bx-transfer'></i><span class="app-menu__label">Quản lý điều chuyển</span></a>
      </li>
      <li><a class="app-menu__item" href="/pages/staffSideBar/listAward.html"><i class='app-menu__icon bx bx-trophy'></i><span
            class="app-menu__label">Quản lý khen thưởng</span></a></li>
      <li><a class="app-menu__item" href="/pages/staffSideBar/listDisciple.html"><i class='app-menu__icon bx bx-shield'></i><span
            class="app-menu__label">Quản lý kỷ luật</span></a></li>
      <li><a class="app-menu__item" href="/pages/catalog/catalog.html"><i class='app-menu__icon bx bx-category-alt'></i><span
            class="app-menu__label">Danh mục</span></a></li>
      <li><a class="app-menu__item" href="/pages/staffSideBar/report.html"><i
            class='app-menu__icon bx bx-pie-chart-alt-2'></i><span class="app-menu__label">Báo cáo </span></a>
      </li>
      <li><a class="app-menu__item" href="/pages/employee/overview.html"><i class='app-menu__icon bx bx-user'></i><span
            class="app-menu__label">Chi tiết cá nhân </span></a></li>
      <li><a class="app-menu__item" href="/pages/history/history.html"><i class='app-menu__icon bx bx-history'></i><span
            class="app-menu__label">Lịch sử hoạt động </span></a>
      </li>
      <li><a id="btn" class="app-menu__item" href="#"><i class='app-menu__icon bx bx-key'></i><span class="app-menu__label">Đổi mật khẩu</span></a></li>
    </ul>
  </aside>

   <div id="myModal" class="modal" class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        
        <div class=" change-container w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
            <h2 class="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Đổi mật khẩu
            </h2>
            <form id="change_form" class="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
                <div>
                  <base-input placeholder="........."  type="password" label="Mật Khẩu Cũ" name="matKhauCu" required="true"></base-input>
                </div>
                <div>
                  <base-input placeholder="........." type="password" label="Mật Khẩu Mới" name="matKhauMoi" required="true"></base-input>
                </div>
                <div>
                  <base-input placeholder="........." type="password" label="Xác Nhận Mật Khẩu Mới" name="xacNhanMatKhauMoi" required="true"></base-input>
                </div>
                
                <div id="change_form_action" class="flex gap-x-5 mt-5 justify-center"></div>
            </form>
        </div>
    </div>
        `;
    this.fetchAvatar();
    this.fetchTen();
    this.fetchRole();
    this.updateActiveLink();
    this.addEventListeners();
  }

  async fetchAvatar() {
    const maNhanVien = localStorage.getItem('maNhanVien');
    if (!maNhanVien) {
      console.error('maNhanVien không tồn tại trong localStorage');
      return;
    }

    try {
      const response = await fetch(`https://localhost:7141/api/NhanVien/GetById?id=${maNhanVien}`);
      const data = await response.json();
      const avatarUrl = data.anh;
      if (avatarUrl) {
        this.querySelector('#userAvatar').src = 'data:image/png;base64,' + avatarUrl;
      }
    } catch (error) {
      console.error('Error fetching avatar:', error);
    }
  }
  async fetchTen() {
    const maNhanVien = localStorage.getItem('maNhanVien');
    if (!maNhanVien) {
      console.error('maNhanVien không tồn tại trong localStorage');
      return;
    }

    try {
      const response = await fetch(`https://localhost:7141/api/NhanVien/GetById?id=${maNhanVien}`);
      const data = await response.json();
      const dataTen = data.ten;
      if (dataTen) {
        const tenNhanVienElement = this.querySelector('p#tenNhanVien');
        tenNhanVienElement.textContent = data.ten;
      }
    } catch (error) {
      console.error('Error fetching ten:', error);
    }
  }
  async fetchRole() {
    const maNhanVien = localStorage.getItem('vaiTroId');
    if (!maNhanVien) {
      console.error('vaiTroId không tồn tại trong localStorage');
      return;
    }

    try {
      if (maNhanVien) {
        const maNhanVienElement = this.querySelector('p#role');
        if (maNhanVien === '1') {
          maNhanVienElement.textContent = 'Admin'
        }
        else {
          maNhanVienElement.textContent = "Employee"
        }
      }
    } catch (error) {
      console.error('Error fetching role:', error);
    }
  }
  updateActiveLink() {
    const currentPath = window.location.pathname;
    const menuItems = this.querySelectorAll('.app-menu__item');

    menuItems.forEach(item => {
      item.classList.remove('active');
      const linkPath = item.getAttribute('href');
      if (currentPath.includes(linkPath)) {
        item.classList.add('active');
      }
    });
  }

  addEventListeners() {
    const menuItems = this.querySelectorAll('.app-menu__item');

    menuItems.forEach(item => {
      item.addEventListener('click', () => {
        menuItems.forEach(el => el.classList.remove('active'));
        item.classList.add('active');
      });
    });
  }
}
class BaseInput extends HTMLElement {
  static observedAttributes = [
    "label",
    "hide-label",
    "name",
    "required",
    "type",
    "value",
    "readonly",
    "disabled",
    "validateBy",
    "placeholder"
  ];

  connectedCallback() {
    const label = this.getAttribute("label") || "Base input";
    const hideLabel = !this.getAttribute("hide-label");
    const name = this.getAttribute("name");
    const required = this.getAttribute("required");
    const type = this.getAttribute("type") || "text";
    const disabled = this.getAttribute("disabled") !== null;
    this._readonly = this.hasAttribute("readonly");
    const validateBy = this.getAttribute("validateBy") || "";
    const placeholder = this.getAttribute("placeholder") || "";


    this.innerHTML = `
    <div>
      <label for="base-input" class="block  text-sm  text-gray-900 ${hideLabel ? "mt-" : "hidden"
      }">${label}</label>
      <input type="${type}" validateBy="${validateBy}" placeholder="${placeholder}" name="${name}" required="${required}" ${disabled ? 'disabled' : ''}  class="bg-ffffff border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" ${this._readonly ? "readonly" : ""
      }>
    </div>
    `;
  }
}
class BaseTextArea extends HTMLElement {
  static observedAttributes = [
    "label",
    "hide-label",
    "name",
    "required",
    "row",
  ];

  connectedCallback() {
    const label = this.getAttribute("label") || "Base input";
    const hideLabel = !this.getAttribute("hide-label");
    const name = this.getAttribute("name");
    const required = this.getAttribute("required");
    const row = this.getAttribute("row") || "3";

    this.innerHTML = `
    <div class="flex flex-col h-full w-full">
    <label for="base-textarea" class="block mb-2 text-sm  text-gray-900 ${hideLabel ? "" : "hidden"
      }">${label}</label>
      <textarea rows="${row}" cols="50" name="${name}" required="${required}" class="bg-ffffff border border-gray-300" placeholder="Nhập thông tin..." > </textarea>
    </div>
    `;
  }
}

class BaseDatePicker extends HTMLElement {
  static observedAttributes = ["label", "name", "required", "disabled","validateBy"];

  connectedCallback() {
    const label = this.getAttribute("label") || "Base input";
    const name = this.getAttribute("name");
    const required = this.getAttribute("required");
    const disabled = this.getAttribute("disabled") !== null;
    const validateBy = this.getAttribute("validateBy") || "";

    this.innerHTML = `
    <div class="flex flex-col h-full w-full">
      <label for="base-input" class="block  text-sm  text-gray-900">${label}</label>
      <div class="relative max-w-sm">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
          <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
          </svg>
        </div>
        <input datepicker type="text" validateBy= "${validateBy}" name="${name}" required="${required}" class="bg-ffffff border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 " placeholder="Select date" ${disabled ? 'disabled' : ''}>
      </div>
    </div>
    `;
  }
}

class BaseInputPhone extends HTMLElement {
  static observedAttributes = ["label", "name", "required","validateBy"];

  connectedCallback() {
    const label = this.getAttribute("label") || "Base input";
    const name = this.getAttribute("name");
    const required = this.getAttribute("required");
    const validateBy = this.getAttribute("validateBy") || "";

    this.innerHTML = `
    <div class="">
      <label for="base-input" class="block  text-sm  text-gray-900">${label}</label>
      <input type="tel" name="${name}" validateBy="${validateBy}" required="${required}" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" class="bg-ffffff border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"placeholder="Nhập số điện thoại"  >
    </div>
    `;
  }
}
class BaseInputNumber extends HTMLElement {
  static observedAttributes = [
    "label",
    "name",
    "required",
    "value",
    "readonly",
    "style",
     "validateBy"
  ];

  constructor() {
    super();
    this._value = "";
    this._readonly = false;
  }

  connectedCallback() {
    const label = this.getAttribute("label") || "Base input";
    const name = this.getAttribute("name");
    const required = this.getAttribute("required");
    const value = this.getAttribute("value") || "";
    const style = this.getAttribute("style") || "";
    this._readonly = this.hasAttribute("readonly");
    const validateBy = this.getAttribute("validateBy") || "";

    this.innerHTML = `
    <div class="">
      <label for="base-input" class="block  text-sm  text-gray-900" style="${style}">${label}</label>
      <input type="text" name="${name}" validateBy="${validateBy}" required="${required}"  value="${value}" style="font-weight: normal;" class="bg-ffffff border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" ${this._readonly ? "readonly" : ""
      }>
    </div>
    `;

    this.inputElement = this.querySelector("input");
    this.inputElement.addEventListener(
      "input",
      this.handleInputChange.bind(this)
    );
  }

  set value(newValue) {
    this._value = newValue;
    this.inputElement.value = newValue;
  }

  get value() {
    return this._value;
  }

  set readonly(newValue) {
    this._readonly = newValue;
    this.inputElement.readOnly = newValue;
  }

  get readonly() {
    return this._readonly;
  }

  handleInputChange(event) {
    if (!this._readonly) {
      this._value = event.target.value;
      this.dispatchEvent(new Event("value-changed"));
    }
  }
}
class BaseRadio extends HTMLElement {
  static observedAttributes = ["label", "name", "value", "checked"];

  connectedCallback() {
    const label = this.getAttribute("label");
    const name = this.getAttribute("name");
    const value = this.getAttribute("value");
    const checked = this.getAttribute("checked");

    this.innerHTML = `
    <div class="flex items-center mb-4">
      <input type="radio" value="${value}" name="${name}" ${checked !== null ? "checked" : ""
      } class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600">
      <label for="default-radio-1" class="ms-2 text-sm  text-gray-900 ">${label}</label>
    </div>
    `;
  }
}

class LabelFormItem extends HTMLElement {
  static observedAttributes = ["name"];

  connectedCallback() {
    const name = this.getAttribute("name") || "Base input";

    this.innerHTML = `
      <label for="base-input" class="block mb-2 text-sm  text-gray-900">${name}</label>
    `;
  }
}

class BaseSelect extends HTMLElement {
  static observedAttributes = [
    "label",
    "name",
    "options",
    "api",
    "keyValue",
    "keyLabel",
    "required",
    "disabled",
    "includeAll" // Thêm thuộc tính mới
  ];

  connectedCallback() {
    const label = this.getAttribute("label") || "Base input";
    const name = this.getAttribute("name");
    const optionsKey = this.getAttribute("options");
    const api = this.getAttribute("api");
    const keyValue = this.getAttribute("keyValue") || "value";
    const keyLabel = this.getAttribute("keyLabel") || "label";
    const required = this.getAttribute("required");
    const disabled = this.getAttribute("disabled") !== null;
    const includeAll = this.getAttribute("includeAll") !== null; // Kiểm tra thuộc tính mới

    const getApiUrl = () => {
      if (!window[api]) return api;
      return window[api]();
    };

    const renderOption = () => {
      const selectElement = this.querySelector('select');
      selectElement.innerHTML = "";

      if (includeAll) {
        const allOption = document.createElement("option");
        allOption.value = '';
        allOption.innerText = 'Tất Cả';
        selectElement.append(allOption);
      }

      if (api) {
        const apiUrl = getApiUrl()
        if(!apiUrl){
          return
        }
        $.ajax({
          url: getApiUrl(),
          method: "GET",
          success: (data) => {
            if(!data || data.length === 0){
              return
            }
            data.forEach((item) => {
              const option = document.createElement("option");
              option.value = item[keyValue];
              option.innerText = item[keyLabel];
              selectElement.append(option);
            });
          },
          error: (err) => {
            console.log("Base select api err :: ", err);
          },
        });
        return;
      }

      // Ensure options is an array
      const options = Array.isArray(window[optionsKey]) ? window[optionsKey] : [];
      options.forEach(({ value, label }) => {
        const option = document.createElement("option");
        option.value = value;
        option.innerText = label;
        selectElement.append(option);
      });
    };

    this.renderOption = renderOption;

    document.addEventListener("DOMContentLoaded", () => {
      renderOption();
    });


    this.innerHTML = `
    <div class="max-w-sm" style="margin: 0;">
      <label class="block mb-2 text-sm text-gray-900">${label}</label>
      <select name="${name}" ${required ? 'required' : ''} ${disabled ? 'disabled' : ''} class="h-[42px] bg-ffffff border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
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
        <label for="default-checkbox" class="ms-2 text-sm  text-gray-900">${label}</label>
    </div>
    `;
  }
}

class BaseUpload extends HTMLElement {
  static observedAttributes = ["label", "class", "name", "idImage"];

  connectedCallback() {
    const label = this.getAttribute("label") || "Base input";
    const contentClass = this.getAttribute("class") || "";
    const name = this.getAttribute("name");
    const idImage = this.getAttribute("idImage");

    this.innerHTML = `
     <div class="flex items-center justify-center w-full h-full">
    <label for="dropzone-file" class="flex flex-col items-center justify-center  min-h-60  border-2 border-gray-300 border-dashed rounded-full cursor-pointer bg-ffffff relative overflow-hidden">
        <img 
            id="${idImage}"
            src="" 
            class="absolute h-full w-full object-cover rounded-full opacity-0 bg-ffffff"
        />
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
            <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p class="mb-2 text-sm text-gray-50"><span class="font-semibold">Click to upload</span> or drag and drop</p>
            <p class="text-xs text-gray-500"> PNG, JPG or JPEG (MAX. 800x400px)</p>
        </div>
        <input id="dropzone-file" type="file" name="${name}" accept="image/*" class="hidden" />
    </label>
</div>
    `;

    document.addEventListener("DOMContentLoaded", () => {
      const inputEl = this.querySelector("input");
      const imageEl = this.querySelector("img");
      inputEl.addEventListener("change", (e) => {
        const file = e.target.files[0];
        const path = URL.createObjectURL(file);
        imageEl.setAttribute("src", path);
        imageEl.classList.remove("opacity-0");
      });
    });
  }
}

class BaseButton extends HTMLElement {
  static observedAttributes = ["label", "type", "icon", "mini", "id", "disabled"];

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "disabled") {
      this.render();
    }
  }

  render() {
    const label = this.getAttribute("label") || "Base input";
    const type = this.getAttribute("type") || "primary";
    const icon = this.getAttribute("icon");
    const mini = this.getAttribute("mini") === "true";
    const id = this.getAttribute("id");
    const disabled = this.hasAttribute("disabled");

    let commonClasses = "focus:outline-none  rounded-lg text-sm";

    if (mini) {
      commonClasses += " py-1 px-2";
    } else {
      commonClasses += " py-2.5 px-5";
    }

    const BtnClass = {
      primary:
        "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300",
      green:
        "text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300",
      red: "text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300",
      plain:
        "text-sm  text-blue-900 focus:outline-none bg-blue-50 rounded-lg border border-blue-500 hover:bg-blue-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-blue-100",
    };

    const contentClass = BtnClass[type] || BtnClass.primary;
    const disabledClass = disabled ? "button-disabled" : "";

    this.innerHTML = `
      <button id="${id}" type="button" class="${commonClasses} ${contentClass} ${disabledClass}" ${disabled ? 'disabled' : ''}>
        ${icon ? `<i class='${icon} mr-1'></i>` : ""} <span class="button-label">${label}</span>
      </button>
    `;
  }
}


class BaseTable extends HTMLElement {
  // khai báo các thuộc tính sẽ nhận vào từ bên file html
  static observedAttributes = ["api", "columns", "event", "pageSize", "method","sortBy","sortType"];

  connectedCallback() {
    const api = this.getAttribute("api"); // tên biến lưu trữ thông tin liên quan đến api
    const columnsKey = this.getAttribute("columns"); // ... columns
    const eventKey = this.getAttribute("event"); // ... event
    const method = this.getAttribute("method") || "GET";
    const sortBy = this.getAttribute("sortBy")|| "id"
    const sortType = this.getAttribute("sortType")|| "ASC"

    function getApiUrl() {
      window["buildApiUrl"];
      if (window[api] === undefined) return api; 
      return window[api](); 
    } 

    function formatDateTime(dateTimeStr) {
      const dateTime = new Date(dateTimeStr);
      const year = dateTime.getFullYear();
      const month = String(dateTime.getMonth() + 1).padStart(2, "0");
      const day = String(dateTime.getDate()).padStart(2, "0");
      const hours = String(dateTime.getHours()).padStart(2, "0");
      const minutes = String(dateTime.getMinutes()).padStart(2, "0");

      return `${day}-${month}-${year} `;
    }

    function formatTime(dateTimeStr) {
      const dateTime = new Date(dateTimeStr);
      const hours = String(dateTime.getHours()).padStart(2, "0");
      const minutes = String(dateTime.getMinutes()).padStart(2, "0");
      const seconds = String(dateTime.getSeconds()).padStart(2, "0");

      return `${hours}:${minutes}:${seconds}`;
    }

    function getMonth(dateTimeStr) {
      const dateTime = new Date(dateTimeStr);
      const year = dateTime.getFullYear();
      const month = String(dateTime.getMonth() + 1).padStart(2, "0");
      const day = String(dateTime.getDate()).padStart(2, "0");
      const hours = String(dateTime.getHours()).padStart(2, "0");
      const minutes = String(dateTime.getMinutes()).padStart(2, "0");

      return `${month} `;
    }
    function formatCurrency(val) {
      return val.toLocaleString("it-IT", {
        style: "currency",
        currency: "VND",
      });
    }

    document.addEventListener("DOMContentLoaded", () => {
      const columns = window[columnsKey] || []; // lấy giá trị tương ứng của colums hoặc mặc định []
      const event = window[eventKey] || {}; // ... event hoặc ... {}

      // this chính là phần html của class BaseTable
      const headEl = this.querySelector("thead");
      // tạo ra 1 thẻ tr mới <tr></tr>
      const headTrEl = document.createElement("tr");
      columns.forEach((col) => {
        if (col.type === "disabled") {
          return; 
        }
        const thEl = document.createElement("th");

        thEl.setAttribute("class", "px-6 py-3");

        thEl.innerText = col.label;

        headTrEl.appendChild(thEl);
      });
      // <thead><tr><th class="px-6 py-3">Mã hợp đồng</th></tr></thead>
      headEl.appendChild(headTrEl);

      headEl.style.backgroundColor = "#444444	"; // Màu nền đen cho phần thead
      headEl.style.color = "#fff"; // màu chữ của thead

      // Danh sách các biến liên quan đến element BaseTable
      const bodyEl = this.querySelector("tbody");
      const paginationEl = this.querySelector(".pagination");
      let sourceTableData = []; // Dữ liệu gốc của bảng chưa qua phâ trang
      let currentPage = 1; // Trang hiện tại dữ liệu hiển thị
      let totalPage = 0; // Tổng số trang bảng sẽ có
      const pageSize = Number(this.getAttribute("pageSize")) || 5; // Số lượng hàng sẽ hiển thị ở 1 trang của bảng lấy theo từ bên trang html truyền vào hoặc 5
      // Xử lý các giá trị của biến liên quan đên hiện thị bảng
      function setTableData(data = []) {
        sourceTableData = data;
        currentPage = 1;
        totalPage = Math.ceil(sourceTableData.length / pageSize);
      }
      // Lấy ra các mục dữ liệu để hiện thị cho trang hiện tại
      function getItemsForPage() {
        const startItem = (currentPage - 1) * pageSize; // Mục bắt đầu của trang hiển tại
        const endItem = startItem + pageSize; // Mục két thúc của trang hiện tại
        return sourceTableData.slice(startItem, endItem); // Các mục dữ liệu cho trang hiện tại
      }
      function getGenderIcon(value) {
        if (value) {
          return '<i class="bx bx-male-sign male-icon"></i>'; // Icon nam
        } else {
          return '<i class="bx bx-female-sign female-icon"></i>'; // Icon nữ
        }
      }
      function getGenderByString(value) {
        if (value === "Nam") {
          return '<i class="bx bx-male-sign male-icon"></i>'; // Icon nam
        } else {
          return '<i class="bx bx-female-sign female-icon"></i>'; // Icon nữ
        }
      }
      // Xử lý phần hiển thị bảng
      function renderTable() {
        bodyEl.innerHTML = "";
        const itemsForPage = getItemsForPage(); // Các mục dữ liệu để hiện thị cho trang hiện tại
        // console.log("itemsForPage ", itemsForPage);
        // lặp lần lượt dữ liệu bảng từ api
        itemsForPage.forEach((row) => {
          // row = { mahopdong: 123123, luongcoban: 12323 }

          // mỗi hàng sẽ tạo 1 thẻ tr tương ứng
          const trEl = document.createElement("tr");

          // set class cho thẻ tr đc tạo
          trEl.setAttribute(
            "class",
            "bg-white border-bottom hover:bg-gray-100 border-b"
          );

          if (event.rowClick !== undefined) {
            // Nếu đã được khai báo lắng nghe sự kiện click của thẻ tr
            trEl.addEventListener("click", () => {
              event.rowClick(row); // gọi đến function rowClick đã được khai báo trước đó
            });
          }
          if (event.rowDoubleClick != undefined) {
            // Thêm sự kiện double click
            trEl.addEventListener("dblclick", () => {
              event.rowDoubleClick(row); // gọi đến function rowDoubleClick đã được khai báo trước đó
            });
          }
          // Lặp lần lượt các thông tin cột
          columns.forEach((col) => {
            if (col.type === "disabled") {
              return; // Skip adding cell for disabled columns
            }

            //  Mã hợp đồng, Lương cơ bả, ...
            // tạo thẻ th
            const thEl = document.createElement("th");
            thEl.setAttribute("class", "px-6 py-3 font-normal text-gray-700");
            // Lấy ra giá trị của cột tương ứng với key được khai báo
            let value = row[col.key]; //mahopdong, luongcoban <=> row['mahopdong'] <=> row.mahopdong

            if (col.type === "noticeBirthdate") {
              if (value === "Đã qua") {
                thEl.style.color = "blue";
              }
              else if (value === "Hôm nay") {
                thEl.style.color = "green";
              }
              else if (value === "Sắp đến") {
                thEl.style.color = "Teal";
              }
              else if (value === "Trong tháng") {
                thEl.style.color = "red";
              }
              else if (value === "Chưa đến") {
                thEl.style.color = "black";
              }
            }
            if (col.formatGiaTri) {
              const formatted = col.formatGiaTri(value);
              value = formatted.text; // Lấy giá trị đã định dạng
              thEl.style.color = formatted.color;
            }
            // truờng hợp key bằng action sẽ hiện thị cột hành đọng với button tương ứng
            if (col.key === "action") {
              //
              col.actions.forEach(
                ({ label, type, icon, onClick, doubleClick }) => {
                  const btnEl = document.createElement("base-button");
                  btnEl.setAttribute("label", label);
                  btnEl.setAttribute("type", type);
                  btnEl.setAttribute("icon", icon);
                  btnEl.setAttribute("mini", "true");
                  btnEl.addEventListener("click", () => onClick(row));
                  btnEl.addEventListener("dblclick", () => doubleClick(row));

                  thEl.appendChild(btnEl);
                }
              );
            } else {
              // nếu type được khai báo thì định dạng lại giá trị tương ứng
              if (col.type === "datetime") {
                if (value === null) {
                  value = " "
                }
                else {
                  value = formatDateTime(value);

                }
              }
              else if (col.type === "time") {
                value = formatTime(value)
              }
              else if (col.type == "month") {
                value = getMonth(value);
              }
              else if (col.type === "currency") {
                if (value === 0 || value === null) {
                  value = value
                }
                else {
                  value = formatCurrency(value);

                }
              } else if (col.type === "gender") {
                if (value === "Nam") {
                  value = getGenderByString("Nam")
                  thEl.innerHTML = value;
                  trEl.appendChild(thEl);
                  return;
                }
                else if (value === "Nữ") {
                  value = getGenderByString("Nữ")
                  thEl.innerHTML = value;
                  trEl.appendChild(thEl);
                  return;
                }
                else {
                  value = getGenderIcon(value); // Sử dụng icon thay vì text
                  thEl.innerHTML = value;
                  trEl.appendChild(thEl);
                  return; // Kết thúc xử lý cho cột này
                }

              }

              if (col.formatter) {
                if (value === null) {
                  value = null
                }
                else {
                  value = col.formatter(value); // value
                }
              }
              thEl.innerText = value;
            }

            trEl.appendChild(thEl);
          });
          // thêm các thẻ tr và body
          bodyEl.appendChild(trEl);
        });
      }
      // xử lý phần hiển thị phân trang
      function renderPagination() {
        paginationEl.innerHTML = "";
        // Nút "Previous"
        // Nút "Previous"
        const prevButton = document.createElement("button");
        prevButton.setAttribute(
          "class",
          "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l hover:bg-gray-100 hover:text-gray-700"
        );
        prevButton.textContent = "Previous";
        prevButton.disabled = currentPage === 1; // Vô hiệu hóa nếu đang ở trang đầu tiên
        prevButton.classList.add(
          currentPage === 1 ? "cursor-not-allowed" : "cursor-pointer"
        );
        prevButton.addEventListener("click", () => {
          if (currentPage > 1) {
            currentPage--;
            renderTable();
            renderPagination();
          }
        });
        paginationEl.appendChild(prevButton);

        // Nút phân trang số
        const addPageButton = (page) => {
          const button = document.createElement("button");
          button.setAttribute(
            "class",
            "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
          );
          button.textContent = page;
          if (page === currentPage) {
            button.setAttribute(
              "class",
              " flex items-center justify-center px-3 h-8 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
            );
          }
          button.addEventListener("click", () => {
            currentPage = page;
            renderTable();
            renderPagination();
          });
          paginationEl.appendChild(button);
        };

        if (totalPage <= 6) {
          for (let i = 1; i <= totalPage; i++) {
            addPageButton(i);
          }
        } else {
          if (currentPage <= 3) {
            for (let i = 1; i <= 4; i++) {
              addPageButton(i);
            }
            paginationEl.appendChild(createEllipsis());
            addPageButton(totalPage);
          } else if (currentPage >= totalPage - 2) {
            addPageButton(1);
            paginationEl.appendChild(createEllipsis());
            for (let i = totalPage - 3; i <= totalPage; i++) {
              addPageButton(i);
            }
          } else {
            addPageButton(1);
            paginationEl.appendChild(createEllipsis());
            for (let i = currentPage - 1; i <= currentPage + 1; i++) {
              addPageButton(i);
            }
            paginationEl.appendChild(createEllipsis());
            addPageButton(totalPage);
          }
        }

        // Nút "Next"
        const nextButton = document.createElement("button");
        nextButton.setAttribute(
          "class",
          "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r hover:bg-gray-100 hover:text-gray-700"
        );
        nextButton.textContent = "Next";
        nextButton.disabled = currentPage === totalPage; // Vô hiệu hóa nếu đang ở trang cuối
        nextButton.classList.add(
          currentPage === totalPage ? "cursor-not-allowed" : "cursor-pointer"
        );
        nextButton.addEventListener("click", () => {
          if (currentPage < totalPage) {
            currentPage++;
            renderTable();
            renderPagination();
          }
        });
        paginationEl.appendChild(nextButton);
      }

      function createEllipsis() {
        const ellipsis = document.createElement("span");
        ellipsis.setAttribute(
          "class",
          "flex items-center justify-center px-3 h-8 leading-tight text-gray-500"
        );
        ellipsis.textContent = "...";
        return ellipsis;
      }
      const handleCallFetchData = (payload) => {
        $.ajax({
          url: getApiUrl(), // lấy ra url api của bảng = http://...
          type: method, // phương thức
          data: payload,
          success: (tableData) => {
            const arg = sortType === "ASC" ? 1 : -1;
            // Kiểm tra xem tableData có phải là một mảng không
            if (Array.isArray(tableData)) {
              if (tableData.length > 0 && tableData[0].hasOwnProperty(sortBy)) {
                const sortedData = tableData.sort((a, b) => (b[sortBy] - a[sortBy])*arg);
                setTableData(sortedData);
              } else {
                setTableData(tableData);
              }

              renderTable();
              renderPagination();
            } else {
              setTableData([]);
              renderTable(); 
            }
          },
          error: (xhr, status, error) => {
            const hasEmptyEl = document.querySelector("#empty-data");
            if (hasEmptyEl) return;

            // Trường hợp thất bại
            const wrapperTable = document.querySelector("#wrapper-table");

            const divEl = document.createElement("div");
            divEl.setAttribute("id", "empty-data");
            divEl.setAttribute(
              "class",
              "text-center text-gray-400 mt-5 mb-5 text-sm"
            );
            // divEl.innerText = "Không có dữ liệu!";
            wrapperTable.append(divEl);
          },
        });
      };

      handleCallFetchData();

      this.handleCallFetchData = handleCallFetchData;
    });

    this.innerHTML = `
    <div id="wrapper-table" class="relative overflow-x-auto bg-gray-100">
      <table id="employee-table" class="w-full text-sm text-left rtl:text-right text-gray">
        <thead class=" text-gray-700 uppercase bg-ffffff"></thead>
        <tbody></tbody>
      </table>
      <div class="pagination flex items-center justify-center -space-x-px h-8 mt-3 gap-2"></div>
    </div>
    `;
  }
}

class CustomAlert extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="modal" id="popupAlert">
    <div class="fixed inset-0 z-40 min-h-full overflow-y-auto overflow-x-hidden transition flex items-center">
      <!-- overlay -->
      <div aria-hidden="true" class="fixed inset-0 w-full h-full bg-black/50 cursor-pointer">
      </div>
      <!-- Modal -->
      <div class="relative w-full cursor-pointer pointer-events-none transition my-auto p-4">
        <div
          class="w-full py-2 bg-white cursor-default pointer-events-auto dark:bg-gray-800 relative rounded-xl mx-auto max-w-sm">
          <div class="space-y-2 p-2">
            <div class="p-4 space-y-2 text-center dark:text-white">
              <h2 class="text-xl font-bold tracking-tight" id="page-action.heading">
                Thông báo
              </h2>
              <p id="alertMessage" class="text-gray-500">
                Nội dung thông báo
              </p>
            </div>
          </div>
          <div class="space-y-2">
            <div aria-hidden="true" class="border-t dark:border-gray-700 px-2"></div>
            <div class="px-6 py-2">
              <div class="grid gap-2 grid-cols-[repeat(auto-fit,minmax(0,1fr))]">
                <!-- Nút Xác Nhận -->
                <button type="submit" id="confirmButton"
                  class="inline-flex items-center justify-center py-1 gap-1 font-medium rounded-lg border transition-colors outline-none focus:ring-offset-2 focus:ring-2 focus:ring-inset min-h-[2.25rem] px-4 text-sm text-white shadow focus:ring-white border-transparent bg-[rgb(0,28,64)] hover:bg-[rgb(0,28,64)] focus:ring-offset-[rgb(0,28,64)]">
                  <span class="flex items-center gap-1">
                    <span>
                      Xác nhận
                    </span>
                  </span>
                </button>
                <!-- Nút Hủy -->
                <button type="button" id="cancelButton"
                  class="inline-flex items-center justify-center py-1 gap-1 font-medium rounded-lg border transition-colors outline-none focus:ring-offset-2 focus:ring-2 focus:ring-inset min-h-[2.25rem] px-4 text-sm text-white bg-[rgb(245,157,57)] border-transparent hover:bg-[rgb(245,157,57)] focus:ring-offset-[rgb(245,157,57)]">
                  <span class="flex items-center gap-1">
                    <span>
                      Hủy
                    </span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    `;
  }
}

class CustomAlertEror extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
<div class="modal fixed z-10 inset-0 overflow-y-auto" id="popupAlertError" style="display: none;">
  <div class="change-container" style="padding:0px">

    <div class="relative bg-white rounded-lg px-6 py-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-md sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
      <div class="flex items-center justify-center mb-4">
        <div class="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
          <svg class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      </div>
      <div class="text-center">
        <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
          Lỗi
        </h3>
        <div class="mt-2">
          <p class="text-sm text-gray-500" id="errorMessage">
            There was an error processing your request.
          </p>
        </div>
      </div>
      <div class="mt-4">
        <button class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm" id="okButton">
          OK
        </button>
      </div>
    </div>
  </div>
</div>


    `;
  }
}

class CustomAlertSuccess extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
<div class="modal fixed z-10 inset-0 overflow-y-auto" id="popupConfirmSuccess">
    <div class="change-container" style="padding:0px">
      <div
        class="relative bg-white rounded-lg px-6 py-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-md sm:w-full"
        role="dialog" aria-modal="true" aria-labelledby="modal-headline">
        <div class="flex items-center justify-center mb-4">
          <div class="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
            <svg class="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <div class="text-center">
          <h3 class="text-lg leading-6 font-medium text-gray-900" id="successMessage">
            Xác Nhận Thành Công
          </h3>
        </div>
        <div class="mt-4">
          <button
            class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm"
            id="okSuccessButton">
            OK
          </button>
        </div>
      </div>
    </div>
  </div>
    `;
  }
}

class CustomAlertNagivation extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
<div class="modal fixed z-10 inset-0 overflow-y-auto" id="popupNavigation">
    <div class="change-container" style="padding:0px">
      <div
        class="relative bg-white rounded-lg px-6 py-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-md sm:w-full"
        role="dialog" aria-modal="true" aria-labelledby="modal-headline">
        <div class="flex items-center justify-center mb-4">
          <div class="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
            <svg class="h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 13l-5-5-5 5m10-7v6" />
            </svg>
          </div>
        </div>
        <div class="text-center">
          <h3 class="text-lg leading-6 font-medium text-gray-900" id="navigationMessage">
            Xác Nhận Điều Hướng
          </h3>
        </div>
        <div class="mt-4">
          <button
            class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
            id="navigateButton">
            Điều Hướng
          </button>
        </div>
      </div>
    </div>
  </div>
    `;
  }
}

customElements.define('custom-navigation', CustomAlertNagivation);
customElements.define('custom-alert', CustomAlert);
customElements.define('custom-error', CustomAlertEror);
customElements.define('custom-success', CustomAlertSuccess);
//  1 : Tên thẻ mình tự địnch nghĩa dùng trong các file html phải nhúng file registerComponent.js này vào file js mới dùng được
customElements.define(/** 1*/ "layout-header", /** 2*/ CustomHeader); // 2 Class định nghĩa rằng khi dùng thẻ có tên được định nghĩa kia thì màn hình sẽ hiện thị như thế nào
customElements.define(/** 1*/ "layout-footer", /** 2*/ CustomFooter);
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