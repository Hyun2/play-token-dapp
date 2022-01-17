import { IStore } from "./store";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { IErc20 } from "../typings/types";

export const connectToWallet = async (
  setWallet: IStore["setWallet"],
  erc20List: IErc20[],
  addErc20List: IStore["addErc20List"],
) => {
  const web3Modal = new Web3Modal();
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const signer = provider.getSigner();

  const walletAddress = await signer.getAddress();
  setWallet(walletAddress);
  // console.log('Wallet Address: ', walletAddress);

  let walletBalance = await provider.getBalance(walletAddress);
  const balance = ethers.utils.formatEther(walletBalance);
  // console.log('Balance: ', walletBalance);

  addErc20List({
    name: "Ethereum",
    symbol: "ETH",
    balance: parseFloat(balance),
  });

  return { walletAddress, walletBalance, provider, signer };
};

export const round = (num: number) => {
  var m = Number((Math.abs(num) * 100).toPrecision(15));
  return (Math.round(m) / 100) * Math.sign(num);
};
