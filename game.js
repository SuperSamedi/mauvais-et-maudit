//#region DOM links
const txtDungeonMaster = document.getElementById("dungeon-master-text");

const btn1 = document.getElementById("btn1");
const btnRaceRoll = document.getElementById("btn-race-roll");
const btnTraitRoll = document.getElementById("btn-trait-roll");
const btnCardDraw = document.getElementById("btn-card-draw");

const imgLastDrawnCard = document.getElementById("last-drawn-card");
const btnInventoryCheckmarks = Array.from(document.getElementsByClassName("equipped-checkmark"));

// Stats adjustments Panel
const txtStatsAdjustmentHitPoints = document.getElementById("stats-adjustment-hit-points");
const txtStatsAdjustmentStrength = document.getElementById("stats-adjustment-strength");
const txtStatsAdjustmentSpeed = document.getElementById("stats-adjustment-speed");
const txtStatsAdjustmentMagic = document.getElementById("stats-adjustment-magic");
const btnAddHitPoint = document.getElementById("btn-add-hit-point");
const btnRemoveHitPoint = document.getElementById("btn-remove-hit-point");
const btnAddStrength = document.getElementById("btn-add-strength");
const btnRemoveStrength = document.getElementById("btn-remove-strength");
const btnAddSpeed = document.getElementById("btn-add-speed");
const btnRemoveSpeed = document.getElementById("btn-remove-speed");
const btnAddMagic = document.getElementById("btn-add-magic");
const btnRemoveMagic = document.getElementById("btn-remove-magic");
const btnConfirmStatsAdjustment = document.getElementById("btn-confirm-stats-adjustment");
const btnFightMonster = document.getElementById("btn-fight-monster");
//#endregion


const player = new Player();
const d20 = new Dice(20);
const d100 = new Dice(100);

let intelligentRacesTable = [];
let strongTraitsTable = [];
let monstersTable = [];

let scopaDeck = [];
let coinsItemsTable = [];
let swordsItemsTable = [];
let clubsItemsTable = [];
let cupsItemsTable = [];

let lastDrawnCard = {};

btnRaceRoll.onclick = choosePlayerRace;
btnTraitRoll.onclick = choosePlayerTrait;
btnCardDraw.onclick = draw;

btnInventoryCheckmarks.forEach(checkmark => {
    checkmark.addEventListener("click", e => {
        if (equip(player.inventory.slots[e.target.dataset["number"]])) {
            checkmark.innerText = 'X';
            return;
        }
        checkmark.innerText = '';
    });
});

