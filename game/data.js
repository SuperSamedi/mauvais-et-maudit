let encountersTable = [];
let intelligentRacesTable = [];
let weakTraitsTable = []
let strongTraitsTable = [];
let strongissimeTraitsTable = [];
let monstersTable = [];
let specialEncountersTable = [1];
let environmentsTable = [];
let bossesTable = [];

let scopaDeck = [];
let coinsItemsTable = [];
let swordsItemsTable = [];
// let clubsItemsTable = [];
let cupsItemsTable = [];


async function loadJSONS() {
    try {
        // Intelligent Races Table
        const responseIntelligentRaces = await fetch("game/resources/data-tables/intelligent-races.json")

        if (responseIntelligentRaces.status !== 200 && !responseIntelligentRaces.ok) {
            throw new Error(`${responseIntelligentRaces.status}: Unable to fetch intelligent-races.json`)
        }

        intelligentRacesTable = await responseIntelligentRaces.json()
        console.log("Intelligent Table LOADED");
        // console.log(intelligentRacesTable);


        // Strong Traits Table
        const responseStrongTraits = await fetch("game/resources/data-tables/strong-traits.json")

        if (responseStrongTraits.status !== 200 && !responseStrongTraits.ok) {
            throw new Error(`${responseStrongTraits.status}: Unable to fetch strong-traits.json`)
        }

        strongTraitsTable = await responseStrongTraits.json()
        console.log("Strong Traits Table LOADED");
        // console.log(strongTraitsTable);


        // Monsters Table
        const responseMonsters = await fetch("game/resources/data-tables/monsters.json")

        if (responseMonsters.status !== 200 && !responseMonsters.ok) {
            throw new Error(`${responseMonsters.status}: Unable to fetch monsters.json`)
        }

        monstersTable = await responseMonsters.json()
        console.log("Monsters Table LOADED");
        // console.log(monstersTable);


        // Scopa Deck
        const responseScopaDeck = await fetch("game/resources/data-tables/scopa-cards.json")

        if (responseScopaDeck.status !== 200 && !responseScopaDeck.ok) {
            throw new Error(`${responseScopaDeck.status}: Unable to fetch scopa-cards.json`)
        }

        scopaDeck = await responseScopaDeck.json()
        shuffle(scopaDeck)
        console.log("Scopa Deck LOADED");
        // console.log(scopaDeck);


        // Coins Item Table
        const responseCoinsItems = await fetch("game/resources/data-tables/coins-items.json")

        if (responseCoinsItems.status !== 200 && !responseCoinsItems.ok) {
            throw new Error(`${responseCoinsItems.status}: Unable to fetch coins-items.json`)
        }

        coinsItemsTable = await responseCoinsItems.json()
        console.log("Coins Items Table LOADED");
        // console.log(coinsItemsTable);


        // Swords Item Table
        const responseSwordsItems = await fetch("game/resources/data-tables/swords-items.json")

        if (responseSwordsItems.status !== 200 && !responseSwordsItems.ok) {
            throw new Error(`${responseSwordsItems.status}: Unable to fetch swords-items.json`)
        }

        swordsItemsTable = await responseSwordsItems.json()
        console.log("Swords Items Table LOADED");
        // console.log(swordsItemsTable);


        // Weak Traits Table
        const responseWeakTraits = await fetch("game/resources/data-tables/weak-traits.json")

        if (responseWeakTraits.status !== 200 && !responseWeakTraits.ok) {
            throw new Error(`${responseWeakTraits.status}: Unable to fetch weak-traits.json`)
        }

        weakTraitsTable = await responseWeakTraits.json()
        console.log("Weak Traits Table LOADED");
        // console.log(weakTraitsTable);


        // Encounters Table
        const responseEncounters = await fetch("game/resources/data-tables/encounters.json")

        if (responseEncounters.status !== 200 && !responseEncounters.ok) {
            throw new Error(`${responseEncounters.status}: Unable to fetch encounters.json`)
        }

        encountersTable = await responseEncounters.json()
        console.log("Encounters Table LOADED");
        // console.log(encountersTable);


        // Cups Items Table
        const responseCupsItems = await fetch("game/resources/data-tables/cups-items.json")

        if (responseCupsItems.status !== 200 && !responseCupsItems.ok) {
            throw new Error(`${responseCupsItems.status}: Unable to fetch cups-items.json`)
        }

        cupsItemsTable = await responseCupsItems.json()
        console.log("Cups Items Table LOADED");
        // console.log(cupsItemsTable);


        // Environments Table
        const responseEnvironments = await fetch("game/resources/data-tables/environments.json")

        if (responseEnvironments.status !== 200 && !responseEnvironments.ok) {
            throw new Error(`${responseEnvironments.status}: Unable to fetch environments.json`)
        }

        environmentsTable = await responseEnvironments.json()
        console.log("Environments Table LOADED");
        // console.log(environmentsTable);


        // Strongissime Traits Table
        const responseStrongissimeTraits = await fetch("game/resources/data-tables/strongissime-traits.json")

        if (responseStrongissimeTraits.status !== 200 && !responseStrongissimeTraits.ok) {
            throw new Error(`${responseStrongissimeTraits.status}: Unable to fetch strongissime-traits.json`)
        }

        strongissimeTraitsTable = await responseStrongissimeTraits.json()
        console.log("Strongissime Traits Table LOADED");
        // console.log(strongissimeTraitsTable);


        // Bosses Table
        const responseBosses = await fetch("game/resources/data-tables/bosses.json")

        if (responseBosses.status !== 200 && !responseBosses.ok) {
            throw new Error(`${responseBosses.status}: Unable to fetch bosses.json`)
        }

        bossesTable = await responseBosses.json()
        console.log("Bosses Table LOADED");
        // console.log(bossesTable);


        start()

    } catch (error) {
        console.error('[request failed]', error.message)
    }
}