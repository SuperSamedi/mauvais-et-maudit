//#region DOM links
const txtDungeonMaster = document.getElementById("dungeon-master-text");

const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const btn3 = document.getElementById("btn3");
const btn4 = document.getElementById("btn4");
const btn5 = document.getElementById("btn5");
const btnRaceRoll = document.getElementById("btn-race-roll");
const btnTraitRoll = document.getElementById("btn-trait-roll");
const btnCardDraw = document.getElementById("btn-card-draw");

const imgDeck = document.getElementById("deck");
const zoneCardsDrawn = document.getElementById("cards-drawn")

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
const btnNextAdventure = document.getElementById("btn-next-adventure");
//#endregion

const player = new Player();
// console.log(player);
const d20 = new Dice(20);
const d100 = new Dice(100);
let shop = new Shop();


let encountersTable = [];
let intelligentRacesTable = [];
let weakTraitsTable = []
let strongTraitsTable = [];
let strongissimeTraitsTable = [];
let monstersTable = [];
let specialEncountersTable = [1];
let environmentsTable = [];

let scopaDeck = [];
let coinsItemsTable = [];
let swordsItemsTable = [];
// let clubsItemsTable = [];
let cupsItemsTable = [];

let allowedToDraw = true;
let allowedToSellItems = false;


btnRaceRoll.onclick = choosePlayerRace;
btnTraitRoll.onclick = choosePlayerTrait;
btnCardDraw.onclick = () => {
    allowedToDraw = true;
};


btnFightMonster.onclick = () => { monsterEncounter() }
btnVisitShop.onclick = () => { visitShop() }
btnNextAdventure.onclick = () => { nextAdventure() }

