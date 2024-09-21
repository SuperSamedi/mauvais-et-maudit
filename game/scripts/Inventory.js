import { capitalize, hideButton } from "./utilities.js";
import { player } from "./Player.js";
// import Item from "./items/Item.js";
import EquippableItem from "./items/EquippableItem.js";
import Spell from "./items/Spell.js";
import ConsumableItem from "./items/ConsumableItem.js";

class Inventory {
    #btnInventoryCheckMarks
    #inventorySlots

    constructor() {
        this.slots = [
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined
        ];
        this.#btnInventoryCheckMarks = Array.from(document.getElementsByClassName("equipped-check-mark"));
        this.#inventorySlots = Array.from(document.getElementsByClassName("item"));

        // Set up Checkmarks buttons
        this.#btnInventoryCheckMarks.forEach((checkMark) => {
            checkMark.addEventListener("click", (e) => {
                const item = this.slots[e.target.dataset["number"]]
                if (item && item instanceof EquippableItem) {
                    if (item.isEquipped) {
                        item.unequip()
                        return
                    }
                    item.equip()
                }
            });
        });

        // Set up Slots buttons for details overlay view
        this.#inventorySlots.forEach((slot) => {
            slot.addEventListener("click", (e) => {
                const item = this.slots[e.target.dataset["number"]];

                if (item === undefined) {
                    return;
                }
                // if (!item instanceof Item) {
                //     return;
                // }

                displayItemName(item);
                displayItemType(item);
                displayItemEffects(item);
                displayItemValue(item);

                // Equippables
                setUpEquipButton(item);

                // Spells
                displaySpellInfo(item);
                setUpCastButton(item);
                setUpAmplifiedCastButton(item);

                // Consumables
                setUpUseButton(item);

                // Button Sell set up
                setUpSellButton(item);

                // Button Drop set up
                setUpDropButton(item);

                // Open Item Details View once everything is set up
                openItemDetailsOverlay();
            });
        });

        // Set up overlay background clicks
        const detailsViewOverlay = document.getElementById("item-details-view-background");
        const detailsView = document.getElementById("item-details-view");
        detailsViewOverlay.onclick = () => { closeItemDetailsOverlay() }
        detailsView.onclick = (event) => { event.stopPropagation(); }
    }

    add(item) {
        // TODO : Manage the situation where inventory is full
        for (let i = 0; i < this.slots.length; i++) {
            if (this.slots[i] == undefined) {
                this.slots[i] = item;

                this.updateVisuals();

                return true;
            }
        }

        return false;
    }

    remove(item) {
        for (let i = 0; i < this.slots.length; i++) {
            if (!this.slots[i]) continue;

            if (this.slots[i] === item) {
                this.slots[i] = undefined;
                this.updateVisuals();
                return true
            }
        }
        return false
    }

    contains(item) {
        for (let i = 0; i < this.slots.length; i++) {
            if (!this.slots[i]) continue;

            if (this.slots[i] === item) {
                return this.slots[i];
            }
        }

        return undefined;
    }

    /**
     * Checks if an item is in the inventory based on its name.
     * @param {string} itemName The name of the item we are checking for.
     * @returns {object} the item if the item is in the inventory, undefined if it is not.
     */
    containsItemWithName(itemName) {
        for (let i = 0; i < this.slots.length; i++) {
            if (!this.slots[i]) continue;

            if (this.slots[i].name === itemName) {
                return this.slots[i];
            }
        }

        return undefined;
    }

    getItemsOfType(type) {
        const items = []
        for (let i = 0; i < this.slots.length; i++) {
            if (!this.slots[i]) continue;

            if (this.slots[i].type === type) {
                items.push(this.slots[i])
            }
        }

        return items
    }

    getItemsWithName(name) {
        const items = [];

        this.slots.forEach(slot => {
            if (slot?.name === name) {
                items.push(slot);
            }
        })

        return items;
    }

    updateVisuals() {
        this.#inventorySlots.forEach(slot => {
            const index = slot.dataset["number"];

            if (this.slots[index]) {
                slot.innerText = this.slots[index].name;
                return;
            }

            slot.innerText = '';
        })

        this.#btnInventoryCheckMarks.forEach(mark => {
            const index = mark.dataset["number"];

            if (this.slots[index] && this.slots[index].isEquipped) {
                mark.innerText = 'X'
                return
            }

            mark.innerText = ''
        })
    }

    isFull() {
        let check = true

        for (let i = 0; i < this.slots.length; i++) {
            if (this.slots[i] == undefined) {
                check = false
                break
            }
        }

        return check
    }

    isAnotherItemEquipped(item) {
        // We need to be checking an actual object
        if (!item) throw new Error("Item tested is undefined.")
        // The item needs to be in our inventory or it would not make sens to check it.
        if (!this.contains(item)) throw new Error("Item tested is not in inventory.")
        // If it's already equipped there is no need to check it can remain equipped.
        if (item.isEquipped) return false

        // If we find an item that is of the same type and is equipped we return TRUE -> An item of the same type already equipped was found
        for (let i = 0; i < this.slots.length; i++) {
            if (!this.slots[i]) continue
            if (this.slots[i].type != item.type) continue
            if (this.slots[i].isEquipped) return true
        }

        // Otherwise, we return FALSE -> No item of the same type that are already equipped were found
        return false
    }
}

