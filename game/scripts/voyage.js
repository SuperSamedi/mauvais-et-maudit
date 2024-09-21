import Environment from "./Environment.js";

class Voyage {

    constructor() {
        this.environments = [
            new Environment(
                document.getElementById("environment0"),
                "Plaines",
                [
                    { description: "Monstres faciles." },
                    { description: "Le·La joueur·euse a toujours l'initiative pendant les combats." }
                ],
                [{}, {}, {}, {}],
                1
            ),
            new Environment(
                document.getElementById("environment1"),
                "",
                [
                    { description: "Monstres faciles." }
                ],
                [{}, {}, {}],
                1
            ),
            new Environment(
                document.getElementById("environment2"),
                "",
                [
                    { description: "Monstres normaux." },
                    { description: "La dernière étape de cette zone est un combat contre un monstre super fort." }
                ],
                [{}, {}, {}, { isMiniBoss: true }],
                2
            ),
            new Environment(
                document.getElementById("environment3"),
                "",
                [
                    { description: "Monstres forts." }
                ],
                [{}, {}, {}],
                3
            ),
            new Environment(
                document.getElementById("environment4"),
                "",
                [
                    { description: "Monstres super forts." }
                ],
                [{}, {}, {}, {}],
                4
            ),
            new Environment(
                document.getElementById("environment5"),
                "",
                [
                    { description: "Monstres super forts." },
                    { description: "La dernière étape de cette zone est un combat contre un boss." }
                ],
                [{}, {}, { isFinalBoss: true }],
                4
            ),
        ];
        this.currentEnvironment = this.environments[0];
        this.currentStep = this.currentEnvironment.steps[0];
        this.currentStep.isCurrent = true;
    }


    /**
     * Sets the currentStep as completed.
     * And sets the currentStep to the next one in line.
     * Switching to the next environment if it was the last step. */
    stepCompleted() {
        this.currentStep.isCompleted = true;
        this.currentStep.isCurrent = false;

        // Check if we just beat the final boss
        if (isFinalStep()) {
            console.log("final step");
            this.currentStep = undefined
            return
        }

        // Check if it was the last step of the environment => go to next environment
        if (this.isLastStep) {
            this.currentEnvironment = this.environments[this.environments.indexOf(this.currentEnvironment) + 1]
            this.currentStep = this.currentEnvironment.steps[0]
            this.currentStep.isCurrent = true;
            return
        }

        this.currentStep = this.currentEnvironment.steps[this.currentEnvironment.steps.indexOf(this.currentStep) + 1]
        this.currentStep.isCurrent = true
    }

    get currentMonstersLevel() {
        return this.currentEnvironment.monstersLevel
    }

    get isFirstStep() {
        return this.currentEnvironment.steps.indexOf(this.currentStep) == 0 ? true : false
    }

    /**
    * Checks if the step is the last one of the environment
    * @param {object} step (often used to evaluate the currentStep)
    * @param {object} environment (often used to evaluate the currentEnvironment)
    * @returns true if it is the last step of the environment
    * @returns false if it is not */
    get isLastStep() {
        return this.currentEnvironment.steps.indexOf(this.currentStep) == this.currentEnvironment.steps.length - 1 ? true : false
    }

    get isFinalStep() {
        if (this.environments.indexOf(this.currentEnvironment) != this.environments.length - 1) return false
        if (this.currentEnvironment.steps.indexOf(this.currentStep) != this.currentEnvironment.steps.length - 1) return false

        return true
    }
}

export const voyage = new Voyage();
