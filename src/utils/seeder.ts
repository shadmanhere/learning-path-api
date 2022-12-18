/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

export const fetchData = async () =>
  await axios.get('https://raw.githubusercontent.com/shadmanhere/learning-path-data/main/programming-data/api/v2/list-of-paths.json');

const createMany = async () => {
  const { data } = await fetchData();
  const dataObj: { name: string }[] = [];
  data.forEach((pathName: string) => {
    dataObj.push({ name: pathName });
  });
  await prisma.learningPath.deleteMany();
  await prisma.learningPath.createMany({
    data: dataObj,
    skipDuplicates: true,
  });
};

// createMany();

export const fetchTutorial = async () =>
  await axios.get('https://raw.githubusercontent.com/shadmanhere/learning-path-data/main/programming-data/api/v2/software-tester.json');

const updateTutorial = async () => {
  const { data } = await fetchTutorial();
  const tutorials: { title: string; url: string; image_url: string }[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data.forEach((dataObj: any) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataObj.section.tutorials.forEach((tutorial: any) => {
      tutorial.image_url = tutorial.thumbnail;
      delete tutorial.thumbnail;
      tutorials.push(tutorial);
    }),
  );
  await prisma.tutorial.createMany({
    data: tutorials,
    skipDuplicates: true,
  });
};

updateTutorial();
