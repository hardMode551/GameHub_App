import { createImageSet, ImageSetType } from './types';

export const fruitImages = createImageSet({
  fruit_1: require('../images/fruit/webP/fruit_1.webp'),
  fruit_2: require('../images/fruit/webP/fruit_2.webp'),
  fruit_3: require('../images/fruit/webP/fruit_3.webp'),
  fruit_4: require('../images/fruit/webP/fruit_4.webp'),
  fruit_5: require('../images/fruit/webP/fruit_5.webp'),
  fruit_6: require('../images/fruit/webP/fruit_6.webp'),
  fruit_7: require('../images/fruit/webP/fruit_7.webp'),
  fruit_8: require('../images/fruit/webP/fruit_8.webp')
});

export const catImages = createImageSet({
  Cat_1: require('../images/cat/webP/Cat_1.webp'),
  Cat_2: require('../images/cat/webP/Cat_2.webp'),
  Cat_3: require('../images/cat/webP/Cat_3.webp'),
  Cat_4: require('../images/cat/webP/Cat_4.webp'),
  Cat_5: require('../images/cat/webP/Cat_5.webp'),
  Cat_6: require('../images/cat/webP/Cat_6.webp'),
  Cat_7: require('../images/cat/webP/Cat_7.webp'),
  Cat_8: require('../images/cat/webP/Cat_8.webp')
});

export const somethingAnotherImages = createImageSet({
  somethingAnother_1: require('../images/cat/Cat_1.png'),
  somethingAnother_2: require('../images/cat/Cat_2.png'),
  somethingAnother_3: require('../images/cat/Cat_3.png'),
  somethingAnother_4: require('../images/cat/Cat_4.png'),
  somethingAnother_5: require('../images/cat/Cat_5.png'),
  somethingAnother_6: require('../images/cat/Cat_6.png'),
  somethingAnother_7: require('../images/cat/Cat_7.png'),
  somethingAnother_8: require('../images/cat/Cat_8.png'),
});

// Использование:
export type FruitTileType = ImageSetType<typeof fruitImages>;
export type CatTileType = ImageSetType<typeof catImages>;
export type SomethingAnotherTileType = ImageSetType<typeof somethingAnotherImages>;

// Если нужно объединить все типы:
export type AllTileTypes = FruitTileType | CatTileType | SomethingAnotherTileType;