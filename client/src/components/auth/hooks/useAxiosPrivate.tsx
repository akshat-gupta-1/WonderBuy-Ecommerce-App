import { useEffect } from 'react';
import { axiosPrivate } from '../axiosInstance';
import useRefresh from './useRefresh';
import { useTokenStore } from './useToken';
import { AxiosError, InternalAxiosRequestConfig } from 'axios';
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry: boolean;
}
const useAxiosPrivate = () => {
  const { token, setToken } = useTokenStore((state) => ({
    token: state.accessToken,
    setToken: state.setAccessToken,
  }));
  const { refetch: refresh } = useRefresh();
  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        console.log(token);
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const prevRequest = error?.config as
          | CustomAxiosRequestConfig
          | undefined;
        if (
          prevRequest &&
          error?.response?.status === 403 &&
          !prevRequest?._retry
        ) {
          prevRequest._retry = true;
          refresh();
          prevRequest.headers['Authorization'] = `Bearer ${token}`;
          return axiosPrivate(prevRequest);
        } else {
          Promise.reject(error);
        }
      }
    );
    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [token, refresh, setToken]);
  return axiosPrivate;
};
export default useAxiosPrivate;
