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
]

let currentEnvironment = environments[0];
let currentStep = currentEnvironment.steps[0];
currentStep.isCurrent = true;


/**
 * Sets the currentStep as completed.
 * And sets the currentStep to the next one in line.
 * Switching to the next environment if it was the last step. */
function stepCompleted() {
    currentStep.isCompleted = true;
    currentStep.isCurrent = false;

    // Check if we just beat the final boss
    if (isFinalStep()) {
        console.log("final step");
        currentStep = undefined
        return
    }

    // Check if it was the last step of the environment => go to next environment
    if (isLastStep(currentStep, currentEnvironment)) {
        currentEnvironment = environments[environments.indexOf(currentEnvironment) + 1]
        currentStep = currentEnvironment.steps[0]
        currentStep.isCurrent = true;
        return
    }

    currentStep = currentEnvironment.steps[currentEnvironment.steps.indexOf(currentStep) + 1]
    currentStep.isCurrent = true
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