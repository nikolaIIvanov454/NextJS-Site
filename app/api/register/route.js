import { NextResponse } from 'next/server';

import connectMongo from '../../../libs/mongoConfig';
import User from '../../../models/UserSchema';

import argon2 from 'argon2';

export async function POST(req){
    const { email, password } = await req.json();
    await connectMongo();

    const alreadyRegisteredUser = await User.findOne({email: email});

    if(alreadyRegisteredUser){
        return NextResponse.json('User is already registered!');
    }

    const hashedPassword = await argon2.hash(password);
    
    User.create({email: email, password: hashedPassword});

    return NextResponse.json('User successfully registered!');
}   