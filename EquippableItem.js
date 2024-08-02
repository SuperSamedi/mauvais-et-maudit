class EquippableItem extends Item {
    constructor(data) {
        super(data)
        this.equipped = false
    }


    equip() {
        if (this.equipped == true) {
            this.unequip();
            return false;
        }

        // Only one 'Weapon' can be equipped at the same time
        if (this.type == "weapon") {
            let otherWeaponAlreadyEquipped = false;
            // console.log("Is Weapon !");
            player.inventory.slots.forEach((inventoryItem) => {
                if (inventoryItem.type == "weapon" && inventoryItem.equipped == true) {
                    console.log("Found another weapon already equipped.");
                    otherWeaponAlreadyEquipped = true;
                    return;
                }
            });

            if (otherWeaponAlreadyEquipped == true) return false;
        }

        this.equipped = true
        player.updateStatsVisuals();
        return true
    }

    unequip() {
        this.equipped = false
        player.updateStatsVisuals();
    }
}