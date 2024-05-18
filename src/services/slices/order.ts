import { orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TOrder } from '@utils-types';

const sliceName = 'order';

export interface TOrderState {
  info: TOrder | null;
  requestStatus: RequestStatus;
}

const initialState: TOrderState = {
  info: null,
  requestStatus: RequestStatus.Idle
};
export const orderSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.info = null;
      state.requestStatus = RequestStatus.Idle;
    }
  },
  selectors: {
    selectInfo: (state: TOrderState) => state.info,
    selectStatus: (state: TOrderState) => state.requestStatus
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(orderBurger.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.Success;
        state.info = action.payload.order;
      });
  }
});

export const orderBurger = createAsyncThunk(
  `${sliceName}/orderBurger`,
  async (orderData: string[]) => await orderBurgerApi(orderData)
);
export const orderSelectors = orderSlice.selectors;
export const orderActions = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
