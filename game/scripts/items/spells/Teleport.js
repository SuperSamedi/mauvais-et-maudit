import Spell from "../Spell.js";

export default class Teleport extends Spell {

    constructor(data = structuredClone(clubsItemsTable[5])) {
        super(data)
    }

    get isAllowedToBeCast() {
        if (player.isAllowedToCastSpell === false) return false
        if (currentCombatContext.opponent.type == "Boss") return false

        return true
    }

    /**
     * Casts the spell Teleport 'Téléportation'
     * @param {object} being The being casting the spell */
    cast(caster = player) {
        // Safeguards
        if (!caster) return
        if (caster.isAllowedToCastSpell === false) {
            gameMessage(`${playerPreparationPhaseMessage}
            
                Votre ne pouvez lancer qu'un seul sort par phase de préparation.
                - Appuyer sur 'Continuer' pour passer à la phase suivante.`)

            return
        }
        if (caster == player && caster.magic < this.magicNeeded) {
            gameMessage(`${playerPreparationPhaseMessage}
            
                Votre n'avez pas la Magie (MA) nécessaire (${this.magicNeeded}) pour lancer ce sort.`)
            return
        }
        if (caster == player && caster.actionPoints < this.cost) {
            gameMessage(`${playerPreparationPhaseMessage}
            
                Vous n'avez pas assez de points d'action pour lancer ce sort (${this.cost}PA ${this.cost > 1 ? "nécessaires" : "nécessaire"}).`)
            return
        }
        if (!this.isAllowedToBeCast) {
            gameMessage(`${playerPreparationPhaseMessage}
            
                Le boss a tissé un enchantement qui vous empêche d'utiliser ce sort.`)
            return
        }

        // Spell effect
        player.isAllowedToCastSpell = false
        caster.actionPoints -= this.cost
        player.resetSpellEffects()

        let message = `Vous lancez ${this.name} !
        Vous disparaissez dans un tourbillon d'énergie invisible et réapparaissez à plusieurs kilomètres ${beingNameWithDeterminantDefiniContracte(currentCombatContext.opponent, "de")}, totalement en sécurité.
        Vous reprenez rapidement vos esprits${player.hitPoints < player.maxHitPoints ? ", vous vous soignez" : ""} et continuez votre route.`

        player.restoreHitPoints()
        stepCompleted()
        isInCombat = false

        nextAdventure(message)
    }
}