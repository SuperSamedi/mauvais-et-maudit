class Healing extends Spell {
  constructor(data = structuredClone(clubsItemsTable[3])) {
    super(data);
    this.healingAmount = data.healingAmount;
  }

  /**
   * Casts the spell Healing 'Soin'
   * @param {object} being The being casting the spell */
  cast(caster = player) {
    // Safeguards
    if (!caster) return;
    if (caster.isAllowedToCastSpell === false) {
      gameMessage(`${playerPreparationPhaseMessage}
            
                Votre ne pouvez lancer qu'un seul sort par phase de préparation.
                - Appuyer sur 'Continuer' pour passer à la phase suivante.`);

      return;
    }
    if (caster == player && caster.magic < this.magicNeeded) {
      gameMessage(`${playerPreparationPhaseMessage}
            
                Votre n'avez pas la Magie (MA) nécessaire (${this.magicNeeded}) pour lancer ce sort.`);

      return;
    }
    if (caster == player && caster.actionPoints < this.cost) {
      gameMessage(`${playerPreparationPhaseMessage}
            
                Vous n'avez pas assez de points d'action pour lancer ce sort (${this.cost
        }PA ${this.cost > 1 ? "nécessaires" : "nécessaire"}).`);

      return;
    }

    // Spell effect
    player.isAllowedToCastSpell = false;
    btn1.isDisabled = false; // To be able to cancel out when casting the amp' version before rolling the die and cast the normal version instead.
    caster.actionPoints -= this.cost;
    caster.hitPoints += this.healingAmount;

    gameMessage(`Vous lancez ${this.name} !
            Vous régénérez ${this.healingAmount} points de vie.`);
  }

  castAmplified(caster = player) {
    // Safeguards
    if (!caster) return;
    if (!caster.spellEffects) return;
    if (caster.isAllowedToCastSpell === false) {
      gameMessage(`${playerPreparationPhaseMessage}
            
                Votre ne pouvez lancer qu'un seul sort par phase de préparation.
                - Appuyer sur 'Continuer' pour passer à la phase suivante.`);

      return;
    }
    if (caster == player && caster.magic < this.amplification.magicNeeded) {
      gameMessage(`${playerPreparationPhaseMessage}
                    
                    Votre n'avez pas la Magie (MA) nécessaire (${this.amplification.magicNeeded}) pour lancer ce sort de manière amplifiée.`);

      return;
    }
    if (
      caster == player &&
      caster.actionPoints < this.cost + this.amplification.cost
    ) {
      gameMessage(`${playerPreparationPhaseMessage}
                        
                        Vous n'avez pas assez de points d'action pour lancer ce sort de manière amplifiée (${this.cost + this.amplification.cost
        }PA ${this.cost + this.amplification.cost > 1 ? "nécessaires" : "nécessaire"
        }).`);

      return;
    }

    // Spell effect
    gameMessage(`${playerPreparationPhaseMessage}
                        
                        Vous lancez ${this.name} de manière amplifiée !
                        - Lancez le D100 pour augmenter l'effet de ${this.name}.`);

    btn1.isDisabled = true;
    btn2.activate("Lancer le D100", () => {
      saveCloverState();
      player.isAllowedToCastSpell = false;
      btn1.isDisabled = false;
      btn2.hide();
      const roll = d100.roll();
      caster.actionPoints -= this.cost + this.amplification.cost;
      caster.hitPoints += this.healingAmount + roll;

      gameMessage(`${roll} !
                    Vous régénérez ${this.healingAmount + roll
        } points de vie.`);

      player.isAllowedToUseLuckyClover = true;
    });
  }
}
