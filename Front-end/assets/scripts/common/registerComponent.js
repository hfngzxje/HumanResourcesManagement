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
          <div class="border-b border-gray-200">
            <div
              class="p-3 flex items-center cursor-pointer transition hover:bg-gray-200"
            >
              <span class="w-10">
                <i class="bx bxs-grid text-lg"></i>
              </span>
              <span> Bảng tin </span>
            </div>
            <div
              class="p-3 flex items-center cursor-pointer transition hover:bg-gray-200"
            >
              <span class="w-10">
                <i class='bx bx-group text-lg' ></i>
              </span>
              <span> Quản lý nhân viên </span>
            </div>
            <div
              class="p-3 flex items-center cursor-pointer transition hover:bg-gray-200"
            >
              <span class="w-10">
                <i class="bx bx-calendar text-lg"></i>
              </span>
              <span> Quản lý nghỉ phép </span>
            </div>
            <div
              class="p-3 flex items-center cursor-pointer transition hover:bg-gray-200"
            >
              <span class="w-10">
                <i class="bx bx-money-withdraw text-lg"></i>
              </span>
              <span> Quản lý lương thưởng </span>
            </div>
            <div
              class="p-3 flex items-center cursor-pointer transition hover:bg-gray-200"
            >
              <span class="w-10">
                <i class="bx bxs-graduation text-lg"></i>
              </span>
              <span> Quản lý đào tạo </span>
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
  }
}

class BaseInput extends HTMLElement {
  static observedAttributes = ["label", "hide-label"];

  connectedCallback() {
    const label = this.getAttribute("label") || "Base input";
    const hideLabel = !this.getAttribute("hide-label");

    this.innerHTML = `
    <div class="">
      <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 ${
        hideLabel ? "" : "hidden"
      }">${label}</label>
      <input type="text" id="base-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
    </div>
    `;
  }
}

class BaseDatePicker extends HTMLElement {
  static observedAttributes = ["label"];

  connectedCallback() {
    const label = this.getAttribute("label") || "Base input";

    this.innerHTML = `
    <div>
      <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900">${label}</label>
      <div class="relative max-w-sm">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
          <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
          </svg>
        </div>
        <input datepicker type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 " placeholder="Select date">
      </div>
    </div>
    `;
  }
}

class BaseInputPhone extends HTMLElement {
  static observedAttributes = ["label"];

  connectedCallback() {
    const label = this.getAttribute("label") || "Base input";

    this.innerHTML = `
    <div class="">
      <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900">${label}</label>
      <input type="text" id="base-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
    </div>
    `;
  }
}

class BaseInputNumber extends HTMLElement {
  static observedAttributes = ["label"];

  connectedCallback() {
    const label = this.getAttribute("label") || "Base input";

    this.innerHTML = `
    <div class="">
      <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900">${label}</label>
      <input type="text" id="base-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
    </div>
    `;
  }
}

class BaseRadio extends HTMLElement {
  static observedAttributes = ["label"];

  connectedCallback() {
    const label = this.getAttribute("label") || "Base input";

    this.innerHTML = `
    <div class="flex items-center mb-4">
      <input id="default-radio-1" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600">
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
  static observedAttributes = ["label"];

  connectedCallback() {
    const label = this.getAttribute("label") || "Base input";

    this.innerHTML = `
    <div class="max-w-sm mx-auto">
      <label for="countries" class="block mb-2 text-sm font-medium text-gray-900">${label}</label>
      <select id="countries" class="h-[42px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
        <option selected>Choose a country</option>
        <option value="US">United States</option>
        <option value="CA">Canada</option>
        <option value="FR">France</option>
        <option value="DE">Germany</option>
      </select>
    </div>
    `;
  }
}
class BaseCheckbox extends HTMLElement {
  static observedAttributes = ["label", "class"];

  connectedCallback() {
    const label = this.getAttribute("label") || "Base input";
    const contentClass = this.getAttribute("class") || "";

    this.innerHTML = `
    <div class="flex items-center mb-4 ${contentClass}">
        <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500">
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
  static observedAttributes = ["label", "type", "icon"];

  connectedCallback() {
    const label = this.getAttribute("label") || "Base input";
    const type = this.getAttribute("type") || "primary";
    const icon = this.getAttribute("icon");
    console.log("icon ", icon);

    // Các class chung
    const commonClasses =
      "focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5";

    // Các class riêng cho từng button
    const BtnClass = {
      primary:
        "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300",
      green:
        "text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300",
      red: "text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300",
      plain:
        "py-2.5 px-5 text-sm font-medium text-blue-900 focus:outline-none bg-blue-50 rounded-lg border border-blue-500 hover:bg-blue-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-blue-100",
    };

    const contentClass = BtnClass[type] || BtnClass.primary;

    this.innerHTML = `
      <button type="button" class="${commonClasses} ${contentClass}">
        ${icon ? `<i class='${icon} mr-1'></i>` : ""} ${label}
      </button>
    `;
  }
}

customElements.define("layout-header", CustomHeader);
customElements.define("layout-sidebar", CustomSidebar);
customElements.define("base-input", BaseInput);
customElements.define("base-datepicker", BaseDatePicker);
customElements.define("base-input-phone", BaseInputPhone);
customElements.define("base-radio", BaseRadio);
customElements.define("label-form-item", LabelFormItem);
customElements.define("base-input-number", BaseInputNumber);
customElements.define("base-select", BaseSelect);
customElements.define("base-checkbox", BaseCheckbox);
customElements.define("base-upload", BaseUpload);
customElements.define("base-button", BaseButton);
