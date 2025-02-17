import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useSelector } from '..//../services/store';
import { getIngridients } from '../../services/slices/IngredientsSlice';
import { useParams } from 'react-router-dom';
import { fetchOrder, getOrder } from '../../services/slices/OrderSlice';
import { useDispatch } from '../../services/store';
import { getFeed } from '../../services/slices/FeedSlice';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch();
  const { number } = useParams();
  const feed = useSelector(getFeed);
  const orderData =
    feed.find((order) => order.number === Number(number)) ||
    useSelector(getOrder);

  const ingredients: TIngredient[] = useSelector(getIngridients);
  useEffect(() => {
    if (!orderData) {
      dispatch(fetchOrder(Number(number)));
    }
  }, [dispatch]);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
