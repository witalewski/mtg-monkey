export interface Collection {
  [name: string]: number;
}

export interface DeckItem {
  name: string;
  price: number;
  count: number;
  used: number;
  missing: number;
  refs: {
    [name: string]: HTMLElement;
  };
}

export type Deck = DeckItem[];

export interface CardWithPrice {
  name: string;
  price: number;
}

export type CardDatabase = CardWithPrice[];
