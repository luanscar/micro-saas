import { User } from "@prisma/client";
import { createStore } from "zustand";

export interface BearProps {
  data: Pick<User, "name">;
}

export interface BearState extends BearProps {
  addBear: (data: BearProps) => void;
}

export type BearStore = ReturnType<typeof createBearStore>;

export const createBearStore = (initProps?: Partial<BearProps>) => {
  const DEFAULT_PROPS: BearProps = {
    data: { name: "" },
  };
  return createStore<BearState>()((set) => ({
    ...DEFAULT_PROPS,
    ...initProps,
    addBear: () => set((state) => ({ data: state.data })),
  }));
};
