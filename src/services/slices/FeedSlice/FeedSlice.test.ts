import feedSlice, { fetchFeed, TFeedState } from './FeedSlice';
import { testOrderFirst, testOrderSecond } from '../testExapmles';

const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  lodading: false,
  error: null
};

describe('Тестирование FeedSlice', () => {
  test('Тестирование запроса fetchFeed', () => {
    const newState = feedSlice.reducer(initialState, fetchFeed.pending(''));
    expect(newState).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      lodading: true,
      error: null
    });
  });

  test('Тестирование ошибки fetchFeed', () => {
    const testError = new Error('Test error');
    const newState = feedSlice.reducer(
      {
        ...initialState,
        lodading: true
      },
      fetchFeed.rejected(testError, '')
    );
    expect(newState).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      lodading: false,
      error: 'Test error'
    });
  });

  test('Тестирование успешного запроса fetchFeed', () => {
    const newState = feedSlice.reducer(
      {
        ...initialState,
        lodading: true
      },
      fetchFeed.fulfilled(
        {
          success: true,
          orders: [testOrderFirst, testOrderSecond],
          total: 2,
          totalToday: 1
        },
        ''
      )
    );
    expect(newState).toEqual({
      orders: [testOrderFirst, testOrderSecond],
      total: 2,
      totalToday: 1,
      lodading: false,
      error: null
    });
  });
});
