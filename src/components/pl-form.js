import { LitElement, html, css, customElement } from 'lit-element'
import { identity } from '../utils/identity'

@customElement('pl-form')
class Form extends LitElement {
  static get styles() {
    return css`
      label {
        display: block;
      }
    `
  }

  /**
   * @param {Event & { target: HTMLFormElement }} e
   */
  handleSubmit(e) {
    e.preventDefault()

    let event = new CustomEvent('new-link', {
      detail: {
        link: this.convertFormValuesToLink(e.target)
      }
    })

    this.dispatchEvent(event)
  }

  /**
   * @param {HTMLFormElement} form
   * @return {import('../models/link').Link}
   */
  convertFormValuesToLink(form) {
    return {
      url: form.url.value,
      description: form.description.value,
      tags: form.tags.value.split(/\s+/g).filter(identity),
      createdAt: new Date()
    }
  }

  render() {
    return html`
      <form @submit=${this.handleSubmit}>
        <p>
          <label for="url">URL</label>
          <input id="url" type="url" name="url" />
        </p>
        <p>
          <label for="description">Description</label>
          <textarea
            id="description"
            name="description"
            cols="42"
            rows="4"
          ></textarea>
        </p>
        <p>
          <label for="tags">Tags</label>
          <input id="tags" type="text" name="tags" />
        </p>
        <p>
          <button>Create</button>
        </p>
      </form>
    `
  }
}

export default Form
