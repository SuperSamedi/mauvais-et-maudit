class Dice {
    #faces

    constructor(faces) {
        this.#faces = faces;
    }

    get faces() {
        return this.#faces;
    }

    roll() {
        return getRandomInt(this.faces) + 1;
    }
    
}