declare global {
  interface Window {
    ethereum?: any;
  }

  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_ERC721_CA: string;
    }
  }
}

export const ethereum = window.ethereum;
