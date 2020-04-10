import { LightningElement } from 'lwc';

export default class FormComponent extends LightningElement {
  constructor() {
    super();

    this._lwcForm_handleInput = event => {
      this.form.values[event.target.name] = event.target.value;
    };

    this._lwcForm_handleSubmit = event => {
      event.preventDefault();
      this.formElement.dispatchEvent(new CustomEvent('formsubmit', { detail: this.form.values }));
    };
  }

  initForm(formData) {
    this.form = {
      values: {}
    };

    formData.forEach(formField => {
      this.form.values[formField.name] = formField.value;
    });
  }

  renderedCallback() {
    if (!this.rendered) {
      this.formFields = {};

      Object.keys(this.form.values).forEach(formFieldName => {
        this.formFields[formFieldName] = this.template.querySelector(`[name=${formFieldName}]`);

        if (!this.formElement) {
          this.formElement = this.formFields[formFieldName].closest('form');
          this.formElement.addEventListener('submit', this._lwcForm_handleSubmit);
        }

        this.formFields[formFieldName].addEventListener('input', this._lwcForm_handleInput);
      });

      this.rendered = true;
    }
  }

  disconnectedCallback() {
    console.log('removing listeners from form:', this.formElement);
    this.formElement.removeEventListener('submit', this._lwcForm_handleSubmit);

    Object.values(this.formFields).forEach(formField => {
      console.log('removing listeners from:', formField);
      formField.removeEventListener('input', this._lwcForm_handleInput);
    });
  }
}
