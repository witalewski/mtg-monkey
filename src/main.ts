import selectAdapter from "./adapters/select-adapter";
import getCollection from "./collection/get-collection";
import updatePrices from "./collection/update-prices";
import getDeckPrice from "./collection/get-deck-price";
import setupCollectionManagement from "./collection/setup-collection-management";
import updateScryfall from "./scryfall/update-scryfall";
import updateDeckItemsCount from "./collection/update-deck-items-count";

const main = async () => {
  console.log("Loading cards database...");
  const cardsDatabase = await updateScryfall();

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

  console.log("Loading colection...");
  const collection = await getCollection(true);

  console.log("Updating prices...");
  const deckItems = updatePrices(getDeckItems(collection), cardsDatabase);
  const deckPrice = getDeckPrice(deckItems);

  console.log("Updating display...");
  updateDeckPriceDisplay(deckPrice, "PLN");
  updateDeckListDisplay(deckItems);

  console.log("Showing collection management...");
  setupCollectionManagement(
    getCollectionViewParent(),
    async () => {
      console.log("Refreshing collection...");
      const collection = await getCollection();

      const updatedDeckItems = updateDeckItemsCount(deckItems, collection);
      const deckPrice = getDeckPrice(updatedDeckItems);

      updateDeckPriceDisplay(deckPrice, "PLN");
      updateDeckListDisplay(updatedDeckItems);
      console.log("Done.");
    },
    () => {}
  );

  console.log("Done.");
};

export default main;
