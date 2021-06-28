import create from "zustand";
import { toast } from "react-toastify";

interface IErrorStore {
  errText: string;
  setErr: (data: string) => void;
}

export const errorStore = create<IErrorStore>((set) => ({
  errText: "",
  setErr: (data: string) => {
    set({ errText: data });
    toast.error(data);
  },
}));
