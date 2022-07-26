import { DEFAULT_CARDS_VALUE, SCRYFALL_CARDS_KEY } from "../../../../constants";
import { CardDatabase } from "../../types";
import parseJsonAsync from "../../../../utils/parse-json-async";

const getStoredPrices = async () => {
  return (await parseJsonAsync(
    await GM.getValue(SCRYFALL_CARDS_KEY, DEFAULT_CARDS_VALUE)
  )) as CardDatabase;
};

export default getStoredPrices;
