import { NextResponse } from "next/server";

import connectMongo from "@/libs/mongoConfig";
import User from "@/models/UserSchema";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { writeFile } from "fs/promises";
import { join } from "path";

export async function POST(req) {
  await connectMongo();
  const data = await req.formData();

  const username = data.get("username");
  const email = data.get("email");
  const image = data.get("image");

  const session = await getServerSession(authOptions);

  if (!image) {
    return NextResponse.json({ error: "No images received." }, { status: 400 });
  }

  const buffer = Buffer.from(await image.arrayBuffer());

  await writeFile(
    join(`${process.cwd()}/public/picture-uploads/`, image.name),
    buffer
  );

  if (session.accessToken.provider !== "google") {
    const user = await User.findOneAndUpdate({ name: session.user.name });

    user.username = username;
    user.email = email;

    await user.save();

    return NextResponse.json({ message: "Success!" }, { status: 200 });
  }

  return NextResponse.json(
    { message: "Third party authentication doesn't support this feature." },
    { status: 200 }
  );
}
