import selectAdapter from "./adapters/select-adapter";
import getCollection from "./collection/get-collection";
import updatePrices from "./collection/update-prices";
import getDeckPrice from "./collection/get-deck-price";
import setupCollectionManagement from "./collection/setup-collection-management";
import updateScryfall from "./scryfall/update-scryfall";
import { setCardPrices, setCardsInCollection, store } from "./state/store";
import { getStoredPrices } from "./state/local-storage";

const main = async () => {
  const adapter = selectAdapter();
  if (!adapter) {
    return;
  }

  const {
    getCollectionViewParent,
    getDeckItems,
    updateDeckPriceDisplay,
    updateDeckListDisplay,
  } = adapter;

  let parsedDeck;

  console.log("Showing collection management...");
  setupCollectionManagement(getCollectionViewParent());

  store.subscribe(() => {
    const { cardPrices: cardsDatabase, cardsInCollection: collection } =
      store.getState();

    if (!cardsDatabase?.length) {
      console.log("Prices not loaded.");
      return;
    }

    if (!parsedDeck) {
      parsedDeck = getDeckItems(collection);
    }
    console.log("Updating prices...");
    const deckItems = updatePrices(parsedDeck, cardsDatabase);
    const deckPrice = getDeckPrice(deckItems);
    console.log({ deckItems, deckPrice });

    console.log("Updating display...");
    updateDeckPriceDisplay(deckPrice, "PLN");
    updateDeckListDisplay(deckItems);

    console.log("Done.");
  });

  console.log("Loading local cards database...");
  getStoredPrices().then((cardPrices) =>
    store.dispatch(setCardPrices(cardPrices))
  );

  updateScryfall().then((cardPrices) => {
    if (cardPrices?.length > 0) {
      store.dispatch(setCardPrices(cardPrices));
    }
  });

  console.log("Loading colection...");
  getCollection(true).then((collection) =>
    store.dispatch(setCardsInCollection(collection))
  );
};

export default main;
