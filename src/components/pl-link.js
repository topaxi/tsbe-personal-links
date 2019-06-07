import { LitElement, customElement, property, html, css } from 'lit-element'

/**
 * @param {string} tag
 */
const tagTemplate = tag =>
  html`
    <li>${tag}</li>
  `

/**
 * @param {any} v
 */
const pad = v => String(v).padStart(2, '0')

@customElement('pl-link')
class Link extends LitElement {
  static get styles() {
    return css`
      ul {
        display: flex;
        padding: 0;
        list-style: none;
      }

      li:not(:last-child)::after {
        content: ',';
        margin-right: 1ch;
      }
    `
  }

  /**
   * @type {import('../models/link').Link} link
   */
  @property({ type: Object }) link

  /**
   * @param {Date} date
   * @return {string}
   */
  formatDate(date) {
    return `${pad(date.getMonth() + 1)}.${pad(
      date.getDate()
    )}.${date.getFullYear()}`
  }

  render() {
    return html`
      <header>
        <strong><a href=${this.link.url}>${this.link.url}</a></strong>
        <time datetime=${this.link.createdAt.toJSON()}
          >${this.formatDate(this.link.createdAt)}</time
        >
      </header>
      <p>${this.link.description}</p>
      <ul>
        ${this.link.tags.map(tagTemplate)}
      </ul>
    `
  }
}

export default Link
