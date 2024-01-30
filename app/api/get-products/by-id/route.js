import { NextResponse } from 'next/server';

import connectMongo from '@libs/mongoConfig';
import Product from '../../../../models/ProductShema';

export async function POST(req){
    await connectMongo();

    const id = req.id;
    const product = await Product.findOne(id).lean();

    return NextResponse.json({ product });
}