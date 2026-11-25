import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createOrder } from "@/lib/db";
import {
  FrameType,
  BackgroundType,
  HookFinish,
  frames,
  backgrounds,
  hookFinishes,
  calculatePrice,
} from "@/lib/products";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { frame, background, paspartou, hookCount, hookFinish, photoCount } = body as {
      frame: FrameType;
      background: BackgroundType;
      paspartou?: BackgroundType;
      hookCount: number;
      hookFinish: HookFinish;
      photoCount?: number;
    };

    const frameOption = frames.find((f) => f.id === frame);
    const bgOption = backgrounds.find((b) => b.id === background);
    const hookOption = hookFinishes.find((h) => h.id === hookFinish);

    if (!frameOption || !bgOption || !hookOption || hookCount < 1 || hookCount > 4) {
      return NextResponse.json({ error: "Configuración inválida" }, { status: 400 });
    }

    const { total } = calculatePrice(frame, background, hookCount, hookFinish);

    const description = `Marco ${frameOption.name}, Fondo ${bgOption.name}, ${hookCount} gancho(s) ${hookOption.name}`;

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Portallaves BITUCS personalizado",
              description,
            },
            unit_amount: Math.round(total * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_creation: "always",
      success_url: `${request.nextUrl.origin}/exito?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}/configurador`,
      metadata: {
        frame,
        background,
        paspartou: paspartou || "",
        hookCount: String(hookCount),
        hookFinish,
        photoCount: String(photoCount || 2),
      },
    });

    // Save order to database (non-blocking)
    await createOrder({
      stripeSessionId: session.id,
      customerEmail: "",
      frame,
      background,
      paspartou: paspartou || null,
      hookCount,
      hookFinish,
      photoCount: photoCount || 2,
      totalPrice: total,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Error al crear la sesión de pago" },
      { status: 500 }
    );
  }
}
