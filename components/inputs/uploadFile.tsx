import React, { useState } from "react";
import { Button, Modal, Upload } from "antd";
import Image from "next/image";
import { UploadChangeParam, UploadFile } from "antd/es/upload/interface"; // Import the type for file list
import { IImage } from "@/lib/features/product/type";

interface IProps {
  fileList: UploadFile<any>[]; // Ensure the fileList is typed correctly as per UploadFile
  handleChange: (e: UploadChangeParam) => void; // Typing the handleChange function
}

export const Files: React.FC<IProps> = ({ fileList, handleChange }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>(""); // Type for image URL
  const [previewTitle, setPreviewTitle] = useState<string>("");

  // Function to close the preview modal
  const handleCancel = () => setPreviewOpen(false);

  // Function to handle preview of the image
  const handlePreview = async (file: any) => {
    // Determine the image URL to display in the preview
    setPreviewImage(file.uri || file.preview || file.thumbUrl);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.uri!.substring(file.uri!.lastIndexOf("/") + 1)
    );
  };

  // Button component to trigger file upload
  const uploadButton = (
    <div className="flex gap-4 border-4 items-center px-4 py-2 my-2 rounded-md">
      <Button type="default">Upload Image</Button>
    </div>
  );

  return (
    <>
      <Upload
        listType="picture"
        fileList={fileList}
        onPreview={handlePreview} // Function to preview the image
        onChange={handleChange} // Function to handle file change (add/remove)
        multiple={true}
        showUploadList={{
          showDownloadIcon: true,
          downloadIcon: "Download",
          showRemoveIcon: true,
        }}
      >
        {fileList?.length >= 8 ? null : uploadButton}
        {/* Limit the number of files uploaded */}
      </Upload>

      {/* Modal for displaying image preview */}
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <Image alt="example" width={200} height={200} src={previewImage} />
      </Modal>
    </>
  );
};
