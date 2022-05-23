const updatePrices = (deckItems, cardsDatabase) =>
  deckItems.map((deckItem) => {
    const matchingCards = cardsDatabase.filter((cardInDb) =>
      cardInDb.name.startsWith(deckItem.name)
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
