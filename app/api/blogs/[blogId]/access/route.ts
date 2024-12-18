import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(
  request: Request,
  { params }: { params: { blogId: string } },
) {
  try {
    const blogId = parseInt(params.blogId, 10);
    if (isNaN(blogId)) {
      return NextResponse.json(
        { success: false, message: 'Invalid blog ID' },
        { status: 400 },
      );
    }

    const user = await prisma.user.findFirst({
      where: { id: 1 }, // Replace with actual user authentication logic
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not authenticated' },
        { status: 401 },
      );
    }

    const payment = await prisma.payment.findFirst({
      where: {
        userId: user.id,
        blogId: blogId,
        paymentStatus: 'verified',
      },
    });

    if (!payment) {
      return NextResponse.json(
        { success: false, message: 'Payment not verified' },
        { status: 403 },
      );
    }

    await prisma.blogAccess.updateMany({
      where: {
        userId: user.id,
        blogId: blogId,
      },
      data: {
        accessGranted: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Access granted',
        data: { accessGranted: true },
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error('Error granting access:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error', data: error },
      { status: 500 },
    );
  }
}