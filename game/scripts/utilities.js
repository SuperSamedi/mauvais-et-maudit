import Dice from "./Dice.js";
import Item from "./items/Item.js";
import Button from "./Button.js"

// Spells
import DivineWind from "./items/spells/DivineWind.js";
import MetalForm from "./items/spells/MetalForm.js";
import InfiniteSpring from "./items/spells/InfiniteSpring.js";
import Healing from "./items/spells/Healing.js";
import Steal from "./items/spells/Steal.js";
import Teleport from "./items/spells/Teleport.js";
import Enfeeble from "./items/spells/Enfeeble.js";
import InfernalSphere from "./items/spells/InfernalSphere.js";
import Divination from "./items/spells/Divination.js";
import AbsoluteRestoration from "./items/spells/AbsoluteRestoration.js";

// Cups Items
import EquippableItem from "./items/EquippableItem.js";
import Potion from "./items/consumables/Potion.js";
import Ether from "./items/consumables/Ether.js";
import LuckyClover from "./items/consumables/LuckyClover.js";

const d20 = new Dice(20);

/**
 * Generates a random integer between 0 and max value (max value is excluded)
 * @param {integer} max The non-inclusive integer value that defines the range of the random number. 
 * @returns a random integer.
 */
export function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

/**
 * Shuffles an array.
 * @param {array} array The array that needs shuffling.
 */
export function shuffle(array) {
  let currentIndex = array.length;

  while (currentIndex > 0) {
    let randomIndex = getRandomInt(currentIndex);
    currentIndex--;

    // Swap the 2 objects;
    const temp = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temp;
  }
}

/**
 * Clamps a number between a min and a max value.
 * @param {number} number The number that needs to not go below the min value or above the max value.
 * @param {number} min The minimum value the number can have.
 * @param {number} max The maximum value the number can have.
 * @returns The number clamped between the min and max values.
 */
export function clamp(number, min, max) {
  if (min > max) {
    // Swap
    min = min + max;
    max = min - max;
    min = min - max;
  }

  if (number <= min) {
    return min;
  }

  if (number >= max) {
    return max;
  }

  return number;
}

/**
 * Modifies the first character of a string into upper case.
 * @param {string} string The string we want to capitalize.
 * @returns The string argument with an upper case first character.
 */
export function capitalize(string) {
  return `${string.charAt(0).toUpperCase()}${string.slice(1)}`
}

export function beingNameWithDeterminantDefini(being, toLowerCase) {
  let name = being.name.toLowerCase()

  if (
    name[0] == 'a' ||
    name[0] == 'e' ||
    name[0] == 'é' ||
    name[0] == 'i' ||
    name[0] == 'o' ||
    name[0] == 'u' ||
    name[0] == 'y' ||
    name.slice(0, 2) == "hy" ||
    name.slice(0, 2) == "hu"
  ) {
    if (toLowerCase == true) {
      return `l'${being.name}`
    }
    return `L'${being.name}`
  }

  if (being.gender == "F") {
    if (toLowerCase == true) {
      return `la ${being.name}`
    }
    return `La ${being.name}`
  }

  if (toLowerCase == true) {
    return `le ${being.name}`
  }
  return `Le ${being.name}`
}

export function beingNameWithDeterminantDefiniContracte(being, preposition) {
  let name = being.name.toLowerCase()

  if (
    being.gender == "F" ||
    name[0] == 'a' ||
    name[0] == 'e' ||
    name[0] == 'é' ||
    name[0] == 'i' ||
    name[0] == 'o' ||
    name[0] == 'u' ||
    name[0] == 'y' ||
    name.slice(0, 2) == "hy" ||
    name.slice(0, 2) == "hu"
  ) {
    return `${preposition} ${beingNameWithDeterminantDefini(being, true)}`
  }

  if (preposition == 'à') {
    return `au ${being.name}`
  }

  if (preposition == "de") {
    return `du ${being.name}`
  }
}

const txtDungeonMaster = document.getElementById("dungeon-master__main");
export function gameMessage(text) {
  txtDungeonMaster.innerText = text;
}
export function currentGameMessage() {
  return txtDungeonMaster.innerText;
}

export function generateTraits() {
  let traits = []

  switch (currentEnvironment.monstersLevel) {
    case 1:
      traits.push(getWeakTrait(d20.roll()))
      break;

    case 3:
      traits.push(getStrongTrait(d20.roll()))
      break;

    case 4:
      traits.push(getStrongTrait(d20.roll()))
      traits.push(getStrongTrait(d20.roll()))
      break;

    default:
      // level 2s get no traits
      break;
  }

  return traits
}

export function getWeakTrait(table, roll = d20.roll()) {
  return structuredClone(table[d20.reducedRoll(roll, 4) - 1])
}

export function getStrongTrait(table, roll = d20.roll()) {
  let trait = structuredClone(table[roll - 1])

  // Mutant special rule
  if (trait.name.accordMasculin == "Mutant") {
    trait = generateMutantTrait();
  }

  return trait

  // Choose a stat to boost by 40 and another to nerf by 20
  function generateMutantTrait() {
    let trait = {
      name: {
        accordFeminin: "Mutante",
        accordMasculin: "Mutant",
      }
    }

    let boostRoll = d20.reducedRoll(d20.roll(), 4)
    let nerfRoll = d20.reducedRoll(d20.roll(), 4)

    while (nerfRoll == boostRoll) {
      nerfRoll = d20.reducedRoll(d20.roll(), 4)
    }

    switch (boostRoll) {
      case 1:
        trait.hitPoints = 40
        break;

      case 2:
        trait.strength = 40
        break;

      case 3:
        trait.speed = 40
        break;

      case 4:
        trait.magic = 40
        break;

      default:
        throw new Error("Weirdness in generateMutantTrait(). The variable boostRoll has an unexpected value.");
    }

    switch (nerfRoll) {
      case 1:
        trait.hitPoints = -20
        break;

      case 2:
        trait.strength = -20
        break;

      case 3:
        trait.speed = -20
        break;

      case 4:
        trait.magic = -20
        break;

      default:
        throw new Error("Weirdness in generateMutantTrait(). The variable nerfRoll has an unexpected value.");
    }

    // construct description
    trait.description = generateDescription(trait)

    return trait
  }
}

