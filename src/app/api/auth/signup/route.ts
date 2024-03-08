import User from '@/models/user';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/utils/mongoose';

export async function POST(request: Request) {
    const { fullname, email, password } = await request.json();

    if (password.length < 6)
        return NextResponse.json(
            {
                message: 'Password must be at least 6 characters',
            },
            {
                status: 400,
            }
        );

    try {
        connectDB();
        const userFound = await User.findOne({ email });
        if (userFound)
            return NextResponse.json(
                {
                    message: 'Email already exists',
                },
                {
                    status: 400,
                }
            );

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = new User({
            email,
            fullname,
            password: hashedPassword,
        });

        const savedUser = await user.save();

        return NextResponse.json({
            _id: savedUser._id,
            email: savedUser.email,
            fullname: savedUser.fullname,
        });
    } catch (error) {
        return NextResponse.json(
            {
                message: error.message,
            },
            {
                status: 400,
            }
        );
    }
}
