import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { getFeed } from '../../services/slices/FeedSlice';
import { useDispatch, useSelector } from '../../services/store';
import { fetchFeed } from '../../services/slices/FeedSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFeed());
  }, [dispatch]);

  const orders: TOrder[] = useSelector(getFeed);

  if (!orders.length) {
    return <Preloader />;
  }
  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(fetchFeed());
      }}
    />
  );
};
