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
      traits = mergeIntoStrongissimeTrait(traits)
      break;

    default:
      // level 2s get no traits
      break;
  }

  return traits

  function mergeIntoStrongissimeTrait(traits) {
    // if we have different traits, no need to merge into strongissime trait.
    if (traits[0].name.accordMasculin != traits[1].name.accordMasculin) return traits

    switch (traits[0].name.accordMasculin) {
      case "Géant":
        traits = []
        traits.push(structuredClone(strongissimeTraitsTable[0]))
        break;

      case "Puissant":
        traits = []
        traits.push(structuredClone(strongissimeTraitsTable[1]))
        break;

      case "Agile":
        traits = []
        traits.push(structuredClone(strongissimeTraitsTable[2]))
        break;

      case "Rusé":
        traits = []
        traits.push(structuredClone(strongissimeTraitsTable[3]))
        break;

      case "Immense":
        traits = []
        traits.push(structuredClone(strongissimeTraitsTable[4]))
        break;

      case "Costaud":
        traits = []
        traits.push(structuredClone(strongissimeTraitsTable[5]))
        break;

      case "Alerte":
        traits = []
        traits.push(structuredClone(strongissimeTraitsTable[6]))
        break;

      case "Véloce":
        traits = []
        traits.push(structuredClone(strongissimeTraitsTable[7]))
        break;

      case "Magique":
        traits = []
        traits.push(structuredClone(strongissimeTraitsTable[8]))
        break;

      case "Maudit":
        traits = []
        traits.push(structuredClone(strongissimeTraitsTable[9]))
        break;

      case "Rapide":
        traits = []
        traits.push(structuredClone(strongissimeTraitsTable[10]))
        break;

      case "Enchanté":
        traits = []
        traits.push(structuredClone(strongissimeTraitsTable[11]))
        break;

      case "Agressif":
        traits = []
        traits.push(structuredClone(strongissimeTraitsTable[12]))
        break;

      case "Savant":
        traits = []
        traits.push(structuredClone(strongissimeTraitsTable[13]))
        break;

      case "Svelte":
        traits = []
        traits.push(structuredClone(strongissimeTraitsTable[14]))
        break;

      case "Dément":
        traits = []
        traits.push(structuredClone(strongissimeTraitsTable[15]))
        break;

      case "Bestial":
        traits = []
        traits.push(structuredClone(strongissimeTraitsTable[16]))
        break;

      case "Massif":
        traits = []
        traits.push(structuredClone(strongissimeTraitsTable[17]))
        break;

      case "Gigantesque":
        traits = []
        traits.push(structuredClone(strongissimeTraitsTable[18]))
        break;

      case "Mutant":
        // Combine everything into first trait and then delete the second one
        if (traits[1].hitPoints) {
          if (traits[0].hitPoints) {
            traits[0].hitPoints += traits[1].hitPoints
          }
          else {
            traits[0].hitPoints = traits[1].hitPoints
          }
        }
        if (traits[1].strength) {
          if (traits[0].strength) {
            traits[0].strength += traits[1].strength
          }
          else {
            traits[0].strength = traits[1].strength
          }
        }
        if (traits[1].speed) {
          if (traits[0].speed) {
            traits[0].speed += traits[1].speed
          }
          else {
            traits[0].speed = traits[1].speed
          }
        }
        if (traits[1].magic) {
          if (traits[0].magic) {
            traits[0].magic += traits[1].magic
          }
          else {
            traits[0].magic = traits[1].magic
          }
        }

        traits[0].name.accordFeminin = "Mutantissime"
        traits[0].name.accordMasculin = "Mutantissime"
        generateDescription(traits[0])
        traits.pop()
        break;

      default:
        break;
    }

    return traits
  }
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


function isBeingDead(being) {
  if (being.hitPoints <= 0) {
    return true
  }

  return false
}

function hideAllGenericButtons() {
  btn1.style.display = "none"
  btn2.style.display = "none"
  btn3.style.display = "none"
  btn4.style.display = "none"
  btn5.style.display = "none"
  btn6.style.display = "none"
}

function activateButton(btn) {
  btn.style.display = "block"
  btn.disabled = false
}