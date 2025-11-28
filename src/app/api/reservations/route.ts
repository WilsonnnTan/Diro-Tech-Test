import { NextRequest, NextResponse } from "next/server";
import { ReservationService } from "@/lib/services/reservation.service";
import { ReservationSchema } from "@/lib/dto/reservation.schema";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  const body = await req.json();
  const parsed = ReservationSchema.omit({ userId: true }).safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { success: false, message: "Invalid request data", errors: parsed.error.format() },
      { status: 400 }
    );
  }

  const { courtId, timeSlotId, date } = parsed.data;

  try {
    await ReservationService.reserve(
      userId,
      courtId,
      timeSlotId,
      date
    );
    return NextResponse.json(
      { success: true, message: "Reservation created" },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
