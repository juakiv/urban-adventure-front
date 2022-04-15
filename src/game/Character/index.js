class Character {
  #canvas
  #context

  #characterWidth
  #characterHeight

  #isJumping
  #gravity

  #posY
  #deltaY
  #jumpSlow

  #howManyTimes

  #characterImage

  constructor(canvas, context) {
    this.#canvas = canvas;
    this.#context = context;

    this.#howManyTimes = 0;

    this.#characterWidth = 60;
    this.#characterHeight = 120;

    this.#isJumping = false;
    this.#gravity = 0.2;
    this.#jumpSlow = 11/42;

    this.#posY = 400 - this.#characterHeight;
    this.#deltaY = 0;

    let image = new Image();
    image.onload = () => {
      this.#characterImage = image;
    }
    image.src = "/tikkuukko.png";
  }

  update(shouldStopFalling, newPosY) {
    if(this.#isJumping) {
      //if(this.#deltaY >= 0) {
      //  this.#deltaY = -12;
      //}
      this.#deltaY -= 6;
      this.#posY += this.#deltaY;
      //this.#deltaY += this.#jumpSlow;
      this.#deltaY = 0;

    } else {
      //if(this.#deltaY < 0) {
      //  this.#deltaY = 0;
      //}

      if(!shouldStopFalling) {
        this.#deltaY += this.#gravity;
        this.#posY += this.#deltaY;
       } else if (this.#deltaY > 0) {
         this.#deltaY = 0;
         if(newPosY != null) {
          this.#posY = newPosY-120;
         }
       }
      
    }

    /*
    if(this.#posY + this.#characterHeight >= 500) {
      this.#isJumping = false;

      this.#posY = 500 - this.#characterHeight;
      this.#deltaY = 0;
    }  */
  }

  getPosY() {
    return this.#posY;
  }

  getIsJumping() {
    return this.#isJumping;
  }

  getCharacterImage() {
    return this.#characterImage;
  }

  setIsJumping(val) {
    this.#isJumping = val;
  } 
}

export default Character;