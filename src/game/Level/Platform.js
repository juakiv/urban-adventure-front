class Platform {
    #height;
    #width;
    #xPosition; //left-most point
    #canvas;
    #context;

    constructor(height, width, xPosition, canvas) {
        this.#height = height;
        this.#width = width;
        this.#xPosition = xPosition;
        this.#canvas = canvas;
        this.#context = canvas.getContext("2d");

    }

    getY() {
        return this.#canvas.height - this.#height;
    }

    getWidth() {
        return this.#width;
    }

    getX() {
        return this.#xPosition;
    }

    getHeight() {
        return this.#height;
    }

    draw() {
        this.#context.rect(this.getX(), this.getY(), this.getWidth(), this.#height);
    }




}

export default Platform;