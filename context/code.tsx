import {
  createContext,
  PropsWithChildren,
  useContext,
  useId,
  useRef,
} from "react";
import { createUserStore } from "@/stores/user-store";
import { Company, User } from "@prisma/client";
import { createStore } from "zustand";
// can't see how to properly type things without copy/pasting from zustand
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

// not copied from zustand source
export type ZustandStore<T> = WithReact<StoreApi<T>>;

type Data = {
  user?: Partial<User>;
  company?: Company;
};

interface ModalStore {
  data: Data;
}

type StoreType = ZustandStore<ModalStore>;

const StoreContext = createContext<StoreType>(null!);
export const StoreProvider = ({ children }: PropsWithChildren) => {
  const storeRef = useRef<StoreType>();
  if (!storeRef.current) {
    storeRef.current = createUserStore();
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
export function useStoreApi() {
  return useContext(StoreContext);
}
