import Platform from "./Platform";

/**
 * Hoitaa tason luonnin ja siihen kohdistuvan vuorovaikutuksen käsittelyn
 */
class Level {
  #canvas;
  #context;
  #gravity; // nykyisessä toteutuksessa tasapainotettava arvo, jotta luotavat platformit halutulla välillä
  
  #platforms; // lista kunkin hetken käytössä olevista platformeista

  #jumpHeight; // nykyisessä toteutuksessa tasapainotettava arvo, jotta luotavat platformit halutulla välillä
  #speed; // nykyisessä toteutuksessa tasapainotettava arvo, jotta luotavat platformit halutulla välillä

  #lastX; // edellinen testattu x-koordinaatti, seuraa hahmon liikettä, jotta osaa arvioida pelin päättymistä
  #lastY; // edellinen testattu y-koordinaatti, seuraa hahmon liikettä, jotta osaa arvioida pelin päättymistä

  /**
   * 
   * @pre canvas != null && context != null && jumpHeight > 0 && speed > 0 && gravity > 0
   */

  constructor(canvas, context, jumpHeight, speed, gravity) {
    this.#canvas = canvas;
    this.#context = context; 
    this.#jumpHeight = jumpHeight;
    this.#speed = speed;
    this.#gravity = gravity;
    this.#platforms = [];
    this.#lastX = null;
    this.#lastY = null;

      // Ensimmäinen Platformi on aina vakiopaikalla
    const firstPlatform = new Platform(100, 160, 0, this.#canvas, this.#context, true);
    this.#platforms.push(firstPlatform);
      
  }

  // tavallisia gettereitä

  getJumpHeight() {
      return this.#jumpHeight;
  }


  getG() {
    return this.#gravity;
  }

  getSpeed() {
    return this.#speed;
  }

  /**
   * Asettaa nopeuden. Nopeutta muuttamalla myös platformien etäisyydet toisistaan kasvavat
   */
  setSpeed(newSpeed) {
    this.#speed = newSpeed;
  }

  /**
   * Tuottaa vaihtelevia korkeuksia canvasilla, joita käytetään Platformien luontiin.
   * Pyrkii huomioimaan edellisen platformin korkeuden tehdäkseen saavutettavia sijainteja
   * @returns seuraavan luotavan platformin korkeus
   */
  getNextPlatformHeight() {
    const isHigher = Math.random();
    // alla suhteellinen poikkeama puolivälistä, jolla tasataan arvoja
    const addedRelativePositionValue = (this.#platforms[this.#platforms.length-1].getY()/this.#canvas.height)-0.5;
    
    if(isHigher + addedRelativePositionValue > 0.5) {
      // JumpHeightille vakiokerroin, jotta helpompi yltää perille
      return this.#platforms[this.#platforms.length-1].getHeight() + Math.random()*(0.8*this.#jumpHeight);
    }
     
    const rndPart = Math.random()*this.#canvas.height;
    const controlledHeight = (rndPart < (this.#platforms[this.#platforms.length-1].getHeight())) ? (rndPart) : ((this.#platforms[this.#platforms.length-1].getHeight())/1.1);
    // lisätään 20 korkeuteen, jotta matalinkin näkyisi ainakin vähän
    return this.#platforms[this.#platforms.length-1].getHeight() - controlledHeight + 20;
  }

  /**
   * Arvio siitä kuinka pitkälle hyppy voi yltää
   * @parameters lastHeight kertoo lähtökorkeuden pudotukselle && nextHeight kertoo päätöskorkeuden pudotukselle
   * @returns etäisyys, jolle hypyllä voisi enintään päästä
   */
  getJumpDistance(lastHeight, nextHeight) {
    // t jonka suhteen etäisyys pitää laskea määrittyy uuden palikan korkeudesta suhteessa vanhaan palikkaan
    const tToTop = Math.sqrt(2 * (this.#jumpHeight + lastHeight) / this.#gravity);
    const tFromTopToNext =  Math.sqrt(2 * Math.abs((this.#jumpHeight + lastHeight) - (nextHeight)) / this.#gravity);
    return this.#speed * 24 * (tToTop + tFromTopToNext); // nopeudelle vain päätetty käypä kerroin
  }

  /**
   * Seuraavan Platformin leveys
   * @pre canvas oltava ainakin 240px leveä...
   * @post RESULT >= 60;
   * @returns antaa satunnaisen leveyden seuraavalle Platformille
   */
  getNextWidth() {
    return 60 + Math.random() * (this.#canvas.width/4 - 60);
  }

  /**
   * Määrittää seuraavan Platformin vasemman reunan x-koordinaatin
   * edellisen oikeanpuoleisen reunan ja hyppypituuden perusteella
   * @parameters lastHeight kertoo lähtökorkeuden pudotukselle && nextHeight kertoo päätöskorkeuden pudotukselle
   * @returns jonkin verran x-koordinaatti (seuraavalle Platformille)
   */
  getNextXPosition(lastHeight, nextHeight) {
    const lastPlatform = this.#platforms[this.#platforms.length-1]
    const endOfLastPlatform = lastPlatform.getX()+lastPlatform.getWidth();
    
    const jd = this.getJumpDistance(lastHeight, nextHeight)
    
    return endOfLastPlatform + Math.random() * jd;
  }
  
  /**
   * Luo Platformeja kunnes viimeisimmän Platformin aloituskoordinaatti ei enää mahdu canvasille
   * Luotujen Platformien määrä riippuu saavutetusta vauhdista (kuinka monta platformia mahtuu canvasille) ja sattumasta
   * @post (RESULT.#platforms.length >= BEFORE.#platforms.length)
   */
  createPlatforms() {
    while(this.#platforms[this.#platforms.length-1].getX() < this.#canvas.width) {
      const nextHeight = this.getNextPlatformHeight();
      
      let xPos = this.getNextXPosition(this.#platforms[this.#platforms.length-1].getHeight(), nextHeight);
      const nextPlatform = new Platform(nextHeight, this.getNextWidth(), xPos, this.#canvas, this.#context, false);
      this.#platforms.push(nextPlatform);
    }
    
    
  }

  getPlatforms() {
    return this.#platforms;
  }

  /**
   * Kutsuu jokaiselle Platformille niiden omaa draw()-funktio toteutusta
   */
  draw() {
    this.#platforms.forEach(p => {
      p.draw();
    });
  }

  /**
   * Kutsuu jokaiselle Platformille niiden moveInX() toteutusta ja liikuttaa Platformeja kentän nopeuden mukaisesti
   */
  movePlatformsInX() {
    this.#platforms.forEach(p => {
      p.moveInX(this.#speed);
    });
  }

  /**
   * Poistaa ne platformit, jotka ovat jotka ovat kokonaan poistuneet canvasilta
   */
  removeOldPlatforms() {
    for(const element of this.#platforms) {
      const p = element;
      if((p.getX()+p.getWidth()) < 0) {
        this.#platforms.shift(); // first index is always the left-most
      } else {
        break;
      }
    }
  }

  /**
   * 
   * Tarkistaa onko hahmo platformin sisältävällä x-alueella, lisätään vasemmalle pieni
   * lisäalue + 30 (puolet hahmon leveydestä), jotta myös reunalle hyppääminen onnistuu järkevämmin
   * 
   * @returns (null, jos x-koordinaatissa ei Platformia) && (platformin indeksin this.#platforms:ssa jos ollaan Platformin kohdalla)
   */
  
  isInPlatformsRange(x) {
    for(let i = 0; i < this.#platforms.length; i++) {
      if((x + 30 > this.#platforms[i].getX()) && (x < (this.#platforms[i].getX()+this.#platforms[i].getWidth()))) {
        return i;
      }
    }
    return null;
  }

  /**
   * 
   * Palauttaa nykyisen platformin y-koordinaatin x-koordinaatin perusteella
   * @returns (null, jos ei platformia x:n kohdassa) && (platformin y muulloin)
   */
  getCurrentPlatformsY(x) {
    const idx = this.isInPlatformsRange(x);
    if(idx != null) {
      return this.#platforms[idx].getY();
    }
    return null;
  }
    
  /**
   * Kertoo ollaanko juuri platformin päällä
   */
  isOnAPlatform(y, i) {
    return (y >= this.#platforms[i].getY()) && (y <= this.#platforms[i].getY()+5);
  }

  /**
   * Palauttaa onko juuri näissä koordinaateissa platformin yläosaa
   */
  shouldStopFalling(x, y) {
    const idx = this.isInPlatformsRange(x);
    if(idx != null) {
      return this.isOnAPlatform(y, idx);
    }
    return false;
  }

  /**
   * 
   * Kertoo ollaanko pudottu Platformin läpi
   * @returns (1 jos platformin yllä) && (0 jos platformin alla) && (-1 jos ei platformia yllä tai alla)
   */
  isAboveAPlatform(x, y) {
    const idx = this.isInPlatformsRange(x);
    if((idx != null)) {
      if((y <= this.#platforms[idx].getY())) {
        return 1;
      } else {
        return 0;
      }
      
    }
    return -1;
  }

  /**
   * Kertoo törmättiinkö seinään
   * Käyttää edellisiä x- ja y-koordinaatteja ja vertaa niitä uusiin ja platformien sijainteihin
   * @returns (true, jos edellinen ja nykyinen y-koordinaatti on x:n kohdalla olevan platformin alla) &&
   *      (false, jos x:n kohdalla ei ole platformia tai ei oltu platformin alla)
   */
  ranToAWall(x, y) {
    // onko vielä olemassa edellistä
    if(this.#lastX === null) {
      this.#lastX = x;
      this.#lastY = y;
      return false;
    }
    // onko x:n suunnassa Platformin kohdalla
    const pIdx = this.isInPlatformsRange(x)
    if(pIdx !== null) {
      // onko platformin alapuolella
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