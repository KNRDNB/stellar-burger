import { FC, useEffect, useMemo } from 'react';
import { RequestStatus, TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  burgerActions,
  burgerSelectors
} from '../../services/slices/burgerConstructor';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import {
  orderActions,
  orderBurger,
  orderSelectors
} from '../../services/slices/order';
import { userSelectors } from '../../services/slices/user';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orderStatus = useSelector(orderSelectors.selectStatus);
  const user = useSelector(userSelectors.selectUser);

  const constructorItems = useSelector(burgerSelectors.selectBurger);

  const orderRequest = orderStatus === RequestStatus.Loading ? true : false;

  const orderModalData = useSelector(orderSelectors.selectInfo);

  const onOrderClick = async () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user) {
      navigate('/login');
      return;
    }
    const orderData: string[] = [];
    if (constructorItems.bun) {
      orderData.push(constructorItems.bun._id);
    }
    constructorItems.ingredients.map((item) => orderData.push(item._id));
    await dispatch(orderBurger(orderData));
    dispatch(burgerActions.resetConstructor());
  };
  const closeOrderModal = () => {
    dispatch(orderActions.resetOrder());
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
