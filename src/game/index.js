class Game {
  #canvas
  #context
  #laskuri
  constructor(canvas, context) {
    this.#canvas = canvas;
    this.#context = context;
    this.#laskuri = 0;

    this.render();
  }

  render() {
    requestAnimationFrame(() => this.render());
  }
}

export default Game;