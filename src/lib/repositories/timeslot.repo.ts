import { prisma } from "../db/prisma-client";
import type { TimeSlot } from "@/generated/prisma";

export const TimeSlotRepository = {
  async findAvailableTimeSlots(date: string, courtId: number): Promise<TimeSlot[]> {
    const targetDate = new Date(date);

    // Find all reservations on this date
    const reservations = await prisma.reservation.findMany({
      where: {
				courtId: courtId,
        date: {
          gte: new Date(targetDate.setHours(0, 0, 0, 0)),
          lte: new Date(targetDate.setHours(23, 59, 59, 999)),
        },
      },
      select: {
        timeSlotId: true,
      },
    });

    // extract reserved timeslot ids
    const reservedTimeSlotIds = reservations.map(r => r.timeSlotId);

    // Find timeslots NOT reserved
    return prisma.timeSlot.findMany({
      where: {
        id: {
          notIn: reservedTimeSlotIds.length > 0 ? reservedTimeSlotIds : [0], 
        },
      },
      orderBy: {
        startTime: "asc",
      },
    });
  }
};
