class CustomHeader extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
      <header class="bg-gray-700 p-3 flex">
        <div class="flex items-center justify-between w-full">
          <div class="flex items-center text-white w-[300px]">
            <i class='bx bx-menu text-white text-2xl cursor-pointer transition hover:brightness-90'></i>
            <span class="ml-3 text-xl font-bold">
              <a href="/pages/employee/overView.html">HRM</a>
            </span>
          </div>
          <div class="flex items-center">
            <img src="" alt="Avatar" class="w-10 h-10 rounded-full ml-1">
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
            <span class="text-xs bg-blue-200 py- px-2 rounded-full text-blue-700">Admin</span>
        </div>
    </div>
    <div class="border-b border-gray-200 ">
        <div class="p-3 flex items-center cursor-pointer transition hover:bg-gray-200 relative" id="menu1"">
        <span class=" w-10">
            <i class='bx bx-bar-chart-alt'></i>
            </span>
            <span>
                <a href="overview.html" class="block p-2 hover:bg-gray-100 submenu-item" style="width: 200px;">Tổng Quan</a>
            </span>
        </div>
        <div class="p-3 flex items-center cursor-pointer transition hover:bg-gray-200 relative" id="menu2"">
        <span class=" w-10">
            <i class='bx bx-group text-lg'></i>
            </span>
            <span>
                <a href="#" class="block p-2 hover:bg-gray-100 submenu-item" style="width: 200px;">Hồ sơ</a>
            </span>
        </div>
        <div class="p-3 flex items-center cursor-pointer transition hover:bg-gray-200 relative" id="menu3"">
        <span class=" w-10">
            <i class='bx bx-file-find'></i>
            </span>
            <span>
                <a href="laborContract.html" class="block p-2 hover:bg-gray-100 submenu-item" style="width: 200px;">Hợp Đồng</a>
            </span>

        </div>
        <div class="p-3 flex items-center cursor-pointer transition hover:bg-gray-200 relative" id="menu4"">
        <span class=" w-10">
            <i class='bx bx-money'></i>
            </span>
            <span>
                <a href="salaryRecord.html" class="block p-2 hover:bg-gray-100 submenu-item" style="width: 200px;">Bảng Lương</a>
            </span>

        </div>
        <div class="p-3 flex items-center cursor-pointer transition hover:bg-gray-200 relative" id="menu4"">
        <span class=" w-10">
            <i class='bx bx-group'></i>
            </span>
            <span>
                <a href="familyRelationship.html" class="block p-2 hover:bg-gray-100 submenu-item" style="width: 200px;">Quan Hệ Gia Đình</a>
            </span>

        </div>
        <div class="p-3 flex items-center cursor-pointer transition hover:bg-gray-200 relative" id="menu4"">
        <span class=" w-10">
            <i class='bx bx-trophy'></i>
            </span>
            <span>
                <a href="award.html" class="block p-2 hover:bg-gray-100 submenu-item" style="width: 200px;">Khen Thưởng</a>
            </span>

        </div>
        <div class="p-3 flex items-center cursor-pointer transition hover:bg-gray-200 relative" id="menu4"">
        <span class=" w-10">
            <i class='bx bx-shield'></i>
            </span>
            <span>
                <a href="discipline.html" class="block p-2 hover:bg-gray-100 submenu-item" style="width: 200px;">Kỷ Luật</a>
            </span>

        </div>
        <div class="p-3 flex items-center cursor-pointer transition hover:bg-gray-200">
            <span class="w-10">
                <i class='bx bx-transfer'></i>
            </span>
            <span>
                <a href="#" class="block p-2 hover:bg-gray-100 submenu-item" style="width: 200px;">Thuyên Chuyển</a>
            </span>
        </div>
        <div class="p-3 flex items-center cursor-pointer transition hover:bg-gray-200">
            <span class="w-10">
                <i class='bx bx-exit'></i>
            </span>
            <span>
                <a href="#" class="block p-2 hover:bg-gray-100 submenu-item" style="width: 200px;">Nghỉ Việc</a>
            </span>
        </div>
        <div class="p-3 flex items-center cursor-pointer transition hover:bg-gray-200">
            <span class="w-10">
                <i class='bx bx-file-find'></i>
            </span>
            <span>
                <a href="#" class="block p-2 hover:bg-gray-100 submenu-item" style="width: 200px;">Báo Cáo</a>
            </span>
        </div>
        <div class="p-3 flex items-center cursor-pointer transition hover:bg-gray-200">
            <span class="w-10">
                <i class='bx bx-user-circle'></i>
            </span>
            <span>
                <a href="#" class="block p-2 hover:bg-gray-100 submenu-item" style="width: 200px;">Hoạt Động Tài Khoản</a>
            </span>
        </div>
    </div>
