class Enfeeble extends Spell {

    constructor(data) {
        super(data)
        this.debuffAmount = -25
    }

    /**
     * Casts the spell Enfeeble 'Affaiblissement'
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
        btn1.disabled = true // To be able to cancel out when casting the amp' version before rolling the die and cast the normal version instead.

        gameMessage(`${playerPreparationPhaseMessage}
            
            Vous lancez ${this.name} sur ${currentCombatContext.opponent.type == "Boss" ? currentCombatContext.opponent.name : beingNameWithDeterminantDefini(currentCombatContext.opponent, true)} !
            - Choisissez la caractéristique que vous voulez baisser de ${this.debuffAmount * -1}.`)

        activateButton(
            btn2,
            "Baisser la Force",
            () => {
                caster.actionPoints -= this.cost
                player.isAllowedToCastSpell = false
                btn1.disabled = false
                hideButton(btn2)
                hideButton(btn3)
                hideButton(btn4)
                hideButton(btn5)
                currentCombatContext.opponent.spellEffects.strength += this.debuffAmount


                gameMessage(`${currentCombatContext.opponent.type == "Boss" ? currentCombatContext.opponent.name : beingNameWithDeterminantDefini(currentCombatContext.opponent, false)} perd ${this.debuffAmount * -1} FO.`)
            }
        )
        activateButton(
            btn3,
            "Baisser la Vitesse",
            () => {
                caster.actionPoints -= this.cost
                player.isAllowedToCastSpell = false
                btn1.disabled = false
                hideButton(btn2)
                hideButton(btn3)
                hideButton(btn4)
                hideButton(btn5)
                currentCombatContext.opponent.spellEffects.speed += this.debuffAmount


                gameMessage(`${currentCombatContext.opponent.type == "Boss" ? currentCombatContext.opponent.name : beingNameWithDeterminantDefini(currentCombatContext.opponent, false)} perd ${this.debuffAmount * -1} VI.`)
            }
        )
        activateButton(
            btn4,
            "Baisser la Magie",
            () => {
                caster.actionPoints -= this.cost
                player.isAllowedToCastSpell = false
                btn1.disabled = false
                hideButton(btn2)
                hideButton(btn3)
                hideButton(btn4)
                hideButton(btn5)
                currentCombatContext.opponent.spellEffects.magic += this.debuffAmount


                gameMessage(`${currentCombatContext.opponent.type == "Boss" ? currentCombatContext.opponent.name : beingNameWithDeterminantDefini(currentCombatContext.opponent, false)} perd ${this.debuffAmount * -1} MA.`)
            }
        )

        activateButton(
            btn5,
            "Annuler",
            () => {
                btn1.disabled = false
                hideButton(btn2)
                hideButton(btn3)
                hideButton(btn4)
                hideButton(btn5)

                gameMessage(playerPreparationPhaseMessage)
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
                        - Choisissez la caractéristique que vous voulez baisser de (${this.debuffAmount * -1} + 1D100).`)

        btn1.disabled = true

        activateButton(btn2, "Baisser la Force", () => { this.chooseStat(caster, "Force") })
        activateButton(btn3, "Baisser la Vitesse", () => { this.chooseStat(caster, "Vitesse") })
        activateButton(btn4, "Baisser la Magie", () => { this.chooseStat(caster, "Magie") })


        activateButton(
            btn5,
            "Annuler",
            () => {
                btn1.disabled = false
                hideButton(btn2)
                hideButton(btn3)
                hideButton(btn4)
                hideButton(btn5)

                gameMessage(playerPreparationPhaseMessage)
            }
        )


    }

    chooseStat(caster = player, debuffedStat) {
        hideButton(btn3)
        hideButton(btn4)

        gameMessage(`-Lancez le D100 pour amplifier l'effet d'affaiblissement de la ${debuffedStat} de votre adversaire.`)

        activateButton(btn2, "Lancer le D100", () => { this.rollAmplified(caster, debuffedStat) })
    }

    rollAmplified(caster = player, debuffedStat) {
        player.isAllowedToCastSpell = false
        btn1.disabled = false
        hideButton(btn2)
        hideButton(btn5) // cancel button
        const roll = d100.roll()
        caster.actionPoints -= this.cost + this.amplification.cost

        switch (debuffedStat) {
            case "Force":
                currentCombatContext.opponent.spellEffects.strength += this.debuffAmount - roll
                break;
            case "Vitesse":
                currentCombatContext.opponent.spellEffects.speed += this.debuffAmount - roll
                break;
            case "Magie":
                currentCombatContext.opponent.spellEffects.magic += this.debuffAmount - roll
                break;

            default:
                break;
        }

        gameMessage(`${roll} !
            Vous affaiblissez la ${debuffedStat} de votre adversaire de ${this.debuffAmount - roll}.`)
    }
}