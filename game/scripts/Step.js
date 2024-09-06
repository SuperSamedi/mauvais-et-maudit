// Generated when a new Environment is instantiated.
class Step {
    #isCompleted
    #isCurrent

    constructor(htmlElement, isMiniBoss = false, isFinalBoss = false) {
        this.element = htmlElement;
        this.isCompleted = false;
        this.isCurrent = false;
        this.isMiniBoss = isMiniBoss;
        this.isFinalBoss = isFinalBoss;
        this.updateVisuals();
    }

    get isCurrent() {
        return this.#isCurrent;
    }
    set isCurrent(value) {
        this.#isCurrent = value;
        this.updateVisuals()
    }

    get isCompleted() {
        return this.#isCompleted;
    }
    set isCompleted(value) {
        this.#isCompleted = value;
        this.updateVisuals()
    }

    updateVisuals() {
        this.element.className = "step";

        if (this.isMiniBoss === true) {
            this.element.classList.add("step-mini-boss-fight");
        }

        if (this.isFinalBoss === true) {
            this.element.classList.add("step-final-boss-fight");
        }

        if (this.isCurrent === true) {
            this.element.classList.add("step-current");
            return;
        }

        if (this.isCompleted === true) {
            this.element.classList.add("step-completed");
            return;
        }

        this.element.classList.add("step-uncompleted")
    }
}