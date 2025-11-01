import Stripe from "stripe";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-10-29.clover",
});

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature")!;
  const body = await req.text();

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );


    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      console.log("✅ Payment successful:", session);

      const userId = session.metadata?.userId;
      const eventId = session.metadata?.eventId;
      const mode = session.mode;

      if (userId && eventId) {
        await prisma.eventParticipant.create({
          data: {
            userId,
            eventId,
          },
        });

        if (mode === "subscription") {
          await prisma.user.update({
            where: { id: userId },
            data: { subscriptionActive: true },
          });
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("❌ Webhook error:", err);
    return NextResponse.json({ error: "Webhook signature verification failed" }, { status: 400 });
  }
}

export const config = {
  api: {
    bodyParser: false, 
  },
};
