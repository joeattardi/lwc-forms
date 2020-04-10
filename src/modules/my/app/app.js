import { LightningElement, track } from 'lwc';

export default class App extends LightningElement {
  @track showForm = true;

  handleSubmit() {
    this.showForm = false;
  }
}
