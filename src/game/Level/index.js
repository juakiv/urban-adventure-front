class Level {
  #canvas;
  #context;

  #jumpHeight;
  #startSpeed;

  constructor(canvas, context, jumpHeight, startSpeed) {
      this.#canvas = canvas;
      this.#context = context; 
      this.#jumpHeight = jumpHeight;
      this.#startSpeed = startSpeed;
      }

  getJumpHeight() {
      return this.#jumpHeight;
  }

  getStartSpeed() {
    return this.#startSpeed;
  }

  getNextPlatformHeight() {
    const isHigher = Math.random();
    if(isHigher > 0.5) {
      // JumpHeightille vakio, jotta helpompi yltää perille
      return this.#canvas.height/2 - Math.random()*(0.8*this.#jumpHeight);
    }
    // jaetaan 2.3, jottei alin palikka ole liian alhaalla
    return this.#canvas.height/2 + Math.random()*this.#canvas.height/2.3;
  }

  getNextWidth() {
    return 60 + Math.random() * (this.#canvas.width/4 - 60);
  }

}

export default Level;