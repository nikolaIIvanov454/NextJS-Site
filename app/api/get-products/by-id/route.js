import { NextResponse } from 'next/server';

import connectMongo from '@libs/mongoConfig';
import Product from '../../../../models/ProductShema';

export async function POST(req){
    const _id = await req.json();

    await connectMongo();

    const product = await Product.findOne({ _id: _id }).lean();

    return NextResponse.json({ product });
}