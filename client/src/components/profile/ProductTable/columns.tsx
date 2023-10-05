import { ColumnDef } from "@tanstack/react-table";
import { IProduct } from "@backend/types/types";
import OptionsColumn from "./OptionsColumn";
export type IProductW = Omit<IProduct, "storeId">;
export interface IProductType extends IProductW {
  _id: string;
}
export const columns: ColumnDef<IProductType>[] = [
  {
    accessorKey: "_id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;
      return <OptionsColumn product={product} />;
    },
  },
];
