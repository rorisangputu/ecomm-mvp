import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Tailwind,
} from "@react-email/components";
import { OrderInformation } from "./components/OrderInformation";

type PurchaseReceiptEmailProps = {
  product: {
    name: string;
    imagePath: string;
    description: string;
  };
  order: { id: string; createdAt: Date; pricePaidInCents: number };
  downloadVerifactionId: string;
};

PurchaseReceiptEmail.PreviewProps = {
  product: {
    name: "Product 1",
    imagePath:
      "/products/6f379702-4bf4-4f89-b712-9a5d8ba722ba-cuba-gooding-jr-arrested.jpg",
    description: "Something something",
  },
  order: {
    id: crypto.randomUUID(),
    createdAt: new Date(),
    pricePaidInCents: 290000,
  },
  downloadVerifactionId: crypto.randomUUID(),
} satisfies PurchaseReceiptEmailProps;

export default function PurchaseReceiptEmail({
  product,
  order,
  downloadVerifactionId,
}: PurchaseReceiptEmailProps) {
  return (
    <Html>
      <Preview>Download {product.name} and view receipt</Preview>
      <Tailwind>
        <Head />
        <Body className="font-sans bg-white">
          <Container className="max-w-xl">
            <Heading>Purchase Receipt</Heading>
            <OrderInformation
              order={order}
              product={product}
              downloadVerifactionId={downloadVerifactionId}
            />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
