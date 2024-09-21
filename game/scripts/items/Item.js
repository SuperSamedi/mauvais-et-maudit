export default class Item {
    #type
    #name
    #isLegendary
    #description
    #effects
    #buyValue
    #sellValue
    #gender

    constructor(data) {
        this.#type = data.type
        this.#name = data.name
        this.#isLegendary = data.isLegendary
        this.#description = data.description
        this.#effects = data.effects
        this.#buyValue = data.buyValue
        this.#sellValue = data.sellValue
        this.#gender = data.gender
        if (data.isTestItem) this.isTestItem = data.isTestItem
    }

    get type() {
        return this.#type
    }

    get name() {
        return this.#name
    }

    get isLegendary() {
        return this.#isLegendary
    }

    get description() {
        return this.#description
    }

    get effects() {
        return this.#effects
    }

    get buyValue() {
        return this.#buyValue
    }

    get sellValue() {
        return this.#sellValue
    }

    get gender() {
        return this.#gender
    }
}