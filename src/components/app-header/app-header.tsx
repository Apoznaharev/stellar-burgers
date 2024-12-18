import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { getUser } from '../../services/slices/UserSlice';

export const AppHeader: FC = () => {
  const userName = useSelector(getUser);
  console.log(userName);
  return (
    <>
      <AppHeaderUI userName={userName?.name} />
    </>
  );
};
