import { UserDetails } from "@/types";
import { createStore } from "zustand/vanilla";

export type StoreData = {
  data: UserDetails;
};

// export type UserActions = {
//   setUser: (data: Partial<User>) => void;
//   // incrementCount: () => void;
// };

// export type UserStore = UserState;
// & UserActions;

export const createDataStore = () => {
  return createStore<StoreData>(() => ({
    data: null!,
  }));
};
