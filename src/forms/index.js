export function initForm(formData) {
  const form = {
    values: {}
  };

  formData.forEach(formField => {
    form.values[formField.name] = formField.value;
  });

  return form;
}

export { default as FormComponent } from './formComponent';
