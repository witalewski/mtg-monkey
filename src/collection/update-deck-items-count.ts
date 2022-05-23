import { Collection } from "./collection.types";

const updateDeckItemsCount = (deckItems, collection: Collection) => {
  const leftInCollection = {};

  return deckItems.map((item) => {
    const { count, name } = item;
    if (!leftInCollection[name]) {
      leftInCollection[name] = collection[name] || 0;
    }

    const used = Math.min(leftInCollection[name], count);

    if (used) {
      leftInCollection[name] = leftInCollection[name] - used;
    }

    const missing = count - used;

    return {
      ...item,
      used,
      missing,
    };
  });
};

export default updateDeckItemsCount;
