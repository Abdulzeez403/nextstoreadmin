"use client";

import { fetchProductById } from "@/lib/features/product/productThunk";
import { AppDispatch, RootState } from "@/lib/store";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { Breadcrumb } from "@/components/breadcrumb";
import Drawer from "@/components/modals/drawer";
import UpdateProductForm from "./form";

export default function ViewProductPage({
  params,
}: {
  params: { id: string };
}) {
  const { product, loading } = useSelector((state: RootState) => state.product);
  const dispatch = useDispatch<AppDispatch>();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProductById(params?.id));
  }, []);

  if (loading) {
    return <h4>loading..</h4>;
  }
  if (!product) {
    return <h4>Product not found</h4>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Product Details</h1>

      <div className="flex justify-between items-center">
        <Breadcrumb
          items={[
            { label: "Products", href: "/products" },
            { label: product.name, href: `/products/view/${params.id}` },
          ]}
        />
        <div className="flex gap-4">
          <button
            className="border-2 bg-blue-600 p-2 px-4 text-white"
            onClick={() => setIsOpen(true)}
          >
            Update
          </button>
          <button className="border-2 rounded-md bg-red-300 p-2 px-4 text-white">
            Delete
          </button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="flex-1">
          <Image
            src={product?.images?.[0] || "/placeholder.png"}
            alt={product?.name || "Product Image"}
            width={400}
            height={400}
          />
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-semibold">{product.name}</h2>
          <p className="text-gray-500">{product.description}</p>
          <p className="text-gray-500">Price: {product.price}</p>
          <p className="text-gray-500">Category: {product.category}</p>
          <p className="text-gray-500">Stock: {product.stock}</p>
          <p>
            {product?.specifications?.map((spec, index) => (
              <div key={index} className="flex gap-4">
                <p className="text-gray-500">{spec.key}</p>
                <p className="text-gray-500">{spec.value}</p>
              </div>
            ))}
          </p>
        </div>
      </div>
      <Drawer width="100" isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <UpdateProductForm
          selectedProductId={params?.id}
          product={product}
          onDismiss={() => setIsOpen(false)}
        />
      </Drawer>
    </div>
  );
}
