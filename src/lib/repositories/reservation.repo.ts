import { prisma } from "../db/prisma-client";
import type { Reservation, Court, TimeSlot } from "@/generated/prisma";
import { v4 as uuidv4 } from 'uuid';

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
    });
  },

  async findAllReservationByUserId(userId: string): Promise<(Reservation & { court: Court, timeSlot: TimeSlot })[]> {
    return prisma.reservation.findMany({
      where: {
        userId: userId,
      },
      include: {
        court: true,
        timeSlot: true
      }
    });
  },

  async findReservationByCourtTimeDate(courtId: number, timeSlotId: number, date: Date) {
    return prisma.reservation.findFirst({
      where: { courtId, timeSlotId, date, status: "PENDING" },
    });
  },

  async createReservation(data: {
    userId: string;
    courtId: number;
    timeSlotId: number;
    date: Date;
  }) {
    return prisma.reservation.create({
      data: {
        id: uuidv4(),
        ...data,
        status: "CONFIRMED",
      },
    });
  },
};