imgDeck.onclick = () => {
    if (allowedToDraw) {
        clearCardsDisplayZone();
        drawReward(scopaDeck, false);
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
        console.log(strongTraitsTable);
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

fetch("resources/data-tables/encounters.json")
    .then((response) => {
        return response.json();
    })
    .then((loadedData) => {
        encountersTable = loadedData;
        // console.log(adventureTable);
    })
    .catch((error) => {
        // TODO: create a 500 code page
        console.error(error);
    });

fetch("resources/data-tables/cups-items.json")
    .then((response) => {
        return response.json();
    })
    .then((loadedData) => {
        cupsItemsTable = loadedData;
        // console.log(adventureTable);
    })
    .catch((error) => {
        // TODO: create a 500 code page
        console.error(error);
    });

fetch("resources/data-tables/environments.json")
    .then((response) => {
        return response.json();
    })
    .then((loadedData) => {
        environmentsTable = loadedData;
        // console.log(environmentsTable);
    })
    .catch((error) => {
        // TODO: create a 500 code page
        console.error(error);
    });

fetch("resources/data-tables/strongissime-traits.json")
    .then((response) => {
        return response.json();
    })
    .then((loadedData) => {
        strongissimeTraitsTable = loadedData;
        // console.log(strongissimeTraitsTable);
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
    if (player.race.name.male == "Non-Être") {
        player.restoreHitPoints();
        player.updateAllVisuals();
        generateNonBeingPlayer(player.race, false);
        return;
    }

    // Hybrid special rule
    if (player.race.name.male == "Hybride") {
        player.updateAllVisuals();
        generateHybridPlayer();
        return;
    }

    gameMessage(`${roll} ! - ${player.race.name.male}`);

    player.restoreHitPoints();
    player.updateRaceVisuals();
    player.updateStatsVisuals();

    //#region Non-Being Player Generation
    function generateNonBeingPlayer(being, isGeneratingHybrid) {
        gameMessage(`19 ! - Non-Être.
        Les Non-Êtres sont des créatures instables. Tu vas devoir tirer tes stats au hasard.
        Lance le D100 pour tes points de vie.`);
        btn1.innerText = "Lancer le D100";
        btn1.onclick = generateNonBeingHitPoints;

        function generateNonBeingHitPoints() {
            const roll = d100.roll();

            being.hitPoints = roll;

            if (!isGeneratingHybrid) {
                player.restoreHitPoints();
            }

            gameMessage(`${roll} !
        Maintenant lance à nouveau le D100 pour ta stat de force.`);

            btn1.onclick = generateNonBeingStrength;
        }

        function generateNonBeingStrength() {
            const roll = d100.roll();

            being.strength = roll;

            if (!isGeneratingHybrid) {
                player.updateAllVisuals();
            }

            gameMessage(`${roll} !
        Maintenant lance encore le D100 pour ta stat de vitesse.`);

            btn1.onclick = generateNonBeingSpeed;
        }

        function generateNonBeingSpeed() {
            const roll = d100.roll();

            being.speed = roll;

            if (!isGeneratingHybrid) {
                player.updateAllVisuals();
            }

            gameMessage(`${roll} !
        Et enfin, lance le D100 pour ta stat de magie.`);

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
                let message = `Ton état de Non-Être est trop fragile. Tu va devoir rajouter ${pointsToAdd} point`;

                if (pointsToAdd == 1) {
                    message += ` à la caractéristique de votre choix.`;
                    gameMessage(message);
                    adjustStats(being, pointsToAdd, true);
                    return;
                }

                message += `s répartis comme tu le souhaite parmi tes caractéristiques.`;

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
        // Second come around (after 1st half hybride)
        if (!hybridRaceB.name) {
            gameMessage(`Lance maintenant un D20 pour ta deuxième race.`);
            btn1.onclick = generateHybridPlayerSecondHalf;
            return;
        }

        // Final
        player.race.name.male = `Hybride ${hybridRaceA.name.male}-${hybridRaceB.name.male}`;
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
            if (hybridRaceA.name.male == "Hybride") {
                gameMessage(`${roll} ! ${hybridRaceA.name.male} à nouveau. Relance.`);
                btn1.innerText = "Relancer un D20";
                return;
            }

            // Non-Being special rule
            if (hybridRaceA.name.male == "Non-Être") {
                player.race.name.male += ` ${hybridRaceA.name.male}`;
                player.updateAllVisuals();
                generateNonBeingPlayer(hybridRaceA, true); // Sends us back to generateHybridPlayer at the end
                return;
            }

            gameMessage(
                `${roll} ! ${hybridRaceA.name.male}. Maintenant, lance de nouveau un D20 pour ta deuxième race.`
            );
            btn1.innerText = "Lancer un D20";
            btn1.onclick = generateHybridPlayerSecondHalf;
            player.race.name.male += ` ${hybridRaceA.name.male}`;
            player.updateAllVisuals();
        }

        function generateHybridPlayerSecondHalf() {
            const roll = d20.roll();

            hybridRaceB = structuredClone(intelligentRacesTable[roll - 1]);

            if (
                hybridRaceB.name.male == "Hybride" ||
                hybridRaceB.name.male == hybridRaceA.name.male
            ) {
                gameMessage(`${roll} ! ${hybridRaceB.name.male} à nouveau. Relance.`);
                btn1.innerText = "Relancer un D20";
                return;
            }

            if (hybridRaceB.name.male == "Non-Être") {
                player.race.name.male += `-${hybridRaceB.name.male}`;
                player.updateAllVisuals();
                generateNonBeingPlayer(hybridRaceB, true);
                return;
            }

            player.race.name.male += `-${hybridRaceB.name.male}`;
            player.updateAllVisuals();
            gameMessage(`${roll} ! ${hybridRaceB.name.male}.`);
            generateHybridPlayer(hybridRaceA, hybridRaceB);
        }
    }

    //#endregion
}

function choosePlayerTrait() {
    const roll = getRandomInt(strongTraitsTable.length) + 1;

    player.traits[0] = structuredClone(strongTraitsTable[roll - 1]);

    gameMessage(`${roll} ! - ${player.traits[0].name.accordMasculin}`);

    player.restoreHitPoints();
    player.updateTraitVisuals();
    player.updateStatsVisuals();
}

function drawReward(deck, allCardsCountAsCoins) {
    allowedToDraw = false;

    if (deck.length <= 0) {
        gameMessage("La pioche est vide...");
        return;
    }

    let feedbackMessage = "";

    const cardDrawn = structuredClone(deck.shift());
    //console.log(scopaDeck);
    addCardToDisplayZone(cardDrawn)
    feedbackMessage += `${cardDrawn.description} !`;

    if (cardDrawn.suit == "coins" || allCardsCountAsCoins === true) {
        const reward = structuredClone(coinsItemsTable[cardDrawn.value - 1]);
        player.goldCoins += reward.goldCoins;
        feedbackMessage += ` 
        Tu reçois ${reward.goldCoins} pièces d'or`;

        if (reward.actionPoints) {
            player.actionPoints += reward.actionPoints;
            feedbackMessage += ` et ${reward.actionPoints} point d'action`;
        }
    }

    if (cardDrawn.suit == "swords" && allCardsCountAsCoins === false) {
        let reward = new SwordsItem(structuredClone(swordsItemsTable[cardDrawn.value - 1]));
        player.inventory.add(reward);
        feedbackMessage += ` 
        Tu reçois ${reward.preposition}${reward.name} (${reward.description})`;
        //console.log(inventory);
    }

    feedbackMessage += `.`;
    gameMessage(feedbackMessage);
}

function generateIntelligentBeing(roll, traits) {
    let gender = d20.reducedRoll(d20.roll(), 2) == 1 ? "F" : "M"
    let being = new Being(structuredClone(intelligentRacesTable[roll - 1]), gender, traits)

    // Momie special rule
    if (being.race.name.female == "Momie") {
        being.gender = "F"
    }

    // Golem special rule
    if (being.race.name.male == "Golem") {
        being.gender = "M"
    }

    // Non-Being special rule
    if (being.race.name.male == "Non-Être") {
        being.race = generateNonBeingRace();
    }

    // Hybrid special rule
    if (being.race.name.male == "Hybride") {
        being.race = generateHybridRace();
    }

    function generateNonBeingRace() {
        let race = {};

        race.name.female = "Non-Être";
        race.name.male = "Non-Être";

        // Generate stats
        race.hitPoints = d100.roll();
        race.strength = d100.roll();
        race.speed = d100.roll();
        race.magic = d100.roll();

        adjustGeneratedNonBeing(race);

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

        return race;
    }

    function generateHybridRace() {
        let hybrid = {};
        let raceA = {};
        let raceB = {};

        raceA.name.male = "Hybride";
        raceB.name.male = "Hybride";

        // Generate first half
        while (raceA.name.male == "Hybride") {
            raceA = structuredClone(intelligentRacesTable[d20.roll() - 1]);

            // Non-Being special rule
            if (raceA.name.male == "Non-Être") {
                raceA = generateNonBeingRace();
            }

            // Momie special rule
            if (raceA.name.female == "Momie") {
                being.gender = "F"
            }

            // Golem special rule
            if (raceA.name.male == "Golem") {
                being.gender = "M"
            }
        }

        // Generate second half
        while (raceB.name.male == "Hybride" || raceB.name.male == raceA.name.male) {
            raceB = structuredClone(intelligentRacesTable[d20.roll() - 1]);

            // Non-Being special rule
            if (raceB.name.male == "Non-Être") {
                raceB = generateNonBeingRace();
            }
        }

        hybrid.name.female = `Hybride ${raceA.name.female}-${raceB.name.female}`;
        hybrid.name.male = `Hybride ${raceA.name.male}-${raceB.name.male}`;
        hybrid.hitPoints = Math.round((raceA.hitPoints + raceB.hitPoints) * 0.5);
        hybrid.strength = Math.round((raceA.strength + raceB.strength) * 0.5);
        hybrid.speed = Math.round((raceA.speed + raceB.speed) * 0.5);
        hybrid.magic = Math.round((raceA.magic + raceB.magic) * 0.5);

        return hybrid;
    }

    // TODO: Add trait based on level parameter (1 to 4)

    being.restoreHitPoints();
    return being;
}

function generateMonster(roll, traits) {
    let monster = new Being(structuredClone(monstersTable[roll - 1]), null, traits);

    if (monster.race.name == "Parasite") {
        monster = generateIntelligentBeing(d20.roll());
        monster.race.name += ` ${monster.gender == "F" ? "parasitée" : "parasité"}`;
    }

    if (monster.race.name == "Métamorphe") {
        monster.race.hitPoints = d100.roll();
        monster.race.strength = clamp(d100.roll() - 30, 10, 100);
        monster.race.speed = clamp(d100.roll() - 30, 10, 100);
        monster.race.magic = clamp(d100.roll() - 30, 10, 100);
    }

    monster.restoreHitPoints();

    // console.log(`Monstre généré - id : ` + roll);
    // console.log(monster);
    return monster;
}

//#region FIGHT
/**
 * @param ctx Object - context data necessary for the fight.
 * @param ctx.opponent Object - opponent the player is facing in this fight
 * @param ctx.introMessage String - message displayed when the fight is about to start.
 * @param ctx.opponentPreparationPhaseCallBack CallBackFunction - run when the opponent is preparing for the turn.
 * @param ctx.rewardPhaseCallBack CallBackFunction - run when the fight is won.
 */
function fight(ctx) {
    console.log(`Fight:`);
    console.log(ctx);

    // Message d'intro
    let message = ctx.introMessage
    message += `
    
    ---- Un combat contre ${ctx.opponent.gender == "F" ? "une" : "un"} ${ctx.opponent.name} commence !`
    gameMessage(message);

    btn1.style.display = "block"
    btn1.disabled = false
    btn1.innerText = "Commencer le combat";
    btn1.onclick = () => { initiativePhase(ctx) }
}

function initiativePhase(ctx) {
    if (playerHasInitiative(ctx.opponent)) {
        gameMessage(`Vous avez l'initiative. 
            
            -- C'est à votre tour de vous préparer.`)

        btn1.innerText = "Se préparer"
        btn1.onclick = () => { playerPreparationPhase(ctx) }

        return
    }

    gameMessage(`${beingNameWithDeterminantDefini(ctx.opponent, false)} a l'initiative, ${ctx.opponent.gender == "F" ? "elle" : "il"} se prépare.`)

    btn1.innerText = "Continuer"
    btn1.onclick = () => { ctx.opponentPreparationPhaseCallBack(ctx); }
}

function playerPreparationPhase(ctx) {
    // TODO : implement this
    gameMessage(`Phase de préparation.
        
        Voulez-vous lancer un sort ou utiliser un objet ?`)

    btn1.innerText = "Ne rien faire"
    btn1.onclick = () => {
        if (playerHasInitiative(ctx.opponent)) {
            opponentPreparationPhase(ctx)
            return
        }
        opponentAttackPhase(ctx)
    }
}

// Opponent prep phase if it is second in initiative
function opponentPreparationPhase(ctx) {
    gameMessage(`C'est au tour ${beingNameWithDeterminantDefiniContracte(ctx.opponent, "de")} de se préparer.`)

    btn1.innerText = "Continuer"
    btn1.onclick = () => { ctx.opponentPreparationPhaseCallBack(ctx) }
}

function regularOpponentPreparationPhase(ctx) {
    message = `${beingNameWithDeterminantDefini(ctx.opponent, false)} ne fais rien.`

    // If the player has prepared before the opponent. We start the player attack phase.
    if (playerHasInitiative(ctx.opponent)) {
        message += `
        
        -- C'est à votre tour d'attaquer.`

        gameMessage(message);

        btn1.innerText = "Attaquer"
        btn1.onclick = () => { playerAttackPhase(ctx) }

        return
    }

    // Otherwise, we start the player prepare phase
    message += `
    
    -- C'est à votre tour de vous préparer.`

    gameMessage(message)

    btn1.innerText = "Se préparer"
    btn1.onclick = () => { playerPreparationPhase(ctx) }
}

function playerAttackPhase(ctx) {
    let damage = 0;

    gameMessage(`Phase d'attaque
        
        -- Voulez-vous faire une attaque physique ou une attaque magique ?`)

    btn1.innerText = "Attaque physique"
    btn1.onclick = () => { decideIfPowerful(true) }

    btn2.style.display = "block"
    btn2.disabled = false
    btn2.innerText = "Attaque magique"
    btn2.onclick = () => { decideIfPowerful(false) }

    function decideIfPowerful(isPhysical) {
        if (player.actionPoints > 0) {
            gameMessage(`Voulez-vous utiliser un point d'action pour effectuer une attaque puissante ? (Vous pourrez lancer deux D100 à la place de un seul.)`)

            btn1.innerText = "Oui"
            btn1.onclick = () => { powerfulAttack(isPhysical) }

            btn2.style.display = "block"
            btn2.innerText = "Non"
            btn2.onclick = () => { normalAttack(isPhysical) }

            return
        }

        normalAttack(isPhysical)
    }

    function powerfulAttack(isPhysical) {
        player.actionPoints -= 1

        gameMessage(`Très bien, vous utilisez un point d'action pour effectuer une attaque puissante.
            Lancez un premier D100 pour voir combien de dégâts vous allez infliger.`)

        btn2.style.display = "none"
        btn1.innerText = "Lancer un D100"
        btn1.onclick = () => {
            const firstRoll = d100.roll()
            damage += firstRoll;
            secondRoll(firstRoll)
        }

        function secondRoll(firstRoll) {
            gameMessage(`${firstRoll} ! 
                Maintenant lancez votre D100 bonus.`)

            btn1.onclick = () => {
                const secondRoll = d100.roll()
                damage += secondRoll
                inflictDamage(isPhysical, secondRoll)
            }
        }
    }

    function normalAttack(isPhysical) {
        gameMessage(`Très bien, lancez un D100 pour voir combien de dégâts vous allez infliger.`)

        btn2.style.display = "none"
        btn1.innerText = "Lancer un D100"
        btn1.onclick = () => {
            const roll = d100.roll()
            damage += roll;
            inflictDamage(isPhysical, roll)
        }
    }

    function inflictDamage(isPhysical, finalRoll) {
        let message = `${finalRoll} !`

        // Magical Hit
        if (!isPhysical) {
            damage = clamp(damage + player.magic - ctx.opponent.magic, 0, Infinity)
            ctx.opponent.hitPoints -= damage
            message += `
            Vous infligez un total de ${damage} ${damage <= 1 ? "dégât magique" : "dégâts magiques"} ${beingNameWithDeterminantDefiniContracte(ctx.opponent, 'à')}.`

        }
        // Physical Hit
        else {
            damage = clamp(damage + player.strength - ctx.opponent.speed, 0, Infinity)
            ctx.opponent.hitPoints -= damage
            message += `
            Vous infligez un total de ${damage} ${damage <= 1 ? "dégât physique" : "dégâts physiques"} ${beingNameWithDeterminantDefiniContracte(ctx.opponent, 'à')}.`
        }

        // Check if opponent is KO
        if (isBeingDead(ctx.opponent)) {
            gameMessage(message)
            btn1.innerText = "Continuer"
            btn1.onclick = () => { ctx.rewardPhaseCallBack(ctx) }
            return
        }

        // If we attacked first , it's the opponent's turn
        if (playerHasInitiative(ctx.opponent)) {
            message += `
            
            -- C'est au tour ${beingNameWithDeterminantDefiniContracte(ctx.opponent, 'de')} d'attaquer.`
            gameMessage(message)
            btn1.innerText = "Continuer"
            btn1.onclick = () => { opponentAttackPhase(ctx) }
            return
        }

        // Otherwise we start a new turn
        btn1.innerText = "Continuer"
        btn1.onclick = () => { newTurn(ctx) }

    }
}

function opponentAttackPhase(ctx) {
    let damage = 0

    // If player attacked first we skip the phase presentation
    if (playerHasInitiative(ctx.opponent)) {
        selectAttackType()
        return
    }

    gameMessage(`Phase d'attaque.
       
        -- C'est au tour ${beingNameWithDeterminantDefiniContracte(ctx.opponent, "de")} d'attaquer.`)

    btn1.innerText = "Continuer"
    btn1.onclick = () => { selectAttackType() }

    function selectAttackType() {
        // If both stats are equal we choose the version with the most damaging potential
        if (ctx.opponent.strength == ctx.opponent.magic) {
            const potentialPhysicalDamage = ctx.opponent.strength - player.speed
            const potentialMagicalDamage = ctx.opponent.magic - player.magic

            // Magical
            if (potentialMagicalDamage > potentialPhysicalDamage) {
                inflictDamage(false);
                return
            }

            // Physical
            inflictDamage(true);
            return
        }

        // Magical Attack
        if (ctx.opponent.magic > ctx.opponent.strength) {
            inflictDamage(false);
            return;
        }

        // Physical Attack
        inflictDamage(true);
    }

    function inflictDamage(isPhysical) {
        let message = ``

        // Magical Hit
        if (!isPhysical) {
            const roll = d100.roll()
            console.log(`The monster rolls a ${roll} - Magical`);
            damage = clamp(ctx.opponent.magic + roll - player.magic, 0, Infinity)
            player.hitPoints -= damage

            message += `${beingNameWithDeterminantDefini(ctx.opponent, false)} attaque et vous inflige ${damage} ${damage <= 1 ? "dégât magique" : "dégâts magiques"}.`
        }
        // Physical Hit
        else {

            const roll = d100.roll()
            console.log(`The monster rolls a ${roll} - Physical`);
            damage = clamp(ctx.opponent.strength + roll - player.speed, 0, Infinity)
            player.hitPoints -= damage

            message += `${beingNameWithDeterminantDefini(ctx.opponent, false)} attaque et vous inflige ${damage} ${damage <= 1 ? "dégât physique" : "dégâts physiques"}.`
        }

        // Check if the hit killed the player
        // Display just the hit message and set up button to bring to the game over screen
        if (isBeingDead(player)) {
            gameMessage(message)
            btn1.innerText = "Continuer"
            btn1.onclick = () => { gameOver() }

            return
        }

        // If we attacked first it's time for a new turn
        if (playerHasInitiative(ctx.opponent)) {
            gameMessage(message)
            btn1.innerText = "Continuer"
            btn1.onclick = () => { newTurn(ctx) }

            return
        }

        // Otherwise, we start the player attack phase
        message += `
        
        -- C'est à votre tour d'attaquer.`
        gameMessage(message)
        btn1.innerText = "Attaquer"
        btn1.onclick = () => { playerAttackPhase(ctx) }
    }
}

function newTurn(ctx) {
    gameMessage(`Vous avez résisté à l'assault de ${beingNameWithDeterminantDefini(ctx.opponent, true)} mais ${ctx.opponent.gender == "F" ? "cette dernière" : "ce dernier"} est toujours debout et prêt${ctx.opponent.gender == "F" ? "e" : ""} à en découdre.
        
        -- Un nouveau tour de combat commence.`)

    btn1.innerText = "Commencer"
    btn1.onclick = () => { initiativePhase(ctx) }
}

function regularRewardPhase(ctx) {
    player.restoreHitPoints()
    player.experiencePoints++

    gameMessage(`${beingNameWithDeterminantDefini(ctx.opponent, false)} est terrassé${ctx.opponent.gender == "F" ? "e" : ""} !
        Vous vous soignez et gagnez 1 point d'expérience.
        Vous Pouvez aussi lancer un D20 pour acquérir une récompense potentielle.`)

    btn1.innerText = "Lancer un D20"
    btn1.onclick = () => {
        const roll = d20.roll();
        fightReward(roll)
    }

    function fightReward(roll) {
        const reducedRoll = d20.reducedRoll(roll, 4)
        let message = `${roll} !
        `;

        switch (reducedRoll) {
            case 2:
                message += `Vous gagnez 1 point d'action.`
                player.actionPoints++
                break;

            case 3:
                message += `Vous pouvez tirer une carte du deck mais toutes les cartes comptent comme des cartes 'Pièces'.`
                allowedToDraw = true;
                imgDeck.onclick = () => {
                    clearCardsDisplayZone()
                    drawReward(scopaDeck, true)
                }
                break;

            case 4:
                message += `Vous pouvez tirer une carte du deck. Vous gagnez immédiatement l'objet ou l'or correspondant.`
                allowedToDraw = true;
                imgDeck.onclick = () => {
                    clearCardsDisplayZone()
                    drawReward(scopaDeck, false)
                }
                break;

            default:
                message += `Aucune récompense. Déso...`
                break;
        }
        gameMessage(message)

        // TODO: Check next adventure step
    }
}

function playerHasInitiative(opponent) {
    // Environment 'Plaines' special rule
    if (currentEnvironment.name == "Plaines") {
        return true
    }

    if (opponent.speed > player.speed) {
        return false
    }

    return true
}
//#endregion

function nextAdventure() {
    gameMessage(`Lancez un D100 pour voir quelles péripéties vous attendent.`)

    btn1.innerText = "Lancer le D100"
    // Test button
    btn1.onclick = () => { chooseNextAdventure(60) }

    // btn1.onclick = () => {
    //     const roll = d100.roll()
    //     chooseNextAdventure(roll)
    // }

    function chooseNextAdventure(roll) {
        btn1.style.display = "none"
        btn2.style.display = "none"
        btn3.style.display = "none"

        let message = `${roll} !
        Vous avez le choix entre ces aventures :
        `;

        let choice1 = encountersTable[roll - 2]
        let choice2 = encountersTable[roll - 1]
        let choice3 = encountersTable[roll]
        console.log(choice1);
        console.log(choice2);
        console.log(choice3);

        // TODO : Improve this shit :P
        // Roll - 1
        if (choice1) {
            btn1.style.display = "block"
            switch (choice1.type) {
                case "Événement":
                    message += `- Un événement spécial
                    `;
                    btn1.innerText = "Événement spécial"
                    btn1.onclick = () => {
                        specialEncounter()
                    }
                    break;
                case "Village":
                    message += `- Visiter un village
                    `;
                    btn1.innerText = "Visiter un village"
                    btn1.onclick = () => {
                        villageEncounter()
                    }
                    break;
                case "Repos":
                    message += `- Se reposer
                    `;
                    btn1.innerText = "Se reposer"
                    btn1.onclick = () => {
                        restEncounter()
                    }
                    break;
                case "Combat !":
                    message += `- Un combat contre un monstre
                    `;
                    btn1.innerText = "Combattre un monstre"
                    btn1.onclick = () => {
                        monsterEncounter()
                    }
                    break;
                case "Combat ?":
                    message += `- Une rencontre avec une créature intelligente
                    `;
                    btn1.innerText = "Rencontrer une créature intelligente"
                    btn1.onclick = () => {
                        intelligentBeingEncounter()
                    }
                    break;
                case "Coup de chance !":
                    break;
                default:
                    console.console.error("Unknown adventure type !");
                    break;
            }
        }

        // Actual Roll
        if (choice2.type == choice1.type) {
            choice2 = undefined
        }
        if (choice2) {
            btn2.style.display = "block"
            switch (choice2.type) {
                case "Événement":
                    message += `- Un événement spécial
                                `;
                    btn2.innerText = "Événement spécial"
                    btn2.onclick = () => {
                        specialEncounter()
                    }
                    break;
                case "Village":
                    message += `- Visiter un village
                                `;
                    btn2.innerText = "Visiter un village"
                    btn2.onclick = () => {
                        villageEncounter()
                    }
                    break;
                case "Repos":
                    message += `- Se reposer
                                `;
                    btn2.innerText = "Se reposer"
                    btn2.onclick = () => {
                        restEncounter()
                    }
                    break;
                case "Combat !":
                    message += `- Un combat contre un monstre
                                `;

                    btn2.innerText = "Combattre un monstre"
                    btn2.onclick = () => {
                        monsterEncounter()
                    }
                    break;
                case "Combat ?":
                    message += `- Une rencontre avec une créature intelligente
                                `;
                    btn2.innerText = "Rencontrer une créature intelligente"
                    btn2.onclick = () => {
                        intelligentBeingEncounter()
                    }
                    break;
                case "Coup de chance !":
                    message += `- Un coup de chance
                                `;
                    btn2.innerText = "Coup de chance"
                    btn2.onclick = () => {
                        luckyEncounter()
                    }
                    break;
                default:
                    console.console.error("Unknown adventure type !");
                    break;
            }
        }

        // Roll + 1
        if (choice3.type == choice1.type
            || choice3.type == choice2.type) {
            choice3 = undefined
        }
        if (choice3) {
            btn3.style.display = "block"
            switch (choice3.type) {
                case "Événement":
                    message += `- Un événement spécial
                            `;
                    btn3.innerText = "Événement spécial"
                    btn3.onclick = () => {
                        specialEncounter()
                    }
                    break;
                case "Village":
                    message += `- Visiter un village
                            `;
                    btn3.innerText = "Visiter un village"
                    btn3.onclick = () => {
                        villageEncounter()
                    }
                    break;
                case "Repos":
                    message += `- Se reposer
                            `;
                    btn3.innerText = "Se reposer"
                    btn3.onclick = () => {
                        restEncounter()
                    }
                    break;
                case "Combat !":
                    message += `- Un combat contre un monstre
                            `;
                    btn3.innerText = "Combattre un monstre"
                    btn3.onclick = () => {
                        monsterEncounter()
                    }
                    break;
                case "Combat ?":
                    message += `- Une rencontre avec une créature intelligente
                            `;
                    btn3.innerText = "Rencontrer une créature intelligente"
                    btn3.onclick = () => {
                        intelligentBeingEncounter()
                    }
                    break;
                case "Coup de chance !":
                    break;
                default:
                    console.console.error("Unknown adventure type !");
                    break;
            }
        }

        message += `
        Que choisissez-vous ?`;

        gameMessage(message)
    }
}

//#region ENCOUNTERS
function monsterEncounter() {
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
            break;
    }

    const monster = generateMonster(d20.roll(), traits)
    let introMessage = `${monster.gender == "F" ? "Une" : "Un"} ${monster.name} vous barre la route. Le combat est inévitable.`

    const contextData = {
        opponent: monster,
        introMessage: introMessage,
        opponentPreparationPhaseCallBack: regularOpponentPreparationPhase,
        rewardPhaseCallBack: regularRewardPhase
    }

    fight(contextData)

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

function intelligentBeingEncounter() {

}

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
            clearCardsDisplayZone()
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

            imgDeck.onclick = () => {
                if (allowedToDraw) {
                    initialShopDraw(deck);
                }
            };

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
                clearCardsDisplayZone();
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
        shop = new Shop();

        btn1.innerText = "Partir"
        btn1.onclick = () => {
            allowedToSellItems = false
        }

        cardsDrawn.forEach(card => {
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
                    shop.add(new SwordsItem(structuredClone(swordsItemsTable[card.value - 1])));
                    break;
                default:
                    console.error("Card suit unknown")
                    break;
            }
        })

        shop.updateDisplay()
        allowedToSellItems = true
    }

}

