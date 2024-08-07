class Being {
    #hitPoints;

    constructor(type, races, gender, traits) {
        this.type = type
        this.races = races ? races : [{ name: { female: "aucune", male: "aucune" } }];
        this.gender = gender ? gender : races[0].gender
        this.traits = traits ? traits : []
        this.#hitPoints = 0;
    }

    get name() {
        let name = ""

        name += this.gender == "F" ? this.races[0].name.female : this.races[0].name.male

        if (this.races.length > 1) {
            name = `Hybride ${name}-${this.gender == "F" ? this.races[1].name.female : this.races[1].name.male}`
        }

        // Add traits
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

            name += `${this.gender == "F" ? this.traits[i].name.accordFeminin.toLowerCase() : this.traits[i].name.accordMasculin.toLowerCase()}`
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

        let racesStat = 0
        this.races.forEach(race => {
            if (race.hitPoints) {
                racesStat += race.hitPoints;
            }
        })
        stat += Math.round(racesStat / this.races.length)

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

        // Races stats
        let racesStat = 0
        this.races.forEach(race => {
            if (race.strength) {
                racesStat += race.strength;
            }
        })
        stat += Math.round(racesStat / this.races.length)

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

        let racesStat = 0
        this.races.forEach(race => {
            if (race.speed) {
                racesStat += race.speed;
            }
        })
        stat += Math.round(racesStat / this.races.length)

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

        let racesStat = 0
        this.races.forEach(race => {
            if (race.magic) {
                racesStat += race.magic;
            }
        })
        stat += Math.round(racesStat / this.races.length)

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
