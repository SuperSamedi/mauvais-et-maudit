//#region DOM links
const txtDungeonMaster = document.getElementById("dungeon-master-text");

const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const btnRaceRoll = document.getElementById("btn-race-roll");
const btnTraitRoll = document.getElementById("btn-trait-roll");
const btnCardDraw = document.getElementById("btn-card-draw");

const imgDeck = document.getElementById("deck");
const zoneCardsDrawn = document.getElementById("cards-drawn")

const btnInventoryCheckMarks = Array.from(document.getElementsByClassName("equipped-check-mark"));

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

const btnVisitShop = document.getElementById("btn-visit-shop");
//#endregion

const player = new Player();
// console.log(player);
const d20 = new Dice(20);
const d100 = new Dice(100);

let intelligentRacesTable = [];
let weakTraitsTable = []
let strongTraitsTable = [];
let monstersTable = [];

let scopaDeck = [];
let coinsItemsTable = [];
let swordsItemsTable = [];
// let clubsItemsTable = [];
// let cupsItemsTable = [];

let lastDrawnCard = {};
let allowedToDraw = true;
let allCardsCountAsCoins = false;

btnRaceRoll.onclick = choosePlayerRace;
btnTraitRoll.onclick = choosePlayerTrait;
btnCardDraw.onclick = () => {
    allowedToDraw = true;
};

btnInventoryCheckMarks.forEach((checkMark) => {
    checkMark.addEventListener("click", (e) => {
        if (player.inventory.slots[e.target.dataset["number"]].equip()) {
            checkMark.innerText = "X";
            return;
        }
        checkMark.innerText = "";
    });
});

btnFightMonster.onclick = () => { fightMonster(d20.roll()) }
btnVisitShop.onclick = () => { visitShop() }

imgDeck.onclick = () => {
    if (allowedToDraw) {
        draw();
    }
};


// #region Extract data from jsons
fetch("resources/data-tables/intelligent-races.json")
    .then((response) => {
        return response.json();
    })
    .then((loadedData) => {
        intelligentRacesTable = loadedData;
        //console.log(intelligentRacesTable);
    })
    .catch((error) => {
        // TODO: create a 500 code page
        console.error(error);
    });

fetch("resources/data-tables/strong-traits.json")
    .then((response) => {
        return response.json();
    })
    .then((loadedData) => {
        strongTraitsTable = loadedData;
        //console.log(strongTraitsTable);
    })
    .catch((error) => {
        //TODO: create a 500 code page
        console.error(error);
    });

fetch("resources/data-tables/monsters.json")
    .then((response) => {
        return response.json();
    })
    .then((loadedData) => {
        monstersTable = loadedData;
        //console.log(intelligentRacesTable);
    })
    .catch((error) => {
        // TODO: create a 500 code page
        console.error(error);
    });

fetch("resources/data-tables/scopa-cards.json")
    .then((response) => {
        return response.json();
    })
    .then((loadedData) => {
        scopaDeck = loadedData;
        shuffle(scopaDeck);
        //console.log(scopaDeck);
    })
    .catch((error) => {
        //TODO: create a 500 code page
        console.error(error);
    });

fetch("resources/data-tables/coins-items.json")
    .then((response) => {
        return response.json();
    })
    .then((loadedData) => {
        coinsItemsTable = loadedData;
        //console.log(coinsItemsTable);
    })
    .catch((error) => {
        //TODO: create a 500 code page
        console.error(error);
    });

fetch("resources/data-tables/swords-items.json")
    .then((response) => {
        return response.json();
    })
    .then((loadedData) => {
        swordsItemsTable = loadedData;
        //console.log(swordsItemsTable);
    })
    .catch((error) => {
        //TODO: create a 500 code page
        console.error(error);
    });

fetch("resources/data-tables/weak-traits.json")
    .then((response) => {
        return response.json();
    })
    .then((loadedData) => {
        weakTraitsTable = loadedData;
        //console.log(intelligentRacesTable);
    })
    .catch((error) => {
        // TODO: create a 500 code page
        console.error(error);
    });

// #endregion

