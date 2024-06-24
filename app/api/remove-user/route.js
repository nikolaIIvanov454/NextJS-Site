import connectMongo from "@/libs/mongoConfig";
import User from "@/models/UserSchema";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  await connectMongo();

  const users = await User.find();

  return NextResponse.json({ users: users });
}
