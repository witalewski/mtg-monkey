import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";
import { Collection, CardDatabase } from "../features/cards-in-collection/types";

const cardsDataSlice = createSlice({
  name: "cardsData",
  initialState: {
    cardDatabase: [],
    collection: {},
  },
  reducers: {
    setCardPrices: (state, action: PayloadAction<CardDatabase>) => {
      state.cardDatabase = action.payload;
    },
    setCardsInCollection: (state, action: PayloadAction<Collection>) => {
      state.collection = action.payload;
    },
  },
});

export const { setCardPrices, setCardsInCollection } = cardsDataSlice.actions;

export const store = configureStore({
  reducer: cardsDataSlice.reducer,
});
