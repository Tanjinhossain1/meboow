// src/app/api/get-services/route.ts

import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
    const params = new URLSearchParams({
        key: process.env.NEXT_PUBLIC_FOLLOWER_SERVICES_KEY!,  // Your API key
        action: 'services',
    });

    try {
        const response = await axios.post(process.env.NEXT_PUBLIC_FOLLOWER_SERVICES_URL!, params.toString(), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        return NextResponse.json(response.data);
    } catch (error) {
        console.error('Error fetching services:', error);
        return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
    }
}
