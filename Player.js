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


class Player {
  #hitPoints;
  #goldCoins;
  #actionPoints;
  #experiencePoints;
  #gender;

  constructor() {
    this.inventory = new Inventory();
    this.type = "Intelligent Being"
    this.race = { name: { male: "aucune" } };
    this.traits = new Array({ name: { accordMasculin: "aucun" } });
    this.#hitPoints = 0;
    this.#goldCoins = 0;
    this.#actionPoints = 2;
    this.#experiencePoints = 0;
    this.#gender = "M";
    this.updateAllVisuals();
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

    if (this.race.hitPoints) {
      stat += this.race.hitPoints;
    }

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
    if (currentEnvironment.statsModifiers.player.hitPoints) {
      stat += currentEnvironment.statsModifiers.player.hitPoints
    }

    return stat;
  }

  get strength() {
    let stat = 0;

    if (this.race.strength) {
      stat += this.race.strength;
    }

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
    if (currentEnvironment.statsModifiers.player.strength) {
      stat += currentEnvironment.statsModifiers.player.strength
    }

    return stat;
  }

  get speed() {
    let stat = 0;

    if (this.race.speed) {
      stat += this.race.speed;
    }

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
    if (currentEnvironment.statsModifiers.player.speed) {
      stat += currentEnvironment.statsModifiers.player.speed
    }

    return stat;
  }

  get magic() {
    let stat = 0;

    if (this.race.magic) {
      stat += this.race.magic;
    }

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
    if (currentEnvironment.statsModifiers.player.magic) {
      stat += currentEnvironment.statsModifiers.player.magic
    }

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

  restoreHitPoints() {
    this.hitPoints = this.maxHitPoints;
    this.updateHitPointsVisuals();
  }

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
    txtPlayerRace.innerText = this.race.name.male;
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
