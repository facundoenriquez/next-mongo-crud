import { NextResponse } from 'next/server';
import { connectDB } from '@/utils/mongoose';

export function GET() {
    connectDB();
    return NextResponse.json({
        message: 'Hello World',
    });
}

export function POST() {
    return NextResponse.json({
        message: 'le mando por post',
    });
}
