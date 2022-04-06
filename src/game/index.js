import Character from './Character';

class Game {
  #canvas
  #context
  #character

  constructor(canvas, context) {
    this.#canvas = canvas;
    this.#context = context;
    this.#character = new Character();

    // this.#character.jump();
    window.addEventListener("keypress", e => {
      // näppäinkomennot? tää varmaa kannattaa miettiä uusiks myöhemmässä
      // mut nyt aluks ihan kelpo
      if(e.code === "Space") this.#character.jump();
    });

    this.render();
  }

  start() {
    //
  }

  render() {
    this.#context.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
    this.#context.fillStyle = '#000000';
    this.#context.fillRect(0,0, this.#canvas.width, this.#canvas.height);

    this.#character.update();
    
    this.#context.drawImage(this.#character.draw(), 20, this.#character.getPosY());
    requestAnimationFrame(() => this.render());
  }
}

export default Game;