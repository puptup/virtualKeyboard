import Elem from './scripts/Elem';
import Keyboard from './scripts/Keyboard';
import Textarea from './scripts/Texarea';
import Typer from './scripts/Typer';
import GradientAnimation from './scripts/gradient/GradientAnimation';
import './styles/reset.css';
import './styles/style.css';

class App {
  constructor(parent) {
    this.parent = parent;
  }

  render() {
    this.Gradient = new GradientAnimation(this.parent);
    this.Descriptipn = new Elem(this.parent, 'div', 'description');
    this.Descriptipn.element.innerHTML = `
    <p>Привет, друг! Надеюсь, тебе понравится моя работа;)</p>
    <p>Смена языка: left ctrl + left alt.</p>
    <p>Так же оцени свою скорость печати.</p>
    <p>Удачи и всего хорошего:) P.S. написана на Windows</p>`;

    this.Textarea = new Textarea(this.parent);
    this.Typer = new Typer(this.parent);
    this.Typer.element.style.display = 'none';

    this.swither = new Elem(this.Descriptipn.element, 'div', 'switcher');
    this.swither.element.textContent = 'Выбери:';
    this.buttonTextArea = new Elem(this.swither.element, 'button', 'button');
    this.buttonTextArea.element.textContent = 'Текстовая зона';
    this.buttonTextArea.element.onclick = () => {
      this.Textarea.element.style.display = 'block';
      this.Typer.element.style.display = 'none';
      this.Keyboard.setTextArea(this.Textarea);
    };

    this.buttonGameArea = new Elem(this.swither.element, 'button', 'button');
    this.buttonGameArea.element.textContent = 'Скорость печати';
    this.buttonGameArea.element.onclick = () => {
      this.Textarea.element.style.display = 'none';
      this.Typer.element.style.display = 'flex';
      this.Keyboard.setTextArea(this.Typer);
    };

    this.Keyboard = new Keyboard(this.parent, this.Gradient);
    this.Keyboard.setTextArea(this.Textarea);
  }
}

const app = new App(document.body);
app.render();
