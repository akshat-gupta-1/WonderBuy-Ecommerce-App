import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
interface TokenStore {
  accessToken: string | null;
  setAccessToken: (token: string) => void;
  removeAccessToken: () => void;
}
export const useTokenStore = create<TokenStore>()(
  persist(
    (set) => ({
      accessToken: null,
      setAccessToken: (token: string) => {
        set(() => ({
          accessToken: token,
        }));
      },
      removeAccessToken: () => {
        set(() => ({
          accessToken: null,
        }));
      },
    }),
    {
      name: 'jwt2',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
