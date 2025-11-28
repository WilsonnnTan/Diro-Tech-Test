import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/auth-client";
import { ReservationService } from "@/lib/services/reservation.service";

export async function GET(req: NextRequest) {
  const { data: session } = await getSession();

  if (!session?.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  try{
    // later implement DTO if have time
    const reservations = await ReservationService.getAllReservationByUserId(userId);

    return NextResponse.json(
      {
        success: true,
        data: reservations
      },
      { status: 200 }
    );

  } catch(err) {
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}