/**
 * Esittää levelin yksittäistä platformia, joka piirretään canvasille
 */
class Platform {
    #height; //Korkeus alhaalta ylös
    #width;
    #xPosition; //vasemmanpuoleinen reuna
    #canvas;
    #context;
    #hasCoin;
    #coinValue;

    /**
     * @pre height == [platformin korkeus alhaalta ylös] &&
     *      width > 0 && canvas != null & xPosition != null
     */
    constructor(height, width, xPosition, canvas, context, isInitial = false) {
        this.#height = height;
        this.#width = width;
        this.#xPosition = xPosition;
        this.#canvas = canvas;
        this.#context = context;
        this.#coinValue = Math.round(Math.random() * 10);
        this.#hasCoin = Math.random() >= 0.8 && (height <= canvas.height - 130 && width >= 70 && !isInitial && this.#coinValue > 0);
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
        this.#context.fillStyle = "purple";
        this.#context.fillRect(this.getX(), this.getY(), this.getWidth(), this.#height);

        if(this.#hasCoin) {
            this.#context.beginPath();
            this.#context.arc(this.getX() + Math.floor(this.getWidth() / 2), this.getY() - 40, 30, 0, 2*Math.PI, false);
            this.#context.fillStyle = this.#coinValue < 3 ? "#CD7F32" : this.#coinValue >= 3 && this.#coinValue < 7 ? "#C0C0C0" : "yellow";
            this.#context.fill();

            this.#context.beginPath();
            this.#context.font = "20px Arial";
            this.#context.fillStyle = "black";
            this.#context.fillText(this.#coinValue, this.#coinValue === 10 ? this.getX() - 10 + Math.floor(this.getWidth() / 2) : this.getX() - 5 + Math.floor(this.getWidth() / 2), this.getY() - 34);
            this.#context.fill();
        }
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

    hasCoin() {
        return this.#hasCoin;
    }

    setHasCoin(hasCoin) {
        this.#hasCoin = hasCoin;
    }

    getCoinValue() {
        return this.#coinValue;
    }
}

export default Platform;