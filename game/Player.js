const txtPlayerRace = document.getElementById("player-race");
const txtPlayerTrait = document.getElementById("player-trait");

const txtPlayerHitPoints = document.getElementById("player-hit-points");
const txtPlayerStrength = document.getElementById("player-strength");
const txtPlayerSpeed = document.getElementById("player-speed");
const txtPlayerMagic = document.getElementById("player-magic");

const txtPlayerGoldCoins = document.getElementById("gold-pieces");
const txtPlayerActionPoints = document.getElementById("action-points");
const txtPlayerExperiencePoints = document.getElementById("experience-points")

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

const characterSheetOverlayBackground = document.getElementById("character-sheet-background")
const characterSheetDiv = document.getElementById("character-sheet")

characterSheetOverlayBackground.onclick = () => {
  screenCharacterSheet.style.display = "none"
  screenCharacterSheetBackground.style.display = "none"
}
characterSheetDiv.onclick = (event) => { event.stopPropagation(); }


class Player {
  #hitPoints;
  #goldCoins;
  #actionPoints;
  #experiencePoints;
  #gender;

  constructor() {
    this.inventory = new Inventory();
    this.type = "Intelligent Being"
    this.races = [{ name: { female: "aucune", male: "aucune" } }];
    this.traits = new Array({ name: { accordFeminin: "aucun", accordMasculin: "aucun" } });
    this.#hitPoints = 0;
    this.#goldCoins = 0;
    this.#actionPoints = 0;
    this.#experiencePoints = 0;
    this.#gender = "M";
    this.levelUpStats = {
      hitPoints: 0,
      strength: 0,
      speed: 0,
      magic: 0
    }
    this.updateAllVisuals();
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

  get hitPoints() {
    return this.#hitPoints;
  }

  set hitPoints(value) {
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
    if (currentEnvironment.statsModifiers) {
      if (currentEnvironment.statsModifiers.player) {
        if (currentEnvironment.statsModifiers.player.hitPoints) {
          stat += currentEnvironment.statsModifiers.player.hitPoints
        }
      }
    }

    // Level up stats
    stat += this.levelUpStats.hitPoints

    return stat;
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
    if (currentEnvironment.statsModifiers) {
      if (currentEnvironment.statsModifiers.player) {
        if (currentEnvironment.statsModifiers.player.strength) {
          stat += currentEnvironment.statsModifiers.player.strength
        }
      }
    }

    // Level up stats
    stat += this.levelUpStats.strength

    return stat;
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
    if (currentEnvironment.statsModifiers) {
      if (currentEnvironment.statsModifiers.player) {
        if (currentEnvironment.statsModifiers.player.speed) {
          stat += currentEnvironment.statsModifiers.player.speed
        }
      }
    }

    // Level up stats
    stat += this.levelUpStats.speed

    return stat;
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
    if (currentEnvironment.statsModifiers) {
      if (currentEnvironment.statsModifiers.player) {
        if (currentEnvironment.statsModifiers.player.magic) {
          stat += currentEnvironment.statsModifiers.player.magic
        }
      }
    }

    // Level up stats
    stat += this.levelUpStats.magic

    return stat;
  }

  get goldCoins() {
    return this.#goldCoins;
  }

  set goldCoins(value) {
    if (value <= 0) {
      this.#goldCoins = 0;
      this.updateGoldCoinsVisuals();
      return;
    }
    this.#goldCoins = value;
    this.updateGoldCoinsVisuals();
  }

  get actionPoints() {
    return this.#actionPoints;
  }

  set actionPoints(value) {
    if (value <= 0) {
      this.#actionPoints = 0;
      this.updateActionPointsVisuals();
      return;
    }
    this.#actionPoints = value;
    this.updateActionPointsVisuals()
  }

  get experiencePoints() {
    return this.#experiencePoints;
  }

  set experiencePoints(value) {
    if (value <= 0) {
      this.#experiencePoints = 0;
      this.updateExperiencePointsVisuals();
      return
    }

    this.#experiencePoints = value;
    this.updateExperiencePointsVisuals();
  }


  // Level ups
  levelUpHitPoints(amount = 1) {
    if (!allowedToLevelUp) return
    if (this.experiencePoints < amount) return

    this.experiencePoints -= 1 * amount
    this.levelUpStats.hitPoints += 5 * amount

    this.restoreHitPoints()
    this.updateExperiencePointsVisuals()
    this.updateHitPointsVisuals()
  }

  levelUpStrength(amount = 1) {
    if (!allowedToLevelUp) return
    if (this.experiencePoints < amount) return

    this.experiencePoints -= 1 * amount
    this.levelUpStats.strength += 5 * amount

    this.updateExperiencePointsVisuals()
    this.updateStrengthVisuals()
  }

  levelUpSpeed(amount = 1) {
    if (!allowedToLevelUp) return
    if (this.experiencePoints < amount) return

    this.experiencePoints -= 1 * amount
    this.levelUpStats.speed += 5 * amount

    this.updateExperiencePointsVisuals()
    this.updateSpeedVisuals()
  }

  levelUpMagic(amount = 1) {
    if (!allowedToLevelUp) return
    if (this.experiencePoints < amount) return

    this.experiencePoints -= 1 * amount
    this.levelUpStats.magic += 5 * amount

    this.updateExperiencePointsVisuals()
    this.updateMagicVisuals()
  }

  buyActionPoint() {
    if (!allowedToLevelUp) return
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

  hasARaceInCommonWith(intelligentBeing) {
    // For each player race we check each of the being's race to see if one matches
    this.races.forEach(race => {
      intelligentBeing.races.forEach(beingRace => {
        if (race.name.male == beingRace.name.male) return true
      })
    })

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
    txtPlayerRace.innerText = this.fullRaceName;
  }
  updateTraitVisuals() {
    txtPlayerTrait.innerText = this.traits[0].name.accordMasculin;
  }

  //Stats
  updateStatsVisuals() {
    this.updateHitPointsVisuals()
    this.updateStrengthVisuals()
    this.updateSpeedVisuals()
    this.updateMagicVisuals()
  }
  updateHitPointsVisuals() {
    txtPlayerHitPoints.innerText = `${this.hitPoints}/${this.maxHitPoints}`;
  }
  updateStrengthVisuals() {
    txtPlayerStrength.innerText = this.strength;
  }
  updateSpeedVisuals() {
    txtPlayerSpeed.innerText = this.speed;
  }
  updateMagicVisuals() {
    txtPlayerMagic.innerText = this.magic;
  }

  //Ressources
  updateGoldCoinsVisuals() {
    txtPlayerGoldCoins.innerText = this.goldCoins;
  }
  updateActionPointsVisuals() {
    txtPlayerActionPoints.innerText = this.actionPoints;
  }
  updateExperiencePointsVisuals() {
    txtPlayerExperiencePoints.innerText = this.experiencePoints;
  }
}
