import {
  getRandomInt,
  shuffle,
  beingNameWithDeterminantDefini,
  beingNameWithDeterminantDefiniContracte,
  gameMessage,
  currentGameMessage,
  generateTraits,
  getWeakTrait,
  getStrongTrait,
  generateDescription,
  getClubsItem,
  getCupsItem,
  isBeingDead,
  hideAllButtons,
  isAllowedToRerollEnvironment,
  updateGameDivHeight,
  displayState
} from "./utilities.js";
import loadResources from "./data.js";
import Dice from "./Dice.js";
import { player } from "./Player.js";
import { voyage } from "./Voyage.js";
import Button from "./Button.js";


// Data tables
let encountersTable = [];
let intelligentRacesTable = [];
let monstersTable = [];
let weakTraitsTable = []
let strongTraitsTable = [];
let strongissimeTraitsTable = [];
let environmentsTable = [];
let bossesTable = [];
let scopaDeck = [];
let coinsItemsTable = [];
let swordsItemsTable = [];
let clubsItemsTable = [];
let cupsItemsTable = [];

// Deck Button
let imgDeck;

// Generic buttons
let btn1;
let btn2;
let btn3;
let btn4;
let btn5;
let btn6;
let genericButtons;

const d20 = new Dice(20);
const d100 = new Dice(100);
let shop;

let currentCombatContext = undefined
let environmentRerolls = 0
let isInCombat = false

const adventureBeginsMessage = `Vous contemplez les plaines de votre campagne natale. Savoir que vous ne reviendrai peut-être jamais chez vous vous fais un petit pincement au cœur mais votre détermination est sans faille, votre destin vous appelle.`
const playerPreparationPhaseMessage = `Si vous le souhaitez, vous pouvez lancer un sort depuis votre inventaire.`


// == APP ENTRY POINT ==
window.addEventListener('DOMContentLoaded', () => {
  console.log("DOM loaded");
  loadResources(
    [
      encountersTable,
      intelligentRacesTable,
      monstersTable,
      weakTraitsTable,
      strongTraitsTable,
      strongissimeTraitsTable,
      environmentsTable,
      bossesTable,
      scopaDeck,
      coinsItemsTable,
      swordsItemsTable,
      clubsItemsTable,
      cupsItemsTable
    ],
    [
      "game/resources/data-tables/encounters.json",
      "game/resources/data-tables/intelligent-races.json",
      "game/resources/data-tables/monsters.json",
      "game/resources/data-tables/weak-traits.json",
      "game/resources/data-tables/strong-traits.json",
      "game/resources/data-tables/strongissime-traits.json",
      "game/resources/data-tables/environments.json",
      "game/resources/data-tables/bosses.json",
      "game/resources/data-tables/scopa-cards.json",
      "game/resources/data-tables/coins-items.json",
      "game/resources/data-tables/swords-items.json",
      "game/resources/data-tables/clubs-items.json",
      "game/resources/data-tables/cups-items.json"
    ],
    start
  );
});


function start() {
  console.log("--Starting Game--");
  setupScreenCharacterSheet();
  setupScreenVoyage();
  setupGenericButtons();
  setupDeck();

  displayState(false);
  hideAllButtons(genericButtons);

  // Hide loading screen
  document.getElementById("loading-screen").style.display = "none";

  // Start gameplay sequence
  presentation();
  // tests();


  function setupScreenCharacterSheet() {
    const screenCharacterSheet = document.getElementById("character-sheet")
    const btnOpenScreenCharacterSheet = document.getElementById("btn-open-screen-character-sheet")
    const screenCharacterSheetContainer = document.getElementById("character-sheet-container")
    const screenCharacterSheetBackground = document.getElementById("character-sheet-background")

    // Side button
    btnOpenScreenCharacterSheet.onclick = () => {
      if (screenCharacterSheetContainer.style.display == "none") {
        closeVoyage()
        openCharacterSheet()
        return
      }
      closeCharacterSheet()
    }

    // Background "buttons"
    screenCharacterSheetContainer.onclick = () => { closeCharacterSheet() }
    screenCharacterSheetBackground.onclick = () => { closeCharacterSheet() }
    screenCharacterSheet.onclick = (event) => { event.stopPropagation(); } // Blocks clicks on the character sheet to go through to the container and close it

    closeCharacterSheet();

    function openCharacterSheet() {
      screenCharacterSheetContainer.style.display = "block"
      screenCharacterSheetBackground.style.display = "block"
      updateGameDivHeight(screenCharacterSheetContainer)
    }
  }
  function closeCharacterSheet() {
    document.getElementById("character-sheet-container").style.display = "none"
    document.getElementById("character-sheet-background").style.display = "none"
    updateGameDivHeight(undefined)
  }

  function setupScreenVoyage() {
    const screenVoyage = document.getElementById("voyage")
    const btnOpenScreenVoyage = document.getElementById("btn-open-screen-voyage")
    const screenVoyageContainer = document.getElementById("voyage-container")
    const screenVoyageBackground = document.getElementById("voyage-background")

    btnOpenScreenVoyage.onclick = () => {
      if (screenVoyageContainer.style.display == "none") {
        closeCharacterSheet()
        openVoyage()
        return
      }
      closeVoyage()
    }

    screenVoyageBackground.onclick = () => { closeVoyage() }
    screenVoyageContainer.onclick = () => { closeVoyage() }
    screenVoyage.onclick = (event) => { event.stopPropagation(); }


    closeVoyage();

    function openVoyage() {
      screenVoyageContainer.style.display = "block"
      screenVoyageBackground.style.display = "block"
      updateGameDivHeight(screenVoyageContainer)
    }
  }
  function closeVoyage() {
    document.getElementById("voyage-container").style.display = "none"
    document.getElementById("voyage-background").style.display = "none"
    updateGameDivHeight(undefined)
  }

  function setupGenericButtons() {
    const btn1Element = document.getElementById("btn1");
    const btn2Element = document.getElementById("btn2");
    const btn3Element = document.getElementById("btn3");
    const btn4Element = document.getElementById("btn4");
    const btn5Element = document.getElementById("btn5");
    const btn6Element = document.getElementById("btn6");
    btn1 = new Button(btn1Element);
    btn2 = new Button(btn2Element);
    btn3 = new Button(btn3Element);
    btn4 = new Button(btn4Element);
    btn5 = new Button(btn5Element);
    btn6 = new Button(btn6Element);
    genericButtons = [btn1, btn2, btn3, btn4, btn5, btn6];
  }

  function setupDeck() {
    shuffle(scopaDeck);
    imgDeck = document.getElementById("btn-deck");
    imgDeck.onclick = () => {
      clearCardsDisplayZone();
      drawReward(scopaDeck, false, true);
    };
    updateDeckVisual();
  }
}

//#region TESTS
function tests() {
  console.log("-- /!\\ TESTING ACTIVATED /!\\ --");
  // Test Buttons
  let btnUnlockDeck = document.getElementById("btn-unlock-deck")
  let btnFightBoss = document.getElementById("btn-fight-boss");
  let btnSpecialEventEncounter = document.getElementById("btn-special-event-encounter")
  let btnRestEncounter = document.getElementById("btn-rest-encounter")
  let btnVillageEncounter = document.getElementById("btn-village-encounter")

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
  //     // const testTraits = [getStrongTrait(strongTraitsTable, 3), getStrongTrait(strongTraitsTable, 3), getStrongTrait(strongTraitsTable, 3)]
  //     // const testTraits = [getStrongTrait(strongTraitsTable, 20), getStrongTrait(strongTraitsTable, 1), getStrongTrait(strongTraitsTable, 20), getStrongTrait(strongTraitsTable, 1), getStrongTrait(strongTraitsTable, 5)]
  //     // const testTraits = [getStrongTrait(strongTraitsTable, 19), getStrongTrait(strongTraitsTable, 1), getStrongTrait(strongTraitsTable, 19)]
  //     const testTraits = [getStrongTrait(strongTraitsTable, 15), getStrongTrait(strongTraitsTable, 15)]
  //     const being = generateIntelligentBeing(20, testTraits)
  //     console.log(being.name);
  // }, 200);
  //#endregion

  //#region Tests Card Draw
  // btnUnlockDeck.style.display = "block"
  btnUnlockDeck.onclick = () => {
    imgDeck.onclick = () => {
      drawTest();
      updateDeckVisual();
    };
  };

  function drawTest() {
    addCardToDisplayZone(scopaDeck.shift());
  }
  //#endregion

  //#region Item details screen V2
  // player.inventory.add(new EquippableItem(structuredClone(swordsItemsTable[3])))
  // player.inventory.add(new EquippableItem(structuredClone(swordsItemsTable[9])))
  // player.inventory.add(new Item(structuredClone(cupsItemsTable[0])))
  // player.inventory.add(new Item(structuredClone(cupsItemsTable[1])))
  // player.goldCoins += 200
  //#endregion

  //#region test BOSS
  btnFightBoss.style.display = "block";
  btnFightBoss.onclick = () => {
    finalAdventure();
  };

  // player.isAllowedToLevelUp = true
  // player.experiencePoints += 1_000
  // player.levelUpHitPoints(1000)
  // player.levelUpStrength(1000)
  // player.levelUpSpeed(1000)
  // player.levelUpMagic(20)
  // const predicateMod1 = 1 % 2 != 0
  // const predicateMod2 = 2 % 2 != 0
  // console.log("1 % 2 != 0 = " + predicateMod1)
  // console.log("2 % 2 != 0 = " + predicateMod2)
  //#endregion

  //#region test CONSUMABLES
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

  //#region test SPELLS
  // player.inventory.add(getClubsItem(1, clubsItemsTable)) // Vent Divin
  // player.inventory.add(getClubsItem(2, clubsItemsTable)) // Corps de Métal
  // player.inventory.add(getClubsItem(3, clubsItemsTable)) // Source Infinie
  // player.inventory.add(getClubsItem(4, clubsItemsTable)) // Soin
  player.inventory.add(getClubsItem(5, clubsItemsTable)) // Vol
  player.inventory.add(getClubsItem(6, clubsItemsTable)) // Téléportation
  // player.inventory.add(getClubsItem(7, clubsItemsTable)) // Affaiblissement
  // player.inventory.add(getClubsItem(8, clubsItemsTable)) // Sphère Infernale
  // player.inventory.add(getClubsItem(9, clubsItemsTable)) // Divination
  // player.inventory.add(getClubsItem(10, clubsItemsTable)) // Guérison Absolue
  // player.actionPoints += 100
  //#endregion

  //#region Clover system
  player.inventory.add(getCupsItem(4, cupsItemsTable));
  //#endregion

  //#region test SPECIAL EVENTS
  // Event02
  btnSpecialEventEncounter.style.display = "block";
  btnSpecialEventEncounter.onclick = () => {
    specialEncounter();
  };
  //#endregion

  //#region test REST
  player.experiencePoints += 6
  btnRestEncounter.style.display = "block"
  btnRestEncounter.onclick = () => {
    restEncounter()
  }
  //#endregion

  //#region test VILLAGE
  btnVillageEncounter.style.display = "block"
  btnVillageEncounter.onclick = () => {
    villageEncounter()
  }
  //#endregion
}
//#endregion

function presentation() {
  gameMessage(`Vous êtes assis·e devant votre âtre, le feu crépite. Soudain il tremble imperceptiblement, et pendant un instant la lumière vacille. Les ombres s'allongent légèrement, et un frisson glacé vous parcourt. Vous savez ce que cela signifie. Vous vous emparez de votre ancienne arme, enfilez votre manteau, et ouvrez la porte de votre masure. À l'horizon le ciel se teint de rouge et de mauve. Le Mal est revenu, et vous seul·e pouvez le vaincre...

        Bienvenue dans Mauvais & Maudit "Édition Online" !
        Vous êtes sur le point d'embarquer dans une aventure interactive textuelle. Durant cette quête, vous allez incarner un personnage dont vous allez tirer au hasard la race et le trait distinctif.
        Commençons par la race de votre personnage :
        - Appuyez sur "Lancer le D20" pour tirer au hasard votre race.`);

  btn1.activate(
    "Lancer le D20",
    () => {
      choosePlayerRace(d20.roll());
    },
    "d20"
  );
}

