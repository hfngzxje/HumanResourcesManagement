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

class CustomSidebar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <aside class="app-sidebar">
    <div class="app-sidebar__user" style="display: flex; align-items: center; flex-direction: column;"><img id="userAvatar" class="app-sidebar__user-avatar" src="" width="50px"
        alt="User Image">
      <div>
        <p id="tenNhanVien" class="app-sidebar__user-name" style="font-weight: bold;"></p>
        <p id="role" style="color: #003366; font-weight: bold; border: 2px solid blue; padding: 2px 20px; border-radius: 25px; display: inline-block;background-color: white;"> </p>
        <p class="app-sidebar__user-designation">Chào mừng bạn trở lại</p>
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
      <li><a class="app-menu__item" href="table-data-product.html"><i
            class='app-menu__icon bx bx-transfer'></i><span class="app-menu__label">Quản lý điều chuyển</span></a>
      </li>
      <li><a class="app-menu__item" href="table-data-oder.html"><i class='app-menu__icon bx bx-trophy'></i><span
            class="app-menu__label">Quản lý khen thưởng</span></a></li>
      <li><a class="app-menu__item" href="table-data-banned.html"><i class='app-menu__icon bx bx-shield'></i><span
            class="app-menu__label">Quản lý kỷ luật</span></a></li>
      <li><a class="app-menu__item" href="/pages/catalog/catalog.html"><i class='app-menu__icon bx bx-category-alt'></i><span
            class="app-menu__label">Danh mục</span></a></li>
      <li><a class="app-menu__item" href="/pages/staffSideBar/report.html"><i
            class='app-menu__icon bx bx-pie-chart-alt-2'></i><span class="app-menu__label">Báo cáo </span></a>
      </li>
      <li><a class="app-menu__item" href="page-calendar.html"><i class='app-menu__icon bx bx-user'></i><span
            class="app-menu__label">Chi tiết cá nhân </span></a></li>
      <li><a id="btn" class="app-menu__item" href="#"><i class='app-menu__icon bx bx-key'></i><span class="app-menu__label">Đổi mật khẩu</span></a></li>
    </ul>
  </aside>

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
       if(maNhanVien === '1'){
        maNhanVienElement.textContent = 'Admin'
       }
       else{
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
  ];

  connectedCallback() {
    const label = this.getAttribute("label") || "Base input";
    const hideLabel = !this.getAttribute("hide-label");
    const name = this.getAttribute("name");
    const required = this.getAttribute("required");
    const type = this.getAttribute("type") || "text";

    this.innerHTML = `
    <div>
      <label for="base-input" class="block  text-sm  text-gray-900 ${
        hideLabel ? "mt-" : "hidden"
      }">${label}</label>
      <input type="${type}" name="${name}" required="${required}" class="bg-ffffff border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
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
    <label for="base-textarea" class="block mb-2 text-sm  text-gray-900 ${
      hideLabel ? "" : "hidden"
    }">${label}</label>
      <textarea rows="${row}" cols="50" name="${name}" required="${required}" class="bg-ffffff border border-gray-300" placeholder="Nhập thông tin..." > </textarea>
    </div>
    `;
  }
}

class BaseDatePicker extends HTMLElement {
  static observedAttributes = ["label", "name", "required"];

