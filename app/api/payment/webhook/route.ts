import Stripe from "stripe";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-10-29.clover",
});

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");
  if (!sig) {
    return NextResponse.json({ error: "Missing Stripe signature" }, { status: 400 });
  }

 
  const body = await req.text();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("❌ Webhook signature verification failed:", err.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // Handle the successful checkout
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    console.log("✅ Payment successful:", session.id);

    const userId = session.metadata?.userId;
    const eventId = session.metadata?.eventId;
    const mode = session.mode;

    if (!userId) {
      console.warn("⚠️ No userId found in session metadata");
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    if (mode === "subscription") {
      // Subscription payment
      await prisma.user.update({
        where: { id: userId },
        data: {
          subscriptionActive: true,
          subscriptionCredits: 4, // give 4 credits
        },
      });
    } else if (mode === "payment" && eventId) {
      // One-time payment event join
      await prisma.eventParticipant.create({
        data: { userId, eventId },
      });
    }

    console.log("🎉 Database updated for user:", userId);
  }

  return NextResponse.json({ received: true });
}

export const config = {
  api: {
    bodyParser: false,
  },
};

