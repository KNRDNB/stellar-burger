import { TIngredient } from '../../../utils/types';
import {
  TBurgerState,
  burgerActions,
  burgerReducer
} from '../burgerConstructor';

describe('Тесты слайса burgerConstructor', () => {
  const initialState: TBurgerState = {
    bun: null,
    ingredients: []
  };
  const bunIngredient: TIngredient = {
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
  };
  const mainIngredient: TIngredient = {
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
  };
  const sauceIngredient: TIngredient = {
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
  };
  const testState: TBurgerState = {
    bun: null,
    ingredients: [
      { ...sauceIngredient, id: 'b1152ed4-e5ae-44c9-a470-80cf5fc3f34f' },
      { ...mainIngredient, id: 'b1152ed4-e5ae-44c9-a470-80cf5fc3f34f' }
    ]
  };
  beforeEach(() => {
    jest
      .spyOn(global.crypto, 'randomUUID')
      .mockReturnValue('b1152ed4-e5ae-44c9-a470-80cf5fc3f34f');
  });

  afterEach(() => {
    jest.spyOn(global.crypto, 'randomUUID').mockRestore();
  });
  describe('Тест добавления ингредиента', () => {
    test('Тест добавления булки', () => {
      const newState = burgerReducer(
        initialState,
        burgerActions.addToConstructor(bunIngredient)
      );
      expect(newState).toEqual({
        bun: { ...bunIngredient, id: 'b1152ed4-e5ae-44c9-a470-80cf5fc3f34f' },
        ingredients: []
      });
    });
    test('Тест добавления соуса', () => {
      const newState = burgerReducer(
        initialState,
        burgerActions.addToConstructor(sauceIngredient)
      );
      expect(newState).toEqual({
        bun: null,
        ingredients: [
          { ...sauceIngredient, id: 'b1152ed4-e5ae-44c9-a470-80cf5fc3f34f' }
        ]
      });
    });
    test('Тест добавления начинки', () => {
      const newState = burgerReducer(
        initialState,
        burgerActions.addToConstructor(mainIngredient)
      );
      expect(newState).toEqual({
        bun: null,
        ingredients: [
          { ...mainIngredient, id: 'b1152ed4-e5ae-44c9-a470-80cf5fc3f34f' }
        ]
      });
    });
  });
  describe('Тест удаления ингредиента', () => {
    test('Тест удаления соуса', () => {
      const newState = burgerReducer(
        {
          ...initialState,
          ingredients: [
            { ...sauceIngredient, id: 'b1152ed4-e5ae-44c9-a470-80cf5fc3f34f' }
          ]
        },
        burgerActions.removeFromConstructor(0)
      );
      expect(newState).toEqual({
        bun: null,
        ingredients: []
      });
    });
    test('Тест удаления начинки', () => {
      const newState = burgerReducer(
        {
          ...initialState,
          ingredients: [
            { ...mainIngredient, id: 'b1152ed4-e5ae-44c9-a470-80cf5fc3f34f' }
          ]
        },
        burgerActions.removeFromConstructor(0)
      );
      expect(newState).toEqual({
        bun: null,
        ingredients: []
      });
    });
  });
  test('Тест очистки конструктора', () => {
    const newState = burgerReducer(
      {
        bun: { ...mainIngredient, id: 'b1152ed4-e5ae-44c9-a470-80cf5fc3f34f' },
        ingredients: [
          { ...mainIngredient, id: 'b1152ed4-e5ae-44c9-a470-80cf5fc3f34f' }
        ]
      },
      burgerActions.resetConstructor()
    );
    expect(newState).toEqual({
      bun: null,
      ingredients: []
    });
  });
  describe('Тест изменения порядка ингредиентов', () => {
    test('Тест перемещения вверх', () => {
      const newState = burgerReducer(testState, burgerActions.moveItemUp(1));
      expect(newState).toEqual({
        bun: null,
        ingredients: [
          { ...mainIngredient, id: 'b1152ed4-e5ae-44c9-a470-80cf5fc3f34f' },
          { ...sauceIngredient, id: 'b1152ed4-e5ae-44c9-a470-80cf5fc3f34f' }
        ]
      });
    });
    test('Тест перемещения вниз', () => {
      const newState = burgerReducer(testState, burgerActions.moveItemDown(0));
      expect(newState).toEqual({
        bun: null,
        ingredients: [
          { ...mainIngredient, id: 'b1152ed4-e5ae-44c9-a470-80cf5fc3f34f' },
          { ...sauceIngredient, id: 'b1152ed4-e5ae-44c9-a470-80cf5fc3f34f' }
        ]
      });
    });
  });
});
