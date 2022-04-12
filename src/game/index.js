import Character from './Character';
import Level from './Level';

class Game {
  #canvas
  #context
  #character

  #lvl;

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

    this.#lvl = new Level(this.#canvas, this.#context, 100, 2, 30);

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