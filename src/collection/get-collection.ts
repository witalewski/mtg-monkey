import { Collection } from "../types";

export const parseCollection = (collectionRaw: string) => {
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

const getCollection = async (): Promise<Collection> => {
  const collectionRaw = (await GM.getValue("collection", "")) as string;
  return parseCollection(collectionRaw);
};

export default getCollection;
