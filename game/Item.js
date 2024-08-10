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
        this.gender = data.gender
        this.isLegendary = data.isLegendary
        this.effects = data.effects
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
        if (player.goldCoins < this.buyValue) return
        if (player.inventory.isFull() === true) return

        player.goldCoins -= this.buyValue
        shop.remove(this)
        player.inventory.add(this)
        shop.updateDisplay()
    }

    sell() {
        if (!allowedToSellItems) return

        // if we manage to remove the item from the inventory
        if (player.inventory.remove(this)) {
            player.updateStatsVisuals()
            player.goldCoins += this.sellValue
            shop.add(this)
            shop.updateDisplay()
        }
    }

    drop() {
        if (player.inventory.remove(this)) {
            player.updateStatsVisuals()
            return true
        }
        return false
    }

}