function getFormValues(formId) {
  // Lấy thẻ form theo ID
  var form = document.getElementById(formId);
  if (!form) {
    console.error("Form not found");
    return null;
  }

  // Tạo một object để lưu các giá trị
  var formData = {};

  // Lấy tất cả các thẻ input, select và textarea trong form
  var elements = form.querySelectorAll("input, select, textarea");

  elements.forEach(function (element) {
    const name = element.name;
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