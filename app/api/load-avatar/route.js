import connectMongo from "@/libs/mongoConfig";
import User from "@/models/UserSchema";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  await connectMongo();
  const session = await getServerSession(authOptions);

  if (session) {
    const user = await User.findOne({ username: session.user.name });

    if (user.avatar) {
      return NextResponse.json({ avatar: user.avatar });
    }
  }

  return NextResponse.json({ status: 403 });
}
