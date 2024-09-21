import ConsumableItem from "../ConsumableItem.js"

export default class Potion extends ConsumableItem {
    constructor(data = structuredClone(cupsItemsTable[0]), healingAmount = 20) {
        super(data)
        // Potion is always usable
        this.isUsable = true
        this.healingAmount = healingAmount
    }

    /**
    * Uses the Potion
    * @param {object} being The being the potion is used on.*/
    use(being) {
        if (!being) return
        if (being.hitPoints === undefined) {
            console.log(`Can't use Potion ! Being has no hitPoints`);
            return
        }
        // If we heal more than the standard amount, and more than the life missing, we calculate the amount needed so we can display it
        if (this.healingAmount > 20 && this.healingAmount > (being.maxHitPoints - being.hitPoints)) this.healingAmount = being.maxHitPoints - being.hitPoints
        being.hitPoints += this.healingAmount
        being.inventory.remove(this)

        gameMessage(`${currentGameMessage()}
            ${being == player ? `Vous utilisez ${this.isLegendary ? beingNameWithDeterminantDefini(this, true) : `une ${this.name}`} et régénérez` : `${being.name} utilise ${this.isLegendary ? beingNameWithDeterminantDefini(this, true) : `une ${this.name}`} et régénère`} ${this.healingAmount}PV.`)
    }
}