import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { TLoginData } from '@api';
import { logIn, getIsAuth } from '../../services/slices/UserSlice';
import { useDispatch } from '../../services/store';
import { useSelector } from '../../services/store';
import { Navigate } from 'react-router-dom';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const isAuth = useSelector(getIsAuth);
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const userLoginData: TLoginData = { email, password };
    dispatch(logIn(userLoginData));
  };

  if (isAuth) {
    return <Navigate to={'/'} />;
  }

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
