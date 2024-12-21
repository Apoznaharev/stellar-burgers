import { combineReducers, configureStore } from '@reduxjs/toolkit';
import ingredientsSlice from './slices/IngredientsSlice/IngredientsSlice';
import burgerConstructorSlice from './slices/BurgerConstructorSlice/BurgerConstructorSlice';
import feedSlice from './slices/FeedSlice/FeedSlice';
import orderSlice from './slices/OrderSlice/OrderSlice';
import userSlice from './slices/UserSlice/UserSlice';
import userOrdersSlice from './slices/UserOrdersSlice/UserOrdersSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineReducers({
  [ingredientsSlice.name]: ingredientsSlice.reducer,
  [burgerConstructorSlice.name]: burgerConstructorSlice.reducer,
  [feedSlice.name]: feedSlice.reducer,
  [orderSlice.name]: orderSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [userOrdersSlice.name]: userOrdersSlice.reducer
});

export { rootReducer };

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
