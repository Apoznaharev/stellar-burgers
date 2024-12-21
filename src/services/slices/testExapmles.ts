import { TIngredient } from '@utils-types';
import { TOrder } from '@utils-types';

export const testBun: TIngredient = {
  _id: '1',
  name: 'Ингредиент 1. Булочка',
  type: 'bun',
  proteins: 5,
  fat: 20,
  carbohydrates: 50,
  calories: 410,
  price: 999,
  image: 'https://code.s3.yandex.net/react/code/bun-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
};

export const testMeat: TIngredient = {
  _id: '2',
  name: 'Ингредиент 2. Мясо',
  type: 'main',
  proteins: 5,
  fat: 20,
  carbohydrates: 50,
  calories: 410,
  price: 999,
  image: 'https://code.s3.yandex.net/react/code/meat-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png'
};

export const testSauce: TIngredient = {
  _id: '3',
  name: 'Ингредиент 3. Соус',
  type: 'sauce',
  proteins: 3,
  fat: 40,
  carbohydrates: 5,
  calories: 500,
  price: 2500,
  image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png'
};

export const testOrderFirst: TOrder = {
  _id: '11111',
  status: 'done',
  name: 'Burger1',
  createdAt: '01.01.2023',
  updatedAt: '01.01.2023',
  number: 111,
  ingredients: [testBun.name, testMeat.name]
};

export const testOrderSecond: TOrder = {
  _id: '22222',
  status: 'done',
  name: 'Burger2',
  createdAt: '02.02.2023',
  updatedAt: '02.02.2023',
  number: 222,
  ingredients: [testBun.name, testMeat.name, testSauce.name]
};
