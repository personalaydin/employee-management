import { LitElement, html, css } from 'lit';

class EmployeeForm extends LitElement {
  static properties = {
    firstName: { type: String },
    lastName: { type: String },
    position: { type: String }
  };

  constructor() {
    super();
    this.firstName = '';
    this.lastName = '';
    this.position = 'Junior';
  }

  render() {
    return html`
      <h2>Add New Employee</h2>
      <form @submit="${this._handleSubmit}">
        <label>First Name: <input type="text" .value="${this.firstName}" @input="${e => this.firstName = e.target.value}"></label>
        <label>Last Name: <input type="text" .value="${this.lastName}" @input="${e => this.lastName = e.target.value}"></label>
        <label>Position: 
          <select .value="${this.position}" @change="${e => this.position = e.target.value}">
            <option value="Junior">Junior</option>
            <option value="Medior">Medior</option>
            <option value="Senior">Senior</option>
          </select>
        </label>
        <button type="submit">Save</button>
      </form>
    `;
  }

  _handleSubmit(event) {
    event.preventDefault();
    const employee = {
      firstName: this.firstName,
      lastName: this.lastName,
      position: this.position
    };
    this.dispatchEvent(new CustomEvent('employee-added', { detail: { employee } }));
    this.firstName = '';
    this.lastName = '';
    this.position = 'Junior';
  }
}

customElements.define('employee-form', EmployeeForm);
