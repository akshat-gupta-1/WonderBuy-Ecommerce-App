import { QueryClient } from "@tanstack/react-query";
// import { useToast } from "@/components/ui/use-toast";
import { AxiosError } from "axios";
const errorHandler = (error: unknown): void => {
  // const { toast } = useToast();
  const title =
    error instanceof AxiosError
      ? error.message
      : "Error connecting to the Server";
  // toast({ title: title });
  console.log(title);
};

const generateQueryClient = (): QueryClient => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 300000,
        cacheTime: 600000,
        onError: errorHandler,
      },
      mutations: {
        onError: errorHandler,
      },
    },
  });
};

export const queryClient = generateQueryClient();
