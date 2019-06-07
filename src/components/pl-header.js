import { LitElement, customElement, html, css } from 'lit-element'

@customElement('pl-header')
class Header extends LitElement {
  static get styles() {
    return css`
      :host {
        display: flex;
        justify-content: space-between;
        padding: 0 1rem;
      }

      button {
        align-self: center;
        border: 1px solid #ccc;
      }
    `
  }

  /**
   * @param {MouseEvent} _e
   */
  handleShowForm(_e) {
    this.dispatchEvent(new CustomEvent('toggle-form'))
  }

  render() {
    return html`
      <h1>Personal Links</h1>
      <button @click=${this.handleShowForm}>New link</button>
    `
  }
}

export default Header
