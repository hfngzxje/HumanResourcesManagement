function formatDate(isoDate) {
  if (!isoDate) {
    return null;
  }
  // Create a new Date object from the ISO 8601 date string
  const date = new Date(isoDate);

  // Get the month, day, and year from the Date object
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so add 1
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear();

  // Format the date as MM/DD/YYYY
  return `${month}/${day}/${year}`;
}

function convertToISODate(dateString) {
  try {
      // Tách chuỗi theo dấu "/"
      const [day, month, year] = dateString.split('/');

      // Kiểm tra nếu các giá trị không hợp lệ
      if (!day || !month || !year) {
          throw new Error("Invalid date format");
      }

      // Tạo chuỗi theo định dạng ISO
      const isoDateString = `${year}-${day.padStart(2, '0')}-${month.padStart(2, '0')}T00:00:00`;

      return isoDateString;
  } catch (error) {
      return null;
  }

}

function getElValue (element) {
  let value = "";

  // Xử lý các loại thẻ input khác nhau
  if (element.tagName === "INPUT") {

    if(element.getAttribute('datepicker') !== null) {
      value = convertToISODate(element.value)
    } else if (element.type === "radio") {
      if (element.checked) {
        value = element.value == "1" ? true : false;
      } else {
        value = undefined;
      }
    }
    else if (element.type === "checkbox") {
      value = element.checked
    }
    else if (element.type === "file") {
      value = element.files[0]
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
    console.log('name ', name , value);
    // Thêm vào object formData
    if (!name || value === undefined ) return
    
    formData[name] = value;
  });

  return formData;
}

function setFormValue(formId, formValue,mode = 'create') {
  var form = document.getElementById(formId);

  if (!form) {
    console.error("Form not found");
    return null;
  }

  var elements = form.querySelectorAll("input, select, textarea");

  elements.forEach(element => {
    try {
      const name = element.name

      if (!(name in formValue)) return

      const defaultValue = formValue[name]

      if (element.tagName === 'INPUT') {
        if(element.getAttribute('datepicker') !== null) {
          element.value = formatDate(defaultValue)
        } else if (element.type === "radio") {
          element.checked = element.value === (+defaultValue).toString()
        } else if (element.type === "checkbox") {
          element.checked = defaultValue
        } else {
          if (mode === 'fetch' && element.name === 'ma' || mode === 'fetch' && element.name === 'mahopdong') {
            element.readOnly = true;
        } else {
            element.value = defaultValue;
        }
        }
        return
      }

      element.value = defaultValue
    } catch (e) {
      console.log('name ', element.name);
      console.log('e ', e);
    }
  })
}

const inputErrClass = ['bg-red-50', 'border-red-500', 'text-red-900', 'placeholder-red-700', 'focus:ring-red-500', '!focus:border-red-500']

function isValidVietnamPhoneNumber(phoneNumber) {
  // Remove all non-digit characters
  const cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');

  // Regular expression to validate Vietnamese phone numbers
  const phoneRegex = /^(03|05|07|08|09)\d{8}$/;

  // Test the cleaned phone number against the regex
  return phoneRegex.test(cleanedPhoneNumber);
}


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
    if (element.type === 'tel') {
      if (!isValidVietnamPhoneNumber(value)) {
        valid = false;
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