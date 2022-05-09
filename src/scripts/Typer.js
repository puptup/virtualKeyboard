import Elem from './Elem';

const text = `JavaScript is a programming language that allows you to implement complex things
 on web pages. Every time a web page does more than just sit there and display static
 information for you to look at—displaying timely content updates, interactive maps, 
 animated 2D/3D graphics, scrolling video jukeboxes, or more—you can bet that 
 JavaScript is probably involved.`;

export default class Typer extends Elem {
  constructor(parent) {
    super(parent, 'div', 'game');
    this.menu = new Elem(this.element, 'div', 'game__menu');
    this.menuDescription = new Elem(this.menu.element, 'p', 'game__menu-description');
    this.menuDescription.element.innerHTML = 'На проверку скорости печати будет дано 30 секунд. <br>Нажми кнопку начать;)';
    this.startButton = new Elem(this.menu.element, 'button', 'game__start-btn');
    this.startButton.element.textContent = 'Начать';

    this.startButton.element.onclick = () => {
      this.menu.element.style.display = 'none';
      this.startGame();
    };
  }

  startGame() {
    this.line = new Elem(this.element, 'div', 'game__line');
    this.lineElements = [];
    text.split('\n').join('').split('').forEach((elem) => {
      const letter = new Elem(this.line.element, 'span', 'game__letter');
      if (elem === ' ') {
        letter.element.innerHTML = '&nbsp;';
      } else {
        letter.element.textContent = elem;
      }
      this.lineElements.push(letter.element);
    });
    this.currentActivePosition = 0;
    this.margin = 0;
    this.setActiveLetter(0);
    this.gameStatus = true;
    this.missings = 0;
    this.rights = 0;

    this.timer = new Elem(this.element, 'div', 'game__timer');
    this.timer.element.textContent = 30;
    const idInterval = setInterval(() => {
      this.timer.element.textContent = Number(this.timer.element.textContent) - 1;
    }, 1000);
    setTimeout(() => { this.stopGame(); clearInterval(idInterval); }, 30000);
  }

  stopGame() {
    this.line.element.parentElement.removeChild(this.line.element);
    this.timer.element.parentElement.removeChild(this.timer.element);
    this.showResults();
    this.margin = 0;
    this.missings = 0;
    this.rights = 0;
    this.gameStatus = false;
  }

  showResults() {
    this.menu.element.style.display = 'flex';
    this.menuDescription.element.textContent = `Ты набрал ${this.rights} символов за 30 секунд, поздравляю! Количество ошибок: ${this.missings}, скорость печати в секунду ${Math.ceil(((this.rights * 2) / 60) * 100) / 100}`;
  }

  add(char) {
    if (this.gameStatus) {
      if (char === this.currentActiveElement.innerHTML || (char === ' ' && this.currentActiveElement.innerHTML === '&nbsp;')) {
        this.rights += 1;
        this.disableActiveLetter(this.currentActivePosition);
        this.shiftLine(this.currentActiveElement.getBoundingClientRect().width);
        this.currentActivePosition += 1;
        this.setActiveLetter(this.currentActivePosition);
      } else {
        this.missings += 1;
      }
    }
  }

  shiftLine(size) {
    this.margin += size;
    this.line.element.style.marginLeft = `calc(50% - ${this.margin}px)`;
  }

  disableActiveLetter(n) {
    this.lineElements[n].classList.remove('game__letter-active');
    this.lineElements[n].classList.add('game__letter-passed');
  }

  setActiveLetter(n) {
    this.lineElements[n].classList.add('game__letter-active');
    this.currentActiveElement = this.lineElements[n];
  }
}
