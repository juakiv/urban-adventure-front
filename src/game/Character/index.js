class Character {
  #canvas
  #context

  #characterWidth
  #characterHeight

  #isJumping
  #gravity

  #posY
  #deltaY

  constructor() {
    this.#canvas = document.createElement("canvas");
    this.#context = this.#canvas.getContext("2d");

    this.#characterWidth = 60;
    this.#characterHeight = 120;

    this.#canvas.width = this.#characterWidth;
    this.#canvas.height = this.#characterHeight;

    this.#isJumping = false;
    this.#gravity = 0.2;

    this.#posY = 500 - this.#characterHeight;
    this.#deltaY = 0;

    this.draw();
  }

  draw() {
    let image = new Image();
    image.onload = () => {
      this.#context.drawImage(image, 0, 0);
    }
    image.src = "/tikkuukko.png";
    // this.#context.fillStyle = "#ff0000";
    // this.#context.fillRect(0, 0, this.#characterWidth, this.#characterHeight);

    return this.#canvas;
  }

  update() {
    this.#deltaY += this.#gravity;
    this.#posY += this.#deltaY;

    if(this.#posY + this.#characterHeight >= 500) {
      this.#isJumping = false;

      this.#posY = 500 - this.#characterHeight;
      this.#deltaY = 0;
    }
  }

  jump() {
    if(this.#isJumping) return; // ei kaksoishyppyjä ainakaan vielä
    this.#isJumping = true;
    this.#deltaY = -6;
  }

  getPosY() {
    return this.#posY;
  }

  getIsJumping() {
    return this.#isJumping;
  }

}

export default Character;