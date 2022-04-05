import Character from './Character';

class Game {
  #canvas
  #context

  constructor(canvas, context) {
    this.#canvas = canvas;
    this.#context = context;

    this.render();
  }

  start() {
    //
  }

  render() {
    let character = new Character();
    requestAnimationFrame(() => this.render());
  }
}

export default Game;