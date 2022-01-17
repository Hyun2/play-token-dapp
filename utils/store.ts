import create from "zustand";
import { IErc20 } from "../typings/types";

export interface IStore {
  wallet: string;
  setWallet: (wallet: string) => void;
  erc20List: IErc20[];
  setErc20List: (erc20: IErc20) => void;
  addErc20List: (erc20: IErc20) => void;
}

const useStore = create<IStore>((set) => ({
  wallet: "",
  setWallet: (wallet: string) => set({ wallet }),
  erc20List: [],
  setErc20List: (erc20: IErc20) => set({ erc20List: [erc20] }),
  addErc20List: (erc20: IErc20) =>
    set((state) => ({
      erc20List: [...state.erc20List, erc20],
    })),
}));

export default useStore;
