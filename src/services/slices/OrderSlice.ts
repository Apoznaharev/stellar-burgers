import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrderByNumberApi } from '@api';
import { ORDER_SLICE_NAME } from '../slicesName';

type TOrderState = {
  orders: TOrder[];
  order: TOrder | null | undefined;
  loading: boolean;
  error: null | string | undefined;
};

const initialState: TOrderState = {
  orders: [],
  order: null,
  loading: false,
  error: null
};

export const fetchOrder = createAsyncThunk(
  `${ORDER_SLICE_NAME}/fetchOrder`,
  async (number: number, { rejectWithValue }) => {
    try {
      const data = await getOrderByNumberApi(number);
      return data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const orderSlice = createSlice({
  name: ORDER_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload?.orders[0];
      });
  },
  selectors: {
    getOrder: (state) => state.order
  }
});
export default orderSlice;
export const { getOrder } = orderSlice.selectors;
