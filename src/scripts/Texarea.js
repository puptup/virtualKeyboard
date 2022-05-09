import Elem from './Elem';

export default class Texarea extends Elem {
  constructor(parent) {
    super(parent, 'textarea', 'text-area');
    this.element.placeholder = 'Text me here...';
    this.textArea = this.element;
  }

  add(char) {
    let startPos = this.textArea.selectionStart;
    const endPos = this.textArea.selectionEnd;
    const { value } = this.textArea;
    this.textArea.value = value.slice(0, startPos) + char + value.slice(endPos);
    this.textArea.focus();
    startPos += 1;
    this.textArea.setSelectionRange(startPos, startPos);
  }

  deleteChar() {
    const startPos = this.textArea.selectionStart;
    const endPos = this.textArea.selectionEnd;
    const { value } = this.textArea;
    if (endPos - startPos > 0) {
      this.textArea.value = value.slice(0, startPos) + value.slice(endPos);
      this.textArea.focus();
      this.textArea.setSelectionRange(startPos, startPos);
      return true;
    }
    return false;
  }

  deleteCharAfter() {
    const startPos = this.textArea.selectionStart;
    const endPos = this.textArea.selectionEnd;
    const { value } = this.textArea;
    this.textArea.value = value.slice(0, startPos) + value.slice(endPos + 1);
    this.textArea.focus();
    this.textArea.setSelectionRange(startPos, startPos);
  }

  deleteCharBefore() {
    let startPos = this.textArea.selectionStart;
    const endPos = this.textArea.selectionEnd;
    const { value } = this.textArea;
    if (startPos - 1 >= 0) {
      this.textArea.value = value.slice(0, startPos - 1) + value.slice(endPos);
      this.textArea.focus();
      startPos -= 1;
      this.textArea.setSelectionRange(startPos, startPos);
    }
  }
}
