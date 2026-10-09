import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth-middleware";

export async function GET(request: NextRequest) {
  try {
    const authResult = await getAuthenticatedUser(request);
    if (!authResult) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized. Please provide a valid Bearer token or login.",
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          user: authResult.user.toSafeObject(),
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Get /me error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to retrieve current user session.",
      },
      { status: 500 }
    );
  }
}
