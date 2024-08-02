class Item {
    #type
    #name
    #buyValue
    #sellValue
    #description

    constructor(data) {
        this.#type = data.type
        this.#name = data.name
        this.#description = data.description
        this.#buyValue = data.buyValue
        this.#sellValue = data.sellValue
    }

    get type() {
        return this.#type
    }

    get name() {
        return this.#name
    }

    get description() {
        return this.#description
    }

    get buyValue() {
        return this.#buyValue
    }

    get sellValue() {
        return this.#sellValue
    }

    buy() {
        if (player.goldCoins < this.buyValue) {
            return
        }

        player.goldCoins -= this.buyValue
        player.inventory.add(this)
    }

    sell() {

    }

}