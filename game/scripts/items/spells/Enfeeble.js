import Spell from "../Spell.js";

export default class Enfeeble extends Spell {
  constructor(data = structuredClone(clubsItemsTable[6])) {
    super(data);
    this.debuffAmount = -25;
  }

  /**
   * Casts the spell Enfeeble 'Affaiblissement'
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
    btn1.isDisabled = true; // To be able to cancel out when casting the amp' version before rolling the die and cast the normal version instead.

    gameMessage(`${playerPreparationPhaseMessage}
            
            Vous lancez ${this.name} sur ${currentCombatContext.opponent.type == "Boss"
        ? currentCombatContext.opponent.name
        : beingNameWithDeterminantDefini(currentCombatContext.opponent, true)
      } !
            - Choisissez la caractéristique que vous voulez baisser de ${this.debuffAmount * -1
      }.`);

    btn2.activate("Baisser la Force", () => {
      caster.actionPoints -= this.cost;
      player.isAllowedToCastSpell = false;
      btn1.isDisabled = false;
      btn2.hide();
      btn3.hide();
      btn4.hide();
      btn5.hide();
      currentCombatContext.opponent.spellEffects.strength += this.debuffAmount;

      gameMessage(
        `${currentCombatContext.opponent.type == "Boss"
          ? currentCombatContext.opponent.name
          : beingNameWithDeterminantDefini(
            currentCombatContext.opponent,
            false
          )
        } perd ${this.debuffAmount * -1} FO.`
      );
    });
    btn3.activate("Baisser la Vitesse", () => {
      caster.actionPoints -= this.cost;
      player.isAllowedToCastSpell = false;
      btn1.isDisabled = false;
      btn2.hide();
      btn3.hide();
      btn4.hide();
      btn5.hide();
      currentCombatContext.opponent.spellEffects.speed += this.debuffAmount;

      gameMessage(
        `${currentCombatContext.opponent.type == "Boss"
          ? currentCombatContext.opponent.name
          : beingNameWithDeterminantDefini(
            currentCombatContext.opponent,
            false
          )
        } perd ${this.debuffAmount * -1} VI.`
      );
    });
    btn4.activate("Baisser la Magie", () => {
      caster.actionPoints -= this.cost;
      player.isAllowedToCastSpell = false;
      btn1.isDisabled = false;
      btn2.hide();
      btn3.hide();
      btn4.hide();
      btn5.hide();
      currentCombatContext.opponent.spellEffects.magic += this.debuffAmount;

      gameMessage(
        `${currentCombatContext.opponent.type == "Boss"
          ? currentCombatContext.opponent.name
          : beingNameWithDeterminantDefini(
            currentCombatContext.opponent,
            false
          )
        } perd ${this.debuffAmount * -1} MA.`
      );
    });

    btn5.activate("Annuler", () => {
      btn1.isDisabled = false;
      btn2.hide();
      btn3.hide();
      btn4.hide();
      btn5.hide();

      gameMessage(playerPreparationPhaseMessage);
    });
  }

  castAmplified(caster = player) {
    // Safeguards
    if (!caster) return;
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
                        - Choisissez la caractéristique que vous voulez baisser de (${this.debuffAmount * -1
      } + 1D100).`);

    btn1.isDisabled = true;

    btn2.activate("Baisser la Force", () => {
      this.chooseStat(caster, "Force");
    });
    btn3.activate("Baisser la Vitesse", () => {
      this.chooseStat(caster, "Vitesse");
    });
    btn4.activate("Baisser la Magie", () => {
      this.chooseStat(caster, "Magie");
    });

    btn5.activate("Annuler", () => {
      btn1.isDisabled = false;
      btn2.hide();
      btn3.hide();
      btn4.hide();
      btn5.hide();

      gameMessage(playerPreparationPhaseMessage);
    });
  }

  chooseStat(caster = player, debuffedStat) {
    btn3.hide();
    btn4.hide();

    gameMessage(
      `-Lancez le D100 pour amplifier l'effet d'affaiblissement de la ${debuffedStat} de votre adversaire.`
    );

    btn2.activate("Lancer le D100", () => {
      this.rollAmplified(caster, debuffedStat);
    });
  }

  rollAmplified(caster = player, debuffedStat) {
    saveCloverState();
    player.isAllowedToCastSpell = false;
    btn1.isDisabled = false;
    btn2.hide();
    btn5.hide(); // cancel button
    const roll = d100.roll();
    caster.actionPoints -= this.cost + this.amplification.cost;

    switch (debuffedStat) {
      case "Force":
        currentCombatContext.opponent.spellEffects.strength +=
          this.debuffAmount - roll;
        break;
      case "Vitesse":
        currentCombatContext.opponent.spellEffects.speed +=
          this.debuffAmount - roll;
        break;
      case "Magie":
        currentCombatContext.opponent.spellEffects.magic +=
          this.debuffAmount - roll;
        break;

      default:
        break;
    }

    gameMessage(
      `${roll} !
      Vous affaiblissez la ${debuffedStat} de votre adversaire de ${this.debuffAmount - roll}.`
    );

    player.isAllowedToUseLuckyClover = true;
  }
}
