import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // Get the user's IP address from the request headers
  let ip = req.headers.get('x-forwarded-for') || req.ip || req.headers.get('x-real-ip') || 'UNKNOWN_IP';
  // let ip = `31.220.22.206` || req.headers.get('x-forwarded-for') || req.ip || req.headers.get('x-real-ip') || 'UNKNOWN_IP';
  // let ip = `103.230.244.10` || req.headers.get('x-forwarded-for') || req.ip || req.headers.get('x-real-ip') || 'UNKNOWN_IP';

  // If the x-forwarded-for header contains multiple IPs, use the first one
  if (ip.includes(',')) {
    ip = ip.split(',')[0].trim();
  }

  try {
    // Fetch the location data dynamically using the user's IP address
    const response = await fetch(`https://ipinfo.io/${ip}/json?token=${process.env.NEXT_PUBLIC_IP_INFO_TOKEN}`);
    
    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch location data' }, { status: 500 });
    }

    const data = await response.json();

    // Return the relevant information
    return NextResponse.json({
      ip: data.ip,
      city: data.city || 'Unknown',
      region: data.region || 'Unknown',
      country: data.country || 'Unknown',
    });

  } catch (error) {
    console.error('Error fetching location data:', error);
    return NextResponse.json({ error: 'Error fetching location data' }, { status: 500 });
  }
}
