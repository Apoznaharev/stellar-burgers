import userOrdersSlice, {
  fetchUserOrders,
  TUserOrdersState
} from './UserOrdersSlice';
import { testOrderFirst, testOrderSecond } from '../testExapmles';

const initialState: TUserOrdersState = {
  orders: [],
  loading: false,
  error: null
};

describe('Тестирование UserOrdersSlice', () => {
  test('Тестирование статуса загрузки fetchUserOrders', () => {
    const newState = userOrdersSlice.reducer(
      {
        ...initialState,
        error: 'Test error'
      },
      fetchUserOrders.pending('')
    );
    expect(newState).toEqual({
      orders: [],
      loading: true,
      error: null
    });
  });
  test('Тестирование ошибки fetchUserOrders', () => {
    const testError = new Error('Test error');
    const newState = userOrdersSlice.reducer(
      {
        ...initialState,
        loading: true
      },
      fetchUserOrders.rejected(testError, '')
    );
    expect(newState).toEqual({
      orders: [],
      loading: false,
      error: 'Test error'
    });
  });

  test('Тестирование успешного запроса fetchUserOrders', () => {
    const newState = userOrdersSlice.reducer(
      initialState,
      fetchUserOrders.fulfilled([testOrderFirst, testOrderSecond], '')
    );
    expect(newState).toEqual({
      orders: [testOrderFirst, testOrderSecond],
      loading: false,
      error: null
    });
  });
});
