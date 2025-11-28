import { prisma } from '../prisma-client'
import { seedCourt } from './court.seed'
import { seedTimeSlot } from './time-slot.seed'
import { seedReservation } from './reservation.seed'

async function main() {
  const courts = await seedCourt();
  const timeSlots = await seedTimeSlot();
  await seedReservation("2UpptCqfGFkqvSCgm8fxz09OSzCSzzIv", courts, timeSlots);
}

main().then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