//#region TESTS
// let roll = 1
// console.log(d20.reducedRoll(roll, 4));
// roll = 2
// console.log(d20.reducedRoll(roll, 4));
// roll = 3
// console.log(d20.reducedRoll(roll, 4));
// roll = 4
// console.log(d20.reducedRoll(roll, 4));
// roll = 5
// console.log(d20.reducedRoll(roll, 4));
// roll = 6
// console.log(d20.reducedRoll(roll, 4));
// roll = 7
// console.log(d20.reducedRoll(roll, 4));
// roll = 8
// console.log(d20.reducedRoll(roll, 4));
// roll = 9
// console.log(d20.reducedRoll(roll, 4));
// roll = 10
// console.log(d20.reducedRoll(roll, 4));
// roll = 11
// console.log(d20.reducedRoll(roll, 4));
// roll = 12
// console.log(d20.reducedRoll(roll, 4));
// roll = 13
// console.log(d20.reducedRoll(roll, 4));
// roll = 14
// console.log(d20.reducedRoll(roll, 4));
// roll = 15
// console.log(d20.reducedRoll(roll, 4));
// roll = 16
// console.log(d20.reducedRoll(roll, 4));
// roll = 17
// console.log(d20.reducedRoll(roll, 4));
// roll = 18
// console.log(d20.reducedRoll(roll, 4));
// roll = 19
// console.log(d20.reducedRoll(roll, 4));
// roll = 20
// console.log(d20.reducedRoll(roll, 4));
//#endregion

