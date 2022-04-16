import Character from './Character';
import Level from './Level';

class Game {
  #canvas;
  #context;
  #character;
  #hasEnded;

  #startTime;
  #lastTime;
  #functionToSetScore;

  #lvl;
  #score;

  #characterJumpPress;
  #characterJumpTimeout;
  
  #hasBeenOnTheGround;
  #lastTimeWasAboveAPlatform;

  constructor(canvas, context) {
    this.#canvas = canvas;
    this.#context = context;
    this.#hasEnded = true;

    this.#hasBeenOnTheGround = true;
    this.#lastTimeWasAboveAPlatform = true;

    this.#startTime = new Date().getTime();
    this.#lastTime = this.#startTime;

    this.#character = new Character(this.#canvas, this.#context);

    window.addEventListener("keypress", e => {
      //if(this.#characterJumpPress) return false;
      
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

    this.#lvl = new Level(this.#canvas, this.#context, 100, 2, 120);
    this.#score = 0;

    this.render();
  }

  setScoreFunction(setScore) {
    this.#functionToSetScore = setScore;
    this.#functionToSetScore(0);
  }

  start() {
    this.#hasEnded = false;
    this.#startTime = new Date().getTime();
    this.#lastTime = this.#startTime;

    this.#character = new Character(this.#canvas, this.#context);
    this.#lvl = new Level(this.#canvas, this.#context, 100, 2, 120);
    this.#hasBeenOnTheGround = true;

    this.render();
  }

  pause() {
    this.#hasEnded = true;
  }

  resume() {
    this.#hasEnded = false;
    this.render();
  }

  /**
   * piirrä peli.
   */
  render() {
    if(this.#hasEnded) {
      return false;
    }

    this.#context.clearRect(0,0, this.#canvas.width, this.#canvas.height);

    this.#lvl.createPlatforms();
    this.#lvl.draw();
    this.#lvl.removeOldPlatforms();
    this.#lvl.movePlatformsInX();

    const newTime = new Date().getTime();
    if((newTime - this.#lastTime) > 1000) {
      this.#lastTime = newTime;
      this.#functionToSetScore(this.#score++);
      this.#lvl.setSpeed(this.#lvl.getSpeed() + 0.01);
    } 

    
    if(!this.#lvl.shouldStopFalling(10, this.#character.getPosY() + 120)) {
      this.#hasBeenOnTheGround = false;
    }
    
    let charYPos = null;

    if(this.#lastTimeWasAboveAPlatform && (!this.#hasBeenOnTheGround)) {
      this.#hasBeenOnTheGround = (this.#lvl.isAboveAPlatform(10, this.#character.getPosY() + 120)) === 0;
      charYPos = this.#lvl.getCurrentPlatformsY(10);
    }
    this.#lastTimeWasAboveAPlatform = (this.#lvl.isAboveAPlatform(10 , this.#character.getPosY() + 120)) === 1;

    this.#character.update(this.#hasBeenOnTheGround, charYPos);    

    //tänne pelin pysäytys, tämä testaamista varten
    if(((this.#character.getPosY()) > this.#canvas.height) || (this.#lvl.ranToAWall(10 + 15, this.#character.getPosY() + 120 ))) {
      this.#hasEnded = true;
      this.#score = 0;
      window.dispatchEvent(new Event("death-event"));
    }

    if(this.#lvl.isInPlatformsRange(10) !== null && this.#lvl.getPlatforms()[this.#lvl.isInPlatformsRange(10)].hasCoin() && this.#hasBeenOnTheGround) {
      let currentPlatformStanding = this.#lvl.getPlatforms()[this.#lvl.isInPlatformsRange(10)];
      currentPlatformStanding.setHasCoin(false);
      this.#score = this.#score + currentPlatformStanding.getCoinValue();
      this.#functionToSetScore(this.#score);
    }

    if(this.#character.getCharacterImage()) {
      this.#context.drawImage(this.#character.getCharacterImage(), 10, this.#character.getPosY());
    }

    requestAnimationFrame(() => this.render());
  }
}

export default Game;