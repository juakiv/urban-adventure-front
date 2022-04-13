import Character from './Character';
import Level from './Level';

class Game {
  #canvas
  #context
  #character

  #lvl;

  #characterJumpPress;
  #characterJumpTimeout;
  
  #hasBeenOnTheGround;
  #lastTimeWasAboveAPlatform;

  constructor(canvas, context) {
    this.#canvas = canvas;
    this.#context = context;

    this.#hasBeenOnTheGround = true;
    this.#lastTimeWasAboveAPlatform = true;

    this.#character = new Character(this.#canvas, this.#context);

    window.addEventListener("keypress", e => {
      if(this.#characterJumpPress) return false;
      
      if(e.code === "Space" && this.#hasBeenOnTheGround) {
        this.#character.setIsJumping(true);
        this.#hasBeenOnTheGround = false;
        this.#characterJumpPress = true;
        this.#characterJumpTimeout = setTimeout(() => {
          this.#character.setIsJumping(false);
        }, 700); // kauanko pidetään pohjassa max
      }

    });

    window.addEventListener("keyup", e => {
      if(e.code === "Space") {
        this.#character.setIsJumping(false);
        clearTimeout(this.#characterJumpTimeout);
        this.#characterJumpTimeout = null;
        this.#characterJumpPress = false;
      }
    });

    this.#lvl = new Level(this.#canvas, this.#context, 100, 2, 30);

    this.render();
  }

  start() {
    // new Date();
  }

  /**
   * piirrä peli.
   */
  render() {
    this.#context.clearRect(0,0, this.#canvas.width, this.#canvas.height);
    this.#context.fillStyle = "#0000000";
    this.#context.fillRect(0,0, this.#context.canvas.width, this.#context.canvas.height);
    this.#lvl.createPlatforms();
    this.#lvl.draw();
    this.#lvl.removeOldPlatforms();
    this.#lvl.movePlatformsInX();

    
    if(this.#lvl.isInPlatformsRange(10) == null) {
      this.#hasBeenOnTheGround = false;
    }
    
    let charYPos = null;
    console.log(this.#character.getPosY())
    if(this.#lastTimeWasAboveAPlatform && (!this.#hasBeenOnTheGround)) {
      this.#hasBeenOnTheGround = !this.#lvl.isAboveAPlatform(10, this.#character.getPosY() + 120);
      console.log("on the ground: " + this.#hasBeenOnTheGround);
      charYPos = this.#lvl.getCurrentPlatformsY(10);
    }
    this.#lastTimeWasAboveAPlatform = this.#lvl.isAboveAPlatform(10, this.#character.getPosY() + 120);

    this.#character.update(this.#hasBeenOnTheGround, charYPos)//this.#hasBeenOnTheGround, charYPos);
    if(this.#character.getCharacterImage()) this.#context.drawImage(this.#character.getCharacterImage(), 10, this.#character.getPosY());

    requestAnimationFrame(() => this.render());
  }
}

export default Game;