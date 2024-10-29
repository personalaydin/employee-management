
import { LitElement, html, css } from 'lit';
import './src/components/employee-list.js';
import './src/components/employee-form.js';
import './src/components/navigation-menu.js';


class AppComponent extends LitElement {
  static styles = css`
    #content {
      margin-top: 20px;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
  `;

  constructor() {
    super();
    this.currentPage = 'list';
  }

  render() {
    return html`
      <navigation-menu @navigate="${this._handleNavigation}"></navigation-menu>
      <div id="content">
        ${this.currentPage === 'form'
          ? html`<employee-form @employee-added="${this._addEmployee}"></employee-form>`
          : html`<employee-list></employee-list>`}
      </div>
    `;
  }

  _handleNavigation(event) {
    this.currentPage = event.detail.page;
  }

  _addEmployee(event) {
    
  }
}

customElements.define('app-component', AppComponent);
