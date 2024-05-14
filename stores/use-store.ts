import { create } from "zustand";

// Crie o seu store
const useStore = create((set) => ({
  // Defina os estados iniciais e métodos de atualização
  user: null,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));
