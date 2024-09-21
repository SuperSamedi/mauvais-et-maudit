import { getRandomInt } from "./utilities.js";

export default class Dice {
    #faces

    constructor(faces) {
        this.#faces = faces;
    }

    get faces() {
        return this.#faces;
    }

    roll() {
        return getRandomInt(this.faces) + 1;
    }

    /**
     * Distributes the result of a roll down to a number of reduced possibilities.
     * Example :
     * You roll a D20 and you want to select an item in a list of 4 possibilities.
     * a roll of 01-05 will give you 1,
     * a roll of 06-10 will give you 2,
     * a roll of 11-15 will give you 3,
     * a roll of 16-20 will give you 4.
     * @param {integer} roll (should be an integer between 1 and the number of faces on the dice)
     * @param {integer} reducedPossibilities (should be an integer between 1 and the number of faces on the dice)
     * @returns a "mapped" integer number from the roll down to an integer between 1 and the reducedPossibilities argument
     */
    reducedRoll(roll, reducedPossibilities) {
        const factor = this.faces / reducedPossibilities
        return Math.ceil(roll / factor)
    }
}