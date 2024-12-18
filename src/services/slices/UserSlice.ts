import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  getUserApi,
  logoutApi,
  loginUserApi,
  updateUserApi,
  registerUserApi
} from '@api';
import { getCookie, setCookie, deleteCookie } from '../../utils/cookie';
import { USER_SLICE_NAME } from '../slicesName';
import { TRegisterData } from '@api';
type TUserState = {
  user: TUser | null;
  error: string | null;
  isAuth: boolean;
  isAuthChecked: boolean;
  loginRequest: boolean;
};

const initialState: TUserState = {
  user: null,
  error: null,
  isAuth: false,
  isAuthChecked: false,
  loginRequest: false
};

export const fetchUser = createAsyncThunk(
  `${USER_SLICE_NAME}/fetchUser`,
  async () => {
    const res = await getUserApi();
    return res;
  }
);

export const registerUser = createAsyncThunk(
  `${USER_SLICE_NAME}/registerUser`,
  async ({ email, name, password }: TRegisterData) => {
    const res = await registerUserApi({ email, name, password });
    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res.user;
  }
);

export const logIn = createAsyncThunk(
  `${USER_SLICE_NAME}/logIn`,
  async ({ email, password }: Omit<TRegisterData, 'name'>) => {
    const res = await loginUserApi({ email, password });
    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res.user;
  }
);

export const logOut = createAsyncThunk(
  `${USER_SLICE_NAME}/logOut`,
  async () => {
    const res = await logoutApi();
    deleteCookie('accessToken');
    localStorage.clear();
    return res;
  }
);

export const updateUser = createAsyncThunk(
  `${USER_SLICE_NAME}/updateUser`,
  async (user: Partial<TRegisterData>) => {
    const res = await updateUserApi(user);
    return res;
  }
);

export const userSlice = createSlice({
  name: USER_SLICE_NAME,
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isAuthChecked = false;
        state.error = null;
        state.user = null;
        state.loginRequest = true;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.error = action.error.message || 'Fetch failed';
        state.loginRequest = false;
        state.user = null;
        state.isAuth = false;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.error = null;
        state.loginRequest = false;
        state.user = action.payload.user;
        state.isAuth = true;
      })
      .addCase(registerUser.pending, (state) => {
        state.isAuthChecked = false;
        state.error = null;
        state.user = null;
        state.loginRequest = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.error = action.error.message || 'Register failed';
        state.loginRequest = false;
        state.user = null;
        state.isAuth = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.error = null;
        state.loginRequest = false;
        state.user = action.payload;
        state.isAuth = true;
      })
      .addCase(logIn.pending, (state) => {
        state.error = null;
        state.loginRequest = true;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.error = action.error.message || 'Login failed';
        state.loginRequest = false;
        state.user = null;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.error = null;
        state.loginRequest = false;
        state.user = action.payload;
        state.isAuth = true;
        state.isAuthChecked = true;
      })
      .addCase(logOut.pending, (state) => {
        state.error = null;
        state.loginRequest = true;
      })
      .addCase(logOut.rejected, (state, action) => {
        state.error = action.error.message || 'Logout failed';
        state.loginRequest = false;
        state.user = null;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.user = null;
        state.isAuth = false;
        state.isAuthChecked = true;
        deleteCookie('accessToken');
        localStorage.clear();
      })
      .addCase(updateUser.pending, (state) => {
        state.error = null;
        state.loginRequest = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.error.message || 'Update failed';
        state.loginRequest = false;
        state.user = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.error = null;
        state.loginRequest = false;
        state.user = action.payload.user;
      });
  },
  selectors: {
    getUser: (state) => state.user,
    getIsAuth: (state) => state.isAuth,
    getAuthChecked: (state) => state.isAuthChecked,
    getLoginRequest: (state) => state.loginRequest,
    getError: (state) => state.error
  }
});

export const { authChecked } = userSlice.actions;

export const checkUserAuth = createAsyncThunk(
  'user/checkUser',
  (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      dispatch(fetchUser()).finally(() => {
        dispatch(authChecked());
      });
    } else {
      dispatch(authChecked());
    }
  }
);

export default userSlice;
export const { getUser, getIsAuth, getAuthChecked, getLoginRequest, getError } =
  userSlice.selectors;
