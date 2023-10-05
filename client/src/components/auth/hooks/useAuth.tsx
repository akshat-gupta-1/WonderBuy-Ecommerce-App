import {
  useMutation,
  useQuery,
  UseQueryResult,
  useQueryClient,
} from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { axiosInstance } from "../axiosInstance";
import { AxiosError } from "axios";
import { Check } from "lucide-react";
import { useTokenStore } from "./useToken";
interface DataType {
  url: string;
  userName?: string;
  email: string;
  password: string;
}

interface ResponseType {
  accessToken: string;
}

interface useAuth {
  auth: (formData: DataType) => void;
  LogoutHandler: UseQueryResult<void, unknown>;
}
const useAuth = (): useAuth => {
  const queryClient = useQueryClient();
  const { setToken, removeToken } = useTokenStore((state) => ({
    setToken: state.setAccessToken,
    removeToken: state.removeAccessToken,
  }));
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();

  const authCallHandler = useMutation<ResponseType, AxiosError, DataType>(
    async ({ url, userName, email, password }: DataType) => {
      const { data } = await axiosInstance.post(url, {
        ...(userName ? { userName } : {}),
        email,
        password,
      });
      return data;
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["user"] });
        console.log(data);
        setToken(data.accessToken);
        if (location.pathname === "/auth/signup") {
          navigate(-2);
        } else {
          navigate(-1);
        }
      },
      onError: (err) => {
        if (err instanceof AxiosError) {
          if (err.response?.status == 401) {
            console.log(err.message);
            toast({ title: "Invalid Credentials" });
          } else {
            toast({ title: "Something went wrong,Please try again." });
          }
        }
      },
    },
  );

  const auth = (formData: DataType) => {
    authCallHandler.mutate(formData);
  };

  const LogoutHandler = useQuery(
    ["logout"],
    async () => {
      const { data } = await axiosInstance.get("/api/auth/logout");
      return data;
    },
    {
      enabled: false,
      onSuccess: () => {
        removeToken();
        navigate("/");
        toast({
          action: (
            <div className="flex w-full items-center">
              <Check className="mr-2" />
              <span>Logged Out Successfully!</span>
            </div>
          ),
        });
      },
    },
  );
  return { auth, LogoutHandler };
};

export default useAuth;
