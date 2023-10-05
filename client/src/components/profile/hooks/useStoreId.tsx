import {
  useMutation,
  useQuery,
  UseQueryResult,
  UseMutationResult,
  useQueryClient,
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
  updateStore: (formData: inputType) => void;
  getStore: UseQueryResult<IStoreType, unknown>;
  deleteStore: UseMutationResult<void, unknown, void, unknown>;
}
const useStoreId = (id?: string): useStores => {
  const queryClient = useQueryClient();
  const AxiosPrivate = useAxiosPrivate();
  const { toast } = useToast();
  const { mutate: updateStoreFn } = useMutation(
    async ({ name, description, location, logo }: inputType) => {
      await AxiosPrivate.put(`/api/store/${id}`, {
        name,
        description,
        location,
        logo,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["stores", "store", id],
        });
        toast({
          action: (
            <div className="flex w-full items-center">
              <PenLine className="mr-2" />
              <span>{`Store successfully updated`}</span>
            </div>
          ),
        });
      },
    },
  );
  const deleteStore = useMutation(
    async () => {
      await AxiosPrivate.delete(`/api/store/${id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["stores"] });
        toast({
          action: (
            <div className="flex w-full items-center">
              <PenLine className="mr-2" />
              <span>{`Store successfully deleted`}</span>
            </div>
          ),
        });
      },
    },
  );
  const getStore = useQuery(["stores", "store", id], async () => {
    const { data } = await AxiosPrivate.get(`/api/store/${id}`);
    return data as IStoreType;
  });
  const updateStore = (formData: inputType) => {
    updateStoreFn(formData);
  };
  return { updateStore, getStore, deleteStore };
};

export default useStoreId;
