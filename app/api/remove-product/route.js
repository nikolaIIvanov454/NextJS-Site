import connectMongo from "@/libs/mongoConfig";
import Product from "@/models/ProductShema";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { id } = await req.json();

  await connectMongo();

  if (id) {
    await Product.deleteOne({ id: id });

    return NextResponse.json({ message: "Успешно изтриване" });
  }

  return NextResponse.json({ message: "Възникна грешка" });
}
