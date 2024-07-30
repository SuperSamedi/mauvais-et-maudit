class Being {
    #hitPoints;

    constructor(race) {
        this.race = race ? race : { name: "aucune" };
        this.#hitPoints = 0;
    }

    get hitPoints() {
        return this.#hitPoints;
    }

    set hitPoints(value) {
        this.#hitPoints = clamp(value, 0, this.maxHitPoints);
    }

    get maxHitPoints() {
        let stat = 0;

        if (this.race.hitPoints) {
            stat += this.race.hitPoints;
        }

        if (this.traits) {
            this.traits.forEach((trait) => {
                if (trait.hitPoints) {
                    stat += trait.hitPoints;
                }
            });
        }

        return stat;
    }

    get strength() {
        let stat = 0;

        if (this.race.strength) {
            stat += this.race.strength;
        }

        if (this.traits) {
            this.traits.forEach((trait) => {
                if (trait.strength) {
                    stat += trait.strength;
                }
            });
        }

        return stat;
    }

    get speed() {
        let stat = 0;

        if (this.race.speed) {
            stat += this.race.speed;
        }

        if (this.traits) {
            this.traits.forEach((trait) => {
                if (trait.speed) {
                    stat += trait.speed;
                }
            });
        }

        return stat;
    }

    get magic() {
        let stat = 0;

        if (this.race.magic) {
            stat += this.race.magic;
        }

        if (this.traits) {
            this.traits.forEach((trait) => {
                if (trait.magic) {
                    stat += trait.magic;
                }
            });
        }

        return stat;
    }

    restoreHitPoints() {
        this.hitPoints = this.maxHitPoints;
    }

}
