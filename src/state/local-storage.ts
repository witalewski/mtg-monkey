import parseJsonAsync from "../async-utils/parse-json-async";
import { DEFAULT_CARDS_VALUE, SCRYFALL_CARDS_KEY } from "../constants";

export const getStoredPrices = async () => {
  return (await parseJsonAsync(
    await GM.getValue(SCRYFALL_CARDS_KEY, DEFAULT_CARDS_VALUE)
  )) as any[];
};
