class Character {
  #canvas
  #context

  #height

  #characterWidth
  #characterHeight

  constructor(height) {
    this.#canvas = document.createElement("canvas");
    this.#context = this.#canvas.getContext("2d");

    this.#height = height;
    this.#characterWidth = 60;
    this.#characterHeight = 120;

    this.#canvas.width = this.#characterWidth;
    this.#canvas.height = this.#characterHeight;

    this.draw();
  }

  draw() {
    this.#context.fillStyle = "#ff0000";
    this.#context.fillRect(0, 0, this.#characterWidth, this.#characterHeight);
  }

  getCharacter() {
    return this.#canvas;
  }

}

export default Character;