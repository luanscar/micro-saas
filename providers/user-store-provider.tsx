import { createContext, PropsWithChildren, useContext, useRef } from "react";
import { createUserStore, StoreData } from "@/stores/user-store";
import type { StoreApi } from "zustand";
import { useStoreWithEqualityFn } from "zustand/traditional";

export type ExtractState<S> = S extends {
  getState: () => infer T;
}
  ? T
  : never;
export type ReadonlyStoreApi<T> = Pick<StoreApi<T>, "getState" | "subscribe">;
export type WithReact<S extends ReadonlyStoreApi<unknown>> = S & {
  getServerState?: () => ExtractState<S>;
};

export type ZustandStore<T> = WithReact<StoreApi<T>>;

type StoreType = ZustandStore<StoreData>;

const UserStoreContext = createContext<StoreType>(null!);

export const UserStoreProvider = ({ children }: PropsWithChildren) => {
  const storeRef = useRef<StoreType>();
  if (!storeRef.current) {
    storeRef.current = createUserStore();
  }
  return (
    <UserStoreContext.Provider value={storeRef.current}>
      {children}
    </UserStoreContext.Provider>
  );
};

export function useStoreInContext<U>(
  selector: (state: ExtractState<StoreType>) => U,
) {
  const store = useContext(UserStoreContext);
  if (!store) throw "Missing StoreProvider";

  return useStoreWithEqualityFn(store, selector);
}

export function useUserStore() {
  return useContext(UserStoreContext);
}
