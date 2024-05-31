function getElValue (element) {
  let value = "";

  // Xử lý các loại thẻ input khác nhau
  if (element.tagName === "INPUT") {
    if (element.type === "radio") {
      if (element.checked) {
        value = element.value;
      }
    }
    else if (element.type === "checkbox") {
      value = element.checked
    }
    else {
      value = element.value;
    }
  } else if (element.tagName === "SELECT") {
    // Xử lý thẻ select
    if (element.multiple) {
      value = [];
      element.querySelectorAll("option:checked").forEach(function (option) {
        value.push(option.value);
      });
    } else {
      value = element.value;
    }
  } else if (element.tagName === "TEXTAREA") {
    // Xử lý thẻ textarea
    value = element.value;
  }

  return value
}

function getFormValues(formId) {
  // Lấy thẻ form theo ID
  var form = document.getElementById(formId);
  if (!form) {
    console.error("Form not found");
    return null;
  }

  // Tạo một object để lưu các giá trị
  const formData = {};

  // Lấy tất cả các thẻ input, select và textarea trong form
  const elements = form.querySelectorAll("input, select, textarea");

  elements.forEach(function (element) {
    const name = element.name;
    const value = getElValue(element)
    // Thêm vào object formData
    if (name) {
      formData[name] = value;
    }
  });

  return formData;
}

function setFormValue(formId, formValue) {
  var form = document.getElementById(formId);

  if (!form) {
    console.error("Form not found");
    return null;
  }

  var elements = form.querySelectorAll("input, select, textarea");

  elements.forEach(element => {
    const name = element.name

    if (!(name in formValue)) return

    const defaultValue = formValue[name]

    if (element.tagName === 'INPUT') {
      if (element.type === "radio") {
        element.checked = element.value === (+defaultValue).toString()
      } else if (element.type === "checkbox") {
        element.checked = defaultValue
      } else {
        element.value = defaultValue
      }
      return
    }

    element.value = defaultValue

  })
}

const inputErrClass = ['bg-red-50', 'border-red-500', 'text-red-900', 'placeholder-red-700', 'focus:ring-red-500', '!focus:border-red-500']

function validateForm(formId) {
  const form = document.getElementById(formId);
  if (!form) {
    console.error("Form not found");
    return false;
  }

  const elements = form.querySelectorAll("input, select, textarea");
  let valid = true

  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];

    const name = element.name;
    const isRequired = element.getAttribute('required') === 'true';

    if(!isRequired) continue

    const value = getElValue(element)
    if (name === 'didong') {
      if (isNaN(value) || value.length < 10 || value.length > 10) {
        valid = false;
        element.value = '';
        element.classList.add(...inputErrClass);
        element.placeholder = "Vui lòng nhập số điện thoại hợp lệ";
      }
      else {
        element.classList.remove(...inputErrClass);
      }
    }
    else if(!value) {
      valid = false
      element.classList.add(...inputErrClass)
      element.placeholder = "Vui lòng nhập thông tin"
    } else {
      element.classList.remove(...inputErrClass)
    }
  }

  return valid
}