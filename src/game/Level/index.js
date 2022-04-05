class Level {
  #canvas;
  #context;

  #jumpHeight;

  constructor(canvas, context, jumpHeight) {
      this.#canvas;
      this.#context; 
      this.#jumpHeight = jumpHeight;
  }

  getJumpHeight() {
      return this.#jumpHeight;
  }
}

export default Level;