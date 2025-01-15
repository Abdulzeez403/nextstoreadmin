"use client";

import { useState, useCallback } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDropzone } from "react-dropzone";
import { toast } from "@/components/ui/use-toast";
import Input from "@/components/textInput";
import Image from "next/image";
import { Button } from "./ui/button";

const ProductSchema = Yup.object({
  title: Yup.string().required("Required"),
  price: Yup.number().required("Required").positive("Must be positive"),
  discountedPrice: Yup.number().positive("Must be positive"),
  rating: Yup.number().min(0).max(5),
  reviewCount: Yup.number().integer().min(0),
  inStock: Yup.boolean(),
  description: Yup.string(),
  sellerPhoneNumber: Yup.string(),
  images: Yup.array().of(Yup.mixed()).min(1, "At least one image is required"),
});

interface ProductFormModalProps {
  initialValues: {
    title: string;
    price: number;
    discountedPrice?: number;
    rating?: number;
    reviewCount?: number;
    inStock?: boolean;
    description?: string;
    sellerPhoneNumber?: string;
    images: File[];
  };
  onSubmit: (formData: FormData) => void;
  buttonText: string;
  modalTitle: string;
}

export const ProductFormModal: React.FC<ProductFormModalProps> = ({
  initialValues,
  onSubmit,
  buttonText,
  modalTitle,
}) => {
  const [open, setOpen] = useState(false);

  const handleSubmit = async (values: any, actions: any) => {
    try {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (key === "images") {
          (value as File[]).forEach((file) => formData.append(key, file));
        } else {
          formData.append(key, value as string | Blob);
        }
      });

      onSubmit(formData);
      toast({
        title: "Success",
        description: `Product ${
          initialValues ? "updated" : "added"
        } successfully.`,
      });
      setOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${initialValues ? "update" : "add"} product.`,
        variant: "destructive",
      });
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <div>
      <Button onClick={() => setOpen(true)}>{buttonText}</Button>
      {open && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">
              {modalTitle}
            </h2>
            <Formik
              initialValues={initialValues}
              validationSchema={ProductSchema}
              onSubmit={handleSubmit}
            >
              {({ values, handleChange, errors, touched, setFieldValue }) => (
                <Form className="space-y-4">
                  <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                    <Input
                      label="Title"
                      name="title"
                      value={values.title}
                      onChange={handleChange}
                      type="text"
                      // error={touched.title && errors.title}
                    />
                    <Input
                      label="Price"
                      name="price"
                      type="number"
                      value={values.price}
                      onChange={handleChange}
                      // error={touched.price && errors.price}
                    />
                    <Input
                      label="Discounted Price"
                      name="discountedPrice"
                      type="number"
                      value={values.discountedPrice}
                      onChange={handleChange}
                      // error={touched.discountedPrice && errors.discountedPrice}
                    />
                    <Input
                      label="Rating"
                      name="rating"
                      type="number"
                      value={values.rating}
                      onChange={handleChange}
                      // error={touched.rating && errors.rating}
                    />
                    <Input
                      label="Review Count"
                      name="reviewCount"
                      type="number"
                      value={values.reviewCount}
                      onChange={handleChange}
                      // error={touched.reviewCount && errors.reviewCount}
                    />
                    {/* <Checkbox
                    label="In Stock"
                    name="inStock"
                    checked={values.inStock}
                    onChange={handleChange}
                  /> */}

                    <Input
                      label="Seller Phone Number"
                      name="sellerPhoneNumber"
                      value={values.sellerPhoneNumber}
                      onChange={handleChange}
                      type="text"
                      // error={
                      //   touched.sellerPhoneNumber && errors.sellerPhoneNumber
                      // }
                    />
                  </div>

                  <Input
                    label="Description"
                    type="textarea"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    // error={touched.description && errors.description}
                  />

                  <div>
                    <label className="block mb-1 font-medium">Images</label>
                    <Dropzone
                      images={values.images}
                      setFieldValue={(files: File[]) =>
                        setFieldValue("images", files)
                      }
                      error={
                        touched.images && typeof errors.images === "string"
                          ? errors.images
                          : undefined
                      }
                    />
                  </div>
                  <Button type="submit">Submit</Button>
                </Form>
              )}
            </Formik>
            <Button
              onClick={() => setOpen(false)}
              variant="outline"
              className="mt-4"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

const Dropzone = ({
  images,
  setFieldValue,
  error,
}: {
  images: File[];
  setFieldValue: (files: File[]) => void;
  error: string | undefined;
}) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFieldValue([...images, ...acceptedFiles]);
    },
    [images, setFieldValue]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
      {images.length > 0 && (
        <div className="mt-2 flex gap-2 flex-wrap">
          {images.map((file, index) => (
            <Image
              key={index}
              src={URL.createObjectURL(file)}
              alt="Preview"
              width={50}
              height={50}
              className="rounded"
            />
          ))}
        </div>
      )}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};
