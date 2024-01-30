import { NextResponse } from 'next/server';
import connectMongo from '../../../libs/mongoConfig';
import Product from '../../../models/ProductShema';

export async function GET(){
    await connectMongo();

    const test = new Product({
        id: 5,
        name: "hello",
        price: "hello",
        imageUrl: ["hello","hello","hello"], 
        type: "hello",
        description: "hello"
    })
    await test.save()
    return NextResponse.json({done: true});
}