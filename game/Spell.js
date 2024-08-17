class Spell extends Item {
    #cost
    #magicNeeded
    #amplification

    constructor(data) {
        super(data)
        this.#cost = data.cost
        this.#magicNeeded = data.magicNeeded
        this.#amplification = data.amplification
    }


    get cost() {
        return this.#cost
    }

    get magicNeeded() {
        return this.#magicNeeded
    }

    get amplification() {
        return this.#amplification
    }

}