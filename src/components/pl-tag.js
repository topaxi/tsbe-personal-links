import { LitElement, customElement, property, html, css } from 'lit-element'

@customElement('pl-tag')
class Tag extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        cursor: pointer;
      }

      :host(.active) {
        text-decoration: underline;
      }
    `
  }

  /**
   * @param {boolean} value
   */
  @property({ type: Boolean })
  set active(value) {
    this.classList.toggle('active', value)
  }

  /**
   * @type {string} tag
   */
  @property()
  tag = ''

  render() {
    return html`
      ${this.tag}
    `
  }
}

export default Tag
