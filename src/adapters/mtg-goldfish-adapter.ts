import { WebsiteAdapter } from "./adapters.types.js";

const mtgGoldfishAdapter: WebsiteAdapter = {
  getCollectionViewParent: () =>
    document.querySelector(".deck-container-information"),

  getDeckItems: (collection) => {
    const cardNameSpans = document.querySelectorAll(
      "div#tab-paper table.deck-view-deck-table span.card_id.card_name"
    );

    const leftInCollection = Object.assign(collection);

    const deckItems = Array.from(cardNameSpans)
      .map((el) => el.parentNode.parentNode)
      .map((row) => {
        const [countTd, nameTd, manaTd, valueTd] = Array.from(
          row.querySelectorAll("td")
        );

        const count = parseInt(countTd.innerText.trim().match(/\d+/)[0]);
        const name = nameTd.innerText.trim();

        if (!leftInCollection[name]) {
          leftInCollection[name] = 0;
        }

        const used = Math.min(leftInCollection[name], count);

        if (used) {
          leftInCollection[name] = leftInCollection[name] - used;
        }

        const missing = count - used;

        const refs = {
          countTd,
          valueTd,
        };

        return {
          name,
          count,
          used,
          missing,
          refs,
        };
      });

    return deckItems;
  },

  updateDeckPriceDisplay: (deckPrice, currency) => {
    const deckPriceDiv = document.querySelector("div.deck-price-v2.paper");
    deckPriceDiv.innerHTML = `\n${currency.toUpperCase()}&nbsp;${Math.floor(
      deckPrice
    )}<span class="cents">${(deckPrice - Math.floor(deckPrice))
      .toFixed(2)
      .substr(1)}</span>\n`;
  },

  updateDeckListDisplay: (deckList) =>
    deckList.forEach((item) => {
      const {
        count,
        used,
        missing,
        price,
        refs: { countTd, valueTd },
      } = item;

      countTd.innerText = ` ${used} / ${count} `;

      if (missing) {
        valueTd.innerText = `${(missing * price).toFixed(2)}`;
      } else {
        valueTd.innerText = `0.00`;
      }
    }),
};

export default mtgGoldfishAdapter;
