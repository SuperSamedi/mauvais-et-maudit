class Ether extends ConsumableItem {
    constructor() {
        const data = structuredClone(cupsItemsTable[1])
        super(data)
        // Ether is always usable
        this.isUsable = true
    }

    /**
    * Uses the Ether
    * @param {object} being The being the Ether is used on.*/
    use(being) {
        if (!being) return
        if (being.actionPoints === undefined) {
            console.log(`Can't use Ether ! Being has no actionPoints`);
            return
        }
        being.actionPoints++
        being.inventory.remove(this)
        gameMessage(`${currentGameMessage()}
            ${being == player ? "Vous utilisez un éther et gagnez" : `${being.name} utilise un éther et gagne`} 1PA.`)
    }
}