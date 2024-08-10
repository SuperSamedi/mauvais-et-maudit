class SwordsItem extends EquippableItem {
    constructor(data) {
        super(data)

        if (data.strength) {
            this.strength = data.strength
        }
        if (data.speed) {
            this.speed = data.speed
        }
        if (data.magic) {
            this.magic = data.magic
        }
    }

}