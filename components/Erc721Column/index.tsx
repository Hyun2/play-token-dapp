import { Button, Col, Grid, Input, Modal, TextInput } from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import { ethers } from "ethers";
import { useState } from "react";
import { IErc721 } from "../../typings/types";
import useStore from "../../utils/store";
import Erc721Card from "../Erc721Card";
import TozauNFT from "../../build/contracts/TozauNFT.json";
// import TransferErc721Modal from "./transferErc721Modal";

const Erc721Column = () => {
  const erc721List = useStore((state) => state.erc721List);
  const [opened, setOpened] = useState(false);
  const [recipient, setRecipient] = useInputState("");
  const [selectedErc721, setSelectedErc721] = useState<IErc721 | null>(null);
  const [tokenCA, setTokenCA] = useInputState("");
  const [signer, wallet] = useStore((state) => [state.signer, state.wallet]);

  const handleAddToken = async (e: any) => {
    if (e.key === "Enter") {
      try {
        const erc721Contract = new ethers.Contract(tokenCA, TozauNFT.abi, signer);
        // const erc721Contract = new ethers.Contract(nftmarketaddress, KBMarket.abi, signer);

        // const balance = await erc721Contract.balanceOf(wallet);
        const name = await erc721Contract.name();
        const symbol = await erc721Contract.symbol();
        const totalSupply = await erc721Contract.totalSupply();
        console.log(name, symbol, totalSupply.toString());
        // console.log(ethers.utils.formatUnits(balance, "ether"));
        // console.log(name, symbol);
        // console.log(tokenCA);
        setTokenCA("");
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <Input
          onKeyDown={handleAddToken}
          style={{ width: "308px" }}
          placeholder="ERC721 Token Contract Address"
          onChange={setTokenCA}
          value={tokenCA}
        />
      </div>
      <div>
        <Grid>
          {erc721List.map((erc721, idx) => {
            return (
              <Col key={idx} span={4}>
                <Erc721Card
                  erc721={erc721}
                  setSelectedErc721={setSelectedErc721}
                  setOpened={setOpened}
                  //   toggleTransferErc721Modal={toggleTransferErc721Modal}
                />
              </Col>
            );
          })}
        </Grid>
      </div>
      <Modal opened={opened} onClose={() => setOpened(false)} hideCloseButton>
        <div style={{ textAlign: "center" }}>{selectedErc721?.name}</div>
        <TextInput
          value={recipient}
          onChange={setRecipient}
          style={{ margin: "10px 0" }}
          label="Wallet Address"
          placeholder="Wallet Address"
        />
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Button
            onClick={() => {
              setOpened(false);
            }}
          >
            전송
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default Erc721Column;
