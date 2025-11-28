import { prisma } from "../db/prisma-client";
import type { Reservation, Court, TimeSlot } from "@/generated/prisma";

export const ReservationRepository = {
  async findReservationDetail(userId: string, reservationId: string): Promise<(Reservation & { court: Court, timeSlot: TimeSlot }) | null> {
    return prisma.reservation.findFirst({
      where: {
        id: reservationId,
        userId: userId
      },
      include: {
        court: true,
        timeSlot: true
      }
    })
  }
}