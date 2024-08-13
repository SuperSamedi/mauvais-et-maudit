const btnInventoryCheckMarks = Array.from(document.getElementsByClassName("equipped-check-mark"));
const inventorySlots = Array.from(document.getElementsByClassName("item"));

// Item details pop-out view
const detailsViewOverlay = document.getElementById("item-details-view-background");
const detailsView = document.getElementById("item-details-view");
const detailsViewName = document.getElementById("item-details-view__name");
const detailsViewItemType = document.getElementById("item-details-view__item-type")
const detailsViewDescription = document.getElementById("item-details-view__description");
const detailsViewSellValue = document.getElementById("item-details-view__sell-value");
const detailsViewBtnEquip = document.getElementById("item-details-view__btn-equip")
const detailsViewBtnSell = document.getElementById("item-details-view__btn-sell");
const detailsViewBtnDrop = document.getElementById("item-details-view__btn-drop");


btnInventoryCheckMarks.forEach((checkMark) => {
    checkMark.addEventListener("click", (e) => {
        const item = player.inventory.slots[e.target.dataset["number"]]
        if (item && item instanceof EquippableItem) {
            if (item.isEquipped) {
                item.unequip()
                return
            }
            item.equip()
        }
    });
});

// Click on items in slots for details overlay view
inventorySlots.forEach((slot) => {
    slot.addEventListener("click", (e) => {
        const item = player.inventory.slots[e.target.dataset["number"]]
        if (item) {
            // console.log("allowedToSellItems = " + allowedToSellItems);
            detailsViewName.innerText = `${item.name}`
            detailsViewName.classList.remove('legendary')
            detailsViewName.classList.add('normal')
            if (item.isLegendary) {
                detailsViewName.classList.remove('normal')
                detailsViewName.classList.add('legendary')
            }
            detailsViewItemType.innerText = `${item.type}${item.isLegendary ? ` légendaire` : ``}`
            generateDetailsDescription(item)
            // detailsViewDescription.innerText = `${item.description}`
            detailsViewSellValue.innerText = `Valeur : ${item.sellValue}PO`
            // Equip button set up
            detailsViewBtnEquip.style.display = "none"
            detailsViewBtnEquip.disabled = true
            detailsViewBtnEquip.onclick = () => { }
            if (item instanceof EquippableItem) {
                detailsViewBtnEquip.style.display = "block"
                detailsViewBtnEquip.disabled = false
                detailsViewBtnEquip.innerText = `${item.isEquipped ? `Déséquiper` : `Équiper`}`
                detailsViewBtnEquip.onclick = () => {
                    if (item.isEquipped) {
                        item.unequip()
                        detailsViewOverlay.style.display = "none"
                        return
                    }
                    item.equip()
                    detailsViewOverlay.style.display = "none"
                }
            }
            if (player.inventory.isAnotherItemEquipped(item)) detailsViewBtnEquip.disabled = true
            detailsViewBtnSell.onclick = () => {
                item.sell()
                detailsViewOverlay.style.display = "none"
            }
            detailsViewBtnSell.disabled = false
            if (allowedToSellItems == false) {
                detailsViewBtnSell.disabled = true
            }
            detailsViewBtnDrop.onclick = () => {
                if (item.drop()) detailsViewOverlay.style.display = "none"
            }
            detailsViewOverlay.style.display = "block"
        }
    });
});

detailsViewOverlay.onclick = () => { detailsViewOverlay.style.display = "none" }
detailsView.onclick = (event) => { event.stopPropagation(); }

function generateDetailsDescription(item) {
    if (!item) {
        console.error("Trying to generate detailed description for unidentified object.");
    }

    detailsViewDescription.innerHTML = ``

    if (item.effects) {
        item.effects.forEach(effect => {
            const effectElement = document.createElement("p")
            effectElement.innerText = effect.description
            effectElement.classList.add(`${effect.type == "malus" ? "malus" : "bonus"}`)
            detailsViewDescription.appendChild(effectElement)
        });
    }
}


class Inventory {
    constructor() {
        this.slots = [];
    }

    add(item) {
        for (let i = 0; i < 8; i++) {
            if (this.slots[i] == undefined) {
                this.slots[i] = item;

                this.updateVisuals();

                return true;
            }
        }

        return false;
    }

    remove(item) {
        for (let i = 0; i < 8; i++) {
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
        for (let i = 0; i < 8; i++) {
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
        for (let i = 0; i < 8; i++) {
            if (!this.slots[i]) continue;

            if (this.slots[i].name === itemName) {
                return this.slots[i];
            }
        }

        return undefined;
    }

    updateVisuals() {
        inventorySlots.forEach(slot => {
            const index = slot.dataset["number"];

            if (this.slots[index]) {
                slot.innerText = this.slots[index].name;
                return;
            }

            slot.innerText = '';
        })

        btnInventoryCheckMarks.forEach(mark => {
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

        for (let i = 0; i < 8; i++) {
            if (this.slots[i] == undefined) {
                check = false
                break
            }
        }

        return check
    }

    isAnotherItemEquipped(item) {
        if (!item) return
        if (!this.contains(item)) throw new Error("Item tested is not in inventory.")
        if (item.isEquipped) return false

        for (let i = 0; i < 8; i++) {
            if (!this.slots[i]) continue;
            if (!this.slots[i] instanceof EquippableItem) continue
            if (this.slots[i].type != item.type) continue

            if (this.slots[i].isEquipped) {
                return true
            }
        }

        return false
    }
}