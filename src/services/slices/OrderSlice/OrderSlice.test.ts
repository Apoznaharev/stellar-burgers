import orderSlice, { fetchOrder, TOrderState } from './OrderSlice';
import { testOrderFirst, testOrderSecond } from '../testExapmles';

const initialState: TOrderState = {
  orders: [],
  order: null,
  loading: false,
  error: null
};

describe('Тестирование OrderSlice', () => {
  test('Тестирование статуса загрузки fetchOrder', () => {
    const newState = orderSlice.reducer(
      {
        ...initialState,
        error: 'Test error'
      },
      fetchOrder.pending('', 1)
    );
    expect(newState).toEqual({
      orders: [],
      order: null,
      loading: true,
      error: null
    });
  });

  test('Тестирование ошибки fetchOrder', () => {
    const testError = new Error('Test error');
    const newState = orderSlice.reducer(
      {
        ...initialState,
        loading: true
      },
      fetchOrder.rejected(testError, '', 1)
    );
    expect(newState).toEqual({
      orders: [],
      order: null,
      loading: false,
      error: 'Test error'
    });
  });

  test('Тестирование успешного запроса fetchOrder', () => {
    const newState = orderSlice.reducer(
      {
        ...initialState,
        loading: true
      },
      fetchOrder.fulfilled({ orders: [testOrderFirst, testOrderSecond], success: true }, '', 1)
    );
    expect(newState).toEqual({
      orders: [],
      order: testOrderFirst,
      loading: false,
      error: null
    });
  });
});
