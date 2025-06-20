import { Nav } from "@/components/Nav";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Nav></Nav>
      <div className="w-[90%] sm:w-[70%] my-6">{children}</div>
    </>
  );
}
