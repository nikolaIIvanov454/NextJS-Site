import { NextResponse } from "next/server";

import connectMongo from "@/libs/mongoConfig";
import User from "@/models/UserSchema";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req) {
  await connectMongo();
  const data = await req.json();

  const session = await getServerSession(authOptions);

  if (session.accessToken.provider !== "google") {
    const user = await User.findOneAndUpdate({ name: session.user.name });

    user.username = data.username;
    user.email = data.email;
    console.log(session);

    await user.save();

    return NextResponse.json({ message: "Success!" }, { status: 200 });
  }

  return NextResponse.json(
    { message: "Third party authentication doesn't support this feature." },
    { status: 200 }
  );
}
