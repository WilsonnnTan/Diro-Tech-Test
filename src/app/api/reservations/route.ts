import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/auth-client";
import { CourtService } from "@/lib/services/court.service";

export async function GET(req: NextRequest) {
  const { data: session } = await getSession();

  if (!session?.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try{
    // later implement DTO if have time
    const courts = await CourtService.getAllCourt();

    return NextResponse.json(
      {
        success: true,
        data: courts
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