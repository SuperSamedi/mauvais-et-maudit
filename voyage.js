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


let environments = [
    {
        name: "Plaines",
        description: "Le joueur a toujours l'initiative pendant les combats.",
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
        description: "",
        monstersLevel: 1,
        steps: [
            { isCompleted: false },
            { isCompleted: false },
            { isCompleted: false }
        ]
    },
    {
        name: "",
        description: "",
        monstersLevel: 2,
        steps: [
            { isCompleted: false },
            { isCompleted: false },
            { isCompleted: false },
            { isCompleted: false }
        ]
    },
    {
        name: "",
        description: "",
        monstersLevel: 3,
        steps: [
            { isCompleted: false },
            { isCompleted: false },
            { isCompleted: false }
        ]
    },
    {
        name: "",
        description: "",
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
        description: "",
        monstersLevel: 4,
        steps: [
            { isCompleted: false },
            { isCompleted: false },
            { isCompleted: false }
        ]
    },
]

let currentEnvironment = environments[0];
let currentStep = currentEnvironment.steps[0];


updateAllEnvironmentVisuals()
// stepCompleted()

/**
 * Sets the currentStep as completed.
 * And sets the currentStep to the next one in line.
 * Switching to the next environment if it was the last step. */
function stepCompleted() {
    currentStep.isCompleted = true;

    // Check if it was the last step of the environment
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
        description.innerText = environments[description.dataset["number"]].description
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
function isLastStep(step, environment) {
    return environment.steps.indexOf(step) == environment.steps.length - 1 ? true : false
}