function choosePlayerRace() {
    const roll = d20.roll();

    let hybridRaceA = {};
    let hybridRaceB = {};
    // const roll = getRandomInt(intelligentRacesTable.length) + 1;

    player.race = structuredClone(intelligentRacesTable[roll - 1]);
    //console.log(intelligentRacesTable);

    // Non-Being special rule
    if (player.race.name == "Non-Être") {
        player.restoreHitPoints();
        player.updateAllVisuals();
        generateNonBeingPlayer(player.race, false);
        return;
    }

    // Hybrid special rule
    if (player.race.name == "Hybride") {
        player.updateAllVisuals();
        generateHybridPlayer();
        return;
    }

    gameMessage(`${roll} ! - ${player.race.name}`);

    player.restoreHitPoints();
    player.updateRaceVisuals();
    player.updateStatsVisuals();

    //#region Non-Being Player Generation
    function generateNonBeingPlayer(being, isGeneratingHybrid) {
        gameMessage(`19 ! - Non-Être.
        Les Non-Êtres sont des créatures instables. Tu vas devoir tirer tes stats au hasard.
        Lance un D100 pour tes points de vie.`);
        btn1.innerText = "Lancer un D100";
        btn1.onclick = generateNonBeingHitPoints;

        function generateNonBeingHitPoints() {
            const roll = d100.roll();

            being.hitPoints = roll;

            if (!isGeneratingHybrid) {
                player.restoreHitPoints();
            }

            gameMessage(`${roll} !
        Maintenant lance à nouveau un D100 pour ta stat de force.`);

            btn1.onclick = generateNonBeingStrength;
        }

        function generateNonBeingStrength() {
            const roll = d100.roll();

            being.strength = roll;

            if (!isGeneratingHybrid) {
                player.updateAllVisuals();
            }

            gameMessage(`${roll} !
        Maintenant lance encore un D100 pour ta stat de vitesse.`);

            btn1.onclick = generateNonBeingSpeed;
        }

        function generateNonBeingSpeed() {
            const roll = d100.roll();

            being.speed = roll;

            if (!isGeneratingHybrid) {
                player.updateAllVisuals();
            }

            gameMessage(`${roll} !
        Et enfin, lance un D100 pour ta stat de magie.`);

            btn1.onclick = generateNonBeingMagic;
        }

        function generateNonBeingMagic() {
            const roll = d100.roll();

            being.magic = roll;

            if (!isGeneratingHybrid) {
                player.updateAllVisuals();
            }

            gameMessage(
                `${roll} !
            Ça y est ! Voyons maintenant si ton état de Non-Être est suffisamment stable.`
            );
            btn1.innerText = "Vérifier";
            btn1.onclick = () => { checkNonBeingStability(being) }
        }

        function checkNonBeingStability(being) {
            const totalStats =
                being.hitPoints + being.strength + being.speed + being.magic;

            if (totalStats < 200) {
                const pointsToAdd = 200 - totalStats;
                let message = `Ton état de Non-Être est trop fragile. Tu vas devoir rajouter ${pointsToAdd} point`;

                if (pointsToAdd == 1) {
                    message += ` à la caractéristique de ton choix.`;
                    gameMessage(message);
                    adjustStats(being, pointsToAdd, true);
                    return;
                }

                message += `s répartis comme tu le souhaites parmi tes caractéristiques.`;

                gameMessage(message);
                adjustStats(being, pointsToAdd, true);
                return;
            }

            if (totalStats > 300) {
                gameMessage(
                    `Ton état de Non-Être est trop instable. Tu vas devoir enlever 50 points répartis de la façon dont tu le désire parmi tes caractéristiques.`
                );
                adjustStats(being, 50, false);
                return;
            }

            gameMessage(`C'est bon ! Ton état de Non-Être est suffisamment stable.`);

            if (isGeneratingHybrid) {
                generateHybridPlayer();
            }
        }

        function adjustStats(being, amount, isAdding) {
            const hitPoints = {
                value: 0,
                minValue: 1,
                startingValue: 0,
            };
            const strength = {
                value: 0,
                minValue: 0,
                startingValue: 0,
            };
            const speed = {
                value: 0,
                minValue: 0,
                startingValue: 0,
            };
            const magic = {
                value: 0,
                minValue: 0,
                startingValue: 0,
            };

            hitPoints.value += being.hitPoints;
            strength.value += being.strength;
            speed.value += being.speed;
            magic.value += being.magic;

            hitPoints.startingValue = hitPoints.value;
            strength.startingValue = strength.value;
            speed.startingValue = speed.value;
            magic.startingValue = magic.value;

            btnAddHitPoint.onclick = () => { addPointTo(hitPoints) }
            btnAddStrength.onclick = () => { addPointTo(strength) }
            btnAddSpeed.onclick = () => { addPointTo(speed) }
            btnAddMagic.onclick = () => { addPointTo(magic) }
            btnRemoveHitPoint.onclick = () => { removePointFrom(hitPoints) }
            btnRemoveStrength.onclick = () => { removePointFrom(strength) }
            btnRemoveSpeed.onclick = () => { removePointFrom(speed) }
            btnRemoveMagic.onclick = () => { removePointFrom(magic) }
            btnConfirmStatsAdjustment.onclick = () => { confirmStatsAdjustment(being, isGeneratingHybrid) }

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
                    } else {
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
                    } else {
                        btnAddHitPoint.disabled = true;
                    }
                }

                if (strength.value == strength.startingValue) {
                    if (isAdding) {
                        btnRemoveStrength.disabled = true;
                    } else {
                        btnAddStrength.disabled = true;
                    }
                }

                if (speed.value == speed.startingValue) {
                    if (isAdding) {
                        btnRemoveSpeed.disabled = true;
                    } else {
                        btnAddSpeed.disabled = true;
                    }
                }

                if (magic.value == magic.startingValue) {
                    if (isAdding) {
                        btnRemoveMagic.disabled = true;
                    } else {
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

            function confirmStatsAdjustment(being, isGeneratingHybrid) {
                being.name = "Non-Être";
                being.hitPoints = hitPoints.value;
                (being.strength = strength.value),
                    (being.speed = speed.value),
                    (being.magic = magic.value);

                if (isGeneratingHybrid) {
                    generateHybridPlayer();
                    return;
                }

                player.restoreHitPoints();
                player.updateAllVisuals();
                console.log(player);

                //TODO: next game step
            }
        }
    }

    //#endregion

    //#region Hybrid Player Generation
    function generateHybridPlayer() {
        btn1.innerText = "Lancer un D20";

        // First come around
        if (!hybridRaceA.name) {
            gameMessage(`20 ! - Hybride.
            Tu vas devoir tirer deux races séparément. Ta race finale sera un mélange des deux.
            Lance un D20 pour ta première race.`);
            btn1.onclick = generateHybridPlayerFirstHalf;
            return;
        }
        // Second come around (after 1st half non-being)
        if (!hybridRaceB.name) {
            gameMessage(`Lance maintenant un D20 pour ta deuxième race.`);
            btn1.onclick = generateHybridPlayerSecondHalf;
            return;
        }

        // Final
        player.race.name = `Hybride ${hybridRaceA.name}-${hybridRaceB.name}`;
        player.race.hitPoints = Math.round(
            (hybridRaceA.hitPoints + hybridRaceB.hitPoints) * 0.5
        );
        player.race.strength = Math.round(
            (hybridRaceA.strength + hybridRaceB.strength) * 0.5
        );
        player.race.speed = Math.round(
            (hybridRaceA.speed + hybridRaceB.speed) * 0.5
        );
        player.race.magic = Math.round(
            (hybridRaceA.magic + hybridRaceB.magic) * 0.5
        );

        player.restoreHitPoints();
        player.updateAllVisuals();

        // TODO: Next Game Step

        function generateHybridPlayerFirstHalf() {
            const roll = d20.roll();

            hybridRaceA = structuredClone(intelligentRacesTable[roll - 1]);

            // Hybrid exception
            if (hybridRaceA.name == "Hybride") {
                gameMessage(`${roll} ! ${hybridRaceA.name} à nouveau. Relance.`);
                btn1.innerText = "Relancer un D20";
                return;
            }

            // Non-Being special rule
            if (hybridRaceA.name == "Non-Être") {
                player.race.name += ` ${hybridRaceA.name}`;
                player.updateAllVisuals();
                generateNonBeingPlayer(hybridRaceA, true); // Sends us back to generateHybridPlayer at the end
                return;
            }

            gameMessage(
                `${roll} ! ${hybridRaceA.name}. Maintenant, lance de nouveau un D20 pour ta deuxième race.`
            );
            btn1.innerText = "Lancer un D20";
            btn1.onclick = generateHybridPlayerSecondHalf;
            player.race.name += ` ${hybridRaceA.name}`;
            player.updateAllVisuals();
        }

        function generateHybridPlayerSecondHalf() {
            const roll = d20.roll();

            hybridRaceB = structuredClone(intelligentRacesTable[roll - 1]);

            if (
                hybridRaceB.name == "Hybride" ||
                hybridRaceB.name == hybridRaceA.name
            ) {
                gameMessage(`${roll} ! ${hybridRaceB.name} à nouveau. Relance.`);
                btn1.innerText = "Relancer un D20";
                return;
            }

            if (hybridRaceB.name == "Non-Être") {
                player.race.name += `-${hybridRaceB.name}`;
                player.updateAllVisuals();
                generateNonBeingPlayer(hybridRaceB, true);
                return;
            }

            player.race.name += `-${hybridRaceB.name}`;
            player.updateAllVisuals();
            gameMessage(`${roll} ! ${hybridRaceB.name}.`);
            generateHybridPlayer(hybridRaceA, hybridRaceB);
        }
    }

    //#endregion
}

