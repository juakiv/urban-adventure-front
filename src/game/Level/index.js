import Platform from "./Platform";

class Level {
  #canvas;
  #context;
  #gravity;
  
  #platforms;

  #jumpHeight;
  #speed;

  #lastX;
  #lastY;

  constructor(canvas, context, jumpHeight, speed, gravity) {
      this.#canvas = canvas;
      this.#context = context; 
      this.#jumpHeight = jumpHeight;
      this.#speed = speed;
      this.#gravity = gravity;
      this.#platforms = [];
      this.#lastX = null;
      this.#lastY = null;

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

  setSpeed(newSpeed) {
    this.#speed = newSpeed;
  }

  getNextPlatformHeight() {
    const isHigher = Math.random();
    // alla suhteellinen poikkeama puolivälistä, jolla tasataan arvoja
    const addedRelativePositionValue = (this.#platforms[this.#platforms.length-1].getY()/this.#canvas.height)-0.5;
    
    if(isHigher + addedRelativePositionValue > 0.5) {
      // JumpHeightille vakiokerroin, jotta helpompi yltää perille
      return this.#platforms[this.#platforms.length-1].getHeight() + Math.random()*(0.8*this.#jumpHeight);
    }
     
    const rndPart = Math.random()*this.#canvas.height
    const controlledHeight = (rndPart < (this.#platforms[this.#platforms.length-1].getHeight())) ? (rndPart) : ((this.#platforms[this.#platforms.length-1].getHeight())/1.1);
    return this.#platforms[this.#platforms.length-1].getHeight() - controlledHeight;
  }

  getJumpDistance(lastHeight, nextHeight) {
    // t jonka suhteen etäisyys pitää laskea määrittyy uuden palikan korkeudesta suhteessa vanhaan palikkaan
    const tToTop = Math.sqrt(2 * (this.#jumpHeight + lastHeight) / this.#gravity);
    const tFromTopToNext =  Math.sqrt(2 * ((this.#jumpHeight + lastHeight) - (nextHeight)) / this.#gravity);
    return this.#speed * 24 * (tToTop + tFromTopToNext); // must be times fps
  }

  getNextWidth() {
    return 60 + Math.random() * (this.#canvas.width/4 - 60);
  }

  
  getNextXPosition(lastHeight, nextHeight) {
    const lastPlatform = this.#platforms[this.#platforms.length-1]
    const endOfLastPlatform = lastPlatform.getX()+lastPlatform.getWidth();
    
    return endOfLastPlatform + Math.random() * this.getJumpDistance(lastHeight, nextHeight);
  }
  
  createPlatforms() {
    while(this.#platforms[this.#platforms.length-1].getX() < this.#canvas.width) {
      const nextHeight = this.getNextPlatformHeight();
      
      let xPos = this.getNextXPosition(this.#platforms[this.#platforms.length-1].getHeight(), nextHeight);
      
      const nextPlatform = new Platform( nextHeight, this.getNextWidth(), xPos,
          this.#canvas);
      this.#platforms.push(nextPlatform);
    }
    
    
  }

  getPlatforms() {
    return this.#platforms;
  }

  draw() {
    this.#platforms.forEach(p => {
      p.draw();
    });
  }

  movePlatformsInX() {
    this.#platforms.forEach(p => {
      p.moveInX(this.#speed);
    });
  }

  removeOldPlatforms() {
    for(let i = 0; i < this.#platforms.length; i++) {
      const p = this.#platforms[i];
      if((p.getX()+p.getWidth()) < 0) {
        this.#platforms.shift(); // first index is always the left-most
      } else {
        break;
      }
    }
  }

  // tarkistaa onko hahmo platformin sisältävällä x-alueella, lisätään vasemmalle pieni
  // lisäalue + 30 (puolet hahmon leveydestä), jotta myös reunalle hyppääminen onnistuu järkevästi
  isInPlatformsRange(x) {
    for(let i = 0; i < this.#platforms.length; i++) {
      if((x + 30 > this.#platforms[i].getX()) && (x < (this.#platforms[i].getX()+this.#platforms[i].getWidth()))) {
        return i;
      }
    }
    return null;
  }

  getCurrentPlatformsY(x) {
    const idx = this.isInPlatformsRange(x);
    if(idx != null) {
      return this.#platforms[idx].getY();
    }
    return null;
  }
    

  isOnAPlatform(y, i) {
    if((y >= this.#platforms[i].getY()) && (y <= this.#platforms[i].getY()+5)) {
      return true;
    }

    return false;
  }

  shouldStopFalling(x, y) {
    const idx = this.isInPlatformsRange(x);
    if(idx != null) {
      return this.isOnAPlatform(y, idx);
    }
    return false;
  }

  //1 jos platformin yllä, 0 jos platformin alla ja -1 jos ei platformia yllä tai alla
  isAboveAPlatform(x, y) {
    const idx = this.isInPlatformsRange(x);
    if((idx != null)) {
      if((y < this.#platforms[idx].getY())) {
        return 1;
      } else {
        return 0;
      }
      
    }
    return -1;
  }

  ranToAWall(x, y) {
    if(this.#lastX === null) {
      this.#lastX = x;
      this.#lastY = y;
      return false;
    }

    const pIdx = this.isInPlatformsRange(x)
    if(pIdx !== null) {
      if((this.#platforms[pIdx].getY() < y) && (this.#platforms[pIdx].getY() < this.#lastY)) {
        return true;
      }
    }

    this.#lastX = x;
    this.#lastY = y;
    return false;
  }


}

export default Level;