function displayItemName(item) {
    const detailsViewName = document.getElementById("item-details-view__name");

    detailsViewName.innerText = `${item.name}`

    detailsViewName.classList.remove('legendary')
    detailsViewName.classList.remove('test-item')
    detailsViewName.classList.add('normal')

    if (item.isLegendary) {
        detailsViewName.classList.remove('normal')
        detailsViewName.classList.add('legendary')
        return;
    }

    if (item.isTestItem) {
        detailsViewName.classList.remove('normal')
        detailsViewName.classList.remove('legendary')
        detailsViewName.classList.add('test-item')
    }
}

function displayItemType(item) {
    const detailsViewItemType = document.getElementById("item-details-view__item-type")
    detailsViewItemType.innerText = `${capitalize(item.type)}${item.isLegendary ? ` légendaire` : ``}`
}

function displayItemEffects(item) {
    const detailsViewDescription = document.getElementById("item-details-view__description__effects");

    if (!item.effects) {
        console.error("Trying to generate detailed description for unidentified list of effects.");
        return;
    }

    detailsViewDescription.innerHTML = ``

    item.effects.forEach(effect => {
        const effectElement = document.createElement("p")
        effectElement.innerText = effect.description
        effectElement.classList.add(`${effect.type == "malus" ? "malus" : "bonus"}`)
        detailsViewDescription.appendChild(effectElement)
    });
}

function displayItemValue(item) {
    const detailsViewSellValue = document.getElementById("item-details-view__sell-value");
    detailsViewSellValue.innerText = `Valeur : ${item.sellValue}PO`
}

function setUpEquipButton(item) {
    const detailsViewBtnEquip = document.getElementById("item-details-view__btn-equip")

    hideButton(detailsViewBtnEquip)

    if (item instanceof EquippableItem) {
        detailsViewBtnEquip.style.display = "block"
        detailsViewBtnEquip.disabled = false
        detailsViewBtnEquip.innerText = `${item.isEquipped ? `Déséquiper` : `Équiper`}`
        detailsViewBtnEquip.onclick = () => {
            if (item.isEquipped) {
                item.unequip()
                closeItemDetailsOverlay();
                return
            }
            item.equip()
            closeItemDetailsOverlay();
        }
    }

    if (player.inventory.isAnotherItemEquipped(item)) {
        detailsViewBtnEquip.disabled = true
    }
}

