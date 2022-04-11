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
        this.#context.beginPath();
        this.#context.lineWidth = "4";
        this.#context.strokeStyle = "red";
        this.#context.rect(this.getX(), this.getY(), this.getWidth(), this.#height);
        this.#context.stroke();
    }

    moveInX(xToLeft) {
        this.#xPosition-=xToLeft;
    }




}

export default Platform;