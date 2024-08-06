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


function beingNameWithDeterminantDefini(being, toLowerCase) {
  let name = being.name.toLowerCase()

  if (
    name[0] == 'a' ||
    name[0] == 'e' ||
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

function getWeakTrait(roll) {
  return structuredClone(weakTraitsTable[d20.reducedRoll(roll, 4) - 1])
}

function getStrongTrait(roll) {
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
    generateDescription(trait)

    return trait
  }
}

function generateDescription(trait) {
  trait.description = ""
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
    trait.description += `PV ${trait.hitPoints < 0 ? "" : "+"}${trait.hitPoints}${statsTreated < numberOfStats ? "," : ""}`
    isFirstStat = false
  }
  if (trait.strength) {
    statsTreated++
    trait.description += `${isFirstStat ? "" : " "}FO ${trait.strength < 0 ? "" : "+"}${trait.strength}${statsTreated < numberOfStats ? "," : ""}`
    isFirstStat = false
  }
  if (trait.speed) {
    statsTreated++
    trait.description += `${isFirstStat ? "" : " "}VI ${trait.speed < 0 ? "" : "+"}${trait.speed}${statsTreated < numberOfStats ? "," : ""}`
    isFirstStat = false
  }
  if (trait.magic) {
    trait.description += `${isFirstStat ? "" : " "}MA ${trait.strength < 0 ? "" : "+"}${trait.magic}`
  }
}

function getCupsItem(id) {
  let item = {}

  switch (id) {
    case 6:
      item = new EquippableItem(cupsItemsTable[5])
      item.magic = 15
      break;

    default:
      break;
  }

  return item;
}