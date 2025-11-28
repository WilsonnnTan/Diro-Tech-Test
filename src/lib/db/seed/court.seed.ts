import { prisma } from '../prisma-client';

export async function seedCourt() {
  const courts = await Promise.all([
    prisma.court.upsert({
      where: { id: 1 },
      update: {},
      create: { id: 1, name: 'Court A', location: 'Building 1' },
    }),
    prisma.court.upsert({
      where: { id: 2 },
      update: {},
      create: { id: 2, name: 'Court B', location: 'Building 2' },
    }),
  ]);

  console.log(courts);
  return courts;
}