btnFightMonster.addEventListener("click", e => {
    generateMonster(19);
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

fetch("resources/data-tables/monsters.json")
    .then(response => {
        return response.json();
    })
    .then(loadedData => {
        monstersTable = loadedData;
        //console.log(intelligentRacesTable);
    })
    .catch(error => {
        // TODO: create a 500 code page
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
    const roll = diceRoll(intelligentRacesTable.length);
    // const roll = getRandomInt(intelligentRacesTable.length) + 1;

    player.race = structuredClone(intelligentRacesTable[roll - 1]);
    //console.log(intelligentRacesTable);

    if (player.race.name == "Non-Être") {
        gameMessage(`${roll} ! - ${player.race.name}.
        Les Non-Êtres sont des créatures instables. tu vas devoir tirer tes stats au hasard.
        Lance un D100 pour tes points de vie.`);
        player.restoreHealth();
        player.updateVisuals();
        generateNonBeingPlayer();
        return;
    }
    gameMessage(`${roll} ! - ${player.race.name}`);

    player.restoreHealth();
}

function choosePlayerTrait() {
    const roll = getRandomInt(strongTraitsTable.length) + 1;

    player.trait = structuredClone(strongTraitsTable[roll - 1]);

    gameMessage(`${roll} ! - ${player.trait.name}`);
    player.restoreHealth();
}

//#region Non-Being Player Generation
function generateNonBeingPlayer() {
    btn1.innerText = "Lancer un D100";
    btn1.onclick = generateNonBeingHitPoints;
}

function generateNonBeingHitPoints() {
    const roll = d100.roll();

    player.race.hitPoints = roll;
    player.restoreHealth();
    gameMessage(`${roll} !
    Maintenant lance à nouveau un D100 pour ta stat de force.`);

    btn1.onclick = generateNonBeingStrength;
}

function generateNonBeingStrength() {
    const roll = d100.roll();

    player.race.strength = roll;

    player.updateVisuals();
    gameMessage(`${roll} !
    Maintenant lance encore un D100 pour ta stat de vitesse.`);

    btn1.onclick = generateNonBeingSpeed;
}

function generateNonBeingSpeed() {
    const roll = d100.roll();

    player.race.speed = roll;

    player.updateVisuals();
    gameMessage(`${roll} !
    Et enfin, lance un D100 pour ta stat de magie.`);

    btn1.onclick = generateNonBeingMagic;
}

function generateNonBeingMagic() {
    const roll = d100.roll();

    player.race.magic = roll;

    player.updateVisuals();
    gameMessage(
        `${roll} !
        Ça y est ! Voyons maintenant si ton état de Non-Être est suffisamment stable.`
    );
    btn1.innerText = "Vérifier"
    btn1.onclick = checkNonBeingStability;
}

function checkNonBeingStability() {
    const totalStats = player.race.hitPoints + player.race.strength + player.race.speed + player.race.magic;

    if (totalStats < 200) {
        const pointsToAdd = 200 - totalStats;
        let message = `Ton état de Non-Être est trop fragile. Tu vas devoir rajouter ${pointsToAdd} point`;

        if (pointsToAdd == 1) {
            message += ` à la caractéristique de ton choix.`;
            gameMessage(message);
            adjustStats(pointsToAdd, true);
            return
        }

        message += `s répartis comme tu le souhaites parmi tes caractéristiques.`;

        gameMessage(message);
        adjustStats(pointsToAdd, true);
        return;
    }

    if (totalStats > 300) {
        gameMessage(`Ton état de Non-Être est trop instable. Tu vas devoir enlever 50 points répartis de la façon dont tu le désire parmi tes caractéristiques.`);
        adjustStats(50, false);
        return;
    }

    gameMessage(`C'est bon ! Ton état de Non-Être est suffisamment stable.`);
}

function adjustStats(amount, isAdding) {

    const hitPoints = {
        value: 0,
        minValue: 1,
        startingValue: 0
    };
    const strength = {
        value: 0,
        minValue: 0,
        startingValue: 0
    };
    const speed = {
        value: 0,
        minValue: 0,
        startingValue: 0
    };
    const magic = {
        value: 0,
        minValue: 0,
        startingValue: 0
    };

    hitPoints.value += player.race.hitPoints;
    strength.value += player.race.strength;
    speed.value += player.race.speed;
    magic.value += player.race.magic;

    hitPoints.startingValue = hitPoints.value;
    strength.startingValue = strength.value;
    speed.startingValue = speed.value;
    magic.startingValue = magic.value;

    btnAddHitPoint.addEventListener('click', () => {
        addPointTo(hitPoints);
    });
    btnAddStrength.addEventListener('click', () => {
        addPointTo(strength);
    });
    btnAddSpeed.addEventListener('click', () => {
        addPointTo(speed);
    });
    btnAddMagic.addEventListener('click', () => {
        addPointTo(magic);
    });
    btnRemoveHitPoint.addEventListener('click', () => {
        removePointFrom(hitPoints);
    });
    btnRemoveStrength.addEventListener('click', () => {
        removePointFrom(strength);
    });
    btnRemoveSpeed.addEventListener('click', () => {
        removePointFrom(speed);
    });
    btnRemoveMagic.addEventListener('click', () => {
        removePointFrom(magic);
    });
    btnConfirmStatsAdjustment.onclick = confirmStatsAdjustment;

    updateStats();
    updateButtons();


    function addPointTo(stat) {
        if (isAdding && amount > 0) {
            stat.value++;
            amount--;
        }

        if (!isAdding && stat.value < stat.startingValue) {
            stat.value++;
            amount++;
        }

        updateButtons();
        updateStats();
        updateMessage();
    }

    function removePointFrom(stat) {
        if (stat.value <= stat.minValue) {
            return;
        }

        if (isAdding && stat.value > stat.startingValue) {
            stat.value--;
            amount++;
        }
        
        if (!isAdding && amount > 0) {
            stat.value--;
            amount--;
        }

        updateButtons();
        updateStats();
        updateMessage();
    }

    function updateStats() {
        //console.log(`updating stats - PV : ${hitPoints.value}, FO: ${strength.value}, VI : ${speed.value}, MA : ${magic.value}`)
        txtStatsAdjustmentHitPoints.innerText = hitPoints.value;
        txtStatsAdjustmentStrength.innerText = strength.value;
        txtStatsAdjustmentSpeed.innerText = speed.value;
        txtStatsAdjustmentMagic.innerText = magic.value;
    }

    function updateMessage() {
        let message = ``;

        if (amount > 0) {
            message = `Ton état de Non-Être est toujours trop fragile. Ajoute encore ${amount} point`;

            if (amount == 1) {
                message += ` à la caractéristique de ton choix.`;
                gameMessage(message);
                return;
            }

            message += `s répartis comme tu le souhaites parmi tes caractéristiques.`;
        }

        if (amount < 0) {
            message = `Ton état de Non-Être est toujours trop instable. Enlève encore ${amount} point`;

            if (amount == 1) {
                message += ` à la caractéristique de ton choix.`;
                gameMessage(message);
                return;
            }

            message += `s répartis de la façon dont tu le désire parmi tes caractéristiques.`;
        }

        if (amount == 0) {
            message = `Ça y est ! Ton état de Non-Être est suffisamment stable. Confirme l'ajustement de tes caractéristiques.`;
        }

        gameMessage(message);
    }

    function updateButtons() {
        // Default buttons setup
        btnAddHitPoint.disabled = false;
        btnAddStrength.disabled = false;
        btnAddSpeed.disabled = false;
        btnAddMagic.disabled = false;
        btnRemoveHitPoint.disabled = false;
        btnRemoveStrength.disabled = false;
        btnRemoveSpeed.disabled = false;
        btnRemoveMagic.disabled = false;
        btnConfirmStatsAdjustment.disabled = true;

        // Then we deactivate buttons that should be.
        if (amount == 0) {
            if (isAdding) {
                btnAddHitPoint.disabled = true;
                btnAddStrength.disabled = true;
                btnAddSpeed.disabled = true;
                btnAddMagic.disabled = true;
            }
            else {
                btnRemoveHitPoint.disabled = true;
                btnRemoveStrength.disabled = true;
                btnRemoveSpeed.disabled = true;
                btnRemoveMagic.disabled = true;
            }

            btnConfirmStatsAdjustment.disabled = false;
        }

        if (hitPoints.value == hitPoints.startingValue) {
            if (isAdding) {
                btnRemoveHitPoint.disabled = true;
            }
            else {
                btnAddHitPoint.disabled = true;
            }
        }

        if (strength.value == strength.startingValue) {
            if (isAdding) {
                btnRemoveStrength.disabled = true;
            }
            else {
                btnAddStrength.disabled = true;
            }
        }

        if (speed.value == speed.startingValue) {
            if (isAdding) {
                btnRemoveSpeed.disabled = true;
            }
            else {
                btnAddSpeed.disabled = true;
            }
        }

        if (magic.value == magic.startingValue) {
            if (isAdding) {
                btnRemoveMagic.disabled = true;
            }
            else {
                btnAddMagic.disabled = true;
            }
        }

        if (hitPoints.value == hitPoints.minValue) {
            btnRemoveHitPoint.disabled = true;
        }

        if (strength.value == strength.minValue) {
            btnRemoveStrength.disabled = true;
        }

        if (speed.value == speed.minValue) {
            btnRemoveSpeed.disabled = true;
        }

        if (magic.value == magic.minValue) {
            btnRemoveMagic.disabled = true;
        }
    }

    function confirmStatsAdjustment() {
        player.race = {
            name: "Non-Être",
            hitPoints: hitPoints.value,
            strength: strength.value,
            speed: speed.value,
            magic: magic.value
        }

        player.restoreHealth();
        player.updateVisuals();
        console.log(player);

        //TODO: next game step
    }
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
        player.goldCoins += reward.goldCoins;
        feedbackMessage += ` Tu reçois ${reward.goldCoins} pièces d'or`;

        if (reward.actionPoints) {
            player.actionPoints += reward.actionPoints;
            feedbackMessage += ` et ${reward.actionPoints} point d'action`;
        }
    }

    if (lastDrawnCard.suit == "swords") {
        let reward = structuredClone(swordsItemsTable[lastDrawnCard.value - 1]);
        reward.equipped = false;
        player.inventory.add(reward);
        //addToInventory(reward);
        feedbackMessage += ` Tu reçois ${reward.preposition}${reward.name} (${reward.description})`;
        //console.log(inventory);
    }

    feedbackMessage += `.`;
    gameMessage(feedbackMessage);
}

function generateIntelligentBeing(roll) {
    let being = structuredClone(intelligentRacesTable[roll - 1]);

    // Non-Being special rule
    if (being.name == "Non-Être") {
        being = generateNonBeing();
    }

    // Hybrid special rule
    if (being.name == "Hybride") {
        being = generateHybrid();
    }

    console.log("Race intelligente générée : " + being)
    return being;
}

function generateNonBeing() {
    let being = {}

    being.name = "Non-Être"

    // Generate stats
    being.hitPoints = d100.roll();
    being.strength = d100.roll()
    being.speed = d100.roll()
    being.magic = d100.roll()

    adjustGeneratedNonBeing(being);

    function adjustGeneratedNonBeing(being) {
        const totalStats = being.hitPoints + being.strength + being.speed + being.magic;
        console.log(`Non-Être généré avec ${totalStats} points de stats totales.`)
        
        //Check if over powered
        if (totalStats > 300) {
            let adjustmentPoints = 50
    
            // Remove 50 points by priority (HitPoints should not be touched as d100 of hit points is already low or just OK)
            while (adjustmentPoints > 0) {
                // We prioritize removing from Strength if it is lower or roughly the same as Magic
                if (being.magic + 5 >= being.strength && being.strength > 1) {
                    being.strength--
                    adjustmentPoints--
                    return
                }
    
                // We remove from Magic if it significantly lower than Strength
                if (being.magic + 5 < being.strength && being.magic > 1) {
                    being.magic--
                    adjustmentPoints--
                    return
                }
    
                // We round down our best damage stat to its nearest multiple of 5
                if (being.magic > being.strength && being.magic % 5 != 0 && being.magic > 1) {
                    being.magic--
                    adjustmentPoints--
                    return
                }
                if (being.strength > being.magic && being.strength % 5 != 0 && being.strength > 1) {
                    being.strength--
                    adjustmentPoints--
                    return
                }
    
                // We reduce speed to a good enough level (too high is rarely useful)
                if (being.speed > 71) {
                    being.speed--
                    adjustmentPoints--
                    return
                }
    
                // If we still need to remove points after all that, we remove from speed
                if (being.speed > 1) {
                    being.speed--
                    adjustmentPoints--
                    return
                }
    
                // And just to be sure we remove from HitPoints if we still need to remove points (which should not mathematically happen)
                if (being.hitPoints > 1) {
                    being.hitPoints--
                    adjustmentPoints--
                    return
                }
    
                throw new Error("Over powered Non-Being adjustment algorithm is broken.");
            }
        }
    
        // Check if under powered
        if (totalStats < 200) {
            let adjustmentPoints = 200 - totalStats
    
            while (adjustmentPoints > 0) {
                // We prioritize having decent HitPoints
                if (being.hitPoints < 70) {
                    being.hitPoints++
                    adjustmentPoints--
                    return
                }
    
                // Then, we go for a decent damage stat (we go for Magic if it is roughly the same or we go for our best stat)
                if (being.magic + 5 >= being.strength && being.magic < 70) {
                    being.magic++
                    adjustmentPoints--
                    return
                }
                if (being.magic + 5 < being.strength && being.strength < 70) {
                    being.strength++
                    adjustmentPoints--
                    return 
                }
    
                // Then, we try to get to a decent speed
                if (being.speed < 51) {
                    being.speed++
                    adjustmentPoints--
                    return
                }
    
                // Finally we dump the remaining points in HitPoints
                being.hitPoints++
                adjustmentPoints--
            }
        }
    
        return being
    }
    
    return being
}

function generateHybrid() {
    let hybrid = {}
    let beingA = {}
    let beingB = {}

    beingA.name = "Hybride"
    beingB.name = "Hybride"

    // Generate first half
    while (beingA.name == "Hybride") {
        beingA = structuredClone(intelligentRacesTable[d20.roll() - 1])

        // Non-Being special rule
        if (beingA.name == "Non-Être") {
            beingA = generateNonBeing();
        }
    }

    // Generate second half
    while (beingB.name == "Hybride" || beingB.name == beingA.name) {
        beingB = structuredClone(intelligentRacesTable[d20.roll() - 1])

        // Non-Being special rule
        if (beingB.name == "Non-Être") {
            beingB = generateNonBeing();
        }
    }

    hybrid.name = `Hybride ${beingA.name}-${beingB.name}`
    hybrid.hitPoints = Math.round((beingA.hitPoints + beingB.hitPoints) * 0.5)
    hybrid.strength = Math.round((beingA.strength + beingB.strength) * 0.5)
    hybrid.speed = Math.round((beingA.speed + beingB.speed) * 0.5)
    hybrid.magic = Math.round((beingA.magic + beingB.magic) * 0.5)

    return hybrid
}

function generateMonster(roll) {
    let monster = structuredClone(monstersTable[roll - 1]);

    if (monster.name == "Parasite") {
        monster = generateIntelligentBeing(d20.roll());
        monster.name += " parasité"
    }
    if (monster.name == "Métamorphe") {
        monster.hitPoints = d100.roll()
        monster.strength = clamp( d100.roll() - 30, 10, 100 )
        monster.speed = clamp( d100.roll() - 30, 10, 100 )
        monster.magic = clamp( d100.roll() - 30, 10, 100 )
    }

    console.log(`Monstre généré : ` + roll)
    console.log(monster)
    return monster
}

function gameMessage(text) {
    txtDungeonMaster.innerText = text;
}

function updateLastDrawnCard(card) {
    imgLastDrawnCard.setAttribute("src", card.imageURL);
    imgLastDrawnCard.setAttribute("alt", card.description);
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
        player.inventory.slots.forEach(inventoryItem => {
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
    player.updateVisuals();
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
    player.updateVisuals();
}
