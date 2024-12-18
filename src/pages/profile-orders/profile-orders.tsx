import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getUserOrders,
  getUserOrdersLoading,
  fetchUserOrders
} from '../../services/slices/UserOrdersSlice';
import { Preloader } from '@ui';
export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getUserOrdersLoading);
  const orders: TOrder[] = useSelector(getUserOrders);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);
  if (isLoading) {
    return <Preloader />;
  }
  return <ProfileOrdersUI orders={orders} />;
};
