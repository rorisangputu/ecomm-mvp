import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import db from "@/db/db";
import { formatCurrency, formatNumber } from "@/lib/formatter";

async function getSalesData() {
  //Gets total num of sales and how much we've made
  const sales = await db.order.aggregate({
    _sum: { pricePaidInCents: true },
    _count: true,
  });
  await wait(2000);
  return {
    amount: (sales._sum.pricePaidInCents || 0) / 100,
    numOfSales: sales._count,
  };
}

function wait(dur: number) {
  return new Promise((resolve) => setTimeout(resolve, dur));
}

async function getUserData() {
  //Parallel asynchronous operations
  const [customerCount, orderData] = await Promise.all([
    db.user.count(),
    db.order.aggregate({
      _sum: { pricePaidInCents: true },
    }),
  ]);

  return {
    customerCount,
    averageValuePerUser:
      customerCount === 0
        ? 0
        : (orderData._sum.pricePaidInCents || 0) / customerCount / 100,
  };
}

async function getProductData() {
  const [activeCount, inactiveCount] = await Promise.all([
    await db.product.count({ where: { isAvailableForPurchase: true } }),
    await db.product.count({ where: { isAvailableForPurchase: false } }),
  ]);

  return {
    activeCount,
    inactiveCount,
  };
}

export default async function AdminDashboard() {
  //Parallel asynchronous operations
  const [salesData, customerData, productData] = await Promise.all([
    getSalesData(),
    getUserData(),
    getProductData(),
  ]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <DashboardCard
        title="Sales"
        subtitle={`${formatNumber(salesData.numOfSales)} Orders`}
        body={`Sales amount: ${formatCurrency(salesData.amount)}`}
      />
      <DashboardCard
        title="Customers"
        subtitle={`${formatCurrency(
          customerData.averageValuePerUser
        )} Average Value Per Customer`}
        body={`${formatNumber(customerData.customerCount)} Customers`}
      />
      <DashboardCard
        title="Active Products"
        subtitle={`${formatNumber(productData.inactiveCount)} Inactive`}
        body={`${formatNumber(productData.activeCount)} Active`}
      />
    </div>
  );
}

type DashboardCardProps = {
  title: string;
  subtitle: string;
  body: string;
};

function DashboardCard({ title, subtitle, body }: DashboardCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>

      <CardContent>
        <p>{body}</p>
      </CardContent>
    </Card>
  );
}
