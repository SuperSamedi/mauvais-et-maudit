const btnRaceRoll = document.getElementById("btn-race-roll");
const btnTraitRoll = document.getElementById("btn-trait-roll");
const btnCardDraw = document.getElementById("btn-card-draw");

const txtDiceResult = document.getElementById("dice-result");

const txtPlayerRace = document.getElementById("player-race");
const txtPlayerTrait = document.getElementById("player-trait");
const txtPlayerHitPoints = document.getElementById("player-hit-points");
const txtPlayerStrength = document.getElementById("player-strength");
const txtPlayerSpeed = document.getElementById("player-speed");
const txtPlayerMagic = document.getElementById("player-magic");
const txtPlayerGoldCoins = document.getElementById("gold-pieces");
const txtPlayerActionPoints = document.getElementById("action-points");
const imgLastDrawnCard = document.getElementById("last-drawn-card");
const inventorySlots = Array.from(document.getElementsByClassName("item"));
const btnInventoryCheckmarks = Array.from(document.getElementsByClassName("equipped-checkmark"));

let scopaDeck = [];
let inventory = [];
let intelligentRacesTable = [];
let strongTraitsTable = [];
let coinsItemsTable = [];
let swordsItemsTable = [];
let clubsItemsTable = [];
let cupsItemsTable = [];

let playerRace = {};
let playerTrait = {};
let playerHitPoints = 0;
let playerGoldCoins = 0;
let playerActionPoint = 0;
let lastDrawnCard = {};

function getPlayerMaxHitPoints() {
    let maxHitPoints = 0;

    if (playerRace.hitPoints) {
        maxHitPoints += playerRace.hitPoints;
    }

    if (playerTrait.hitPoints) {
        maxHitPoints += playerTrait.hitPoints;
    }

    return maxHitPoints;
}
function getPlayerStrength() {
    let strength = 0;

    if (playerRace.strength) {
        strength += playerRace.strength;
    }

    if (playerTrait.strength) {
        strength += playerTrait.strength;
    }

    inventory.forEach(item => {
        if (item.equipped == true && item.strength) {
            strength += item.strength;
        }
    });

    return strength;
}
function getPlayerSpeed() {
    let speed = 0;

    if (playerRace.speed) {
        speed += playerRace.speed;
    }

    if (playerTrait.speed) {
        speed += playerTrait.speed;
    }

    inventory.forEach(item => {
        if (item.equipped && item.speed) {
            speed += item.speed;
        }
    });

    return speed;
}
function getPlayerMagic() {
    let magic = 0;

    if (playerRace.magic) {
        magic += playerRace.magic;
    }

    if (playerTrait.magic) {
        magic += playerTrait.magic;
    }

    inventory.forEach(item => {
        if (item.equipped && item.magic) {
            magic += item.magic;
        }
    })

    return magic;
}

btnRaceRoll.addEventListener("click", e => {
    const roll = getRandomInt(intelligentRacesTable.length) + 1;

    playerRace = intelligentRacesTable[roll - 1];
    playerHitPoints = getPlayerMaxHitPoints();

    gameMessage(`${roll} ! - ${playerRace.raceName}`);
    updatePlayerStats();
});

btnTraitRoll.addEventListener("click", e => {
    const roll = getRandomInt(strongTraitsTable.length) + 1;

    playerTrait = strongTraitsTable[roll - 1];
    playerHitPoints = getPlayerMaxHitPoints();

    gameMessage(`${roll} ! - ${playerTrait.traitName}`);
    updatePlayerStats();
});

btnCardDraw.addEventListener("click", e => {
    if (scopaDeck.length <= 0) {
        gameMessage("La pioche est vide...");
        return;
    }

    let feedbackMessage = "";
    lastDrawnCard = scopaDeck[0];
    scopaDeck.shift();
    //console.log(scopaDeck);
    updateLastDrawnCard(lastDrawnCard);
    feedbackMessage += `${lastDrawnCard.description} !`;

    if (lastDrawnCard.suit == "coins") {
        let reward = coinsItemsTable[lastDrawnCard.value - 1];
        playerGoldCoins += reward.goldCoins;
        feedbackMessage += ` Tu reçois ${reward.goldCoins} pièces d'or`;
        updatePlayerGoldCoins();

        if (reward.actionPoints) {
            playerActionPoint += reward.actionPoints;
            feedbackMessage += ` et ${reward.actionPoints} point d'action`;
            updatePlayerActionPoints();
        }
    }
    
    if (lastDrawnCard.suit == "swords") {
        let reward = swordsItemsTable[lastDrawnCard.value - 1];
        reward.equipped = false;
        addToInventory(reward);
        feedbackMessage += ` Tu reçois ${reward.preposition}${reward.name} (${reward.description})`;
        //console.log(inventory);
    }

    feedbackMessage += `.`;
    gameMessage(feedbackMessage);
});

