import { NextResponse, NextRequest } from "next/server";
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
  apiVersion: "2023-08-16",
});

export async function POST(request: NextRequest) {
  const data: any = await request.json();
  const { amount } = data;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(amount),
      currency: "INR",
    });
    return new NextResponse(paymentIntent.client_secret, { status: 200 });
  } catch (error: any) {
    return new NextResponse(error, {
      status: 400,
    });
  }
}
