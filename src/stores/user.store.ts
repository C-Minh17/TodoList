import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IStoreUser {
  user:IUserLogin;
  setUser: (data:IUserLogin) => void;
}

export const useStoreUser = create<IStoreUser>()(
  persist(
    (set) => ({
      user:{},
      setUser: (data:IUserLogin) => set({user:data}),
    }),
    {
      name:"user",
    }
  )
)