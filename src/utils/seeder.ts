/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient } from '@prisma/client';
import { learningpaths } from '../data/learningpaths';
import { sections } from '../data/sections';
import { tutorials } from '../data/tutorials';
import { sectiontotutorials } from '../data/sectiontotutorials';
import { title } from 'process';

const prisma = new PrismaClient();

export const seeder = async () => {
  await prisma.learningPath
    .createMany({
      data: learningpaths,
    })
    .catch((reason: any) => {
      console.error(reason);
    });

  const newTutorials = tutorials.map((tutorial) => {
    return { title: tutorial.title, url: tutorial.url, imageUrl: tutorial.image_url };
  });
  await prisma.tutorial
    .createMany({
      data: newTutorials,
    })
    .catch((reason: any) => {
      console.error(reason);
    });

  await prisma.section
    .createMany({
      data: sections,
    })
    .catch((reason: any) => {
      console.error(reason);
    });

  await prisma.sectionToTutorial
    .createMany({
      data: sectiontotutorials,
    })
    .catch((reason: any) => {
      console.error(reason);
    });
};

seeder();
