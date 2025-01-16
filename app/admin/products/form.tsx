"use client";

import React, { useState } from "react";
import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import {
  createProduct,
  updateProduct,
} from "@/lib/features/product/productThunk";
import { IImage, IProduct } from "@/lib/features/product/type";
import { AppDispatch, RootState } from "@/lib/store";
import { Files } from "@/components/inputs/uploadFile";
import { UploadChangeParam, UploadFile } from "antd/es/upload/interface";
import Input from "@/components/textInput";
import Button from "@/components/button";

interface ProductFormProps {
  product: IProduct | null;
  selectedProductId: string | null;
}

const ProductForm: React.FC<ProductFormProps> = ({
  product,
  selectedProductId,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [files, setFiles] = useState<UploadFile<any>[]>([]);
  const { loading } = useSelector((state: RootState) => state.product);

  const handleProductImage = (e: UploadChangeParam<UploadFile<any>>) => {
    setFiles(e.fileList);
    console.log();
  };

  const item = product;

  const initialValues = {
    name: item?.name || "",
    description: item?.description || "",
    price: item?.price || 0,
    category: item?.category || "",
    tag: item?.tag || "",
    stock: item?.stock || 0,
  };

  const handleSubmit = async (values: IProduct) => {
    try {
      const productData = {
        ...values,
        images: files
          ?.map((f: UploadFile<any>) => ({
            url: f?.url || "",
            type: f?.type || "",
            name: f?.name || "",
          }))
          .filter((file) => file.url),
      };

      if (selectedProductId) {
        await dispatch(
          updateProduct({ productId: selectedProductId, productData })
        );
        console.log("Updating product...");
      } else {
        await dispatch(createProduct(productData));
        console.log("Product added successfully");
      }
    } catch (error) {
      console.error("Error adding or updating product:", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800">
        {selectedProductId ? "Edit Product" : "Add Product"}
      </h1>
      <Formik
        key={selectedProductId}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, handleBlur, touched, errors }) => (
          <Form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Product Name"
                name="name"
                type="text"
                placeholder="Enter product name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && errors.name ? errors.name : ""}
              />

              <Input
                label="Price"
                name="price"
                type="number"
                placeholder="Enter price"
                value={values.price}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.price && errors.price ? errors.price : ""}
              />
              <Input
                label="Category"
                name="category"
                type="text"
                placeholder="Enter category"
                value={values.category}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.category && errors.category ? errors.category : ""
                }
              />
              <Input
                label="Tag"
                name="tag"
                type="text"
                placeholder="Enter tag"
                value={values.tag}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.tag && errors.tag ? errors.tag : ""}
              />
              <Input
                label="Stock"
                name="stock"
                type="number"
                placeholder="Enter stock quantity"
                value={values.stock}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.stock && errors.stock ? errors.stock : ""}
              />
            </div>

            <Input
              label="Description"
              name="description"
              type="textarea"
              placeholder="Enter product description"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                touched.description && errors.description
                  ? errors.description
                  : ""
              }
            />

            <div className="my-4">
              <Files fileList={files} handleChange={handleProductImage} />
            </div>

            {item?.images && item.images.length > 0 && (
              <div>
                {item.images.map((img: IImage, index: number) => (
                  <div key={index}>
                    <Image
                      src={img.url}
                      width={100}
                      height={40}
                      alt="Product"
                    />
                  </div>
                ))}
              </div>
            )}

            <Button type="submit" loading={loading}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProductForm;
