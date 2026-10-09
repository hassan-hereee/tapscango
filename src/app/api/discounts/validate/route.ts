import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { code, subtotal = 0 } = body;

    if (!code || typeof code !== "string") {
      return NextResponse.json(
        { valid: false, error: "Please enter a discount code." },
        { status: 400 }
      );
    }

    const cleanCode = code.trim().toUpperCase();

    if (cleanCode === "TAPSCAN10") {
      const discountAmount = Math.round(subtotal * 0.1);
      return NextResponse.json({
        valid: true,
        code: cleanCode,
        discountType: "percentage",
        discountAmount,
        message: "10% Launch Discount Applied! 🎉",
      });
    }

    if (cleanCode === "LAUNCHFREE") {
      return NextResponse.json({
        valid: true,
        code: cleanCode,
        discountType: "free_shipping",
        discountAmount: 250,
        message: "Free Nationwide Shipping Applied! 🚚",
      });
    }

    if (cleanCode === "SAVE500") {
      if (subtotal < 4000) {
        return NextResponse.json({
          valid: false,
          error: "Code SAVE500 requires a minimum order of Rs. 4,000.",
        });
      }
      return NextResponse.json({
        valid: true,
        code: cleanCode,
        discountType: "fixed",
        discountAmount: 500,
        message: "Flat Rs. 500 Discount Applied! 🔥",
      });
    }

    return NextResponse.json({
      valid: false,
      error: "Coupon code is invalid or has expired.",
    });
  } catch (error: any) {
    return NextResponse.json(
      { valid: false, error: error.message || "Failed to validate code." },
      { status: 500 }
    );
  }
}
