class InfernalSphere extends Spell {

    constructor(data) {
        super(data)
    }

    /**
     * Casts the spell Infernal Sphere 'Sphère Infernale'
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

        // Spell effect
        btn1.disabled = false // To be able to cancel out when casting the amp' version before rolling the die and cast the normal version instead.

        gameMessage(`${playerPreparationPhaseMessage}
            
            Vous lancez ${this.name} !
            - Lancez le D100 pour voir combien de dégâts vous allez infliger à votre adversaire.`)

        activateButton(
            btn2,
            "Lancer le D100",
            () => {
                hideButton(btn2)
                caster.actionPoints -= this.cost
                player.isAllowedToCastSpell = false
                btn1.disabled = false
                const roll = d100.roll()
                currentCombatContext.opponent.hitPoints -= roll
                let message = `${roll} !
                    La Sphère Infernale inflige ${roll} ${roll == 1 ? "dégât" : "dégâts"} ${currentCombatContext.opponent.type == "Boss" ? `à ${currentCombatContext.opponent.name}` : beingNameWithDeterminantDefiniContracte(currentCombatContext.opponent, "à")}.`

                // Check if opponent is KO
                if (isBeingDead(currentCombatContext.opponent)) {
                    message += `
                    ${currentCombatContext.opponent.type == "Boss" ? currentCombatContext.opponent.name : beingNameWithDeterminantDefini(currentCombatContext.opponent, false)} est ${currentCombatContext.opponent.gender == "F" ? "terassée" : "terrassé"} !`
                    activateButton(btn1, "Continuer", () => { currentCombatContext.rewardPhaseCallBack(currentCombatContext) })
                }

                gameMessage(message)
            }
        )
    }

    castAmplified(caster = player) {
        // Safeguards
        if (!caster) return
        if (!caster.isAllowedToCastSpell) {
            gameMessage(`${playerPreparationPhaseMessage}
            
                Votre ne pouvez lancer qu'un seul sort par phase de préparation.
                - Appuyer sur 'Continuer' pour passer à la phase suivante.`)

            return
        }
        if (caster == player && caster.magic < this.amplification.magicNeeded) {
            gameMessage(`${playerPreparationPhaseMessage}
                    
                    Votre n'avez pas la Magie (MA) nécessaire (${this.amplification.magicNeeded}) pour lancer ce sort de manière amplifiée.`)

            return
        }
        if (caster == player && caster.actionPoints < this.cost + this.amplification.cost) {
            gameMessage(`${playerPreparationPhaseMessage}
                        
                        Vous n'avez pas assez de points d'action pour lancer ce sort de manière amplifiée (${this.cost + this.amplification.cost}PA ${this.cost + this.amplification.cost > 1 ? "nécessaires" : "nécessaire"}).`)

            return
        }

        // Spell effect
        gameMessage(`${playerPreparationPhaseMessage}
                        
                        Vous lancez ${this.name} de manière amplifiée !
                        - Lancez le D100 pour votre premier jet.`)

        btn1.disabled = true
        let roll1 = 0
        let roll2 = 0

        activateButton(
            btn2,
            "Lancer le D100",
            () => {
                roll1 = d100.roll()

                gameMessage(`${playerPreparationPhaseMessage}
                    
                    ${roll1} !
                    - Maintenant, lancez le D100 à nouveau pour votre jet d'amplification.`)

                activateButton(
                    btn2,
                    "Lancer le D100",
                    () => {
                        player.isAllowedToCastSpell = false
                        btn1.disabled = false
                        hideButton(btn2)
                        roll2 = d100.roll()
                        caster.actionPoints -= this.cost + this.amplification.cost
                        currentCombatContext.opponent.hitPoints -= roll1 + roll2

                        let message = `${roll2} !
                        La Sphère Infernale inflige ${roll1 + roll2} dégâts ${currentCombatContext.opponent.type == "Boss" ? `à ${currentCombatContext.opponent.name}` : beingNameWithDeterminantDefiniContracte(currentCombatContext.opponent, "à")}.`

                        // Check if opponent is KO
                        if (isBeingDead(currentCombatContext.opponent)) {
                            message += `
                                ${currentCombatContext.opponent.type == "Boss" ? currentCombatContext.opponent.name : beingNameWithDeterminantDefini(currentCombatContext.opponent, false)} est ${currentCombatContext.opponent.gender == "F" ? "terassée" : "terrassé"} !`

                            activateButton(btn1, "Continuer", () => { currentCombatContext.rewardPhaseCallBack(currentCombatContext) })
                        }

                        gameMessage(message)
                    }
                )
            }
        )
    }
}