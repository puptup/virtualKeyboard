import Elem from './Elem';

export default class Button extends Elem {
  constructor(parent, { key }) {
    super(parent, 'div', 'keyboard__key');
    this.key = key;
    if (this.key.isTranslatable) {
      this.element.textContent = this.key[localStorage.getItem('lang') || 'en'];
    } else {
      if (this.key.icon) {
        this.element.innerHTML = this.key.icon;
      } else {
        this.element.textContent = this.key.name;
      }
      this.element.style.width = this.key.width;
      this.element.classList.add('keyboard__special-key');
    }
  }

  change({ lang, shift, caps }) {
    if (this.key.isTranslatable) {
      const newKey = this.key[lang + shift];
      if (caps) {
        if (shift) {
          this.element.textContent = newKey.toLowerCase();
        } else {
          this.element.textContent = newKey.toUpperCase();
        }
      } else {
        this.element.textContent = newKey;
      }
    }
  }
}
