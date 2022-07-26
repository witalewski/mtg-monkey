const processAllCards = async (cards, currencyRates) => {
  return cards.map((card) => processSingleCard(card, currencyRates));
};

const processSingleCard = (card, currencyRates) => {
  const { name, prices } = card;
  return { name, price: getLowestPriceInCurrency(prices, currencyRates) };
};

const getLowestPriceInCurrency = (prices, currencyRates) => {
  const {
    usd,
    usd_foil: usdFoil,
    usd_etched: usdEtched,
    eur,
    eur_foil: eurFoil,
    tix,
  } = Object.keys(prices).reduce(
    (acc, key) => ({ ...acc, [key]: parseFloat(prices[key]) }),
    {}
  );

  if (!isNaN(eur)) {
    return eur / currencyRates.eur.rate;
  }
  if (!isNaN(usd)) {
    return usd / currencyRates.usd.rate;
  }
  if (!isNaN(tix)) {
    return tix / currencyRates.usd.rate;
  }
  if (!isNaN(eurFoil)) {
    return eurFoil / currencyRates.eur.rate;
  }
  if (!isNaN(usdFoil)) {
    return usdFoil / currencyRates.usd.rate;
  }
  if (!isNaN(usdEtched)) {
    return usdEtched / currencyRates.usd.rate;
  }
  return Infinity;
};

onmessage = ({ data: { cards, currencyRates } }) =>
  processAllCards(cards, currencyRates).then((cards) => postMessage(cards));
