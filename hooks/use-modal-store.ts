import { TeamMembersByCompany } from "@/types";
import { Company, Team, User } from "@prisma/client";
import { create } from "zustand";

export type ModalType =
  | "createCompany"
  | "invite"
  | "editCompany"
  | "createTeam"
  | "editTeam"
  | "members"
  | "createUser"
  | "leaveCompany"
  | "deleteCompany"
  | "deleteUser"
  | "upsertUser"
  | "messageFile"
  | "deleteMessage";

interface ModalData {
  user?: Partial<User>;
  company?: Company;
  team?: Team;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
