const txtEnvironmentNames = Array.from(document.getElementsByClassName("environment-name"))
const txtEnvironmentDescriptions = Array.from(document.getElementsByClassName("environment-description"))

const environment0 = document.querySelector("#environment0")
const environment0Elements = environment0.querySelectorAll("div.steps div.step")
const environment1 = document.querySelector("#environment1")
const environment1Elements = environment1.querySelectorAll("div.steps div.step")
const environment2 = document.querySelector("#environment2")
const environment2Elements = environment2.querySelectorAll("div.steps div.step")
const environment3 = document.querySelector("#environment3")
const environment3Elements = environment3.querySelectorAll("div.steps div.step")
const environment4 = document.querySelector("#environment4")
const environment4Elements = environment4.querySelectorAll("div.steps div.step")
const environment5 = document.querySelector("#environment5")
const environment5Elements = environment5.querySelectorAll("div.steps div.step")

const btnOpenScreenVoyage = document.getElementById("btn-open-screen-voyage")

const screenVoyageBackground = document.getElementById("voyage-background")
const screenVoyageContainer = document.getElementById("voyage-container")
const screenVoyage = document.getElementById("voyage")

screenVoyageBackground.onclick = () => { closeVoyage() }
screenVoyageContainer.onclick = () => { closeVoyage() }
screenVoyage.onclick = (event) => { event.stopPropagation(); }
btnOpenScreenVoyage.onclick = () => {
    if (screenVoyageContainer.style.display == "none") {
        // OPEN
        closeCharacterSheet()
        openVoyage()
        return
    }
    closeVoyage()
}

let environments = [
    {
        name: "Plaines",
        effects: [
            {
                description: "Monstres faciles"
            },
            {
                description: "Le·La joueur·euse a toujours l'initiative pendant les combats."
            }
        ],
        monstersLevel: 1,
        steps: [
            { isCompleted: false },
            { isCompleted: false },
            { isCompleted: false },
            { isCompleted: false }
        ]
    },
    {
        name: "",
        effects: [
            {
                description: "Monstres faciles"
            }
        ],
        monstersLevel: 1,
        steps: [
            { isCompleted: false },
            { isCompleted: false },
            { isCompleted: false }
        ]
    },
    {
        name: "",
        effects: [
            {
                description: "Monstres normaux"
            },
            {
                description: "La dernière étape de cette zone est un combat contre un monstre super fort."
            }
        ],
        monstersLevel: 2,
        steps: [
            { isCompleted: false },
            { isCompleted: false },
            { isCompleted: false },
            {
                isMiniBoss: true,
                isCompleted: false
            }
        ]
    },
    {
        name: "",
        effects: [
            {
                description: "Monstres forts"
            }
        ],
        monstersLevel: 3,
        steps: [
            { isCompleted: false },
            { isCompleted: false },
            { isCompleted: false }
        ]
    },
    {
        name: "",
        effects: [
            {
                description: "Monstres super forts"
            }
        ],
        monstersLevel: 4,
        steps: [
            { isCompleted: false },
            { isCompleted: false },
            { isCompleted: false },
            { isCompleted: false }
        ]
    },
    {
        name: "",
        effects: [
            {
                description: "Monstres super forts"
            },
            {
                description: "La dernière étape de cette zone est un combat contre un boss."
            }
        ],
        monstersLevel: 4,
        steps: [
            { isCompleted: false },
            { isCompleted: false },
            {
                isFinalBoss: true,
                isCompleted: false
            }
        ]
    },
]

let currentEnvironment = environments[0];
let currentStep = currentEnvironment.steps[0];


updateAllEnvironmentVisuals()
// stepCompleted()
// stepCompleted()
// stepCompleted()
// stepCompleted()
// stepCompleted()
// stepCompleted()
// stepCompleted()
// stepCompleted()
// stepCompleted()
// stepCompleted()
// stepCompleted()
// stepCompleted()
// stepCompleted()
// stepCompleted()
// stepCompleted()
// stepCompleted()
// stepCompleted()
// stepCompleted()
// stepCompleted()

/**
 * Sets the currentStep as completed.
 * And sets the currentStep to the next one in line.
 * Switching to the next environment if it was the last step. */
