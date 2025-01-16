"use client";
import { useState } from "react";

export default function ViewProductPage({
  params,
}: {
  params: { id: string };
}) {
  const [product, setProduct] = useState<any>({});

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">View Product</h1>
    </div>
  );
}
