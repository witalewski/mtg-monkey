import { Collection } from "../types";
import parseCollection from "./parse-collection";

const getCollection = async (): Promise<Collection> => {
  const collectionRaw = (await GM.getValue("collection", "")) as string;
  return parseCollection(collectionRaw);
};

export default getCollection;
