import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { updateOrderBySessionId } from "@/lib/db";
import { sendOrderConfirmation } from "@/lib/email";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error("Webhook signature verification failed:", error);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    // Update order in database
    await updateOrderBySessionId(session.id, {
      status: "paid",
      customerEmail: session.customer_details?.email || "",
      customerName: session.customer_details?.name || null,
    });

    // Send confirmation email
    if (session.customer_details?.email) {
      await sendOrderConfirmation({
        to: session.customer_details.email,
        customerName: session.customer_details.name || "Cliente",
        frame: session.metadata?.frame || "",
        background: session.metadata?.background || "",
        hookCount: Number(session.metadata?.hookCount || 2),
        hookFinish: session.metadata?.hookFinish || "",
        total: (session.amount_total || 0) / 100,
      });
    }
  }

  return NextResponse.json({ received: true });
}
