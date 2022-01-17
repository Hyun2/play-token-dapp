export interface IErc20 {
  name: string;
  symbol: string;
  balance: number;
}

export interface IErc721 {
  name: string;
  symbol: string;
  tokenCA: string;
  tokenId: number;
  tokenURI: string;
}