function choosePlayerTrait() {
    const roll = getRandomInt(strongTraitsTable.length) + 1;

    player.traits[0] = structuredClone(strongTraitsTable[roll - 1]);

    gameMessage(`${roll} ! - ${player.traits[0].name}`);

    player.restoreHitPoints();
    player.updateTraitVisuals();
    player.updateStatsVisuals();
}

function draw() {
    allowedToDraw = false;

    if (scopaDeck.length <= 0) {
        gameMessage("La pioche est vide...");
        return;
    }

    let feedbackMessage = "";
    lastDrawnCard = structuredClone(scopaDeck.shift());
    //console.log(scopaDeck);
    updateLastDrawnCard(lastDrawnCard);
    feedbackMessage += `${lastDrawnCard.description} !`;

    if (lastDrawnCard.suit == "coins" || allCardsCountAsCoins) {
        let reward = structuredClone(coinsItemsTable[lastDrawnCard.value - 1]);
        player.goldCoins += reward.goldCoins;
        feedbackMessage += ` 
        Tu reçois ${reward.goldCoins} pièces d'or`;

        if (reward.actionPoints) {
            player.actionPoints += reward.actionPoints;
            feedbackMessage += ` et ${reward.actionPoints} point d'action`;
        }
    }

    if (lastDrawnCard.suit == "swords" && !allCardsCountAsCoins) {
        let reward = new SwordsItem(structuredClone(swordsItemsTable[lastDrawnCard.value - 1]));
        player.inventory.add(reward);
        feedbackMessage += ` 
        Tu reçois ${reward.preposition}${reward.name} (${reward.description})`;
        //console.log(inventory);
    }

    feedbackMessage += `.`;
    gameMessage(feedbackMessage);
    allCardsCountAsCoins = false
}

