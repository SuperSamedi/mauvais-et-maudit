//#region DOM links
const containerGame = document.getElementById("game")
const screenLoader = document.getElementById("loading-screen")

const txtDungeonMaster = document.getElementById("dungeon-master-text");

// Generic buttons
const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const btn3 = document.getElementById("btn3");
const btn4 = document.getElementById("btn4");
const btn5 = document.getElementById("btn5");
const btn6 = document.getElementById("btn6");

const panelPlayerName = document.getElementById("player-name-panel")
const inputPlayerName = document.getElementById("player-name-input-field")
const btnConfirmPlayerName = document.getElementById("btn-confirm-player-name-input-field")

const imgDeck = document.getElementById("btn-deck");
const zoneCardsDrawn = document.getElementById("cards-drawn")

// Stats adjustments Panel
const panelStatsAdjustment = document.getElementById("stats-adjustment-panel");
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
//#endregion

// =====> START
imgDeck.onclick = () => {
    if (allowedToDraw) {
        clearCardsDisplayZone();
        drawReward(scopaDeck, false, true);
        updateDeckVisual()
    }
};

const player = new Player();
// console.log(player);
const d20 = new Dice(20);
const d100 = new Dice(100);
let shop = new Shop();

let environmentRerolls = 0
let allowedToDraw = false;
let allowedToSellItems = false;
let allowedToLevelUp = false;
let isInCombat = false
// Test Variable TOREMOVE
let isDeckUnlocked = false

const adventureBeginsMessage = `Vous contemplez les plaines de votre campagne natale. Savoir que vous ne reviendrai peut-être jamais chez vous vous fais un petit pincement au cœur mais votre détermination est sans faille, votre destin vous appelle.`

loadJSONS();

function start() {
    console.log("Starting Game");
    updateDeckVisual()
    hideAllGenericButtons()
    panelPlayerName.style.display = "none"
    panelStatsAdjustment.style.display = "none"
    // btnCardDraw.style.display = "none"
    closeCharacterSheet()
    closeVoyage()
    detailsViewOverlay.style.display = "none"
    screenLoader.style.display = "none"
    // tests()
    presentation()
}


//#region TESTS
function tests() {
    console.log("TESTING ACTIVATED");
    // Test Buttons


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

    //#region Tests Card Draw
    // Test Buttons TOREMOVE
    // const btnUnlockDeck = document.getElementById("btn-unlock-deck")
    // btnUnlockDeck.onclick = () => {
    //     imgDeck.onclick = () => {
    //         drawTest()
    //         updateDeckVisual()
    //     }
    // }

    // function drawTest() {
    //     addCardToDisplayZone(scopaDeck.shift())
    // }
    //#endregion

    //#region Item details screen V2 
    // player.inventory.add(new EquippableItem(structuredClone(swordsItemsTable[3])))
    // player.inventory.add(new EquippableItem(structuredClone(swordsItemsTable[9])))
    // player.inventory.add(new Item(structuredClone(cupsItemsTable[0])))
    // player.inventory.add(new Item(structuredClone(cupsItemsTable[1])))
    // player.goldCoins += 200
    //#endregion

    //#region test Fight Boss
    // const btnFightBoss = document.getElementById("btn-fight-boss");
    // btnFightBoss.onclick = () => { finalAdventure() }

    // allowedToLevelUp = true
    // player.experiencePoints += 1_000_000
    // player.levelUpHitPoints(1000)
    // player.levelUpStrength(1000)
    // player.levelUpSpeed(1000)
    // player.levelUpMagic(1000)
    //#endregion

    //#region test Potion
    // player.inventory.add(getCupsItem(1))
    // player.inventory.add(getCupsItem(2))
    // player.inventory.add(getCupsItem(4))
    // player.inventory.add(getCupsItem(5))
    // player.inventory.add(getCupsItem(6))
    // player.inventory.add(getCupsItem(7))
    // player.inventory.add(getCupsItem(8))
    // player.inventory.add(getCupsItem(9))
    // player.inventory.add(getCupsItem(10))
    // player.inventory.add(getCupsItem(12))
    //#endregion
}
//#endregion


function presentation() {
    gameMessage(`Vous êtes assis·e devant votre âtre, le feu crépite. Soudain il tremble imperceptiblement, et pendant un instant la lumière vacille. Les ombres s'allongent légèrement, et un frisson glacé vous parcourt. Vous savez ce que cela signifie. Vous vous emparez de votre ancienne arme, enfilez votre manteau, et ouvrez la porte de votre masure. À l'horizon le ciel se teint de rouge et de mauve. Le Mal est revenu, et vous seul·e pouvez le vaincre...

        Bienvenue dans Mauvais & Maudit "Édition Online" !
        Vous êtes sur le point d'embarquer dans une aventure interactive textuelle. Durant cette quête, vous allez incarner un personnage dont vous allez tirer au hasard la race et le trait distinctif.
        Commençons par la race de votre personnage :
        - Appuyez sur "Lancer le D20" pour tirer au hasard votre race.`)

    activateButton(btn1, "Lancer le D20", () => { choosePlayerRace(d20.roll()) })
}

