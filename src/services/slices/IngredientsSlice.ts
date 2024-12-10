import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { INGREDIENTS_SLICE_NAME } from '../slicesName';
import { getIngredientsApi } from '@api';

export type TStateIngridients = {
  ingridients: Array<TIngredient>;
  loading: boolean;
  error: null | string | undefined;
};

const initialState: TStateIngridients = {
  ingridients: [],
  loading: false,
  error: null
};

export const fetchIngredients = createAsyncThunk(
  `${INGREDIENTS_SLICE_NAME}/fetchIngridients`,
  async () => {
    const data = await getIngredientsApi();
    return data;
  }
);

const ingredientsSlice = createSlice({
  name: INGREDIENTS_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingridients = action.payload;
      });
  },
  selectors: {
    getIngridients: (state) => state.ingridients,
    getError: (state) => state.error,
    getLoading: (state) => state.loading
  }
});
export default ingredientsSlice;
export const { getIngridients, getError, getLoading } =
  ingredientsSlice.selectors;
