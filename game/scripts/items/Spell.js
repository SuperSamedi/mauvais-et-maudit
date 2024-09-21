import Item from "./Item.js";

export default class Spell extends Item {
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

    isAllowedToBeCastBy(caster) {
        if (!Object.hasOwn(caster, "isAllowedToCastSpell")) return false;
        if (caster.isAllowedToCastSpell === false) return false;

        return true;
    }

}