function choosePlayerRace(roll) {
    hideAllGenericButtons()

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

    activateButton(btn1, "Lancer le D20", () => { choosePlayerTrait(d20.roll()) })

    //#region Non-Being Player Generation
    function generateNonBeingPlayer(being, isGeneratingHybrid) {
        gameMessage(`19 ! - Non-Être.
        Les Non-Êtres sont des créatures instables. Vous allez devoir tirer vos stats au hasard.
        Lancez le D100 pour vos points de vie.`);

        activateButton(btn1, "Lancer le D100", () => { generateNonBeingHitPoints() })

        function generateNonBeingHitPoints() {
            const roll = d100.roll();

            being.hitPoints = roll;

            if (!isGeneratingHybrid) {
                player.restoreHitPoints();
            }

            gameMessage(`${roll} !
        Maintenant, lancez à nouveau le D100 pour votre stat de force.`);

            btn1.onclick = generateNonBeingStrength;
        }

        function generateNonBeingStrength() {
            const roll = d100.roll();

            being.strength = roll;

            if (!isGeneratingHybrid) {
                player.updateAllVisuals();
            }

            gameMessage(`${roll} !
            Maintenant, lancez encore le D100 pour votre stat de vitesse.`);

            btn1.onclick = generateNonBeingSpeed;
        }

        function generateNonBeingSpeed() {
            const roll = d100.roll();

            being.speed = roll;

            if (!isGeneratingHybrid) {
                player.updateAllVisuals();
            }

            gameMessage(`${roll} !
            Et enfin, lancez le D100 pour votre stat de magie.`);

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
            Ça y est ! Voyons maintenant si votre état de Non-Être est suffisamment stable.`
            );
            activateButton(btn1, "Vérifier", () => { checkNonBeingStability(being) })
        }

        function checkNonBeingStability(being) {
            hideAllGenericButtons()
            const totalStats = being.hitPoints + being.strength + being.speed + being.magic;
            console.log(`Total Non-Être stats : ${totalStats}`);

            if (totalStats < 200) {
                const pointsToAdd = 200 - totalStats;
                gameMessage(`Votre état de Non-Être est trop fragile. Vous allez devoir rajouter ${pointsToAdd} ${pointsToAdd == 1 ? "point à la caractéristique de votre choix" : "points répartis comme vous le souhaitez parmi vos caractéristiques"}.`)
                adjustStats(being, pointsToAdd, true);
                return;
            }

            if (totalStats > 300) {
                gameMessage(
                    `Votre état de Non-Être est trop instable. Vous allez devoir enlever 50 points répartis de la façon dont tu le désire parmi tes caractéristiques.`
                );
                adjustStats(being, 50, false);
                return;
            }

            gameMessage(`C'est bon ! Ton état de Non-Être est suffisamment stable.`);

            if (isGeneratingHybrid) {
                activateButton(btn1, "Continuer", () => { generateHybridPlayer(); })

                if (!hybridRaceB.name) {
                    gameMessage(`${currentGameMessage()}

                        - Lancez le D20 pour tirer votre deuxième race.`)

                    btn1.innerText = "Lancer le D20"
                    return
                }
            }

            gameMessage(`${currentGameMessage()}

                - Maintenant, lancez le D20 pour tirer votre trait.`)

            activateButton(btn1, "Lancer le D20", () => { choosePlayerTrait(d20.roll()) })
        }

        function adjustStats(being, amount, isAdding) {
            panelStatsAdjustment.style.display = "block"

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
                panelStatsAdjustment.style.display = "none"

                being.hitPoints = hitPoints.value
                being.strength = strength.value
                being.speed = speed.value
                being.magic = magic.value

                gameMessage(`C'est bon !`)

                if (isGeneratingHybrid) {
                    if (!hybridRaceB.name) {
                        gameMessage(`${currentGameMessage()}
                            
                            - Maintenant, lancez le D20 pour tirer votre deuxième race.`)

                        activateButton(btn1, "Lancer le D20", () => { generateHybridPlayer(); })
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

                activateButton(btn1, "Lancer le D20", () => { choosePlayerTrait(d20.roll()) })
            }
        }
    }
    //#endregion

    //#region Hybrid Player Generation
    function generateHybridPlayer() {
        hideAllGenericButtons();

        // First come around
        if (!hybridRaceA.name) {
            gameMessage(`20 ! - Hybride.
            Tu vas devoir tirer deux races séparément. Ta race finale sera un mélange des deux.
            Lance le D20 pour ta première race.`);

            activateButton(btn1, "Lancer le D20", () => { generateHybridPlayerFirstHalf() })
            return;
        }
        // Second come around (after 1st half hybride)
        if (!hybridRaceB.name) {
            gameMessage(`Lance maintenant le D20 pour ta deuxième race.`);

            activateButton(btn1, "Lancer le D20", () => { generateHybridPlayerSecondHalf() })
            return;
        }

        // Final
        player.races = [hybridRaceA, hybridRaceB]
        player.restoreHitPoints();
        player.updateAllVisuals();
        gameMessage(`${currentGameMessage()}
            
            Maintenant, lancez le D20 pour choisir votre trait.`)

        activateButton(btn1, "Lancer le D20", () => { choosePlayerTrait(d20.roll()) })


        function generateHybridPlayerFirstHalf() {
            const roll = d20.roll();

            hybridRaceA = structuredClone(intelligentRacesTable[roll - 1]);

            // Hybrid exception
            if (hybridRaceA.name.male == "Hybride") {
                gameMessage(`${roll} ! ${player.gender == "F" ? hybridRaceA.name.female : hybridRaceA.name.male} à nouveau. Relancez.`);
                btn1.innerText = "Relancer le D20";
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

            activateButton(btn1, "Lancer le D20", () => { generateHybridPlayerSecondHalf() })

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
                btn1.innerText = "Relancer le D20";
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

function choosePlayerTrait(roll) {
    hideAllGenericButtons()

    player.traits[0] = structuredClone(strongTraitsTable[roll - 1]);

    // Mutant special rule
    if (player.traits[0].name.accordMasculin == "Mutant") {
        gameMessage(`${roll} ! - ${player.gender == "F" ? player.traits[0].name.accordFeminin : player.traits[0].name.accordMasculin}
            Votre mutation augmente grandement une de vos caractéristiques mais en diminue une autre.
            - Choisissez une caractéristique à augmenter de 40 points.`)

        activateButton(btn1, "Augmenter les Points de Vie (PV)", () => { chooseNerfedStat("hitPoints") })
        activateButton(btn2, "Augmenter la Force (FO)", () => { chooseNerfedStat("strength") })
        activateButton(btn3, "Augmenter la Vitesse (VI)", () => { chooseNerfedStat("speed") })
        activateButton(btn4, "Augmenter la Magie (MA)", () => { chooseNerfedStat("magic") })

        return

        function chooseNerfedStat(buffedStat) {
            gameMessage(`OK !
                - Maintenant, choisissez une autre stat à diminuer de 20 points.`)

            activateButton(btn1, "Diminuer les Points de Vie (PV)", () => { finishMutantTrait("hitPoints") })
            activateButton(btn2, "Diminuer la Force (FO)", () => { finishMutantTrait("strength") })
            activateButton(btn3, "Diminuer la Vitesse (VI)", () => { finishMutantTrait("speed") })
            activateButton(btn4, "Diminuer la Magie (MA)", () => { finishMutantTrait("magic") })

            switch (buffedStat) {
                case "hitPoints":
                    player.traits[0].hitPoints = 40
                    btn1.disabled = true
                    break;
                case "strength":
                    player.traits[0].strength = 40
                    btn2.disabled = true
                    break;
                case "speed":
                    player.traits[0].speed = 40
                    btn3.disabled = true
                    break;
                case "magic":
                    player.traits[0].magic = 40
                    btn4.disabled = true
                    break;

                default:
                    console.error("Player mutant trait generation : unknown buff stat.")
                    break;
            }

            function finishMutantTrait(nerfedStat) {
                // If the trait already has a value for the stat we do not validate
                switch (nerfedStat) {
                    case "hitPoints":
                        if (player.traits[0].hitPoints) return
                        player.traits[0].hitPoints = -20
                        break;
                    case "strength":
                        if (player.traits[0].strength) return
                        player.traits[0].strength = -20
                        break;
                    case "speed":
                        if (player.traits[0].speed) return
                        player.traits[0].speed = -20
                        break;
                    case "magic":
                        if (player.traits[0].magic) return
                        player.traits[0].magic = -20
                        break;

                    default:
                        console.error("Player mutant trait generation : unknown nerf stat.")
                        break;
                }

                hideAllGenericButtons()

                player.traits[0].description = generateDescription(player.traits[0])
                player.restoreHitPoints();
                player.updateTraitVisuals();
                player.updateStatsVisuals();

                gameMessage(`- Ensuite, choisissez le genre de votre personnage.`);

                activateButton(btn1, "Féminin", () => { choosePlayerGender("F") })
                activateButton(btn2, "Masculin", () => { choosePlayerGender("M") })
            }
        }
    }
    gameMessage(`${roll} ! - ${player.gender == "F" ? player.traits[0].name.accordFeminin : player.traits[0].name.accordMasculin} (${player.traits[0].description})
        
        - Ensuite, choisissez le genre de votre personnage.`);

    player.restoreHitPoints();
    player.updateTraitVisuals();
    player.updateStatsVisuals();

    activateButton(btn1, "Féminin", () => { choosePlayerGender("F") })
    activateButton(btn2, "Masculin", () => { choosePlayerGender("M") })
}

function choosePlayerGender(gender) {
    hideAllGenericButtons()
    player.gender = gender

    let message = `- Maintenant, choisissez un nom pour votre personnage.`
    gameMessage(message)

    panelPlayerName.style.display = "block"
    inputPlayerName.focus()
    inputPlayerName.value = ``

    btnConfirmPlayerName.onclick = () => {
        // Remove white spaces at beginning and end
        let inputName = inputPlayerName.value.trim()
        // Replace white spaces in the middle with a single space char
        inputName = inputName.replace(/\s\s+/g, ' ')

        if (isNameValid(inputName) === false) return
        if (isNameValid(inputName) == "short") {
            gameMessage(`${message}
                Notez: le nom doit contenir au moins 1 caractère.`)
            return
        }
        if (isNameValid(inputName) == "long") {
            gameMessage(`${message}
                Notez: le nom ne doit pas dépasser 32 caractères.`)
            return
        }
        if (isNameValid(inputName) == "invalid") {
            gameMessage(`${message}
                Notez: le nom ne peut contenir que des lettres de l'alphabet, des espaces et des tirets.`)
            return
        }
        choosePlayerName(inputName)
    }

    function isNameValid(name = "") {
        const namePattern = /^[a-zA-Z\s-]+$/

        if (name.length < 1) return "short"
        if (name.length > 32) return "long"
        if (!namePattern.test(name)) return "invalid"

        return "valid"
    }
}

function choosePlayerName(name) {
    hideAllGenericButtons()
    panelPlayerName.style.display = "none"

    player.name = name

    gameMessage(`
        - Enfin, tirez une carte du deck. Vous recevrez une récompense en fonction de la carte.`)

    allowedToDraw = true
}

function drawReward(deck = scopaDeck, allCardsCountAsCoins = false, isSetUpReward = false) {
    if (!allowedToDraw) return

    hideAllGenericButtons()
    allowedToDraw = false;

    if (deck.length <= 0) {
        nextAdventure("La pioche est vide...")
        return;
    }

    let feedbackMessage = "";

    const cardDrawn = structuredClone(deck.shift());
    //console.log(scopaDeck);
    addCardToDisplayZone(cardDrawn)
    feedbackMessage += `${cardDrawn.description} !`;
    let reward = {}

    // COINS cards
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

    // SWORDS cards
    if (cardDrawn.suit == "swords" && allCardsCountAsCoins === false) {
        reward = new EquippableItem(structuredClone(swordsItemsTable[cardDrawn.value - 1]));
        player.inventory.add(reward);
        feedbackMessage += ` 
        Vous recevez ${reward.isLegendary ? beingNameWithDeterminantDefini(reward, false) : reward.gender == "F" ? `une ${reward.name}` : `un ${reward.name}`} (${reward.description})`;
        //console.log(inventory);
    }

    // CUPS cards
    if (cardDrawn.suit == "cups" && allCardsCountAsCoins === false) {
        reward = getCupsItem(cardDrawn.value)
        player.inventory.add(reward);
        feedbackMessage += ` 
        Vous recevez ${reward.isLegendary ? beingNameWithDeterminantDefini(reward, false) : reward.gender == "F" ? `une ${reward.name}` : `un ${reward.name}`} (${reward.description})`;
        //console.log(inventory);
    }

    feedbackMessage += `.`;

    if (isSetUpReward) {
        imgDeck.onclick = () => {
            if (allowedToDraw) {
                clearCardsDisplayZone();
                drawReward(scopaDeck, false, false)
                updateDeckVisual()
            }
        }
        player.actionPoints += 2
        feedbackMessage += `
        
        Vous recevez également, comme bonus de départ, 2 points d'action${reward.actionPoints ? " supplémentaires" : ""}.
        
        Vous êtes maintenant ${player.gender == "F" ? "prête" : "prêt"} à commencer votre aventure !
        - Appuyer sur 'Commencer'.`

        gameMessage(feedbackMessage);


        activateButton(
            btn1,
            "Commencer",
            () => {
                clearCardsDisplayZone()
                nextAdventure(adventureBeginsMessage)
            }
        )

        return
    }

    nextAdventure(feedbackMessage)
}

function chooseNewEnvironment(customMessage) {
    if (player.inventory.containsItemWithName("Compas des Anciens")) environmentRerolls++
    gameMessage(`${customMessage}
        
        Vous arrivez dans un nouvel environnement.
        - Lancez le D20 pour tirer celui-ci.`)

    hideAllGenericButtons()
    activateButton(
        btn1,
        "Lancer le D20",
        () => {
            clearCardsDisplayZone()
            newEnvironmentResult(getRandomInt(environmentsTable.length) + 1)
        })

    function newEnvironmentResult(roll) {
        console.log("New Environment roll : " + roll);
        const newEnvironment = environmentsTable[roll - 1]
        console.log(newEnvironment);
        if (!newEnvironment) console.error("New Environment is undefined.")

        // Pass data to the currentEnvironment of voyage.js
        currentEnvironment.name = newEnvironment.name
        newEnvironment.effects.forEach(effect => {
            currentEnvironment.effects.push(effect)
        });
        if (newEnvironment.statsModifiers) currentEnvironment.statsModifiers = newEnvironment.statsModifiers
        if (newEnvironment.shopModifiers) currentEnvironment.shopModifiers = newEnvironment.shopModifiers
        if (newEnvironment.InnModifiers) currentEnvironment.InnModifiers = newEnvironment.InnModifiers

        let message = `${roll} ! ${newEnvironment.name}.
        ${newEnvironment.effects.length > 1 ? "Effects" : "Effet"} :`

        for (let i = 0; i < newEnvironment.effects.length; i++) {
            message += `
            - ${newEnvironment.effects[i].description}`
        }

        if (isAllowedToRerollEnvironment()) {
            gameMessage(`${message}
                
                Durant votre voyage vous avez gagné la possibilité d'annuler votre prochain jet d'environnement. Voulez-vous annuler ce jet et relancer le dé ? `)

            activateButton(
                btn1,
                "Garder ce lancé",
                () => {
                    environmentRerolls = 0
                    updateAllEnvironmentVisuals()
                    player.updateStatsVisuals()

                    nextAdventure()
                }
            )
            activateButton(
                btn2,
                "Relancer",
                () => {
                    environmentRerolls--
                    newEnvironmentResult(getRandomInt(environmentsTable.length + 1))
                })

            return
        }

        updateAllEnvironmentVisuals()
        player.restoreHitPoints()
        player.updateStatsVisuals()

        gameMessage(message)

        activateButton(btn1, "Continuer", () => { nextAdventure("") })
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

function generateBoss(roll = d20.roll()) {
    let boss = new Being("Boss", [structuredClone(bossesTable[roll - 1])], undefined, undefined)
    boss.restoreHitPoints();
    return boss
}

function nextAdventure(customMessage = "") {
    hideAllGenericButtons()
    // console.log("current step: ");
    // console.log(currentStep);

    // If we start a new environment we choose it first
    if (isFirstStep() && currentEnvironment.name == "") {
        chooseNewEnvironment(customMessage)
        return
    }

    // Mini boss time !
    if (currentStep.isMiniBoss) {
        gameMessage(customMessage)
        activateButton(
            btn1,
            "Continuer",
            () => {
                clearCardsDisplayZone()
                miniBossAdventure()
            })
        return
    }

    // Is it Final Boss time ??
    if (currentStep.isFinalBoss) {
        gameMessage(customMessage)
        activateButton(
            btn1,
            "Continuer",
            () => {
                clearCardsDisplayZone()
                finalAdventure()
            })

        return
    }

    gameMessage(`${customMessage}
        
        Une nouvelle étape de votre voyage commence.
        - Lancez un D100 pour voir quelles péripéties vous attendent.`)

    activateButton(
        btn1,
        "Lancer le D100",
        () => {
            clearCardsDisplayZone()
            chooseNextAdventure(d100.roll())
        })

    function chooseNextAdventure(roll) {
        hideAllGenericButtons()

        let message = `${roll} !
        Vous avez le choix entre ces aventures :
        `;

        let choice1 = encountersTable[roll - 2] // Roll - 1
        let choice2 = encountersTable[roll - 1] // Actual roll
        let choice3 = encountersTable[roll] // Roll + 1
        console.log(choice1);
        console.log(choice2);
        console.log(choice3);

        // Filter out invalid or duplicate choices
        if (choice1) {
            if (choice1.type == "Coup de chance !") choice1 = undefined
        }
        if (choice2) {
            if (choice1 && choice2.type == choice1.type) choice2 = undefined
        }
        if (choice3) {
            if (choice3.type == "Coup de chance !") choice3 = undefined
            if (choice3 && choice1) {
                if (choice3.type == choice1.type) choice3 = undefined
            }
            if (choice3 && choice2) {
                if (choice3.type == choice2.type) choice3 = undefined
            }
        }

        // Assign text value and buttons logic depending on the types of the choice
        const choices = [choice1, choice2, choice3]
        const buttons = [btn1, btn2, btn3]

        for (let i = 0; i < 3; i++) {
            if (choices[i] === undefined) continue

            switch (choices[i].type) {
                case "Événement":
                    message += `- Un événement spécial
                            `;
                    activateButton(buttons[i], "Événement spécial", () => { specialEncounter() })
                    break;
                case "Village":
                    message += `- Visiter un village
                            `;
                    activateButton(buttons[i], "Visiter un village", () => { villageEncounter() })
                    break;
                case "Repos":
                    message += `- Se reposer
                            `;
                    activateButton(buttons[i], "Se reposer", () => { restEncounter() })
                    break;
                case "Combat !":
                    message += `- Un combat contre un monstre
                            `;
                    activateButton(buttons[i], "Combattre un monstre", () => { monsterEncounter() })
                    break;
                case "Combat ?":
                    message += `- Une rencontre avec une créature intelligente
                            `;
                    activateButton(buttons[i], "Rencontrer une créature intelligente", () => { intelligentBeingEncounter() })
                    break;
                case "Coup de chance !":
                    message += `- Un coup de chance
                        `;
                    activateButton(buttons[i], "Coup de chance", () => { luckyEncounter() })
                    break;
                default:
                    console.error("Unknown adventure type !");
                    break;
            }
        }

        gameMessage(`${message}
            Que choisissez-vous ?`)
    }

}

// Fight vs super strong monster
function miniBossAdventure() {
    const introMessage = `La nuit est en train de tomber. Vous êtes à la recherche d'un endroit où poser vos affaires pour passer une nuit à la belle étoile. Vous êtes tellement ${player.gender == "F" ? "distraite" : "distrait"} à scruter la pénombre de part et d'autre du chemin, que vous ne remarquez pas une ombre imposante se dresser au milieu de celui-ci. Vous percutez la créature de plein fouet. Elle-même, n'ayant pas décelé votre présence jusque là, bondit et se prépare à vous attaquer.`

    const traits = []
    traits.push(getStrongTrait())
    traits.push(getStrongTrait())

    const monster = generateMonster(d20.roll(), traits)

    const contextData = {
        opponent: monster,
        introMessage: introMessage,
        opponentPreparationPhaseCallBack: regularOpponentPreparationPhase,
        rewardPhaseCallBack: regularRewardPhase
    }

    fight(contextData)
}

//#region Boss fight set up
function finalAdventure() {
    const roll = getRandomInt(bossesTable.length) + 1;
    console.log(roll);
    const boss = generateBoss(roll)
    console.log("Boss généré :");
    console.log(boss);

    let message = `Ça y est ! Vous y êtes. Le repère du mal.
        
        - Lancez le D20 pour tirer le boss que vous allez affronter.`
    gameMessage(message)
    activateButton(btn1, "Lancer le D20", () => { chooseBoss(roll) })

    function chooseBoss(roll) {
        let message = `${roll} !
        `;
        let contextData = {}
        contextData.opponent = boss

        switch (boss.name) {
            case "Vcrakusa, la déesse-vampire":
                // Flavor text before the boss name is revealed
                message += ` Vous êtes au pied d'une falaise au sommet de laquelle un château aux longues tours effilées est perché. Vous parvenez à gravir la falaise et trouver une entrée dérobée du château. Vous vous faufilez sans vous faire repérer par les gardes. Aux détours des couloirs et des escaliers vous parvenez enfin à trouver la salle d'incantation où se tisse l'origine du terrible maléfice qui s'est abattu sur l'ensemble des régions voisines. Une telle malédiction est certainement l'oeuvre d'une créature très puissante. Vous prenez tout votre courage à bras le corps et pénétrez dans l'antre du mal.`

                const vcrakusaPreparationPhase = (ctx) => {
                    let message

                    // Check if odd fight turn 
                    if (ctx.fightTurn % 2 != 0) {
                        // Vcrakusa does nothing
                        message = `${boss.name} ne fait rien.`
                        checkNextPhase()
                        return
                    }

                    // Vcrakusa casts 'Soin' amplified
                    const amount = 20 + d100.roll()
                    ctx.opponent.hitPoints += amount
                    message = `${ctx.opponent.name} lance le sort 'Soin' amplifié et récupère ${amount}PV.`
                    checkNextPhase()

                    function checkNextPhase() {
                        // If player already prepared we go to the player's attack phase
                        if (playerHasInitiative(ctx.opponent)) {
                            message += `

                            --C'est à votre tour d'attaquer.`

                            gameMessage(message);

                            activateButton(btn1, "Attaquer", () => { playerAttackPhase(ctx) })
                            return
                        }

                        // Otherwise, we go to its prepare phase
                        message += `

                        --C'est à votre tour de vous préparer.`

                        gameMessage(message);

                        activateButton(btn1, "Se préparer", () => { playerPreparationPhase(ctx) })
                    }
                }

                contextData.introMessage = `Vous découvrez une large pièce circulaire. En son centre, throne un être décharné, assis sur une chaise en bois sombre aux sculptures élaborées. La créature, en remarquant votre entrée dans la pièce, commence à se lever lentement. Ses yeux, d'un noir sans reflet, vous regardent intensément pendant plusieurs secondes. Puis, soudain, la créature funeste ouvre grand la bouche, laissant apparaître deux fines canines d'une taille anormalement grande et se rue vers vous en poussant un cri glaçant.`
                contextData.opponentPreparationPhaseCallBack = vcrakusaPreparationPhase
                contextData.rewardPhaseCallBack = bossRewardPhase
                break;

            default:
                console.error("Unknown boss name");
                break;
        }

        gameMessage(message);
        activateButton(btn1, "Continuer", () => { fight(contextData) })
    }
}

function bossRewardPhase(ctx) {
    hideAllGenericButtons()
    stepCompleted()
    player.restoreHitPoints()
    isInCombat = false

    gameMessage(`${ctx.opponent.name} est ${ctx.opponent.gender == "F" ? "terrassée" : "terrassé"} !
        Félicitations ! Vous avez réussi. Grâce à vous et à votre détermination, la malédiction est brisée. Les régions aux alentours seront à nouveau libres et sereines. 
        Il est maintenant temps pour vous de rentrer à la maison, cette campagne aux douces plaines que vous avez quitté il y a si longtemps déjà. Vous conterai vos exploits sur votre chemin pour qu'encore dans longtemps on chante vos aventures.
        Fin.
        
        Merci d'avoir joué ! On espère que vous avez passé un bon moment pendant ce jeu de rôle.
        Rechargez la page si vous voulez recommencer une nouvelle aventure. Et sinon, ben voilà, c'est fini, à la prochaine. Bisou ! `)
}
//#endregion

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

    gameMessage(`Alors que vous marchez tranquillement sur le chemin, vous croisez ${intelligentBeing.gender == "F" ? "une" : "un"} ${intelligentBeing.name}. 
        Lancez le D20 pour voir quel attitude ${intelligentBeing.gender == "F" ? "elle" : "il"} va adopter.`)

    activateButton(
        btn1,
        "Lancer le D20",
        () => {
            const roll = d20.roll()
            checkAttitude(roll)
        }
    )


    function checkAttitude(roll) {
        console.log("checkattitude roll" + roll);
        if (roll <= 3) {
            gameMessage(`${roll} !
                ${beingNameWithDeterminantDefini(intelligentBeing, false)} vous salue poliment et fait mine de vouloir continuer sa route sans plus d'interaction.
                - Voulez-vous continuer votre chemin ou l'attaquer ?`)

            activateButton(btn1, "Continuer", () => { letBeingGo() })
            activateButton(
                btn2,
                "Attaquer",
                () => {
                    const contextData = {
                        opponent: intelligentBeing,
                        introMessage: `Vous poussez agressivement ${beingNameWithDeterminantDefini(intelligentBeing, false)} et adoptez une position de combat.`,
                        opponentPreparationPhaseCallBack: regularOpponentPreparationPhase,
                        rewardPhaseCallBack: regularRewardPhase
                    }
                    fight(contextData)
                }
            )
            return;
        }
        if (roll <= 6) {
            // If race in common or as strong as the being - Free passage
            if (player.hasARaceInCommonWith(intelligentBeing) || player.strength >= intelligentBeing.strength) {
                gameMessage(`${roll} !
                    ${beingNameWithDeterminantDefini(intelligentBeing, false)} vous toise du regard avant de s'écarter du chemin pour vous laisser passer. Vous déceler un certain air de frustration sur son visage.
                    
                    - Voulez-vous continuer votre route ou l'attaquer ?`)

                activateButton(btn1, "Continuer", () => { letBeingGo() })
                activateButton(
                    btn2,
                    "Attaquer",
                    () => {
                        const contextData = {
                            opponent: intelligentBeing,
                            introMessage: `Vous poussez agressivement ${beingNameWithDeterminantDefini(intelligentBeing, false)} et adoptez une position de combat.`,
                            opponentPreparationPhaseCallBack: regularOpponentPreparationPhase,
                            rewardPhaseCallBack: regularRewardPhase
                        }
                        fight(contextData)
                    }
                )
                return
            }

            // Otherwise, asks for toll
            const toll = 50 * (environments.indexOf(currentEnvironment) + 1)

            gameMessage(`${roll} !
                ${beingNameWithDeterminantDefini(intelligentBeing, false)} se met en travers du chemin et d'un air menaçant vous demande ${toll}PO pour pouvoir passer.
                
                Que choisissez-vous ?
                - Donner l'argent.
                - Attaquer ${beingNameWithDeterminantDefini(intelligentBeing, true)}.`)

            activateButton(btn1, `Donner ${toll}PO`, () => { giveGold(toll) })
            if (player.goldCoins < toll) btn1.disabled = true

            activateButton(
                btn2,
                `Attaquer`,
                () => {
                    const contextData = {
                        opponent: intelligentBeing,
                        introMessage: `Vous poussez agressivement ${beingNameWithDeterminantDefini(intelligentBeing, false)} et adoptez une position de combat.`,
                        opponentPreparationPhaseCallBack: regularOpponentPreparationPhase,
                        rewardPhaseCallBack: regularRewardPhase
                    }
                    fight(contextData)
                }
            )
            return
        }
        if (roll <= 9) {
            // If race in common or as strong magically as the being - Free passage
            if (player.hasARaceInCommonWith(intelligentBeing) || player.magic >= intelligentBeing.magic) {
                gameMessage(`${roll} !
                    ${beingNameWithDeterminantDefini(intelligentBeing, false)} vous toise du regard avant de s'écarter du chemin pour vous laisser passer. Vous déceler un certain air de frustration sur son visage.
    
                    - Voulez-vous continuer votre route ou l'attaquer ?`)

                activateButton(btn1, "Continuer", () => { letBeingGo() })
                activateButton(
                    btn2,
                    "Attaquer",
                    () => {
                        const contextData = {
                            opponent: intelligentBeing,
                            introMessage: `Vous poussez agressivement ${beingNameWithDeterminantDefini(intelligentBeing, false)} et adoptez une position de combat.`,
                            opponentPreparationPhaseCallBack: regularOpponentPreparationPhase,
                            rewardPhaseCallBack: regularRewardPhase
                        }
                        fight(contextData)
                    }
                )
                return
            }

            // Otherwise, asks for toll
            const toll = 50 * (environments.indexOf(currentEnvironment) + 1)

            gameMessage(`${roll} !
            ${beingNameWithDeterminantDefini(intelligentBeing, false)} se met en travers du chemin et d'un air menaçant vous demande ${toll}PO pour pouvoir passer.

            Que choisissez-vous ?
            - Donner l'argent.
            - Attaquer ${beingNameWithDeterminantDefini(intelligentBeing, true)}.`)

            activateButton(btn1, `Donner ${toll}PO`, () => { giveGold(toll) })
            if (player.goldCoins < toll) btn1.disabled = true

            activateButton(
                btn2,
                `Attaquer`,
                () => {
                    const contextData = {
                        opponent: intelligentBeing,
                        introMessage: `Vous poussez agressivement ${beingNameWithDeterminantDefini(intelligentBeing, false)} et adoptez une position de combat.`,
                        opponentPreparationPhaseCallBack: regularOpponentPreparationPhase,
                        rewardPhaseCallBack: regularRewardPhase
                    }
                    fight(contextData)
                }
            )
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
            const unbuffedBeing = new Being(
                intelligentBeing.type,
                intelligentBeing.races,
                intelligentBeing.gender,
                intelligentBeing.traits
            )
            const introMessage = `${roll} !
            Lorsque ${beingNameWithDeterminantDefini(unbuffedBeing, true)} arrive à votre hauteur, ${unbuffedBeing.gender == "F" ? "elle" : "il"} vous lance un grognement bourru. Vous ${unbuffedBeing.gender == "F" ? "la" : "le"} saluez en retour ce qui, surprenamment, à pour effet de faire entrer ${beingNameWithDeterminantDefini(unbuffedBeing, true)} dans une rage folle. `

            intelligentBeing.traits.push(getStrongTrait(d20.roll()))
            intelligentBeing.restoreHitPoints()

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
            environmentRerolls++
            player.experiencePoints++
            stepCompleted()
            nextAdventure(`${roll} !
                ${beingNameWithDeterminantDefini(intelligentBeing, false)} vous salue amicalement et vous fait part d'un malencontreux événement qui lui est arrivé sur sa route. Vous prenez bonnes notes de ces précieuses informations. Qui sait, peut-être réussirez-vous, grâce à ces dernières, à déjouer les périls du chemin ardu qui vous attend ?
                - Vous gagnez 1XP et la possibilité d'annuler votre prochain lancé de dé d'environnement et de le relancer.`)

            return
        }
        if (roll <= 20) {
            gameMessage(`${roll} !
                Vous réalisez que ${beingNameWithDeterminantDefini(intelligentBeing, true)} est en fait ${intelligentBeing.gender == "F" ? "une marchande itinérante" : "un marchand itinérant"}.
                
                Que choisissez-vous de faire ?
                    - Faire affaire avec ${intelligentBeing.gender == "F" ? "la marchande" : "le marchand"}
                    - Attaquer ${intelligentBeing.gender == "F" ? "la marchande" : "le marchand"}`)

            activateButton(
                btn1,
                "Voir la marchandise",
                () => {
                    visitShop(
                        `Vous faites signe ${intelligentBeing.gender == "F" ? "à la marchande" : "au marchand"} de vous montrer sa marchandise.`,
                        `Vous remerciez ${intelligentBeing.gender == "F" ? "la marchande" : "le marchand"} pour son temps et continuez votre route.`,
                        `${intelligentBeing.gender == "F" ? "La marchande" : "Le marchand"} vous fait part que, malheureusement, tout son stock est vide`,
                        `${player.gender == "F" ? "Déçue" : "Déçu"}, vous faites comprendre ${intelligentBeing.gender == "F" ? "à la marchande" : "au marchand"} que ça ne fait rien avant de continuer votre route.`,
                        2)
                }
            )
            activateButton(
                btn2,
                "Attaquer",
                () => {
                    const contextData = {
                        opponent: intelligentBeing,
                        introMessage: `Sans aucune sommation, vous dégainez et brandissez votre arme dans la direction ${intelligentBeing.gender == "F" ? "de la marchande" : "du marchand"}. ${intelligentBeing.gender == "F" ? "Cette dernière" : "Ce dernier"} lâche un cris d'effroi et sort une arme de son sac-à-dos.`,
                        opponentPreparationPhaseCallBack: regularOpponentPreparationPhase,
                        rewardPhaseCallBack: regularRewardPhase
                    }
                    fight(contextData)
                }
            )
        }


        function letBeingGo() {
            hideAllGenericButtons()

            let outroMessage = `Vous continuez votre route.
                - Vous gagnez 1XP.`

            player.experiencePoints++
            stepCompleted()
            nextAdventure(outroMessage)
        }

        function giveGold(amount) {
            if (player.goldCoins < amount) return

            hideAllGenericButtons()

            let outroMessage = `Vous donnez ${amount}PO ${intelligentBeing.gender == "F" ? "à la racketteuse" : "au racketteur"}, qui vous laisse passer. Vous continuez votre route.
                - Vous gagnez 1XP.`

            player.goldCoins -= amount
            player.experiencePoints++
            stepCompleted()
            nextAdventure(outroMessage)
        }
    }
}

function restEncounter() {
    const flavorTextsVariations = [
        {
            introMessage: `Vous trouvez un coin relativement sûr et aménagez un campement sommaire. Vous vous sustentez et vous apprêtez à passer la nuit tout en repensant aux situations auxquelles vous avez fait face jusqu'ici.`,
            outroMessage: `Après une bonne nuit de sommeil, vous mangez un déjeuner frugal avant de remballer vos affaires et de vous remettre en route.`,
            leaveButtonText: "Lever le camp"
        }
    ]
    const flavorRoll = getRandomInt(flavorTextsVariations.length)

    rest(
        flavorTextsVariations[flavorRoll].introMessage,
        flavorTextsVariations[flavorRoll].outroMessage,
        flavorTextsVariations[flavorRoll].leaveButtonText
    )
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

    activateButton(btn1, "Aller au magasin", () => { visitShop() })
    activateButton(btn2, "Aller à l'auberge (-100PO)", () => { visitInn(innPrice) })
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
        activateButton(
            btn1,
            "Partir",
            () => {
                stepCompleted()
                nextAdventure(`${noCardsLeaveMessage}`)
            }
        )
        return;
    }

    gameMessage(`${introMessage}
        Tirez ${maxCards} cartes pour voir quels objets sont en vente (les cartes 'Pièces' ne correspondent à aucun objet achetable).`);

    let cardsDrawn = []

    imgDeck.onclick = () => {
        if (allowedToDraw) {
            clearCardsDisplayZone()
            initialShopDraw(scopaDeck);
            updateDeckVisual()
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
                    updateDeckVisual()
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
                updateDeckVisual()
            }
            return
        }

        // Deploy shop
        gameMessage(`${cardDrawn.description}.
            C'est bon. Appuyez sur continuer pour voir l'objet, ou les objets, disponible(s).`)

        activateButton(btn1, "Continuer", () => { deployShop() })

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
            gameMessage(`${cardDrawn.description}.
                Tirez à nouveau une carte.`)
            allowedToDraw = true
            return
        }

        cardsDrawn.push(cardDrawn)
        gameMessage(`${cardDrawn.description}.
            C'est bon. Appuyez sur continuer pour voir l'objet, ou les objets, disponible(s).`)

        activateButton(btn1, "Continuer", () => { deployShop() })
    }

    function deployShop() {
        shop = new Shop();

        activateButton(
            btn1,
            "Partir",
            () => {
                allowedToSellItems = false
                stepCompleted()
                clearCardsDisplayZone()
                zoneShopButtons.innerHTML = ``
                nextAdventure(`${leaveMessage}`)
            }
        )

        cardsDrawn.forEach(card => {
            switch (card.suit) {
                case "coins":
                    return
                    break;
                case "clubs":
                    return
                    break;
                case "cups":
                    shop.add(getCupsItem(card.value))
                    break;
                case "swords":
                    shop.add(new EquippableItem(structuredClone(swordsItemsTable[card.value - 1])));
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

    hideAllGenericButtons()
    activateButton(
        btn1,
        "Améliorer les Points de Vie (PV)",
        () => {
            player.levelUpHitPoints()
            checkButtonsValidity()
        }
    )
    activateButton(
        btn2,
        "Améliorer la Force (FO)",
        () => {
            player.levelUpStrength()
            checkButtonsValidity()
        }
    )
    activateButton(
        btn3,
        "Améliorer la Vitesse (VI)",
        () => {
            player.levelUpSpeed()
            checkButtonsValidity()
        }
    )
    activateButton(
        btn4,
        "Améliorer la Magie (MA)",
        () => {
            player.levelUpMagic()
            checkButtonsValidity()
        }
    )
    activateButton(
        btn5,
        "Échanger 1XP pour 1PA",
        () => {
            player.buyActionPoint()
            checkButtonsValidity()
        }
    )
    activateButton(
        btn6,
        continueButtonText,
        () => {
            allowedToLevelUp = false
            stepCompleted()
            nextAdventure(outroMessage)
        }
    )

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
        gameMessage(`Vous rencontrez un voyageur dont l'enfant est gravement malade. Il vous supplie de l'aider.
        --- Si vous avez une potion ou un ether, vous pouvez lui donner.
        --- Si vous avez 200PO vous pouvez lui donner pour qu'il achète un remède.
        --- Vous pouvez vous battre contre le voyageur.
        --- Vous pouvez ne rien faire et passer votre chemin.
        
        Que choisissez-vous de faire ?`)

        activateButton(btn1, "Donner une potion", () => { givePotion() })
        activateButton(btn2, "Donner un ether", () => { giveEther() })
        activateButton(btn3, "Donner 200PO", () => { giveGold() })
        activateButton(btn4, "Se battre", () => { fightTraveler() })
        activateButton(btn5, "Passer mon chemin", () => { leave() })
        if (!player.inventory.containsItemWithName("Potion")) btn1.disabled = true
        if (!player.inventory.containsItemWithName("Éther")) btn2.disabled = true
        if (player.goldCoins < 200) btn3.disabled = true

        function givePotion() {
            const potion = player.inventory.containsItemWithName("Potion")
            if (!potion) return

            player.inventory.remove(potion)
            player.inventory.add(getCupsItem(6))
            player.experiencePoints++
            stepCompleted()
            nextAdventure(`Vous donnez une Potion au voyageur.
                    Il vous remercie avec une voix pleine d'émotions et vous offre un objet en retour.
                    
                    Vous recevez le Pendentif de la Lune.
                    Vous recevez également 1XP.`)

        }

        function giveEther() {
            const ether = player.inventory.containsItemWithName("Éther")
            if (!ether) return

            player.inventory.remove(ether)
            player.inventory.add(getCupsItem(6))
            player.experiencePoints++
            stepCompleted()
            nextAdventure(`Vous donnez un Éther au voyageur.
                    Il vous remercie avec une voix pleine d'émotions et vous offre un objet en retour.
                                
                    Vous recevez le Pendentif de la Lune.
                    Vous recevez également 1XP.`)

        }

        function giveGold() {
            if (player.goldCoins < 200) return;

            player.goldCoins -= 200
            player.inventory.add(new EquippableItem(swordsItemsTable[0]))
            player.experiencePoints++
            stepCompleted();
            nextAdventure(`Vous donnez 200PO au voyageur.
                Il vous remercie chaleureusement et vous offre un objet en retour.
                
                Vous recevez une Dague.
                Vous recevez également 1XP.`)
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

                    message += `Le voyageur lance le sort 'Téléportation' et disparaît avec sa fille, vous laissant ${player.gender == "F" ? "seule" : "seul"} au milieu du chemin.
                        
                        Le combat est terminé.`

                    if (player.hitPoints < player.maxHitPoints) {
                        player.restoreHitPoints()
                        message += `
                        Vous vous soignez et continuez votre route.`
                        nextAdventure(message)
                        return
                    }

                    message += ` Vous continuez votre route.`
                    nextAdventure(message)
                    return
                }

                // Traveler does nothing
                message = `${beingNameWithDeterminantDefini(ctx.opponent, false)} ne fais rien.`

                // If player already prepared we go to the player's attack phase
                if (playerHasInitiative(ctx.opponent)) {
                    message += `
                    
                    -- C'est à votre tour d'attaquer.`

                    gameMessage(message);

                    activateButton(btn1, "Attaquer", () => { playerAttackPhase(ctx) })
                    return
                }

                // Otherwise, we go to its prepare phase
                message += `
                
                -- C'est à votre tour de vous préparer.`

                gameMessage(message);

                activateButton(btn1, "Se préparer", () => { playerPreparationPhase(ctx) })
            }

            const travelerRewardPhase = () => {
                stepCompleted();
                player.experiencePoints++;
                isInCombat = false

                let message = `Le voyageur est vaincu.
                Vous recevez 1XP`

                if (player.hitPoints < player.maxHitPoints) {
                    player.restoreHitPoints()
                    nextAdventure(`${message}.
                    Vous vous soignez et continuez votre route.`)
                    return
                }
                nextAdventure(`${message} et continuez votre route.`)
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
            player.experiencePoints++;
            stepCompleted()
            nextAdventure(`Vous partagez votre sympathie au voyageur mais lui dites que vous ne pouvez pas l'aider.
                Vous gagner 1XP et continuer votre route.`)
        }

    }
}

function luckyEncounter() {
    hideAllGenericButtons()

    const flavorTextVariations = [
        {
            intro: `Le chemin que vous suivez marque un tournant et révèle un vieux temple en ruine. Une végétation particulièrement fleurissante a presque entièrement recouvert ce qui reste de l'édifice. Une doux parfum floral flotte dans l'air.`,
            seekTreasureIntro: `Vous prenez un instant pour faire le tour du vieux temple à la recherche de quelconque objet précieux. Après quelques minutes, votre regard est soudainement attiré par un petit rocher dans un recoin des ruines. Vous tentez de le faire bouger et découvrez un petit coffre à moitié enterré dans un creux sous le rocher.`,
            restIntro: `Vous décidez de vous arrêter un instant pour manger une collation et profiter de cet endroit qui sort de l'ordinaire.`,
            restLeave: `Totalement revigoré, vous rassemblez vos affaires. Il est temps de se remettre en route.`,
            restLeaveButtonText: `Partir`
        }
    ]

    const flavorRoll = getRandomInt(flavorTextVariations.length)
    player.experiencePoints++

    gameMessage(`${flavorTextVariations[flavorRoll].intro}
        
        Vous gagnez 1 XP.
        
        Que choisissez-vous de faire ?
        - Fouiller l'endroit en quête de trésor.
        - Se reposer un peu.`)

    activateButton(btn1, "Fouiller", () => { seekTreasure() })
    activateButton(
        btn2,
        "Se reposer",
        () => {
            rest(
                flavorTextVariations[flavorRoll].restIntro,
                flavorTextVariations[flavorRoll].restLeave,
                flavorTextVariations[flavorRoll].restLeaveButtonText,
            )
        }
    )

    function seekTreasure() {
        hideAllGenericButtons()

        gameMessage(`${flavorTextVariations[flavorRoll].seekTreasureIntro}
            
            - Vous pouvez tirer une carte et gagner l'objet correspondant.`)

        imgDeck.onclick = () => {
            drawReward(scopaDeck, false, false)
            updateDeckVisual()
        }

        allowedToDraw = true
        stepCompleted()
    }
}
//#endregion

//#region FIGHT
/**
 * @param {object} ctx The Context data necessary for the fight.
 * @param {object} ctx.opponent The opponent the player is facing in this fight
 * @param {number} ctx.fightTurn The turn number of the fight.
 * @param {string} ctx.introMessage Message displayed when the fight is about to start.
 * @param {CallBackFn} ctx.opponentPreparationPhaseCallBack Run when the opponent is preparing for the turn.
 * @param {CallBackFn} ctx.rewardPhaseCallBack Run when the fight is won.
 */
function fight(ctx) {
    isInCombat = true
    console.log(`Fight:`);
    ctx.fightTurn = 1
    console.log(ctx);

    // Message d'intro
    let message = ctx.introMessage

    // Special effect : Coupe Invidable
    // Count how many we have
    const bottomlessCups = []
    for (let i = 0; i < 8; i++) {
        if (!player.inventory.slots[i]) continue
        if (!player.inventory.slots[i].name) continue
        if (player.inventory.slots[i].name == "Coupe Invidable") {
            bottomlessCups.push("Coupe Invidable")
        }
    }
    // Apply effect
    if (bottomlessCups.length > 0) {
        player.actionPoints += bottomlessCups.length
        message += `
        
        Vous sortez ${bottomlessCups.length == 1 ? "la Coupe Invidable" : `les Coupes Invidables`} de votre sac et en buvez ${bottomlessCups.length == 1 ? "une gorgée" : `une gorgée à chacune`} pour galvaniser vos forces avant ce combat.
        Vous gagnez ${bottomlessCups.length}PA.`
    }

    // if fighting boss, put nothing in front of its name. Otherwise, put 'une' or 'un'
    message += `
    
    ---- Un combat contre ${ctx.opponent.type == "Boss" ? "" : ctx.opponent.gender == "F" ? "une " : "un "}${ctx.opponent.name} commence !`

    // if fighting boss and boss has at least one effect to mention to the player
    if (ctx.opponent.type == "Boss" && ctx.opponent.races[0].effects.length > 0) {
        message += `
        ${ctx.opponent.races[0].effects.length == 1 ? "Effet" : "Effets"} du boss :`;
        ctx.opponent.races[0].effects.forEach(effect => {
            message += `
            • ${effect.description}`
        });
    }

    gameMessage(message);

    hideAllGenericButtons()
    activateButton(btn1, "Commencer le combat", () => { initiativePhase(ctx) })
}

function initiativePhase(ctx) {
    if (playerHasInitiative(ctx.opponent)) {
        gameMessage(`Vous avez l'initiative. 
            
            -- C'est à votre tour de vous préparer.`)

        activateButton(btn1, "Se préparer", () => { playerPreparationPhase(ctx) })

        return
    }

    gameMessage(`${beingNameWithDeterminantDefini(ctx.opponent, false)} a l'initiative, ${ctx.opponent.gender == "F" ? "elle" : "il"} se prépare.`)

    activateButton(btn1, "Continuer", () => { ctx.opponentPreparationPhaseCallBack(ctx); })
}

function playerPreparationPhase(ctx) {
    // TODO : implement this
    gameMessage(`Phase de préparation.
        
        Voulez-vous lancer un sort ou utiliser un objet ?`)

    activateButton(
        btn1,
        "Ne rien faire",
        () => {
            if (playerHasInitiative(ctx.opponent)) {
                opponentPreparationPhase(ctx)
                return
            }
            opponentAttackPhase(ctx)
        }
    )
}

// Opponent prep phase if it is second in initiative
function opponentPreparationPhase(ctx) {
    gameMessage(`C'est au tour ${beingNameWithDeterminantDefiniContracte(ctx.opponent, "de")} de se préparer.`)

    activateButton(btn1, "Continuer", () => { ctx.opponentPreparationPhaseCallBack(ctx) })
}

function regularOpponentPreparationPhase(ctx) {
    message = `${beingNameWithDeterminantDefini(ctx.opponent, false)} ne fais rien.`

    // If the player has prepared before the opponent. We start the player attack phase.
    if (playerHasInitiative(ctx.opponent)) {
        message += `
        
        -- C'est à votre tour d'attaquer.`

        gameMessage(message);

        activateButton(btn1, "Attaquer", () => { playerAttackPhase(ctx) })

        return
    }

    // Otherwise, we start the player prepare phase
    message += `
    
    -- C'est à votre tour de vous préparer.`

    gameMessage(message)

    activateButton(btn1, "Se préparer", () => { playerPreparationPhase(ctx) })
}

function playerAttackPhase(ctx) {
    let damage = 0;

    gameMessage(`Phase d'attaque
        
        -- Voulez-vous faire une attaque physique ou une attaque magique ?`)

    activateButton(btn1, "Attaque physique", () => { decideIfPowerful(true) })
    activateButton(btn2, "Attaque magique", () => { decideIfPowerful(false) })

    function decideIfPowerful(isPhysical) {
        if (player.actionPoints > 0) {
            gameMessage(`Voulez-vous utiliser un point d'action pour effectuer une attaque puissante ? (Vous recevrez un lancé bonus du D100 qui sera ajouté à vos dégâts.)`)

            activateButton(btn1, "Oui", () => { powerfulAttack(isPhysical) })
            activateButton(btn2, "Non", () => { normalAttack(isPhysical) })

            return
        }

        normalAttack(isPhysical)
    }

    function powerfulAttack(isPhysical) {
        player.actionPoints -= 1

        gameMessage(`Très bien, vous utilisez un point d'action pour effectuer une attaque puissante.
            Lancez une première fois le D100 pour voir combien de dégâts vous allez infliger.`)

        hideButton(btn2)
        activateButton(
            btn1,
            "Lancer le D100",
            () => {
                const firstRoll = d100.roll()
                damage += firstRoll;
                secondRoll(firstRoll)
            }
        )

        function secondRoll(firstRoll) {
            gameMessage(`${firstRoll} ! 
                Maintenant lancez votre D100 bonus.`)

            activateButton(
                btn1,
                "Lancer le D100",
                () => {
                    const secondRoll = d100.roll()
                    damage += secondRoll
                    inflictDamage(isPhysical, secondRoll)
                }
            )
        }
    }

    function normalAttack(isPhysical) {
        gameMessage(`Très bien, lancez le D100 pour voir combien de dégâts vous allez infliger.`)

        hideButton(btn2)
        activateButton(
            btn1,
            "Lancer le D100",
            () => {
                const roll = d100.roll()
                damage += roll;
                inflictDamage(isPhysical, roll)
            }
        )
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
            activateButton(btn1, "Continuer", () => { ctx.rewardPhaseCallBack(ctx) })
            return
        }

        // If we attacked first , it's the opponent's turn
        if (playerHasInitiative(ctx.opponent)) {
            gameMessage(`${message}
            
            -- C'est au tour ${beingNameWithDeterminantDefiniContracte(ctx.opponent, 'de')} d'attaquer.`)

            activateButton(btn1, "Continuer", () => { opponentAttackPhase(ctx) })
            return
        }

        // Otherwise we start a new turn
        activateButton(btn1, "Continuer", () => { newTurn(ctx) })
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

    activateButton(btn1, "Continuer", () => { selectAttackType() })

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
            activateButton(btn1, "Continuer", () => { gameOver() })

            return
        }

        // If we attacked first it's time for a new turn
        if (playerHasInitiative(ctx.opponent)) {
            gameMessage(message)
            activateButton(btn1, "Continuer", () => { newTurn(ctx) })

            return
        }

        // Otherwise, we start the player attack phase
        message += `
        
        -- C'est à votre tour d'attaquer.`

        gameMessage(message)

        activateButton(btn1, "Attaquer", () => { playerAttackPhase(ctx) })
    }
}

function newTurn(ctx) {
    ctx.fightTurn++

    gameMessage(`Vous avez résisté à l'assault ${beingNameWithDeterminantDefiniContracte(ctx.opponent, "de")} mais ${ctx.opponent.gender == "F" ? "cette dernière" : "ce dernier"} est toujours debout et prêt${ctx.opponent.gender == "F" ? "e" : ""} à en découdre.
        
        -- Un nouveau tour de combat commence.`)

    activateButton(btn1, "Commencer", () => { initiativePhase(ctx) })
}

function regularRewardPhase(ctx) {
    hideAllGenericButtons()
    stepCompleted();
    player.experiencePoints++

    gameMessage(`${beingNameWithDeterminantDefini(ctx.opponent, false)} est ${ctx.opponent.gender == "F" ? "terrassée" : "terrassé"} !
        ${player.hitPoints < player.maxHitPoints ? "Vous vous soignez et" : "Vous"} gagnez 1 point d'expérience.
        - Vous pouvez aussi lancer le D20 pour acquérir une récompense potentielle.`)

    player.restoreHitPoints()
    isInCombat = false

    activateButton(btn1, "Lancer le D20", () => { fightReward(d20.roll()) })

    function fightReward(roll) {
        hideAllGenericButtons()

        const reducedRoll = d20.reducedRoll(roll, 4)

        switch (reducedRoll) {
            case 2:
                player.actionPoints++
                nextAdventure(`${roll} !
                    Vous gagnez 1 point d'action.`)
                break;

            case 3:
                gameMessage(`${roll} !
                    Vous pouvez tirer une carte du deck mais toutes les cartes comptent comme des cartes 'Pièces'.`)
                allowedToDraw = true;
                imgDeck.onclick = () => {
                    drawReward(scopaDeck, true)
                    updateDeckVisual()
                }
                return

            case 4:
                gameMessage(`${roll} !
                    Vous pouvez tirer une carte du deck. Vous gagnez immédiatement l'objet ou l'or correspondant.`)
                allowedToDraw = true;
                imgDeck.onclick = () => {
                    drawReward(scopaDeck, false)
                    updateDeckVisual()
                }
                return

            default:
                nextAdventure(`${roll} !
                    Aucune récompense. Déso...`)
                break;
        }
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

function addCardToDisplayZone(card) {
    const cardElement = document.createElement("img")
    cardElement.setAttribute("src", card.imageURL)
    cardElement.setAttribute("alt", card.description)
    cardElement.classList.add("card")
    const zoneWidth = zoneCardsDrawn.offsetWidth
    zoneCardsDrawn.appendChild(cardElement)
    adjustCardsPosition(zoneWidth)

    function adjustCardsPosition() {
        // console.log("Zone width: ");
        // console.log(zoneWidth);
        const cardWidth = imgDeck.offsetWidth
        const gapWidth = 5;

        const cardsInZone = Array.from(document.querySelectorAll("#cards-drawn .card"))
        // console.log("Cards in the display zone: ");
        // console.log(cardsInZone);

        // If cards + their gaps are larger than their allowed zone => move them
        if ((cardWidth * cardsInZone.length) + (gapWidth * (cardsInZone.length - 1)) > zoneWidth) {
            // console.log("zone too small");
            const spaceAllowedPerCard = Math.round((zoneWidth - cardWidth) / (cardsInZone.length - 1))
            for (let i = 0; i < cardsInZone.length; i++) {
                cardsInZone[i].style.left = `${i * spaceAllowedPerCard}px`;
                cardsInZone[i].style.top = `0px`;

            }
            return
        }

        // Normal placement
        for (let i = 0; i < cardsInZone.length; i++) {
            if (i == 0) {
                cardsInZone[i].style.left = `0px`;
                continue
            }
            cardsInZone[i].style.left = `${i * cardWidth + i * gapWidth}px`;
        }
    }
}

function updateDeckVisual() {
    // Looks weird with 1px per card
    // Looks okay with 12px for 40cards
    const pixelPerCard = 12 / 40
    imgDeck.style.transform = `translate(-${Math.round(scopaDeck.length * pixelPerCard)}px, -${Math.round(scopaDeck.length * pixelPerCard)}px)`
    imgDeck.style.borderRight = `${Math.round(scopaDeck.length * pixelPerCard)}px solid rgb(127, 127, 112)`
    imgDeck.style.borderBottom = `${Math.round(scopaDeck.length * pixelPerCard)}px solid rgb(91, 91, 87)`

    // Change visuals if deck is empty
    if (scopaDeck.length == 0) {
        imgDeck.setAttribute('src', 'game/assets/artworks/empty-deck.png')
        imgDeck.style.boxShadow = "none"
        imgDeck.onclick = () => { }
    }
}

function clearCardsDisplayZone() {
    zoneCardsDrawn.innerHTML = ``;
}

function gameMessage(text) {
    txtDungeonMaster.innerText = text;
}

function gameOver() {
    hideAllGenericButtons()
    gameMessage(`Vous êtes ${player.gender == "F" ? "morte" : "mort"}, votre aventure s'achève ici.
            Merci d'avoir joué ! On espère que vous vous êtes quand même bien ${player.gender == "F" ? "amusée" : "amusé"}.
            Rechargez la page si vous souhaitez recommencer une partie.`)
}

function win() {
    hideAllGenericButtons()
    gameMessage(`Vous avez gagné ! Quelle aventure ! Bravo !
        Merci d'avoir joué ! On espère que vous vous êtes bien ${player.gender == "F" ? "amusée" : "amusé"}.
        Rechargez la page si vous souhaitez recommencer une partie.`)
}