import { RequestStatus } from '../../../utils/types';
import { getOrders, initialState, ordersReducer } from '../orders';

describe('Тесты слайса orders', () => {
  const testOrders = [
    {
      ingredients: [],
      _id: '6647615997ede0001d06b23d',
      owner: {},
      status: 'done',
      name: 'Флюоресцентный люминесцентный бургер',
      createdAt: '2024-05-17T13:53:29.807Z',
      updatedAt: '2024-05-17T13:53:30.243Z',
      number: 40223,
      price: 1976
    }
  ];

  describe('Тесты события getOrders', () => {
    test('Тест смены статуса на Loading при ожидании диспатча', () => {
      const newState = ordersReducer(initialState, getOrders.pending(''));
      expect(newState).toEqual({
        orders: [],
        requestStatus: RequestStatus.Loading
      });
    });
    test('Тест смены статуса на Failed при ошибке диспатча', () => {
      const newState = ordersReducer(
        initialState,
        getOrders.rejected(new Error('ERROR'), '')
      );
      expect(newState).toEqual({
        orders: [],
        requestStatus: RequestStatus.Failed
      });
    });
    test('Тест смены статуса на Success и запись в стор при успешном диспатче', () => {
      const newState = ordersReducer(
        { ...initialState, requestStatus: RequestStatus.Loading },
        getOrders.fulfilled(testOrders, '')
      );
      expect(newState).toEqual({
        orders: testOrders,
        requestStatus: RequestStatus.Success
      });
    });
  });
});
