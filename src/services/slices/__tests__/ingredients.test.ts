import { RequestStatus, TIngredient } from '../../../utils/types';
import {
  getIngredients,
  ingredientsReducer,
  initialState
} from '../ingredients';

describe('Тесты слайса ingredients', () => {
  const testIngredients: TIngredient[] = [
    {
      _id: '1',
      name: 'Ингредиент 1 (Булка)',
      type: 'bun',
      proteins: 1,
      fat: 1,
      carbohydrates: 1,
      calories: 1,
      price: 20,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
    },
    {
      _id: '2',
      name: 'Ингредиент 2 (Соус)',
      type: 'sauce',
      proteins: 1,
      fat: 1,
      carbohydrates: 1,
      calories: 1,
      price: 20,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
    },
    {
      _id: '3',
      name: 'Ингредиент 3 (Начинка)',
      type: 'main',
      proteins: 1,
      fat: 1,
      carbohydrates: 1,
      calories: 1,
      price: 20,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
    }
  ];
  describe('Тесты события getIngredients', () => {
    test('Тест смены статуса на Loading при ожидании диспатча', () => {
      const newState = ingredientsReducer(
        initialState,
        getIngredients.pending('')
      );
      expect(newState).toEqual({
        ingredients: [],
        requestStatus: RequestStatus.Loading
      });
    });
    test('Тест смены статуса на Failed при ошибке диспатча', () => {
      const newState = ingredientsReducer(
        initialState,
        getIngredients.rejected(new Error('ERROR'), '')
      );
      expect(newState).toEqual({
        ingredients: [],
        requestStatus: RequestStatus.Failed
      });
    });
    test('Тест смены статуса на Success и запись в стор при успешном диспатче', () => {
      const newState = ingredientsReducer(
        initialState,
        getIngredients.fulfilled(testIngredients, '')
      );
      expect(newState).toEqual({
        ingredients: testIngredients,
        requestStatus: RequestStatus.Success
      });
    });
  });
});
