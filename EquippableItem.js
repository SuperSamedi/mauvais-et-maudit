class EquippableItem extends Item {
    constructor(data) {
        super(data)
        this.isEquipped = false
    }


    // Toggle equip-unequip
    equip() {
        if (this.isEquipped == true) {
            this.unequip();
            return false;
        }

        // Only one 'Weapon' can be equipped at the same time
        if (this.type == "arme") {
            let otherWeaponAlreadyEquipped = false;
            // console.log("Is Weapon !");
            player.inventory.slots.forEach((inventoryItem) => {
                if (inventoryItem.type == "arme" && inventoryItem.equipped == true) {
                    console.log("Found another weapon already equipped.");
                    otherWeaponAlreadyEquipped = true;
                    return;
                }
            });

            if (otherWeaponAlreadyEquipped == true) return false;
        }

        // Only one 'Equipment' can be equipped at the same time
        if (this.type == "équipement") {
            let otherEquipmentAlreadyEquipped = false;
            // console.log("Is Equipment !");
            player.inventory.slots.forEach((inventoryItem) => {
                if (inventoryItem.type == "équipement" && inventoryItem.equipped == true) {
                    console.log("Found another equipment already equipped.");
                    otherEquipmentAlreadyEquipped = true;
                    return;
                }
            });

            if (otherEquipmentAlreadyEquipped == true) return false;
        }

        this.isEquipped = true
        player.updateStatsVisuals();
        player.inventory.updateVisuals();
        return true
    }

    unequip() {
        this.isEquipped = false
        player.updateStatsVisuals();
        player.inventory.updateVisuals();
    }
}