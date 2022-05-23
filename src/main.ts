import selectAdapter from "./adapters/select-adapter";
import getCollection from "./collection/get-collection";
import updatePrices from "./collection/update-prices";
import getDeckPrice from "./collection/get-deck-price";
import setupCollectionManagement from "./collection/setup-collection-management";
import updateScryfall from "./scryfall/update-scryfall";
import { setCardPrices, setCardsInCollection, store } from "./state/store";
import { getStoredPrices } from "./state/local-storage";
import updateDeckItemsCount from "./collection/update-deck-items-count";

const main = async () => {
  const adapter = selectAdapter();
  if (!adapter) {
    return;
  }

  const {
    getCollectionViewParent,
    parseDeck,
    updateDeckPriceDisplay,
    updateDeckListDisplay,
  } = adapter;

  const parsedDeck = parseDeck();

  console.log("Showing collection management...");
  setupCollectionManagement(getCollectionViewParent());

  const handleStateUpdate = () => {
    const { cardDatabase, collection } = store.getState();

    if (!cardDatabase?.length) {
      console.log("Prices not loaded.");
      return;
    }

    console.log("Updating prices...");
    const deck = updatePrices(
      updateDeckItemsCount(parsedDeck, collection),
      cardDatabase
    );
    const deckPrice = getDeckPrice(deck);

    console.log("Updating display...");
    updateDeckPriceDisplay(deckPrice, "PLN");
    updateDeckListDisplay(deck);

    console.log("Done.");
  };

  store.subscribe(handleStateUpdate);

  console.log("Loading colection...");
  getCollection(true).then((collection) =>
    store.dispatch(setCardsInCollection(collection))
  );

  console.log("Loading local cards database...");
  getStoredPrices().then((cardPrices) =>
    store.dispatch(setCardPrices(cardPrices))
  );

  updateScryfall().then((result) => {
    if (result.updated) {
      store.dispatch(setCardPrices(result.cardDatabase));
    }
  });
};

export default main;
