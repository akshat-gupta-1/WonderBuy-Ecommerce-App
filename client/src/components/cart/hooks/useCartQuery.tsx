import {
  useMutation,
  useQuery,
  UseQueryResult,
  useQueryClient,
} from "@tanstack/react-query";
import useAxiosPrivate from "@/components/auth/hooks/useAxiosPrivate";
import { IProductCart } from "./useCart";
interface InputCart {
  productId: string;
  quantity: number;
}
interface CartType {
  user: string;
  items: { product: IProductCart; quantity: number }[];
  bill: number;
}
interface useCartQuery {
  addProduct: (data: InputCart) => void;
  getCart: UseQueryResult<CartType, unknown>;
  getCartCount: UseQueryResult<number, unknown>;
}
const useCartQuery = (): useCartQuery => {
  const queryClient = useQueryClient();
  const AxiosPrivate = useAxiosPrivate();
  const getCart = useQuery(["cart", "user"], async () => {
    const { data } = await AxiosPrivate.get("/api/viewCart");
    return data as CartType;
  });
  const { mutate } = useMutation(
    async ({ productId, quantity }: InputCart) => {
      const { data } = await AxiosPrivate.post("/api/updateCart", {
        product: productId,
        quantity,
      });
      return data;
    },
    {
      onSuccess: (data) => {
        console.log(data);
        queryClient.invalidateQueries(["cart", "user"]);
        queryClient.invalidateQueries(["cartCount", "user"]);
      },
    },
  );
  const getCartCount = useQuery(["cartCount", "user"], async () => {
    const { data } = await AxiosPrivate.get("/api/cartCount");
    return data as number;
  });
  const addProduct = (data: InputCart) => {
    mutate(data);
  };
  return { getCart, addProduct, getCartCount };
};

export default useCartQuery;
