import PageHeader from "../../_components/PageHeader";
import { ProductForm } from "../_components/ProductForm";

export default async function CreateProductpage() {
  return (
    <>
      <PageHeader>Create Products</PageHeader>
      <ProductForm />
    </>
  );
}
