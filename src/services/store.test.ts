import { rootReducer } from './store';
import { ingredientsReducer, ingredientsSlice } from './slices/ingredients';
import { burgerReducer, burgerSlice } from './slices/burgerConstructor';
import { feedReducer, feedSlice } from './slices/feed';
import { orderReducer, orderSlice } from './slices/order';
import { ordersReducer, ordersSlice } from './slices/orders';
import { userReducer, userSlice } from './slices/user';

describe('тесты rootReducer', () => {
  test('тест правильной инициализации rootReducer', () => {
    const initAction = { type: '@@INIT' };
    const initialState = rootReducer(undefined, initAction);
    expect(initialState).toEqual({
      [ingredientsSlice.name]: ingredientsReducer(undefined, initAction),
      [feedSlice.name]: feedReducer(undefined, initAction),
      [burgerSlice.name]: burgerReducer(undefined, initAction),
      [orderSlice.name]: orderReducer(undefined, initAction),
      [ordersSlice.name]: ordersReducer(undefined, initAction),
      [userSlice.name]: userReducer(undefined, initAction)
    });
  });
});
