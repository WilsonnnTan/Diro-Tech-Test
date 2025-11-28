import { NextRequest, NextResponse } from "next/server";
import { ReservationService } from "@/lib/services/reservation.service";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";

export async function GET(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
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
        data: reservationDetail
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