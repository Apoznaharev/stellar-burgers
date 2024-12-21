import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrdersApi } from '../../../utils/burger-api';
import { USER_ORDERS_SLICE_NAME } from '../../slicesName';

export type TUserOrdersState = {
  orders: TOrder[];
  loading: boolean;
  error: null | string | undefined;
};

const initialState: TUserOrdersState = {
  orders: [],
  loading: false,
  error: null
};

export const fetchUserOrders = createAsyncThunk(
  `${USER_ORDERS_SLICE_NAME}/fetchUserOrders`,
  async () => {
    const data = await getOrdersApi();
    return data;
  }
);

export const userOrdersSlice = createSlice({
  name: USER_ORDERS_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch orders';
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.error = null;
      });
  },
  selectors: {
    getUserOrders: (state) => state.orders,
    getUserOrdersLoading: (state) => state.loading,
    getUserOrdersError: (state) => state.error
  }
});

export default userOrdersSlice;
export const { getUserOrders, getUserOrdersLoading, getUserOrdersError } =
  userOrdersSlice.selectors;
