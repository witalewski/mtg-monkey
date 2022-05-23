const getDeckPrice = (deckList) =>
  deckList.reduce((acc, item) => acc + item.price * item.missing, 0);

export default getDeckPrice;
