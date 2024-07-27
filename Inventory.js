const inventorySlots = Array.from(document.getElementsByClassName("item"));

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
        if (this.slots.indexOf(item) >= 0) {
            this.slots.splice(this.slots.indexOf(item), 1);
        }

        this.updateVisuals();
    }

    updateVisuals() {
        inventorySlots.forEach(slot => {
            const index = slot.dataset["number"];

            if (this.slots[index] != undefined) {
                slot.innerText = this.slots[index].name;
                return;
            }

            slot.innerText = '';
        })
    }
}