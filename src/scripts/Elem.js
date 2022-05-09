export default class Elem {
  constructor(parent, tag, classList) {
    this.element = document.createElement(tag);
    if (Array.isArray(classList)) {
      classList.forEach((elem) => {
        this.element.classList.add(elem);
      });
    } else {
      this.element.classList.add(classList);
    }
    parent.append(this.element);
  }
}
