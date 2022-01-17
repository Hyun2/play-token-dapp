import { AppProps } from "next/app";
import { useEffect } from "react";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import Layout from "../components/Layout";
import useStore, { IStore } from "../utils/store";
import { connectToWallet } from "../utils";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const [erc20List, setErc20List] = useStore((state: IStore) => [state.erc20List, state.setErc20List]);
  const setWallet = useStore((state) => state.setWallet);

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      // window.ethereum이 있다면
      try {
        connectToWallet(setWallet, erc20List, setErc20List);

        window.ethereum.on("accountsChanged", () => {
          connectToWallet(setWallet, erc20List, setErc20List);
        });
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  return (
    <>
      <Head>
        <title>NFT GGanbu</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap" rel="stylesheet" />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "light",
          fontFamily: "Noto Sans KR, sans-serif",
        }}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MantineProvider>
    </>
  );
}
