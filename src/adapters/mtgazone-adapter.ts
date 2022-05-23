const mtgaZoneAdapter = {
  getCollectionViewParent: () => document.querySelector(".name-container"),

  parseDeck: () => {
    const cardDivs = document.querySelectorAll(".card");

    const deckItems = Array.from(cardDivs).map((cardDiv) => {
      const countDiv = cardDiv.querySelector("div.quantity") as HTMLDivElement;
      const nameAnchor = cardDiv.querySelector("a");
      const priceDiv = cardDiv.querySelector("div.price") as HTMLDivElement;

      countDiv.style.setProperty("min-width", "initial");
      countDiv.style.setProperty("white-space", "nowrap");

      const count = parseInt(countDiv.innerText.trim().match(/\d+/)[0]);
      const name = nameAnchor.innerText.trim();

      const refs = {
        countDiv,
        nameAnchor,
        priceDiv,
      };

      return {
        name,
        count,
        used: 0,
        missing: count,
        refs,
      };
    });

    return deckItems;
  },

  updateDeckPriceDisplay: (deckPrice, currency) => {
    const buyButton = document.querySelector(".btn.buyck") as HTMLButtonElement;
    const buyForm = buyButton.parentElement as HTMLFormElement;

    buyForm.action = "https://www.cardmarket.com/en/Magic/Wants";
    buyForm.method = "get";

    const [nameSpan, priceSpan] = Array.from(
      buyButton.querySelectorAll("span")
    );
    nameSpan.innerText = "Buy from cardmarket";
    priceSpan.innerText = `${currency.toUpperCase()} ${deckPrice.toFixed(2)}`;
  },

  updateDeckListDisplay: (deckList) =>
    deckList.forEach((item) => {
      const {
        count,
        used,
        missing,
        price,
        refs: { countDiv, priceDiv },
      } = item;

      countDiv.innerText = ` ${used} / ${count} `;

      if (missing) {
        priceDiv.innerText = `${(missing * price).toFixed(2)}`;
      } else {
        priceDiv.innerText = `0.00`;
      }
    }),
};

export default mtgaZoneAdapter;
