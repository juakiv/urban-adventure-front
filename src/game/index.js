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
    this.#context.drawImage(character.getCharacter(), 10, 10);
    requestAnimationFrame(() => this.render());
  }
}

export default Game;