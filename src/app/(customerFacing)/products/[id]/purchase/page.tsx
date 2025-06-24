export default async function PurchasePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div>
      <h1>Hii {id}</h1>
    </div>
  );
}