btnInventoryCheckmarks.forEach(checkmark => {
    checkmark.addEventListener("click", e => {
        if (equip(inventory[e.target.dataset["number"]])) {
            checkmark.innerText = 'X';
            return;
        }
        checkmark.innerText = '';
    });
});

// Extract data from jsons
fetch("resources/data-tables/intelligent-races.json")
    .then(response => {
        return response.json();
    })
    .then(loadedData => {
        intelligentRacesTable = loadedData;
        //console.log(intelligentRacesTable);
    })
    .catch(error => {
        // TODO: create a 500 code page
        console.error(error);
    });

fetch("resources/data-tables/strong-traits.json")
    .then(response => {
        return response.json();
    })
    .then(loadedData => {
        strongTraitsTable = loadedData;
        //console.log(strongTraitsTable);
    })
    .catch(error => {
        //TODO: create a 500 code page
        console.error(error);
    });

fetch("resources/data-tables/scopa-cards.json")
    .then(response => {
        return response.json();
    })
    .then(loadedData => {
        scopaDeck = loadedData;
        shuffle(scopaDeck);
        //console.log(scopaDeck);
    })
    .catch(error => {
        //TODO: create a 500 code page
        console.error(error);
    });

fetch("resources/data-tables/coins-items.json")
    .then(response => {
        return response.json();
    })
    .then(loadedData => {
        coinsItemsTable = loadedData;
        //console.log(coinsItemsTable);
    })
    .catch(error => {
        //TODO: create a 500 code page
        console.error(error);
    });

fetch("resources/data-tables/swords-items.json")
    .then(response => {
        return response.json();
    })
    .then(loadedData => {
        swordsItemsTable = loadedData;
        //console.log(swordsItemsTable);
    })
    .catch(error => {
        //TODO: create a 500 code page
        console.error(error);
    });


function generateIntelligentRace() {
    return intelligentRacesTable[getRandomInt(intelligentRacesTable.length)];
}

function gameMessage(text) {
    txtDiceResult.innerText = text;
}

function updatePlayerStats() {
    txtPlayerRace.innerText = playerRace.raceName;
    txtPlayerTrait.innerText = playerTrait.traitName;
    txtPlayerHitPoints.innerText = `${playerHitPoints}/${getPlayerMaxHitPoints()}`;
    txtPlayerStrength.innerText = getPlayerStrength();
    txtPlayerSpeed.innerText = getPlayerSpeed();
    txtPlayerMagic.innerText = getPlayerMagic();
}

function updatePlayerGoldCoins() {
    txtPlayerGoldCoins.innerText = playerGoldCoins;
}

function updatePlayerActionPoints() {
    txtPlayerActionPoints.innerText = playerActionPoint;
}

function updateLastDrawnCard(card) {
    imgLastDrawnCard.setAttribute("src", card.imageURL);
    imgLastDrawnCard.setAttribute("alt", card.description);
}

function updateInventory() {
    inventorySlots.forEach(slot => {
        const index = slot.dataset["number"];
        if (inventory[index] != undefined) {
            slot.innerText = inventory[index].name;
        }
    })
    //console.log(inventory);
}

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

function addToInventory(item) {
    for (let i = 0; i < 8; i++) {
        if (inventory[i] == undefined) {
            inventory[i] = item;
            updateInventory();
            return;
        }
    }

    gameMessage("Plus de place dans l'inventaire.");
}

function equip(item) {
    if (item == undefined) return false;

    if (!item.equippable) return false;

    if (item.equipped === true) {
        unequip(item);
        return false;
    }

    if (item.type == "weapon") {
        let otherWeaponAlreadyEquipped = false;
        // console.log("Is Weapon !");
        inventory.forEach(inventoryItem => {
            if (inventoryItem.type == "weapon" && inventoryItem.equipped == true) {
                console.log("Found another weapon already equipped.");
                otherWeaponAlreadyEquipped = true;
                return;
            }
        }); 
       
        if (otherWeaponAlreadyEquipped == true) return false;
    }

    item.equipped = true;
    //console.log(inventory);
    updatePlayerStats();
    return true;
}

function unequip(item) {
    if (item == undefined) {
        return;
    }
    
    if (!item.equippable) {
        return;
    }

    item.equipped = false;
    //console.log(inventory);
    updatePlayerStats();
}