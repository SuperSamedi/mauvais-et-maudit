import { clamp } from "./utilities.js"
import { voyage } from "./Voyage.js";
import { inventory } from "./Inventory.js";

class Player {
  #name;
  #hitPoints;
  #goldCoins;
  #actionPoints;
  #experiencePoints;
  #gender;
  #voyage;

  constructor() {
    this.inventory = inventory;
    this.type = "Intelligent Being"
    this.races = [{ name: { female: "aucune", male: "aucune" } }];
    this.traits = new Array({ name: { accordFeminin: "aucun", accordMasculin: "aucun" } });
    this.#hitPoints = 0;
    this.#goldCoins = 0;
    this.#actionPoints = 0;
    this.#experiencePoints = 0;
    this.#gender = "M";
    this.#voyage = voyage;
    this.levelUpStats = {
      hitPoints: 0,
      strength: 0,
      speed: 0,
      magic: 0
    }
    this.spellEffects = {
      strength: 0,
      speed: 0,
      magic: 0
    }
    this.isAllowedToDraw = false
    this.isAllowedToSellItems = false
    this.isAllowedToLevelUp = false
    this.isAllowedToCastSpell = false
    this.isAllowedToUseLuckyClover = false
    this.hasForcedInitiative = false
    this.updateAllVisuals();
  }

  get name() {
    return this.#name
  }

  set name(value) {
    this.#name = value
    const txtPlayerName = document.getElementById("player-name");
    txtPlayerName.innerText = this.name
  }

  get fullRaceName() {
    let name = ""

    name += this.gender == "F" ? this.races[0].name.female : this.races[0].name.male

    if (this.races.length > 1) {
      name = `Hybride ${name}`

      if (this.races[1].name) {
        name += `-${this.gender == "F" ? this.races[1].name.female : this.races[1].name.male}`
      }
    }

    return name
  }

  get gender() {
    return this.#gender;
  }

  set gender(value) {
    this.#gender = value
    this.updateRaceVisuals()
    this.updateTraitVisuals()
  }

  get hitPoints() {
    return this.#hitPoints;
  }

  set hitPoints(value) {
    if (typeof value !== "number") {
      throw new Error("Unexpected argument type: ", typeof value);
    }
    this.#hitPoints = clamp(value, 0, this.maxHitPoints);
    this.updateHitPointsVisuals();
  }

  get maxHitPoints() {
    let stat = 0;

    // Stats from races
    let racesStat = 0
    this.races.forEach(race => {
      if (race.hitPoints) {
        racesStat += race.hitPoints;
      }
    })
    stat += Math.round(racesStat / this.races.length)

    if (this.traits) {
      this.traits.forEach((trait) => {
        if (trait.hitPoints) {
          stat += trait.hitPoints;
        }
      });
    }

    this.inventory.slots.forEach((item) => {
      if (item
        && item.isEquipped
        && item.hitPoints) {
        stat += item.hitPoints;
      }
    });

    // Environment modifiers
    if (this.#voyage.currentEnvironment?.statsModifiers?.player?.hitPoints) {
      stat += currentEnvironment.statsModifiers.player.hitPoints
    }

    // Level up stats
    stat += this.levelUpStats.hitPoints

    // Spell Effects
    if (this.spellEffects.hitPoints) stat += this.spellEffects.hitPoints

    return clamp(stat, 0, Infinity);
  }

  get strength() {
    let stat = 0;

    let racesStat = 0
    this.races.forEach(race => {
      if (race.strength) {
        racesStat += race.strength;
      }
    })
    stat += Math.round(racesStat / this.races.length)

    if (this.traits) {
      this.traits.forEach((trait) => {
        if (trait.strength) {
          stat += trait.strength;
        }
      });
    }

    this.inventory.slots.forEach((item) => {
      if (item
        && item.isEquipped
        && item.strength) {
        stat += item.strength;
      }
    });

    // Environment modifiers
    if (this.#voyage.currentEnvironment.statsModifiers?.player?.strength) {
      stat += currentEnvironment.statsModifiers.player.strength
    }

    // Level up stats
    stat += this.levelUpStats.strength

    // Spell Effects
    stat += this.spellEffects.strength

    return clamp(stat, 0, Infinity);
  }

