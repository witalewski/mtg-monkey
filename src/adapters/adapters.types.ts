export interface WebsiteAdapter {
  getCollectionViewParent: () => Element;
  parseDeck: () => any;
  updateDeckPriceDisplay: (deckPrice: number, currency: string) => void;
  updateDeckListDisplay: (deckList: any) => void;
}
