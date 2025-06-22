import PageHeader from "@/app/admin/_components/PageHeader";
import { ProductForm } from "../../_components/ProductForm";
import db from "@/db/db";

export default async function EditProductpage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // Await params to resolve the Promise
  const product = await db.product.findUnique({ where: { id } });
  return (
    <>
      <PageHeader>Edit Products</PageHeader>
      <ProductForm product={product} />
    </>
  );
}
