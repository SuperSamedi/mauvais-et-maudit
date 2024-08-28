function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function shuffle(array) {
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

function clamp(number, min, max) {
  if (number <= min) {
    return min;
  }
  if (number >= max) {
    return max;
  }

  return number;
}

function capitalize(string) {
  return `${string.charAt(0).toUpperCase()}${string.slice(1)}`
}

function beingNameWithDeterminantDefini(being, toLowerCase) {
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

function beingNameWithDeterminantDefiniContracte(being, preposition) {
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

function currentGameMessage() {
  return txtDungeonMaster.innerText;
}

function generateTraits() {
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

function getWeakTrait(roll = d20.roll()) {
  return structuredClone(weakTraitsTable[d20.reducedRoll(roll, 4) - 1])
}

function getStrongTrait(roll = d20.roll()) {
  let trait = structuredClone(strongTraitsTable[roll - 1])

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

function generateDescription(trait) {
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

function getClubsItem(id) {
  switch (id) {
    case 1:
      return new DivineWind()
    case 2:
      return new MetalForm()
    case 3:
      return new InfiniteSpring()
    case 4:
      return new Healing()
    case 5:
      return new Steal()
    case 6:
      return new Teleport()
    case 7:
      return new Enfeeble()
    case 8:
      return new InfernalSphere()
    case 9:
      return new Divination()
    case 10:
      return new AbsoluteRestoration()

    default:
      console.error("Can't find a Clubs item with id: " + id);
      return undefined
  }
}

function getCupsItem(id) {
  switch (id) {
    case 1:
      // Potion
      return new Potion()
    case 2:
      // Ether
      return new Ether()
    case 3:
      // Moon Pendant
      return new EquippableItem(structuredClone(cupsItemsTable[id - 1]))
    case 4:
      // Lucky Clover
      return new LuckyClover()
    case 5:
      // Ligth Armor
      return new EquippableItem(structuredClone(cupsItemsTable[id - 1]))
    case 6:
      // Heavy Armor
      return new EquippableItem(structuredClone(cupsItemsTable[id - 1]))
    case 7:
      // Ring of Balance
      return new EquippableItem(structuredClone(cupsItemsTable[id - 1]))
    case 8:
      // Elixir of Life
      return new Potion(structuredClone(cupsItemsTable[id - 1]), Infinity)
    case 9:
      // Cloak of a Giant
      return new EquippableItem(structuredClone(cupsItemsTable[id - 1]))
    case 10:
      // Bottomless Cup
      return new Item(structuredClone(cupsItemsTable[id - 1]))
    case 12:
      // Compas of the Ancients
      return new Item(structuredClone(cupsItemsTable[id - 1]))
    case 15:
      // Lucky Clover (test version)
      return new LuckyClover(structuredClone(cupsItemsTable[id - 1]))

    default:
      break;
  }
}

function isBeingDead(being) {
  if (being.hitPoints <= 0) {
    return true
  }

  return false
}

function hideAllGenericButtons() {
  btn1.hide();
  btn2.hide();
  btn3.hide();
  btn4.hide();
  btn5.hide();
  btn6.hide();
}

function hideButton(btn) {
  btn.onclick = () => { }
  btn.disabled = true
  btn.style.display = "none"
}

function updateGameDivHeight(element) {
  if (element === undefined) {
    containerGame.removeAttribute("style")
    return
  }
  containerGame.style.height = `${element.offsetHeight}px`
}

function isAllowedToRerollEnvironment() {
  return environmentRerolls > 0
}

function displayState(isOn = false, text = "") {
  txtDungeonMasterState.style.display = "none"
  DungeonMasterLine.style.display = "none"
  if (isOn) {
    txtDungeonMasterState.style.display = "block"
    DungeonMasterLine.style.display = "block"
    txtDungeonMasterState.innerText = text
  }
}
