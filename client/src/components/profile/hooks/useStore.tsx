import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import useAxiosPrivate from "@/components/auth/hooks/useAxiosPrivate";
import { useToast } from "@/components/ui/use-toast";
import { PenLine } from "lucide-react";
import { IStore } from "@backend/types/types";
type inputType = Omit<IStore, "owner">;
interface IStoreType extends IStore {
  _id: string;
}
interface useStores {
  createStore: (formData: inputType) => void;
  getStores: UseQueryResult<IStoreType[], unknown>;
}
const useStores = (): useStores => {
  const queryClient = useQueryClient();
  const AxiosPrivate = useAxiosPrivate();
  const { toast } = useToast();
  const { mutate: createStoreFn } = useMutation(
    async ({ name, description, location, logo }: inputType) => {
      await AxiosPrivate.post("/api/store", {
        name,
        description,
        location,
        logo,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["stores"] });
        toast({
          action: (
            <div className="flex w-full items-center">
              <PenLine className="mr-2" />
              <span>{`Store Successfully added`}</span>
            </div>
          ),
        });
      },
    },
  );
  const getStores = useQuery(["stores"], async () => {
    const { data } = await AxiosPrivate.get("/api/store");
    return data as IStoreType[];
  });
  const createStore = (formData: inputType) => {
    createStoreFn(formData);
  };
  return { createStore, getStores };
};

export default useStores;
