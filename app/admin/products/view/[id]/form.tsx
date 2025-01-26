"use client";

import React, { useEffect, useState } from "react";
import { Formik, Form, FieldArray, FormikErrors } from "formik";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { updateProduct } from "@/lib/features/product/productThunk";
import { IProduct, ISpecification } from "@/lib/features/product/type";
import { AppDispatch, RootState } from "@/lib/store";
import * as Yup from "yup";
import Input from "@/components/textInput";
import { CirclePlus, CircleX, Trash } from "lucide-react";
import Button from "@/components/button";
import { notify } from "@/components/toast";

interface ProductFormProps {
  product: IProduct | null;
  selectedProductId: string | null;
  onDismiss: () => void;
}

const UpdateProductForm: React.FC<ProductFormProps> = ({
  product,
  selectedProductId,
  onDismiss,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.product);
  const [newImages, setNewImages] = useState<File[]>([]);

  const item = product;

  const validationSchema = Yup.object({
    name: Yup.string().required("Product name is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number()
      .required("Price is required")
      .min(0, "Price must be a positive value"),
    category: Yup.string().required("Category is required"),
    tag: Yup.string().required("Tag is required"),
    stock: Yup.number()
      .required("Stock quantity is required")
      .min(0, "Stock must be a positive value"),
    specifications: Yup.array().of(
      Yup.object().shape({
        key: Yup.string().required("Specification key is required"),
        value: Yup.string().required("Specification value is required"),
      })
    ),
  });

  const initialValues = {
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || 0,
    category: product?.category || "",
    tag: product?.tag || "",
    stock: product?.stock || 0,
    swapping: product?.swapping || false,
    specifications: product?.specifications || [{ key: "", value: "" }],
    images: product?.images || [],
  };

  const handleSubmit = async (
    values: typeof initialValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    const formData = new FormData();

    // Merge new images with existing ones
    const mergedImages = [
      ...(values.images as string[]), // Existing images
      ...newImages.map((file) => file.name), // New images
    ];

    // Prepare form data
    Object.entries(values).forEach(([key, value]) => {
      if (key === "specifications" && Array.isArray(value)) {
        (value as ISpecification[]).forEach((spec: ISpecification) => {
          formData.append(`${key}[]`, JSON.stringify(spec));
        });
      } else if (key === "swapping") {
        formData.append(key, value ? "true" : "false");
      } else if (key !== "images") {
        formData.append(key, value?.toString() || "");
      }
    });

    // Add new images to FormData
    newImages.forEach((file) => {
      formData.append("images", file);
    });

    // Append the merged image names (optional, depending on your backend logic)
    // formData.append("mergedImages", JSON.stringify(mergedImages));

    try {
      await dispatch(
        updateProduct({
          productId: selectedProductId,
          productData: formData,
        } as any)
      );
      notify.success("Product updated successfully");

      onDismiss();
    } catch (error) {
      console.error("Error submitting form:", error);
      notify.error("Failed to update product");
    }
  };

  return (
    <div className="">
      <h1 className="text-2xl font-bold text-gray-800">
        {selectedProductId ? "Edit Product" : "Add Product"}
      </h1>
      <Formik
        key={selectedProductId}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({
          values,
          handleChange,
          handleBlur,
          touched,
          errors,
          setFieldValue,
        }) => (
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
              isTextarea={true}
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

            <FieldArray name="specifications">
              {({ push, remove }) => (
                <div>
                  <h3 className="text-lg font-medium">Specifications</h3>
                  {values.specifications.map(
                    (spec: { key: string; value: string }, index: number) => (
                      <div key={index} className="flex items-center gap-4 my-2">
                        <Input
                          label="Key"
                          name={`specifications[${index}].key`}
                          type="text"
                          placeholder="e.g., Weight"
                          value={spec.key}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            touched.specifications?.[index]?.key &&
                            typeof errors.specifications?.[index] ===
                              "object" &&
                            errors.specifications?.[index]?.key
                              ? (
                                  errors.specifications as FormikErrors<{
                                    key: string;
                                    value: string;
                                  }>[]
                                )?.[index]?.key
                              : ""
                          }
                        />
                        <Input
                          label="Value"
                          name={`specifications[${index}].value`}
                          type="text"
                          placeholder="e.g., 1.5kg"
                          value={spec.value}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            touched.specifications?.[index]?.value &&
                            typeof errors.specifications?.[index] ===
                              "object" &&
                            errors.specifications?.[index]?.value
                              ? (
                                  errors.specifications as FormikErrors<{
                                    key: string;
                                    value: string;
                                  }>[]
                                )?.[index]?.value
                              : ""
                          }
                        />
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="text-red-500"
                        >
                          <span>
                            <CircleX />
                          </span>
                        </button>
                      </div>
                    )
                  )}
                  <button
                    type="button"
                    onClick={() => push({ key: "", value: "" })}
                    className="mt-2 text-blue-500 border-2 p-2 flex gap-2 items-center"
                  >
                    <CirclePlus /> <span>Add Specification</span>
                  </button>
                </div>
              )}
            </FieldArray>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Images
              </label>
              <input
                type="file"
                onChange={(event) => {
                  const files = event.currentTarget.files;
                  if (files) {
                    // Append new files to the existing list
                    setNewImages((prev) => [...prev, ...Array.from(files)]);
                    setFieldValue("images", [
                      ...values.images,
                      ...Array.from(files).map((file) =>
                        URL.createObjectURL(file)
                      ),
                    ]);
                  }
                }}
                multiple
                accept="image/*"
                className="mt-1 block w-full"
              />
              {values.images && values.images.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm font-medium text-gray-700">
                    Current Images:
                  </p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {values.images.map((image: string, index: number) => (
                      <div key={index} className="relative">
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`Image ${index + 1}`}
                          width={100}
                          height={100}
                          className="object-cover rounded"
                        />
                        <button
                          type="button"
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                          onClick={() => {
                            const updatedImages = values.images.filter(
                              (_, i) => i !== index
                            );
                            setFieldValue("images", updatedImages);

                            // Remove corresponding new file if it exists
                            if (index >= (product?.images?.length ?? 0)) {
                              setNewImages((prev) =>
                                prev.filter(
                                  (_, i) =>
                                    i !== index - (product?.images?.length || 0)
                                )
                              );
                            }
                          }}
                        >
                          <Trash size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Button type="submit" loading={loading}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UpdateProductForm;
