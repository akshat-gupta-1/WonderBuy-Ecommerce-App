import { axiosInstance } from '../axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { AuthResponse } from '@/lib/types';
import { useTokenStore } from './useToken';
const useRefresh = () => {
  const setToken = useTokenStore((state) => state.setAccessToken);
  return useQuery(
    ['accessToken'],
    async () => {
      const { data } = await axiosInstance.get('/api/auth/refresh');
      return data as AuthResponse;
    },
    {
      onSuccess: (data) => {
        console.log(data.accessToken);
        setToken(data.accessToken);
      },
      enabled: false,
    }
  );
};

export default useRefresh;