function generateIntelligentBeing(roll) {
    let being = new Being(structuredClone(intelligentRacesTable[roll - 1]))

    // Non-Being special rule
    if (being.race.name == "Non-Être") {
        being.race = generateNonBeing();
    }

    // Hybrid special rule
    if (being.race.name == "Hybride") {
        being.race = generateHybrid();
    }

    function generateNonBeing() {
        let being = {};

        being.name = "Non-Être";

        // Generate stats
        being.hitPoints = d100.roll();
        being.strength = d100.roll();
        being.speed = d100.roll();
        being.magic = d100.roll();

        adjustGeneratedNonBeing(being);

        function adjustGeneratedNonBeing(being) {
            const totalStats =
                being.hitPoints + being.strength + being.speed + being.magic;
            console.log(
                `Non-Être généré avec ${totalStats} points de stats totales.`
            );

            //Check if over powered
            if (totalStats > 300) {
                let adjustmentPoints = 50;

                // Remove 50 points by priority (HitPoints should not be touched as d100 of hit points is already low or just OK)
                while (adjustmentPoints > 0) {
                    // We prioritize removing from Strength if it is lower or roughly the same as Magic
                    if (being.magic + 5 >= being.strength && being.strength > 1) {
                        being.strength--;
                        adjustmentPoints--;
                        continue;
                    }

                    // We remove from Magic if it significantly lower than Strength
                    if (being.magic + 5 < being.strength && being.magic > 1) {
                        being.magic--;
                        adjustmentPoints--;
                        continue;
                    }

                    // We round down our best damage stat to its nearest multiple of 5
                    if (
                        being.magic > being.strength &&
                        being.magic % 5 != 0 &&
                        being.magic > 1
                    ) {
                        being.magic--;
                        adjustmentPoints--;
                        continue;
                    }
                    if (
                        being.strength > being.magic &&
                        being.strength % 5 != 0 &&
                        being.strength > 1
                    ) {
                        being.strength--;
                        adjustmentPoints--;
                        continue;
                    }

                    // We reduce speed to a good enough level (too high is rarely useful)
                    if (being.speed > 71) {
                        being.speed--;
                        adjustmentPoints--;
                        continue;
                    }

                    // If we still need to remove points after all that, we remove from speed
                    if (being.speed > 1) {
                        being.speed--;
                        adjustmentPoints--;
                        continue;
                    }

                    // And just to be sure we remove from HitPoints if we still need to remove points (which should not mathematically happen)
                    if (being.hitPoints > 1) {
                        being.hitPoints--;
                        adjustmentPoints--;
                        continue;
                    }

                    throw new Error(
                        "Over powered Non-Being adjustment algorithm is broken."
                    );
                }
            }

            // Check if under powered
            if (totalStats < 200) {
                let adjustmentPoints = 200 - totalStats;

                while (adjustmentPoints > 0) {
                    // We prioritize having decent HitPoints
                    if (being.hitPoints < 70) {
                        being.hitPoints++;
                        adjustmentPoints--;
                        continue;
                    }

                    // Then, we go for a decent damage stat (we go for Magic if it is roughly the same or we go for our best stat)
                    if (being.magic + 5 >= being.strength && being.magic < 70) {
                        being.magic++;
                        adjustmentPoints--;
                        continue;
                    }
                    if (being.magic + 5 < being.strength && being.strength < 70) {
                        being.strength++;
                        adjustmentPoints--;
                        continue;
                    }

                    // Then, we try to get to a decent speed
                    if (being.speed < 51) {
                        being.speed++;
                        adjustmentPoints--;
                        continue;
                    }

                    // Finally we dump the remaining points in HitPoints
                    being.hitPoints++;
                    adjustmentPoints--;
                }
            }

            return being;
        }

        return being;
    }

    function generateHybrid() {
        let hybrid = {};
        let beingA = {};
        let beingB = {};

        beingA.name = "Hybride";
        beingB.name = "Hybride";

        // Generate first half
        while (beingA.name == "Hybride") {
            beingA = structuredClone(intelligentRacesTable[d20.roll() - 1]);

            // Non-Being special rule
            if (beingA.name == "Non-Être") {
                beingA = generateNonBeing();
            }
        }

        // Generate second half
        while (beingB.name == "Hybride" || beingB.name == beingA.name) {
            beingB = structuredClone(intelligentRacesTable[d20.roll() - 1]);

            // Non-Being special rule
            if (beingB.name == "Non-Être") {
                beingB = generateNonBeing();
            }
        }

        hybrid.name = `Hybride ${beingA.name}-${beingB.name}`;
        hybrid.hitPoints = Math.round((beingA.hitPoints + beingB.hitPoints) * 0.5);
        hybrid.strength = Math.round((beingA.strength + beingB.strength) * 0.5);
        hybrid.speed = Math.round((beingA.speed + beingB.speed) * 0.5);
        hybrid.magic = Math.round((beingA.magic + beingB.magic) * 0.5);

        return hybrid;
    }

    // TODO: Add trait based on level parameter (1 to 4)

    being.restoreHitPoints();
    return being;
}

function generateMonster(roll) {
    let monster = new Being(structuredClone(monstersTable[roll - 1]));

    if (monster.race.name == "Parasite") {
        monster = generateIntelligentBeing(d20.roll());
        monster.race.name += ` ${monster.race.sex == "F" ? "parasitée" : "parasité"}`;
    }

    if (monster.race.name == "Métamorphe") {
        monster.race.hitPoints = d100.roll();
        monster.race.strength = clamp(d100.roll() - 30, 10, 100);
        monster.race.speed = clamp(d100.roll() - 30, 10, 100);
        monster.race.magic = clamp(d100.roll() - 30, 10, 100);
    }

    monster.restoreHitPoints();

    console.log(`Monstre généré - id : ` + roll);
    console.log(monster);
    return monster;
}

function gameMessage(text) {
    txtDungeonMaster.innerText = text;
}

function updateLastDrawnCard(card) {
    imgDeck.setAttribute("src", card.imageURL);
    imgDeck.setAttribute("alt", card.description);
}