</div>
          `;
          document.addEventListener("DOMContentLoaded", function() {
            // Lặp qua các mục menu và thêm sự kiện click
            const menuItems = document.querySelectorAll("#tabList .flex");
            menuItems.forEach(function(menuItem) {
              menuItem.addEventListener("click", function() {
                // Loại bỏ class active-menu khỏi tất cả các mục menu
                menuItems.forEach(function(item) {
                  item.classList.remove("active-menu");
                });
          
                // Thêm class active-menu cho mục menu được click
                this.classList.add("active-menu");
              });
            });
          });
    }
  
  }
  class BaseInput extends HTMLElement {
    static observedAttributes = ["label", "hide-label", "name", "required", "type"];
  
    connectedCallback() {
      const label = this.getAttribute("label") || "Base input";
      const hideLabel = !this.getAttribute("hide-label");
      const name = this.getAttribute("name");
      const required = this.getAttribute("required");
      const type = this.getAttribute("type") || "text";
  
  
      this.innerHTML = `
      <div>
        <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 ${hideLabel ? "" : "hidden"}">${label}</label>
        <input type="${type}" name="${name}" required="${required}" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
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
            <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
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
        <input type="tel" name="${name}" required="${required}" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"placeholder="Nhập số điện thoại"  >
      </div>
      `;
    }
  }
  
  // class BaseInputNumber extends HTMLElement {
  //   static observedAttributes = ["label", "name", "required"];
  
  //   connectedCallback() {
  //     const label = this.getAttribute("label") || "Base input";
  //     const name = this.getAttribute("name");
  //     const required = this.getAttribute("required");
  
  //     this.innerHTML = `
  //     <div class="">
  //       <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900">${label}</label>
  //       <input type="text" name="${name}" required="${required}" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
  //     </div>
  //     `;
  //   }
  // }
  
  class BaseInputNumber extends HTMLElement {
    static observedAttributes = ["label", "name", "required", "value", "readonly"];
  
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
        <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900">${label}</label>
        <input type="text" name="${name}" required="${required}" value="${value}" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" ${this._readonly ? 'readonly' : ''}>
      </div>
      `;
  
      this.inputElement = this.querySelector("input");
      this.inputElement.addEventListener("input", this.handleInputChange.bind(this));
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
      const checked = this.getAttribute('checked')
  
      this.innerHTML = `
      <div class="flex items-center mb-4">
        <input type="radio" value="${value}" name="${name}" ${checked !== null ? "checked" : ''} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600">
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
  
      function getApiUrl() {
        if (!window[api]) return api
        return window[api]()
      }
  
      document.addEventListener('DOMContentLoaded', () => {
  
        if (!!api) {
          $.ajax({
            url: getApiUrl(),
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
    static observedAttributes = ["label", "class", "name", 'idImage'];
  
    connectedCallback() {
      const label = this.getAttribute("label") || "Base input";
      const contentClass = this.getAttribute("class") || "";
      const name = this.getAttribute("name")
      const idImage = this.getAttribute("idImage")
  
      this.innerHTML = `
        <div class="flex items-center justify-center w-full h-full">
            <label for="dropzone-file" class="flex flex-col items-center justify-center w-full min-h-64 h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 relative">
                <img 
                  id="${idImage}"
                  src="" 
                  class="absolute h-full w-full object-contain rounded-lg opacity-0 bg-gray-50"
                />
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                    </svg>
                    <p class="mb-2 text-sm text-gray-50 "><span class="font-semibold">Click to upload</span> or drag and drop</p>
                    <p class="text-xs text-gray-500"> PNG, JPG or JPEG (MAX. 800x400px)</p>
                </div>
                <input id="dropzone-file" type="file" name="${name}" accept="image/*" class="hidden" />
            </label>
        </div> 
      `;
  
      document.addEventListener('DOMContentLoaded', () => {
        const inputEl = this.querySelector('input')
        const imageEl = this.querySelector('img')
        inputEl.addEventListener('change', (e) => {
          const file = e.target.files[0]
          const path = URL.createObjectURL(file)
          imageEl.setAttribute('src', path)
          imageEl.classList.remove('opacity-0')
        })
      })
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
  
      if (mini) {
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
  
  class BaseTable extends HTMLElement {
    // khai báo các thuộc tính sẽ nhận vào từ bên file html
    static observedAttributes = ["api", "columns", "event"];
    connectedCallback() {
      // Lấy giá trị các thuộc tính đã được khai báo <=> Tiên biến global tương ứng với các thuộc tính
      const api = this.getAttribute('api') // tên biến lưu trữ thông tin liên quan đến api
      const columnsKey = this.getAttribute('columns') // ... columns
      const eventKey = this.getAttribute('event') // ... event
  
      // api = 'buildApiUrl'
  
      // Xử lý lấy thông tin api từ giá trị của thuộc tính api
      function getApiUrl() {
        // window là biến toàn cục đại diện cho trang web
        
        // const user = { name: "Duy" }
        // const userKey = "name"
        // user[userKey] <=> user.name
  
        window['buildApiUrl']
  
        // không tồn tại biến khai báo thông tin api bên file js
        if (window[api] === undefined) return api // hoạt động với chế động url http:...
  
        return window[api]() // http://.../123
      } // http://...
  
      // định dạng lại kiểu datetime
      function formatDateTime(dateTimeStr) {
        const dateTime = new Date(dateTimeStr);
        const year = dateTime.getFullYear();
        const month = String(dateTime.getMonth() + 1).padStart(2, '0');
        const day = String(dateTime.getDate()).padStart(2, '0');
        const hours = String(dateTime.getHours()).padStart(2, '0');
        const minutes = String(dateTime.getMinutes()).padStart(2, '0');
  
        return `${day}-${month}-${year} `;
      }
  
      // định dạg lại kiểu tiền tệ
      function formatCurrency(val) {
        return val.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
      }
  
      // addEventListener('DOMContentLoaded' : sự kiện sau khi nội dung trang wen đã hiện thị xong
      document.addEventListener('DOMContentLoaded', () => {
        const columns = window[columnsKey] || [] // lấy giá trị tương ứng của colums hoặc mặc định []
        const event = window[eventKey] || {} // ... event hoặc ... {}
  
        // this chính là phần html của class BaseTable
        const headEl = this.querySelector('thead')
        // tạo ra 1 thẻ tr mới <tr></tr>
        const headTrEl = document.createElement('tr')
        columns.forEach(col => { // cột mã hợp đồng, Lương cơ bản, Từ ngày, ...
          // tạo 1 thẻ th đại hiện cho cột
          const thEl = document.createElement('th')
          // ghi giá trị vào attribue của thẻ th đc tạo <th class="px-6 py-3"></th>
          thEl.setAttribute('class', 'px-6 py-3')
          // <th class="px-6 py-3">Mã hợp đồng</th>
          thEl.innerText = col.label
          // <tr><th class="px-6 py-3">Mã hợp đồng</th></tr>
          headTrEl.appendChild(thEl)
        })
        // <thead><tr><th class="px-6 py-3">Mã hợp đồng</th></tr></thead>
        headEl.appendChild(headTrEl)
  
        headEl.style.backgroundColor = '#444444	'; // Màu nền đen cho phần thead
        headEl.style.color = '#fff'; // màu chữ của thead
  
        $.ajax({
          url: getApiUrl(), // lấy ra url api của bảng = http://...
          method: 'GET', // phương thức
          success: (tableData) => { // tableData : dữ liệu Api bảng trả về
            // Tìm ra thẻ Tbody của bảng
            const bodyEl = this.querySelector('tbody')
            // Cát giá trị chỉ hiển thị tối đa 30 dòng
            const tableDataDisplay = tableData.slice(0, 30)
            // lặp lần lượt dữ liệu bảng từ api
            tableDataDisplay.forEach(row => {
  
              // row = { mahopdong: 123123, luongcoban: 12323 }
  
              // mỗi hàng sẽ tạo 1 thẻ tr tương ứng
              const trEl = document.createElement('tr')
              // set class cho thẻ tr đc tạo
              trEl.setAttribute('class', 'bg-white border-bottom hover:bg-gray-100')
              // kiểm tra xem sự kiện rowClick đã đc khai báo hay chưa
              if(event.rowClick != undefined) { 
                // Nếu đã được khai báo lắng nghe sự kiện click của thẻ tr
                trEl.addEventListener("click", () => {
                  event.rowClick(row) // gọi đến function rowClick đã được khai báo trước đó
                })
              }
              // Lặp lần lượt các thông tin cột
              columns.forEach(col => { //  Mã hợp đồng, Lương cơ bả, ...
                // tạo thẻ th
                const thEl = document.createElement('th')
                thEl.setAttribute('class', 'px-6 py-3 font-normal text-gray-500')
                // Lấy ra giá trị của cột tương ứng với key được khai báo
                let value = row[col.key] //mahopdong, luongcoban <=> row['mahopdong'] <=> row.mahopdong
  
                // truờng hợp key bằng action sẽ hiện thị cột hành đọng với button tương ứng
                if (col.key === 'action') {
                  // 
                  col.actions.forEach(({ label, type, icon, onClick }) => {
                    const btnEl = document.createElement('base-button')
                    btnEl.setAttribute('label', label)
                    btnEl.setAttribute('type', type)
                    btnEl.setAttribute('icon', icon)
                    btnEl.setAttribute('mini', "true")
                    btnEl.addEventListener('click', () => onClick(row))
                    thEl.appendChild(btnEl)
                  })
                } else {
                  // nếu type được khai báo thì định dạng lại giá trị tương ứng
                  if (col.type === 'datetime') {
                    value = formatDateTime(value)
                  } else if (col.type === 'currency') {
                    value = formatCurrency(value)
                  }
  
                  // định dạng lại giá trị theo function đưojc kahi báo trong cột tương ứng
                  if (col.formatter) {
                    console.log(value)
                    value = col.formatter(value) // value 
                  }
  
                  // <th> nội dung đã được định dạng lại /th>
                  thEl.innerText = value
                }
  
                trEl.appendChild(thEl)
              })
              // thêm các thẻ tr và body
              bodyEl.appendChild(trEl)
            })
          },
          error: (xhr, status, error) => {
            // Trường hợp thất bại
            const wrapperTable = this.querySelector('#wrapper-table')
            const divEl = document.createElement('div')
            divEl.setAttribute('class', 'text-center text-gray-400 mt-5 mb-5 text-sm')
            divEl.innerText = 'Không có dữ liệu!'
            wrapperTable.append(divEl)
          }
        });
      })
  
      this.innerHTML = `
      <div id="wrapper-table" class="relative overflow-x-auto bg-gray-100">
        <table id="employee-table" class="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50"></thead>
          <tbody></tbody>
        </table>
      </div>
      `
    }
  }

//   class BaseImage extends HTMLElement {
//     static observedAttributes = ["src", "alt"];
  
//     connectedCallback() {
//       const src = this.getAttribute("src");
//       const alt = this.getAttribute("alt") || "Image";
      
//       this.innerHTML = `
//       <div class="bg-gray-300 p-3 rounded-lg flex items-center justify-center" style="background-image: url('${src}'); background-size: cover; background-position: center; width: 300px; height: 300px;">
//         <div class="ml-4">
//           <h2 class="text-lg font-semibold">${alt}</h2>
//           <p class="text-gray-600">Chữ đề mục 2</p>
//         </div>
//       </div>
//       `;
//     }
// }
class BaseImage extends HTMLElement {
  static observedAttributes = ["icon","color","description","title","titleLink","href"];

  connectedCallback() {
    const icon = this.getAttribute("icon");
    const color = this.getAttribute("color");
    const description = this.getAttribute("description");
    const title = this.getAttribute("title")||"";
    const titleLink = this.getAttribute("titleLink");
    const href = this.getAttribute("href");
    
    this.innerHTML = `
  <div class="p-3 rounded-lg flex items-center justify-center relative" style="width: 90%; height: 200px; background-color: ${color};">
    <div class="absolute top-0 right-0 m-4 text-8xl">${icon}</div>
    <div class="ml-4">
        <h2 class="text-7xl font-semibold absolute top-5 left-8" style="color: white;">${title}</h2>
        <p class="text-gray-600 text-lg font-semibold absolute top-25 left-8" style="color: white;">${description}</p>
    </div>
    <div class="footer absolute bottom-0 left-0 right-0 p-3 bg-gray-200 text-center">
        <a href="${href}" class="block w-full text-blue-500 font-semibold">${titleLink}</a>
    </div>
</div>



    `;
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
  customElements.define("base-image", BaseImage);