import Item from "./Item.js";

export default class ConsumableItem extends Item {
    constructor(data) {
        super(data)
        this.isUsable = false;
    }

    /**
     * Uses the item
     * @param {object} being  The being using the object.
     */
    use(being) {
        if (!being) return
        if (this.isUsable === false) return
        console.log("Trying to use " + this.name);
        console.log("Item not implemented.");
    }
}