  get speed() {
    let stat = 0;

    let racesStat = 0
    this.races.forEach(race => {
      if (race.speed) {
        racesStat += race.speed;
      }
    })
    stat += Math.round(racesStat / this.races.length)

    if (this.traits) {
      this.traits.forEach((trait) => {
        if (trait.speed) {
          stat += trait.speed;
        }
      });
    }

    this.inventory.slots.forEach((item) => {
      if (item
        && item.isEquipped
        && item.speed) {
        stat += item.speed;
      }
    });

    // Environment modifiers
    if (this.#voyage.currentEnvironment.statsModifiers?.player?.speed) {
      stat += currentEnvironment.statsModifiers.player.speed

      // Vision Lantern special rules
      if (this.inventory.containsItemWithName("Lanterne de Vision")) {
        if (currentEnvironment.name == "Grotte"
          || currentEnvironment.name == "Marécage") {
          stat -= currentEnvironment.statsModifiers.player.speed
        }
      }
    }

    // Level up stats
    stat += this.levelUpStats.speed

    // Spell Effects
    stat += this.spellEffects.speed

    return clamp(stat, 0, Infinity);
  }

  get magic() {
    let stat = 0;

    let racesStat = 0
    this.races.forEach(race => {
      if (race.magic) {
        racesStat += race.magic;
      }
    })
    stat += Math.round(racesStat / this.races.length)

    if (this.traits) {
      this.traits.forEach((trait) => {
        if (trait.magic) {
          stat += trait.magic;
        }
      });
    }

    this.inventory.slots.forEach((item) => {
      if (item
        && item.isEquipped
        && item.magic) {
        stat += item.magic;
      }
    });

    // Environment modifiers
    if (this.#voyage.currentEnvironment.statsModifiers?.player?.magic) {
      stat += currentEnvironment.statsModifiers.player.magic

      // Vision Lantern special rules
      if (this.inventory.containsItemWithName("Lanterne de Vision")
        && currentEnvironment.name == "Étangs Putrides") {
        stat -= currentEnvironment.statsModifiers.player.speed
      }
    }

    // Level up stats
    stat += this.levelUpStats.magic

    // Spell Effects
    stat += this.spellEffects.magic

    return clamp(stat, 0, Infinity);
  }

  get goldCoins() {
    return this.#goldCoins;
  }

  set goldCoins(value) {
    this.#goldCoins = clamp(value, 0, Infinity);
    this.updateGoldCoinsVisuals();
  }

  get actionPoints() {
    return this.#actionPoints;
  }

  set actionPoints(value) {
    this.#actionPoints = clamp(value, 0, Infinity);
    this.updateActionPointsVisuals()
  }

  get experiencePoints() {
    return this.#experiencePoints;
  }

  set experiencePoints(value) {
    this.#experiencePoints = clamp(value, 0, Infinity);
    this.updateExperiencePointsVisuals();
  }

  buy(item, shop) {
    if (this.goldCoins < item.buyValue) return
    if (this.inventory.isFull() === true) return

    this.goldCoins -= item.buyValue
    shop.remove(item)
    this.inventory.add(item)
    shop.updateDisplay()
  }

  sell(item, shop) {
    if (!this.isAllowedToSellItems) return

    // if we manage to remove the item from the inventory
    if (this.inventory.remove(item)) {
      this.updateStatsVisuals()
      this.goldCoins += item.sellValue
      shop.add(item)
      shop.updateDisplay()
    }
  }

  drop(item) {
    if (this.inventory.remove(item)) {
      this.updateStatsVisuals()
      return true
    }
    return false
  }


  // Level ups
  levelUpHitPoints(amount = 1) {
    if (!this.isAllowedToLevelUp) return
    if (this.experiencePoints < amount) return

    this.experiencePoints -= 1 * amount
    this.levelUpStats.hitPoints += 5 * amount

    this.restoreHitPoints()
    this.updateExperiencePointsVisuals()
    this.updateHitPointsVisuals()
  }

  levelUpStrength(amount = 1) {
    if (!this.isAllowedToLevelUp) return
    if (this.experiencePoints < amount) return

    this.experiencePoints -= 1 * amount
    this.levelUpStats.strength += 5 * amount

    this.updateExperiencePointsVisuals()
    this.updateStrengthVisuals()
  }

  levelUpSpeed(amount = 1) {
    if (!this.isAllowedToLevelUp) return
    if (this.experiencePoints < amount) return

    this.experiencePoints -= 1 * amount
    this.levelUpStats.speed += 5 * amount

    this.updateExperiencePointsVisuals()
    this.updateSpeedVisuals()
  }

  levelUpMagic(amount = 1) {
    if (!this.isAllowedToLevelUp) return
    if (this.experiencePoints < amount) return

    this.experiencePoints -= 1 * amount
    this.levelUpStats.magic += 5 * amount

    this.updateExperiencePointsVisuals()
    this.updateMagicVisuals()
  }

