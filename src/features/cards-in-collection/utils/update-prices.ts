import { Deck, CardDatabase } from "../types";

const updatePrices = (deck: Deck, cardDatabase: CardDatabase) =>
  deck.map((deckItem) => {
    const matchingCards = cardDatabase.filter(
      (cardInDb) =>
        cardInDb.name === deckItem.name ||
        (cardInDb.name.startsWith(`${deckItem.name} // `) &&
          cardInDb.name !== `${deckItem.name} // ${deckItem.name}`)
    );

    const prices = matchingCards
      .map((card) => card.price)
      .filter((price) => price !== null && price !== 0);
    const lowestPrice = Math.min(...prices);

    return {
      ...deckItem,
      price: lowestPrice,
    };
  });

export default updatePrices;
