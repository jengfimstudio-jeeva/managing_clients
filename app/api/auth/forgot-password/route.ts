import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { hash } from "bcrypt";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { action, email, code, newPassword } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "No account found with that email." }, { status: 404 });
    }

    if (action === "send_code") {
      // Generate 6 digit code
      const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
      
      // Expire in 15 mins
      const expiry = new Date();
      expiry.setMinutes(expiry.getMinutes() + 15);

      user.resetCode = generatedCode;
      user.resetCodeExpiry = expiry;
      await user.save();

      // Return the code so the frontend can simulate the email sending experience for the demo
      return NextResponse.json({ success: true, code: generatedCode });
    }

    if (action === "verify_code") {
      if (!code || user.resetCode !== code) {
        return NextResponse.json({ error: "Invalid verification code." }, { status: 400 });
      }
      if (user.resetCodeExpiry < new Date()) {
        return NextResponse.json({ error: "Verification code has expired." }, { status: 400 });
      }

      return NextResponse.json({ success: true });
    }

    if (action === "reset_password") {
      if (!code || user.resetCode !== code) {
        return NextResponse.json({ error: "Invalid verification code." }, { status: 400 });
      }
      if (user.resetCodeExpiry < new Date()) {
        return NextResponse.json({ error: "Verification code has expired." }, { status: 400 });
      }
      if (!newPassword || newPassword.length < 6) {
        return NextResponse.json({ error: "Password must be at least 6 characters." }, { status: 400 });
      }

      const hashedPassword = await hash(newPassword, 10);
      user.passwordHash = hashedPassword;
      user.resetCode = undefined;
      user.resetCodeExpiry = undefined;
      await user.save();

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
