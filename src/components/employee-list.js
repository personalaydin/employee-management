import { LitElement, html, css } from 'lit';

class EmployeeList extends LitElement {
  static properties = {
    employees: { type: Array },
    newEmployee: { type: Object },
    isEditing: { type: Boolean },
    editingId: { type: Number },
  };

  constructor() {
    super();
    this.employees = [
      { id: 1, firstName: 'Ali', lastName: 'Yılmaz', position: 'Senior' },
      { id: 2, firstName: 'Oya', lastName: 'Demir', position: 'Junior' },
    ];
    this.newEmployee = { firstName: '', lastName: '', position: '' };
    this.isEditing = false;
    this.editingId = null;
  }

  render() {
    return html`
      <h2>Employee List</h2>
      ${this.renderForm()}
      <ul>
        ${this.employees.map(
          employee => html`
            <li>
              ${employee.firstName} ${employee.lastName} - ${employee.position}
              <button @click="${() => this._editEmployee(employee.id)}">Edit</button>
              <button @click="${() => this._deleteEmployee(employee.id)}">Delete</button>
            </li>
          `
        )}
      </ul>
    `;
  }

  renderForm() {
    return html`
      <div>
        <input
          type="text"
          placeholder="First Name"
          .value="${this.newEmployee.firstName}"
          @input="${e => this._updateNewEmployee('firstName', e.target.value)}"
        />
        <input
          type="text"
          placeholder="Last Name"
          .value="${this.newEmployee.lastName}"
          @input="${e => this._updateNewEmployee('lastName', e.target.value)}"
        />
        <select
          .value="${this.newEmployee.position}"
          @change="${e => this._updateNewEmployee('position', e.target.value)}"
        >
          <option value="">Select Position</option>
          <option value="Junior">Junior</option>
          <option value="Senior">Senior</option>
        </select>
        <button @click="${this._saveEmployee}">
          ${this.isEditing ? 'Update Employee' : 'Add Employee'}
        </button>
        ${this.isEditing
          ? html`<button @click="${this._cancelEdit}">Cancel Edit</button>`
          : ''}
      </div>
    `;
  }

  _updateNewEmployee(field, value) {
    this.newEmployee = { ...this.newEmployee, [field]: value };
  }

  _saveEmployee() {
    if (!this.newEmployee.firstName || !this.newEmployee.lastName || !this.newEmployee.position) {
      alert('Lütfen bütün alanları doldurunuz.');
      return;
    }

    if (this.isEditing) {
      this.employees = this.employees.map(emp =>
        emp.id === this.editingId ? { ...emp, ...this.newEmployee } : emp
      );
      this.isEditing = false;
      this.editingId = null;
    } else {
      const newId = this.employees.length > 0 ? this.employees[this.employees.length - 1].id + 1 : 1;
      this.employees = [...this.employees, { id: newId, ...this.newEmployee }];
    }

    this.newEmployee = { firstName: '', lastName: '', position: '' };
  }

  _editEmployee(id) {
    const employee = this.employees.find(emp => emp.id === id);
    this.newEmployee = { ...employee };
    this.isEditing = true;
    this.editingId = id;
  }

  _cancelEdit() {
    this.isEditing = false;
    this.newEmployee = { firstName: '', lastName: '', position: '' };
    this.editingId = null;
  }

  _deleteEmployee(id) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employees = this.employees.filter(employee => employee.id !== id);
    }
  }
}

customElements.define('employee-list', EmployeeList);
