import { LitElement, html, css } from 'lit';

class NavigationMenu extends LitElement {
  static styles = css`
    nav {
      background-color: #333;
      color: white;
      padding: 1em;
    }
    nav a {
      color: white;
      margin-right: 15px;
      text-decoration: none;
    }
  `;

  render() {
    return html`
      <nav>
        <a href="#" @click="${() => this._navigate('list')}">Employee List</a>
        <a href="#" @click="${() => this._navigate('form')}">Add Employee</a>
      </nav>
    `;
  }

  _navigate(page) {
    this.dispatchEvent(new CustomEvent('navigate', { detail: { page } }));
  }
}

customElements.define('navigation-menu', NavigationMenu);
