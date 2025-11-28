import { NextRequest, NextResponse } from "next/server";
import { CourtService } from "@/lib/services/court.service";
import { headers } from "next/headers";
import { auth } from "@/lib/auth/auth";

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });


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

export async function POST(req: NextRequest) {
  
}