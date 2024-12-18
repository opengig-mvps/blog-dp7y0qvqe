import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from 'next-auth/react';

type BlogRequestBody = {
  title: string;
  content: string;
  mediaUrl?: string;
};

export async function DELETE(
  request: Request,
  { params }: { params: { blogId: string } },
) {
  try {
    const session: any = await getSession();

    if (!session) {
      return NextResponse.json(
        { success: false, message: 'User not authenticated' },
        { status: 401 },
      );
    }

    const blogId = parseInt(params.blogId, 10);
    if (isNaN(blogId)) {
      return NextResponse.json(
        { success: false, message: 'Invalid blog ID' },
        { status: 400 },
      );
    }

    const blog = await prisma.blog.findFirst({
      where: { id: blogId, authorId: session?.user?.id },
    });

    if (!blog) {
      return NextResponse.json(
        { success: false, message: 'Blog not found or user not authorized' },
        { status: 404 },
      );
    }

    await prisma.blog.delete({
      where: { id: blogId },
    });

    return NextResponse.json(
      { success: true, message: 'Blog deleted successfully' },
      { status: 200 },
    );
  } catch (error: any) {
    console.error('Error deleting blog:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 },
    );
  }
}

export async function PUT(
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

    const body: BlogRequestBody = await request.json();
    const { title, content, mediaUrl } = body;

    if (!title || !content) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 },
      );
    }

    const session: any = await getSession();
    if (!session) {
      return NextResponse.json(
        { success: false, message: 'User not authenticated' },
        { status: 401 },
      );
    }

    const user = await prisma.user.findFirst({
      where: { id: session?.user?.id },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not authenticated' },
        { status: 401 },
      );
    }

    const blog = await prisma.blog.findFirst({
      where: { id: blogId },
    });

    if (!blog) {
      return NextResponse.json(
        { success: false, message: 'Blog not found' },
        { status: 404 },
      );
    }

    if (blog?.authorId !== user?.id) {
      return NextResponse.json(
        { success: false, message: 'User is not the author of the blog' },
        { status: 403 },
      );
    }

    await prisma.blog.update({
      where: { id: blogId },
      data: {
        title,
        content,
        mediaUrl,
        updatedAt: new Date(),
      },
    });

    const responseBlog = await prisma.blog.findFirst({
      where: { id: blogId },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Blog updated successfully',
        data: {
          id: responseBlog?.id,
          title: responseBlog?.title,
          content: responseBlog?.content,
          mediaUrl: responseBlog?.mediaUrl,
          authorId: responseBlog?.authorId,
          createdAt: responseBlog?.createdAt?.toISOString(),
          updatedAt: responseBlog?.updatedAt?.toISOString(),
        },
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error('Error updating blog:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error', data: error },
      { status: 500 },
    );
  }
}