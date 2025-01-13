import { create } from "zustand";

interface useTabsDataStoreState {
  stateTabStateId: string;
  setStateTabStateId: (stateTabStateId: string) => void;
  CountyTabStateId: string;
  setCountyTabStateId: (CountyTabStateId: string) => void;
  CountyTabCountyId: string;
  setCountyTabCountyId: (CountyTabId: string) => void;
}

const useTabsDataStore = create<useTabsDataStoreState>((set) => ({
  stateTabStateId: "",
  setStateTabStateId: (stateTabStateId) => set(() => ({ stateTabStateId })),
  CountyTabStateId: "",
  setCountyTabStateId: (CountyTabStateId) => set(() => ({ CountyTabStateId })),
  CountyTabCountyId: "",
  setCountyTabCountyId: (CountyTabCountyId) =>
    set(() => ({ CountyTabCountyId })),
}));

export default useTabsDataStore;
