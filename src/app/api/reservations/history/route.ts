import { NextRequest, NextResponse } from "next/server";
import { ReservationService } from "@/lib/services/reservation.service";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
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

  } catch(err: any) {
    return NextResponse.json(
      {
        success: false,
        message: err.message || "Internal Server Error" ,
      },
      { status: 500 }
    );
  }
}