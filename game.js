//#region DOM links

const txtDungeonMaster = document.getElementById("dungeon-master-text");

const btn1 = document.getElementById("btn1");
const btnRaceRoll = document.getElementById("btn-race-roll");
const btnTraitRoll = document.getElementById("btn-trait-roll");
const btnCardDraw = document.getElementById("btn-card-draw");

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

//#endregion


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

btnRaceRoll.onclick = choosePlayerRace;
btnTraitRoll.onclick = choosePlayerTrait;
btnCardDraw.onclick = draw;

btnInventoryCheckmarks.forEach(checkmark => {
    checkmark.addEventListener("click", e => {
        if (equip(inventory[e.target.dataset["number"]])) {
            checkmark.innerText = 'X';
            return;
        }
        checkmark.innerText = '';
    });
});


// #region Extract data from jsons

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

// #endregion

function choosePlayerRace() {
    const roll = getRandomInt(intelligentRacesTable.length) + 1;

    playerRace = structuredClone(intelligentRacesTable[roll - 1]);
    console.log(intelligentRacesTable);

    if (playerRace.raceName == "Non-Être") {
        gameMessage(`${roll} ! - ${playerRace.raceName}.
        Les Non-Êtres sont des créatures instables. tu vas devoir tirer tes stats au hasard.
        Lance un D100 pour tes points de vie.`);
        restorePlayerHealth();
        updatePlayerStats();
        generateNonBeingPlayer();
        return;
    }
    gameMessage(`${roll} ! - ${playerRace.raceName}`);

    restorePlayerHealth();
    updatePlayerStats();
}

function choosePlayerTrait() {
    const roll = getRandomInt(strongTraitsTable.length) + 1;

    playerTrait = structuredClone(strongTraitsTable[roll - 1]);

    gameMessage(`${roll} ! - ${playerTrait.traitName}`);
    restorePlayerHealth();
    updatePlayerStats();
}

//#region Non-Being Generation
function generateNonBeingPlayer() {
    btn1.innerText = "Lancer un D100";
    btn1.onclick = generateNonBeingHitPoints;
}

function generateNonBeingHitPoints() {
    const roll = getRandomInt(100) + 1;
    
    playerRace.hitPoints = roll;

    restorePlayerHealth();
    updatePlayerStats();
    gameMessage(`${roll} !
    Maintenant lance à nouveau un D100 pour ta stat de force.`);

    btn1.onclick = generateNonBeingStrength;
}

function generateNonBeingStrength() {
    const roll = getRandomInt(100) + 1;
    
    playerRace.strength = roll;

    updatePlayerStats();
    gameMessage(`${roll} !
    Maintenant lance encore un D100 pour ta stat de vitesse.`);

    btn1.onclick = generateNonBeingSpeed;
}

function generateNonBeingSpeed() {
    const roll = getRandomInt(100) + 1;
    
    playerRace.speed = roll;

    updatePlayerStats();
    gameMessage(`${roll} !
    Et enfin, lance un D100 pour ta stat de magie.`);

    btn1.onclick = generateNonBeingMagic;
}

function generateNonBeingMagic() {
    const roll = getRandomInt(100) + 1;
    
    playerRace.magic = roll;

    updatePlayerStats();
    gameMessage(`${roll} !
    Ça y est ! Voyons maintenant si ton état de Non-Être est suffisamment stable.`);
    btn1.innerText = "Vérifier"
    btn1.onclick = checkNonBeingStability;
}

function checkNonBeingStability() {
    const totalStats = playerRace.hitPoints + playerRace.strength + playerRace.speed + playerRace.magic; 
    
    if (totalStats < 200) {
        const pointsToAdd = 200 - totalStats;
        let message = `Ton état de Non-Être est trop fragile. Tu vas devoir rajouter ${pointsToAdd} point`;

        if (pointsToAdd == 1) {
            message += ` à la caractéristique de ton choix.`;
        }

        message += `s répartis comme tu le souhaites parmi tes caractéristiques.`;

        gameMessage(message);
        return;
    }

    if (totalStats > 300) {
        gameMessage(`Ton état de Non-Être est trop instable. Tu vas devoir enlever 50 points répartis de la façon dont tu le désire parmi tes caractéristiques.`);
        return;
    }

    gameMessage(`C'est bon ! Ton état de Non-Être est suffisamment stable.`);
}
//#endregion

function draw() {
    if (scopaDeck.length <= 0) {
        gameMessage("La pioche est vide...");
        return;
    }

    let feedbackMessage = "";
    lastDrawnCard = structuredClone(scopaDeck[0]);
    scopaDeck.shift();
    //console.log(scopaDeck);
    updateLastDrawnCard(lastDrawnCard);
    feedbackMessage += `${lastDrawnCard.description} !`;

    if (lastDrawnCard.suit == "coins") {
        let reward = structuredClone(coinsItemsTable[lastDrawnCard.value - 1]);
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
        let reward = structuredClone(swordsItemsTable[lastDrawnCard.value - 1]);
        reward.equipped = false;
        addToInventory(reward);
        feedbackMessage += ` Tu reçois ${reward.preposition}${reward.name} (${reward.description})`;
        //console.log(inventory);
    }

    feedbackMessage += `.`;
    gameMessage(feedbackMessage);
}

function restorePlayerHealth() {
    playerHitPoints = getPlayerMaxHitPoints();
}

function generateIntelligentRace() {
    return structuredClone(intelligentRacesTable[getRandomInt(intelligentRacesTable.length)]);
}

function gameMessage(text) {
    txtDungeonMaster.innerText = text;
}

function updatePlayerStats() {
    txtPlayerRace.innerText = playerRace.raceName;

    if (playerTrait.traitName) {
        txtPlayerTrait.innerText = playerTrait.traitName;
    }

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

function addToInventory(item) {
    for (let i = 0; i < 8; i++) {
        if (inventory[i] == undefined) {
            inventory[i] = item;
            updateInventory();
            return;
        }
    }

    gameMessage("Votre inventaire est plein.");
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

//#region Utilities
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
//#endregion