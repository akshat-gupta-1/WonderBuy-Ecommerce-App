import { useMutation, UseMutationResult } from "@tanstack/react-query";
import useAxiosPrivate from "@/components/auth/hooks/useAxiosPrivate";
interface DataType {
  url: Location;
}
interface useCheckout {
  checkout: UseMutationResult<DataType, unknown, void, unknown>;
}

const useCheckout = (): useCheckout => {
  const AxiosPrivate = useAxiosPrivate();
  const checkout = useMutation(
    async () => {
      const { data } = await AxiosPrivate.post("/api/create-checkout-session");
      return data as DataType;
    },
    {
      onSuccess: (data) => {
        window.location = data.url;
      },
    },
  );
  return { checkout };
};

export default useCheckout;
