import { create } from 'zustand';

interface MapStoreState {
  zoom: number; // Current zoom level
  setZoom: (zoom: number) => void; // Function to update zoom level
}

const useMapStore = create<MapStoreState>((set) => ({
  zoom: 3, // Default zoom level
  setZoom: (zoom: number) => set(() => ({ zoom })),
}));

export default useMapStore;
