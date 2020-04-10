import { LightningElement } from 'lwc';

const CLASS_DIRTY = 'lwc-dirty';
const CLASS_PRISTINE = 'lwc-pristine';
const CLASS_UNTOUCHED = 'lwc-untouched';
const CLASS_TOUCHED = 'lwc-touched';

export default class FormComponent extends LightningElement {
    constructor() {
        super();

        this._lwcForm_handleInput = (event) => {
            this.form.values[event.target.name] = event.target.value;
            event.target.classList.remove(CLASS_PRISTINE);
            event.target.classList.add(CLASS_DIRTY);
        };

        this._lwcForm_handleSubmit = (event) => {
            event.preventDefault();
            this.formElement.dispatchEvent(
                new CustomEvent('formsubmit', { detail: this.form.values })
            );
        };

        this._lwcForm_handleFocus = (event) => {
            if (event.target.classList.contains(CLASS_UNTOUCHED)) {
                event.target.classList.remove(CLASS_UNTOUCHED);
            }
        };

        this._lwcForm_handleBlur = (event) => {
            event.target.classList.remove(CLASS_UNTOUCHED);
            event.target.classList.add(CLASS_TOUCHED);
        };
    }

    initForm(formData) {
        this.form = {
            values: {}
        };

        formData.forEach((formField) => {
            this.form.values[formField.name] = formField.value;
        });
    }

    renderedCallback() {
        if (!this.rendered) {
            this.formFields = {};

            Object.keys(this.form.values).forEach((formFieldName) => {
                const formField = (this.formFields[
                    formFieldName
                ] = this.template.querySelector(`[name=${formFieldName}]`));

                if (!this.formElement) {
                    this.formElement = formField.closest('form');
                    this.formElement.addEventListener(
                        'submit',
                        this._lwcForm_handleSubmit
                    );
                }

                formField.addEventListener('input', this._lwcForm_handleInput);
                formField.addEventListener('focus', this._lwcForm_handleFocus);
                formField.addEventListener('blur', this._lwcForm_handleBlur);

                formField.classList.add(CLASS_UNTOUCHED);
                formField.classList.add(CLASS_PRISTINE);
            });

            this.rendered = true;
        }
    }

    disconnectedCallback() {
        this.formElement.removeEventListener(
            'submit',
            this._lwcForm_handleSubmit
        );

        Object.values(this.formFields).forEach((formField) => {
            formField.removeEventListener('input', this._lwcForm_handleInput);
            formField.removeEventListener('focus', this._lwcForm_handleFocus);
            formField.removeEventListener('blur', this._lwcForm_handleBlur);
        });
    }
}
