import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

const sliceName = 'burgerConstructor';

export interface TBurgerState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
}

const initialState: TBurgerState = {
  bun: null,
  ingredients: []
};

export const burgerSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    addToConstructor: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: crypto.randomUUID() }
      })
    },
    removeFromConstructor: (state, action: PayloadAction<number>) => {
      state.ingredients.splice(action.payload, 1);
    },
    resetConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    },
    moveItemUp: (state, action: PayloadAction<number>) => {
      const item = state.ingredients.splice(action.payload, 1)[0];
      state.ingredients.splice(action.payload - 1, 0, item);
    },
    moveItemDown: (state, action: PayloadAction<number>) => {
      const item = state.ingredients.splice(action.payload, 1)[0];
      state.ingredients.splice(action.payload + 1, 0, item);
    }
  },
  selectors: {
    selectBurger: (state: TBurgerState) => state
  }
});

export const burgerSelectors = burgerSlice.selectors;
export const burgerActions = burgerSlice.actions;
export const burgerReducer = burgerSlice.reducer;
