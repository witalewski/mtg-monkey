const mtgTop8Adapter = {
  getCollectionViewParent: () =>
    document.querySelector("img[src='/graph/title.png']").parentElement
      .parentElement.parentElement.parentElement,

  parseDeck: () => {
    const cardNameSpans = document.querySelectorAll(
      'div[style="margin-top:10px;"] .S14'
    );

    const deck = Array.from(cardNameSpans).map((cardDiv) => {
      const countDiv = cardDiv.querySelector("div");
      const nameAnchor = cardDiv.querySelector("a");

      const count = parseInt(countDiv.innerText.trim().match(/\d+/)[0]);
      const name = nameAnchor.innerText.trim().replace(" / ", " // ");

      const wrapperDiv = document.createElement("div");
      wrapperDiv.appendChild(countDiv);

      const priceSpan = document.createElement("span");
      priceSpan.innerText = "0.00";
      priceSpan.style.setProperty("margin-left", "10px");
      wrapperDiv.appendChild(priceSpan);

      cardDiv.appendChild(wrapperDiv);

      const refs = {
        countDiv,
        nameAnchor,
        priceSpan,
      };

      return {
        name,
        price: 0,
        count,
        used: 0,
        missing: count,
        refs,
      };
    });

    return deck;
  },

  updateDeckPriceDisplay: (deckPrice, currency) => {
    const storePrices = document.querySelectorAll("div.Nav_buy");
    if (storePrices.length === 4) {
      storePrices[1].parentElement.removeChild(storePrices[1]);
      storePrices[2].parentElement.removeChild(storePrices[2]);
    }

    const cardmarketDiv = storePrices[0];
    cardmarketDiv.removeAttribute("onClick");
    cardmarketDiv.addEventListener("click", () =>
      window.open("https://www.cardmarket.com/en/Magic/Wants")
    );

    const [nameDiv, priceDiv] = Array.from(
      cardmarketDiv.querySelectorAll("div")
    );
    nameDiv.innerText = "cardmarket";
    priceDiv.innerText = `${currency.toUpperCase()} ${deckPrice.toFixed(2)}`;
  },

  updateDeckListDisplay: (deckList) =>
    deckList.forEach((item) => {
      const {
        count,
        used,
        missing,
        price,
        refs: { countDiv, priceSpan },
      } = item;

      countDiv.innerText = ` ${used} / ${count} `;

      if (missing) {
        priceSpan.innerText = `${(missing * price).toFixed(2)}`;
      } else {
        priceSpan.innerText = `0.00`;
      }
    }),
};

export default mtgTop8Adapter;
