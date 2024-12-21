import ingredientsSlice, {
  TStateIngridients,
  fetchIngredients
} from './IngredientsSlice';
import { testBun } from '../testExapmles';

const initialState: TStateIngridients = {
  ingridients: [],
  loading: false,
  error: null
};

describe('Тестирование IngredientsSlice', () => {
  test('Тестирование статуса загрузки fetchIngredients', () => {
    const newState = ingredientsSlice.reducer(
      {
        ...initialState,
        error: 'Test error'
      },
      fetchIngredients.pending('')
    );
    expect(newState).toEqual({
      ingridients: [],
      loading: true,
      error: null
    });
  });
  test('Тестирование ошибки fetchIngredients', () => {
    const testError = new Error('Test error');
    const newState = ingredientsSlice.reducer(
      {
        ...initialState,
        loading: true
      },
      fetchIngredients.rejected(testError, '')
    );
    expect(newState).toEqual({
      ingridients: [],
      loading: false,
      error: 'Test error'
    });
  });
  test('Тестирование отказа fetchIngredients', () => {
    const newState = ingredientsSlice.reducer(
      {
        ...initialState,
        loading: true
      },
      fetchIngredients.fulfilled([testBun], '')
    );
    expect(newState).toEqual({
      ingridients: [testBun],
      loading: false,
      error: null
    });
  });
});
