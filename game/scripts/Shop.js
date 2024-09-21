import { gameMessage } from "./utilities.js"

export default class Shop {
    #zoneShopButtons;
    #items;

    constructor(player) {
        this.#items = [];
        this.#zoneShopButtons = document.getElementById("shop-buttons");
        this.player = player;
    }

    add(item) {
        this.#items.push(item)
    }

    remove(item) {
        if (this.#items.indexOf(item) >= 0) {
            this.#items.splice(this.#items.indexOf(item), 1);
        }

        this.updateDisplay();
    }

    updateDisplay() {
        let message = `Objets disponibles : 
            `;

        this.#items.forEach(item => {
            message += `- ${item.name} (${item.description}) - ${item.buyValue}PO
                `;
        })

        message += `
        
        Vous pouvez aussi revendre des objets depuis votre inventaire si vous en avez.`;

        gameMessage(message)

        // Create Buttons
        this.#zoneShopButtons.innerHTML = ``
        this.#items.forEach(item => {
            const button = document.createElement("button")
            button.innerText = `Acheter : ${item.name}`
            button.classList.add("shop-button")
            if (this.player.goldCoins < item.buyValue) button.disabled = true
            button.onclick = () => { item.buy() }
            this.#zoneShopButtons.appendChild(button)
        });
    }
}