  connectedCallback() {
    const label = this.getAttribute("label") || "Base input";
    const name = this.getAttribute("name");
    const required = this.getAttribute("required");

    this.innerHTML = `
    <div class="flex flex-col h-full w-full">
      <label for="base-input" class="block  text-sm  text-gray-900">${label}</label>
      <div class="relative max-w-sm">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
          <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
          </svg>
        </div>
        <input datepicker type="text" name="${name}" required="${required}" class="bg-ffffff border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 " placeholder="Select date">
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
      <label for="base-input" class="block  text-sm  text-gray-900">${label}</label>
      <input type="tel" name="${name}" required="${required}" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" class="bg-ffffff border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"placeholder="Nhập số điện thoại"  >
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
    this._readonly = this.hasAttribute("readonly");

    this.innerHTML = `
    <div class="">
      <label for="base-input" class="block  text-sm  text-gray-900">${label}</label>
      <input type="text" name="${name}" required="${required}" value="${value}" class="bg-ffffff border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" ${
      this._readonly ? "readonly" : ""
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
      <input type="radio" value="${value}" name="${name}" ${
      checked !== null ? "checked" : ""
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
  ];

  connectedCallback() {
    const label = this.getAttribute("label") || "Base input";
    const name = this.getAttribute("name");
    const optionsKey = this.getAttribute("options");
    const api = this.getAttribute("api");
    const keyValue = this.getAttribute("keyValue") || "value";
    const keyLabel = this.getAttribute("keyLabel") || "label";
    const required = this.getAttribute("required");

    function getApiUrl() {
      if (!window[api]) return api;
      return window[api]();
    }
    const renderOption = () =>{
      this.querySelector('select').innerHTML = ""
      if (!!api) {
        $.ajax({
          url: getApiUrl(),
          method: "GET",
          success: (data) => {
            data.forEach((item) => {
              const option = document.createElement("option");
              option.value = item[keyValue];
              option.innerText = item[keyLabel];
              this.querySelector("select").append(option);
            });
          },
          error: (err) => {
            console.log("Base select api err :: ", err);
          },
        });
        return;
      }
      const options = window[optionsKey] || [];
      options.forEach(({ value, label }) => {
        const option = document.createElement("option");
        option.value = value;
        option.innerText = label;
        this.querySelector("select").append(option);
      });
    }
    this.renderOption = renderOption

    document.addEventListener("DOMContentLoaded", () => {
      renderOption()
    });

    this.innerHTML = `
    <div class="max-w-sm" style="margin: 0;">
      <label class="block mb-2 text-sm  text-gray-900">${label}</label>
      <select name="${name}" required="${required}" class="h-[42px] bg-ffffff border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
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
  static observedAttributes = ["api", "columns", "event", "pageSize", "method"];

  connectedCallback() {
    // Lấy giá trị các thuộc tính đã được khai báo <=> Tiên biến global tương ứng với các thuộc tính
    const api = this.getAttribute("api"); // tên biến lưu trữ thông tin liên quan đến api
    const columnsKey = this.getAttribute("columns"); // ... columns
    const eventKey = this.getAttribute("event"); // ... event
    const method = this.getAttribute("method") || "GET";

    // api = 'buildApiUrl'

    // Xử lý lấy thông tin api từ giá trị của thuộc tính api
    function getApiUrl() {
      // window là biến toàn cục đại diện cho trang web

      // const user = { name: "Duy" }
      // const userKey = "name"
      // user[userKey] <=> user.name

      window["buildApiUrl"];

      // không tồn tại biến khai báo thông tin api bên file js
      if (window[api] === undefined) return api; // hoạt động với chế động url http:...

      return window[api](); // http://.../123
    } // http://...

    // định dạng lại kiểu datetime
    function formatDateTime(dateTimeStr) {
      const dateTime = new Date(dateTimeStr);
      const year = dateTime.getFullYear();
      const month = String(dateTime.getMonth() + 1).padStart(2, "0");
      const day = String(dateTime.getDate()).padStart(2, "0");
      const hours = String(dateTime.getHours()).padStart(2, "0");
      const minutes = String(dateTime.getMinutes()).padStart(2, "0");

      return `${day}-${month}-${year} `;
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
    function getBirthDate(dateTimeStr) {
      const dateTime = new Date(dateTimeStr);
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(dateTime.getMonth() + 1).padStart(2, "0");
      const day = String(dateTime.getDate()).padStart(2, "0");

      return `${day}-${month}-${year} `;
    }
    function getNoticeBirthDate(value) {
      const currentDate = new Date();

      const birthDate = new Date(value);
      const birthMonth = birthDate.getMonth();
      const birthDay = birthDate.getDate();

      let thisYearBirthDate = new Date(
        currentDate.getFullYear(),
        birthMonth,
        birthDay
      );

      if (thisYearBirthDate < currentDate) {
        thisYearBirthDate.setFullYear(thisYearBirthDate.getFullYear());
      }

      const differenceInTime = currentDate - thisYearBirthDate;

      const daysUntilBirthday = differenceInTime / (1000 * 60 * 60 * 24);

      if (daysUntilBirthday >= -10 && daysUntilBirthday < 0) {
        return "Sắp sinh nhật";
      } else if (daysUntilBirthday > 0) {
        return "Đã xong";
      } else {
        return " ";
      }
    }

    // định dạg lại kiểu tiền tệ
    function formatCurrency(val) {
      return val.toLocaleString("it-IT", {
        style: "currency",
        currency: "VND",
      });
    }

    // addEventListener('DOMContentLoaded' : sự kiện sau khi nội dung trang wen đã hiện thị xong
    document.addEventListener("DOMContentLoaded", () => {
      const columns = window[columnsKey] || []; // lấy giá trị tương ứng của colums hoặc mặc định []
      const event = window[eventKey] || {}; // ... event hoặc ... {}

      // this chính là phần html của class BaseTable
      const headEl = this.querySelector("thead");
      // tạo ra 1 thẻ tr mới <tr></tr>
      const headTrEl = document.createElement("tr");
      columns.forEach((col) => {
        // cột mã hợp đồng, Lương cơ bản, Từ ngày, ...
        // tạo 1 thẻ th đại hiện cho cột
        const thEl = document.createElement("th");
        // ghi giá trị vào attribue của thẻ th đc tạo <th class="px-6 py-3"></th>
        thEl.setAttribute("class", "px-6 py-3");
        // <th class="px-6 py-3">Mã hợp đồng</th>
        thEl.innerText = col.label;
        // <tr><th class="px-6 py-3">Mã hợp đồng</th></tr>
        headTrEl.appendChild(thEl);
      });
      // <thead><tr><th class="px-6 py-3">Mã hợp đồng</th></tr></thead>
      headEl.appendChild(headTrEl);

      headEl.style.backgroundColor = "#444444	"; // Màu nền đen cho phần thead
      headEl.style.color = "#fff"; // màu chữ của thead

      // Danh sách các biến liên quan đến element BaseTable
      const bodyEl = this.querySelector("tbody");
      const paginationEl = this.querySelector(".pagination");
      // Các biến lưu trữ thôn tin liên quan đến hiện thỉ bảng
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
      // Xử lý phần hiển thị bảng
      function renderTable() {
        bodyEl.innerHTML = "";
        const itemsForPage = getItemsForPage(); // Các mục dữ liệu để hiện thị cho trang hiện tại
        console.log("itemsForPage ", itemsForPage);
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
            //  Mã hợp đồng, Lương cơ bả, ...
            // tạo thẻ th
            const thEl = document.createElement("th");
            thEl.setAttribute("class", "px-6 py-3 font-normal text-gray-700");
            // Lấy ra giá trị của cột tương ứng với key được khai báo
            let value = row[col.key]; //mahopdong, luongcoban <=> row['mahopdong'] <=> row.mahopdong

            if (col.type === "noticeBirthdate") {
              const noticeValue = getNoticeBirthDate(value);
              if (noticeValue === "Đã xong") {
                thEl.style.color = "blue";
              } else if (noticeValue === "Hôm nay sinh nhật") {
                thEl.style.color = "green";
              } else if (noticeValue === "Sắp sinh nhật") {
                thEl.style.color = "red";
              }
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
                value = formatDateTime(value);
              } else if (col.type == "month") {
                value = getMonth(value);
              } else if (col.type == "birthDate") {
                value = getBirthDate(value);
              } else if (col.type == "noticeBirthdate") {
                value = getNoticeBirthDate(value);
              } else if (col.type === "currency") {
                value = formatCurrency(value);
              } else if (col.type === "gender") {
                value = value ? "Nam" : "Nữ";
              }

              // định dạng lại giá trị theo function đưojc kahi báo trong cột tương ứng
              if (col.formatter) {
                console.log(value);
                value = col.formatter(value); // value
              }

              // <th> nội dung đã được định dạng lại /th>
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
            // tableData : dữ liệu Api bảng trả về

            setTableData(tableData);
            renderTable();
            renderPagination();
          },
          error: (xhr, status, error) => {
            const hasEmptyEl = this.querySelector("#empty-data");
            console.log("hasEmptyEl ", hasEmptyEl);
            if (hasEmptyEl) return;
            // Trường hợp thất bại
            const wrapperTable = this.querySelector("#wrapper-table");

            const divEl = document.createElement("div");
            divEl.setAttribute("id", "empty-data");
            divEl.setAttribute(
              "class",
              "text-center text-gray-400 mt-5 mb-5 text-sm"
            );
            divEl.innerText = "Không có dữ liệu!";
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

//  1 : Tên thẻ mình tự địnch nghĩa dùng trong các file html phải nhúng file registerComponent.js này vào file js mới dùng được
customElements.define(/** 1*/ "layout-header", /** 2*/ CustomHeader); // 2 Class định nghĩa rằng khi dùng thẻ có tên được định nghĩa kia thì màn hình sẽ hiện thị như thế nào
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
