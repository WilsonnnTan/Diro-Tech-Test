import { NextRequest, NextResponse } from "next/server";
import { TimeSlotService } from "@/lib/services/timeslot.service";
import { headers } from "next/headers";
import { auth } from "@/lib/auth/auth";

export async function GET(req: NextRequest,  ctx: { params: Promise<{ courtId: number, date: string }> }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

	const { courtId, date } = await ctx.params;

  const parsedCourtId = Number(courtId);
  if (isNaN(parsedCourtId)) {
    console.error("courtId not valid")
    return NextResponse.json(
      { success: false, message: "Invalid courtId" },
      { status: 400 }
    );
  }

  // Validate date
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) {
    console.error("date not valid")
    return NextResponse.json(
      {
        success: false,
        message: "Invalid date format on params. Use YYYY-MM-DD.",
      },
      { status: 400 }
    );
  };

  try{
    const availableTimeSlots = await TimeSlotService.getAvailableTimeSlots(date, parsedCourtId);

    return NextResponse.json(
      {
        success: true,
        data: availableTimeSlots
      },
      { status: 200 }
    );

  } catch(err: any) {
    return NextResponse.json(
      {
        success: false,
        message: err.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}