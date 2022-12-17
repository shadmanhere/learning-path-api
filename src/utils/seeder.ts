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
    skipDuplicates: true, // Skip 'Bobo'
  });
};

createMany();
