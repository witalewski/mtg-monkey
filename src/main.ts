import selectAdapter from "./adapters/select-adapter";
import getCollection from "./collection/get-collection";
import updatePrices from "./collection/update-prices";
import getDeckPrice from "./collection/get-deck-price";
import setupCollectionManagement from "./collection/setup-collection-management";
import updateScryfall from "./scryfall/update-scryfall";
import { setCardPrices, setCardsInCollection, store } from "./state/store";
import getStoredPrices from "./scryfall/get-stored-prices";
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
  setupCollectionManagement(getCollectionViewParent());

  const handleStateUpdate = () => {
    const { cardDatabase, collection } = store.getState();
    console.info("Reacting to state update...");

    if (!cardDatabase?.length) {
      console.info("Cards database not loaded yet.");
      return;
    }

    console.info("Updating prices...");
    const deck = updatePrices(
      updateDeckItemsCount(parsedDeck, collection),
      cardDatabase
    );
    const deckPrice = getDeckPrice(deck);

    console.info("Updating display...");
    updateDeckPriceDisplay(deckPrice, "PLN");
    updateDeckListDisplay(deck);

    console.info("Done.");
  };

  store.subscribe(handleStateUpdate);

  console.info("Loading colection...");
  getCollection().then((collection) =>
    store.dispatch(setCardsInCollection(collection))
  );

  console.info("Loading local cards database...");
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
