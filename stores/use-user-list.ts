import { getQueueWithUsers, IgetUserList } from "@/types";
import { Queue } from "@prisma/client";
import { create } from "zustand";

export type StoreData = {
  userList?: IgetUserList;
  queueList?: getQueueWithUsers;
};

export type StoreActions = {
  setData: (userList: IgetUserList) => void;
};
export type QueueActions = {
  setData: (queueList: getQueueWithUsers) => void;
};

export type DataStore = StoreData & StoreActions;
export type QueueStore = StoreData & QueueActions;

const useUserList = create<DataStore>((set) => ({
  userList: [],
  setData: (userList) => set({ userList }),
}));

export const useQueueList = create<QueueStore>((set) => ({
  queueList: [],
  setData: (queueList) => set({ queueList }),
}));

export default useUserList;
