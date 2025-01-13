import { create } from "zustand";

enum Tab {
  National = "national",
  State = "state",
  County = "county",
  Place = "place",
  Address = "address",
  Tract = "tract"
}


interface TabStoreState {
  activeTab: Tab;
  setActiveTab: (activeTab: Tab) => void;
}

const useTabStore:any = create<TabStoreState>((set) => ({
  activeTab: Tab.National,
  setActiveTab: (activeTab) => set({ activeTab }),
}));

export { useTabStore, Tab };
