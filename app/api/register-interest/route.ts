import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, phone, message } = body;

  const content = `
    Name: ${name}
    Email: ${email}
    Phone: ${phone || 'Not provided'}
    Message: ${message || 'Not provided'}
  `;

  const msg = {
    to: 'support@spartanfuture.com', // Replace with your email
    from: 'support@spartanfuture.com', // Replace with your SendGrid verified sender
    subject: 'New Registration for Spartan Mini',
    text: content,
    html: content.replace(/\n/g, '<br>'),
  };

  try {
    await sgMail.send(msg);
    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Error sending email' }, { status: 500 });
  }
}
