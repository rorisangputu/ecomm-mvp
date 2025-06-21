// ProductForm.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/formatter";
import { useActionState, useState } from "react";
import { AddProduct } from "../../_actions/actions";
import { useFormStatus } from "react-dom";

// Define the type for the flattened errors
type FormErrors = {
  formErrors: string[];
  fieldErrors: {
    name?: string[];
    description?: string[];
    priceInCents?: string[];
    file?: string[];
    image?: string[];
  };
};

// Initial state for useFormState
const initialState: FormErrors = {
  formErrors: [],
  fieldErrors: {},
};

export function ProductForm() {
  const [error, action] = useActionState(AddProduct, initialState); // Use the correct initialState
  const [priceInCents, setPriceInCents] = useState<number | undefined>();

  return (
    <form action={action} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input type="text" id="name" name="name" required />
        {error.fieldErrors.name && (
          <div className="text-destructive">
            {error.fieldErrors.name.join(", ")}
          </div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="priceInCents">Price In Cents</Label>
        <Input
          type="number"
          id="priceInCents"
          name="priceInCents"
          required
          value={priceInCents ?? ""}
          onChange={(e) => setPriceInCents(Number(e.target.value) || undefined)}
        />
        <div className="text-muted-foreground">
          {formatCurrency((priceInCents || 0) / 100)}
        </div>
        {error.fieldErrors.priceInCents && (
          <div className="text-destructive">
            {error.fieldErrors.priceInCents.join(", ")}
          </div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" required />
        {error.fieldErrors.description && (
          <div className="text-destructive">
            {error.fieldErrors.description.join(", ")}
          </div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="file">File</Label>
        <Input type="file" id="file" name="file" required />
        {error.fieldErrors.file && (
          <div className="text-destructive">
            {error.fieldErrors.file.join(", ")}
          </div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="image">Image</Label>
        <Input type="file" id="image" name="image" required />
        {error.fieldErrors.image && (
          <div className="text-destructive">
            {error.fieldErrors.image.join(", ")}
          </div>
        )}
      </div>
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving..." : "Save"}
    </Button>
  );
}
