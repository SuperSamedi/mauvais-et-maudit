//#region DOM links
const txtDungeonMaster = document.getElementById("dungeon-master-text");

const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const btn3 = document.getElementById("btn3");
const btn4 = document.getElementById("btn4");
const btn5 = document.getElementById("btn5");
const btn6 = document.getElementById("btn6");
const btnRaceRoll = document.getElementById("btn-race-roll");
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

let allowedToDraw = false;
let allowedToSellItems = false;
let allowedToLevelUp = false;
let allowedToRerollEnvironmentRoll = false


btnRaceRoll.onclick = choosePlayerRace;
btnCardDraw.onclick = () => {
    allowedToDraw = true;
};


btnFightMonster.onclick = () => { monsterEncounter() }
btnVisitShop.onclick = () => { visitShop() }

const adventureBeginsMessage = `Vous contemplez les plaines de votre campagne natale. Savoir que vous ne reviendrai peut-être jamais chez vous vous fais un petit pincement au cœur mais votre détermination est sans faille, votre destin vous appelle.`
btnNextAdventure.onclick = () => { nextAdventure(adventureBeginsMessage) }

imgDeck.onclick = () => {
    if (allowedToDraw) {
        clearCardsDisplayZone();
        drawReward(scopaDeck, false, true);
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
        // console.log(strongTraitsTable);
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
//#region ReducedRoll Tests
// Reduced roll algorithm test
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

//#region Test gender equity
// let males = 0
// let females = 0

// for (let i = 0; i < 10000; i++) {
//     const being = generateIntelligentBeing()
//     if (being.gender == "F") {
//         females++
//         continue
//     }
//     if (being.gender == "M") {
//         males++
//     }
// }

// console.log(`males: ${males}`);
// console.log(`females: ${females}`);
//#endregion

//#region Tests Strongissime trait
// setTimeout(function () {
//     // console.log(strongTraitsTable);
//     // const testTraits = [getStrongTrait(3), getStrongTrait(3), getStrongTrait(3)]
//     // const testTraits = [getStrongTrait(20), getStrongTrait(1), getStrongTrait(20), getStrongTrait(1), getStrongTrait(5)]
//     // const testTraits = [getStrongTrait(19), getStrongTrait(1), getStrongTrait(19)]
//     const testTraits = [getStrongTrait(15), getStrongTrait(15)]
//     const being = generateIntelligentBeing(20, testTraits)
//     console.log(being.name);
// }, 200);
//#endregion
//#endregion

// =====> START
hideAllGenericButtons()


function choosePlayerGender(params) {
    // TODO
}

function choosePlayerRace() {
    const roll = d20.roll();

    let hybridRaceA = {};
    let hybridRaceB = {};
    // const roll = getRandomInt(intelligentRacesTable.length) + 1;

    player.races[0] = structuredClone(intelligentRacesTable[roll - 1]);
    //console.log(intelligentRacesTable);

    // Non-Being special rule
    if (player.races[0].name.male == "Non-Être") {
        player.restoreHitPoints();
        player.updateAllVisuals();
        generateNonBeingPlayer(player.races[0], false);
        return;
    }

    // Hybrid special rule
    if (player.races[0].name.male == "Hybride") {
        player.updateAllVisuals();
        generateHybridPlayer();
        return;
    }

    gameMessage(`${roll} ! - ${player.races[0].name.male}`);

    player.restoreHitPoints();
    player.updateRaceVisuals();
    player.updateStatsVisuals();

    gameMessage(`${currentGameMessage()}

        - Maintenant, lancez le D20 pour tirer votre trait.`)

    activateButton(btn1)
    btn1.innerText = "Lancer le D20"
    btn1.onclick = () => { choosePlayerTrait() }

    //#region Non-Being Player Generation
    function generateNonBeingPlayer(being, isGeneratingHybrid) {
        gameMessage(`19 ! - Non-Être.
        Les Non-Êtres sont des créatures instables. Tu vas devoir tirer tes stats au hasard.
        Lance le D100 pour tes points de vie.`);

        activateButton(btn1)
        btn1.innerText = "Lancer le D100";
        btn1.onclick = generateNonBeingHitPoints;

        function generateNonBeingHitPoints() {
            const roll = d100.roll();

            being.hitPoints = roll;

            if (!isGeneratingHybrid) {
                player.restoreHitPoints();
            }

            gameMessage(`${roll} !
        Maintenant, lance à nouveau le D100 pour ta stat de force.`);

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
            const totalStats = being.hitPoints + being.strength + being.speed + being.magic;
            console.log(`Total Non-Être stats : ${totalStats}`);

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
                activateButton(btn1)
                btn1.innerText = "Continuer"
                btn1.onclick = () => { generateHybridPlayer(); }

                if (!hybridRaceB.name) {
                    gameMessage(`${currentGameMessage()}

                        - Lancez le D20 pour tirer votre deuxième race.`)

                    btn1.innerText = "Lancer le D20"
                    return
                }
            }

            gameMessage(`${currentGameMessage()}

                - Maintenant, lancez le D20 pour tirer votre trait.`)

            activateButton(btn1)
            btn1.innerText = "Lancer le D20"
            btn1.onclick = () => { choosePlayerTrait() }
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
                being.hitPoints = hitPoints.value
                being.strength = strength.value
                being.speed = speed.value
                being.magic = magic.value

                // TODO : hide stats adjustment panel
                gameMessage(`C'est bon !`)

                if (isGeneratingHybrid) {
                    if (!hybridRaceB.name) {
                        gameMessage(`${currentGameMessage()}
                            
                            - Maintenant, lancez le D20 pour tirer votre deuxième race.`)

                        activateButton(btn1)
                        btn1.innerText = "Lancer le D20"
                        btn1.onclick = () => { generateHybridPlayer(); }
                        return
                    }

                    generateHybridPlayer()
                    return
                }

                player.restoreHitPoints();
                player.updateAllVisuals();
                console.log(player);

                gameMessage(`${currentGameMessage()}

                    - Maintenant, lancez le D20 pour tirer votre trait.`)

                activateButton(btn1)
                btn1.innerText = "Lancer le D20"
                btn1.onclick = () => { choosePlayerTrait() }
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

            activateButton(btn1)
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
        player.races = [hybridRaceA, hybridRaceB]
        player.restoreHitPoints();
        player.updateAllVisuals();
        gameMessage(`${currentGameMessage()}
            
            Maintenant, lancez le D20 pour choisir votre trait.`)

        activateButton(btn1)
        btn1.innerText = "Lancer le D20"
        btn1.onclick = () => {
            choosePlayerTrait()
        }


        function generateHybridPlayerFirstHalf() {
            const roll = d20.roll();

            hybridRaceA = structuredClone(intelligentRacesTable[roll - 1]);

            // Hybrid exception
            if (hybridRaceA.name.male == "Hybride") {
                gameMessage(`${roll} ! ${player.gender == "F" ? hybridRaceA.name.female : hybridRaceA.name.male} à nouveau. Relancez.`);
                btn1.innerText = "Relancer un D20";
                return;
            }

            // Non-Being special rule
            if (hybridRaceA.name.male == "Non-Être") {
                player.races = [hybridRaceA, {}]
                player.updateAllVisuals();
                generateNonBeingPlayer(hybridRaceA, true); // Sends us back to generateHybridPlayer at the end
                return;
            }

            player.races = [hybridRaceA, {}]

            gameMessage(
                `${roll} ! ${player.gender == "F" ? hybridRaceA.name.female : hybridRaceA.name.male}. Maintenant, lancez à nouveau le D20 pour votre deuxième race.`
            );

            btn1.innerText = "Lancer un D20";
            btn1.onclick = generateHybridPlayerSecondHalf;

            player.updateAllVisuals();
        }

        function generateHybridPlayerSecondHalf() {
            const roll = d20.roll();

            hybridRaceB = structuredClone(intelligentRacesTable[roll - 1]);

            if (
                hybridRaceB.name.male == "Hybride" ||
                hybridRaceB.name.male == hybridRaceA.name.male
            ) {
                gameMessage(`${roll} ! ${player.gender == "F" ? hybridRaceB.name.female : hybridRaceB.name.male} à nouveau. Relancez.`);
                btn1.innerText = "Relancer un D20";
                return;
            }

            if (hybridRaceB.name.male == "Non-Être") {
                player.races = [hybridRaceA, hybridRaceB]
                player.updateAllVisuals();
                generateNonBeingPlayer(hybridRaceB, true);
                return;
            }

            gameMessage(`${roll} ! ${player.gender == "F" ? hybridRaceB.name.female : hybridRaceB.name.male}.`);
            generateHybridPlayer();
        }
    }

    //#endregion
}

function choosePlayerTrait() {
    hideAllGenericButtons()
    const roll = getRandomInt(strongTraitsTable.length) + 1;

    player.traits[0] = structuredClone(strongTraitsTable[roll - 1]);

    gameMessage(`${roll} ! - ${player.gender == "F" ? player.traits[0].name.accordFeminin : player.traits[0].name.accordMasculin}
        
        - Ensuite, tirez une carte du deck. Vous recevrez une récompense en fonction de la carte.`);

    player.restoreHitPoints();
    player.updateTraitVisuals();
    player.updateStatsVisuals();

    allowedToDraw = true
}

function chooseNewEnvironment(customMessage) {
    let message = customMessage
    gameMessage(`${customMessage}
        
        Vous arrivez dans un nouvel environement.
        Lancez le D20 pour tirer celui-ci.`)

    hideAllGenericButtons()
    btn1.style.display = "block"
    btn1.disabled = false
    btn1.innerText = "Lancer le D20"
    btn1.onclick = () => { newEnvironmentResult(d20.roll()) }

    function newEnvironmentResult(roll) {
        const newEnvironment = environmentsTable[roll - 1]

        // Pass data to the currentEnvironment of voyage.js
        currentEnvironment.name = newEnvironment.name
        currentEnvironment.description = newEnvironment.description
        if (newEnvironment.statsModifiers) currentEnvironment.statsModifiers = newEnvironment.statsModifiers
        if (newEnvironment.shopModifiers) currentEnvironment.shopModifiers = newEnvironment.shopModifiers
        if (newEnvironment.InnModifiers) currentEnvironment.InnModifiers = newEnvironment.InnModifiers

        let message = `${roll} ! ${newEnvironment.name}.
        - Effet : ${newEnvironment.description}`

        if (allowedToRerollEnvironmentRoll) {
            gameMessage(`${message}
                
                Durant votre voyage vous avez gagné la possibilité d'annuler votre prochain jet d'environnement. Voulez-vous annuler ce jet et relancer le dé ?`)

            allowedToRerollEnvironmentRoll = false

            btn1.innerText = "Garder ce lancé"
            btn1.onclick = () => {
                updateAllEnvironmentVisuals()
                player.updateStatsVisuals()

                nextAdventure()
            }
            activateButton(btn2)
            btn2.innerText = "Relancer"
            btn2.onclick = () => { newEnvironmentResult(d20.roll()) }

            return
        }

        updateAllEnvironmentVisuals()
        player.updateStatsVisuals()

        gameMessage(`${roll} ! ${newEnvironment.name}.
            - Effet : ${newEnvironment.description}`)

        btn1.innerText = "Continuer"
        // TODO :  add flavor text to the environments
        btn1.onclick = () => { nextAdventure("") }
    }
}

function drawReward(deck = scopaDeck, allCardsCountAsCoins = false, isSetUpReward = false) {
    if (!allowedToDraw) return

    allowedToDraw = false;

    if (deck.length <= 0) {
        gameMessage("La pioche est vide...");
        btn1.innerText = "Continuer"
        btn1.onclick = () => { nextAdventure("") }
        return;
    }

    let feedbackMessage = "";

    const cardDrawn = structuredClone(deck.shift());
    //console.log(scopaDeck);
    addCardToDisplayZone(cardDrawn)
    feedbackMessage += `${cardDrawn.description} !`;
    let reward = {}

    if (cardDrawn.suit == "coins" || allCardsCountAsCoins === true) {
        reward = structuredClone(coinsItemsTable[cardDrawn.value - 1]);
        player.goldCoins += reward.goldCoins;
        feedbackMessage += ` 
        Vous recevez ${reward.goldCoins} pièces d'or`;

        if (reward.actionPoints) {
            player.actionPoints += reward.actionPoints;
            feedbackMessage += ` et ${reward.actionPoints} point d'action`;
        }
    }

    if (cardDrawn.suit == "swords" && allCardsCountAsCoins === false) {
        reward = new SwordsItem(structuredClone(swordsItemsTable[cardDrawn.value - 1]));
        player.inventory.add(reward);
        feedbackMessage += ` 
        Vous recevez ${reward.preposition}${reward.name} (${reward.description})`;
        //console.log(inventory);
    }

    feedbackMessage += `.`;

    hideAllGenericButtons()
    activateButton(btn1)

    if (isSetUpReward) {
        imgDeck.onclick = () => {
            if (allowedToDraw) {
                clearCardsDisplayZone();
                drawReward(scopaDeck, false, false)
            }
        }
        player.actionPoints += 2
        feedbackMessage += `
        Vous recevez également, comme bonus de départ, 2 points d'action${reward.actionPoints ? " supplémentaires" : ""}.
        
        Vous êtes maintenant ${player.gender == "F" ? "prête" : "prêt"} à commencer votre aventure !
        - Appuyer sur 'Commencer'.`

        gameMessage(feedbackMessage);


        btn1.innerText = "Commencer"
        btn1.onclick = () => { nextAdventure(adventureBeginsMessage) }

        return
    }

    gameMessage(feedbackMessage);

    btn1.innerText = "Continuer"
    btn1.onclick = () => {
        clearCardsDisplayZone()
        nextAdventure()
    }
}

function generateIntelligentBeing(roll = d20.roll(), traits = []) {
    let gender = d20.reducedRoll(d20.roll(), 2) == 1 ? "F" : "M"

    let being = new Being(
        "Intelligent Being",
        [structuredClone(intelligentRacesTable[roll - 1])],
        gender,
        traits
    )

    // Momie special rule
    if (being.races[0].name.female == "Momie") {
        being.gender = "F"
    }

    // Golem special rule
    if (being.races[0].name.male == "Golem") {
        being.gender = "M"
    }

    // Non-Being special rule
    if (being.races[0].name.male == "Non-Être") {
        being.races[0] = generateNonBeingRace();
    }

    // Hybrid special rule
    if (being.races[0].name.male == "Hybride") {
        being.races = generateHybridRaces();
    }

    function generateNonBeingRace() {
        let race = {};

        race.name = {}
        race.name.female = "Non-Être";
        race.name.male = "Non-Être";

        // Generate stats
        race.hitPoints = d100.roll();
        race.strength = d100.roll();
        race.speed = d100.roll();
        race.magic = d100.roll();

        return adjustGeneratedNonBeing(race);

        function adjustGeneratedNonBeing(being) {
            const totalStats = being.hitPoints + being.strength + being.speed + being.magic;
            // console.log(`Non-Être généré avec ${totalStats} points de stats totales.`);

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
            // const adjustedTotalStats = being.hitPoints + being.strength + being.speed + being.magic
            // console.log(`Final adjustd stat total : ${adjustedTotalStats}`);
            return being;
        }
    }

    function generateHybridRaces() {
        let raceA = {};
        let raceB = {};

        raceA.name = {}
        raceB.name = {}
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

        return [raceA, raceB];
    }

    being.restoreHitPoints();
    return being;
}

function generateMonster(roll = d20.roll(), traits = []) {
    let monster = new Being("Monster", [structuredClone(monstersTable[roll - 1])], undefined, traits);

    if (monster.races[0].name.male == "Parasite") {
        monster = generateIntelligentBeing(d20.roll(), monster.traits);
        monster.races[monster.races.length - 1].name.female += ` parasitée`;
        monster.races[monster.races.length - 1].name.male += ` parasité`;
    }

    if (monster.races[0].name.male == "Métamorphe") {
        monster.races[0].hitPoints = d100.roll();
        monster.races[0].strength = clamp(d100.roll() - 30, 10, 100);
        monster.races[0].speed = clamp(d100.roll() - 30, 10, 100);
        monster.races[0].magic = clamp(d100.roll() - 30, 10, 100);
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

    hideAllGenericButtons()
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
            gameMessage(`Voulez-vous utiliser un point d'action pour effectuer une attaque puissante ? (Vous recevrez un lancé bonus du D100 qui sera ajouté à vos dégâts.)`)

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
            Lancez une première fois le D100 pour voir combien de dégâts vous allez infliger.`)

        btn2.style.display = "none"
        btn1.innerText = "Lancer le D100"
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
        gameMessage(`Très bien, lancez le D100 pour voir combien de dégâts vous allez infliger.`)

        btn2.style.display = "none"
        btn1.innerText = "Lancer le D100"
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
    gameMessage(`Vous avez résisté à l'assault ${beingNameWithDeterminantDefiniContracte(ctx.opponent, "de")} mais ${ctx.opponent.gender == "F" ? "cette dernière" : "ce dernier"} est toujours debout et prêt${ctx.opponent.gender == "F" ? "e" : ""} à en découdre.
        
        -- Un nouveau tour de combat commence.`)

    btn1.innerText = "Commencer"
    btn1.onclick = () => { initiativePhase(ctx) }
}

function regularRewardPhase(ctx) {
    stepCompleted();
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
        hideAllGenericButtons()

        const reducedRoll = d20.reducedRoll(roll, 4)

        switch (reducedRoll) {
            case 2:
                gameMessage(`${roll} !
                    Vous gagnez 1 point d'action.`)
                player.actionPoints++
                break;

            case 3:
                gameMessage(`${roll} !
                    Vous pouvez tirer une carte du deck mais toutes les cartes comptent comme des cartes 'Pièces'.`)
                allowedToDraw = true;
                imgDeck.onclick = () => {
                    drawReward(scopaDeck, true)
                }
                return

            case 4:
                gameMessage(`${roll} !
                    Vous pouvez tirer une carte du deck. Vous gagnez immédiatement l'objet ou l'or correspondant.`)
                allowedToDraw = true;
                imgDeck.onclick = () => {
                    drawReward(scopaDeck, false)
                }
                return

            default:
                gameMessage(`${roll} !
                    Aucune récompense.Déso...`)
                break;
        }

        btn1.style.display = "block"
        btn1.disabled = false
        btn1.innerText = "Continuer"
        btn1.onclick = () => { nextAdventure("") }
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

function nextAdventure(customMessage = "") {
    hideAllGenericButtons()
    // If we start a new environment we choose it first
    if (isFirstStep() && currentEnvironment.name == "") {
        chooseNewEnvironment(customMessage)
        return
    }

    let message = customMessage

    gameMessage(`${message}
        
        Une nouvelle étape de votre voyage commence.
        Lancez un D100 pour voir quelles péripéties vous attendent.`)

    activateButton(btn1)
    btn1.innerText = "Lancer le D100"
    // Test button
    btn1.onclick = () => { chooseNextAdventure(21) }

    // btn1.onclick = () => {
    //     const roll = d100.roll()
    //     chooseNextAdventure(roll)
    // }

    function chooseNextAdventure(roll) {
        hideAllGenericButtons()

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
            btn1.disabled = false

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
                    btn1.style.display = "none"
                    btn1.disabled = true
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
            btn2.disabled = false

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
            btn3.disabled = false

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
                    btn3.style.display = "none"
                    btn3.disabled = true
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
    let traits = generateTraits()
    const monster = generateMonster(d20.roll(), traits)
    let introMessage = `${monster.gender == "F" ? "Une" : "Un"} ${monster.name} vous barre la route. Le combat est inévitable.`

    const contextData = {
        opponent: monster,
        introMessage: introMessage,
        opponentPreparationPhaseCallBack: regularOpponentPreparationPhase,
        rewardPhaseCallBack: regularRewardPhase
    }

    fight(contextData)
}

function intelligentBeingEncounter() {
    hideAllGenericButtons()

    let traits = generateTraits()
    const intelligentBeing = generateIntelligentBeing(d20.roll(), traits)
    console.log("intelligent being Encounter :");
    console.log(intelligentBeing);

    gameMessage(`Alors que vous marchiez tranquillement sur le chemin, vous croisez ${intelligentBeing.gender == "F" ? "une" : "un"} ${intelligentBeing.name}. 
        Lancez le D20 pour voir quel attitude ${intelligentBeing.gender == "F" ? "elle" : "il"} va adopter.`)

    activateButton(btn1)
    btn1.innerText = "Lancer le D20"
    btn1.onclick = () => {
        const roll = d20.roll()
        checkAttitude(roll)
    }

    function checkAttitude(roll) {
        console.log("checkattitude roll" + roll);
        if (roll <= 3) {
            gameMessage(`${roll} !
                ${beingNameWithDeterminantDefini(intelligentBeing, false)} vous salue poliment et fait mine de vouloir continuer sa route sans plus d'interaction.
                - Voulez-vous continuer votre chemin ou l'attaquer ?`)

            activateButton(btn2)
            btn1.innerText = "Continuer"
            btn2.innerText = "Attaquer"
            btn1.onclick = () => { letBeingGo() }
            btn2.onclick = () => {
                const contextData = {
                    opponent: intelligentBeing,
                    introMessage: `Vous poussez agressivement ${beingNameWithDeterminantDefini(intelligentBeing, false)} et adoptez une position de combat.`,
                    opponentPreparationPhaseCallBack: regularOpponentPreparationPhase,
                    rewardPhaseCallBack: regularRewardPhase
                }

                fight(contextData)
            }
            return;
        }
        if (roll <= 6) {
            // If race in common or as strong as the being - Free passage
            if (player.hasARaceInCommonWith(intelligentBeing) || player.strength >= intelligentBeing.strength) {
                gameMessage(`${roll} !
                    ${beingNameWithDeterminantDefini(intelligentBeing, false)} vous toise du regard avant de s'écarter du chemin pour vous laisser passer. Vous déceler un certain air de frustration sur son visage.
                    
                    - Voulez-vous continuer votre route ou l'attaquer ?`)

                activateButton(btn2)
                btn1.innerText = "Continuer"
                btn2.innerText = "Attaquer"
                btn1.onclick = () => { letBeingGo() }
                btn2.onclick = () => {
                    const contextData = {
                        opponent: intelligentBeing,
                        introMessage: `Vous poussez agressivement ${beingNameWithDeterminantDefini(intelligentBeing, false)} et adoptez une position de combat.`,
                        opponentPreparationPhaseCallBack: regularOpponentPreparationPhase,
                        rewardPhaseCallBack: regularRewardPhase
                    }

                    fight(contextData)
                }
                return
            }

            // Otherwise, asks for toll
            const toll = 50 * (environments.indexOf(currentEnvironment) + 1)

            gameMessage(`${roll} !
                ${beingNameWithDeterminantDefini(intelligentBeing, false)} se met en travers du chemin et d'un air menaçant vous demande ${toll}PO pour pouvoir passer.
                
                Que choisissez-vous ?
                - Donner l'argent.
                - Attaquer ${beingNameWithDeterminantDefini(intelligentBeing, true)}.`)

            activateButton(btn2)
            btn1.innerText = `Donner ${toll}PO`
            btn2.innerText = `Attaquer`
            btn1.onclick = () => { giveGold(toll) }
            btn2.onclick = () => {
                const contextData = {
                    opponent: intelligentBeing,
                    introMessage: `Vous poussez agressivement ${beingNameWithDeterminantDefini(intelligentBeing, false)} et adoptez une position de combat.`,
                    opponentPreparationPhaseCallBack: regularOpponentPreparationPhase,
                    rewardPhaseCallBack: regularRewardPhase
                }

                fight(contextData)
            }
            return
        }
        if (roll <= 9) {
            // If race in common or as strong magically as the being - Free passage
            if (player.hasARaceInCommonWith(intelligentBeing) || player.magic >= intelligentBeing.magic) {
                gameMessage(`${roll} !
                    ${beingNameWithDeterminantDefini(intelligentBeing, false)} vous toise du regard avant de s'écarter du chemin pour vous laisser passer. Vous déceler un certain air de frustration sur son visage.
    
                    - Voulez-vous continuer votre route ou l'attaquer ?`)

                activateButton(btn2)
                btn1.innerText = "Continuer"
                btn2.innerText = "Attaquer"
                btn1.onclick = () => { letBeingGo() }
                btn2.onclick = () => {
                    const contextData = {
                        opponent: intelligentBeing,
                        introMessage: `Vous poussez agressivement ${beingNameWithDeterminantDefini(intelligentBeing, false)} et adoptez une position de combat.`,
                        opponentPreparationPhaseCallBack: regularOpponentPreparationPhase,
                        rewardPhaseCallBack: regularRewardPhase
                    }

                    fight(contextData)
                }
                return
            }

            // Otherwise, asks for toll
            const toll = 50 * (environments.indexOf(currentEnvironment) + 1)

            gameMessage(`${roll} !
            ${beingNameWithDeterminantDefini(intelligentBeing, false)} se met en travers du chemin et d'un air menaçant vous demande ${toll}PO pour pouvoir passer.

            Que choisissez-vous ?
            - Donner l'argent.
            - Attaquer ${beingNameWithDeterminantDefini(intelligentBeing, true)}.`)

            activateButton(btn2)
            btn1.innerText = `Donner ${toll}PO`
            btn2.innerText = `Attaquer`
            btn1.onclick = () => { giveGold(toll) }
            btn2.onclick = () => {
                const contextData = {
                    opponent: intelligentBeing,
                    introMessage: `Vous poussez agressivement ${beingNameWithDeterminantDefini(intelligentBeing, false)} et adoptez une position de combat.`,
                    opponentPreparationPhaseCallBack: regularOpponentPreparationPhase,
                    rewardPhaseCallBack: regularRewardPhase
                }

                fight(contextData)
            }
            return
        }
        if (roll <= 12) {
            // FIGHT !
            const introMessage = `${roll} !
                Dès que ${beingNameWithDeterminantDefini(intelligentBeing, true)} vous aperçois, ${intelligentBeing.gender == "F" ? "elle" : "il"} sort son arme et se rue vers vous en criant sauvagement !`

            const contextData = {
                opponent: intelligentBeing,
                introMessage: introMessage,
                opponentPreparationPhaseCallBack: regularOpponentPreparationPhase,
                rewardPhaseCallBack: regularRewardPhase
            }

            fight(contextData)

            return
        }
        if (roll <= 15) {
            const unbuffedBeing = structuredClone(intelligentBeing)
            const introMessage = `${roll} !
            Lorsque ${beingNameWithDeterminantDefini(unbuffedBeing, true)} arrive à votre hauteur, ${unbuffedBeing.gender == "F" ? "elle" : "il"} vous lance un grognement bourru. Vous ${unbuffedBeing.gender == "F" ? "la" : "le"} saluez en retour ce qui, surprenamment, à pour effet de faire entrer ${beingNameWithDeterminantDefini(unbuffedBeing, true)} dans une rage folle. `

            intelligentBeing.traits.push(getStrongTrait())

            const contextData = {
                opponent: intelligentBeing,
                introMessage: introMessage,
                opponentPreparationPhaseCallBack: regularOpponentPreparationPhase,
                rewardPhaseCallBack: regularRewardPhase
            }

            fight(contextData)

            return
        }
        if (roll <= 18) {
            allowedToRerollEnvironmentRoll = true
            player.experiencePoints++
            stepCompleted()

            gameMessage(`${roll} !
                ${beingNameWithDeterminantDefini(intelligentBeing, false)} vous salue amicalement et vous fait part d'un malencontreux événement qui lui est arrivé sur sa route. Vous prenez bonnes notes de ces précieuses informations. Qui sait, peut-être réussirez-vous, grâce à ces dernières, à déjouer les périls du chemin ardu qui vous attend ?
                - Vous gagnez 1XP et la possibilité d'annuler votre prochain lancé de dé d'environnement et de le relancer.`)

            btn1.innerText = "Continuer"
            btn1.onclick = () => { nextAdventure() }
            return
        }
        if (roll <= 20) {
            gameMessage(`${roll} !
                Vous réalisez que ${beingNameWithDeterminantDefini(intelligentBeing, true)} est en fait ${intelligentBeing.gender == "F" ? "une marchande itinérante" : "un marchand itinérant"}.
                
                Que choisissez-vous de faire ?
                    - Faire affaire avec ${intelligentBeing.gender == "F" ? "la marchande" : "le marchand"}
                    - Attaquer ${intelligentBeing.gender == "F" ? "la marchande" : "le marchand"}`)

            activateButton(btn2)
            btn1.innerText = "Voir la marchandise"
            btn1.onclick = () => {
                visitShop(
                    `Vous faites signe ${intelligentBeing.gender == "F" ? "à la marchande" : "au marchand"} de vous montrer sa marchandise.`,
                    `Vous remerciez ${intelligentBeing.gender == "F" ? "la marchande" : "le marchand"} pour son temps et continuez votre route.`,
                    `${intelligentBeing.gender == "F" ? "La marchande" : "Le marchand"} vous fait part que, malheureusement, tout son stock est vide`,
                    `${player.gender == "F" ? "Déçue" : "Déçu"}, vous faites comprendre ${intelligentBeing.gender == "F" ? "à la marchande" : "au marchand"} que ça ne fait rien avant de continuer votre route.`,
                    2)
            }
            btn2.innerText = "Attaquer"
            btn1.onclick = () => {
                const contextData = {
                    opponent: intelligentBeing,
                    introMessage: `Sans aucune sommation, vous dégainez et brandissez votre arme dans la direction ${intelligentBeing.gender == "F" ? "de la marchande" : "du marchand"}. ${intelligentBeing.gender == "F" ? "Cette dernière" : "Ce dernier"} lâche un cris d'effroi et sort une arme de son sac-à-dos.`,
                    opponentPreparationPhaseCallBack: regularOpponentPreparationPhase,
                    rewardPhaseCallBack: regularRewardPhase
                }

                fight(contextData)
            }
        }

        return

        function letBeingGo() {
            hideAllGenericButtons()

            gameMessage(`Vous continuez votre route.
                - Vous gagnez 1XP.`)

            stepCompleted()
            player.experiencePoints++

            activateButton(btn1)
            btn1.innerText = "Continuer"
            btn1.onclick = () => {
                nextAdventure()
            }
        }

        function giveGold(amount) {
            hideAllGenericButtons()

            gameMessage(`Vous donnez ${amount}PO ${intelligentBeing.gender == "F" ? "à la racketteuse" : "au racketteur"} et continuez votre route.
                - Vous gagnez 1XP.`)

            player.goldCoins -= amount
            player.experiencePoints++
            stepCompleted()

            activateButton(btn1)
            btn1.innerText = "Continuer"
            btn1.onclick = () => {
                nextAdventure()
            }
        }
    }
}


function restEncounter() {
    const introMessage = `Vous trouvez un coin relativement sûr et aménagez un campement sommaire. Vous vous sustentez et vous apprêtez à passer la nuit tout en repensant aux situations auxquelles vous avez fait face jusqu'ici.`
    const outroMessage = `Après une bonne nuit de sommeil, vous mangez un déjeuner frugal avant de remballer vos affaires et de vous remettre en route.`

    rest(introMessage, outroMessage, "Lever le camp")
}

function villageEncounter() {
    let innPrice = 100

    // environment modifiers
    if (currentEnvironment.innModifiers) {
        if (currentEnvironment.innModifiers.price) {
            innPrice += currentEnvironment.innModifiers.price
        }
    }

    gameMessage(`Vous arrivez sur la place principale d'un petit village. Les passants vous dévisagent avec méfiance.
        
        Que choisissez-vous de faire :
        - Se rendre au magasin. (possibilité d'acheter et de revendre des objets)
        - Se rendre à l'auberge. (coûte ${innPrice}PO, permet de se reposer)`)

    hideAllGenericButtons()

    activateButton(btn1)
    activateButton(btn2)

    btn1.innerText = "Aller au magasin"
    btn2.innerText = "Aller à l'auberge (-100PO)"

    btn1.onclick = () => {
        visitShop()
    }
    btn2.onclick = () => {
        visitInn(innPrice)
    }

    if (player.goldCoins < innPrice) btn2.disabled = true
}

function visitShop(
    introMessage = "Vous entrez dans le magasin.",
    leaveMessage = "Vous sortez du magasin et continuez votre route.",
    noCardsMessage = "Vous arrivez devant le magasin mais réalisez avec déception que celui-ci est fermé",
    noCardsLeaveMessage = "Vous sortez du village avec déception.Mais vous repensez à votre quête et retrouvez du baume au cœur car seul vous pouvez arrêter le Mal et ce dernier n'attend pas.",
    maxCards = 4
) {
    hideAllGenericButtons()

    if (scopaDeck.length <= 0) {
        gameMessage(`${noCardsMessage} (il n'y a plus de carte dans la pioche).`);
        activateButton(btn1)
        btn1.innerText = "Partir"
        btn1.onclick = () => {
            stepCompleted()
            nextAdventure(`${noCardsLeaveMessage}`)
        }
        return;
    }

    gameMessage(`${introMessage}
        Tirez ${maxCards} cartes pour voir quels objets sont en vente (les cartes 'Pièces' ne correspondent à aucun objet achetable).`);

    let cardsDrawn = []

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
            // TODO : manage situation 
            return;
        }

        const cardDrawn = structuredClone(deck.shift())
        cardsDrawn.push(cardDrawn)
        addCardToDisplayZone(cardDrawn)

        if (isAllowedToDrawMore()) {
            gameMessage(`${cardDrawn.description}.
                Tirez encore ${maxCards - cardsDrawn.length} ${cardsDrawn.length == maxCards - 1 ? "carte" : "cartes"}.`)

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
            C'est bon. Appuyez sur continuer pour voir l'objet, ou les objets, disponible(s).`)

        activateButton(btn1)
        btn1.innerText = "Continuer"
        btn1.onclick = () => { deployShop() }

        function isAllowedToDrawMore() {
            if (cardsDrawn.length >= maxCards) {
                return false
            }

            return true
        }
    }

    function additionalShopDraw(deck) {
        allowedToDraw = false

        if (deck.length <= 0) {
            gameMessage("La pioche est vide.");
            // TODO : manage situation 
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
            C'est bon. Appuyez sur continuer pour voir l'objet, ou les objets, disponible(s).`)

        btn1.innerText = "Continuer"
        btn1.onclick = () => { deployShop() }
    }

    function deployShop() {
        shop = new Shop();

        btn1.innerText = "Partir"
        btn1.onclick = () => {
            allowedToSellItems = false
            stepCompleted()
            clearCardsDisplayZone()
            nextAdventure(`${leaveMessage}`)
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

function visitInn(price) {
    if (player.goldCoins < price) return

    player.goldCoins -= price

    rest("Vous entrez dans l'auberge et commandez une chambre et un bon repas chaud. Vous passez une nuit paisible, le ventre plein.",
        "Au petit matin, vous rassemblez vos affaires et dégustez un délicieux déjeuner préparé par l'aubergiste avant de quitter le village et repartir sur les traces du Mal.",
        "Quitter l'auberge")

}

function rest(introMessage, outroMessage, continueButtonText) {
    gameMessage(`${introMessage}
        
        - Vous gagnez 2PA.
        - Vous pouvez dépenser vos points d'expérience(XP) pour améliorer vos caractéristiques de manière permanente (1XP = 5 points de caractéristique).
        - Vous pouvez également utiliser vos points d'expérience(XP) pour acquérir d'avantage de points d'action(PA) (1XP = 1PA).`)

    activateButton(btn1)
    activateButton(btn2)
    activateButton(btn3)
    activateButton(btn4)
    activateButton(btn5)
    activateButton(btn6)

    btn1.innerText = "Améliorer les Points de Vie (PV)"
    btn2.innerText = "Améliorer la Force (FO)"
    btn3.innerText = "Améliorer la Vitesse (VI)"
    btn4.innerText = "Améliorer la Magie (MA)"
    btn5.innerText = "Échanger 1XP pour 1PA"
    btn6.innerText = continueButtonText

    btn1.onclick = () => {
        player.levelUpHitPoints()
        checkButtonsValidity()
    }
    btn2.onclick = () => {
        player.levelUpStrength()
        checkButtonsValidity()
    }
    btn3.onclick = () => {
        player.levelUpSpeed()
        checkButtonsValidity()
    }
    btn4.onclick = () => {
        player.levelUpMagic()
        checkButtonsValidity()
    }
    btn5.onclick = () => {
        player.buyActionPoint()
        checkButtonsValidity()
    }
    btn6.onclick = () => {
        allowedToLevelUp = false
        stepCompleted()
        nextAdventure(outroMessage)
        btn6.onclick = () => { }
    }

    player.actionPoints += 2
    checkButtonsValidity()
    allowedToLevelUp = true

    function checkButtonsValidity() {
        if (player.experiencePoints <= 0) {
            btn1.disabled = true
            btn2.disabled = true
            btn3.disabled = true
            btn4.disabled = true
            btn5.disabled = true
        }
    }
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

            stepCompleted()

            hideAllGenericButtons()
            btn1.style.display = "block"
            btn1.disabled = false
            btn1.innerText = "Continuer"
            btn1.onclick = () => { nextAdventure("") }
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

            stepCompleted()

            hideAllGenericButtons()
            btn1.style.display = "block"
            btn1.disabled = false
            btn1.innerText = "Continuer"
            btn1.onclick = () => { nextAdventure("") }
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

            stepCompleted();

            hideAllGenericButtons()
            btn1.style.display = "block"
            btn1.disabled = false
            btn1.innerText = "Continuer"
            btn1.onclick = () => { nextAdventure("") }
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
                    stepCompleted()

                    btn1.innerText = "Continuer"
                    btn1.onclick = () => { nextAdventure("") }

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
                stepCompleted();

                btn1.innerText = "Continuer"
                btn1.onclick = () => { nextAdventure("") }

                player.experiencePoints++;

                let message = `Le voyageur est vaincu.
                Vous recevez 1XP`

                if (player.hitPoints < player.maxHitPoints) {
                    player.restoreHitPoints()
                    gameMessage(`${message}.
                    Vous vous soignez et continuez votre route.`)
                    return
                }

                gameMessage(`${message} et continuez votre route.`)
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
            gameMessage(`Vous partagez votre sympathie au voyageur mais lui dites que vous ne pouvez pas l'aider.
                Vous gagner 1Xp et continuer votre route.`)

            player.experiencePoints++;

            stepCompleted()

            hideAllGenericButtons()
            btn1.style.display = "block"
            btn1.disabled = false
            btn1.innerText = "Continuer"
            btn1.onclick = () => { nextAdventure("") }
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

function gameMessage(text) {
    txtDungeonMaster.innerText = text;
}

function gameOver() {
    gameMessage(`Vous êtes ${player.gender == "F" ? "morte" : "mort"}, votre aventure s'achève ici.
            Merci d'avoir joué ! On espère que vous vous êtes quand même bien ${player.gender == "F" ? "amusée" : "amusé"}.
            Rechargez la page si vous souhaitez recommencer une partie.`)
}

