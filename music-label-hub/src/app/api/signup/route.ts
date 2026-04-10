import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { emailOrMobile, password } = await req.json();

  // Validate email or mobile
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailOrMobile);
  const isMobile = /^(\+27|0)[6-8][0-9]{8}$/.test(emailOrMobile);

  if (!isEmail && !isMobile) {
    return NextResponse.json({ error: 'Invalid email or South African mobile number' }, { status: 400 });
  }

  if (password.length < 6) {
    return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
  }

  // In a real app, store in database with status 'pending'
  // For demo, just log
  console.log('New artist sign up:', { emailOrMobile, password, status: 'pending' });

  // Send approval email (placeholder)
  // In production, configure nodemailer with SMTP
  console.log('Sending approval email to admin');

  return NextResponse.json({ message: 'Sign up submitted, pending approval' });
}