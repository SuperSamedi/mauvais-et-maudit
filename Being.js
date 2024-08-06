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
        if (this.type == "Monster") {
            if (currentEnvironment.statsModifiers) {
                if (currentEnvironment.statsModifiers.monsters) {
                    if (currentEnvironment.statsModifiers.monsters.hitPoints) {
                        stat += currentEnvironment.statsModifiers.monsters.hitPoints
                    }
                }
            }
        }
        if (this.type == "Intelligent Being") {
            if (currentEnvironment.statsModifiers) {
                if (currentEnvironment.statsModifiers.intelligentBeings) {
                    if (currentEnvironment.statsModifiers.intelligentBeings.hitPoints) {
                        stat += currentEnvironment.statsModifiers.intelligentBeings.hitPoints
                    }
                }
            }
        }

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
        if (this.type == "Monster") {
            if (currentEnvironment.statsModifiers) {
                if (currentEnvironment.statsModifiers.monsters) {
                    if (currentEnvironment.statsModifiers.monsters.strength) {
                        stat += currentEnvironment.statsModifiers.monsters.strength
                    }
                }
            }
        }
        if (this.type == "Intelligent Being") {
            if (currentEnvironment.statsModifiers) {
                if (currentEnvironment.statsModifiers.intelligentBeings) {
                    if (currentEnvironment.statsModifiers.intelligentBeings.strength) {
                        stat += currentEnvironment.statsModifiers.intelligentBeings.strength
                    }
                }
            }
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

        // Environment modifiers
        if (this.type == "Monster") {
            if (currentEnvironment.statsModifiers) {
                if (currentEnvironment.statsModifiers.monsters) {
                    if (currentEnvironment.statsModifiers.monsters.speed) {
                        stat += currentEnvironment.statsModifiers.monsters.speed
                    }
                }
            }
        }
        if (this.type == "Intelligent Being") {
            if (currentEnvironment.statsModifiers) {
                if (currentEnvironment.statsModifiers.intelligentBeings) {
                    if (currentEnvironment.statsModifiers.intelligentBeings.speed) {
                        stat += currentEnvironment.statsModifiers.intelligentBeings.speed
                    }
                }
            }
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

        // Environment modifiers
        if (this.type == "Monster") {
            if (currentEnvironment.statsModifiers) {
                if (currentEnvironment.statsModifiers.monsters) {
                    if (currentEnvironment.statsModifiers.monsters.magic) {
                        stat += currentEnvironment.statsModifiers.monsters.magic
                    }
                }
            }
        }
        if (this.type == "Intelligent Being") {
            if (currentEnvironment.statsModifiers) {
                if (currentEnvironment.statsModifiers.intelligentBeings) {
                    if (currentEnvironment.statsModifiers.intelligentBeings.magic) {
                        stat += currentEnvironment.statsModifiers.intelligentBeings.magic
                    }
                }
            }
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
