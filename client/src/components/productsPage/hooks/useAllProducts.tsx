import { useQuery, UseQueryResult } from "@tanstack/react-query";
// import useAxiosPrivate from "@/components/auth/hooks/useAxiosPrivate";
import { axiosPrivate } from "@/components/auth/axiosInstance";
import { IProduct } from "@backend/types/types";
export interface IProductId extends IProduct {
  _id: string;
}
export interface useAllProducts {
  getAllProducts: UseQueryResult<IProductId[], unknown>;
}
const useAllProducts = (): useAllProducts => {
  // const AxiosPrivate = useAxiosPrivate();
  const getAllProducts = useQuery(["products", "all"], async () => {
    const { data } = await axiosPrivate.get("/api/getProducts");
    return data as IProductId[];
  });
  return { getAllProducts };
};

export default useAllProducts;
