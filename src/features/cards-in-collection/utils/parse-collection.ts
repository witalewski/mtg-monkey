import { Collection } from "../types";

const parseCollection = (collectionRaw: string) => {
  const validEntryRegex = /^\s*(\d+)\s(.+)$/;

  const cards = collectionRaw.split("\n").reduce((acc: Collection, entry) => {
    if (!validEntryRegex.test(entry)) {
      return acc;
    }

    const match = entry.match(validEntryRegex);
    const count = match[1];
    const name = match[2];
    return { ...acc, [name]: acc[name] || 0 + parseInt(count) };
  }, {});

  return cards;
};

export default parseCollection;
