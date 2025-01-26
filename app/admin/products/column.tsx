import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import DataTableRowActions from "./table/dataRowAction";
import { IProduct } from "@/lib/features/product/type";
import { DataTableColumnHeader } from "@/components/table/colunm";

interface IProps {
  onEdit: (value: IProduct) => void;
  onDelete: (value: IProduct) => void;
  onView: (value: IProduct) => void;
}

export const columns = ({
  onEdit,
  onDelete,
  onView,
}: IProps): ColumnDef<IProduct, unknown>[] => [
  {
    accessorKey: "images",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Images" />
    ),
    cell: ({ row }) => {
      // Assuming images is an array of objects with 'uri' as the key (e.g., { uri: 'image_url' })
      const images = row.original.images;

      // If images are objects with 'uri' property, map over to extract the URI
      const imageUrls =
        images && images.length > 0 && images[0] ? [images[0]] : [];

      // If images array is empty or not valid, show fallback message
      if (!Array.isArray(imageUrls) || imageUrls.length === 0) {
        return <span>No Image</span>;
      }

      // Use the first image URL
      const imageUrl = imageUrls[0];

      // Check if the URL is valid
      try {
        new URL(imageUrl); // Will throw an error if invalid
      } catch (e) {
        return <span>Invalid Image URL</span>; // Show fallback for invalid URLs
      }

      return (
        <div className="flex space-x-2">
          <Image
            src={imageUrl}
            alt={`Product image for ${row.original}`}
            width={50}
            height={50}
            className="rounded object-cover" // Ensure image fits well
            unoptimized
          />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product Name" />
    ),
    cell: ({ row }) => <div>{row.original.name}</div>,
  },
  // {
  //   accessorKey: "description",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Description" />
  //   ),
  //   cell: ({ row }) => <div>{row.original.description}</div>,
  // },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => <div>{row.original.price}</div>,
  },
  {
    accessorKey: "stock",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Stock" />
    ),
    cell: ({ row }) => <div>{row.original.stock}</div>,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <DataTableRowActions
        row={row}
        onEdit={onEdit}
        onDelete={onDelete}
        onView={onView}
      />
    ),
    size: 50,
  },
];
