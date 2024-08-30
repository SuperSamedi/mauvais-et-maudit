let cloverState = {}
// To track the last item received as a card reward so we can rollback in case we use the lucky clover after we draw a reward card.
let lastItemReceivedRandomly = undefined


function saveCloverState(onLoadCallBack) {
    // if (!player.inventory.containsItemWithName("Trèfle à 4 Feuilles")) return

    const data = {}
    data.onLoadCallBack = onLoadCallBack

    // Player state
    data.playerHitPoints = player.hitPoints
    data.playerSpellEffects = structuredClone(player.spellEffects)
    data.playerGoldCoins = player.goldCoins
    data.playerActionPoints = player.actionPoints
    data.playerExperiencePoints = player.experiencePoints

    // Game state
    data.isAllowedToDraw = player.isAllowedToDraw
    data.environmentRerolls = environmentRerolls
    data.gameMessage = currentGameMessage()
    if (currentCombatContext) {
        data.opponentSpellEffects = structuredClone(currentCombatContext.opponent.spellEffects)
        data.opponentHitPoints = currentCombatContext.opponent.hitPoints
    }

    // Save each button state
    const genericButtons = [btn1, btn2, btn3, btn4, btn5, btn6]
    data.genericButtonsStates = []

    genericButtons.forEach(button => {
        const buttonState = {
            display: button.display,
            disabled: button.isDisabled,
            text: button.text,
            clickFunction: button.onclick,
            iconCode: button.iconCode
        }
        data.genericButtonsStates.push(buttonState)
    });

    data.deckClickFunction = imgDeck.onclick


    cloverState = data
}

function loadCloverState() {
    const data = cloverState

    player.isAllowedToUseLuckyClover = false

    console.log("Loaded Clover Data :");
    console.log(data);

    // Reset player data to the values saved during the save state
    player.hitPoints = data.playerHitPoints
    player.spellEffects = data.playerSpellEffects
    player.updateStatsVisuals()
    player.goldCoins = data.playerGoldCoins
    player.actionPoints = data.playerActionPoints
    player.experiencePoints = data.playerExperiencePoints

    // Reset Game State
    environmentRerolls = data.environmentRerolls
    player.isAllowedToDraw = data.isAllowedToDraw
    // Remove item we got from the deck (it means we used the clover after drawing a card reward. Otherwise, lastItemReceivedRandomly would be undefined)
    if (lastItemReceivedRandomly) player.inventory.remove(lastItemReceivedRandomly)
    // Reset opponent effect we would have applied and roll back damage we would have dealt
    if (data.opponentSpellEffects) currentCombatContext.opponent.spellEffects = data.opponentSpellEffects
    if (data.opponentHitPoints) currentCombatContext.opponent.hitPoints = data.opponentHitPoints

    // Reset generic buttons states
    const genericButtons = [btn1, btn2, btn3, btn4, btn5, btn6]

    for (let i = 0; i < genericButtons.length; i++) {
        genericButtons[i].display = data.genericButtonsStates[i].display
        genericButtons[i].isDisabled = data.genericButtonsStates[i].disabled
        genericButtons[i].text = data.genericButtonsStates[i].text
        genericButtons[i].onclick = data.genericButtonsStates[i].clickFunction
        genericButtons[i].iconCode = data.genericButtonsStates[i].iconCode
    }

    imgDeck.onclick = data.deckClickFunction

    gameMessage(`Vous utilisez votre Trèfle à 4 Feuilles.

        ${data.gameMessage}`)

    if (data.onLoadCallBack) {
        data.onLoadCallBack()
    }
}


class LuckyClover extends ConsumableItem {
    constructor(data = structuredClone(cupsItemsTable[3])) {
        super(data)
    }

    get isUsable() {
        return player.isAllowedToUseLuckyClover
    }

    use(being = player) {
        if (!this.isUsable) return

        player.inventory.remove(this)
        loadCloverState()
    }
}