/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient } from '@prisma/client';
import { learningpaths } from '../data/learningpaths';
import { sections } from '../data/sections';
import { tutorials } from '../data/tutorials';
import { sectiontotutorials } from '../data/sectiontotutorials';
import { categories } from '../data/categories';
import { categoriesToLearningPaths } from '../data/categoriesToLearningPaths';
import { categoriesToTutorials } from '../data/categoriesToTutorials';
import { chapters } from '../data/chapters';

const prisma = new PrismaClient();

const seedHelper = (inputData: (string[] | (string | number | null)[][])[] | [any, any]) => {
  const [keys, values] = inputData;
  const result = values.map((arr: { [x: string]: string | number }) => {
    const obj: Record<string, string | number | Date> = {};
    keys.forEach((key: unknown, index: string | number) => {
      if (key === 'createdAt') obj[key as unknown as string | number] = new Date(arr[index]);
      else obj[key as unknown as string | number] = arr[index];
    });
    return obj;
  });
  return result;
};

export const seeder = async () => {
  await prisma.category
    .createMany({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: seedHelper(categories) as any,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .catch((reason: any) => {
      console.error(reason);
    })
    .finally(() => {
      prisma.$disconnect();
    });

  await prisma.learningPath
    .createMany({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: seedHelper(learningpaths) as any,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .catch((reason: any) => {
      console.error(reason);
    })
    .finally(() => {
      prisma.$disconnect();
    });

  await prisma.categoryToLearningPath
    .createMany({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: seedHelper(categoriesToLearningPaths) as any,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .catch((reason: any) => {
      console.error(reason);
    })
    .finally(() => {
      prisma.$disconnect();
    });

  await prisma.section
    .createMany({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: seedHelper(sections) as any,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .catch((reason: any) => {
      console.error(reason);
    })
    .finally(() => {
      prisma.$disconnect();
    });

  await prisma.tutorial
    .createMany({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: seedHelper(tutorials) as any,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .catch((reason: any) => {
      console.error(reason);
    })
    .finally(() => {
      prisma.$disconnect();
    });

  await prisma.categoryToTutorial
    .createMany({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: seedHelper(categoriesToTutorials) as any,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .catch((reason: any) => {
      console.error(reason);
    })
    .finally(() => {
      prisma.$disconnect();
    });

  await prisma.sectionToTutorial
    .createMany({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: seedHelper(sectiontotutorials) as any,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .catch((reason: any) => {
      console.error(reason);
    })
    .finally(() => {
      prisma.$disconnect();
    });

  await prisma.chapter
    .createMany({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: seedHelper(chapters) as any,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .catch((reason: any) => {
      console.error(reason);
    })
    .finally(() => {
      prisma.$disconnect();
    });
};

seeder();
