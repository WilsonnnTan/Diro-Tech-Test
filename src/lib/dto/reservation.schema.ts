import { z } from "zod";

// Enums
export const ReservationStatusEnum = z.enum(["PENDING", "CONFIRMED", "CANCELLED"]);
export const PaymentStatusEnum = z.enum(["PENDING", "COMPLETED", "FAILED"]);

// Court Schema
export const CourtSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  location: z.string(),
});

// TimeSlot Schema
export const TimeSlotSchema = z.object({
  id: z.number().optional(),
  startTime: z.string(), // e.g., "08:00"
  endTime: z.string(),   // e.g., "09:00"
});

// Payment Schema
export const PaymentSchema = z.object({
  id: z.uuid().optional(),
  reservationId: z.uuid(),
  amount: z.number(),
  status: PaymentStatusEnum.optional(),
  paymentGatewayId: z.string().optional(),
});

// Reservation Schema
export const ReservationSchema = z.object({
  id: z.uuid().optional(),
  userId: z.string().uuid(),
  courtId: z.number(),
  timeSlotId: z.number(),
  date: z.string(), // ISO string
  status: ReservationStatusEnum.optional(),
  payment: PaymentSchema.optional(),
});

// Types inferred from schemas
export type CourtDTO = z.infer<typeof CourtSchema>;
export type TimeSlotDTO = z.infer<typeof TimeSlotSchema>;
export type PaymentDTO = z.infer<typeof PaymentSchema>;
export type ReservationDTO = z.infer<typeof ReservationSchema>;