export function generateDescription(trait) {
  let description = ""
  let isFirstStat = true
  let numberOfStats = 0
  let statsTreated = 0

  if (trait.hitPoints) {
    numberOfStats++
  }
  if (trait.strength) {
    numberOfStats++
  }
  if (trait.speed) {
    numberOfStats++
  }
  if (trait.magic) {
    numberOfStats++
  }

  if (trait.hitPoints) {
    statsTreated++
    description += `PV ${trait.hitPoints < 0 ? "" : "+"}${trait.hitPoints}${statsTreated < numberOfStats ? "," : ""}`
    isFirstStat = false
  }
  if (trait.strength) {
    statsTreated++
    description += `${isFirstStat ? "" : " "}FO ${trait.strength < 0 ? "" : "+"}${trait.strength}${statsTreated < numberOfStats ? "," : ""}`
    isFirstStat = false
  }
  if (trait.speed) {
    statsTreated++
    description += `${isFirstStat ? "" : " "}VI ${trait.speed < 0 ? "" : "+"}${trait.speed}${statsTreated < numberOfStats ? "," : ""}`
    isFirstStat = false
  }
  if (trait.magic) {
    description += `${isFirstStat ? "" : " "}MA ${trait.strength < 0 ? "" : "+"}${trait.magic}`
  }

  return description
}

export function getClubsItem(id, table) {
  switch (id) {
    case 1:
      return new DivineWind(structuredClone(table[id - 1]))
    case 2:
      return new MetalForm(structuredClone(table[id - 1]))
    case 3:
      return new InfiniteSpring(structuredClone(table[id - 1]))
    case 4:
      return new Healing(structuredClone(table[id - 1]))
    case 5:
      return new Steal(structuredClone(table[id - 1]))
    case 6:
      return new Teleport(structuredClone(table[id - 1]))
    case 7:
      return new Enfeeble(structuredClone(table[id - 1]))
    case 8:
      return new InfernalSphere(structuredClone(table[id - 1]))
    case 9:
      return new Divination(structuredClone(table[id - 1]))
    case 10:
      return new AbsoluteRestoration(structuredClone(table[id - 1]))

    default:
      console.error("Can't find a Clubs item with id: " + id);
      return undefined
  }
}

export function getCupsItem(id, table) {
  switch (id) {
    case 1:
      // Potion
      return new Potion(structuredClone(table[id - 1]))
    case 2:
      // Ether
      return new Ether(structuredClone(table[id - 1]))
    case 3:
      // Moon Pendant
      return new EquippableItem(structuredClone(table[id - 1]))
    case 4:
      // Lucky Clover
      return new LuckyClover(structuredClone(table[id - 1]))
    case 5:
      // Ligth Armor
      return new EquippableItem(structuredClone(table[id - 1]))
    case 6:
      // Heavy Armor
      return new EquippableItem(structuredClone(table[id - 1]))
    case 7:
      // Ring of Balance
      return new EquippableItem(structuredClone(table[id - 1]))
    case 8:
      // Elixir of Life
      return new Potion(structuredClone(table[id - 1]), Infinity)
    case 9:
      // Cloak of a Giant
      return new EquippableItem(structuredClone(table[id - 1]))
    case 10:
      // Bottomless Cup
      return new Item(structuredClone(table[id - 1]))
    case 11:
      // Vision Lantern
      return new Item(structuredClone(table[id - 1]))
    case 12:
      // Compas of the Ancients
      return new Item(structuredClone(table[id - 1]))
    case 15:
      // Lucky Clover (public test version)
      return new LuckyClover(structuredClone(table[id - 1]))

    default:
      console.error("Can't find a Cups item with id: " + id);
      return undefined
  }
}

export function isBeingDead(being) {
  return being.hitPoints <= 0
}

export function hideButton(btn) {
  btn.style.display = "none";
  btn.disabled = true;
  btn.onclick = () => { };
}

export function hideAllButtons(buttons) {
  buttons.forEach(button => {
    if (!button instanceof Button)
      return;

    button.hide();
  });
}

export function updateGameDivHeight(element) {
  const containerGame = document.getElementById("game")

  if (element === undefined) {
    containerGame.removeAttribute("style")
    return
  }

  containerGame.style.height = `${element.offsetHeight}px`
}

export function isAllowedToRerollEnvironment() {
  return environmentRerolls > 0
}

export function displayState(isOn = false, text = "") {
  const txtDungeonMasterState = document.getElementById("dungeon-master__state")
  const DungeonMasterLine = document.getElementById("dungeon-master__line");

  txtDungeonMasterState.style.display = "none"
  DungeonMasterLine.style.display = "none"

  if (isOn) {
    txtDungeonMasterState.style.display = "block"
    DungeonMasterLine.style.display = "block"
    txtDungeonMasterState.innerText = text
  }
}
