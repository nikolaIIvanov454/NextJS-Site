// pages/api/user/[username].js
import connectMongo from "@/libs/mongoConfig";
import User from "@/models/UserSchema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connectMongo();

  const session = await getServerSession(authOptions);

  if (session) {
    const user = await User.findOne({ username: session.user.name });

    if (user?.avatar && session.user.provider !== "google") {
      return NextResponse.json({ avatar: user.avatar });
    } else {
      return NextResponse.json({ avatar: session.user.image });
    }
  }

  return NextResponse.json({ status: 403 });
}
