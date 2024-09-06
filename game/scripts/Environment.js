class Environment {
    #name
    #element
    #nameElement
    #descriptionElement
    #stepsElement

    constructor(htmlElement = undefined, name = "", fixedEffects = [], stepsData = [], monstersLevel = 1) {
        this.#element = htmlElement;
        this.#nameElement = this.#element.querySelector(".environment-name");
        this.#descriptionElement = this.#element.querySelector(".environment-description");
        this.#stepsElement = this.#element.querySelector(".steps");
        this.name = name;
        this.fixedEffects = fixedEffects;
        this.effects = [];
        this.updateDescriptionVisuals();
        this.stepsData = stepsData;
        this.steps = [];
        this.generateSteps();
        this.monstersLevel = monstersLevel;
    }

    get name() {
        return this.#name;
    }
    set name(value) {
        this.#name = value;
        this.updateNameVisuals();
    }

    addEffect(effect) {
        this.effects.push(effect)
        this.updateDescriptionVisuals()
    }

    clearEffects() {
        this.effects = [];
        this.updateDescriptionVisuals();
    }

    // Visuals updaters
    updateNameVisuals() {
        this.#nameElement.innerText = this.name;
    }

    updateDescriptionVisuals() {
        let text = ``;

        // Fixed effects.
        for (let i = 0; i < this.fixedEffects.length; i++) {
            text += `• ${this.fixedEffects[i].description}`

            // Add a line break if there are remaining effects
            if (i + 1 < this.fixedEffects.length) {
                text += `
                `;
            }
        }

        // Add a line break if we both have fixed effects and random effects.
        if (this.fixedEffects.length > 0 && this.effects.length > 0) {
            text += `
            `;
        }

        // Effects linked to the random environment.
        for (let i = 0; i < this.effects.length; i++) {
            text += `• ${this.effects[i].description}`

            // Add a line break if there are remaining effects
            if (i + 1 < this.effects.length) {
                text += `
                `;
            }
        }

        this.#descriptionElement.innerText = text
    }

    generateSteps() {
        this.#stepsElement.innerHTML = ``;

        for (let i = 0; i < this.stepsData.length; i++) {
            const stepElement = document.createElement("div");
            this.#stepsElement.appendChild(stepElement);
            this.steps.push(
                new Step(
                    stepElement,
                    this.stepsData[i].isMiniBoss ? true : false,
                    this.stepsData[i].isFinalBoss ? true : false
                )
            );

            // If last step to generate -> stop
            if (i + 1 == this.stepsData.length) {
                break;
            }
            // Otherwise, add a line
            const lineElement = document.createElement("div");
            lineElement.className = "line";
            this.#stepsElement.appendChild(lineElement);
        }
    }
}