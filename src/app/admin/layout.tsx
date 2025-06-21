import { Nav, NavLink } from "@/components/Nav";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Nav>
        <NavLink href={"/admin"}>Dashboard</NavLink>
        <NavLink href={"/admin/products"}>Products</NavLink>
        <NavLink href={"/admin/orders"}>Sales</NavLink>
        <NavLink href={"/admin/customers"}>customers</NavLink>
      </Nav>
      <div className="w-[90%] sm:w-[70%] mx-auto my-6">{children}</div>
    </>
  );
}
