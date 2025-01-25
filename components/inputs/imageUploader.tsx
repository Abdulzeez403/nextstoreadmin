import React, { useState } from "react";
import Image from "next/image";
import { FieldProps } from "formik";

interface ImageUploaderProps extends FieldProps {
  label: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  field,
  form,
  label,
}) => {
  const [newImages, setNewImages] = useState<File[]>([]);

  // Maximum file limit
  const MAX_FILES = 4;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);

      // Combine existing and new files for validation
      const totalFiles = field.value.length + fileArray.length;

      if (totalFiles > MAX_FILES) {
        alert(`You can only upload up to ${MAX_FILES} files.`);
        return;
      }

      // Add new files and set previews
      setNewImages((prevImages) => [...prevImages, ...fileArray]);
      form.setFieldValue(field.name, [
        ...field.value,
        ...fileArray.map((file) => URL.createObjectURL(file)), // Add previews
      ]);
    }
  };

  const handleRemoveImage = (index: number, isNew: boolean) => {
    if (isNew) {
      // Remove from newImages and field value
      setNewImages((prevImages) => prevImages.filter((_, i) => i !== index));
      const updatedValue = field.value.filter(
        (_: string, i: number) => i !== index
      );
      form.setFieldValue(field.name, updatedValue);
    } else {
      // Remove existing images from field value
      const updatedValue = [...field.value];
      updatedValue.splice(index, 1);
      form.setFieldValue(field.name, updatedValue);
    }
  };

  const handleViewImage = (src: string) => {
    window.open(src, "_blank");
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type="file"
        onChange={handleFileChange}
        multiple
        accept="image/*"
        className="mt-1 block w-full"
      />

      {/* Display uploaded images */}
      {field.value && field.value.length > 0 && (
        <div className="mt-2">
          <p className="text-sm font-medium text-gray-700">Uploaded Images:</p>
          <div className="flex flex-wrap gap-2 mt-1">
            {field.value.map((image: string, index: number) => (
              <div key={index} className="relative">
                <Image
                  src={image}
                  alt={`Uploaded image ${index + 1}`}
                  width={100}
                  height={100}
                  className="object-cover rounded cursor-pointer"
                  onClick={() => handleViewImage(image)}
                />
                <button
                  type="button"
                  onClick={() =>
                    handleRemoveImage(
                      index,
                      index >= field.value.length - newImages.length
                    )
                  }
                  className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full p-1"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
