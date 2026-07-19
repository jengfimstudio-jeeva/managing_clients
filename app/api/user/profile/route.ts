import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { hash } from "bcrypt";
import { getServerSession } from "next-auth/next";

export async function PUT(req: Request) {
  try {
    await dbConnect();
    const session = await getServerSession();

    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, email, newPassword } = body;

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (newPassword && newPassword.length >= 6) {
      user.passwordHash = await hash(newPassword, 10);
    }

    await user.save();

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