function choosePlayerRace(roll) {
  hideAllButtons(genericButtons)
  console.log("Race roll: ", roll);

  let hybridRaceA = {};
  let hybridRaceB = {};
  // const roll = getRandomInt(intelligentRacesTable.length) + 1;

  console.log(intelligentRacesTable);
  player.races[0] = structuredClone(intelligentRacesTable[roll - 1]);

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

        - Maintenant, lancez le D20 pour tirer votre trait.`);

  btn1.activate(
    "Lancer le D20",
    () => {
      choosePlayerTrait(d20.roll());
    },
    "d20"
  );

  //#region Non-Being Player Generation
  function generateNonBeingPlayer(being, isGeneratingHybrid) {
    // TODO : Manage case where PV is 0
    gameMessage(`19 ! - Non-Être.
        Les Non-Êtres sont des créatures instables. Vous allez devoir tirer vos stats au hasard.
        Lancez le D100 pour vos points de vie.`);

    btn1.activate(
      "Lancer le D100",
      () => {
        generateNonBeingHitPoints();
      },
      "d100"
    );

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
      btn1.activate("Vérifier", () => { checkNonBeingStability(being); });
    }

    function checkNonBeingStability(being) {
      hideAllButtons(genericButtons);
      const totalStats =
        being.hitPoints + being.strength + being.speed + being.magic;
      console.log(`Total Non-Être stats : ${totalStats}`);

      if (totalStats < 200) {
        const pointsToAdd = 200 - totalStats;
        gameMessage(
          `Votre état de Non-Être est trop fragile. Vous allez devoir rajouter ${pointsToAdd} ${pointsToAdd == 1
            ? "point à la caractéristique de votre choix"
            : "points répartis comme vous le souhaitez parmi vos caractéristiques"
          }.`
        );
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
        btn1.activate("Continuer", () => {
          generateHybridPlayer();
        });

        if (!hybridRaceB.name) {
          gameMessage(`${currentGameMessage()}

                        - Lancez le D20 pour tirer votre deuxième race.`);

          btn1.innerText = "Lancer le D20";
          return;
        }
      }

      gameMessage(`${currentGameMessage()}

                - Maintenant, lancez le D20 pour tirer votre trait.`);

      btn1.activate(
        "Lancer le D20",
        () => {
          choosePlayerTrait(d20.roll());
        },
        "d20"
      );
    }

    function adjustStats(being, amount, isAdding) {
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

      panelStatsAdjustment.style.display = "block";

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

      btnAddHitPoint.onclick = () => {
        addPointTo(hitPoints);
      };
      btnAddStrength.onclick = () => {
        addPointTo(strength);
      };
      btnAddSpeed.onclick = () => {
        addPointTo(speed);
      };
      btnAddMagic.onclick = () => {
        addPointTo(magic);
      };
      btnRemoveHitPoint.onclick = () => {
        removePointFrom(hitPoints);
      };
      btnRemoveStrength.onclick = () => {
        removePointFrom(strength);
      };
      btnRemoveSpeed.onclick = () => {
        removePointFrom(speed);
      };
      btnRemoveMagic.onclick = () => {
        removePointFrom(magic);
      };
      btnConfirmStatsAdjustment.onclick = () => {
        confirmStatsAdjustment(being, isGeneratingHybrid);
      };

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
        panelStatsAdjustment.style.display = "none";

        being.hitPoints = hitPoints.value;
        being.strength = strength.value;
        being.speed = speed.value;
        being.magic = magic.value;

        gameMessage(`C'est bon !`);

        if (isGeneratingHybrid) {
          if (!hybridRaceB.name) {
            gameMessage(`${currentGameMessage()}
                            
                            - Maintenant, lancez le D20 pour tirer votre deuxième race.`);

            btn1.activate(
              "Lancer le D20",
              () => {
                generateHybridPlayer();
              },
              "d20"
            );
            return;
          }

          generateHybridPlayer();
          return;
        }

        player.restoreHitPoints();
        player.updateAllVisuals();
        console.log(player);

        gameMessage(`${currentGameMessage()}

                    - Maintenant, lancez le D20 pour tirer votre trait.`);

        btn1.activate(
          "Lancer le D20",
          () => {
            choosePlayerTrait(d20.roll());
          },
          "d20"
        );
      }
    }
  }
  //#endregion

  //#region Hybrid Player Generation
  function generateHybridPlayer() {
    hideAllButtons(genericButtons);

    // First come around
    if (!hybridRaceA.name) {
      gameMessage(`20 ! - Hybride.
            Tu vas devoir tirer deux races séparément. Ta race finale sera un mélange des deux.
            Lance le D20 pour ta première race.`);

      btn1.activate(
        "Lancer le D20",
        () => {
          generateHybridPlayerFirstHalf();
        },
        "d20"
      );
      return;
    }
    // Second come around (after 1st half hybride)
    if (!hybridRaceB.name) {
      gameMessage(`Lance maintenant le D20 pour ta deuxième race.`);

      btn1.activate(
        "Lancer le D20",
        () => {
          generateHybridPlayerSecondHalf();
        },
        "d20"
      );
      return;
    }

    // Final
    player.races = [hybridRaceA, hybridRaceB];
    player.restoreHitPoints();
    player.updateAllVisuals();
    gameMessage(`${currentGameMessage()}
            
            Maintenant, lancez le D20 pour choisir votre trait.`);

    btn1.activate(
      "Lancer le D20",
      () => {
        choosePlayerTrait(d20.roll());
      },
      "d20"
    );

    function generateHybridPlayerFirstHalf() {
      const roll = d20.roll();

      hybridRaceA = structuredClone(intelligentRacesTable[roll - 1]);

      // Hybrid exception
      if (hybridRaceA.name.male == "Hybride") {
        gameMessage(
          `${roll} ! ${player.gender == "F"
            ? hybridRaceA.name.female
            : hybridRaceA.name.male
          } à nouveau. Relancez.`
        );
        btn1.innerText = "Relancer le D20";
        return;
      }

      // Non-Being special rule
      if (hybridRaceA.name.male == "Non-Être") {
        player.races = [hybridRaceA, {}];
        player.updateAllVisuals();
        generateNonBeingPlayer(hybridRaceA, true); // Sends us back to generateHybridPlayer at the end
        return;
      }

      player.races = [hybridRaceA, {}];

      gameMessage(
        `${roll} ! ${player.gender == "F" ? hybridRaceA.name.female : hybridRaceA.name.male
        }. Maintenant, lancez à nouveau le D20 pour votre deuxième race.`
      );

      btn1.activate(
        "Lancer le D20",
        () => {
          generateHybridPlayerSecondHalf();
        },
        "d20"
      );

      player.updateAllVisuals();
    }

    function generateHybridPlayerSecondHalf() {
      const roll = d20.roll();

      hybridRaceB = structuredClone(intelligentRacesTable[roll - 1]);

      if (
        hybridRaceB.name.male == "Hybride" ||
        hybridRaceB.name.male == hybridRaceA.name.male
      ) {
        gameMessage(
          `${roll} ! ${player.gender == "F"
            ? hybridRaceB.name.female
            : hybridRaceB.name.male
          } à nouveau. Relancez.`
        );
        btn1.innerText = "Relancer le D20";
        return;
      }

      if (hybridRaceB.name.male == "Non-Être") {
        player.races = [hybridRaceA, hybridRaceB];
        player.updateAllVisuals();
        generateNonBeingPlayer(hybridRaceB, true);
        return;
      }

      gameMessage(
        `${roll} ! ${player.gender == "F" ? hybridRaceB.name.female : hybridRaceB.name.male}.`
      );
      generateHybridPlayer();
    }
  }

  //#endregion
}

function choosePlayerTrait(roll) {
  // TODO : Manage cases where PV go below 1
  hideAllButtons(genericButtons);

  player.traits[0] = structuredClone(strongTraitsTable[roll - 1]);

  // Mutant special rule
  if (player.traits[0].name.accordMasculin == "Mutant") {
    gameMessage(`${roll} ! - ${player.gender == "F" ? player.traits[0].name.accordFeminin : player.traits[0].name.accordMasculin}
            Votre mutation augmente grandement une de vos caractéristiques mais en diminue une autre.
            - Choisissez une caractéristique à augmenter de 40 points.`);

    btn1.activate("Augmenter les Points de Vie (PV)", () => {
      chooseNerfedStat("hitPoints");
    });
    btn2.activate("Augmenter la Force (FO)", () => {
      chooseNerfedStat("strength");
    });
    btn3.activate("Augmenter la Vitesse (VI)", () => {
      chooseNerfedStat("speed");
    });
    btn4.activate("Augmenter la Magie (MA)", () => {
      chooseNerfedStat("magic");
    });

    return;

    function chooseNerfedStat(buffedStat) {
      gameMessage(`OK !
                - Maintenant, choisissez une autre stat à diminuer de 20 points.`);

      btn1.activate("Diminuer les Points de Vie (PV)", () => {
        finishMutantTrait("hitPoints");
      });
      btn2.activate("Diminuer la Force (FO)", () => {
        finishMutantTrait("strength");
      });
      btn3.activate("Diminuer la Vitesse (VI)", () => {
        finishMutantTrait("speed");
      });
      btn4.activate("Diminuer la Magie (MA)", () => {
        finishMutantTrait("magic");
      });

      switch (buffedStat) {
        case "hitPoints":
          player.traits[0].hitPoints = 40;
          btn1.isDisabled = true;
          break;
        case "strength":
          player.traits[0].strength = 40;
          btn2.isDisabled = true;
          break;
        case "speed":
          player.traits[0].speed = 40;
          btn3.isDisabled = true;
          break;
        case "magic":
          player.traits[0].magic = 40;
          btn4.isDisabled = true;
          break;

        default:
          console.error("Player mutant trait generation : unknown buff stat.");
          break;
      }

      function finishMutantTrait(nerfedStat) {
        // If the trait already has a value for the stat we do not validate
        switch (nerfedStat) {
          case "hitPoints":
            if (player.traits[0].hitPoints) return;
            player.traits[0].hitPoints = -20;
            break;
          case "strength":
            if (player.traits[0].strength) return;
            player.traits[0].strength = -20;
            break;
          case "speed":
            if (player.traits[0].speed) return;
            player.traits[0].speed = -20;
            break;
          case "magic":
            if (player.traits[0].magic) return;
            player.traits[0].magic = -20;
            break;

          default:
            console.error(
              "Player mutant trait generation : unknown nerf stat."
            );
            break;
        }

        hideAllButtons(genericButtons);

        player.traits[0].description = generateDescription(player.traits[0]);
        player.restoreHitPoints();
        player.updateTraitVisuals();
        player.updateStatsVisuals();

        gameMessage(`- Ensuite, choisissez le genre de votre personnage.`);

        btn1.activate("Féminin", () => {
          choosePlayerGender("F");
        });
        btn2.activate("Masculin", () => {
          choosePlayerGender("M");
        });
      }
    }
  }

  gameMessage(`${roll} ! - ${player.gender == "F" ? player.traits[0].name.accordFeminin : player.traits[0].name.accordMasculin} (${player.traits[0].description})
        
        - Ensuite, choisissez le genre de votre personnage.`);

  player.restoreHitPoints();
  player.updateTraitVisuals();
  player.updateStatsVisuals();

  btn1.activate("Féminin", () => {
    choosePlayerGender("F");
  });
  btn2.activate("Masculin", () => {
    choosePlayerGender("M");
  });
}

function choosePlayerGender(gender) {
  const panelPlayerName = document.getElementById("player-name-panel")
  const inputPlayerName = document.getElementById("player-name-input-field")
  const btnConfirmPlayerName = document.getElementById("btn-confirm-player-name-input-field")

  hideAllButtons(genericButtons);

  player.gender = gender;

  let message = `- Maintenant, choisissez un nom pour votre personnage.`;
  gameMessage(message);

  panelPlayerName.style.display = "block";
  inputPlayerName.focus();
  inputPlayerName.value = ``;

  btnConfirmPlayerName.onclick = () => {
    // Remove white spaces at beginning and end
    let inputName = inputPlayerName.value.trim();
    // Replace white spaces in the middle with a single space char
    inputName = inputName.replace(/\s\s+/g, " ");

    if (isNameValid(inputName) === false) return;
    if (isNameValid(inputName) == "short") {
      gameMessage(`${message}
                Notez : le nom doit contenir au moins 1 caractère.`);
      return;
    }
    if (isNameValid(inputName) == "long") {
      gameMessage(`${message}
                Notez : le nom ne doit pas dépasser 32 caractères.`);
      return;
    }
    if (isNameValid(inputName) == "invalid") {
      gameMessage(`${message}
                Notez : le nom ne peut contenir que des lettres de l'alphabet, des espaces et des tirets.`);
      return;
    }
    choosePlayerName(inputName);
    panelPlayerName.style.display = "none";
  };

  function isNameValid(name = "") {
    const namePattern = /^[a-zA-Z\s-]+$/;

    if (name.length < 1) return "short";
    if (name.length > 32) return "long";
    if (!namePattern.test(name)) return "invalid";

    return "valid";
  }
}

function choosePlayerName(name) {
  hideAllButtons(genericButtons);

  player.name = name;

  gameMessage(`- Enfin, tirez une carte du deck. Vous recevrez une récompense en fonction de la carte.`);

  player.isAllowedToDraw = true;
}

//#region Draw
function drawReward(
  deck = scopaDeck,
  allCardsCountAsCoins = false,
  isSetUpReward = false,
  isStealSpellReward = false
) {
  if (!player.isAllowedToDraw) return;

  if (!isStealSpellReward) {
    hideAllButtons(genericButtons);
  }

  player.isAllowedToDraw = false;

  // Redirection if no more cards
  // TODO: improve this
  if (deck.length <= 0 && isStealSpellReward) {
    gameMessage(`${playerPreparationPhaseMessage}
            
            Désolé, il n'y a plus de carte dans la pioche.`);

    player.isAllowedToUseLuckyClover = false;
    btn1.isDisabled = false;
    return;
  }
  if (deck.length <= 0 && !isStealSpellReward) {
    nextAdventure("La pioche est vide...");
    return;
  }

  let feedbackMessage = "";

  const cardDrawn = structuredClone(deck.shift());
  //console.log(scopaDeck);
  addCardToDisplayZone(cardDrawn);
  updateDeckVisual();
  feedbackMessage += `${cardDrawn.description} !`;
  let reward = {};

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
    reward = new EquippableItem(
      structuredClone(swordsItemsTable[cardDrawn.value - 1])
    );
    player.inventory.add(reward);
    // Tracker for the Lucky Clover
    lastItemReceivedRandomly = reward;
    feedbackMessage += ` 
        Vous recevez ${reward.isLegendary ? beingNameWithDeterminantDefini(reward, false) : reward.gender == "F" ? `une ${reward.name}` : `un ${reward.name}`} (${reward.description})`;
    //console.log(inventory);
  }

  // CLUBS cards
  if (cardDrawn.suit == "clubs" && allCardsCountAsCoins === false) {
    reward = getClubsItem(cardDrawn.value, clubsItemsTable);
    player.inventory.add(reward);
    // Tracker for the Lucky Clover
    lastItemReceivedRandomly = reward;
    feedbackMessage += ` 
        Vous recevez le sort ${reward.name} (${reward.description})`;
    //console.log(inventory);
  }

  // CUPS cards
  if (cardDrawn.suit == "cups" && allCardsCountAsCoins === false) {
    reward = getCupsItem(cardDrawn.value, cupsItemsTable);
    player.inventory.add(reward);
    // Tracker for the Lucky Clover
    lastItemReceivedRandomly = reward;
    feedbackMessage += ` 
        Vous recevez ${reward.isLegendary
        ? beingNameWithDeterminantDefini(reward, false)
        : reward.gender == "F"
          ? `une ${reward.name}`
          : `un ${reward.name}`
      } (${reward.description})`;
    //console.log(inventory);
  }

  feedbackMessage += `.`;

  if (isSetUpReward) {
    // Reset the deck button to be a normal reward one
    imgDeck.onclick = () => {
      clearCardsDisplayZone();
      drawReward(scopaDeck, false, false);
    };

    player.actionPoints += 2;
    lastItemReceivedRandomly = undefined;

    feedbackMessage += `
        
        Vous recevez également, comme bonus de départ, 2 points d'action${reward.actionPoints ? " supplémentaires" : ""
      }.
        
        Vous êtes maintenant ${player.gender == "F" ? "prête" : "prêt"
      } à commencer votre aventure !
        - Appuyer sur 'Commencer'.`;

    gameMessage(feedbackMessage);

    btn1.activate("Commencer", () => {
      clearCardsDisplayZone();
      nextAdventure(adventureBeginsMessage);
    });

    return;
  }

  // Only allowed if not just after receiving the first reward draw (which would make it possible to use it "on itself" right after drawing it if it was the very first item we drew - would not make sens)
  player.isAllowedToUseLuckyClover = true;

  if (isStealSpellReward) {
    btn1.isDisabled = false;
    gameMessage(`${feedbackMessage}`);
    return;
  }

  gameMessage(feedbackMessage);

  btn1.activate("Continuer", () => {
    nextAdventure();
  });
}
//#endregion

function chooseNewEnvironment(customMessage) {
  hideAllButtons(genericButtons);

  if (player.inventory.containsItemWithName("Compas des Anciens")) environmentRerolls++;

  let message = ``;

  if (customMessage) {
    message += `${customMessage}
    
    `;
  }

  gameMessage(`${message}Vous arrivez dans un nouvel environnement.
        - Lancez le D20 pour tirer celui-ci.`);

  btn1.activate(
    "Lancer le D20",
    () => {
      saveCloverState();
      clearCardsDisplayZone();
      newEnvironmentResult(getRandomInt(environmentsTable.length) + 1);
    },
    "d20"
  );

  function newEnvironmentResult(roll) {
    hideAllButtons(genericButtons);
    player.isAllowedToUseLuckyClover = true;

    const newEnvironment = structuredClone(environmentsTable[roll - 1]);
    console.log("New Environment roll : " + roll);
    console.log(newEnvironment);

    // reset the effects in case we reroll the environment
    currentEnvironment.clearEffects();

    // Pass data to the currentEnvironment of voyage.js
    currentEnvironment.name = newEnvironment.name;
    newEnvironment.effects.forEach((effect) => {
      currentEnvironment.addEffect(effect);
    });
    currentEnvironment.statsModifiers = newEnvironment.statsModifiers;
    currentEnvironment.shopModifiers = newEnvironment.shopModifiers;
    currentEnvironment.InnModifiers = newEnvironment.InnModifiers;

    let message = `${roll} ! ${newEnvironment.name}.
        ${newEnvironment.effects.length > 1 ? "Effets" : "Effet"} :`;

    for (let i = 0; i < newEnvironment.effects.length; i++) {
      message += `
            - ${newEnvironment.effects[i].description}`;
    }

    player.restoreHitPoints();
    player.updateStatsVisuals();

    if (isAllowedToRerollEnvironment()) {
      gameMessage(`${message}
                
                Durant votre voyage vous avez gagné la possibilité d'annuler votre prochain jet d'environnement. Voulez-vous annuler ce jet et relancer le dé ? `);

      btn1.activate(
        "Garder ce lancé",
        () => {
          environmentRerolls = 0;
          nextAdventure();
        }
      );
      btn2.activate(
        "Relancer",
        () => {
          environmentRerolls--;
          btn1.isDisabled = true; // In case we use the lucky clover here.
          saveCloverState();
          newEnvironmentResult(getRandomInt(environmentsTable.length + 1));
        },
        "d20"
      );

      return;
    }

    gameMessage(message);

    btn1.activate("Continuer", () => { nextAdventure(); });
  }
}

