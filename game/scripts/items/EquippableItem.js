class EquippableItem extends Item {
    constructor(data) {
        super(data)

        if (data.hitPoints) {
            this.hitPoints = data.hitPoints
        }
        if (data.strength) {
            this.strength = data.strength
        }
        if (data.speed) {
            this.speed = data.speed
        }
        if (data.magic) {
            this.magic = data.magic
        }

        this.isEquipped = false
    }

    equip() {
        if (player.inventory.isAnotherItemEquipped(this)) return false;

        this.isEquipped = true
        // console.log("Item equipped:");
        // console.log(this);
        if (!isInCombat) player.restoreHitPoints()
        player.updateStatsVisuals();
        player.inventory.updateVisuals();
        return true
    }

    unequip() {
        this.isEquipped = false
        if (!isInCombat) player.restoreHitPoints()
        player.updateStatsVisuals();
        player.inventory.updateVisuals();
    }
}