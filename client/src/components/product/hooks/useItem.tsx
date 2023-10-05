import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { axiosPrivate } from "@/components/auth/axiosInstance";
import { IProductId } from "@/components/productsPage/hooks/useAllProducts";
interface useItem {
  getItemDetails: UseQueryResult<IProductId, unknown>;
}
const useItem = (productId?: string): useItem => {
  const getItemDetails = useQuery(["product", productId], async () => {
    const { data } = await axiosPrivate.get(`/api/product/${productId}`);
    return data as IProductId;
  });
  return { getItemDetails };
};

export default useItem;
