"use client";

import { LucideLoaderCircle } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

export const SubmitButton = ({ label }: { label: string }) => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit">
      {pending && <LucideLoaderCircle className="w-4 h-4 animate-spin" />}
      {label}
    </Button>
  );
};
