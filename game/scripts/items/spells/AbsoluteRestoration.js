import Spell from "../Spell.js";

export default class AbsoluteRestoration extends Spell {

    constructor(data = structuredClone(clubsItemsTable[9])) {
        super(data)
    }

    /**
     * Casts the spell Absolute Restoration 'Guérison Absolue'
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

        // Spell effect
        player.isAllowedToCastSpell = false
        btn1.isDisabled = false
        caster.actionPoints -= this.cost
        const healedAmount = caster.maxHitPoints - caster.hitPoints
        caster.hitPoints += healedAmount

        gameMessage(`Vous lancez ${this.name} !
            Vous régénérez ${healedAmount} ${healedAmount > 1 ? "points" : "point"} de vie.`)
    }
}