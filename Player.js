const txtPlayerRace = document.getElementById("player-race");
const txtPlayerTrait = document.getElementById("player-trait");

const txtPlayerHitPoints = document.getElementById("player-hit-points");
const txtPlayerStrength = document.getElementById("player-strength");
const txtPlayerSpeed = document.getElementById("player-speed");
const txtPlayerMagic = document.getElementById("player-magic");

const txtPlayerGoldCoins = document.getElementById("gold-pieces");
const txtPlayerActionPoints = document.getElementById("action-points");


class Player extends Being {
    #goldCoins;
    #actionPoints;

    constructor() {
        super();
        this.inventory = new Inventory();
        this.#goldCoins = 0;
        this.#actionPoints = 2;
    }


    get maxHitPoints() {
        let stat = 0;

        if (this.race.hitPoints) {
            stat += this.race.hitPoints;
        }

        if (this.trait.hitPoints) {
            stat += this.trait.hitPoints;
        }

        return stat;
    }

    get strength() {
        let stat = 0;

        if (this.race.strength) {
            stat += this.race.strength;
        }

        if (this.trait.strength) {
            stat += this.trait.strength;
        }

        this.inventory.slots.forEach(item => {
            if (item.equipped == true && item.strength) {
                stat += item.strength;
            }
        });

        return stat;
    }

    get speed() {
        let stat = 0;

        if (this.race.speed) {
            stat += this.race.speed;
        }

        if (this.trait.speed) {
            stat += this.trait.speed;
        }

        this.inventory.slots.forEach(item => {
            if (item.equipped && item.speed) {
                stat += item.speed;
            }
        });

        return stat;
    }

    get magic() {
        let stat = 0;

        if (this.race.magic) {
            stat += this.race.magic;
        }

        if (this.trait.magic) {
            stat += this.trait.magic;
        }

        this.inventory.slots.forEach(item => {
            if (item.equipped && item.magic) {
                stat += item.magic;
            }
        })

        return stat;
    }

    get goldCoins() {
        return this.#goldCoins;
    }

    set goldCoins(value) {
        this.#goldCoins = value;
        this.updateVisuals();
    }

    get actionPoints() {
        return this.#actionPoints;
    }

    set actionPoints(value) {
        this.#actionPoints = value;
        this.updateVisuals();
    }

    restoreHealth() {
        this.hitPoints = this.maxHitPoints;
        this.updateVisuals();
    }

    updateVisuals() {
        //Race et Trait
        txtPlayerRace.innerText = this.race.name;
        txtPlayerTrait.innerText = this.trait.name;

        //Stats
        txtPlayerHitPoints.innerText = `${this.hitPoints}/${this.maxHitPoints}`;
        txtPlayerStrength.innerText = this.strength;
        txtPlayerSpeed.innerText = this.speed;
        txtPlayerMagic.innerText = this.magic;

        //Ressources
        txtPlayerGoldCoins.innerText = this.goldCoins;
        txtPlayerActionPoints.innerText = this.actionPoints;
    }

}