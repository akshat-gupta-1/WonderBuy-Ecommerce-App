import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import useAxiosPrivate from "@/components/auth/hooks/useAxiosPrivate";
import { PenLine } from "lucide-react";

interface useProductId {
  deleteProduct: (data: input) => void;
}
interface input {
  productId: string;
}
const useProductId = (storeId?: string): useProductId => {
  const AxiosPrivate = useAxiosPrivate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    async ({ productId }: input) => {
      await AxiosPrivate.delete(`/api/store/${storeId}/product/${productId}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["store", storeId, "products"]);
        toast({
          action: (
            <div className="flex w-full items-center">
              <PenLine className="mr-2" />
              <span>{`Product successfully deleted`}</span>
            </div>
          ),
        });
      },
    },
  );
  const deleteProduct = (data: input) => {
    mutate(data);
  };
  return { deleteProduct };
};

export default useProductId;
