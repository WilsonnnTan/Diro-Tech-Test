import { prisma } from '../prisma-client'

export async function seedExample() {
  const user = await prisma.user.create({
    data: {
      id: 'user-1',
      name: 'wilson Example',
      email: 'wilson@example.com',
      emailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  })
}