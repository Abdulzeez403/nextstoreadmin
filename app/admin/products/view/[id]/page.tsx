"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProductFormModal } from "@/components/modal";
import { toast } from "@/components/ui/use-toast";

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
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>{product.title}</CardTitle>
            <ProductFormModal
              initialValues={{ ...product, images: product.images }}
              onSubmit={(formData) => {
                // Here you would typically make an API call to update the product
                console.log("Updating product:", Object.fromEntries(formData));
                toast({
                  title: "Product Updated",
                  description: `Product ${product.title} has been updated.`,
                });
                // After successfully updating the product, you might want to refresh the product data
              }}
              buttonText="Edit Product"
              modalTitle={`Edit Product: ${product.title}`}
            />
          </div>
          <CardDescription>Product ID: {product.id}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Image
                src={product.images[0]}
                alt={product.title}
                width={500}
                height={500}
                className="rounded-lg"
              />
            </div>
            <div className="space-y-4">
              <p>
                <strong>Price:</strong> ${product.price}
              </p>
              <p>
                <strong>Discounted Price:</strong> ${product.discountedPrice}
              </p>
              <p>
                <strong>Rating:</strong> {product.rating} ({product.reviewCount}{" "}
                reviews)
              </p>
              <p>
                <strong>In Stock:</strong> {product.inStock ? "Yes" : "No"}
              </p>
              <p>
                <strong>Description:</strong> {product.description}
              </p>
              <p>
                <strong>Sizes:</strong> {product.sizes.join(", ")}
              </p>
              <p>
                <strong>Colors:</strong> {product.colors.join(", ")}
              </p>
              <p>
                <strong>Seller Phone Number:</strong>{" "}
                {product.sellerPhoneNumber}
              </p>
              <div>
                <strong>Specifications:</strong>
                <ul className="list-disc list-inside">
                  {Object.entries(product.specifications).map(
                    ([key, value]) => (
                      <li key={key}>
                        {key}: {value as string}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
