import { getOrdersApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TOrder } from '@utils-types';

const sliceName = 'orders';

export interface TOrdersState {
  orders: TOrder[];
  requestStatus: RequestStatus;
}

const initialState: TOrdersState = {
  orders: [],
  requestStatus: RequestStatus.Idle
};

export const ordersSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {},
  selectors: {
    selectOrders: (state: TOrdersState) => state.orders
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(getOrders.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.Success;
        state.orders = action.payload;
      });
  }
});

export const getOrders = createAsyncThunk(
  `${sliceName}/getOrders`,
  async () => await getOrdersApi()
);

export const ordersSelectors = ordersSlice.selectors;
export const ordersActions = ordersSlice.actions;
export const ordersReducer = ordersSlice.reducer;
