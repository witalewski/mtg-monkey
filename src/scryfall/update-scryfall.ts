import gmFetch from "../async-utils/gm-fetch";
import parseJsonAsync from "../async-utils/parse-json-async";
import stringifyJsonAsync from "../async-utils/stringify-json-async";
import getCurrencyRates from "../currency/get-currency-rates";

const BULK_DATA_URL = "https://api.scryfall.com/bulk-data";
const SCRYFALL_LAST_UPDATED_KEY = "scryfall-last-updated";
const SCRYFALL_CARDS_KEY = "scryfall-cards";
const DEFAULT_LAST_UPDATED_VALUE = "2022-01-01";
const DEFAULT_CARDS_VALUE = "{}";

const updateScryfall = (): Promise<Array<any>> =>
  new Promise(async (resolve) => {
    const bulkData = (await gmFetch(BULK_DATA_URL)) as {
      data: any[];
    };
    const { updated_at: updatedAt, download_uri: downloadUri } =
      bulkData.data.find((el) => el.type === "default_cards");

    const cachedVersionDate = await GM.getValue(
      SCRYFALL_LAST_UPDATED_KEY,
      DEFAULT_LAST_UPDATED_VALUE
    );
    const shouldUpdate =
      new Date(updatedAt).getTime() > new Date(cachedVersionDate).getTime();

    if (shouldUpdate) {
      const cards = await gmFetch(downloadUri);
      const currencyRates = await getCurrencyRates("PLN");

      var blob = new Blob(
        [
          "const processAllCards=async(e,s)=>e.map(e=>processSingleCard(e,s)),processSingleCard=(e,s)=>{const{name:r,prices:a}=e;return{name:r,price:getLowestPriceInCurrency(a,s)}},getLowestPriceInCurrency=(e,s)=>{const{usd:r,usd_foil:a,usd_etched:t,eur:c,eur_foil:n,tix:u}=Object.keys(e).reduce((s,r)=>({...s,[r]:parseFloat(e[r])}),{});return isNaN(c)?isNaN(r)?isNaN(u)?isNaN(n)?isNaN(a)?isNaN(t)?1/0:t/s.usd.rate:a/s.usd.rate:n/s.eur.rate:u/s.usd.rate:r/s.usd.rate:c/s.eur.rate};onmessage=(({data:{cards:e,currencyRates:s}})=>processAllCards(e,s).then(e=>postMessage(e)));",
        ],
        { type: "text/javascript" }
      );

      var url = URL.createObjectURL(blob);
      var worker = new Worker(url);

      worker.onmessage = async ({ data: processedCards }) => {
        const processedCardsRaw = await stringifyJsonAsync(processedCards);
        await GM.setValue(SCRYFALL_CARDS_KEY, processedCardsRaw as string);
        await GM.setValue(SCRYFALL_LAST_UPDATED_KEY, updatedAt);
        resolve(processedCards);
      };

      worker.postMessage({ cards, currencyRates });
    } else {
      const cards = (await parseJsonAsync(
        await GM.getValue(SCRYFALL_CARDS_KEY, DEFAULT_CARDS_VALUE)
      )) as any[];
      resolve(cards);
    }
  });

export default updateScryfall;
