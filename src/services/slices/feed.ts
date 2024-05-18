import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TOrder } from '@utils-types';

const sliceName = 'feed';

export interface TFeedState {
  orders: TOrder[];
  total: number;
  totalToday: number;
  requestStatus: RequestStatus;
}

const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  requestStatus: RequestStatus.Idle
};

export const feedSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {},
  selectors: {
    selectOrders: (state: TFeedState) => state.orders,
    selectTotal: (state: TFeedState) => state.total,
    selectTotalToday: (state: TFeedState) => state.totalToday
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(getFeeds.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.Success;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      });
  }
});

export const getFeeds = createAsyncThunk(
  `${sliceName}/getFeeds`,
  async () => await getFeedsApi()
);

export const feedSelectors = feedSlice.selectors;
export const feedActions = feedSlice.actions;
export const feedReducer = feedSlice.reducer;
