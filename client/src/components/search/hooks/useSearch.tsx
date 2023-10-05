import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { axiosPrivate } from "@/components/auth/axiosInstance";
import { IProductId } from "@/components/productsPage/hooks/useAllProducts";
const useSearch = (
  searchTerm: string,
): UseQueryResult<IProductId[], unknown> => {
  return useQuery(
    ["products", searchTerm],
    async () => {
      const { data } = await axiosPrivate.get(`/api/search/${searchTerm}`);
      return data as IProductId[];
    },
    {
      enabled: !!searchTerm,
    },
  );
};

export default useSearch;
