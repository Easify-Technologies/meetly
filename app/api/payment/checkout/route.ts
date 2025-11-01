// app/api/payment/checkout/route.ts
import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { mode, userId, eventId } = await req.json();

    if (!userId || !eventId) {
      return NextResponse.json({ error: "Missing userId or eventId" }, { status: 400 });
    }

    const lineItems =
      mode === "payment"
        ? [
          {
            price_data: {
              currency: "usd",
              product_data: { name: "Single Event Ticket" },
              unit_amount: 2000, // $20
            },
            quantity: 1,
          },
        ]
        : [
          {
            price: "price_1SOaac36VJPIw1TcE0EJzxv9", //subscription price ID
            quantity: 1,
          },
        ];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode,
      line_items: lineItems,
      success_url: `${req.headers.get("origin")}/success`,
      cancel_url: `${req.headers.get("origin")}/cancel`,
      metadata: {
        userId,
        eventId,
      },
    });


    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
