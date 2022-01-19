import { IStore } from "./store";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { IErc20 } from "../typings/types";

export const connectToWallet = async ({
  setWallet,
  erc20List,
  setErc20List,
  setProvider,
  setSigner,
}: {
  setWallet: IStore["setWallet"];
  erc20List: IErc20[];
  setErc20List: IStore["setErc20List"];
  setProvider: IStore["setProvider"];
  setSigner: IStore["setSigner"];
}) => {
  const web3Modal = new Web3Modal();
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  setProvider(provider);
  const signer = provider.getSigner();
  setSigner(signer);

  const walletAddress = await signer.getAddress();
  setWallet(walletAddress);
  // console.log('Wallet Address: ', walletAddress);

  let walletBalance = await provider.getBalance(walletAddress);
  const balance = ethers.utils.formatEther(walletBalance);
  // console.log('Balance: ', walletBalance);

  setErc20List({
    name: "Ethereum",
    symbol: "ETH",
    tokenCA: "",
    balance: parseFloat(balance),
  });

  return { walletAddress, walletBalance, provider, signer };
};

export const round = (num: number) => {
  var m = Number((Math.abs(num) * 100).toPrecision(15));
  return (Math.round(m) / 100) * Math.sign(num);
};
