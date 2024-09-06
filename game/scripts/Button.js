class Button {
  #buttonElement;
  #iconElement;
  #textElement;

  constructor(buttonElement) {
    this.#buttonElement = buttonElement;
    this.#iconElement = this.#buttonElement?.querySelector(".btn-icon");
    this.#textElement = this.#buttonElement?.querySelector(".btn-text");
  }


  get text() {
    return this.#textElement.innerText
  }
  set text(value) {
    this.#textElement.innerText = value
  }

  get display() {
    return this.#buttonElement.style.display
  }
  set display(value) {
    this.#buttonElement.style.display = value
  }

  get onclick() {
    return this.#buttonElement.onclick
  }
  set onclick(value) {
    this.#buttonElement.onclick = value
  }

  get isDisabled() {
    return this.#buttonElement.disabled
  }
  set isDisabled(value) {
    this.#buttonElement.disabled = value
  }

  get iconCode() {
    return this.#iconElement.alt.replace('icone-', '')
  }
  set iconCode(value) {
    this.#iconElement.setAttribute("alt", `icone-${value}`);

    switch (value) {
      case "d20":
        this.#iconElement.setAttribute("src", "game/assets/icons/d20.png");
        break;

      case "attaque-physique":
        this.#iconElement.setAttribute("src", "game/assets/icons/attak-physik.png");
        break;

      case "attaque-magique":
        this.#iconElement.setAttribute("src", "game/assets/icons/attak-magik.png");
        break;

      case "monstre":
        this.#iconElement.setAttribute("src", "game/assets/icons/monstre.png");
        break;

      case "créature-intelligente":
        this.#iconElement.setAttribute("src", "game/assets/icons/creature-intelligente.png");
        break;

      case "événement":
        this.#iconElement.setAttribute("src", "game/assets/icons/evenement.png");
        break;

      case "repos":
        this.#iconElement.setAttribute("src", "game/assets/icons/repos.png");
        break;

      case "village":
        this.#iconElement.setAttribute("src", "game/assets/icons/village.png");
        break;

      case "d100":
        this.#iconElement.setAttribute("src", "game/assets/icons/d100.png");
        break;

      case "coup-de-chance":
        this.#iconElement.setAttribute("src", "game/assets/icons/coup-de-chance.png");
        break;

      default:
        this.#iconElement.setAttribute("src", "");
        this.#iconElement.setAttribute("alt", "");
        break;
    }
  }

  activate(text, clickFunction, iconCode) {
    // Show the button element
    this.display = "block";
    this.isDisabled = false;

    // Set up Click Event
    this.onclick = clickFunction;

    // Set up Text
    this.text = text;

    // Set up Icon
    this.iconCode = iconCode
  }

  hide() {
    this.#buttonElement.style.display = "none";
    this.#buttonElement.disabled = true;
    this.#buttonElement.onclick = () => { };
  }
}
