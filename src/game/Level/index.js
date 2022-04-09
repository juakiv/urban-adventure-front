import Platform from "./Platform";

class Level {
  #canvas;
  #context;
  #gravity;
  
  #platforms;

  #jumpHeight;
  #speed;

  constructor(canvas, context, jumpHeight, speed, gravity) {
      this.#canvas = canvas;
      this.#context = context; 
      this.#jumpHeight = jumpHeight;
      this.#speed = speed;
      this.#gravity = gravity;
      this.#platforms = [];

      // first platform shall be a constant in a constant height;
    const firstPlatform = new Platform(100, 160, 0, this.#canvas, this.#context);
    this.#platforms.push(firstPlatform);
      
  }

  getJumpHeight() {
      return this.#jumpHeight;
  }


  getG() {
    return this.#gravity;
  }

  getSpeed() {
    return this.#speed;
  }

  getNextPlatformHeight() {
    const isHigher = Math.random();
    if(isHigher > 0.5) {
      // JumpHeightille vakio, jotta helpompi yltää perille
      return this.#platforms[this.#platforms.length-1].getY() - Math.random()*(0.8*this.#jumpHeight);
    }
    // jaetaan 2.3, jottei alin palikka ole liian alhaalla
    return this.#platforms[this.#platforms.length-1].getY() + Math.random()*this.#canvas.height/2.3;
  }

  getJumpDistance() {
    return this.#speed * Math.sqrt(2 * this.#jumpHeight / this.#gravity);
  }

  getNextWidth() {
    return 60 + Math.random() * (this.#canvas.width/4 - 60);
  }

  
  #getNextXPosition() {
    const lastPlatform = this.#platforms[this.#platforms.length-1]
    const endOfLastPlatform = lastPlatform.getX()+this.getNextWidth();
    
    return endOfLastPlatform + Math.random() * this.getJumpDistance();
  }
  
  createPlatforms() {
    while(this.#platforms[this.#platforms.length-1].getX() < this.#canvas.width) {
      const nextPlatform = new Platform(this.getNextPlatformHeight(), this.getNextWidth(), this.#getNextXPosition(),
          this.#canvas);
      this.#platforms.push(nextPlatform);
    }
  }

  getPlatforms() {
    return this.#platforms;
  }


}

export default Level;