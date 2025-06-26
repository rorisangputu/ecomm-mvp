import db from "@/db/db";
import PurchaseReceiptEmail from "@/email/PurchaseReceipt";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const resend = new Resend(process.env.RESEND_API_KEY as string);
export async function POST(req: NextRequest) {
  const event = await stripe.webhooks.constructEvent(
    await req.text(),
    req.headers.get("stripe-signature") as string,
    process.env.STRIPE_WEBHOOK_SECRET as string
  );

  if (event.type === "charge.succeeded") {
    const charge = event.data.object;
    const productId = charge.metadata.productId;
    const email = charge.billing_details.email;
    const pricePaidInCents = charge.amount;

    const product = await db.product.findUnique({
      where: { id: productId },
    });
    if (product == null || email == null) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    const userFields = {
      email,
      orders: { create: { productId, pricePaidInCents } },
    };
    const {
      orders: [order],
    } = await db.user.upsert({
      where: { email },
      create: userFields,
      update: userFields,
      select: { orders: { orderBy: { createdAt: "desc" }, take: 1 } },
    });

    const downloadVerification = await db.downloadVerifaction.create({
      data: {
        productId,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
      },
    });

    try {
      await resend.emails.send({
        from: `Support <${process.env.SENDER_EMAIL}>`,
        to: email,
        subject: "Order Confirmation",
        react: (
          <PurchaseReceiptEmail
            product={product}
            order={order}
            downloadVerifactionId={downloadVerification.id}
          />
        ), // Replace with a proper template
      });
      console.log(`Email sent to ${email}`);
    } catch (error) {
      console.error("Failed to send email:", error);
      // Optionally, return an error response or log to a monitoring service
    }
  }
  return new NextResponse();
}
