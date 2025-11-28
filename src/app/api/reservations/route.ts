import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/auth-client";
import { ReservationService } from "@/lib/services/reservation.service";

export async function POST(req: NextRequest) {
  // const { data: session } = await getSession();

  // if (!session?.user.id) {
  //   return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  // }

  // const userId = session.user.id;
	const userId = "2UpptCqfGFkqvSCgm8fxz09OSzCSzzIv";

  // 2. Parse request body
  const { courtId, timeSlotId, date } = await req.json();

  if (!courtId || !timeSlotId || !date) {
    return NextResponse.json(
      { success: false, message: "Missing required fields" },
      { status: 400 }
    );
  }

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
