import { NextResponse } from "next/server";

import connectMongo from "../../../libs/mongoConfig";

import User from "../../../models/UserSchema";

import argon2 from "argon2";

export async function POST(req) {
  const { username, email, password } = await req.json();
  await connectMongo();

  const user = await User.findOne({ email: email });

  if (!user) {
    return NextResponse.json("Login is unsuccessful.", { status: 401 });
  } else {
    try {
      const passwordMatch = await argon2.verify(user.password, password);

      if (!passwordMatch) {
        return NextResponse.json("Invalid password.", { status: 401 });
      }

      req.session.set("user", {
        username: username,
        email: email,
        password: password,
      });
      await req.session.save();

      return NextResponse.json(
        { message: "Login is successful.", token: token },
        { status: 200 }
      );
    } catch (error) {
      console.error("An error occured:", error);
      return NextResponse.json("Server Error.", { status: 500 });
    }
  }
}
