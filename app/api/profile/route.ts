'use server';

import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
    try {
        
    } catch (error) {
        console.error('Error fetching profile:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}