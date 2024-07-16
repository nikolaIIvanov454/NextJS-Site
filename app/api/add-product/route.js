import mongoConfig from "@/libs/mongoConfig";

import Product from "@/models/ProductSchema";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import { join } from "path";

export async function POST(req) {
  await mongoConfig();

  const data = await req.formData();

  const name = data.get("name");
  const image = data.get("image");
  const price = data.get("price");
  const type = data.get("type");
  const description = data.get("description");

  const currentMaxProductID = await Product.countDocuments({});

  const buffer = Buffer.from(await image.arrayBuffer());

  await writeFile(
    join(`${process.cwd()}/public/product-uploads/${image.name}`),
    buffer
  );

  Product.create({
    id: currentMaxProductID + 1,
    name: name,
    price: price,
    imageUrl: [`/product-uploads/${image.name}`],
    type: type,
    description: description,
  });

  return NextResponse.json({ message: "Успешно добавяне" });
}
