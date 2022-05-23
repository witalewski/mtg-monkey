import { Collection } from "../types";

const getCollection = async (showAlerts = false): Promise<Collection> => {
  const validEntryRegex = /^\s*(\d+)\s(.+)$/;
  const emptyEntryRegex = /^\s*$/;

  const cardsRaw = (await GM.getValue("collection", "")) as string;

  const cards = cardsRaw.split("\n").reduce((acc: Collection, entry) => {
    if (!validEntryRegex.test(entry)) {
      if (showAlerts && !emptyEntryRegex.test(entry)) {
        alert(`Couldn't recognize line: ${entry}`);
      }
      return acc;
    }

    const match = entry.match(validEntryRegex);
    const count = match[1];
    const name = match[2];
    return { ...acc, [name]: acc[name] || 0 + parseInt(count) };
  }, {});

  return cards;
};

export default getCollection;
