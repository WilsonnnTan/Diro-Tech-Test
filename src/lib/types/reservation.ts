export interface CourtData {
  id: number;
  name: string;
  location: string;
}

export interface TimeSlotData {
  id: number;
  startTime: string; // e.g., "08:00"
  endTime: string;   // e.g., "09:00"
}

export interface ReservationData {
  id: string;
  userId: string;      // reference to User
  courtId: number;     // reference to Court
  timeSlotId: number;  // reference to TimeSlot
  date: string;        // ISO string or date
  status?: ReservationStatus; // optional if default is PENDING
  payment?: PaymentData;
}

export interface PaymentData {
  id?: string;
  reservationId: string; // reference to Reservation
  amount: number;
  status?: PaymentStatus; // optional if default is PENDING
  paymentGatewayId?: string;
}

export enum ReservationStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  CANCELLED = "CANCELLED"
}

export enum PaymentStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED"
}
