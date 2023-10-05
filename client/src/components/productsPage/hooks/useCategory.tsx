import { useQuery, UseQueryResult } from "@tanstack/react-query";
// import useAxiosPrivate from "@/components/auth/hooks/useAxiosPrivate";
import { axiosPrivate } from "@/components/auth/axiosInstance";
import { IProduct } from "@backend/types/types";
interface useCategory {
  getProductsByCategory: UseQueryResult<IProduct[], unknown>;
}
interface useCategoryProps {
  category?: string;
}
const useCategory = ({ category }: useCategoryProps): useCategory => {
  // const AxiosPrivate = useAxiosPrivate();
  const getProductsByCategory = useQuery(["products", category], async () => {
    const { data } = await axiosPrivate.get(`/api/categories/${category}`);
    return data as IProduct[];
  });
  return { getProductsByCategory };
};

export default useCategory;
