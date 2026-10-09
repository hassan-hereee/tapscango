import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Order, { generateOrderNumber, IOrderItem } from "@/models/Order";
import { getAuthenticatedUser } from "@/lib/auth-middleware";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { customer, items, paymentMethod = "cod", notes, discountCode } = body;

    // 1. Validation
    if (!customer || !customer.name || !customer.phone || !customer.address || !customer.city) {
      return NextResponse.json(
        {
          success: false,
          error: "Please provide complete delivery details (Name, Phone, Address, City).",
        },
        { status: 400 }
      );
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Your cart is empty. Please add items before checking out.",
        },
        { status: 400 }
      );
    }

    // 2. Connect to Database
    await connectToDatabase();

    // 3. Calculate Prices & Discounts
    const subtotal = items.reduce(
      (sum: number, item: IOrderItem) => sum + Number(item.price) * Number(item.quantity),
      0
    );

    let shippingFee = subtotal >= 3000 ? 0 : 250;
    let discount = 0;
    const cleanCode = (discountCode || "").trim().toUpperCase();

    if (cleanCode === "TAPSCAN10") {
      discount = Math.round(subtotal * 0.1); // 10% off
    } else if (cleanCode === "LAUNCHFREE") {
      shippingFee = 0; // Free delivery
    } else if (cleanCode === "SAVE500" && subtotal >= 4000) {
      discount = 500; // Rs 500 flat off
    }

    const total = Math.max(0, subtotal + shippingFee - discount);

    // 4. Check for logged-in user session
    const authResult = await getAuthenticatedUser(request);
    const userId = authResult?.user?._id || null;

    // 5. Generate unique human-readable order number
    let orderNumber = generateOrderNumber();
    let existing = await Order.findOne({ orderNumber });
    while (existing) {
      orderNumber = generateOrderNumber();
      existing = await Order.findOne({ orderNumber });
    }

    // 6. Create Order
    const newOrder = new Order({
      orderNumber,
      user: userId,
      customer: {
        name: customer.name.trim(),
        email: (customer.email || "guest@tapscan.pk").trim().toLowerCase(),
        phone: customer.phone.trim(),
        address: customer.address.trim(),
        city: customer.city.trim(),
        province: customer.province || "Punjab",
        postalCode: customer.postalCode || "",
      },
      items,
      paymentMethod,
      paymentStatus: paymentMethod === "cod" ? "pending" : "pending",
      orderStatus: "placed",
      subtotal,
      shippingFee,
      discount,
      discountCode: cleanCode || undefined,
      total,
      notes: notes ? notes.trim() : "",
    });

    await newOrder.save();

    return NextResponse.json(
      {
        success: true,
        message: "Order placed successfully!",
        order: newOrder,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Order placement error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to process your order. Please try again.",
      },
      { status: 500 }
    );
  }
}

// GET /api/orders: Retrieve orders for currently logged in customer
export async function GET(request: NextRequest) {
  try {
    const authResult = await getAuthenticatedUser(request);
    if (!authResult) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectToDatabase();
    const orders = await Order.find({ user: authResult.user._id }).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, orders }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to retrieve orders." },
      { status: 500 }
    );
  }
}
