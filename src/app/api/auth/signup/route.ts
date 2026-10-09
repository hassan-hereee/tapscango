import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import { sendVerificationEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    // 1. Validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        {
          success: false,
          error: "Name is required and must be at least 2 characters long.",
        },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        {
          success: false,
          error: "A valid email address is required.",
        },
        { status: 400 }
      );
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email.trim().toLowerCase())) {
      return NextResponse.json(
        {
          success: false,
          error: "Please enter a valid email format.",
        },
        { status: 400 }
      );
    }

    if (!password || typeof password !== "string" || password.length < 6) {
      return NextResponse.json(
        {
          success: false,
          error: "Password must be at least 6 characters long.",
        },
        { status: 400 }
      );
    }

    // 2. Connect to MongoDB
    await connectToDatabase();

    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      if (existingUser.isEmailVerified) {
        return NextResponse.json(
          {
            success: false,
            error: "An account with this email already exists. Please login instead.",
          },
          { status: 409 }
        );
      }

      // Existing unverified user: update name & password, generate fresh verification token
      existingUser.name = name.trim();
      existingUser.password = password; // Will be hashed by pre-save hook
      const rawToken = existingUser.createEmailVerificationToken();
      await existingUser.save();

      const emailResult = await sendVerificationEmail({
        to: existingUser.email,
        name: existingUser.name,
        token: rawToken,
      });

      return NextResponse.json(
        {
          success: true,
          message:
            "Account exists but was unverified. A new verification link has been sent to your email.",
          data: {
            user: existingUser.toSafeObject(),
            // Included for seamless Postman testing in dev
            preview: {
              rawToken,
              verificationUrl: `/api/auth/confirm-email?token=${rawToken}`,
              emailMode: emailResult.mode,
            },
          },
        },
        { status: 200 }
      );
    }

    // 3. Create fresh user
    const newUser = new User({
      name: name.trim(),
      email: normalizedEmail,
      password,
    });

    const rawToken = newUser.createEmailVerificationToken();
    await newUser.save();

    const emailResult = await sendVerificationEmail({
      to: newUser.email,
      name: newUser.name,
      token: rawToken,
    });

    return NextResponse.json(
      {
        success: true,
        message:
          "Account created successfully! Please verify your email to complete registration.",
        data: {
          user: newUser.toSafeObject(),
          // Included for seamless Postman testing in dev
          preview: {
            rawToken,
            verificationUrl: `/api/auth/confirm-email?token=${rawToken}`,
            emailMode: emailResult.mode,
          },
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Signup error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "An unexpected error occurred during signup.",
      },
      { status: 500 }
    );
  }
}
