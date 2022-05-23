export interface WebsiteAdapter {
  getCollectionViewParent: () => Element;
  getDeckItems: (collection: any) => any;
  updateDeckPriceDisplay: (deckPrice: number, currency: string) => void;
  updateDeckListDisplay: (deckList: any) => void;
}
