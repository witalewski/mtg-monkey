import { Deck } from "../types";

const getDeckPrice = (deckList: Deck) =>
  deckList.reduce((acc, item) => acc + item.price * item.missing, 0);

export default getDeckPrice;
