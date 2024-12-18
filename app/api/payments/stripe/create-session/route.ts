import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { stripeCheckout } from '@/lib/stripe';

type PaymentSessionRequestBody = {
  priceId: string;
  successUrl: string;
  cancelUrl: string;
  mode: 'subscription' | 'payment';
};

export async function POST(request: Request) {
  try {
    const body: PaymentSessionRequestBody = await request.json();

    const { priceId, successUrl, cancelUrl, mode } = body;

    const session = await stripeCheckout.createPaymentSession({
      priceId,
      successUrl,
      cancelUrl,
      mode,
    });

    if (!session || !session.id || !session.url) {
      return NextResponse.json(
        { success: false, message: 'Failed to create payment session' },
        { status: 500 },
      );
    }

    await prisma.payment.create({
      data: {
        amount: 0,
        paymentStatus: 'pending',
        userId: 1, // Replace with actual user ID
        blogId: 1, // Replace with actual blog ID
        paymentDate: new Date(),
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Payment session created successfully',
        data: { sessionId: session.id, sessionUrl: session.url },
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error('Error creating payment session:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error', data: error },
      { status: 500 },
    );
  }
}