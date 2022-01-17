import create from "zustand";
import { IErc20, IErc721 } from "../typings/types";

export interface IStore {
  wallet: string;
  setWallet: (wallet: string) => void;
  erc20List: IErc20[];
  setErc20List: (erc20: IErc20) => void;
  addErc20List: (erc20: IErc20) => void;
  erc721List: IErc721[];
  addErc721List: (erc721: IErc721) => void;
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
  erc721List: [
    {
      name: "cozyNFT",
      symbol: "cozy",
      tokenCA: "0x0x0x30x0x11",
      tokenId: 1,
      tokenURI:
        "https://img1.daumcdn.net/thumb/R300x0/?fname=https://k.kakaocdn.net/dn/bU93Z6/btrdgRxbH4T/zoVrVxIBGM7yKSqEAQDSck/img.png",
    },
    {
      name: "cozyNFT",
      symbol: "cozy",
      tokenCA: "0x0x0x0x0x",
      tokenId: 2,
      tokenURI: "https://media.vlpt.us/images/leejh9022/post/da20dd70-fd30-44ea-9f31-38aa8a56a3c6/reactjs-thumb.jpg",
    },
  ],
  addErc721List: (erc721) => set((state) => ({ erc721List: [...state.erc721List, erc721] })),
}));

export default useStore;
