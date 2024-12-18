"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import axios, { isAxiosError } from "axios";
import { toast } from "sonner";
import { LoaderCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import api from "@/lib/api";

const PaymentPage = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState<boolean>(false);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const payload = {
        priceId: "price_12345", // Example price ID
        successUrl: `${window.location.origin}/dashboard/user/payment-success`,
        cancelUrl: `${window.location.origin}/dashboard/user/payment-cancel`,
        mode: "payment",
      };

      const response = await api.post("/api/payments/stripe/create-session", payload);

      if (response?.data?.success) {
        window.location.href = response?.data?.data?.sessionUrl;
      }
    } catch (error: any) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data?.message ?? "Something went wrong");
      } else {
        console.error(error);
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 p-8">
      <h2 className="text-2xl font-bold mb-6">Access All Blogs</h2>
      <Card>
        <CardHeader>
          <CardTitle>Payment Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Amount</Label>
            <Input value="$10.00" readOnly />
          </div>
          {paymentStatus && (
            <Alert>
              <AlertTitle>{paymentStatus === "success" ? "Success!" : "Error!"}</AlertTitle>
              <AlertDescription>
                {paymentStatus === "success"
                  ? "Payment completed successfully. You now have access to all blogs."
                  : "Payment failed. Please try again."}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handlePayment} disabled={loading} variant="outline">
            {loading ? <LoaderCircleIcon className="animate-spin" /> : "Pay $10"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PaymentPage;