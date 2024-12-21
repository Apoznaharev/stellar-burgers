import {
  addIngredient,
  removeIngredient,
  moveUpIngredient,
  moveDownIngredient,
  clear,
  TStateBurgerConstructor
} from './BurgerConstructorSlice';
import burgerConstructorSlice from './BurgerConstructorSlice';
import {
  testBun,
  testMeat,
  testSauce,
} from '../testExapmles';

describe('Тестирование BurgerConstructorSlice', () => {
  const mockInitialEmptyState: TStateBurgerConstructor = {
    constructorItems: {
      ingredients: [],
      bun: null
    },
    order: null,
    orderRequest: false,
    loading: false,
    error: null
  };
  const bun = {
    ...testBun,
    id: '111'
  };
  const ingredient1 = {
    ...testMeat,
    id: '222'
  };
  const ingredient2 = {
    ...testSauce,
    id: '333'
  };
  const mockInitialFilledState: TStateBurgerConstructor = {
    ...mockInitialEmptyState,
    constructorItems: {
      ...mockInitialEmptyState.constructorItems,
      bun,
      ingredients: [ingredient1, ingredient2]
    }
  };
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('Добавление булочки в конструктор', () => {
    const initialState = mockInitialEmptyState;

    const newState = burgerConstructorSlice.reducer(
      initialState,
      addIngredient(testBun)
    );
    expect(newState.constructorItems.bun).toEqual({
      ...testBun,
      id: expect.any(String)
    });
  });
  test('Добавление ингредиента в конструктор', () => {
    const initialState = mockInitialEmptyState;
    const newState = burgerConstructorSlice.reducer(
      initialState,
      addIngredient(testMeat)
    );
    expect(newState.constructorItems.ingredients.length).toBe(1);
    expect(newState.constructorItems.ingredients[0]).toEqual({
      ...testMeat,
      id: expect.any(String)
    });
  });
  test('Удаление ингредиента из конструктора', () => {
    const initialState = mockInitialFilledState;
    const newState = burgerConstructorSlice.reducer(
      initialState,
      removeIngredient(ingredient1)
    );
    expect(newState.constructorItems.ingredients.length).toBe(1);
    expect(newState.constructorItems.ingredients[0]).toBe(ingredient2);
  });
  test('Перемещение ингредиента вверх в конструкторе', () => {
    const initialState = mockInitialFilledState;
    const newState = burgerConstructorSlice.reducer(
      initialState,
      moveUpIngredient(1)
    );

    expect(newState.constructorItems.ingredients[0]).toBe(ingredient2);
    expect(newState.constructorItems.ingredients[1]).toBe(ingredient1);
  });
  test('Перемещение ингредиента вниз в конструкторе', () => {
    const initialState = mockInitialFilledState;

    const newState = burgerConstructorSlice.reducer(
      initialState,
      moveDownIngredient(0)
    );

    expect(newState.constructorItems.ingredients[0]).toBe(ingredient2);
    expect(newState.constructorItems.ingredients[1]).toBe(ingredient1);
  });
  test('Очистка конструктора', () => {
    const initialState = mockInitialFilledState;
    const newState = burgerConstructorSlice.reducer(initialState, clear());
    expect(newState.constructorItems.bun).toBe(null);
    expect(newState.constructorItems.ingredients.length).toBe(0);
  });
});
