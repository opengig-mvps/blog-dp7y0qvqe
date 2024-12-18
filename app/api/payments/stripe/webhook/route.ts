import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { stripe } from '@/lib/stripe';
import { sendEmail } from '@/lib/email-service';
import { Buffer } from 'node:buffer';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: Request) {
  try {
    const buf = await request.arrayBuffer();
    const sig = request.headers.get('stripe-signature') || '';

    let event;

    try {
      event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET!);
    } catch (err: any) {
      return NextResponse.json({ success: false, message: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent: any = event.data.object;
        await prisma.payment.updateMany({
          where: { id: parseInt(paymentIntent?.metadata?.paymentId) },
          data: { paymentStatus: 'succeeded' },
        });

        await sendEmail({
          to: paymentIntent?.receipt_email || '',
          template: {
            subject: 'Payment Successful',
            html: '<h1>Your payment was successful!</h1>',
            text: 'Your payment was successful!',
          },
        });
        break;

      case 'customer.subscription.created':
        const subscription: any = event.data.object;
        await prisma.blogAccess.updateMany({
          where: { userId: parseInt(subscription?.metadata?.userId), blogId: parseInt(subscription?.metadata?.blogId) },
          data: { accessGranted: true },
        });

        await sendEmail({
          to: subscription?.customer_email || '',
          template: {
            subject: 'Subscription Created',
            html: '<h1>Your subscription has been created!</h1>',
            text: 'Your subscription has been created!',
          },
        });
        break;

      default:
        return NextResponse.json({ success: false, message: 'Unhandled event type' }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: 'Webhook handled successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('Error handling webhook:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}