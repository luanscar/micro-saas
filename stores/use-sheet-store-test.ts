import { Company, Queue, Team, User } from "@prisma/client";
import { create } from "zustand";

export type SheetType =
  | "createUser"
  | "upsertUser"
  | "editCompany"
  | "upsertQueue"
  | "userSheet"
  | "queueSheet";

export type SheetSideType = "left" | "right";

interface SheetData {
  user?: Partial<User>;
  company?: Company;
  team?: Team;
  queue?: Queue;
}

interface SheetState {
  // type: SheetType | null;
  type: SheetType;
  side?: SheetSideType;
  data: SheetData;
  isOpen: boolean;
}

interface SheetStore {
  // sheets: Record<string, SheetState>;
  sheets: Record<SheetType, SheetState>;

  openSheet: (type: SheetType, side?: SheetSideType, data?: SheetData) => void;
  closeSheet: (type: SheetType) => void;
  setSheetOpen: (type: SheetType) => void;
  setSheetClose: (type: SheetType) => void;
}

export const useSheetStoreTest = create<SheetStore>((set) => ({
  sheets: {
    createUser: { type: "createUser", side: "left", data: {}, isOpen: false },
    upsertUser: { type: "upsertUser", side: "left", data: {}, isOpen: false },
    editCompany: { type: "editCompany", side: "left", data: {}, isOpen: false },
    upsertQueue: { type: "upsertQueue", side: "left", data: {}, isOpen: false },
    userSheet: { type: "userSheet", side: "left", data: {}, isOpen: false },
    queueSheet: { type: "queueSheet", side: "left", data: {}, isOpen: false },
  },
  data: {},
  openSheet: (type, side = "left", data = {}) =>
    set((state) => ({
      data,
      sheets: {
        ...state.sheets,
        [type]: { type, side, data, isOpen: true },
      },
    })),
  closeSheet: (type) =>
    set((state) => ({
      sheets: {
        ...state.sheets,
        [type]: {
          ...(state.sheets[type].data = {}),
        },
        [type]: {
          ...state.sheets[type],

          isOpen: false,
        },
      },
    })),
  setSheetOpen: (type) =>
    set((state) => ({
      sheets: {
        ...state.sheets,
        [type]: {
          ...state.sheets[type],
          isOpen: true,
        },
      },
    })),
  setSheetClose: (id) =>
    set((state) => ({
      sheets: {
        ...state.sheets,
        [id]: {
          ...state.sheets[id],
          isOpen: false,
        },
      },
    })),
}));
