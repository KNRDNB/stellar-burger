import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TIngredient } from '@utils-types';

const sliceName = 'ingredients';

export interface TIngredientsState {
  ingredients: TIngredient[];
  requestStatus: RequestStatus;
}

const initialState: TIngredientsState = {
  ingredients: [],
  requestStatus: RequestStatus.Idle
};

export const ingredientsSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {},
  selectors: {
    selectIngredients: (state: TIngredientsState) => state.ingredients,
    selectStatus: (state: TIngredientsState) => state.requestStatus
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(getIngredients.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.Success;
        state.ingredients = action.payload;
      });
  }
});

export const getIngredients = createAsyncThunk(
  `${sliceName}/getIngredients`,
  async () => await getIngredientsApi()
);

export const ingredientsSelectors = ingredientsSlice.selectors;
export const ingredientsActions = ingredientsSlice.actions;
