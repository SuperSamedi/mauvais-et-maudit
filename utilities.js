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
  let name = being.race.name.toLowerCase()

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
      return `l'${being.race.name}`
    }
    return `L'${being.race.name}`
  }

  if (being.race.sex == "F") {
    if (toLowerCase == true) {
      return `la ${being.race.name}`
    }
    return `La ${being.race.name}`
  }

  if (toLowerCase == true) {
    return `le ${being.race.name}`
  }
  return `Le ${being.race.name}`
}

function beingNameWithDeterminantDefiniContracte(being, preposition) {
  let name = being.race.name.toLowerCase()

  if (
    being.race.sex == "F" ||
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
    return `au ${being.race.name}`
  }

  if (preposition == "de") {
    return `du ${being.race.name}`
  }
}

function currentGameMessage() {
  return txtDungeonMaster.innerText;
}