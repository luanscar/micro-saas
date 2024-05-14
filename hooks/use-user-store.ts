import { create, createStore } from "zustand";

const useUserStore = () =>
  createStore((set) => ({
    name: "",
    subjects: [],
    address: {
      city: "",
      country: "",
    },

    setUser: set,
  }));

export default useUserStore;
