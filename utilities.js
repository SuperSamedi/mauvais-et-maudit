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
