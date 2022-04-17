/**
 * Esittää levelin yksittäistä platformia, joka piirretään canvasille
 */
class Platform {
    #height; //Korkeus alhaalta ylös
    #width;
    #xPosition; //vasemmanpuoleinen reuna
    #canvas;
    #context;

    /**
     * @pre height == [platformin korkeus alhaalta ylös] &&
     *      width > 0 && canvas != null & xPosition != null
     */
    constructor(height, width, xPosition, canvas) {
        this.#height = height;
        this.#width = width;
        this.#xPosition = xPosition;
        this.#canvas = canvas;
        this.#context = canvas.getContext("2d");

    }

    /**
     * @returns y-koordinaatti platformin yläosalle
     */
    getY() {
        return this.#canvas.height - this.#height;
    }

    /**
     * 
     * @returns platformin leveys
     */
    getWidth() {
        return this.#width;
    }

    /**
     * 
     * @returns platformin vasemmanpuoleisen reunan x-koordinaatti
     */
    getX() {
        return this.#xPosition;
    }

    /**
     * 
     * @returns platformin korkeus pohjalta huippukohtaan
     */
    getHeight() {
        return this.#height;
    }

    /**
     * Piirtää Platformia edustavan suorakulmion canvasille
     */
    draw() {
        this.#context.beginPath();
        this.#context.lineWidth = "4";
        this.#context.fillStyle = "purple";
        this.#context.fillRect(this.getX(), this.getY(), this.getWidth(), this.#height);
        this.#context.fillStyle = "#000000";
        //this.#context.stroke();
    }

    /**
     * Siirtää Platformin koordinaatteja x-akselilla
     * xToLeft > 0 siirtää platformia vasemmalle
     * xToLeft < 0 siirtää platformia oikealle
     * @pre xToLeft != null
     */
    moveInX(xToLeft) {
        this.#xPosition-=xToLeft;
    }




}

export default Platform;