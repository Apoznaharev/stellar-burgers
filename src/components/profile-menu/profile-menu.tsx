import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from '../../services/store';
import { logOut } from '../../services/slices/UserSlice';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    dispatch(logOut()).finally(() => navigate('/'));
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
