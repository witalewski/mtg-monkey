import gmFetch from "../../../../utils/gm-fetch";

const getCurrencyRates = async (currency) =>
  gmFetch(`https://www.floatrates.com/daily/${currency}.json`);

export default getCurrencyRates;
