import create from "zustand";

interface IStore {
  wallet: string;
  setWallet: (wallet: string) => void;
}

const useStore = create<IStore>((set) => ({
  wallet: "",
  setWallet: (wallet: string) => set({ wallet }),
}));

export default useStore;
