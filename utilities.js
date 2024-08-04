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
  return weakTraitsTable[d20.reducedRoll(roll, 4) - 1]
}