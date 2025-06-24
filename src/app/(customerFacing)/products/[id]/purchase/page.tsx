import db from "@/db/db";
import { notFound } from "next/navigation";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
export default async function PurchasePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await db.product.findUnique({
    where: { id },
  });

  if (product == null) return notFound();
  return (
    <div>
      <h1>Hii {id}</h1>
    </div>
  );
}
