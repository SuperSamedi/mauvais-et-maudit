const zoneShopButtons = document.getElementById("shop-buttons");


class Shop {
    #items

    constructor() {
        this.#items = []
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
        zoneShopButtons.innerHTML = ``
        this.#items.forEach(item => {
            const button = document.createElement("button")
            button.innerText = `Acheter : ${item.name}`
            button.classList.add("shop-button")
            if (player.goldCoins < item.buyValue) button.disabled = true
            button.onclick = () => { item.buy() }
            zoneShopButtons.appendChild(button)
        });
    }
}