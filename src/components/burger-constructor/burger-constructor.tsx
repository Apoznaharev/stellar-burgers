import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  getConstructorItems,
  getOrder,
  gerOrderRequest,
  createOrder,
  clear
} from '../../services/slices/BurgerConstructorSlice/BurgerConstructorSlice';
import { useNavigate } from 'react-router-dom';
import { getIsAuth } from '../../services/slices/UserSlice/UserSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const constructorItems = useSelector(getConstructorItems);

  const orderRequest = useSelector(gerOrderRequest);

  const orderModalData = useSelector(getOrder);
  const auth = useSelector(getIsAuth);

  const onOrderClick = () => {
    if (!auth) {
      return navigate('/login');
    }
    if (!constructorItems.bun || orderRequest) return;

    const order = [
      constructorItems.bun?._id,
      ...constructorItems.ingredients.map((item) => item._id),
      constructorItems.bun?._id
    ];
    dispatch(createOrder(order));
  };
  const closeOrderModal = () => {
    dispatch(clear());
    navigate('/');
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
