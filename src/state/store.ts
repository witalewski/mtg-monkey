import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";
import { Collection } from "../collection/collection.types";

const cardsDataSlice = createSlice({
  name: "cardsData",
  initialState: {
    cardPrices: [],
    cardsInCollection: {},
  },
  reducers: {
    setCardPrices: (
      state,
      action: PayloadAction<{ name: string; price: number }[]>
    ) => {
      state.cardPrices = action.payload;
    },
    setCardsInCollection: (state, action: PayloadAction<Collection>) => {
      state.cardsInCollection = action.payload;
    },
  },
});

export const { setCardPrices, setCardsInCollection } = cardsDataSlice.actions;

export const store = configureStore({
  reducer: cardsDataSlice.reducer,
});
