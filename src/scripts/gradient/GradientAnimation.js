import Elem from '../Elem';
import Circle from './Circle';

export default class GradientAnimation extends Elem {
  constructor(parent) {
    super(parent, 'canvas', 'gradient_bg');
    this.ctx = this.element.getContext('2d');

    this.circlesNum = 5;
    this.minRadius = 1000;
    this.maxRadius = 1000;
    this.speed = 0;

    (window.onresize = () => {
      this.w = window.innerWidth * devicePixelRatio;
      this.element.width = window.innerWidth * devicePixelRatio;
      this.h = window.innerHeight * devicePixelRatio;
      this.element.height = window.innerHeight * devicePixelRatio;
      this.ctx.scale(devicePixelRatio, devicePixelRatio);
      this.createCircles();
    })();

    this.drawAnimation();
  }

  createCircles() {
    this.circles = [];
    for (let i = 0; i < this.circlesNum; i += 1) {
      this.circles.push(new Circle(this.w, this.h, this.minRadius, this.maxRadius));
    }
  }

  drawCircles() {
    this.circles.forEach((circle) => circle.draw(this.ctx, this.speed));
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.w, this.h);
  }

  drawAnimation() {
    this.clearCanvas();
    this.drawCircles();
    window.requestAnimationFrame(() => this.drawAnimation());
  }

  pauseAnimation() {
    this.speed = 0;
  }

  resumeAnimation() {
    this.speed = 0.05;
  }
}
