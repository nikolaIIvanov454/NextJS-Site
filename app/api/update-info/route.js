import { NextResponse } from "next/server";

import connectMongo from "@/libs/mongoConfig";
import User from "@/models/UserSchema";

export async function POST(req) {
  const data = await req.json();

  return NextResponse.json({ message: data }, {status: 200});
}
