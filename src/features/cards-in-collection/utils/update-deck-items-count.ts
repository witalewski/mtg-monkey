import { Collection, Deck } from "../types";

const updateDeckItemsCount = (deck: Deck, collection: Collection) => {
  const leftInCollection = {};

  return deck.map((item) => {
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
