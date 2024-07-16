import { NextResponse } from 'next/server';

import connectMongo from '../../../libs/mongoConfig';
import Product from '../../../models/ProductSchema';


export async function GET(){
  await connectMongo();
  const products = await Product.find();
  return NextResponse.json({ products });
}
