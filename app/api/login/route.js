import { NextResponse } from 'next/server';

import connectMongo from '../../../libs/mongoConfig';

import User from '../../../models/UserSchema';

export async function POST(req) {
    const { email, password } = await req.json();
    await connectMongo();

    if (!email || !password) {
        return new NextResponse('Login is unsuccessful.', { status: 400 });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
        return new NextResponse('Login is unsuccessful.', { status: 404 });
    }

    if (user.password !== password) {
        return new NextResponse('Login is unsuccessful.', { status: 401 });
    }

    return new NextResponse('Login is successful.', { status: 200 });
}