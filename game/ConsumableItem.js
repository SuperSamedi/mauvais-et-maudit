class ConsumableItem extends Item {
    constructor(data) {
        super(data)
        // Some consumables are not always usable. Some require to be in combat.
        this.isUsable = false
    }

    /**
     * Uses the item
     * @param {object} being  The being using the object.
     */
    use(being) {
        if (!being) return
        console.log("Trying to use " + this.name);
        console.log("Item not implemented.");
    }
}