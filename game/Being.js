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
        if (this.traits.length == 3) {
            // Special case strongissime trait 3x identical traits
            if (this.traits[0].name.accordMasculin == this.traits[1].name.accordMasculin
                && this.traits[0].name.accordMasculin == this.traits[2].name.accordMasculin) {
                // return name += ` ultra ${this.gender == "F" ? this.traits[i].name.accordFeminin.toLowerCase() : this.traits[i].name.accordMasculin.toLowerCase()}`
                return name += ` ${this.gender == "F" ? getStrongissimeVersion(this.traits[0]).name.accordFeminin.toLowercase() : getStrongissimeVersion(this.traits[0]).name.accordMasculin.toLowercase()}`
            }
        }

        // Special case ultra trait 2x identical traits (exemple : Taupe super géante, immense et rusée)
        const allTraitsNames = []
        const duplicateNames = []
        let uniqueNames = []
        const elementTracker = {}

        this.traits.forEach(trait => {
            allTraitsNames.push(this.gender == "F" ? trait.name.accordFeminin : trait.name.accordMasculin)
        });

        // Put all names that have at least 2 iteration in duplicateNames array
        allTraitsNames.forEach(name => {
            if (elementTracker[name]) {
                if (duplicateNames.includes(name)) return

                duplicateNames.push(name)
            }
            else {
                elementTracker[name] = true
            }
        })

        // remove duplicate names from uniqueNames array
        uniqueNames = structuredClone(allTraitsNames)
        allTraitsNames.forEach(name => {
            if (duplicateNames.includes(name)) {
                uniqueNames.splice(uniqueNames.indexOf(name), 1)
            }
        })

        // console.log("all Names :");
        // console.log(allTraitsNames);
        // console.log("duplicates :");
        // console.log(duplicateNames);
        // console.log("uniques :");
        // console.log(uniqueNames);
        // if we have super traits
        if (duplicateNames.length > 0) {
            for (let i = 0; i < duplicateNames.length; i++) {
                // Check if first trait
                if (i == 0) {
                    name += ` `
                }
                // check if it's not the first trait and there are still more
                if (i > 0 && (i + 1 < duplicateNames.length || uniqueNames.length > 0)) {
                    name += `, `
                }
                // check if it's not the first but is the last
                if (i > 0 && i + 1 == duplicateNames.length && uniqueNames.length == 0) {
                    name += ` et `
                }

                name += `super ${duplicateNames[i].toLowerCase()}`
            }
        }
        // if we have unique traits
        if (uniqueNames.length > 0) {
            for (let i = 0; i < uniqueNames.length; i++) {
                // Check if first trait
                if (i == 0 && duplicateNames.length == 0) {
                    name += ` `
                }
                // check if it's not the first trait and there are still more
                if (i > 0 && i + 1 < uniqueNames.length) {
                    name += `, `
                }
                // check if it's not the first but is the last
                if ((i > 0 || duplicateNames.length > 0) && i + 1 == uniqueNames.length) {
                    name += ` et `
                }

                name += `${uniqueNames[i].toLowerCase()}`
            }
        }

        return name


        // TODO loop this with indexOf
        function getStrongissimeVersion(trait) {
            switch (trait.name.accordMasculin) {
                case "Géant":
                    return structuredClone(strongissimeTraitsTable[0])

                case "Puissant":
                    return structuredClone(strongissimeTraitsTable[1])

                case "Agile":
                    return structuredClone(strongissimeTraitsTable[2])

                case "Rusé":
                    return structuredClone(strongissimeTraitsTable[3])

                case "Immense":
                    return structuredClone(strongissimeTraitsTable[4])

                case "Costaud":
                    return structuredClone(strongissimeTraitsTable[5])

                case "Alerte":
                    return structuredClone(strongissimeTraitsTable[6])

                case "Véloce":
                    return structuredClone(strongissimeTraitsTable[7])

                case "Magique":
                    return structuredClone(strongissimeTraitsTable[8])

                case "Maudit":
                    return structuredClone(strongissimeTraitsTable[9])

                case "Rapide":
                    return structuredClone(strongissimeTraitsTable[10])

                case "Enchanté":
                    return structuredClone(strongissimeTraitsTable[11])

                case "Agressif":
                    return structuredClone(strongissimeTraitsTable[12])

                case "Savant":
                    return structuredClone(strongissimeTraitsTable[13])

                case "Svelte":
                    return structuredClone(strongissimeTraitsTable[14])

                case "Dément":
                    return structuredClone(strongissimeTraitsTable[15])

                case "Bestial":
                    return structuredClone(strongissimeTraitsTable[16])

                case "Massif":
                    return structuredClone(strongissimeTraitsTable[17])

                case "Gigantesque":
                    return structuredClone(strongissimeTraitsTable[18])

                case "Mutant":
                    return structuredClone(strongissimeTraitsTable[19])

                default:
                    break;
            }
        }
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