function generateIntelligentBeing(roll = d20.roll(), traits = []) {
  let gender = d20.reducedRoll(d20.roll(), 2) == 1 ? "F" : "M";

  let being = new Being({
    type: "Intelligent Being",
    races: [structuredClone(intelligentRacesTable[roll - 1])],
    gender: gender,
    traits: traits
  });

  // Momie special rule
  if (being.races[0].name.female == "Momie") {
    being.gender = "F";
  }

  // Golem special rule
  if (being.races[0].name.male == "Golem") {
    being.gender = "M";
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

    race.name = {};
    race.name.female = "Non-Être";
    race.name.male = "Non-Être";

    // Generate stats
    race.hitPoints = d100.roll();
    race.strength = d100.roll();
    race.speed = d100.roll();
    race.magic = d100.roll();

    return adjustGeneratedNonBeing(race);

    function adjustGeneratedNonBeing(being) {
      const totalStats =
        being.hitPoints + being.strength + being.speed + being.magic;
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

    raceA.name = {};
    raceB.name = {};
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
        being.gender = "F";
      }

      // Golem special rule
      if (raceA.name.male == "Golem") {
        being.gender = "M";
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
  let monster = new Being({
    type: "Monster",
    races: [structuredClone(monstersTable[roll - 1])],
    traits: traits
  });

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
  let boss = new Being({
    type: "Boss",
    races: [structuredClone(bossesTable[roll - 1])],
  });
  boss.restoreHitPoints();
  return boss;
}

function nextAdventure(customMessage = "") {
  hideAllButtons(genericButtons);

  // Trackers for the Lucky Clover
  player.isAllowedToUseLuckyClover = false;
  lastItemReceivedRandomly = undefined;

  displayState(false);
  // console.log("current step: ");
  // console.log(voyage.currentStep);

  // If we start a new environment we choose it first
  if (voyage.isFirstStep && currentEnvironment.name == "") {
    chooseNewEnvironment(customMessage);
    return;
  }

  // Mini-boss time !
  if (voyage.currentStep.isMiniBoss) {
    if (customMessage) {
      gameMessage(customMessage);
      btn1.activate("Continuer", () => {
        clearCardsDisplayZone();
        miniBossAdventure();
      });
      return;
    }

    clearCardsDisplayZone()
    miniBossAdventure()
    return
  }

  // Final Boss time !
  if (voyage.currentStep.isFinalBoss) {
    if (customMessage) {
      gameMessage(customMessage);
      btn1.activate("Continuer", () => {
        clearCardsDisplayZone();
        finalAdventure();
      });
      return;
    }
    clearCardsDisplayZone();
    finalAdventure();
    return
  }

  if (customMessage) {
    gameMessage(`${customMessage}
          
          Une nouvelle étape de votre voyage commence.
          - Lancez un D100 pour voir quelles péripéties vous attendent.`);
  }
  else {
    gameMessage(`Une nouvelle étape de votre voyage commence.
          - Lancez un D100 pour voir quelles péripéties vous attendent.`);
  }

  btn1.activate(
    "Lancer le D100",
    () => {
      saveCloverState();
      clearCardsDisplayZone();
      chooseNextAdventure(d100.roll());
    },
    "d100"
  );

  function chooseNextAdventure(roll) {
    hideAllButtons(genericButtons);
    player.isAllowedToUseLuckyClover = true;

    let message = `${roll} !
        Vous avez le choix entre ces aventures :
        `;

    let choice1 = encountersTable[roll - 2]; // Roll - 1
    let choice2 = encountersTable[roll - 1]; // Actual roll
    let choice3 = encountersTable[roll]; // Roll + 1
    console.log(choice1);
    console.log(choice2);
    console.log(choice3);

    // Filter out invalid or duplicate choices
    if (choice1) {
      if (choice1.type == "Coup de chance !") choice1 = undefined;
    }
    if (choice2) {
      if (choice1 && choice2.type == choice1.type) choice2 = undefined;
    }
    if (choice3) {
      if (choice3.type == "Coup de chance !") choice3 = undefined;
      if (choice3 && choice1) {
        if (choice3.type == choice1.type) choice3 = undefined;
      }
      if (choice3 && choice2) {
        if (choice3.type == choice2.type) choice3 = undefined;
      }
    }

    // Assign text value and buttons logic depending on the types of the choice
    const choices = [choice1, choice2, choice3];
    const buttons = [btn1, btn2, btn3];

    for (let i = 0; i < 3; i++) {
      if (choices[i] === undefined) continue;

      switch (choices[i].type) {
        case "Combat !":
          message += `- Un combat contre un monstre
                    `;
          buttons[i].activate(
            "Combattre un monstre",
            () => {
              monsterEncounter();
            },
            "monstre"
          );
          break;

        case "Combat ?":
          message += `- Une rencontre avec une créature intelligente
                            `;
          buttons[i].activate(
            "Rencontrer une créature intelligente",
            () => {
              intelligentBeingEncounter();
            },
            "créature-intelligente"
          );
          break;

        case "Événement":
          message += `- Un événement spécial
                            `;
          buttons[i].activate(
            "Événement spécial",
            () => {
              specialEncounter();
            },
            "événement"
          );
          break;

        case "Village":
          message += `- Visiter un village
                            `;
          buttons[i].activate(
            "Visiter un village",
            () => {
              villageEncounter();
            },
            "village"
          );
          break;

        case "Repos":
          message += `- Se reposer
                            `;
          buttons[i].activate(
            "Se reposer",
            () => {
              restEncounter();
            },
            "repos"
          );
          break;

        case "Coup de chance !":
          message += `- Un coup de chance
                        `;
          buttons[i].activate(
            "Coup de chance",
            () => {
              luckyEncounter();
            },
            "coup-de-chance"
          );
          break;

        default:
          console.error("Unknown adventure type !");
          break;
      }
    }

    gameMessage(`${message}
            Que choisissez-vous ?`);
  }
}

// Fight vs super strong monster
function miniBossAdventure() {
  const introMessage = `La nuit est en train de tomber. Vous êtes à la recherche d'un endroit où poser vos affaires pour passer une nuit à la belle étoile. Vous êtes tellement ${player.gender == "F" ? "distraite" : "distrait"
    } à scruter la pénombre de part et d'autre du chemin, que vous ne remarquez pas une ombre imposante se dresser au milieu de celui-ci. Vous percutez la créature de plein fouet. Elle-même, n'ayant pas décelé votre présence jusque là, bondit et se prépare à vous attaquer.`;

  const traits = [];
  traits.push(getStrongTrait(strongTraitsTable));
  traits.push(getStrongTrait(strongTraitsTable));

  const monster = generateMonster(d20.roll(), traits);

  const contextData = {
    opponent: monster,
    introMessage: introMessage
  };

  fight(contextData);
}

//#region Boss fight set up
function finalAdventure() {
  const openingMessageVariations = [
    `Ça y est ! Vous y êtes. Le repère du mal.`,
    `Vous suivez maintenant le chemin depuis plusieurs jours. Non loin, au détour d'un gros talus, vous apercevez enfin votre destination...`,
  ];

  gameMessage(
    `${openingMessageVariations[getRandomInt(openingMessageVariations.length)]}

        - Lancez le D20 pour tirer le boss que vous allez affronter.`
  );

  btn1.activate(
    "Lancer le D20",
    () => {
      saveCloverState();
      chooseBoss(getRandomInt(bossesTable.length) + 1);
    },
    "d20"
  );

  function chooseBoss(roll) {
    player.isAllowedToUseLuckyClover = true;
    const boss = generateBoss(roll);
    console.log("Boss :");
    console.log(boss);
    let message = `${roll} !
        `;
    let contextData = {};
    contextData.opponent = boss;

    switch (boss.name) {
      case "Vcrakusa, la déesse-vampire":
        // Flavor text before the boss name is revealed
        message += `Vous êtes au pied d'une falaise au sommet de laquelle un château aux longues tours effilées est perché. Vous parvenez à gravir la falaise et trouver une entrée dérobée du château. Vous vous faufilez sans vous faire repérer par les gardes. Aux détours des couloirs et des escaliers vous parvenez enfin à trouver la salle d'incantation où se tisse l'origine du terrible maléfice qui s'est abattu sur l'ensemble des régions voisines. Une telle malédiction est certainement l'oeuvre d'une créature très puissante. Vous prenez tout votre courage à bras le corps et pénétrez dans l'antre du mal.`;

        const vcrakusaPreparationPhase = (ctx) => {
          hideAllButtons(genericButtons);
          displayState(false);
          console.log("Vcrakusa preparation phase.");
          console.log("Combat turn: " + ctx.fightTurn);

          // On odd fight turns -> Vcrakusa does nothing
          if (ctx.fightTurn % 2 !== 0) {
            endOfVcrakusaPreparationPhase();
            return;
          }

          // Vcrakusa casts 'Healing' amplified
          const amount = 20 + d100.roll();
          ctx.opponent.hitPoints += amount;

          displayState(
            true,
            `-~ Combat contre : ${ctx.opponent.name} ~-
                        -- Phase de préparation : adversaire --`
          );

          gameMessage(`

                    ${ctx.opponent.name}, repue de votre sang, régénère ${amount}PV.`);

          btn1.activate("Continuer", () => { endOfVcrakusaPreparationPhase(); });

          function endOfVcrakusaPreparationPhase() {
            regularOpponentPreparationPhase(ctx);
          }
        };

        contextData.introMessage = `Vous découvrez une large pièce circulaire. En son centre, trône un être décharné assis sur une chaise disproportionnée en bois sombre aux sculptures élaborées. La créature, en remarquant votre entrée dans la pièce, commence à se lever lentement. Ses yeux, d'un noir sans reflet, vous regardent intensément pendant plusieurs secondes. Puis, soudain, la créature funeste ouvre grand la bouche, laissant apparaître deux fines canines d'une taille anormalement grande et se rue vers vous en poussant un cri glaçant.`;
        contextData.opponentPreparationPhaseCallBack = vcrakusaPreparationPhase;
        contextData.rewardPhaseCallBack = defaultBossRewardPhase;
        break;

      case "Balneus, le dragon sans visage":
        // Flavor text before the boss name is revealed
        message += `Une porte massive, incrustée dans la roche de la falaise, se dresse devant vous. Vous apercevez des gobelin·e·s qui montent la garde autour. En les observant un peu mieux, iels semblent avoir un comportement étrange pour des gobelin·e·s.
                    En restant sur votre garde, vous vous approchez d'elleux. Une fois à portée de voix et avant même que vous ayez pu prononcer le moindre mot, iels vous demandent tous ensemble ce que vous venez faire devant l'antre du grand Balneus, d'une voix unique ainsi qu'avec une parfaite maîtrise de la langue commune.
                    ${player.gender == "F" ? "Surprise" : "Surpris"
          }, vous reprenez votre assurance avant de répondre d'une voix claire :
                    "- Je viens rencontrer le maitre des lieux !" Votre voix se répercute sur la roche, créant de l'écho.
                    Les yeux des gobelin·e·s semble s'éteindre quelques instants. Puis de leur voix commune iels annoncent :
                    "- Entrez donc ! Je commençais à avoir faim !"
                    Tout de suite après, la porte s'ouvre dans un bruit de tonnerre. Doutant une fois de plus de votre stratégie, vous entrez néanmoins. Après quelques couloirs, vous l’apercevez enfin...`;

        contextData.introMessage = `Allongé de tout son long sur une montagne d'ossements de diverses créatures, le dragon sans visage. D'une blancheur maladive, ses ailes sont repliées autour de son corps d'apparence visqueuse.
                    Alors que vous approchez, le dragon pousse un rugissement impressionnant, se lève et déplie ses ailes de chauve-souris, plus menaçant que jamais.
                    Le combat est imminent. Vous rassemblez vos esprits et votre courage.`;
        contextData.rewardPhaseCallBack = balneusRewardPhase;
        contextData.defeatPhaseCallBack = balneusDefeatPhase;
        break;

      default:
        console.error("Unknown boss name");
        break;
    }

    gameMessage(message);
    btn1.activate("Continuer", () => {
      fight(contextData);
    });
  }
}

function defaultBossRewardPhase(ctx) {
  player.isAllowedToUseLuckyClover = false;
  currentCombatContext = undefined;
  hideAllButtons(genericButtons);
  stepCompleted();
  displayState(false);
  player.restoreHitPoints();
  player.resetSpellEffects();
  isInCombat = false;

  gameMessage(`${ctx.opponent.name} est ${ctx.opponent.gender == "F" ? "terrassée" : "terrassé"} !
        Félicitations ! Vous avez réussi. Grâce à vous et à votre détermination, la malédiction est brisée. Les régions aux alentours seront à nouveau libres et sereines. 
        Il est maintenant temps pour vous de rentrer à la maison, cette campagne aux douces plaines que vous avez quitté il y a si longtemps déjà. Vous conterai vos exploits sur votre chemin pour qu'encore dans longtemps on chante vos aventures.
        Fin.
        
        Merci d'avoir joué ! On espère que vous avez passé un bon moment pendant ce jeu de rôle.
        Rechargez la page si vous voulez recommencer une nouvelle aventure. Et sinon, ben voilà, c'est fini, à la prochaine. Bisou ! `);
}

function balneusRewardPhase(ctx) {
  player.isAllowedToUseLuckyClover = false;
  currentCombatContext = undefined;
  hideAllButtons(genericButtons);
  stepCompleted();
  displayState(false);
  player.restoreHitPoints();
  player.resetSpellEffects();
  isInCombat = false;

  gameMessage(
    `Quand le dragon s'écroule, vous en croyez à peine vos yeux. Un rapide coup d'œuil alentour vous apprends que vous avez du même coup libéré les gobelin·e·s du controle mental de Balneus. Vous vous préparez à vous défendre. Cependant, au lieu de vous attaquer, iels se prosternent devant vous en criant : ${player.gender == "F" ? "déesse !" : "dieux !"}. Si vous en restez ${player.gender == "F" ? "abasourdie" : "abasourdi"}, les gobelin·e·s, elleux, ne perdent pas de temps avant de passer aux offrandes. Des bijoux, des vivres, de somptueuses gemmes et surtout des bandages et onguents pour vos plaies. Faire la fête quelques jours avec les gobelin·e·s ne pouvait pas faire de mal après tout.
        
        Merci d'avoir joué ! En espérant que vous avez passé un bon moment !
        Rechargez la page si vous voulez recommencer une nouvelle aventure. Et sinon, ben voilà, c'est fini, à la prochaine. Bisou !
        `
  );
}

function balneusDefeatPhase(ctx) {
  player.isAllowedToUseLuckyClover = false;
  hideAllButtons(genericButtons);
  displayState(false);
  gameMessage(
    `Un genou à terre, vous tenter une contre-attaque pour reprendre l'avantage. Mais le dragon semble lire en vous comme dans un livre ouvert. D'un geste fluide, son aile atterrit dans votre ventre, vous envoyant plusieurs mètres plus loin inerte. ${player.gender == "F" ? "Satisfaite" : "Satisfait"} d'avoir pu voir vos derniers instants, votre âme s'envole vers la lumière... À moins que ce ne soit vers une autre aventure ?
    
        Merci d'avoir joué ! On espère que vous vous êtes quand même bien ${player.gender == "F" ? "amusée" : "amusé"
    }.
        Rechargez la page si vous souhaitez recommencer une partie.
        `
  );
}
//#endregion

//#region ENCOUNTERS
function monsterEncounter() {
  player.isAllowedToUseLuckyClover = false;

  let traits = generateTraits();
  const monster = generateMonster(d20.roll(), traits);
  let introMessage = `${monster.gender == "F" ? "Une" : "Un"} ${monster.name
    } vous barre la route. Le combat est inévitable.`;

  const contextData = {
    opponent: monster,
    introMessage: introMessage,
  };

  fight(contextData);
}

function intelligentBeingEncounter() {
  player.isAllowedToUseLuckyClover = false;
  hideAllButtons(genericButtons);

  let traits = generateTraits();
  const intelligentBeing = generateIntelligentBeing(d20.roll(), traits);
  console.log("intelligent being Encounter :");
  console.log(intelligentBeing);

  gameMessage(`Alors que vous marchez tranquillement sur le chemin, vous croisez ${intelligentBeing.gender == "F" ? "une" : "un"
    } ${intelligentBeing.name}. 
        Lancez le D20 pour voir quel attitude ${intelligentBeing.gender == "F" ? "elle" : "il"
    } va adopter.`);

  btn1.activate(
    "Lancer le D20",
    () => {
      saveCloverState();
      checkAttitude(d20.roll());
    },
    "d20"
  );

  function checkAttitude(roll) {
    player.isAllowedToUseLuckyClover = true;

    // Roll 1-3
    if (roll <= 3) {
      gameMessage(`${roll} !
                ${beingNameWithDeterminantDefini(
        intelligentBeing,
        false
      )} vous salue poliment et fait mine de vouloir continuer sa route sans plus d'interaction.
                - Voulez-vous continuer votre chemin ou l'attaquer ?`);

      btn1.activate("Continuer", () => {
        letBeingGo();
      });
      btn2.activate("Attaquer", () => {
        const contextData = {
          opponent: intelligentBeing,
          introMessage: `Vous poussez agressivement ${beingNameWithDeterminantDefini(
            intelligentBeing,
            true
          )} et adoptez une position de combat.`,
        };
        fight(contextData);
      });
      return;
    }
    // Roll 4-6
    if (roll <= 6) {
      // If race in common or as strong as the being - Free passage
      if (
        player.hasARaceInCommonWith(intelligentBeing) ||
        player.strength >= intelligentBeing.strength
      ) {
        gameMessage(`${roll} !
                    ${beingNameWithDeterminantDefini(
          intelligentBeing,
          false
        )} vous toise du regard avant de s'écarter du chemin pour vous laisser passer. Vous décelez un certain air de frustration sur son visage.
                    
                    - Voulez-vous continuer votre route ou l'attaquer ?`);

        btn1.activate("Continuer", () => {
          letBeingGo();
        });
        btn2.activate("Attaquer", () => {
          const contextData = {
            opponent: intelligentBeing,
            introMessage: `Vous poussez agressivement ${beingNameWithDeterminantDefini(
              intelligentBeing,
              false
            )} et adoptez une position de combat.`
          };
          fight(contextData);
        });
        return;
      }

      // Otherwise, asks for toll
      const toll = 50 * (environments.indexOf(currentEnvironment) + 1);

      gameMessage(`${roll} !
                ${beingNameWithDeterminantDefini(
        intelligentBeing,
        false
      )} se met en travers du chemin et d'un air menaçant vous demande ${toll}PO pour pouvoir passer.
                
                Que choisissez-vous ?
                - Donner l'argent.
                - Attaquer ${beingNameWithDeterminantDefini(
        intelligentBeing,
        true
      )}.`);

      btn1.activate(`Donner ${toll}PO`, () => { giveGold(toll); });
      if (player.goldCoins < toll) btn1.isDisabled = true;

      btn2.activate(`Attaquer`, () => {
        const contextData = {
          opponent: intelligentBeing,
          introMessage: `Vous poussez agressivement ${beingNameWithDeterminantDefini(intelligentBeing, false)} et adoptez une position de combat.`
        };
        fight(contextData);
      });
      return;
    }
    // Roll 7-9
    if (roll <= 9) {
      // If race in common or as strong magically as the being - Free passage
      if (
        player.hasARaceInCommonWith(intelligentBeing) ||
        player.magic >= intelligentBeing.magic
      ) {
        gameMessage(`${roll} !
                    ${beingNameWithDeterminantDefini(
          intelligentBeing,
          false
        )} vous toise du regard avant de s'écarter du chemin pour vous laisser passer. Vous décelez un certain air de frustration sur son visage.
    
                    - Voulez-vous continuer votre route ou l'attaquer ?`);

        btn1.activate("Continuer", () => {
          letBeingGo();
        });
        btn2.activate("Attaquer", () => {
          const contextData = {
            opponent: intelligentBeing,
            introMessage: `Vous poussez agressivement ${beingNameWithDeterminantDefini(
              intelligentBeing,
              false
            )} et adoptez une position de combat.`
          };
          fight(contextData);
        });
        return;
      }

      // Otherwise, asks for toll
      const toll = 50 * (environments.indexOf(currentEnvironment) + 1);

      gameMessage(`${roll} !
            ${beingNameWithDeterminantDefini(
        intelligentBeing,
        false
      )} se met en travers du chemin et d'un air menaçant vous demande ${toll}PO pour pouvoir passer.

            Que choisissez-vous ?
            - Donner l'argent.
            - Attaquer ${beingNameWithDeterminantDefini(
        intelligentBeing,
        true
      )}.`);

      btn1.activate(`Donner ${toll}PO`, () => {
        giveGold(toll);
      });
      if (player.goldCoins < toll) btn1.isDisabled = true;

      btn2.activate(`Attaquer`, () => {
        const contextData = {
          opponent: intelligentBeing,
          introMessage: `Vous poussez agressivement ${beingNameWithDeterminantDefini(
            intelligentBeing,
            false
          )} et adoptez une position de combat.`
        };
        fight(contextData);
      });
      return;
    }
    // Roll 10-12
    if (roll <= 12) {
      // FIGHT !
      gameMessage(`${roll} !
                Dès que ${beingNameWithDeterminantDefini(
        intelligentBeing,
        true
      )} vous aperçois, ${intelligentBeing.gender == "F" ? "elle" : "il"
        } sort son arme et se rue vers vous en criant sauvagement !`);

      btn1.activate("Continuer", () => {
        const contextData = {
          opponent: intelligentBeing,
          introMessage: currentGameMessage()
        };

        fight(contextData);
      });

      return;
    }
    // Roll 13-15
    if (roll <= 15) {
      const unbuffedBeing = new Being({
        type: intelligentBeing.type,
        races: intelligentBeing.races,
        gender: intelligentBeing.gender,
        traits: intelligentBeing.traits
      });

      gameMessage(`${roll} !
            Lorsque ${beingNameWithDeterminantDefini(
        unbuffedBeing,
        true
      )} arrive à votre hauteur, ${unbuffedBeing.gender == "F" ? "elle" : "il"
        } vous lance un grognement bourru. Vous ${unbuffedBeing.gender == "F" ? "la" : "le"
        } saluez en retour ce qui, surprenamment, à pour effet de faire entrer ${beingNameWithDeterminantDefini(
          unbuffedBeing,
          true
        )} dans une rage folle. 
            
            La créature gagne un trait fort.`);

      btn1.activate("Continuer", () => {
        intelligentBeing.traits.push(getStrongTrait(strongTraitsTable, d20.roll()));
        intelligentBeing.restoreHitPoints();

        const contextData = {
          opponent: intelligentBeing,
          introMessage: currentGameMessage()
        };

        fight(contextData);
      });

      return;
    }
    // Roll 16-18
    if (roll <= 18) {
      player.experiencePoints++;
      environmentRerolls++;
      gameMessage(`${roll} !
                ${beingNameWithDeterminantDefini(
        intelligentBeing,
        false
      )} vous salue amicalement et vous fait part d'un malencontreux événement qui lui est arrivé sur sa route. Vous prenez bonnes notes de ces précieuses informations. Qui sait, peut-être réussirez-vous, grâce à ces dernières, à déjouer les périls du chemin ardu qui vous attend ?
                
                Vous gagnez 1XP et la possibilité d'annuler votre prochain lancé de dé d'environnement et de le relancer.`);

      btn1.activate("Continuer", () => {
        stepCompleted();
        nextAdventure();
      });

      return;
    }
    // Roll 19-20
    if (roll <= 20) {
      gameMessage(`${roll} !
                Vous réalisez que ${beingNameWithDeterminantDefini(
        intelligentBeing,
        true
      )} est en fait ${intelligentBeing.gender == "F"
        ? "une marchande itinérante"
        : "un marchand itinérant"
        }.
                
                Que choisissez-vous de faire ?
                    - Faire affaire avec ${intelligentBeing.gender == "F"
          ? "la marchande"
          : "le marchand"
        }
                    - Attaquer ${intelligentBeing.gender == "F"
          ? "la marchande"
          : "le marchand"
        }`);

      btn1.activate("Voir la marchandise", () => {
        visitShop(
          `Vous faites signe ${intelligentBeing.gender == "F" ? "à la marchande" : "au marchand"
          } de vous montrer sa marchandise.`,
          `Vous remerciez ${intelligentBeing.gender == "F" ? "la marchande" : "le marchand"
          } pour son temps et continuez votre route.`,
          `${intelligentBeing.gender == "F" ? "La marchande" : "Le marchand"
          } vous fait part que, malheureusement, tout son stock est vide`,
          `${player.gender == "F" ? "Déçue" : "Déçu"}, vous faites comprendre ${intelligentBeing.gender == "F" ? "à la marchande" : "au marchand"
          } que ça ne fait rien avant de continuer votre route.`,
          2
        );
      });
      btn2.activate("Attaquer", () => {
        const contextData = {
          opponent: intelligentBeing,
          introMessage: `Sans aucune sommation, vous dégainez et brandissez votre arme dans la direction ${intelligentBeing.gender == "F" ? "de la marchande" : "du marchand"
            }. ${intelligentBeing.gender == "F" ? "Cette dernière" : "Ce dernier"
            } lâche un cris d'effroi et sort une arme de son sac-à-dos.`
        };
        fight(contextData);
      });
    }

    function letBeingGo() {
      player.isAllowedToUseLuckyClover = false;
      hideAllButtons(genericButtons);

      let outroMessage = `Vous continuez votre route.
            - Vous gagnez 1XP.`;

      player.experiencePoints++;
      stepCompleted();
      nextAdventure(outroMessage);
    }

    function giveGold(amount) {
      if (player.goldCoins < amount) return;

      player.isAllowedToUseLuckyClover = false;
      hideAllButtons(genericButtons);

      let outroMessage = `Vous donnez ${amount}PO ${intelligentBeing.gender == "F" ? "à la racketteuse" : "au racketteur"
        }, qui vous laisse passer. Vous continuez votre route.
                - Vous gagnez 1XP.`;

      player.goldCoins -= amount;
      player.experiencePoints++;
      stepCompleted();
      nextAdventure(outroMessage);
    }
  }
}

function restEncounter() {
  player.isAllowedToUseLuckyClover = false;
  const flavorTextsVariations = [
    {
      introMessage: `Vous trouvez un coin relativement sûr et aménagez un campement sommaire. Vous vous sustentez et vous apprêtez à passer la nuit tout en repensant aux situations auxquelles vous avez fait face jusqu'ici.`,
      outroMessage: `Après une bonne nuit de sommeil, vous mangez un déjeuner frugal avant de remballer vos affaires et de vous remettre en route.`,
      leaveButtonText: "Lever le camp",
    },
  ];
  const flavorRoll = getRandomInt(flavorTextsVariations.length);

  rest(
    flavorTextsVariations[flavorRoll].introMessage,
    flavorTextsVariations[flavorRoll].outroMessage,
    flavorTextsVariations[flavorRoll].leaveButtonText
  );
}

function villageEncounter() {
  player.isAllowedToUseLuckyClover = false;
  let innPrice = 100;

  // environment modifiers
  if (currentEnvironment.innModifiers) {
    if (currentEnvironment.innModifiers.price) {
      innPrice += currentEnvironment.innModifiers.price;
    }
  }

  gameMessage(`Vous arrivez sur la place principale d'un petit village. Les passants vous dévisagent avec méfiance.
        
        Que choisissez-vous de faire :
        - Se rendre au magasin. (possibilité d'acheter et de revendre des objets)
        - Se rendre à l'auberge. (coûte ${innPrice}PO, permet de se reposer)`);

  hideAllButtons(genericButtons);

  btn1.activate("Aller au magasin", () => {
    visitShop();
  });
  btn2.activate("Aller à l'auberge (-100PO)", () => {
    visitInn(innPrice);
  });
  if (player.goldCoins < innPrice) btn2.isDisabled = true;
}

function visitShop(
  introMessage = "Vous entrez dans le magasin.",
  leaveMessage = "Vous sortez du magasin et continuez votre route.",
  noCardsMessage = "Vous arrivez devant le magasin mais réalisez avec déception que celui-ci est fermé",
  noCardsLeaveMessage = "Vous sortez du village avec déception.Mais vous repensez à votre quête et retrouvez du baume au cœur car seul vous pouvez arrêter le Mal et ce dernier n'attend pas.",
  maxCards = 4,
  additionalItemsAvailable = []
) {
  hideAllButtons(genericButtons);
  player.isAllowedToUseLuckyClover = false;

  // There is no cards left in the deck
  if (scopaDeck.length <= 0) {
    if (additionalItemsAvailable.length > 0) {
      deployShop()
      return
    }
    gameMessage(`${noCardsMessage} (il n'y a plus de carte dans la pioche).`);
    btn1.activate("Partir", () => {
      stepCompleted();
      nextAdventure(`${noCardsLeaveMessage}`);
    });
    return;
  }

  gameMessage(`${introMessage}
        Tirez ${maxCards} cartes pour voir quels objets sont en vente (les cartes 'Pièces' ne correspondent à aucun objet achetable).`);

  let cardsDrawn = [];

  imgDeck.onclick = () => {
    clearCardsDisplayZone();
    initialShopDraw(scopaDeck);
  };

  player.isAllowedToDraw = true;

  function initialShopDraw(deck) {
    if (!player.isAllowedToDraw) return

    player.isAllowedToDraw = false;

    if (deck.length <= 0) {
      gameMessage("La pioche est vide.");
      btn1.activate("Continuer", () => { deployShop() })
      return;
    }

    const cardDrawn = structuredClone(deck.shift());
    cardsDrawn.push(cardDrawn);
    updateDeckVisual()
    addCardToDisplayZone(cardDrawn);

    // Loop this function while we still need to draw cards.
    if (isAllowedToDrawMore()) {
      gameMessage(`${cardDrawn.description}.
                Tirez encore ${maxCards - cardsDrawn.length} ${cardsDrawn.length == maxCards - 1 ? "carte" : "cartes"}.`)

      player.isAllowedToDraw = true
      imgDeck.onclick = () => { initialShopDraw(deck) }

      return
    }

    // We drew the last card allowed
    // If all coins cards -> run the additional card draw sequence
    if (isAllCoins()) {
      gameMessage(`${cardDrawn.description}.
                Toutes les cartes sont de la suite 'Pièces'.
                Tirez des cartes jusqu'à tomber sur une carte d'une autre suite.`);

      player.isAllowedToDraw = true;
      cardsDrawn = [];

      imgDeck.onclick = () => {
        clearCardsDisplayZone();
        additionalShopDraw(scopaDeck);
      };
      return;
    }

    // Otherwise, deploy shop
    gameMessage(`${cardDrawn.description}.
            C'est bon. Appuyez sur continuer pour voir l'objet, ou les objets, disponible(s).`);

    btn1.activate("Continuer", () => {
      deployShop();
    });

    function isAllowedToDrawMore() {
      if (cardsDrawn.length >= maxCards) {
        return false;
      }

      return true;
    }

    function isAllCoins() {
      let check = true;

      cardsDrawn.forEach((card) => {
        if (card.suit == "coins") {
          return;
        }
        check = false;
      })

      return check
    }
  }

  function additionalShopDraw(deck) {
    player.isAllowedToDraw = false;

    if (deck.length <= 0) {
      gameMessage("La pioche est vide.");
      // TODO : manage situation
      btn1.activate("Continuer", () => { deployShop() })
      return;
    }

    const cardDrawn = structuredClone(deck.shift())
    updateDeckVisual()
    addCardToDisplayZone(cardDrawn)

    if (cardDrawn.suit == "coins") {
      gameMessage(`${cardDrawn.description}.
                Tirez à nouveau une carte.`);
      player.isAllowedToDraw = true;
      return;
    }

    cardsDrawn.push(cardDrawn);
    gameMessage(`${cardDrawn.description}.
            C'est bon. Appuyez sur continuer pour voir l'objet, ou les objets, disponible(s).`);

    btn1.activate("Continuer", () => {
      deployShop();
    });
  }

  function deployShop() {
    shop = new Shop(player);

    btn1.activate(
      "Partir",
      () => {
        player.isAllowedToSellItems = false;
        stepCompleted();
        clearCardsDisplayZone();
        zoneShopButtons.innerHTML = ``;
        nextAdventure(`${leaveMessage}`);
      }
    );

    cardsDrawn.forEach((card) => {
      switch (card.suit) {
        case "coins":
          return;
        case "swords":
          shop.add(
            new EquippableItem(
              structuredClone(swordsItemsTable[card.value - 1])
            )
          );
          break;
        case "clubs":
          shop.add(getClubsItem(card.value, clubsItemsTable));
          break;
        case "cups":
          shop.add(getCupsItem(card.value, cupsItemsTable));
          break;

        default:
          console.error("Card suit unknown");
          break;
      }
    });

    additionalItemsAvailable.forEach(item => {
      shop.add(item)
    });

    shop.updateDisplay();
    player.isAllowedToSellItems = true;
  }
}

function visitInn(price) {
  if (player.goldCoins < price) return;

  player.goldCoins -= price;

  rest(
    "Vous entrez dans l'auberge et commandez une chambre et un bon repas chaud. Vous passez une nuit paisible, le ventre plein.",
    "Au petit matin, vous rassemblez vos affaires et dégustez un délicieux déjeuner préparé par l'aubergiste avant de quitter le village et repartir sur les traces du Mal.",
    "Quitter l'auberge"
  );
}

function rest(introMessage, outroMessage, continueButtonText) {
  hideAllButtons(genericButtons);

  let message = `${introMessage}`

  btn1.activate("Améliorer les Points de Vie (PV)", () => {
    player.levelUpHitPoints();
    checkButtonsValidity();
  });
  btn2.activate("Améliorer la Force (FO)", () => {
    player.levelUpStrength();
    checkButtonsValidity();
  });
  btn3.activate("Améliorer la Vitesse (VI)", () => {
    player.levelUpSpeed();
    checkButtonsValidity();
  });
  btn4.activate("Améliorer la Magie (MA)", () => {
    player.levelUpMagic();
    checkButtonsValidity();
  });
  btn5.activate("Échanger 1XP pour 1PA", () => {
    player.buyActionPoint();
    checkButtonsValidity();
  });
  btn6.activate(continueButtonText, () => {
    player.isAllowedToLevelUp = false;
    stepCompleted();
    nextAdventure(outroMessage);
  });

  // Putrid Lake special rule
  if (currentEnvironment.name == "Étangs Putrides") {
    // Vision Lantern special rule
    if (player.inventory.containsItemWithName("Lanterne de Vision")) {
      player.actionPoints += 2

      message += `
      
      - Vous gagnez 2PA.`
    }
    else {
      player.actionPoints += 1;

      message += `
      
      - Vous gagnez 1PA.`
    }
  }
  else {
    player.actionPoints += 2

    message += `
      
    - Vous gagnez 2PA.`
  }

  checkButtonsValidity();
  player.isAllowedToLevelUp = true;

  gameMessage(`${message}
      - Vous pouvez dépenser vos points d'expérience(XP) pour améliorer vos caractéristiques de manière permanente (1XP = 5 points de caractéristique).
      - Vous pouvez également utiliser vos points d'expérience(XP) pour acquérir d'avantage de points d'action(PA) (1XP = 1PA).`)

  function checkButtonsValidity() {
    if (player.experiencePoints <= 0) {
      btn1.isDisabled = true;
      btn2.isDisabled = true;
      btn3.isDisabled = true;
      btn4.isDisabled = true;
      btn5.isDisabled = true;
    }
  }
}

function specialEncounter() {
  hideAllButtons(genericButtons);
  player.isAllowedToUseLuckyClover = false;
  const specialEncounters = [event01, event02, event03, event04];
  specialEncounters[getRandomInt(specialEncounters.length)]();

  // Sick Child Traveler
  function event01() {
    gameMessage(`Vous rencontrez un voyageur dont l'enfant est gravement malade. Il vous supplie de l'aider.
        
      --- Si vous avez une potion ou un ether, vous pouvez lui donner.
      --- Si vous avez 200PO vous pouvez lui donner pour qu'il achète un remède.
      --- Vous pouvez vous battre contre le voyageur.
      --- Vous pouvez ne rien faire et passer votre chemin.
        
      - Que choisissez-vous de faire ?`);

    btn1.activate("Donner une potion", () => { givePotion(); });
    btn2.activate("Donner un ether", () => { giveEther(); });
    btn3.activate("Donner 200PO", () => { giveGold(); });
    btn4.activate("Se battre", () => { fightTraveler(); });
    btn5.activate("Passer mon chemin", () => { leave(); });
    if (!player.inventory.containsItemWithName("Potion")) btn1.isDisabled = true;
    if (!player.inventory.containsItemWithName("Éther")) btn2.isDisabled = true;
    if (player.goldCoins < 200) btn3.isDisabled = true;

    function givePotion() {
      const potion = player.inventory.containsItemWithName("Potion");
      if (!potion) return;

      player.inventory.remove(potion);
      player.inventory.add(getCupsItem(3, cupsItemsTable));
      player.experiencePoints++;
      stepCompleted();
      nextAdventure(`Vous donnez une Potion au voyageur.
                    Il vous remercie avec une voix pleine d'émotions et vous offre un objet en retour.
                    
                    Vous recevez le Pendentif de la Lune.
                    Vous recevez également 1XP.`);
    }

    function giveEther() {
      const ether = player.inventory.containsItemWithName("Éther");
      if (!ether) return;

      player.inventory.remove(ether);
      player.inventory.add(getCupsItem(3, cupsItemsTable));
      player.experiencePoints++;
      stepCompleted();
      nextAdventure(`Vous donnez un Éther au voyageur.
                    Il vous remercie avec une voix pleine d'émotions et vous offre un objet en retour.
                                
                    Vous recevez le Pendentif de la Lune.
                    Vous recevez également 1XP.`);
    }

    function giveGold() {
      if (player.goldCoins < 200) return;

      player.goldCoins -= 200;
      player.inventory.add(new EquippableItem(swordsItemsTable[0]));
      player.experiencePoints++;
      stepCompleted();
      nextAdventure(`Vous donnez 200PO au voyageur.
                Il vous remercie chaleureusement et vous offre un objet en retour.
                
                Vous recevez une Dague.
                Vous recevez également 1XP.`);
    }

    function fightTraveler() {
      // Humain male costaud
      const traveler = generateIntelligentBeing(1, [getStrongTrait(strongTraitsTable, 6)]);
      traveler.gender = "M";

      let introMessage = `Vous faites comprendre au voyageur vos intentions hostiles. Ce dernier vous regarde avec stupeur en se redressant, prêt à défendre sa peau.`;

      const travelerPreparationPhase = (ctx) => {
        hideAllButtons(genericButtons);
        let message = ``;
        const roll = d20.roll();

        // Teleports away
        if (roll >= 11) {
          stepCompleted();
          isInCombat = false;

          displayState(
            true,
            `-~ Combat contre : ${ctx.opponent.name} ~-
                        -- Phase de préparation : adversaire --`
          );

          message += `Le voyageur lance le sort 'Téléportation' et disparaît avec sa fille, vous laissant ${player.gender == "F" ? "seule" : "seul"} au milieu du chemin.
                        
                        Le combat est terminé.`;

          if (player.hitPoints < player.maxHitPoints) {
            player.restoreHitPoints();
            message += ` Vous vous soignez et continuez votre route.`
            return;
          }
          else {
            message += ` Vous continuez votre route.`
          }

          gameMessage(message);
          btn1.activate("Continuer", () => { nextAdventure(); });
          return;
        }

        // Traveler does nothing
        regularOpponentPreparationPhase(ctx);
      };

      const travelerRewardPhase = () => {
        player.isAllowedToUseLuckyClover = false;
        stepCompleted();
        displayState(false);
        player.experiencePoints++;
        player.resetSpellEffects();
        isInCombat = false;
        currentCombatContext = undefined;

        let message = `Le voyageur est vaincu.
                Vous recevez 1XP`;

        if (player.hitPoints < player.maxHitPoints) {
          player.restoreHitPoints();
          nextAdventure(`${message}.
                    Vous vous soignez et continuez votre route en laissant seule la fille malade du voyageur auprès de ce dernier.`);
          return;
        }
        nextAdventure(
          `${message} et continuez votre route en laissant seule la fille malade du voyageur auprès de ce dernier.`
        );
      };

      const contextData = {
        opponent: traveler,
        introMessage: introMessage,
        opponentPreparationPhaseCallBack: travelerPreparationPhase,
        rewardPhaseCallBack: travelerRewardPhase,
      };

      fight(contextData);
    }

    function leave() {
      player.experiencePoints++;
      stepCompleted();
      nextAdventure(`Vous partagez votre sympathie au voyageur mais lui dites que vous ne pouvez pas l'aider.
                Vous gagnez 1XP et continuez votre route.`);
    }
  }

  // Cursed Mirror
  function event02() {
    gameMessage(`Vous découvrez un miroir magique posé sur le sol. Il vous appelle par votre nom : "${player.name}... ${player.name}...". Vous vous approchez et découvrez un démon emprisonné à l'intérieur du miroir. Il vous demande de l'aider à le libérer.
        
      --- Si vous avez 60+ MA vous pouvez le libérer.
      --- Vous pouvez décider de briser le miroir.
      --- Vous pouvez décider d'ignorer le démon et de passer votre chemin.
        
      - Que choisissez-vous de faire ?`);

    btn1.activate("Libérer le démon", () => { freeDemon(); });
    btn2.activate("Briser le miroir", () => { breakMirror(); });
    btn3.activate("Passer mon chemin", () => { leave(); });
    if (player.magic < 60) btn1.isDisabled = true;

    // Generate the demon
    const traits = [];
    traits.push(getStrongTrait(strongTraitsTable, 4));
    const demon = generateIntelligentBeing(12, traits);
    demon.gender = "M";

    function freeDemon() {
      if (player.magic < 60) return;

      hideAllButtons(genericButtons);

      // Player is stronger than the demon or is a demon
      if (player.magic >= 80 || player.hasARaceInCommonWith(demon)) {
        gameMessage(
          `Vous utilisez un simple sort de désenchantement pour libérer le démon enfermé dans le miroir. Ce dernier vol en éclats et une fumée sombre et épaisse s'en répand avant de se matérialiser en une créature cornue à la peau rouge sang. Le démon se dresse devant vous, vous dépassant de plusieurs têtes. Il vous toise du regard pendant un instant avant de s'agenouiller et de s'adresser à vous d'une voix aiguë et sifflante : "Vouuus mm'aveeez libérééé ô ${player.gender == "F" ? "maîîîtresssse" : `maîîître`} ${player.hasARaceInCommonWith(demon) ? player.gender == "F" ? "inffffernale" : "inffffernal" : ""} ! Preneeez ceccci en guise de ma reconnaissssssance éternelle...".
          Le démon tend sa main vers vous et un parchemin y apparaît dans un petit tourbillon de flammes. Vous prenez le parchemin qui vous brûle légèrement les doigts. Le démon disparaît alors dans un craquement ne laissant derrière lui qu'un petit nuage de fumée noire et un son de ricanement satisfait qui résonne dans l'air pendant quelques secondes. 
                    
          Vous recevez le parchemin de sort 'Sphère Infernale'.
          Vous gagnez également 1XP.`
        );

        player.inventory.add(getClubsItem(8, clubsItemsTable));
        player.experiencePoints++;
        stepCompleted()
        btn1.activate("Continuer", () => { nextAdventure(); });

        return;
      }

      // Fight against 'démon rusé'
      const introMessage = `Vous utilisez un simple sort de désenchantement pour libérer le démon enfermé dans le miroir. Ce dernier vol en éclats et une fumée sombre et lourde commence à s'en répandre. Une créature cornue à la peau rouge sang s'extirpe de cette flaque noire sans surface et se dresse devant vous, vous dépassant de plusieurs têtes. Le démon vous fixe intensément de ses yeux perçants aux iris ressemblants à des flammes. D'une voix aiguë et sifflante il vous adresse la parole, révélant une rangée de dents fines et aiguisées : "Heeeheeeheee pauvvvre ${player.gender == "F" ? "petiiite avvventurièèèère stupiiiide" : "petiiit aventuriiier stupiiiide"}... Prépareeez-vous à mourirrr !".`;

      const contextData = {
        opponent: demon,
        introMessage: introMessage,
      };

      fight(contextData);
    }

    function breakMirror() {
      hideAllButtons(genericButtons);

      gameMessage(`Vous donnez un grand coup de talon dans le miroir ce qui le brise en multiple morceaux.
                - Lancez le D20 pour voir ce qu'il se passe.`);

      btn1.activate(
        "Lancer le D20",
        () => {
          saveCloverState();
          mirrorBreakConsequences(d20.roll());
        },
        "d20"
      );

      function mirrorBreakConsequences(roll) {
        hideAllButtons(genericButtons);
        player.isAllowedToUseLuckyClover = true;

        // Result >= 11 -> Nothing happens
        if (roll >= 11) {
          player.experiencePoints++;

          gameMessage(`${roll} !
                        Le visage morcelé du démon se reflétant dans les éclats du miroir se tord de douleur avant de disparaît, sans un bruit.
                        Vous gagnez 1XP et continuez votre route.`);

          btn1.activate("Continuer", () => {
            stepCompleted();
            nextAdventure();
          });

          return;
        }

        // Result < 11 -> Fight against a 'Démon rusé et agressif'
        gameMessage(
          `${roll} !
                    Une fumée sombre et lourde commence à se répandre rapidement des restes du miroir brisé. Une créature cornue à la peau rouge sang s'extirpe de cette flaque noire sans surface et se dresse devant vous, vous dépassant de plusieurs têtes. Le démon vous fixe intensément de ses yeux perçants aux iris ressemblants à des flammes. D'une voix aiguë et sifflante il vous adresse la parole, révélant une rangée de dents fine et aiguisées : "Vouuuus avez esssssayé de m'exxxxiler à jjjamaiiis... Prépareeez-vous à mourirrr !".`
        );

        btn1.activate("Continuer", () => {
          demon.traits.push(getStrongTrait(strongTraitsTable, 13));
          const contextData = {
            opponent: demon,
          };
          fight(contextData);
        });
      }
    }

    function leave() {
      player.experiencePoints++;
      stepCompleted();
      nextAdventure(`Vous méfiant d'une potentielle ruse du démon, vous ignorez ses appels et passez votre chemin.
                Vous gagnez 1XP et continuez votre route.`);
    }
  }

  // Ogre bridge
  function event03() {
    gameMessage(`Vous arrivez à un pont. Malheureusement, ce dernier est gardé par un ogre de fort mauvaise humeur. Il exige 1000PO pour passer.
         
      --- Si vous êtes ${player.gender == "F" ? "une ogresse ou une gnome" : "un ogre ou un gnome"}, il vous laisse passer gratuitement.
      --- Vous pouvez décider de payer 1000PO.
      --- Si vous possédez le sort 'Téléportation', vous pouvez l'utiliser pour outrepasser l'ogre (cela vous coûtera tout de même le coût de lancement habituel(1PA)).
      --- Vous pouvez tenter de forcer le passage.
          
      - Que choisissez-vous de faire ?`);

    // Buttons set up
    btn1.activate("Passer gratuitement", () => { freePassage(); });
    btn2.activate("Payer 1000PO", () => { giveGold(1000) });
    btn3.activate("Lancer le sort 'Téléportation'", () => { teleport() });
    btn4.activate("Forcer le passage", () => { fightOgre() });

    // Generate Ogre
    const traits = []
    traits.push(getWeakTrait(weakTraitsTable, 8))
    const ogre = generateIntelligentBeing(3, traits)
    ogre.gender = "M"
    const gnome = generateIntelligentBeing(5, traits) // just so we can check player's race

    // Disable invalid buttons
    if (!player.hasARaceInCommonWith(ogre) && !player.hasARaceInCommonWith(gnome)) btn1.isDisabled = true;
    if (player.goldCoins < 1000) btn2.isDisabled = true;
    if (!player.inventory.containsItemWithName("Téléportation")) btn3.isDisabled = true;


    function freePassage() {
      if (!player.hasARaceInCommonWith(ogre) && !player.hasARaceInCommonWith(gnome)) return;

      hideAllButtons(genericButtons);

      const outroMessage = `Alors que l'ogre vous fixait intensément du regard, une main tendue dans l'attente de sa taxe de passage, l'autre fermement serrée autour d'une grosse branche de chêne, qui lui sert apparemment d'arme, il éclate soudainement d'un rire gras et hoquetant et s'exclame : "Hua-huahhuahuaaahua mais non ! Évidement que tu peux passer ${player.gender == "F" ? "ma vieille" : "mon vieux"} ! Huahhhhuaahhua !". Il vous donne une grande frappe amicale sur l'épaule tout en continuant de rire et vous fait signe de passer sur le pont. Vous vous exécutez et poursuivez votre chemin. Vous continuez d'entendre le rire de l'ogre, visiblement très satisfait de sa "blague", résonner dans la vallée pendant encore plusieurs centaines de mètres.
      
      Vous gagnez 1XP.`

      player.experiencePoints++;
      stepCompleted()

      nextAdventure(outroMessage);
    }

    function giveGold(amount) {
      if (player.goldCoins < amount) return;

      hideAllButtons(genericButtons);

      let outroMessage = `Vous donnez ${amount}PO ${intelligentBeing.gender == "F" ? "à la racketteuse" : "au racketteur"}, qui vous laisse passer sur le pont. Vous continuez votre route.
      
      Vous gagnez 1XP.`;

      player.goldCoins -= amount;
      player.experiencePoints++;
      stepCompleted();

      nextAdventure(outroMessage);
    }

    function teleport() {
      if (!player.inventory.containsItemWithName("Téléportation")) return;
      if (player.actionPoints < 1) {
        gameMessage(`Vous n'avez pas assez de points d'action(PA) pour lancer ce sort.`)
        return
      }

      hideAllButtons(genericButtons)

      let outroMessage = `Ne laissant aucune opportunité à l'ogre de réagir, vous lancez le sort 'Téléportation'. Vous disparaissez dans un tourbillon d'énergie invisible avant de réapparaître de l'autre côté de la rive sans que l'ogre, abasourdi et désemparé, ne s’aperçoive de quoi que ce soit.
      
      Vous gagnez 1XP.`

      player.actionPoints--
      player.experiencePoints++
      stepCompleted()

      nextAdventure(outroMessage)
    }

    function fightOgre() {
      const introMessage = `Ne prêtant aucune attention à l'ogre, vous faites mine de vouloir le contourner et passer sur le pont sans même lui adresser la parole. Ce dernier pousse un grognement bruyant, agrippe une grosse branche qui était posée à côté de lui, que vous n'aviez pas remarqué jusqu'alors et vous barre le passage.`

      const contextData = {
        opponent: ogre,
        introMessage: introMessage,
      };

      fight(contextData);
    }
  }

  // Three moons
  function event04() {
    gameMessage(`Un mystérieux brouillard se lève. Une lune argentée, une lune dorée et une lune rouge sont visibles dans trois directions différentes.
      
      --- Si vous possédez la 'Lanterne de Vision', vous pouvez l'utiliser pour sortir du brouillard sans avoir à faire de choix.
      --- Vous pouvez suivre la lune argentée.
      --- Vous pouvez suivre la lune dorée.
      --- Vous pouvez suivre la lune rouge.
      
      - Que choisissez-vous de faire ?`)

    btn1.activate("Utiliser la Lanterne de Vision", () => { useLantern() })
    btn2.activate("Suivre la lune argentée", () => { silverMoon() })
    btn3.activate("Suivre la lune dorée", () => { goldenMoon() })
    btn4.activate("Suivre la lune rouge", () => { redMoon() })

    if (!player.inventory.containsItemWithName("Lanterne de Vision")) btn1.isDisabled = true

    function useLantern() {
      hideAllButtons(genericButtons)

      gameMessage(`Vous brandissez la Lanterne de Vision qui éclaire les environs d'une douce lumière dorée et dissipe le brouillard et l'illusion des trois lunes. Votre chemin est à nouveau claire, vous pouvez continuer votre route.
        
        Vous gagnez 1XP.`)

      player.experiencePoints++
      stepCompleted()

      btn1.activate("Continuer", () => { nextAdventure() })
    }

    function silverMoon() {
      hideAllButtons(genericButtons)

      const phantom = generateIntelligentBeing(8, [])
      phantom.gender = "M"
      const skeleton = generateIntelligentBeing(10, [])

      let message = `Vous commencez à marcher résolument en direction de la mystérieuse lune argentée. Plus vous avancez, plus le brouillard semble s'épaissir jusqu'à ce que vous ne parveniez plus à distinguer quoi que ce soit de vos alentours à part une faible lueur blanche dans la direction de la lune argentée. Vous continuez tout de même à avancer avec méfiance. Après quelques mètres, vous distinguez une forme vaporeuse se former sous la lueur argentée. Vous vous en approchez et vous trouvez soudain nez à nez avec un fantôme.`

      // If player is at least part phantom or skeleton -> +10PV & Free passage
      if (player.hasARaceInCommonWith(phantom) || player.hasARaceInCommonWith(skeleton)) {
        gameMessage(`${message} Ce dernier semble vous observer avec beaucoup d'attention pendant plusieurs secondes, puis, s'approche lentement de vous et vous enlace dans une étreinte éthérée avant de disparaître, dissipant avec lui le brouillard mystérieux et ses trois lunes.
          Vous observez vos alentour et réalisez que vous vous trouvez exactement à l'endroit où vous étiez au moment où le brouillard mystérieux était apparu.
          
          Vous gagnez un bonus de +10PV définitif.
          Vous gagnez également 1XP.`)

        player.levelUpStats.hitPoints += 10
        player.restoreHitPoints()
        player.experiencePoints++
        stepCompleted()

        btn1.activate("Continuer", () => { nextAdventure() })

        return
      }

      // Otherwise -> Intelligent being negotiation roll
      gameMessage(`${message}
        
        - Lancez le D20 pour voir ce qu'il se passe.`)

      // Intelligent being negociation roll
      const toll = 50 * (environments.indexOf(currentEnvironment) + 1);

      const contextData = {
        intelligentBeing: phantom,
        pacifistIntroText: `Le brouillard se dissipe et les trois lunes disparaissent. Le fantôme semble vous observer attentivement. Vous remarquez que vous vous trouvez à l'endroit exacte où vous étiez au moment où le brouillard mystérieux s'était levé.
        
        --- Vous pouvez choisir de continuer votre route.
        --- Vous pouvez choisir d'attaquer le fantôme.
        
        - Que choisissez-vous de faire ?`,
        strengthTollFreePassageIntroText: `Le brouillard se dissipe et les trois lunes disparaissent. Le fantôme semble vous observer attentivement d'un regard frustré. Vous remarquez que vous vous trouvez à l'endroit exacte où vous étiez au moment où le brouillard mystérieux s'était levé.
        
        --- Vous pouvez choisir de continuer votre route.
        --- Vous pouvez choisir d'attaquer le fantôme.
        
        - Que choisissez-vous de faire ?`,
        strengthTollRacketPassageIntroText: `Le brouillard se dissipe et les trois lunes disparaissent. Le fantôme se met à parler et d'une voix légère mais menaçante vous demande un dû de ${toll} pièces d'or(PO) sans quoi il vous assure un trépas certain.
        
        --- Vous pouvez choisir de payer les ${toll} pièces d'or(PO).
        --- Vous pouvez choisir d'attaquer le fantôme.
        
        - Que choisissez-vous de faire ?`,
        magicTollFreePassageIntroText: `Le brouillard se dissipe et les trois lunes disparaissent. Le fantôme semble vous observer attentivement d'un regard frustré. Vous remarquez que vous vous trouvez à l'endroit exacte où vous étiez au moment où le brouillard mystérieux s'était levé.
        
        --- Vous pouvez choisir de continuer votre route.
        --- Vous pouvez choisir d'attaquer le fantôme.
        
        - Que choisissez-vous de faire ?`,
        magicTollRacketPassageIntroText: `Le brouillard se dissipe et les trois lunes disparaissent. Le fantôme se met à parler et d'une voix légère mais menaçante vous demande un dû de ${toll} pièces d'or(PO) sans quoi il vous assure un trépas certain.
        
        --- Vous pouvez choisir de payer les ${toll} pièces d'or(PO).
        --- Vous pouvez choisir d'attaquer le fantôme.
        
        - Que choisissez-vous de faire ?`,
        fightIntroText: `Le brouillard se dissipe et les trois lunes disparaissent. Le fantôme vous observe un instant puis soudainement, se rue vers vous en poussant un cri lugubre.`,
        enragedFightIntroText: `Le brouillard se dissipe et les trois lunes disparaissent. Le fantôme se met à crier d'une voix lugubre en vous pointant du doigt. Vous l'avez clairement dérangé et mis en colère. Le fantôme se rue soudainement vers vous. Le combat semble inévitable.
        
        Le fantôme gagne un trait 'fort'.`,
        environmentRerollIntroText: `Le brouillard se dissipe et les trois lunes disparaissent. D'une voix lugubre mais calme, le fantôme récite un poème qui semble décrire les directions à suivre pour déjouer les pièges d'un passage particulièrement ardu du chemin que vous êtes en train de suivre. Vous prenez bonnes notes de ces précieuses informations.
                
        Vous gagnez 1XP et la possibilité d'annuler votre prochain lancé de dé d'environnement et de le relancer.`,
        merchantIntroText: `Le brouillard se dissipe et les trois lunes disparaissent. D'une voix lugubre mais calme, le fantôme vous annonce qu'il possède quelques objets à échanger contre des pièces d'or si vous le désirez.
        
        --- Vous pouvez choisir de faire affaire avec le fantôme.
        --- Vous pouvez choisir d'attaquer le fantôme.
        
        - Que choisissez-vous de faire ?`,
        visitShopIntroText: `Vous faites signe au fantôme de vous montrer ce qu'il a à offrir.`,
        visitShopLeaveText: `Vous remerciez le fantôme et continuez votre route.`,
        visitShopNoCardText: undefined, // There will always be at least 1 item so we don't need this
        visitShopNoCardLeaveText: undefined, // There will always be at least 1 item so we don't need this
        attackMerchantIntroText: `Sans aucune sommation, vous dégainez et brandissez votre arme dans la direction du fantôme.`,
        additionalItemsAvailable: [getCupsItem(11, cupsItemsTable)]
      }

      btn1.activate(
        "Lancer le D20",
        () => {
          saveCloverState()
          checkAttitude(contextData)
        },
        "d20"
      )
    }

    function goldenMoon() {
      hideAllButtons(genericButtons)

      const sphinx = generateMonster(1, [])

      let message = `Vous commencez à marcher résolument en direction de la mystérieuse lune dorée. Plus vous avancez, plus le brouillard semble s'épaissir jusqu'à ce que vous ne parveniez plus à distinguer quoi que ce soit de vos alentours à part une faible lueur chaude provenant de la direction de la lune. Vous continuez tout de même à avancer avec méfiance. Après quelques mètres, le brouillard se dissipe soudainement et vous découvrez avec stupeur une vaste mer de nuages d'un blanc pur, s'étalant à vos pied jusqu'à l'horizon. Droit devant vous, suspendue dans un ciel de nuit étoilé, trône la mystérieuse lune couleur or. Vous contemplez ce spectacle cosmique pendant quelques instants et vous remarquer que la surface de la lune semble légèrement trembler comme si son image était un reflet dans une flaque d'eau. Puis, cette distortion s'accentue de plus en plus jusqu'au moment où la lune disparaît complètement, laissant place à une créature majestueuse : un sphinx !
      Le sphinx atterrit devant vous, à quelques enjambées, ses ailes largement déployées et pousse un rugissement qui vous glace le sang. Son corps de lion s'arche dans une position qui ne veut dire qu'une chose : son attaque est imminente.`

      const contextData = {
        opponent: sphinx,
        introMessage: message,
      }

      fight(contextData)
    }

    function redMoon() {
      hideAllButtons(genericButtons)

      const traits = [getStrongTrait(strongTraitsTable, 19)]
      const werewolf = generateIntelligentBeing(16, traits)
      werewolf.gender = "F"

      let message = `Vous commencez à marcher résolument en direction de la mystérieuse lune rouge. Plus vous avancez, plus le brouillard semble s'épaissir jusqu'à ce que vous ne parveniez plus à distinguer quoi que ce soit de vos alentours à part une faible lueur rougeâtre provenant de la direction de la lune. Vous continuez tout de même à avancer avec méfiance. Après quelques mètres, le brouillard se dissipe soudainement et vous découvrez une clairière brumeuse entourée d'une forêt dense. Vous levez la tête et vous apercevez la lune complètement ronde et rouge, trônant dans un ciel de nuit étoilé complètement dégagé. Vous pouvez distinguer au centre de la clairière la silhouette d'une créature gigantesque recroquevillée sur elle-même. Vous vous approchez avec curiosité et méfiance. Une odeur familière émane de la créature démesurée qui semble dormir. Vous faites un pas de plus en direction de la créature mais vous marchez sur une brindille qui se casse. La créature se réveille et se redresse vivement, révélant dans la lumière pourpre de la lune sa vrai nature : une louve-garou !`

      // If player is werewolf -> free passage + 10MA bonus
      if (player.hasARaceInCommonWith(werewolf)) {
        gameMessage(`${message} Vous lancez un petit grognement apaisant pour signaler vos intentions pacifistes à la bête. Vous vous approchez encore un peu et tendez votre main vers la louve-garou. Cette dernière tend son énorme tête à la rencontre de vos doigts. Son museau touche le votre et une lumière rouge aveuglante vient soudainement interrompre ce moment, vous étourdissant complètement. Vous retrouvez lentement vos sens et réalisez que la louve-garou, la clairière et la lune rouge ont disparus. Vous vous trouvez à l'exacte endroit où vous étiez au moment où le brouillard mystérieux était apparu.
          
          Vous gagnez un bonus de +10MA définitif.
          Vous gagnez également 1XP.`)

        player.levelUpStats.magic += 10
        player.updateMagicVisuals()
        player.experiencePoints++

        btn1.activate("Continuer", () => { nextAdventure() })

        return
      }

      // Otherwise, fight a Gigantic Werewolf
      const contextData = {
        opponent: werewolf,
        introMessage: `${message} La créature bondit et s'apprête à vous attaquer.`,
        rewardPhaseCallBack: redMoonRewardPhase
      }

      // Regular reward phase but with 1 extra PA
      function redMoonRewardPhase(ctx) {
        player.isAllowedToUseLuckyClover = false;
        hideAllButtons(genericButtons);
        displayState(false);
        stepCompleted();
        player.experiencePoints++;
        player.actionPoints++;
        player.resetSpellEffects();

        gameMessage(`${beingNameWithDeterminantDefini(ctx.opponent, false)} est ${ctx.opponent.gender == "F" ? "terrassée" : "terrassé"} ! Vous reprenez votre souffle et regardez autour de vous. Vous réalisez avec étonnement que la clairière, la lune rouge et la louve-garou ont disparus. Vous vous trouvez à l'endroit exacte ou vous étiez au moment où le brouillard mystérieux et ses trois lunes étaient apparus.
          
          ${player.hitPoints < player.maxHitPoints ? "Vous vous soignez et" : "Vous"} gagnez 1 point d'expérience(XP) ainsi que 1 point d'action(PA).
          - Vous pouvez aussi lancer le D20 pour acquérir une récompense potentielle.`);

        player.restoreHitPoints();
        isInCombat = false;

        btn1.activate(
          "Lancer le D20",
          () => {
            saveCloverState();
            fightReward(d20.roll());
          },
          "d20"
        );
      }

      fight(contextData);
    }
  }
}

function luckyEncounter() {
  player.isAllowedToUseLuckyClover = false;
  hideAllButtons(genericButtons);

  const flavorTextVariations = [
    {
      intro: `Le chemin que vous suivez marque un tournant et révèle un vieux temple en ruine. Une végétation particulièrement fleurissante a presque entièrement recouvert ce qui reste de l'édifice. Une doux parfum floral flotte dans l'air.`,
      seekTreasureIntro: `Vous prenez un instant pour faire le tour du vieux temple à la recherche de quelconque objet précieux. Après quelques minutes, votre regard est soudainement attiré par un petit rocher dans un recoin des ruines. Vous tentez de le faire bouger et découvrez un petit coffre à moitié enterré dans un creux sous le rocher.`,
      restIntro: `Vous décidez de vous arrêter un instant pour manger une collation et profiter de cet endroit qui sort de l'ordinaire.`,
      restLeave: `Totalement revigoré, vous rassemblez vos affaires. Il est temps de se remettre en route.`,
      restLeaveButtonText: `Partir`,
    },
  ];

  const flavorRoll = getRandomInt(flavorTextVariations.length);
  player.experiencePoints++;

  gameMessage(`${flavorTextVariations[flavorRoll].intro}
        
        Vous gagnez 1 XP.
        
        Que choisissez-vous de faire ?
        - Fouiller l'endroit en quête de trésor.
        - Se reposer un peu.`);

  btn1.activate("Fouiller", () => {
    seekTreasure();
  });
  btn2.activate("Se reposer", () => {
    rest(
      flavorTextVariations[flavorRoll].restIntro,
      flavorTextVariations[flavorRoll].restLeave,
      flavorTextVariations[flavorRoll].restLeaveButtonText
    );
  });

  function seekTreasure() {
    hideAllButtons(genericButtons);

    gameMessage(`${flavorTextVariations[flavorRoll].seekTreasureIntro}
            
            - Vous pouvez tirer une carte et gagner l'objet correspondant.`);

    imgDeck.onclick = () => {
      saveCloverState();
      drawReward(scopaDeck, false, false);
    };

    player.isAllowedToDraw = true;
    stepCompleted();
  }
}

function checkAttitude(ctx) {
  const roll = d20.roll()
  player.isAllowedToUseLuckyClover = true;

  // Roll 1-3 -> Pacifist
  if (roll <= 3) {
    gameMessage(`${roll} !
                ${ctx.pacifistIntroText}`);

    btn1.activate("Continuer", () => {
      letBeingGo();
    });
    btn2.activate("Attaquer", () => {
      const contextData = {
        opponent: ctx.intelligentBeing,
        introMessage: `Vous poussez agressivement ${beingNameWithDeterminantDefini(ctx.intelligentBeing, true)} et adoptez une position de combat.`
      };
      fight(contextData);
    });
    return;
  }
  // Roll 4-6 -> Strength toll
  if (roll <= 6) {
    // If race in common or as strong as the being - Free passage
    if (
      player.hasARaceInCommonWith(ctx.intelligentBeing) ||
      player.strength >= ctx.intelligentBeing.strength
    ) {
      gameMessage(`${roll} !
                    ${ctx.strengthTollFreePassageIntroText}`);

      btn1.activate("Continuer", () => { letBeingGo(); });
      btn2.activate("Attaquer", () => {
        const contextData = {
          opponent: ctx.intelligentBeing,
          introMessage: `Vous poussez agressivement ${beingNameWithDeterminantDefini(ctx.intelligentBeing, false)} et adoptez une position de combat.`
        };
        fight(contextData);
      });
      return;
    }

    // Otherwise, asks for toll
    const toll = 50 * (environments.indexOf(currentEnvironment) + 1);

    gameMessage(`${roll} !
                ${ctx.strengthTollRacketPassageIntroText}`);

    btn1.activate(`Donner ${toll}PO`, () => { giveGold(toll); });
    if (player.goldCoins < toll) btn1.isDisabled = true;

    btn2.activate(`Attaquer`, () => {
      const contextData = {
        opponent: ctx.intelligentBeing,
        introMessage: `Vous poussez agressivement ${beingNameWithDeterminantDefini(ctx.intelligentBeing, false)} et adoptez une position de combat.`
      };
      fight(contextData);
    });
    return;
  }
  // Roll 7-9 -> Magic toll
  if (roll <= 9) {
    // If race in common or as strong magically as the being - Free passage
    if (
      player.hasARaceInCommonWith(ctx.intelligentBeing) ||
      player.magic >= ctx.intelligentBeing.magic
    ) {
      gameMessage(`${roll} !
                  ${ctx.magicTollFreePassageIntroText}`)

      btn1.activate("Continuer", () => { letBeingGo() });
      btn2.activate("Attaquer", () => {
        const contextData = {
          opponent: ctx.intelligentBeing,
          introMessage: `Vous poussez agressivement ${beingNameWithDeterminantDefini(ctx.intelligentBeing, false)} et adoptez une position de combat.`
        };
        fight(contextData);
      });
      return;
    }

    // Otherwise, asks for toll
    const toll = 50 * (environments.indexOf(currentEnvironment) + 1);

    gameMessage(`${roll} !
                ${ctx.magicTollRacketPassageIntroText}`);

    btn1.activate(`Donner ${toll}PO`, () => { giveGold(toll); });
    btn1.isDisabled = player.goldCoins < toll;

    btn2.activate(`Attaquer`, () => {
      const contextData = {
        opponent: ctx.intelligentBeing,
        introMessage: `Vous poussez agressivement ${beingNameWithDeterminantDefini(ctx.intelligentBeing, false)} et adoptez une position de combat.`
      };
      fight(contextData);
    });
    return;
  }
  // Roll 10-12 -> Fight
  if (roll <= 12) {
    gameMessage(`${roll} !
                ${ctx.fightIntroText}`)

    btn1.activate("Continuer", () => {
      const contextData = {
        opponent: ctx.intelligentBeing,
        introMessage: currentGameMessage()
      };

      fight(contextData);
    });

    return;
  }
  // Roll 13-15 -> Enraged fight
  if (roll <= 15) {
    gameMessage(`${roll} !
                ${ctx.enragedFightIntroText}`)

    btn1.activate("Continuer", () => {
      ctx.intelligentBeing.traits.push(getStrongTrait(strongTraitsTable, d20.roll()));
      ctx.intelligentBeing.restoreHitPoints();

      const contextData = {
        opponent: ctx.intelligentBeing,
        introMessage: currentGameMessage()
      };

      fight(contextData);
    });

    return;
  }
  // Roll 16-18 -> Environment reroll
  if (roll <= 18) {
    player.experiencePoints++;
    environmentRerolls++;

    gameMessage(`${roll}!
                ${ctx.environmentRerollIntroText}`);

    btn1.activate(
      "Continuer",
      () => {
        stepCompleted();
        nextAdventure();
      }
    );

    return;
  }
  // Roll 19-20 -> Merchant
  if (roll <= 20) {
    gameMessage(`${roll}!
                ${ctx.merchantIntroText}`);

    btn1.activate(
      "Voir la marchandise",
      () => {
        visitShop(
          ctx.visitShopIntroText,
          ctx.visitShopLeaveText,
          ctx.visitShopNoCardText,
          ctx.visitShopNoCardLeaveText,
          2,
          ctx.additionalItemsAvailable
        )
      }
    )
    btn2.activate("Attaquer", () => {
      const contextData = {
        opponent: ctx.intelligentBeing,
        introMessage: ctx.attackMerchantIntroText
      };
      fight(contextData);
    });
  }

  function letBeingGo() {
    player.isAllowedToUseLuckyClover = false;
    hideAllButtons(genericButtons);

    gameMessage(`Vous continuez votre route.
            - Vous gagnez 1XP.`)

    player.experiencePoints++;
    stepCompleted();

    btn1.activate("Continuer", () => { nextAdventure() })
  }

  function giveGold(amount) {
    if (player.goldCoins < amount) return;

    player.isAllowedToUseLuckyClover = false;
    hideAllButtons(genericButtons);

    gameMessage(`Vous donnez ${amount}PO ${intelligentBeing.gender == "F" ? "à la racketteuse" : "au racketteur"}, qui vous laisse passer. Vous continuez votre route.
                - Vous gagnez 1XP.`)

    player.goldCoins -= amount;
    player.experiencePoints++;
    stepCompleted();
    btn1.activate("Continuer", nextAdventure())
  }
}
//#endregion

//#region FIGHT
/**
 * Starts a fight sequence against an opponent. 
 * @param {object} ctx The Context data necessary for the fight.
 * @param {Being} ctx.opponent The opponent the player is facing in this fight
 * @param {string} ctx.introMessage Message displayed when the fight is about to start.
 * @param {CallBackFn} ctx.opponentPreparationPhaseCallBack Run when the opponent is preparing for the turn. If none is present a default preparation phase is called instead.
 * @param {CallBackFn} ctx.rewardPhaseCallBack Run when the fight is won. If none is present a default reward phase is called instead.
 */
function fight(ctx) {
  isInCombat = true;
  player.isAllowedToUseLuckyClover = false;
  hideAllButtons(genericButtons);
  ctx.fightTurn = 1;

  // Some variables set in case the speeds or initiative changes during phases so we can make sure that both have their preparation and attack phase.
  ctx.hasPlayerPrepared = false;
  ctx.hasOpponentPrepared = false;
  ctx.hasPlayerAttacked = false;
  ctx.hasOpponentAttacked = false;

  currentCombatContext = ctx;
  player.resetSpellsCastLimits(); // Reset spells that can only be cast once per combat
  applyBottomLessCupsEffects();

  console.log(`Fight:`);
  console.log(ctx);

  gameMessage(fightIntroMessage(ctx));

  btn1.activate("Commencer le combat", () => { initiativePhase(ctx); });
}

function initiativePhase(ctx) {
  console.log("--Initiative Phase--");
  if (playerHasInitiative(ctx.opponent)) {
    console.log("Player has the Initiative.");
    playerPreparationPhase(ctx);
    return;
  }

  console.log("The opponent has the Initiative.");
  if (ctx.opponentPreparationPhaseCallBack) {
    ctx.opponentPreparationPhaseCallBack(ctx);
    return;
  }

  regularOpponentPreparationPhase(ctx);
}

// The player preparation phase should be skipped if they can not cast any spell.
function isPlayerPreparationPhaseSkipped() {
  let skip = true;
  const playerSpells = player.inventory.getItemsOfType("parchemin de sort");

  playerSpells.forEach(spell => {
    if (spell.isAllowedToBeCast === false) return;
    if (player.actionPoints < spell.cost) return;
    if (player.magic < spell.magicNeeded) return;

    // Player could cast the spell if they wanted
    skip = false;
  });

  return skip;
}

function playerPreparationPhase(ctx) {
  console.log("--Player Preparation Phase--");
  player.isAllowedToCastSpell = true

  // Skip if nothing to do
  if (isPlayerPreparationPhaseSkipped()) {
    console.log("Player preparation phase is skipped.");
    endPlayerPreparationPhase()
    return
  }

  hideAllButtons(genericButtons);

  displayState(
    true,
    `-~ Combat contre : ${ctx.opponent.name} ~-
    -- Phase de préparation : ${player.name} --`
  );

  const initiativeNotification = playerHasInitiative(ctx.opponent) ? `Vous avez l'Initiative.` : ``;

  gameMessage(`${initiativeNotification}
    ${playerPreparationPhaseMessage}`);

  btn1.activate("Continuer", () => { endPlayerPreparationPhase(); });


  function endPlayerPreparationPhase() {
    player.isAllowedToCastSpell = false;
    player.isAllowedToUseLuckyClover = false;
    ctx.hasPlayerPrepared = true;
    clearCardsDisplayZone();

    // If the opponent has not yet prepared, it's their turn.
    if (ctx.hasOpponentPrepared === false) {
      if (ctx.opponentPreparationPhaseCallBack) {
        ctx.opponentPreparationPhaseCallBack(ctx);
        return;
      }
      regularOpponentPreparationPhase(ctx);
      return;
    }

    // Otherwise, we start the attack phase.
    attackPhase(ctx);
    return;
  }
}

function regularOpponentPreparationPhase(ctx) {
  // Opponent usually do nothing during their preparation phase. We use custom call backs for opponents who do.
  // Here, we just skip to the next phase
  ctx.hasOpponentPrepared = true;

  // If the player has not prepared yet, it's their turn.
  if (ctx.hasPlayerPrepared === false) {
    playerPreparationPhase(ctx);
    return;
  }

  // Otherwise, we start the attack phase
  attackPhase(ctx);
}

function attackPhase(ctx) {
  if (playerHasInitiative(ctx.opponent)) {
    playerAttackPhase(ctx);
    return;
  }

  opponentAttackPhase(ctx);
}

function playerAttackPhase(ctx) {
  let damage = 0;

  displayState(
    true,
    `-~ Combat contre : ${ctx.opponent.name} ~-
        -- Phase d'attaque : ${player.name} --`
  );

  const initiativeNotification = playerHasInitiative(ctx.opponent) ? `Vous avez l'Initiative.` : `C'est à votre tour d'attaquer.`;

  gameMessage(`${initiativeNotification}
        - Voulez-vous faire une attaque physique ou une attaque magique ?`);

  btn1.activate("Attaque physique", () => { decideIfPowerful(true); }, "attaque-physique");
  btn2.activate("Attaque magique", () => { decideIfPowerful(false); }, "attaque-magique");

  function decideIfPowerful(isPhysical) {
    if (player.actionPoints > 0) {
      gameMessage(
        `- Voulez-vous utiliser un point d'action pour effectuer une attaque puissante ? (Vous recevrez un lancé bonus du D100 qui sera ajouté à vos dégâts.)`
      );

      btn1.activate("Oui", () => {
        powerfulAttack(isPhysical);
      });
      btn2.activate("Non", () => {
        normalAttack(isPhysical);
      });

      return;
    }

    normalAttack(isPhysical);
  }

  function powerfulAttack(isPhysical) {
    player.actionPoints -= 1;

    gameMessage(`Vous utilisez un point d'action pour effectuer une attaque puissante.
            - Lancez une première fois le D100 pour voir combien de dégâts vous allez infliger.`);

    btn2.hide();
    btn1.activate(
      "Lancer le D100",
      () => {
        const firstRoll = d100.roll();
        damage += firstRoll;
        saveCloverState(() => {
          damage -= firstRoll;
        });
        secondRoll(firstRoll);
      },
      "d100"
    );

    function secondRoll(firstRoll) {
      player.isAllowedToUseLuckyClover = true;

      gameMessage(`${firstRoll} ! 
                - Maintenant, lancez votre D100 bonus.`);

      btn1.activate(
        "Lancer le D100",
        () => {
          const secondRoll = d100.roll();
          damage += secondRoll;
          saveCloverState(() => {
            damage -= secondRoll;
          });
          inflictDamage(isPhysical, secondRoll);
        },
        "d100"
      );
    }
  }

  function normalAttack(isPhysical) {
    gameMessage(
      `Très bien, lancez le D100 pour voir combien de dégâts vous allez infliger.`
    );

    btn2.hide();
    btn1.activate(
      "Lancer le D100",
      () => {
        const roll = d100.roll();
        damage += roll;
        saveCloverState(() => {
          damage -= roll;
        });
        inflictDamage(isPhysical, roll);
      },
      "d100"
    );
  }

  function inflictDamage(isPhysical, finalRoll) {
    player.isAllowedToUseLuckyClover = true;
    let message = `${finalRoll} !`;

    // Magical Hit
    if (!isPhysical) {
      damage = clamp(damage + player.magic - ctx.opponent.magic, 0, Infinity);
      ctx.opponent.hitPoints -= damage;
      message += `
            Vous infligez un total de ${damage} ${damage <= 1 ? "dégât magique" : "dégâts magiques"} ${beingNameWithDeterminantDefiniContracte(ctx.opponent, "à")}.`;
    }
    // Physical Hit
    else {
      damage = clamp(damage + player.strength - ctx.opponent.speed, 0, Infinity);
      ctx.opponent.hitPoints -= damage;
      message += `
            Vous infligez un total de ${damage} ${damage <= 1 ? "dégât physique" : "dégâts physiques"} ${beingNameWithDeterminantDefiniContracte(ctx.opponent, "à")}.`;
    }

    gameMessage(message);

    btn1.activate("Continuer", () => { endPlayerAttackPhase() });
  }

  function endPlayerAttackPhase() {
    ctx.hasPlayerAttacked = true;

    // Check if opponent is KO
    if (isBeingDead(ctx.opponent)) {
      rewardPhase(ctx);
      return;
    }

    // If opponent hasn't attacked yet, it's their turn.
    if (ctx.hasOpponentAttacked === false) {
      opponentAttackPhase(ctx);
      return;
    }

    // Otherwise, we start a new turn
    newTurn(ctx);
  }
}

function opponentAttackPhase(ctx) {
  player.isAllowedToUseLuckyClover = false;
  selectAttackType();

  function selectAttackType() {
    // If both stats are equal we choose the version with the most damaging potential
    if (ctx.opponent.strength == ctx.opponent.magic) {
      const potentialPhysicalDamage = ctx.opponent.strength - player.speed;
      const potentialMagicalDamage = ctx.opponent.magic - player.magic;

      // Magical
      if (potentialMagicalDamage > potentialPhysicalDamage) {
        inflictDamage(false);
        return;
      }

      // Physical
      inflictDamage(true);
      return;
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
    let damage = 0;

    displayState(
      true,
      `-~ Combat contre : ${ctx.opponent.name} ~-
            -- Phase d'attaque : adversaire --`
    );

    let message = `C'est au tour ${beingNameWithDeterminantDefiniContracte(ctx.opponent, "de")} d'attaquer.
        
        `;

    // Magical Hit
    if (!isPhysical) {
      const roll = d100.roll();
      console.log(`The monster rolls a ${roll} - Magical`);
      damage = clamp(ctx.opponent.magic + roll - player.magic, 0, Infinity);
      player.hitPoints -= damage;

      message += `${ctx.opponent.gender == "F" ? "Elle" : "Il"} vous inflige ${damage} ${damage <= 1 ? "dégât magique" : "dégâts magiques"}.`;
    }
    // Physical Hit
    else {
      const roll = d100.roll();
      console.log(`The monster rolls a ${roll} - Physical`);
      damage = clamp(ctx.opponent.strength + roll - player.speed, 0, Infinity);
      player.hitPoints -= damage;

      message += `${ctx.opponent.gender == "F" ? "Elle" : "Il"} vous inflige ${damage} ${damage <= 1 ? "dégât physique" : "dégâts physiques"}.`;
    }

    gameMessage(message);
    btn1.activate("Continuer", () => { endOpponentAttackPhase() });
  }

  function endOpponentAttackPhase() {
    ctx.hasOpponentAttacked = true;

    // TODO : add notification and possibility for player to make a clutch save.
    // Check if the hit killed the player.
    if (isBeingDead(player)) {
      defeatPhase(ctx);
      return;
    }

    // If the player has not attacked yet, it's their turn.
    if (ctx.hasPlayerAttacked === false) {
      playerAttackPhase(ctx);
      return;
    }

    // Otherwise, we start a new turn.
    newTurn(ctx);
  }
}

function newTurn(ctx) {
  console.log("New combat turn.");
  player.isAllowedToUseLuckyClover = false;
  ctx.fightTurn++;
  ctx.hasPlayerPrepared = false;
  ctx.hasOpponentPrepared = false;
  ctx.hasPlayerAttacked = false;
  ctx.hasOpponentAttacked = false;

  displayState(
    true,
    `-~ Combat contre : ${ctx.opponent.name} ~-
        -- Nouveau tour --`
  );

  gameMessage(`Vous avez résisté à l'assault ${beingNameWithDeterminantDefiniContracte(ctx.opponent, "de")} mais ${ctx.opponent.gender == "F" ? "cette dernière" : "ce dernier"} est toujours debout et prêt${ctx.opponent.gender == "F" ? "e" : ""} à en découdre.
        
        -- Un nouveau tour de combat commence.`);

  btn1.activate("Commencer", () => { initiativePhase(ctx); });
}

function rewardPhase(ctx) {
  cleanUpEndOfCombat();
  if (ctx.rewardPhaseCallBack) {
    ctx.rewardPhaseCallBack(ctx);
    return;
  }
  regularRewardPhase(ctx);
}

function regularRewardPhase(ctx) {
  hideAllButtons(genericButtons);
  displayState(false);
  stepCompleted();
  player.experiencePoints++;

  gameMessage(`${beingNameWithDeterminantDefini(ctx.opponent, false)} est ${ctx.opponent.gender == "F" ? "terrassée" : "terrassé"} !
        ${player.hitPoints < player.maxHitPoints ? "Vous vous soignez et" : "Vous"} gagnez 1 point d'expérience.
        - Vous pouvez aussi lancer le D20 pour acquérir une récompense potentielle.`);

  player.restoreHitPoints();

  btn1.activate(
    "Lancer le D20",
    () => {
      saveCloverState();
      fightReward(d20.roll());
    },
    "d20"
  );
}

function fightReward(roll) {
  player.isAllowedToUseLuckyClover = true;
  currentCombatContext = undefined;
  hideAllButtons(genericButtons);

  // Roll 1-3
  if (roll >= 1 && roll <= 3) {
    gameMessage(`${roll} !
                Aucune récompense. Déso...`);

    btn1.activate("Continuer", () => {
      nextAdventure();
    });
    return;
  }
  // Roll 4 - 9
  if (roll <= 9) {
    player.actionPoints++;

    gameMessage(`${roll} !
                    Vous gagnez 1 point d'action.`);

    btn1.activate("Continuer", () => {
      nextAdventure();
    });
    return;
  }
  // Roll 10-15
  if (roll <= 15) {
    gameMessage(`${roll} !
                        Vous pouvez tirer une carte du deck mais toutes les cartes comptent comme des cartes 'Pièces'.`);

    player.isAllowedToDraw = true;

    imgDeck.onclick = () => {
      saveCloverState();
      drawReward(scopaDeck, true);
    };
    return;
  }
  // Roll 16-20
  if (roll <= 20) {
    gameMessage(`${roll} !
                        Vous pouvez tirer une carte du deck. Vous gagnez immédiatement l'objet ou l'or correspondant.`);

    player.isAllowedToDraw = true;

    imgDeck.onclick = () => {
      saveCloverState();
      drawReward(scopaDeck, false);
    };
    return;
  }

  // roll is not a number between 1 and 20
  console.error("Unexpected reward roll : ");
  console.error(roll);
}

function defeatPhase(ctx) {
  if (ctx.defeatPhaseCallBack) {
    ctx.defeatPhaseCallBack(ctx);
    return;
  }
  regularDefeatPhase(ctx);
}

function regularDefeatPhase(ctx) {
  player.isAllowedToUseLuckyClover = false;
  hideAllButtons(genericButtons);
  displayState(false);
  gameMessage(`Vous êtes ${player.gender == "F" ? "morte" : "mort"}, votre aventure s'achève ici.
            Merci d'avoir joué ! On espère que vous vous êtes quand même bien ${player.gender == "F" ? "amusée" : "amusé"}.
            Rechargez la page si vous souhaitez recommencer une partie.`);
}

function playerHasInitiative(opponent) {
  // Environment 'Plaines' special rule
  if (currentEnvironment.name == "Plaines") return true;
  if (player.hasForcedInitiative) return true;
  if (player.speed >= opponent.speed) return true;

  return false;
}

/**
 * Applies the effect of each Bottomless Cup owned by the player.
 */
function applyBottomLessCupsEffects() {
  player.inventory.slots.forEach(slot => {
    if (slot?.name === "Coupe Invidable") {
      player.actionPoints++;
    }
  });
}

/**
 * Builds a string that we need to display at the beginning of a fight.
 * @param {fightContext} ctx Context data for the current fight.
 * @returns the intro message we need to display at the beginning of a fight.
 */
function fightIntroMessage(ctx) {
  let message = ``;

  // Display the base message that is passed through from the previous travel step.
  if (ctx.introMessage) {
    message += ctx.introMessage;
  }

  // Display the feedback of the effects of the Bottomless Cups held by the player.
  let bottomlessCups = player.inventory.getItemsWithName("Coupe Invidable");
  if (bottomlessCups.length > 0) {
    message += `
        
        Vous sortez ${bottomlessCups.length == 1 ? "la Coupe Invidable" : `les Coupes Invidables`} de votre sac et en buvez ${bottomlessCups.length == 1 ? "une gorgée" : `une gorgée à chacune`} pour galvaniser vos forces avant ce combat.
        Vous gagnez ${bottomlessCups.length}PA.`;
  }

  // Display the beginning of the fight announcement.
  // if fighting boss, put nothing in front of its name. Otherwise, put 'une' or 'un'
  message += `
    
    ---- Un combat contre ${ctx.opponent.type == "Boss" ? "" : ctx.opponent.gender == "F" ? "une " : "un "}${ctx.opponent.name} commence !`;

  // Display the boss special effects.
  if (ctx.opponent.type == "Boss") {
    message += parseBossEffects(ctx.opponent);
  }

  return message;
}

/**
 * Parses the effects of a boss in a formatted list so we can display them neatly.
 * @param {opponent} boss The boss object we want to parse the effects of. Usually contained in the ctx object of the fight function.
 * @returns a string with all effects of a boss listed. Returns an empty string if we test something else than a boss or if the boss has no special effect.
 */
function parseBossEffects(boss) {
  if (boss?.type != "Boss") return ``;
  let bossEffects = boss?.races[0]?.effects;
  if (!bossEffects) return ``;

  let message = `
        ${bossEffects.length == 1 ? "Effet" : "Effets"} du boss :`;

  bossEffects.forEach(effect => {
    message += `
            • ${effect.description}`;
  });

  return message;
}

function cleanUpEndOfCombat() {
  player.isAllowedToUseLuckyClover = false;
  player.resetSpellEffects();
  isInCombat = false;
  currentCombatContext = undefined;
}
//#endregion

function addCardToDisplayZone(card) {
  if (!card) return;

  const zoneCardsDrawn = document.getElementById("cards-drawn");

  const cardElement = document.createElement("img");
  cardElement.setAttribute("src", card.imageURL);
  cardElement.setAttribute("alt", card.description);
  cardElement.classList.add("card");
  const zoneWidth = zoneCardsDrawn.offsetWidth;
  zoneCardsDrawn.appendChild(cardElement);
  adjustCardsPosition(zoneWidth);

  function adjustCardsPosition() {
    // console.log("Zone width: ");
    // console.log(zoneWidth);
    const cardWidth = imgDeck.offsetWidth;
    const gapWidth = 5;

    const cardsInZone = Array.from(
      document.querySelectorAll("#cards-drawn .card")
    );
    // console.log("Cards in the display zone: ");
    // console.log(cardsInZone);

    // If cards + their gaps are larger than their allowed zone => move them
    if (
      cardWidth * cardsInZone.length + gapWidth * (cardsInZone.length - 1) >
      zoneWidth
    ) {
      // console.log("zone too small");
      const spaceAllowedPerCard = Math.round(
        (zoneWidth - cardWidth) / (cardsInZone.length - 1)
      );
      for (let i = 0; i < cardsInZone.length; i++) {
        cardsInZone[i].style.left = `${i * spaceAllowedPerCard}px`;
        cardsInZone[i].style.top = `0px`;
      }
      return;
    }

    // Normal placement
    for (let i = 0; i < cardsInZone.length; i++) {
      if (i == 0) {
        cardsInZone[i].style.left = `0px`;
        continue;
      }
      cardsInZone[i].style.left = `${i * cardWidth + i * gapWidth}px`;
    }
  }
}

function updateDeckVisual() {
  // Looks weird with 1px per card
  // Looks okay with 12px for 40cards
  const pixelPerCard = 12 / 40;
  imgDeck.style.transform = `translate(-${Math.round(
    scopaDeck.length * pixelPerCard
  )}px, -${Math.round(scopaDeck.length * pixelPerCard)}px)`;
  imgDeck.style.borderRight = `${Math.round(
    scopaDeck.length * pixelPerCard
  )}px solid rgb(127, 127, 112)`;
  imgDeck.style.borderBottom = `${Math.round(
    scopaDeck.length * pixelPerCard
  )}px solid rgb(91, 91, 87)`;

  // Change visuals if deck is empty
  if (scopaDeck.length == 0) {
    imgDeck.setAttribute("src", "game/assets/artworks/empty-deck.png");
    imgDeck.style.boxShadow = "none";
    imgDeck.onclick = () => { };
  }
}

function clearCardsDisplayZone() {
  document.getElementById("cards-drawn").innerHTML = ``;
}


function gameOver() {
  hideAllButtons(genericButtons);
  displayState(false);
  gameMessage(`Vous êtes ${player.gender == "F" ? "morte" : "mort"
    }, votre aventure s'achève ici.
            Merci d'avoir joué ! On espère que vous vous êtes quand même bien ${player.gender == "F" ? "amusée" : "amusé"
    }.
            Rechargez la page si vous souhaitez recommencer une partie.`);
}

function win() {
  hideAllButtons(genericButtons);
  displayState(false);
  gameMessage(`Vous avez gagné ! Quelle aventure ! Bravo !
        Merci d'avoir joué ! On espère que vous vous êtes bien ${player.gender == "F" ? "amusée" : "amusé"
    }.
        Rechargez la page si vous souhaitez recommencer une partie.`);
}