function stepCompleted() {
    currentStep.isCompleted = true;

    // Check if we just beat the final boss
    if (isFinalStep()) {
        console.log("final step");
        currentStep = undefined
        updateAllEnvironmentVisuals()
        return
    }

    // Check if it was the last step of the environment => go to next environment
    if (isLastStep(currentStep, currentEnvironment)) {
        currentEnvironment = environments[environments.indexOf(currentEnvironment) + 1]
        currentStep = currentEnvironment.steps[0]
        updateAllEnvironmentVisuals()
        return
    }

    currentStep = currentEnvironment.steps[currentEnvironment.steps.indexOf(currentStep) + 1]
    updateAllEnvironmentVisuals()
}

function updateAllEnvironmentVisuals() {
    const currentStepStyle = "2px solid aquamarine"

    txtEnvironmentNames.forEach(name => {
        name.innerText = environments[name.dataset["number"]].name
    });

    txtEnvironmentDescriptions.forEach(description => {
        let text = ""

        for (let i = 0; i < environments[description.dataset["number"]].effects.length; i++) {
            text += `• ${environments[description.dataset["number"]].effects[i].description}`

            // if there are remaining effects
            if (i + 1 < environments[description.dataset["number"]].effects.length) {
                text += `
                `;
            }
        }

        description.innerText = text
    });

    environment0Elements.forEach(element => {
        if (!environments[0].steps[element.dataset["number"]]) return

        if (environments[0].steps[element.dataset["number"]] === currentStep) {
            element.style.border = currentStepStyle
            return
        }

        element.removeAttribute("style")

        if (environments[0].steps[element.dataset["number"]].isCompleted) {
            element.classList.add("completed")
        }
    });

    environment1Elements.forEach(element => {
        if (!environments[1].steps[element.dataset["number"]]) return

        if (environments[1].steps[element.dataset["number"]] === currentStep) {
            element.style.border = currentStepStyle
            return
        }

        element.removeAttribute("style")

        if (environments[1].steps[element.dataset["number"]].isCompleted) {
            element.classList.add("completed")
        }
    });

    environment2Elements.forEach(element => {
        if (!environments[2].steps[element.dataset["number"]]) return

        if (environments[2].steps[element.dataset["number"]] === currentStep) {
            element.style.border = currentStepStyle
            return
        }

        element.removeAttribute("style")

        if (environments[2].steps[element.dataset["number"]].isCompleted) {
            element.classList.add("completed")
        }
    });

    environment3Elements.forEach(element => {
        if (!environments[3].steps[element.dataset["number"]]) return

        if (environments[3].steps[element.dataset["number"]] === currentStep) {
            element.style.border = currentStepStyle
            return
        }

        element.removeAttribute("style")

        if (environments[3].steps[element.dataset["number"]].isCompleted) {
            element.classList.add("completed")
        }
    });

    environment4Elements.forEach(element => {
        if (!environments[4].steps[element.dataset["number"]]) return

        if (environments[4].steps[element.dataset["number"]] === currentStep) {
            element.style.border = currentStepStyle
            return
        }

        element.removeAttribute("style")

        if (environments[4].steps[element.dataset["number"]].isCompleted) {
            element.classList.add("completed")
        }
    });

    environment5Elements.forEach(element => {
        if (!environments[5].steps[element.dataset["number"]]) return

        if (environments[5].steps[element.dataset["number"]] === currentStep) {
            element.style.border = currentStepStyle
            return
        }

        element.removeAttribute("style")

        if (environments[5].steps[element.dataset["number"]].isCompleted) {
            element.classList.add("completed")
        }
    });
}

function getMonstersLevel() {
    return currentEnvironment.monstersLevel
}

function isFirstStep(step = currentStep, environment = currentEnvironment) {
    return environment.steps.indexOf(step) == 0 ? true : false
}
/**
 * Checks if the step is the last one of the environment
 * @param {object} step (often used to evaluate the currentStep)
 * @param {object} environment (often used to evaluate the currentEnvironment)
 * @returns true if it is the last step of the environment
 * @returns false if it is not */
function isLastStep(step = currentStep, environment = currentEnvironment) {
    return environment.steps.indexOf(step) == environment.steps.length - 1 ? true : false
}

function isFinalStep() {
    if (environments.indexOf(currentEnvironment) != environments.length - 1) return false
    console.log("is last environment");
    if (currentEnvironment.steps.indexOf(currentStep) != currentEnvironment.steps.length - 1) return false

    return true
}

function openVoyage() {
    screenVoyageContainer.style.display = "block"
    screenVoyageBackground.style.display = "block"
    updateGameDivHeight(screenVoyageContainer)
}

function closeVoyage() {
    screenVoyageContainer.style.display = "none"
    screenVoyageBackground.style.display = "none"
    updateGameDivHeight(undefined)
}