function restEncounter() {

}

function villageEncounter() {

}

function specialEncounter() {
    const specialEncounters = [event01]
    specialEncounters[getRandomInt(specialEncounters.length)]()

    function event01() {
        // TEST
        // const potion = structuredClone(cupsItemsTable[0])
        // const ether = structuredClone(cupsItemsTable[1])
        // player.inventory.add(potion)
        // player.inventory.add(ether)
        // player.goldCoins += 200

        gameMessage(`Vous rencontrez un voyageur dont l'enfant est gravement malade. Il vous supplie de l'aider.
        --- Si vous avez une potion ou un ether, vous pouvez lui donner.
        --- Si vous avez 200PO vous pouvez lui donner pour qu'il achète un remède.
        --- Vous pouvez vous battre contre le voyageur.
        --- Vous pouvez ne rien faire et passer votre chemin.
        
        Que choisissez-vous de faire ?`)

        btn1.style.display = "block"
        btn2.style.display = "block"
        btn3.style.display = "block"
        btn4.style.display = "block"
        btn5.style.display = "block"
        btn1.innerText = "Donner une potion"
        btn2.innerText = "Donner un ether"
        btn3.innerText = "Donner 200PO"
        btn4.innerText = "Se battre"
        btn5.innerText = "Passer mon chemin"
        btn1.disabled = false
        btn2.disabled = false
        btn3.disabled = false
        btn4.disabled = false
        btn5.disabled = false
        if (!player.inventory.contains("Potion")) btn1.disabled = true
        if (!player.inventory.contains("Éther")) btn2.disabled = true
        if (player.goldCoins < 200) btn3.disabled = true
        btn1.onclick = () => { givePotion() }
        btn2.onclick = () => { giveEther() }
        btn3.onclick = () => { giveGold() }
        btn4.onclick = () => { fightTraveler() }
        btn5.onclick = () => { leave() }

        function givePotion() {
            if (!player.inventory.contains("Potion")) return;

            gameMessage(`Vous donnez une Potion au voyageur.
                Il vous remercie avec une voix pleine d'émotions et vous offre un objet en retour.
                
                Vous recevez le Pendentif de la Lune.
                Vous recevez également 1XP.`)

            player.inventory.remove("Potion")
            player.inventory.add(getCupsItem(6))
            player.experiencePoints++

            btn1.innerText = "Continuer"
        }

        function giveEther() {
            if (!player.inventory.contains("Éther")) return;

            gameMessage(`Vous donnez un Éther au voyageur.
                Il vous remercie avec une voix pleine d'émotions et vous offre un objet en retour.
                
                Vous recevez le Pendentif de la Lune.
                Vous recevez également 1XP.`)

            player.inventory.remove("Éther")
            player.inventory.add(getCupsItem(6))
            player.experiencePoints++

            btn1.innerText = "Continuer"
        }

        function giveGold() {
            if (player.goldCoins < 200) return;

            gameMessage(`Vous donnez 200PO au voyageur.
                Il vous remercie chaleureusement et vous offre un objet en retour.
                
                Vous recevez une Dague.
                Vous recevez également 1XP.`)

            player.goldCoins -= 200
            player.inventory.add(new SwordsItem(swordsItemsTable[0]))
            player.experiencePoints++

            btn1.innerText = "Continuer"
        }

        function fightTraveler() {
            // Humain male costaud
            const traveler = generateIntelligentBeing(1, [strongTraitsTable[5]])
            traveler.gender = "M"

            let introMessage = `Vous faites comprendre au voyageur vos intentions hostiles. Ce dernier vous regarde avec stupeur en se redressant, prêt à défendre sa peau.`

            const travelerPreparationPhase = (ctx) => {
                let message = ``
                const roll = d20.roll()

                // Teleports away
                if (roll >= 11) {
                    btn1.innerText = "Continuer"
                    btn1.onclick = () => {
                        // TODO: check next step.
                    }
                    message += `Le voyageur lance un sort de téléportation et disparaît avec sa fille, vous laissant ${player.gender == "F" ? "seule" : "seul"} au milieu du chemin.
                        
                        Le combat est terminé.`
                    if (player.hitPoints < player.maxHitPoints) {
                        player.restoreHitPoints()
                        message += `
                        Vous vous soignez et continuez votre route.`
                        gameMessage(message)
                        return
                    }

                    message += ` Vous continuez votre route.`
                    gameMessage(message)
                    return
                }

                // Traveler does nothing
                message = `${beingNameWithDeterminantDefini(ctx.opponent, false)} ne fais rien.`

                // If player already prepared we go to the player's attack phase
                if (playerHasInitiative(ctx.opponent)) {
                    message += `
                    
                    -- C'est à votre tour d'attaquer.`

                    gameMessage(message);

                    btn1.innerText = "Attaquer"
                    btn1.onclick = () => {
                        playerAttackPhase(ctx)
                    }
                    return
                }

                // Otherwise, we go to its prepare phase
                message += `
                
                -- C'est à votre tour de vous préparer.`

                gameMessage(message);

                btn1.innerText = "Se préparer"
                btn1.onclick = () => {
                    playerPreparationPhase(ctx)
                }
            }

            const travelerRewardPhase = () => {
                btn1.innerText = "Continuer"
                btn1.onclick = () => {
                    // TODO: check next step.
                }

                player.experiencePoints++;

                let message = `Le voyageur est vaincu.
                Vous recevez 1XP`

                if (player.hitPoints < player.maxHitPoints) {
                    player.restoreHitPoints()
                    message += `.
                    Vous vous soignez et continuez votre route.`
                    gameMessage(message)
                    return
                }

                message += ` et continuez votre route.`
                gameMessage(message)
            }

            const contextData = {
                opponent: traveler,
                introMessage: introMessage,
                opponentPreparationPhaseCallBack: travelerPreparationPhase,
                rewardPhaseCallBack: travelerRewardPhase
            }

            fight(contextData)
        }

        function leave() {
            btn1.disabled = false
            btn1.innerText = "Continuer"
            btn1.onclick = () => {
                // TODO: check next step
            }

            gameMessage(`Vous partagez votre sympathie au voyageur mais lui dites que vous ne pouvez pas l'aider.
                Vous gagner 1Xp et continuer votre route.`)

            player.experiencePoints++;
        }

    }
}

function luckyEncounter() {

}
//#endregion

function addCardToDisplayZone(card) {
    const cardElement = document.createElement("img")
    cardElement.setAttribute("src", card.imageURL)
    cardElement.setAttribute("alt", card.description)
    cardElement.classList.add("card")
    zoneCardsDrawn.appendChild(cardElement)
}

function clearCardsDisplayZone() {
    zoneCardsDrawn.innerHTML = ``;
}

function isBeingDead(being) {
    if (being.hitPoints <= 0) {
        return true
    }

    return false
}

function gameMessage(text) {
    txtDungeonMaster.innerText = text;
}

function gameOver() {
    gameMessage(`Vous êtes ${player.gender == "F" ? "morte" : "mort"}, votre aventure s'achève ici.
            Merci d'avoir joué ! On espère que vous vous êtes quand même bien ${player.gender == "F" ? "amusée" : "amusé"}.
            Rechargez la page si vous souhaitez recommencer une partie.`)
}

