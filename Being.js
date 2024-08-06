class Being {
    #hitPoints;

    constructor(type, race, gender, traits) {
        this.race = race ? race : { name: "aucune" };
        this.traits = traits ? traits : []
        this.gender = gender ? gender : race.gender
        this.#hitPoints = 0;
        this.type = type
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

        // Environment modifiers
        if (this.type == "Monster") stat += currentEnvironment.statsModifiers.monsters.hitPoints ? currentEnvironment.statsModifiers.monsters.hitPoints : 0;
        if (this.type == "Intelligent Being") stat += currentEnvironment.statsModifiers.intelligentBeings.hitPoints ? currentEnvironment.statsModifiers.intelligentBeings.hitPoints : 0;

        return stat;
    }

    get strength() {
        let stat = 0;

        // Race stat
        if (this.race.strength) {
            stat += this.race.strength;
        }

        // Traits stats
        if (this.traits) {
            this.traits.forEach((trait) => {
                if (trait.strength) {
                    stat += trait.strength;
                }
            });
        }

        // Environment modifiers
        if (this.type == "Monster") stat += currentEnvironment.statsModifiers.monsters.strength ? currentEnvironment.statsModifiers.monsters.strength : 0;
        if (this.type == "Intelligent Being") stat += currentEnvironment.statsModifiers.intelligentBeings.strength ? currentEnvironment.statsModifiers.intelligentBeings.strength : 0;

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

        // Environment modifiers
        if (this.type == "Monster") stat += currentEnvironment.statsModifiers.monsters.speed ? currentEnvironment.statsModifiers.monsters.speed : 0;
        if (this.type == "Intelligent Being") stat += currentEnvironment.statsModifiers.intelligentBeings.speed ? currentEnvironment.statsModifiers.intelligentBeings.speed : 0;

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

        // Environment modifiers
        if (this.type == "Monster") stat += currentEnvironment.statsModifiers.monsters.magic ? currentEnvironment.statsModifiers.monsters.magic : 0;
        if (this.type == "Intelligent Being") stat += currentEnvironment.statsModifiers.intelligentBeings.magic ? currentEnvironment.statsModifiers.intelligentBeings.magic : 0;

        return stat;
    }

    restoreHitPoints() {
        this.hitPoints = this.maxHitPoints;
    }

    addWeakTrait(roll) {
        this.traits.push(getWeakTrait(roll))
    }

}
