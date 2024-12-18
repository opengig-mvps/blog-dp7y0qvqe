import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

type BlogRequestBody = {
  title: string;
  content: string;
  mediaUrl?: string;
};

export async function POST(request: Request) {
  try {
    const body: BlogRequestBody = await request.json();
    const { title, content, mediaUrl } = body;

    if (!title || !content) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 },
      );
    }

    const userId = 1;
    const user = await prisma.user.findFirst({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not authenticated' },
        { status: 401 },
      );
    }

    const blog = await prisma.blog.create({
      data: {
        title,
        content,
        mediaUrl,
        authorId: userId,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Blog created successfully',
        data: {
          id: blog.id,
          title: blog.title,
          content: blog.content,
          mediaUrl: blog.mediaUrl,
          authorId: blog.authorId,
          createdAt: blog.createdAt.toISOString(),
          updatedAt: blog.updatedAt.toISOString(),
        },
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error('Error creating blog:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error', data: error },
      { status: 500 },
    );
  }
}