import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "@/components/auth/hooks/useAxiosPrivate";
import { IUser } from "@backend/types/types";
interface useUser {
  user?: IUser;
}
const useUser = (): useUser => {
  const axiosPrivate = useAxiosPrivate();
  const { data: user } = useQuery(
    ["user"],
    async () => {
      const { data } = await axiosPrivate.get("/api/user");
      return data as IUser;
    },
    {
      staleTime: 10 * 60 * 100,
      cacheTime: 900000,
    },
  );
  return { user };
};

export default useUser;
