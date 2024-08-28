class Button {
  #buttonElement;
  #iconElement;
  #textElement;

  constructor(buttonElement, iconElement, textElement) {
    this.#buttonElement = buttonElement;
    this.#iconElement = iconElement;
    this.#textElement = textElement;
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

// Generic buttons
const btn1Element = document.getElementById("btn1");
const btn2Element = document.getElementById("btn2");
const btn3Element = document.getElementById("btn3");
const btn4Element = document.getElementById("btn4");
const btn5Element = document.getElementById("btn5");
const btn6Element = document.getElementById("btn6");

const btn1 = new Button(
  btn1Element,
  btn1Element.querySelector(".btn-icon"),
  btn1Element.querySelector(".btn-text")
);
const btn2 = new Button(
  btn2Element,
  btn2Element.querySelector(".btn-icon"),
  btn2Element.querySelector(".btn-text")
);
const btn3 = new Button(
  btn3Element,
  btn3Element.querySelector(".btn-icon"),
  btn3Element.querySelector(".btn-text")
);
const btn4 = new Button(
  btn4Element,
  btn4Element.querySelector(".btn-icon"),
  btn4Element.querySelector(".btn-text")
);
const btn5 = new Button(
  btn5Element,
  btn5Element.querySelector(".btn-icon"),
  btn5Element.querySelector(".btn-text")
);
const btn6 = new Button(
  btn6Element,
  btn6Element.querySelector(".btn-icon"),
  btn6Element.querySelector(".btn-text")
);
