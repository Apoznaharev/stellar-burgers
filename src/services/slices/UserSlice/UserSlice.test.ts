import userSlice, {
  authChecked,
  checkUserAuth,
  fetchUser,
  logIn,
  registerUser,
  updateUser,
  logOut,
  TUserState
} from './UserSlice';
import { TUser } from '@utils-types';
import { TRegisterData, TLoginData } from '@api';
import '@testing-library/jest-dom';

const testUser: TUser = {
  email: 'test@Email.ru',
  name: 'testName'
};

const testLoginData: TLoginData = {
  email: 'test@Email.ru',
  password: 'testPassword'
};

const testRegisterData: TRegisterData = {
  email: 'test@Email.ru',
  name: 'testName',
  password: 'testPassword'
};

const testUpdateUserData: TRegisterData = {
  email: 'test@Email.ru',
  name: 'testName',
  password: 'testPassword'
};

const initialState: TUserState = {
  user: null,
  error: null,
  isAuth: false,
  isAuthChecked: false,
  loginRequest: false
};

describe('Тестирование UserSlice', () => {
  test('Тестирование проверки авторизации', () => {
    const newState = userSlice.reducer(
      { ...initialState, isAuthChecked: false },
      authChecked()
    );
    expect(newState).toEqual({
      ...initialState,
      isAuthChecked: true
    });
  });
  test('Тестирование статуса загрузки fetchUser', () => {
    const newState = userSlice.reducer(
      {
        ...initialState,
        isAuthChecked: false,
        loginRequest: false
      },
      fetchUser.pending('')
    );
    expect(newState).toEqual({
      ...initialState,
      isAuthChecked: false,
      loginRequest: true
    });
  });
  test('Тестирование ошибки fetchUser', () => {
    const testError = new Error('Test error');
    const newState = userSlice.reducer(
      {
        ...initialState,
        isAuthChecked: false,
        loginRequest: true
      },
      fetchUser.rejected(testError, '')
    );
    expect(newState).toEqual({
      ...initialState,
      isAuthChecked: true,
      loginRequest: false,
      error: 'Test error'
    });
  });
  test('Тестирование успешного запроса fetchUser', () => {
    const newState = userSlice.reducer(
      {
        ...initialState,
        isAuthChecked: false,
        loginRequest: true
      },
      fetchUser.fulfilled({ success: true, user: testUser }, '')
    );
    expect(newState).toEqual({
      ...initialState,
      isAuthChecked: true,
      isAuth: true,
      loginRequest: false,
      user: testUser
    });
  });
  test('Тестирование статуса загрузки logIn', () => {
    const newState = userSlice.reducer(
      {
        ...initialState,
        loginRequest: false
      },
      logIn.pending('', testLoginData)
    );
    expect(newState).toEqual({
      ...initialState,
      loginRequest: true
    });
  });
  test('Тестирование ошибки logIn', () => {
    const testError = new Error('Test error');
    const newState = userSlice.reducer(
      {
        ...initialState,
        loginRequest: true
      },
      logIn.rejected(testError, '', testLoginData)
    );
    expect(newState).toEqual({
      ...initialState,
      loginRequest: false,
      error: 'Test error'
    });
  });
  test('Тестирование успешного запроса logIn', () => {
    const newState = userSlice.reducer(
      {
        ...initialState,
        loginRequest: true
      },
      logIn.fulfilled(testUser, '', testRegisterData)
    );
    expect(newState).toEqual({
      ...initialState,
      isAuthChecked: true,
      loginRequest: false,
      isAuth: true,
      user: testUser
    });
  });
  test('Тестирование статуса загрузки registerUser', () => {
    const newState = userSlice.reducer(
      {
        ...initialState,
        loginRequest: false
      },
      registerUser.pending('', testRegisterData)
    );
    expect(newState).toEqual({
      ...initialState,
      loginRequest: true
    });
  });
  test('Тестирование ошибки registerUser', () => {
    const testError = new Error('Test error');
    const newState = userSlice.reducer(
      {
        ...initialState,
        loginRequest: true
      },
      registerUser.rejected(testError, '', testRegisterData)
    );
    expect(newState).toEqual({
      ...initialState,
      isAuthChecked: true,
      loginRequest: false,
      error: 'Test error'
    });
  });
  test('Тестирование успешного запроса registerUser', () => {
    const newState = userSlice.reducer(
      {
        ...initialState,
        loginRequest: true
      },
      registerUser.fulfilled(testUser, '', testRegisterData)
    );
    expect(newState).toEqual({
      ...initialState,
      isAuthChecked: true,
      loginRequest: false,
      isAuth: true,
      user: testUser
    });
  });
  test('Тестирование статуса загрузки updateUser', () => {
    const newState = userSlice.reducer(
      {
        ...initialState,
        loginRequest: false
      },
      updateUser.pending('', testUpdateUserData)
    );
    expect(newState).toEqual({
      ...initialState,
      loginRequest: true
    });
  });
  test('Тестирование ошибки updateUser', () => {
    const testError = new Error('Test error');
    const newState = userSlice.reducer(
      {
        ...initialState,
        loginRequest: true
      },
      updateUser.rejected(testError, '', testUpdateUserData)
    );
    expect(newState).toEqual({
      ...initialState,
      loginRequest: false,
      error: 'Test error'
    });
  });
  test('Тестирование успешного запроса updateUser', () => {
    const newState = userSlice.reducer(
      {
        ...initialState,
        loginRequest: true
      },
      updateUser.fulfilled(
        { success: true, user: testUser },
        '',
        testUpdateUserData
      )
    );
    expect(newState).toEqual({
      ...initialState,
      loginRequest: false,
      user: testUser
    });
  });
  test('Тестирование статуса загрузки logOut', () => {
    const newState = userSlice.reducer(
      {
        ...initialState,
        loginRequest: false
      },
      logOut.pending('')
    );
    expect(newState).toEqual({
      ...initialState,
      loginRequest: true
    });
  });
  test('Тестирование ошибки logOut', () => {
    const testError = new Error('Test error');
    const newState = userSlice.reducer(
      {
        ...initialState,
        loginRequest: true
      },
      logOut.rejected(testError, '')
    );
    expect(newState).toEqual({
      ...initialState,
      loginRequest: false,
      error: 'Test error'
    });
  });
  test('Тестирование успешного запроса logOut', () => {
    const newState = userSlice.reducer(
      {
        ...initialState,
        isAuth: true,
        user: testUser,

      },
      logOut.fulfilled({ success: true }, '')
    );
    expect(newState).toEqual({
      ...initialState,
      isAuth: false,
      user: null,
      isAuthChecked: true
    });
  });

});
