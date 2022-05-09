import Button from './Button';
import Elem from './Elem';
import getKeyboard from './props/keyboardData';

export default class Keyboard extends Elem {
  constructor(parent, gradient) {
    super(parent, 'div', 'keyboard');
    this.layout = getKeyboard();
    const language = localStorage.getItem('lang') || 'en';
    this.options = {
      lang: language,
      caps: false,
      shift: '',
    };
    this.KeyboardRows = [];
    this.layout.forEach((keyboardRow) => {
      const Row = new Elem(this.element, 'div', 'keyboard__row').element;
      const keys = [];
      keyboardRow.forEach((keyData) => {
        const button = new Button(Row, keyData);
        keys.push(button);
        const keyCode = keyData.key.code;
        if (keyCode === 'ShiftRight' || keyCode === 'ShiftLeft') {
          button.element.onmousedown = () => {
            this.options.shift = 'Shift';
            this.KeyboardRows.forEach((row) => row.forEach((btn) => btn.change(this.options)));
          };

          button.element.onmouseup = () => {
            this.options.shift = '';
            this.KeyboardRows.forEach((row) => row.forEach((btn) => btn.change(this.options)));
          };
        }
        button.element.addEventListener('mousedown', () => {
          gradient.resumeAnimation();
        });

        button.element.addEventListener('mouseup', () => {
          gradient.pauseAnimation();
        });

        button.element.addEventListener('click', () => {
          if (keyCode === 'CapsLock') {
            button.element.classList.toggle('keyboard__key-active');
            this.options.caps = !(this.options.caps);
            this.KeyboardRows.forEach((row) => row.forEach((btn) => btn.change(this.options)));
          } else if (keyCode === 'Delete' || keyCode === 'Backspace') {
            if (!this.textArea.deleteChar()) {
              if (keyCode === 'Delete') {
                this.textArea.deleteCharAfter();
              } else {
                this.textArea.deleteCharBefore();
              }
            }
          } else if (keyData.key.isTranslatable) {
            this.textArea.add(button.element.textContent);
          } else if (keyData.key.value) {
            this.textArea.add(keyData.key.value);
          }
        });
      });
      this.KeyboardRows.push(keys);
    });

    document.addEventListener('keydown', (event) => {
      this.textArea.element.focus();
      gradient.resumeAnimation();
      this.KeyboardRows.forEach((Row) => Row.forEach((button) => {
        if (event.code === button.key.code) {
          if ((event.code === 'KeyC' || event.code === 'KeyV' || event.code === 'KeyA') && event.ctrlKey) {
            button.element.classList.add('keyboard__key-active');
            return;
          }

          if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
            this.options.shift = 'Shift';
            button.element.classList.add('keyboard__key-active');
            this.KeyboardRows.forEach((row) => row.forEach((btn) => btn.change(this.options)));
          }

          if (event.code === 'CapsLock' && !event.repeat) {
            this.options.caps = !(this.options.caps);
            if (this.options.caps) {
              button.element.classList.add('keyboard__key-active');
            } else {
              button.element.classList.remove('keyboard__key-active');
            }
            this.KeyboardRows.forEach((row) => row.forEach((btn) => btn.change(this.options)));
          }

          if (button.key.isTranslatable || button.key.value) {
            event.preventDefault();
            if (button.key.isTranslatable) {
              this.textArea.add(button.element.textContent);
            } else if (button.key.value) {
              this.textArea.add(button.key.value);
            }
            button.element.classList.add('keyboard__key-active');
          }
          if (button.key.action) {
            button.element.classList.add('keyboard__key-active');
          }
        }
      }));
    });

    document.addEventListener('keyup', (event) => {
      gradient.pauseAnimation();
      this.KeyboardRows.forEach((Row) => Row.forEach((button) => {
        if (event.code === button.key.code) {
          if (event.code === 'CapsLock') return;
          if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
            this.options.shift = '';
            this.KeyboardRows.forEach((row) => row.forEach((btn) => btn.change(this.options)));
          }
          button.element.classList.remove('keyboard__key-active');
        }
      }));
    });

    this.setSwitchLanguage('ControlLeft', 'AltLeft');
  }

  setTextArea(obj) {
    this.textArea = obj;
  }

  setSwitchLanguage(...keys) {
    const pressed = new Set();
    document.addEventListener('keydown', (e) => {
      pressed.add(e.code);
      for (let i = 0; i < keys.length; i += 1) {
        if (!pressed.has(keys[i])) {
          return;
        }
      }
      pressed.clear();
      this.options.lang = (this.options.lang === 'en')
        ? 'ru'
        : 'en';
      localStorage.setItem('lang', this.options.lang);
      this.KeyboardRows.forEach((row) => row.forEach((btn) => btn.change(this.options)));
    });

    document.addEventListener('keyup', (e) => {
      pressed.delete(e.code);
    });
  }
}
