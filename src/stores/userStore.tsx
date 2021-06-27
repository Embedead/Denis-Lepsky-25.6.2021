import create from "zustand";

interface IUserStore {
  locationID: string;
  favorites: [];
  metric: boolean;
  darkTheme: boolean;
  setLocationID: (newLocationID: string) => void;
  setFavorites: (newFavorites: any) => void;
  setClearFavorites: () => void;
  setMetric: (newMetric: boolean) => void;
  setDarkTheme: (newValue: boolean) => void;
}
export const useStore = create<IUserStore>((set) => ({
  locationID: "215854",
  favorites: [],
  metric: true,
  darkTheme: false,
  setLocationID: (newLocationdID: string) =>
    set({ locationID: newLocationdID }),
  setFavorites: (newFavorites: any) => set({ favorites: newFavorites }),
  setClearFavorites: () => set({ favorites: [] }),
  setMetric: (newMetric: boolean) => set({ metric: newMetric }),
  setDarkTheme: (newValue: boolean) => set({ darkTheme: newValue }),
}));
