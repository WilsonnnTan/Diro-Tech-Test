import { prisma } from '../prisma-client';
import { v4 as uuidv4 } from 'uuid';

function combineDateAndTime(dateStr: string, timeStr: string) {
  const isoString = `${dateStr}T${timeStr}:00`;

  return new Date(isoString);
}

export async function seedReservation(userId: string, courts: any[], timeSlots: any[]) {
  const reservation1 = await prisma.reservation.create({
    data: {
      id: uuidv4(),
      userId,
      courtId: courts[0].id,
      timeSlotId: timeSlots[0].id,
      date: combineDateAndTime('2025-12-01', timeSlots[0].startTime),
      status: 'PENDING',
    },
  });

  const reservation2 = await prisma.reservation.create({
    data: {
      id: uuidv4(),
      userId,
      courtId: courts[1].id,
      timeSlotId: timeSlots[1].id,
      date: combineDateAndTime('2025-12-01', timeSlots[1].startTime),
      status: 'PENDING',
    },
  });

  console.log('Reservations seeded:', [reservation1.id, reservation2.id]);
}
