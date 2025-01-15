"use client";

import { Metadata } from "next";
import { ProductsTable } from "@/components/products-table";
import { ProductFormModal } from "@/components/product-form-modal";

// export const metadata: Metadata = {
//   title: "Products",
//   description: "Manage your products",
// };

export default function ProductsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Products</h2>
        <ProductFormModal
          initialValues={{ title: "", price: 0, description: "", images: [] }} // Add appropriate initial values
          onSubmit={(values: any) => {
            // Here you would typically make an API call to add the product
            console.log("Adding product:", values);
          }}
          buttonText="Add Product"
          modalTitle="Add New Product"
        />
      </div>
      <ProductsTable />
    </div>
  );
}
