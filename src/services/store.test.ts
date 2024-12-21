import { rootReducer } from './store';
import store from './store';

test('Проверка инициализации rootReducer', () => {
  const mockAction = { type: 'UNKNOWN_ACTION' };

  const initialState = rootReducer(undefined, mockAction);
  expect(initialState).toEqual(store.getState());
});
