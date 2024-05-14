import {
  Company,
  CompanySidebarOption,
  Permissions,
  User,
} from "@prisma/client";
import { create } from "zustand";

interface Details {
  user?: Partial<User>;
  company?: Company;
  sidebarOptions?: CompanySidebarOption;
  permissions?: Permissions;
}
export type DetailsStore = {
  data: Details;
};

export const useUserStore = create<DetailsStore>(() => ({
  data: {},
}));

export const useStore = create(() => ({
  user: null,
}));
