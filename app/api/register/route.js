import { NextResponse } from 'next/server';

import connectMongo from '../../../libs/mongoConfig';
import User from '../../../models/UserSchema';

export async function POST(req){
    await connectMongo();
    const info = req;

    console.log(info);
}