class Being {
    #hitPoints;

    constructor(race, gender, traits) {
        this.race = race ? race : { name: "aucune" };
        this.traits = traits ? traits : []
        this.gender = gender ? gender : race.gender
        this.#hitPoints = 0;
    }

    get name() {
        let name = this.race.name.male
        if (this.gender == "F") {
            name = this.race.name.female
        }

        for (let i = 0; i < this.traits.length; i++) {
            // Check if first trait
            if (i == 0) {
                name += ` `
            }
            // check if it's not the first trait and there are still more
            if (i > 0 && i + 1 < this.traits.length) {
                name += `, `
            }
            // check if it's not the first but is the last
            if (i > 0 && i + 1 == this.traits.length) {
                name += ` et `
            }

            name += `${this.gender == "F" ? this.traits[i].name.accordFeminin.toLowerCase() : this.traits[i].name.accordMasculin.toLowerCase()
                } `
        }

        return name
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

    addWeakTrait(roll) {
        this.traits.push(getWeakTrait(roll))
    }

}
