import { createContext, PropsWithChildren, useContext, useRef } from "react";
import { createDataStore } from "@/stores/use-data-store";
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

const StoreContext = createContext<StoreType>(null!);

export const StoreProvider = ({ children }: PropsWithChildren) => {
  const storeRef = useRef<StoreType>();
  if (!storeRef.current) {
    storeRef.current = createDataStore();
  }
  return (
    <StoreContext.Provider value={storeRef.current}>
      {children}
    </StoreContext.Provider>
  );
};

export function useStoreInContext<U>(
  selector: (state: ExtractState<StoreType>) => U,
) {
  const store = useContext(StoreContext);
  if (!store) throw "Missing StoreProvider";

  return useStoreWithEqualityFn(store, selector);
}

export function useDataStore() {
  return useContext(StoreContext);
}