  buyActionPoint() {
    if (!this.isAllowedToLevelUp) return
    if (this.experiencePoints <= 0) return

    this.experiencePoints--
    this.actionPoints++

    this.updateExperiencePointsVisuals()
    this.updateActionPointsVisuals()
  }


  restoreHitPoints() {
    this.hitPoints = this.maxHitPoints;
    this.updateHitPointsVisuals();
  }

  resetSpellEffects() {
    this.spellEffects = {
      strength: 0,
      speed: 0,
      magic: 0
    }

    this.updateStrengthVisuals()
    this.updateSpeedVisuals()
    this.updateMagicVisuals()

    // Reset Divination effect
    this.hasForcedInitiative = false
  }

  resetSpellsCastLimits() {
    this.inventory.slots.forEach(slot => {
      if (slot?.type !== "parchemin de sort") return;
      if (slot?.hasAlreadyBeenCast === undefined) return;

      slot.hasAlreadyBeenCast = false;
    });
  }

  hasARaceInCommonWith(intelligentBeing) {
    // For each player race we check each of the being's race to see if one matches
    for (let i = 0; i < this.races.length; i++) {
      const playerRace = this.races[i];

      for (let j = 0; j < intelligentBeing.races.length; j++) {
        const beingRace = intelligentBeing.races[j];

        if (playerRace.name.male == beingRace.name.male) {
          console.log("Player has race in common with being.");
          return true
        }
      }
    }

    console.log("Player does not have a race in common with being.");
    return false
  }

  // Visuals updates
  updateAllVisuals() {
    this.updateRaceVisuals()
    this.updateTraitVisuals()
    this.updateHitPointsVisuals()
    this.updateStrengthVisuals()
    this.updateSpeedVisuals()
    this.updateMagicVisuals()
    this.updateGoldCoinsVisuals()
    this.updateActionPointsVisuals()
    this.updateExperiencePointsVisuals()
  }

  //Race et Trait
  updateRaceVisuals() {
    const txtPlayerRace = document.getElementById("player-race");
    txtPlayerRace.innerText = this.fullRaceName;
  }
  updateTraitVisuals() {
    const txtPlayerTrait = document.getElementById("player-trait");
    txtPlayerTrait.innerText = this.gender == "F" ? this.traits[0].name.accordFeminin : this.traits[0].name.accordMasculin;
    // Hover Trait for details/description
    txtPlayerTrait.addEventListener("mouseover", (e) => {
      if (player.traits[0].description) {
        txtPlayerTrait.innerText = `${player.gender == "F" ? player.traits[0].name.accordFeminin : player.traits[0].name.accordMasculin} (${player.traits[0].description})`;
      }
    });
    txtPlayerTrait.addEventListener("mouseleave", (e) => {
      if (player.traits[0].description) {
        txtPlayerTrait.innerText = `${player.gender == "F" ? player.traits[0].name.accordFeminin : player.traits[0].name.accordMasculin}`;
      }
    });
  }

  //Stats
  updateStatsVisuals() {
    this.updateHitPointsVisuals()
    this.updateStrengthVisuals()
    this.updateSpeedVisuals()
    this.updateMagicVisuals()
  }
  updateHitPointsVisuals() {
    const txtPlayerHitPoints = document.getElementById("player-hit-points");
    txtPlayerHitPoints.innerText = `${this.hitPoints}/${this.maxHitPoints}`;
  }
  updateStrengthVisuals() {
    const txtPlayerStrength = document.getElementById("player-strength");
    txtPlayerStrength.innerText = this.strength;
  }
  updateSpeedVisuals() {
    const txtPlayerSpeed = document.getElementById("player-speed");
    txtPlayerSpeed.innerText = this.speed;
  }
  updateMagicVisuals() {
    const txtPlayerMagic = document.getElementById("player-magic");
    txtPlayerMagic.innerText = this.magic;
  }

  //Ressources
  updateGoldCoinsVisuals() {
    const txtPlayerGoldCoins = document.getElementById("gold-pieces");
    txtPlayerGoldCoins.innerText = this.goldCoins;
  }
  updateActionPointsVisuals() {
    const txtPlayerActionPoints = document.getElementById("action-points");
    txtPlayerActionPoints.innerText = this.actionPoints;
  }
  updateExperiencePointsVisuals() {
    const txtPlayerExperiencePoints = document.getElementById("experience-points")
    txtPlayerExperiencePoints.innerText = this.experiencePoints;
  }
}

export const player = new Player();
