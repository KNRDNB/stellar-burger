import { RequestStatus } from '../../../utils/types';
import {
  TOrderState,
  orderActions,
  orderBurger,
  orderReducer,
  orderSelectors
} from '../order';

describe('Тесты слайса order', () => {
  const initialState: TOrderState = {
    info: null,
    requestStatus: RequestStatus.Idle
  };

  const testState: TOrderState = {
    info: {
      ingredients: [],
      _id: '6647615997ede0001d06b23d',
      status: 'done',
      name: 'Флюоресцентный люминесцентный бургер',
      createdAt: '2024-05-17T13:53:29.807Z',
      updatedAt: '2024-05-17T13:53:30.243Z',
      number: 40223
    },
    requestStatus: RequestStatus.Success
  };

  const testData: string[] = ['1', '2', '3'];

  const testInfo = {
    order: {
      ingredients: [],
      _id: '6647615997ede0001d06b23d',
      owner: {},
      status: 'done',
      name: 'Флюоресцентный люминесцентный бургер',
      createdAt: '2024-05-17T13:53:29.807Z',
      updatedAt: '2024-05-17T13:53:30.243Z',
      number: 40223,
      price: 1976
    },
    name: 'Флюоресцентный люминесцентный бургер',
    success: true
  };

  describe('Тесты события orderBurger', () => {
    test('Тест смены статуса на Loading при ожидании диспатча', () => {
      const newState = orderReducer(
        initialState,
        orderBurger.pending('', testData)
      );
      expect(newState).toEqual({
        info: null,
        requestStatus: RequestStatus.Loading
      });
    });
    test('Тест смены статуса на Failed при ошибке диспатча', () => {
      const newState = orderReducer(
        initialState,
        orderBurger.rejected(new Error('ERROR'), '', testData)
      );
      expect(newState).toEqual({
        info: null,
        requestStatus: RequestStatus.Failed
      });
    });
    test('Тест смены статуса на Success и запись в стор при успешном диспатче', () => {
      const newState = orderReducer(
        initialState,
        orderBurger.fulfilled(testInfo, '', testData)
      );
      expect(newState).toEqual({
        info: testInfo.order,
        requestStatus: RequestStatus.Success
      });
    });
  });
  describe('Тесты редьюсеров', () => {
    test('Тест очистки заказа', () => {
      const newState = orderReducer(testState, orderActions.resetOrder());
      expect(newState).toEqual({
        info: null,
        requestStatus: RequestStatus.Idle
      });
    });
  });
});
