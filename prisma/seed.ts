import {PrismaClient, Prisma} from "@prisma/client";

import {categories, ingredients, products} from "./constants";
import {hashSync} from "bcrypt";

const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const generateProductItem = ({
                               productId,
                               pizzaType,
                               size,
                             }: {
  productId: number;
  pizzaType?: 1 | 2;
  size?: 20 | 30 | 40;
}) => {
  return {
    productId,
    price: randomNumber(190, 700),
    pizzaType,
    size,
  } as Prisma.ProductItemUncheckedCreateInput;
};

const prisma = new PrismaClient();

async function up() {
  await prisma.user.createMany({
    data: [
      {
        fullName: "User",
        email: "user@ttt.gmail.com",
        password: hashSync("1111", 10),
        verified: new Date(),
        role: "USER",
      },
      {
        fullName: "Admin",
        email: "admin@ttt.gmail.com",
        password: hashSync("2222", 10),
        verified: new Date(),
        role: "ADMIN",
      },
    ],
  });

  await prisma.category.createMany({
    data: categories,
  });

  await prisma.ingredient.createMany({
    data: ingredients,
  });

  await prisma.product.createMany({
    data: products,
  });

  const pizza1 = await prisma.product.create({
    data: {
      name: "Пепперони фреш",
      imageUrl: "assets/images/dataItems/pizzas/pepperoni.png",
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(0, 5),
      },
    },
  });

  const pizza2 = await prisma.product.create({
    data: {
      name: "Сырная",
      imageUrl: "assets/images/dataItems/pizzas/becon-cheese.png",
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(5, 10),
      },
    },
  });

  const pizza3 = await prisma.product.create({
    data: {
      name: "Барбекью Пицца",
      imageUrl: "assets/images/dataItems/pizzas/chickenbarbeku.png",
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(10, 40),
      },
    },
  });

  const pizza4 = await prisma.product.create({
    data: {
      name: "Диабло",
      imageUrl: "assets/images/dataItems/pizzas/diablo.png",
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(10, 30),
      },
    },
  });

  const pizza5 = await prisma.product.create({
    data: {
      name: "Пицца микс",
      imageUrl: "assets/images/dataItems/pizzas/mixpizza.png",
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(10, 30),
      },
    },
  });
  const pizza6 = await prisma.product.create({
    data: {
      name: "Пицца Гавайская",
      imageUrl: "assets/images/dataItems/pizzas/havai.png",
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(10, 30),
      },
    },
  });

  await prisma.productItem.createMany({
    data: [
      // pizza fresh
      generateProductItem({productId: pizza1.id, pizzaType: 1, size: 20}),
      generateProductItem({productId: pizza1.id, pizzaType: 2, size: 30}),
      generateProductItem({productId: pizza1.id, pizzaType: 2, size: 40}),

      // pizza cheese
      generateProductItem({productId: pizza2.id, pizzaType: 1, size: 20}),
      generateProductItem({productId: pizza2.id, pizzaType: 1, size: 30}),
      generateProductItem({productId: pizza2.id, pizzaType: 1, size: 40}),
      generateProductItem({productId: pizza2.id, pizzaType: 2, size: 20}),
      generateProductItem({productId: pizza2.id, pizzaType: 2, size: 30}),
      generateProductItem({productId: pizza2.id, pizzaType: 2, size: 40}),

      // pizza chesoro
      generateProductItem({productId: pizza3.id, pizzaType: 1, size: 20}),
      generateProductItem({productId: pizza3.id, pizzaType: 2, size: 30}),
      generateProductItem({productId: pizza3.id, pizzaType: 2, size: 40}),

      // pizza diablo
      generateProductItem({productId: pizza4.id, pizzaType: 1, size: 20}),
      generateProductItem({productId: pizza4.id, pizzaType: 2, size: 30}),
      generateProductItem({productId: pizza4.id, pizzaType: 2, size: 40}),

      // pizza havai
      generateProductItem({productId: pizza5.id, pizzaType: 1, size: 20}),
      generateProductItem({productId: pizza5.id, pizzaType: 2, size: 30}),
      generateProductItem({productId: pizza5.id, pizzaType: 2, size: 40}),

      // pizza fresh
      generateProductItem({productId: pizza1.id, pizzaType: 1, size: 20}),
      generateProductItem({productId: pizza1.id, pizzaType: 2, size: 30}),
      generateProductItem({productId: pizza1.id, pizzaType: 2, size: 40}),

      // pizza mix
      generateProductItem({productId: pizza6.id, pizzaType: 1, size: 20}),
      generateProductItem({productId: pizza6.id, pizzaType: 1, size: 30}),
      generateProductItem({productId: pizza6.id, pizzaType: 1, size: 40}),
      generateProductItem({productId: pizza6.id, pizzaType: 2, size: 20}),
      generateProductItem({productId: pizza6.id, pizzaType: 2, size: 30}),
      generateProductItem({productId: pizza6.id, pizzaType: 2, size: 40}),

      // other products

      generateProductItem({productId: 1}),
      generateProductItem({productId: 2}),
      generateProductItem({productId: 3}),
      generateProductItem({productId: 4}),
      generateProductItem({productId: 5}),
      generateProductItem({productId: 6}),
      generateProductItem({productId: 7}),
      generateProductItem({productId: 8}),
      generateProductItem({productId: 9}),
      generateProductItem({productId: 10}),
      generateProductItem({productId: 11}),
      generateProductItem({productId: 12}),
      generateProductItem({productId: 13}),
      generateProductItem({productId: 14}),
      generateProductItem({productId: 15}),
      generateProductItem({productId: 16}),
      generateProductItem({productId: 17}),
    ],
  });

  await prisma.cart.createMany({
    data: [
      {
        userId: 1,
        totalAmount: 0,
        token: "1111",
      },
      {
        userId: 2,
        totalAmount: 0,
        token: "2222",
      },
    ],
  });

  await prisma.cartItem.create({
    data: {
      productItemId: 1,
      cartId: 1,
      quantity: 2,
      ingredients: {
        connect: [{id: 1}, {id: 2}, {id: 3}, {id: 4}],
      },
    },
  });

  await prisma.story.createMany({
    data: [
      {
        previewImageUrl: "/assets/images/dataItems/stories/story-1.webp",
      },
      {
        previewImageUrl: "/assets/images/dataItems/stories/story-2.webp",
      },
      {
        previewImageUrl: "/assets/images/dataItems/stories/story-3.jpg",
      },
      {
        previewImageUrl: "/assets/images/dataItems/stories/story-4.jpg",
      },
      {
        previewImageUrl: "/assets/images/dataItems/stories/story-5.jpg",
      },
      {
        previewImageUrl: "/assets/images/dataItems/stories/story-6.jpg",
      },
    ],
  });

  await prisma.storyItem.createMany({
    data: [
      {
        storyId: 1,
        sourceUrl: "/assets/images/dataItems/stories/story-1.webp",
      },
      {
        storyId: 2,
        sourceUrl: "/assets/images/dataItems/stories/story-2.webp",
      },
      {
        storyId: 3,
        sourceUrl: "/assets/images/dataItems/stories/story-3.jpg",
      },
      {
        storyId: 4,
        sourceUrl: "/assets/images/dataItems/stories/story-4.jpg",
      },
      {
        storyId: 5,
        sourceUrl: "/assets/images/dataItems/stories/story-5.jpg",
      },
      {
        storyId: 6,
        sourceUrl: "/assets/images/dataItems/stories/story-6.jpg",
      },
    ],
  });
}

async function down() {
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.productItem.deleteMany();
  await prisma.product.deleteMany();
  await prisma.ingredient.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();
}

async function main() {
  try {
    await down();
    await up();
  } catch (e) {
    console.error(e);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
