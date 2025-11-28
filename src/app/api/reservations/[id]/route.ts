import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/auth-client";
import { ReservationService } from "@/lib/services/reservation.service";

export async function GET(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { data: session } = await getSession();

  if (!session?.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;
  const { id } = await ctx.params;

  try{
    const reservationDetail = await ReservationService.getReservationDetail(userId, id);

    if (!reservationDetail) {
      return NextResponse.json(
        {
          success: false,
          message: "Reservation Detail not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Reservation Detail found",
        data: reservationDetail
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