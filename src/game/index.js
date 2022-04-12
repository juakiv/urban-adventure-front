import Character from './Character';
import Level from './Level';

class Game {
  #canvas
  #context

  #lvl;

  constructor(canvas, context) {
    this.#canvas = canvas;
    this.#context = context;

    this.#lvl = new Level(this.#canvas, this.#context, 100, 2, 30);

    this.render();
  }

  start() {
    //
  }

  render() {
    this.#context.clearRect(0,0, this.#canvas.width, this.#canvas.height);
    this.#context.fillStyle = "#0000000";
    this.#context.fillRect(0,0, this.#context.canvas.width,
      this.#context.canvas.height);
    //let character = new Character();
    this.#lvl.createPlatforms();
    this.#lvl.draw();
    this.#lvl.removeOldPlatforms();
    this.#lvl.movePlatformsInX();
    
    requestAnimationFrame(() => this.render());
  }
}

export default Game;