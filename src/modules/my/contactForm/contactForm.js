import { FormComponent } from '../../../forms';

export default class ContactForm extends FormComponent {
  connectedCallback() {
    this.initForm([
      { name: 'firstName', value: '' },
      { name: 'lastName', value: '' }
    ]);
  }

  handleSubmit(event) {
    console.log(event.detail);
    this.dispatchEvent(new CustomEvent('submit'));
  }
}
