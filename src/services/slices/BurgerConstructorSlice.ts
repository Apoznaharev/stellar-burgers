import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  nanoid
} from '@reduxjs/toolkit';
import { TConstructorIngredient, TOrder, TIngredient } from '@utils-types';
import { BURGER_CONSTRUCTOR_SLICE_NAME } from '../slicesName';
import { orderBurgerApi } from '@api';

type TStateBurgerConstructor = {
  constructorItems: {
    ingredients: TConstructorIngredient[];
    bun: TIngredient | null;
  };
  order: TOrder | null;
  orderRequest: boolean;
  loading: boolean;
  error: null | string | undefined;
};

const initialState: TStateBurgerConstructor = {
  constructorItems: {
    ingredients: [],
    bun: null
  },
  order: null,
  orderRequest: false,
  loading: false,
  error: null
};

export const createOrder = createAsyncThunk(
  `${BURGER_CONSTRUCTOR_SLICE_NAME}/createOrder`,
  async (orderData: string[]) => {
    const res = await orderBurgerApi(orderData);
    return res;
  }
);

export const burgerConstructorSlice = createSlice({
  name: BURGER_CONSTRUCTOR_SLICE_NAME,
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        {
          if (action.payload.type === 'bun') {
            state.constructorItems.bun = action.payload;
          } else {
            state.constructorItems.ingredients.push(action.payload);
          }
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return {
          payload: { ...ingredient, id }
        };
      }
    },
    removeIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (item) => item._id !== action.payload._id
        );
    },
    moveUpIngredient: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index > 0) {
        const ingredient = state.constructorItems.ingredients;
        [ingredient[index - 1], ingredient[index]] = [
          ingredient[index],
          ingredient[index - 1]
        ];
      }
    },
    moveDownIngredient: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index < state.constructorItems.ingredients.length - 1) {
        const ingredient = state.constructorItems.ingredients;
        [ingredient[index + 1], ingredient[index]] = [
          ingredient[index],
          ingredient[index + 1]
        ];
      }
    },
    clear: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message || 'Failed to create order';
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.order = action.payload.order;
        (state.constructorItems = {
          bun: null,
          ingredients: []
        }),
          (state.error = null);
      });
  },
  selectors: {
    getConstructorItems: (state) => state.constructorItems,
    getOrder: (state) => state.order,
    gerOrderRequest: (state) => state.orderRequest,
    getError: (state) => state.error
  }
});

export default burgerConstructorSlice;
export const {
  addIngredient,
  removeIngredient,
  moveUpIngredient,
  moveDownIngredient,
  clear
} = burgerConstructorSlice.actions;
export const { getConstructorItems, getOrder, gerOrderRequest, getError } =
  burgerConstructorSlice.selectors;
