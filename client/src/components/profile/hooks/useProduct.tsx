import {
  useMutation,
  useQuery,
  UseQueryResult,
  useQueryClient,
} from "@tanstack/react-query";
import useAxiosPrivate from "@/components/auth/hooks/useAxiosPrivate";
import { useToast } from "@/components/ui/use-toast";
import { PenLine } from "lucide-react";
import { IProductType, IProductW } from "../ProductTable/columns";
interface useProduct {
  addProduct: (formData: IProductW) => void;
  // deleteProduct:UseMutationResult<void,unknown,void,unknown>;
  getProducts: UseQueryResult<IProductType[], unknown>;
}
const useProduct = (id?: string): useProduct => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const AxiosPrivate = useAxiosPrivate();
  const { mutate } = useMutation(
    async ({ name, description, imageUrl, price, category }: IProductW) => {
      await AxiosPrivate.post(`/api/store/${id}/product`, {
        name,
        description,
        imageUrl,
        category,
        price,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["store", id, "products"]);
        toast({
          action: (
            <div className="flex w-full items-center">
              <PenLine className="mr-2" />
              <span>{`Product Successfully Added`}</span>
            </div>
          ),
        });
      },
    },
  );
  const addProduct = (formData: IProductW) => {
    mutate(formData);
  };
  const getProducts = useQuery(["store", id, "products"], async () => {
    const { data } = await AxiosPrivate.get(`/api/store/${id}/product`);
    return data as IProductType[];
  });
  return { addProduct, getProducts };
};

export default useProduct;
