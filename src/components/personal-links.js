import { LitElement, html, css, customElement, property } from 'lit-element'
import localForage from 'localforage'
import { prop } from '../utils/prop'
import './pl-header'
import './pl-form'
import './pl-tag'
import './pl-link'

@customElement('personal-links')
class PersonalLinks extends LitElement {
  static get styles() {
    return css`
      :host {
        display: grid;
        grid-template:
          'header header'
          'left right' / var(--left-width, 2fr) var(--right-width, 3fr);
        grid-gap: 1rem;
        padding: 2rem;
      }

      pl-header,
      aside,
      main {
        background-color: #eeeeec;
      }

      aside,
      main {
        padding: 1rem;
      }

      pl-header {
        grid-area: header;
      }
      aside {
        grid-area: left;
      }
      main {
        grid-area: right;
      }

      pl-link {
        display: block;
      }
    `
  }

  @property()
  get tags() {
    return [...new Set(this.links.flatMap(prop('tags')))]
  }

  /**
   * @type {import('../models/link').Link[]} links
   */
  @property({ type: Array })
  links = []

  @property({ type: Boolean })
  formOpen = false

  @property()
  selectedTags = new Set()

  @property()
  get selectedLinks() {
    return this.selectedTags.size === 0
      ? this.links
      : this.links.filter(link =>
          link.tags.some(tag => this.selectedTags.has(tag))
        )
  }

  async firstUpdated() {
    this.links = (await localForage.getItem('links')) || []
  }

  /**
   * @param {CustomEvent} _e
   */
  handleToggleForm(_e) {
    this.formOpen = !this.formOpen
  }

  /**
   * @param {CustomEvent} event
   */
  handleNewLink({ detail: { link } }) {
    this.links = [...this.links, link]
    localForage.setItem('links', this.links)
    this.formOpen = false
  }

  /**
   * @param {MouseEvent & { target: { tag: string }}} e
   */
  handleToggleTag({ target: { tag } }) {
    if (this.selectedTags.has(tag)) {
      this.selectedTags.delete(tag)
    } else {
      this.selectedTags.add(tag)
    }

    this.requestUpdate('selectedTags')
  }

  render() {
    return html`
      <pl-header @toggle-form=${this.handleToggleForm}></pl-header>
      <aside>
        ${this.tags.map(
          tag =>
            html`
              <pl-tag
                .tag=${tag}
                .active=${this.selectedTags.has(tag)}
                @click=${this.handleToggleTag}
                >${tag}</pl-tag
              >
            `
        )}
      </aside>
      <main>
        ${this.formOpen
          ? html`
              <pl-form @new-link=${this.handleNewLink}></pl-form>
            `
          : ''}
        <div class="link-list">
          ${this.selectedLinks.map(
            link =>
              html`
                <pl-link .link=${link}></pl-link>
              `
          )}
        </div>
      </main>
    `
  }
}

export default PersonalLinks
