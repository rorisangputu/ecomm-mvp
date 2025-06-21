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
  return {
    amount: (sales._sum.pricePaidInCents || 0) / 100,
    numOfSales: sales._count,
  };
}

async function getUserData() {
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

export default async function AdminDashboard() {
  const salesData = await getSalesData();
  const customerData = await getUserData();
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
