import { Deck } from "../types";

export interface WebsiteAdapter {
  getCollectionViewParent: () => HTMLElement;
  parseDeck: () => Deck;
  updateDeckPriceDisplay: (deckPrice: number, currency: string) => void;
  updateDeckListDisplay: (deck: Deck) => void;
}