// function equip(item) {
//     if (item == undefined) return false;

//     if (!item.equippable) return false;

//     if (item.equipped === true) {
//         unequip(item);
//         return false;
//     }

//     if (item.type == "weapon") {
//         let otherWeaponAlreadyEquipped = false;
//         // console.log("Is Weapon !");
//         player.inventory.slots.forEach((inventoryItem) => {
//             if (inventoryItem.type == "weapon" && inventoryItem.equipped == true) {
//                 console.log("Found another weapon already equipped.");
//                 otherWeaponAlreadyEquipped = true;
//                 return;
//             }
//         });

//         if (otherWeaponAlreadyEquipped == true) return false;
//     }

//     item.equipped = true;
//     //console.log(inventory);
//     player.updateStatsVisuals();
//     return true;
// }

// function unequip(item) {
//     if (item == undefined) {
//         return;
//     }

//     if (!item.equippable) {
//         return;
//     }

//     item.equipped = false;
//     //console.log(inventory);
//     player.updateStatsVisuals();
// }

//#region Combat vs Monster
function fightMonster(roll) {
    const monster = generateMonster(roll);
    console.log(`Fighting : Monster}`);

    gameMessage(
        `${monster.race.sex == "F" ? "Une" : "Un"} ${monster.race.name} vous barre la route. Le combat est inévitable.`
    );

    btn1.innerText = "Commencer le combat";
    btn1.onclick = phaseInitiative;

    function phaseInitiative() {
        if (playerHasInitiative()) {
            gameMessage(`Tu es plus rapide que ${beingNameWithDeterminantDefini(monster, true)}. C'est à ton tour d'attaquer.`)

            btn1.innerText = "Attaquer"
            btn1.onclick = () => { playerAttack() }

            return
        }

        gameMessage(`${beingNameWithDeterminantDefini(monster, false)} est plus rapide que toi, ${monster.race.sex == "F" ? "elle" : "il"} attaque en premier.`)

        btn1.innerText = "Continuer"
        btn1.onclick = () => { monsterAttack(); }
    }

    function playerAttack() {
        let damage = 0;

        gameMessage(`C'est à ton tour d'attaquer. Veux-tu faire une attaque physique ou une attaque magique ?`)

        btn1.innerText = "Attaque physique"
        btn1.onclick = () => { decideIfPowerful(true) }

        btn2.classList.remove("hidden")
        btn2.innerText = "Attaque magique"
        btn2.onclick = () => { decideIfPowerful(false) }

        function decideIfPowerful(isPhysical) {
            if (player.actionPoints > 0) {
                gameMessage(`Voulez-vous utiliser un point d'action pour effectuer une attaque puissante ? (Vous pourrez lancer deux D100 à la place de un seul.)`)

                btn1.innerText = "Oui"
                btn1.onclick = () => { powerfulAttack(isPhysical) }

                btn2.classList.remove("hidden")
                btn2.innerText = "Non"
                btn2.onclick = () => { normalAttack(isPhysical) }

                return
            }

            normalAttack(isPhysical)
        }

        function powerfulAttack(isPhysical) {
            player.actionPoints -= 1

            gameMessage(`Très bien, Tu utilises un point d'action pour effectuer une attaque puissante.
                Lance un premier D100 pour voir combien de dégâts tu vas infliger.`)

            btn2.classList.add("hidden")
            btn1.innerText = "Lancer un D100"
            btn1.onclick = () => {
                const firstRoll = d100.roll()
                damage += firstRoll;
                secondRoll(firstRoll)
            }

            function secondRoll(firstRoll) {
                gameMessage(`${firstRoll} ! 
                    Maintenant lance ton D100 bonus.`)

                btn1.onclick = () => {
                    const secondRoll = d100.roll()
                    damage += secondRoll
                    inflictDamage(isPhysical, secondRoll)
                }
            }
        }

        function normalAttack(isPhysical) {
            gameMessage(`Très bien, lance un D100 pour voir combien de dégâts tu vas infliger.`)

            btn2.classList.add("hidden")
            btn1.innerText = "Lancer un D100"
            btn1.onclick = () => {
                const roll = d100.roll()
                damage += roll;
                inflictDamage(isPhysical, roll)
            }
        }

        function inflictDamage(isPhysical, finalRoll) {
            let message = `${finalRoll} !`

            btn1.innerText = "Continuer"
            btn1.onclick = () => {
                if (isBeingDead(monster)) {
                    fightIsWon()
                    return
                }

                // If we attacked first , it's the monster's turn
                if (playerHasInitiative()) {
                    monsterAttack()
                    return
                }

                newTurn();
            }

            // Magical Hit
            if (!isPhysical) {
                damage = clamp(damage + player.magic - monster.magic, 0, Infinity)
                monster.hitPoints -= damage

                message += `
                Tu infliges un total de ${damage} ${damage <= 1 ? "dégât magique" : "dégâts magiques"} ${beingNameWithDeterminantDefiniContracte(monster, 'à')}.`
                gameMessage(message)

                return
            }

            // Physical Hit
            damage = clamp(damage + player.strength - monster.speed, 0, Infinity)
            monster.hitPoints -= damage

            message += `
            Tu infliges un total de ${damage} ${damage <= 1 ? "dégât physique" : "dégâts physiques"} ${beingNameWithDeterminantDefiniContracte(monster, 'à')}.`

            gameMessage(message)
        }

    }

    function monsterAttack() {
        console.log("Phase : Monster Attack");
        let damage = 0

        gameMessage(`C'est au tour ${beingNameWithDeterminantDefiniContracte(monster, "de")} d'attaquer.`)

        btn1.innerText = "Continuer"
        btn1.onclick = () => { selectAttackType() }

        function selectAttackType() {
            // If both stats are equal we choose the version with the most damaging potential
            if (monster.strength == monster.magic) {
                const potentialPhysicalDamage = monster.strength - player.speed
                const potentialMagicalDamage = monster.magic - player.magic

                if (potentialMagicalDamage > potentialPhysicalDamage) {
                    inflictDamage(false);
                    return
                }

                inflictDamage(true);
                return
            }

            if (monster.magic > monster.strength) {
                inflictDamage(false);
                return;
            }

            inflictDamage(true);
        }

        function inflictDamage(isPhysical) {
            btn1.innerText = "Continuer"
            btn1.onclick = () => {
                if (isBeingDead(player)) {
                    gameOver()
                    return
                }

                // If we attacked first it's time for a new turn
                if (playerHasInitiative()) {
                    newTurn();
                    return
                }

                playerAttack()
            }

            // Magical Hit
            if (!isPhysical) {
                const roll = d100.roll()
                console.log(`The monster rolls a ${roll} - Magical`);
                damage = clamp(monster.magic + roll - player.magic, 0, Infinity)
                player.hitPoints -= damage

                gameMessage(`${beingNameWithDeterminantDefini(monster, false)} attaque et t'inflige ${damage} ${damage <= 1 ? "dégât magique" : "dégâts magiques"}.`)
                return
            }

            // Physical Hit
            const roll = d100.roll()
            console.log(`The monster rolls a ${roll} - Physical`);
            damage = clamp(monster.strength + roll - player.speed, 0, Infinity)
            player.hitPoints -= damage

            gameMessage(`${beingNameWithDeterminantDefini(monster, false)} attaque et t'inflige ${damage} ${damage <= 1 ? "dégât physique" : "dégâts physiques"}.`)
        }
    }

    function playerHasInitiative() {
        if (monster.speed > player.speed) {
            // console.log("Player does not have the initiative.");
            return false
        }

        // console.log("Player has the initiative.");
        return true
    }

    function newTurn() {
        gameMessage(`Tu as résisté à l'assault de ${beingNameWithDeterminantDefini(monster, true)} mais ${monster.race.sex == "F" ? "cette dernière" : "ce dernier"} est toujours debout et prêt${monster.race.sex == "F" ? "e" : ""} à en découdre.
            Un nouveau tour de combat commence.`)

        btn1.innerText = "Commencer"
        btn1.onclick = () => { phaseInitiative() }
    }

    function fightIsWon() {
        player.restoreHitPoints()
        player.experiencePoints++

        gameMessage(`Bravo ! ${beingNameWithDeterminantDefini(monster, false)} est terrassé${monster.race.sex == "F" ? "e" : ""} !
            Tu te soigne et gagne 1 point d'expérience.
            Tu peux aussi lancer un D20 pour acquérir une récompense potentielle.`)

        btn1.innerText = "Lancer un D20"
        btn1.onclick = () => {
            const roll = d20.roll();
            fightReward(roll)
        }
    }

    function fightReward(roll) {
        const reducedRoll = d20.reducedRoll(roll, 4)
        let message = `${roll} !
        `;

        switch (reducedRoll) {
            case 2:
                message += `Tu gagnes 1 point d'action.`
                player.actionPoints++
                break;

            case 3:
                message += `Tu peux tirer une carte du deck mais toutes les cartes comptent comme des cartes 'Pièces'.`
                allowedToDraw = true;
                allCardsCountAsCoins = true;
                break;

            case 4:
                message += `Tu peux tirer une carte du deck. Tu gagnes immédiatement l'objet ou l'or correspondant.`
                allowedToDraw = true;
                break;

            default:
                message += `Aucune récompense. Déso...`
                break;
        }
        gameMessage(message)
    }
}
//#endregion

