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
  }

  draw() {
    // this.#context.fillStyle = "#ff0000";
  }

}

export default Character;