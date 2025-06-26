"use client";

import { emailOrderHistory } from "@/actions/orders";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

export default function MyOrdersPage() {
  const [data, action] = useActionState(emailOrderHistory, {});
  return (
    <div>
      <form action={action} className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>My Orders</CardTitle>
            <CardDescription>
              Enter your email and we will email you your order history and
              download links
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input type="email" required name="email" id="email" />
              {data.error && (
                <div className="text-destructive">{data.error}</div>
              )}
            </div>
          </CardContent>
          {data.message}
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="w-full" size="lg" disabled={pending} type="submit">
      {pending ? "Sending..." : "Send"}
    </Button>
  );
}
