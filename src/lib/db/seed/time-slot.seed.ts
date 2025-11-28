import { prisma } from '../prisma-client';

export async function seedTimeSlot() {
  const startHour = 6;
  const endHour = 24;
  const interval = 2;

  const timeSlotPromises = [];

  let id = 1;

  for (let hour = startHour; hour < endHour; hour += interval) {
    const startTime = `${hour.toString().padStart(2, '0')}:00`;
    const endTime = `${(hour + interval).toString().padStart(2, '0')}:00`;

    timeSlotPromises.push(
      prisma.timeSlot.upsert({
        where: { id },
        update: {},
        create: { id, startTime, endTime },
      })
    );

    id++;
  }

  const timeSlots = await Promise.all(timeSlotPromises);
  console.log(timeSlots);
  return timeSlots;
}
