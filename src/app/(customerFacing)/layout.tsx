import { Nav, NavLink } from "@/components/Nav";

export const dynamic = "force-dynamic"; //Not caching admin page
//force all admin page to be dynamic

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Nav>
        <NavLink href={"/"}>Home</NavLink>
        <NavLink href={"/products"}>Products</NavLink>
        <NavLink href={"/orders"}>My Orders</NavLink>
      </Nav>
      <div className="w-[90%] xl:w-[70%] mx-auto my-6">{children}</div>
    </>
  );
}
