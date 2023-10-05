import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "@/components/auth/hooks/useAxiosPrivate";
import { AxiosError } from "axios";
import { useToast } from "@/components/ui/use-toast";
import { PenLine } from "lucide-react";
interface inputType {
  currPassword: string;
  newPassword: string;
}
interface ResponseType {
  message: string;
}
interface useAccount {
  changePassword: (formData: inputType) => void;
  deleteAccount: () => void;
}
const useAccount = (): useAccount => {
  const AxiosPrivate = useAxiosPrivate();
  const { toast } = useToast();
  const { mutate } = useMutation<ResponseType, AxiosError, inputType>(
    async ({ currPassword, newPassword }: inputType) => {
      const { data } = await AxiosPrivate.post("/api/changepassword", {
        currPassword,
        newPassword,
      });
      return data;
    },
    {
      onSuccess: (data) => {
        toast({
          action: (
            <div className="flex w-full items-center">
              <PenLine className="mr-2" />
              <span>{data.message}</span>
            </div>
          ),
        });
      },
    },
  );
  const { refetch: deleteAccount } = useQuery(
    ["deleteAccount"],
    async () => {
      const { data } = await AxiosPrivate.get("/api/deleteAccount");
      return data;
    },
    {
      enabled: false,
      onSuccess: (data) => {
        toast({
          action: (
            <div className="flex w-full items-center">
              <PenLine className="mr-2" />
              <span>{data.message}</span>
            </div>
          ),
        });
      },
    },
  );
  const changePassword = (formData: inputType) => {
    mutate(formData);
  };
  return { changePassword, deleteAccount };
};

export default useAccount;