function visitShop() {
    if (scopaDeck.length <= 0) {
        gameMessage("Vous arrivez devant le magasin mais réalisez avec déception que celui-ci est fermé (il n'y a plus de carte dans la pioche).");
        btn1.innerText = "Partir"
        // Next adventure roll
        btn1.onclick = () => { }
        return;
    }

    gameMessage(`Vous entrez dans le magasin.
        Tirez 4 cartes pour voir quels objets sont en vente (les cartes 'Pièces' ne correspondent à aucun objet achetable).`);

    let cardsDrawn = []
    let items = []

    imgDeck.onclick = () => {
        if (allowedToDraw) {
            initialShopDraw(scopaDeck);
        }
    };

    allowedToDraw = true

    function initialShopDraw(deck) {
        allowedToDraw = false

        if (deck.length <= 0) {
            gameMessage("La pioche est vide.");
            return;
        }

        const cardDrawn = structuredClone(deck.shift())
        cardsDrawn.push(cardDrawn)
        addCardToDisplayZone(cardDrawn)

        if (isAllowedToDrawMore()) {
            gameMessage(`${cardDrawn.description}.
                Tirez encore ${4 - cardsDrawn.length} ${cardsDrawn.length == 3 ? "carte" : "cartes"}.`)
            allowedToDraw = true
            return
        }

        // check if all cards are coins
        let isAllCoins = true
        cardsDrawn.forEach(card => {
            if (card.suit == "coins") {
                return
            }
            isAllCoins = false
        });

        if (isAllCoins) {
            gameMessage(`${cardDrawn.description}.
                Toutes les cartes sont de la suite 'Pièces'.
                Tirez des cartes jusqu'à tomber sur une carte d'une autre suite.`)

            allowedToDraw = true
            cardsDrawn = []

            imgDeck.onclick = () => {
                zoneCardsDrawn.innerHTML = ``;
                additionalShopDraw(scopaDeck)
            }
            return
        }

        // Deploy shop
        gameMessage(`${cardDrawn.description}.
            C'est bon. Appuyez sur continuer pour voir l'objet, ou les objets, disponible(s) dans le magasin.`)

        btn1.innerText = "Continuer"
        btn1.onclick = () => { deployShop() }

        function isAllowedToDrawMore() {
            if (cardsDrawn.length >= 4) {
                return false
            }

            return true
        }
    }

    function additionalShopDraw(deck) {
        allowedToDraw = false

        if (deck.length <= 0) {
            gameMessage("La pioche est vide.");
            return;
        }

        const cardDrawn = structuredClone(deck.shift())
        addCardToDisplayZone(cardDrawn)

        if (cardDrawn.suit == "coins") {
            gameMessage(`${cardsDrawn.description}.
                Tirez à nouveau une carte.`)
            allowedToDraw = true
            return
        }

        cardsDrawn.push(cardDrawn)
        gameMessage(`${cardDrawn.description}.
            C'est bon. Appuyez sur continuer pour voir l'objet, ou les objets, disponible(s) dans le magasin.`)

        btn1.innerText = "Continuer"
        btn1.onclick = () => { deployShop() }
    }

    function deployShop() {
        btn1.innerText = "Partir"
        btn1.onclick = () => { }

        let message = `Magasin
        Objets disponibles : 
            `;

        cardsDrawn.forEach(card => {
            let item = {}

            switch (card.suit) {
                case "coins":
                    return
                    break;
                case "clubs":
                    return
                    break;
                case "cups":
                    return
                    break;
                case "swords":
                    item = new SwordsItem(structuredClone(swordsItemsTable[card.value - 1]));
                    break;
                default:
                    console.error("Card suit unknown")
                    break;
            }

            message += `- ${item.name} (${item.description}) - ${item.buyValue}PO
                `;
        });

        gameMessage(message)
    }

    function addCardToDisplayZone(card) {
        const cardElement = document.createElement("img")
        cardElement.setAttribute("src", card.imageURL)
        cardElement.setAttribute("alt", card.description)
        cardElement.classList.add("card")
        zoneCardsDrawn.appendChild(cardElement)
    }
}

function isBeingDead(being) {
    if (being.hitPoints <= 0) {
        return true
    }

    return false
}

function gameOver() {
    gameMessage(`Tu es mort·e, ton aventure s'achève ici.
            Merci d'avoir joué ! On espère que tu t'es quand même bien amusé·e.
            Recharge la page si tu souhaites recommencer une partie.`)
}

