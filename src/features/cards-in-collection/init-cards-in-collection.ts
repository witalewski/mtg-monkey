import { setCardPrices, setCardsInCollection, store } from "../../state/store";
import selectAdapter from "./adapters/select-adapter";
import getStoredPrices from "./api/scryfall/get-stored-prices";
import updateScryfall from "./api/scryfall/update-scryfall";
import getCollection from "./utils/get-collection";
import getDeckPrice from "./utils/get-deck-price";
import setupCollectionManagement from "./utils/setup-collection-management";
import updateDeckItemsCount from "./utils/update-deck-items-count";
import updatePrices from "./utils/update-prices";

export const initCardsInCollection = () => {
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
