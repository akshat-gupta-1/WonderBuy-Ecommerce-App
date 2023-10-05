import { create } from "zustand";
interface filter {
  initial: number;
  final: number;
}
interface FilterStore {
  applied: filter[];
  addFilter: (data: filter) => void;
  removeFilter: () => void;
}
const useFilterStore = create<FilterStore>()((set) => ({
  applied: [],
  addFilter: (data) => set((state) => ({ applied: [...state.applied, data] })),
  removeFilter: () => set(() => ({ applied: [] })),
}));

export default useFilterStore;
