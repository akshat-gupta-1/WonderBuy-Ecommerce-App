import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, FileEdit, Trash2, Copy } from "lucide-react";
import { IProductType } from "./columns";
import { useParams } from "react-router-dom";
import useProductId from "../hooks/useProductId";
interface OptionsColumnProps {
  product: IProductType;
}
const OptionsColumn = ({ product }: OptionsColumnProps) => {
  const { storeId } = useParams();
  const { deleteProduct } = useProductId(storeId);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"blue"} className="h-8 w-8 p-0">
          <span className="sr-only">Open Menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="text-slate-9">Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(product._id)}
        >
          <Copy size={16} className="mr-1" />
          Copy Product ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <FileEdit size={16} className="mr-1" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            deleteProduct({ productId: product._id });
          }}
        >
          <Trash2 size={16} className="mr-1" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default OptionsColumn;
