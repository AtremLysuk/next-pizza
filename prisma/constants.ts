export const categories = [
  {
    name: 'Пиццы',
  },
  {
    name: 'Завтрак',
  },
  {
    name: 'Закуски',
  },
  {
    name: 'Коктейли',
  },
  {
    name: 'Напитки',
  },
];

export const ingredients = [
  {
    name: 'Сырный бортик',
    price: 179,
    imageUrl:
      'assets/images/dataItems/ingredients/cheeseBortik.png',
  },
  {
    name: 'Сливочная моцарелла',
    price: 79,
    imageUrl:
      'assets/images/dataItems/ingredients/macarella.png',
  },
  {
    name: 'Сыры чеддер и пармезан',
    price: 79,
    imageUrl:
      'assets/images/dataItems/ingredients/chedder-parmezan.png',
  },
  {
    name: 'Острый перец халапеньо',
    price: 59,
    imageUrl:
      'assets/images/dataItems/ingredients/hot-halapenio.png',
  },
  {
    name: 'Нежный цыпленок',
    price: 79,
    imageUrl:
      'assets/images/dataItems/ingredients/chicken.png',
  },
  {
    name: 'Шампиньоны',
    price: 59,
    imageUrl:
      'assets/images/dataItems/ingredients/shampinioni.png',
  },
  {
    name: 'Ветчина',
    price: 79,
    imageUrl:
      'assets/images/dataItems/ingredients/vetchina.png',
  },
  {
    name: 'Пикантная пепперони',
    price: 79,
    imageUrl:
      'assets/images/dataItems/ingredients/cowMeat.png',
  },
  {
    name: 'Острая чоризо',
    price: 79,
    imageUrl:
      'assets/images/dataItems/ingredients/hot-chizorro.png',
  },
  {
    name: 'Маринованные огурчики',
    price: 59,
    imageUrl:
      'assets/images/dataItems/ingredients/onio.png',
  },
  {
    name: 'Свежие томаты',
    price: 59,
    imageUrl:
      'assets/images/dataItems/ingredients/cherry.png',
  },
  {
    name: 'Красный лук',
    price: 59,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA60AE6464C',
  },
  {
    name: 'Сочные ананасы',
    price: 59,
    imageUrl:
      'assets/images/dataItems/ingredients/ananas.png',
  },
  {
    name: 'Итальянские травы',
    price: 39,
    imageUrl:
      'assets/images/dataItems/ingredients/italianTravi.png'
  },
  {
    name: 'Сладкий перец',
    price: 59,
    imageUrl:
      'assets/images/dataItems/ingredients/sweetperetc.png',
  },
  {
    name: 'Кубики брынзы',
    price: 79,
    imageUrl:
      'assets/images/dataItems/ingredients/brinza.png',
  },
  {
    name: 'Митболы',
    price: 79,
    imageUrl:
      'assets/images/dataItems/ingredients/meatballs.png',
  },
].map((obj, index) => ({ id: index + 1, ...obj }));

export const products = [
  {
    name: 'Омлет с ветчиной и грибами',
    imageUrl:
      'assets/images/dataItems/breakfast/omlet-classic.png',
    categoryId: 2,
  },
  {
    name: 'Омлет с пепперони',
    imageUrl:
      'assets/images/dataItems/breakfast/omlet-pepperoni.png',
    categoryId: 2,
  },
  {
    name: 'Кофе Латте',
    imageUrl:
      'assets/images/dataItems/breakfast/omlet-pepperoni.png',
    categoryId: 2,
  },
  {
    name: 'Дэнвич ветчина и сыр',
    imageUrl:
      'assets/images/dataItems/breakfast/dosterMeat.png',
    categoryId: 3,
  },
  {
    name: 'Куриные наггетсы',
    imageUrl:
      'assets/images/dataItems/breakfast/nagetsi.png',
    categoryId: 3,
  },
  {
    name: 'Картофель из печи с соусом 🌱',
    imageUrl:
      'assets/images/dataItems/breakfast/potatoGrill.png',
    categoryId: 3,
  },
  {
    name: 'Додстер',
    imageUrl:
      'assets/images/dataItems/breakfast/doster.png',
    categoryId: 3,
  },
  {
    name: 'Острый Додстер 🌶️🌶️',
    imageUrl:
      'assets/images/dataItems/breakfast/dosterGrill.png',
    categoryId: 3,
  },
  {
    name: 'Банановый молочный коктейль',
    imageUrl:
      'assets/images/dataItems/cofee/shakeMilk.png',
    categoryId: 4,
  },
  {
    name: 'Карамельное яблоко молочный коктейль',
    imageUrl:
      'assets/images/dataItems/cofee/shakeStawberry.png',
    categoryId: 4,
  },
  {
    name: 'Молочный коктейль с печеньем Орео',
    imageUrl:
      'assets/images/dataItems/cofee/shakeChockolate.png',
    categoryId: 4,
  },
  {
    name: 'Классический молочный коктейль 👶',
    imageUrl:
      'assets/images/dataItems/cofee/shakeMilk.png',
    categoryId: 4,
  },
  {
    name: 'Ирландский Капучино',
    imageUrl:
      'assets/images/dataItems/cofee/capucchino.png',
    categoryId: 5,
  },
  {
    name: 'Кофе Карамельный капучино',
    imageUrl:
      'assets/images/dataItems/cofee/latecaramel.png',
    categoryId: 5,
  },
  {
    name: 'Кофе Кокосовый латте',
    imageUrl:
      'assets/images/dataItems/cofee/cocoslate.png',
    categoryId: 5,
  },
  {
    name: 'Кофе Американо',
    imageUrl:
      'assets/images/dataItems/cofee/americano.png',
    categoryId: 5,
  },
  {
    name: 'Кофе Латте',
    imageUrl:
      'assets/images/dataItems/cofee/late.png',
    categoryId: 5,
  },
];
