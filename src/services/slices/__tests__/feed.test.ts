import { RequestStatus } from '../../../utils/types';
import { TFeedState, feedReducer, getFeeds } from '../feed';

describe('Тесты слайса feed', () => {
  const initialState: TFeedState = {
    orders: [],
    total: 0,
    totalToday: 0,
    requestStatus: RequestStatus.Idle
  };
  const testFeed = {
    orders: [
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
    ],
    total: 5,
    totalToday: 5,
    success: true
  };

  describe('Тесты события getFeeds', () => {
    test('Тест смены статуса на Loading при ожидании диспатча', () => {
      const newState = feedReducer(initialState, getFeeds.pending(''));
      expect(newState).toEqual({
        orders: [],
        total: 0,
        totalToday: 0,
        requestStatus: RequestStatus.Loading
      });
    });
    test('Тест смены статуса на Failed при ошибке диспатча', () => {
      const newState = feedReducer(
        initialState,
        getFeeds.rejected(new Error('ERROR'), '')
      );
      expect(newState).toEqual({
        orders: [],
        total: 0,
        totalToday: 0,
        requestStatus: RequestStatus.Failed
      });
    });
    test('Тест смены статуса на Success и запись в стор при успешном диспатче', () => {
      const newState = feedReducer(
        { ...initialState, requestStatus: RequestStatus.Loading },
        getFeeds.fulfilled(testFeed, '')
      );
      expect(newState).toEqual({
        orders: testFeed.orders,
        total: testFeed.total,
        totalToday: testFeed.totalToday,
        requestStatus: RequestStatus.Success
      });
    });
  });
});
