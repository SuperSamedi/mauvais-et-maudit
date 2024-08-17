class Steal extends Spell {

    constructor(data) {
        super(data)
        this.hasAlreadyBeenCast = true
    }

    /**
     * Casts the spell Steal 'Vol'
     * @param {object} being The being casting the spell */
    cast(caster = player) {
        // Safeguards
        if (!caster) return
        if (!caster.isAllowedToCastSpell) {
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
        if (this.hasAlreadyBeenCast) {
            gameMessage(`${playerPreparationPhaseMessage}
            
                Vous avez déjà lancé ce sort pendant ce combat. Ce sort est limité à 1 lancé par combat maximum.`)
            return
        }

        // Spell effect
        player.isAllowedToCastSpell = false
        this.hasAlreadyBeenCast = true
        btn1.disabled = true
        caster.actionPoints -= this.cost
        allowedToDraw = true

        gameMessage(`${playerPreparationPhaseMessage}
            
            Vous lancez ${this.name} !
            Vous pouvez tirer une carte du deck, vous gagnerez immédiatement l'or ou l'objet correspondant à la carte.`)

        imgDeck.onclick = () => {
            clearCardsDisplayZone();
            drawReward(scopaDeck, false, false, true)
        }
    }
}