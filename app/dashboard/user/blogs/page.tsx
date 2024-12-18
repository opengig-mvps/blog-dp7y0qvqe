"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios, { isAxiosError } from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { LoaderCircleIcon } from "lucide-react";

interface Blog {
  id: number;
  title: string;
  content: string;
  mediaUrl: string;
  authorId: number;
  createdAt: string;
  updatedAt: string;
}

const BlogListingPage: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [accessGranted, setAccessGranted] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/blogs");
        setBlogs(response?.data?.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const checkAccess = async (blogId: number) => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/blogs/${blogId}/access`);
      setAccessGranted((prev) => ({ ...prev, [blogId]: response?.data?.data?.accessGranted }));
      if (!response?.data?.data?.accessGranted) {
        toast.error("You need to make a payment to access this blog.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async (blogId: number) => {
    try {
      const response = await axios.post("/api/payments/stripe/create-session", {
        priceId: "price_1Hh1XYZ2eZvKYlo2CVLw",
        successUrl: `${window.location.origin}/dashboard/user/blogs`,
        cancelUrl: `${window.location.origin}/dashboard/user/blogs`,
        mode: "payment",
      });
      window.location.href = response?.data?.data?.sessionUrl;
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message ?? "Something went wrong");
      } else {
        console.error(error);
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Blogs</h1>
      <div className="grid gap-8 lg:grid-cols-3">
        {loading ? (
          <div className="flex justify-center items-center w-full">
            <LoaderCircleIcon className="animate-spin h-8 w-8" />
          </div>
        ) : (
          blogs?.map((blog) => (
            <Card key={blog?.id}>
              <CardHeader>
                <CardTitle>{blog?.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{blog?.content?.substring(0, 100)}...</p>
                <img src={blog?.mediaUrl} alt={blog?.title} className="w-full h-48 object-cover rounded-t-lg mt-4" />
              </CardContent>
              <CardFooter>
                {accessGranted?.[blog?.id] ? (
                  <Button onClick={() => router.push(`/dashboard/user/blogs/${blog?.id}`)}>Read More</Button>
                ) : (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button onClick={() => checkAccess(blog?.id)}>Check Access</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Payment Required</AlertDialogTitle>
                        <AlertDialogDescription>
                          You need to make a payment to access this blog. Do you want to proceed?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogAction onClick={() => handlePayment(blog?.id)}>Proceed to Payment</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default BlogListingPage;