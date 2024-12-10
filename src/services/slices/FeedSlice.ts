import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getFeedsApi } from '@api';
import { FEED_SLICE_NAME } from '../slicesName';

type TFeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  lodading: boolean;
  error: null | string | undefined;
};

const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  lodading: false,
  error: null
};

export const fetchFeed = createAsyncThunk(
  `${FEED_SLICE_NAME}/fetchFeed`,
  async () => {
    const data = await getFeedsApi();
    return data;
  }
);

export const feedSlice = createSlice({
  name: FEED_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.lodading = true;
        state.error = null;
      })
      .addCase(fetchFeed.rejected, (state, action) => {
        state.lodading = false;
        state.error = action.error.message;
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.lodading = false;
      });
  },
  selectors: {
    getFeed: (state) => state.orders,
    getTotal: (state) => state.total,
    getTotalToday: (state) => state.totalToday
  }
});

export default feedSlice;

export const { getFeed, getTotal, getTotalToday } = feedSlice.selectors;
