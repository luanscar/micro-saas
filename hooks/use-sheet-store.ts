import { getQueueWithUsers, TeamMembersByCompany } from "@/types";
import { Company, Queue, Team, User, UserQueue } from "@prisma/client";
import { create } from "zustand";

export type SheetType =
  | "createUser"
  | "upsertUser"
  | "createQueue"
  | "editCompany"
  | "upsertQueue";

export type SheetSideType = "left" | "right";

interface SheetData {
  user?: Partial<User>;
  company?: Company;
  team?: Team;
  queue?: Queue;
}

interface SheetStore {
  type: SheetType | null;
  side?: SheetSideType | null;
  data: SheetData;
  isOpen: boolean;
  onOpen: (type: SheetType, side?: SheetSideType, data?: SheetData) => void;
  onClose: () => void;
  setClose: () => void;
  setOpen: () => void;
}

export const useSheet = create<SheetStore>((set) => ({
  type: null,
  data: {},
  side: null,
  isOpen: false,
  setOpen: () => set({ isOpen: true }),
  setClose: () => set({ isOpen: false }),
  onOpen: (type, side, data = {}) => set({ isOpen: true, type, side, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
