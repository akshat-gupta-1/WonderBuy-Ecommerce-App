import { useQuery, UseQueryResult } from "@tanstack/react-query";
// import useAxiosPrivate from "@/components/auth/hooks/useAxiosPrivate";
import { axiosPrivate } from "@/components/auth/axiosInstance";
import { IStore } from "@backend/types/types";
interface IStoreId extends IStore {
  _id: string;
}
interface usePublicStores {
  getAllPublicStores: UseQueryResult<IStoreId[], unknown>;
}
const usePublicStores = (): usePublicStores => {
  // const AxiosPrivate = useAxiosPrivate();
  const getAllPublicStores = useQuery(["stores", "public"], async () => {
    const { data } = await axiosPrivate.get("/api/allStores");
    return data as IStoreId[];
  });
  return { getAllPublicStores };
};

export default usePublicStores;
