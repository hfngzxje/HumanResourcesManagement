function clearFormValues(formId) {
    const form = document.getElementById(formId);
    if (!form) {
      console.error("Form not found");
      return;
    }
    const inputs = form.querySelectorAll('input, textarea, select');
    const errors = form.querySelectorAll('.error');
    inputs.forEach(input => {
      if (input.type === 'checkbox') {
        input.checked = false;
      }
      else {
        input.value = '';
        input.selectedIndex = 0;
      }
    });
    if (errors) {
      errors.forEach(error => error.remove());
    }
    const elements = form.querySelectorAll("input, select, textarea");
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      element.classList.remove(...inputErrClass)
    }
  }
  