const btnInventoryCheckMarks = Array.from(document.getElementsByClassName("equipped-check-mark"));
const inventorySlots = Array.from(document.getElementsByClassName("item"));

// Item details pop-out view
const detailsViewOverlay = document.getElementById("item-details-view-background");
const detailsView = document.getElementById("item-details-view");
const detailsViewName = document.getElementById("item-details-view-name");
const detailsViewDescription = document.getElementById("item-details-view-description");
const detailsViewSellValue = document.getElementById("item-details-view-sell-value");
const detailsViewBtnSell = document.getElementById("item-details-view-btn-sell");
const detailsViewBtnDrop = document.getElementById("item-details-view-btn-drop");


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
            console.log("allowedToSellItems = " + allowedToSellItems);
            detailsViewName.innerText = `${item.name}`
            detailsViewDescription.innerText = `${item.description}`
            detailsViewSellValue.innerText = `Valeur : ${item.sellValue}PO`
            detailsViewBtnSell.onclick = () => {
                item.sell()
                detailsViewOverlay.style.display = "none"
            }
            if (allowedToSellItems == false) {
                detailsViewBtnSell.disabled = true
            } else {
                detailsViewBtnSell.disabled = false
            }
            detailsViewBtnDrop.onclick = () => {
                item.drop()
                detailsViewOverlay.style.display = "none"
            }
            detailsViewOverlay.style.display = "block"
        }
    });
});

detailsViewOverlay.onclick = () => { detailsViewOverlay.style.display = "none" }
detailsView.onclick = (event) => { event.stopPropagation(); }


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

    remove(itemName) {
        if (!this.contains(itemName)) {
            return
        }

        for (let i = 0; i < 8; i++) {
            if (!this.slots[i]) continue;

            if (this.slots[i].name === itemName) {
                this.slots[i] = undefined;
                this.updateVisuals();
            }
        }
    }

    /**
     * Checks if an item is in the inventory based on its name.
     * @param itemName String - The name of the item we are checking for.
     * @returns true if the item is in the inventory, false if it is not.
     */
    contains(itemName) {
        for (let i = 0; i < 8; i++) {
            if (!this.slots[i]) continue;

            if (this.slots[i].name === itemName) {
                return true;
            }
        }

        return false;
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
}