function displaySpellInfo(item) {
    // Spell base info html elements
    const detailsViewSpellMagicNeededContainer = document.getElementById("item-details-view__magic-needed")
    const detailsViewSpellCostContainer = document.getElementById("item-details-view__spell-cost")
    // Amplified spell info html elements
    const detailsViewAmplifiedSpellInfoContainer = document.getElementById("item-details-view__description__spell-amplify")

    // Hide by default
    detailsViewSpellMagicNeededContainer.style.display = "none"
    detailsViewSpellCostContainer.style.display = "none"
    detailsViewAmplifiedSpellInfoContainer.style.display = "none"

    if (!item instanceof Spell) {
        return;
    }
    // Html elements
    const detailsViewSpellMagicNeeded = document.getElementById("item-details-view__magic-needed__amount")
    const detailsViewSpellCost = document.getElementById("item-details-view__spell-cost__cost")

    // Spell base info
    detailsViewSpellMagicNeededContainer.style.display = "block"
    detailsViewSpellCostContainer.style.display = "block"
    detailsViewSpellMagicNeeded.innerText = item.magicNeeded
    detailsViewSpellCost.innerText = item.cost

    if (!item.amplification) {
        return;
    }
    // Html elements
    const detailsViewSpellAmplifiedMagicNeeded = document.getElementById("item-details-view__description__magicNeeded")
    const detailsViewSpellAmplifiedAdditionalCost = document.getElementById("item-details-view__description__spell-amplify__additional-cost")
    const detailsViewAmplifiedSpellEffectsDescriptionDiv = document.getElementById("item-details-view__description__spell-amplify__effects")
    // Amplified version info
    detailsViewAmplifiedSpellInfoContainer.style.display = "block"
    detailsViewSpellAmplifiedMagicNeeded.innerText = item.amplification.magicNeeded
    detailsViewSpellAmplifiedAdditionalCost.innerText = item.amplification.cost

    // Generate description
    detailsViewAmplifiedSpellEffectsDescriptionDiv.innerHTML = ``
    item.amplification.effects.forEach(effect => {
        const effectElement = document.createElement("p")
        effectElement.innerText = effect.description
        effectElement.classList.add(`${effect.type == "malus" ? "malus" : "bonus"}`)
        detailsViewAmplifiedSpellEffectsDescriptionDiv.appendChild(effectElement)
    });
}

function setUpCastButton(item) {
    const detailsViewBtnCast = document.getElementById("item-details-view__btn-cast")
    hideButton(detailsViewBtnCast)

    if (!item instanceof Spell) {
        return;
    }

    // Display setup
    detailsViewBtnCast.style.display = "block"
    detailsViewBtnCast.disabled = !player.isAllowedToCastSpell
    // For spell that are only castable once per combat
    if (player.isAllowedToCastSpell && item.isAllowedToBeCast !== undefined) {
        detailsViewBtnCast.disabled = !item.isAllowedToBeCast
    }

    // Click setup
    detailsViewBtnCast.onclick = () => {
        closeItemDetailsOverlay()
        closeCharacterSheet()
        item.cast()
    }
}

function setUpAmplifiedCastButton(item) {
    const detailsViewBtnCastAmplified = document.getElementById("item-details-view__btn-cast-amplified");
    hideButton(detailsViewBtnCastAmplified);

    if (!item instanceof Spell) {
        return;
    }
    if (item.amplification) {
        return;
    }

    // Display setup
    detailsViewBtnCastAmplified.style.display = "block";
    detailsViewBtnCastAmplified.disabled = !player.isAllowedToCastSpell;

    // Click setup
    detailsViewBtnCastAmplified.onclick = () => {
        closeItemDetailsOverlay();
        closeCharacterSheet();
        item.castAmplified();
    }
}

function setUpUseButton(item) {
    // Html element
    const detailsViewBtnUse = document.getElementById("item-details-view__btn-use")

    hideButton(detailsViewBtnUse)

    if (!item instanceof ConsumableItem) {
        return;
    }

    detailsViewBtnUse.style.display = "block"
    detailsViewBtnUse.disabled = !item.isUsable
    detailsViewBtnUse.onclick = () => {
        closeItemDetailsOverlay();
        closeCharacterSheet();
        item.use(player);
    }
}

function setUpSellButton(item) {
    const detailsViewBtnSell = document.getElementById("item-details-view__btn-sell");

    detailsViewBtnSell.onclick = () => {
        item.sell();
        closeItemDetailsOverlay();
    };
    detailsViewBtnSell.disabled = false;
    if (player.isAllowedToSellItems == false) {
        detailsViewBtnSell.disabled = true;
    }
}

function setUpDropButton(item) {
    const detailsViewBtnDrop = document.getElementById("item-details-view__btn-drop");
    detailsViewBtnDrop.onclick = () => {
        if (item.drop()) {
            closeItemDetailsOverlay();
        }
    }
}

function openItemDetailsOverlay() {
    const detailsViewOverlay = document.getElementById("item-details-view-background");
    detailsViewOverlay.style.display = "block";
}

function closeItemDetailsOverlay() {
    const detailsViewOverlay = document.getElementById("item-details-view-background");
    detailsViewOverlay.style.display = "none";
}


export const inventory = new Inventory();