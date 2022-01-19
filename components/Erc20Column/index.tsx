import { Button, Input, Modal, TextInput } from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import { ethers } from "ethers";
import { useState } from "react";
import { IErc20 } from "../../typings/types";
import useStore from "../../utils/store";
import Erc20Card from "../Erc20Card";
import TozauToken from "../../build/contracts/TozauToken.json";
// import ErcTokenInput from "./ercTokenInput";
// import TransferErc20Modal from "./transferErc20Modal";

const Erc20Column = () => {
  const wallet = useStore((state) => state.wallet);
  const erc20List = useStore((state) => state.erc20List);
  const [opened, setOpened] = useState(false);
  const [selectedErc20, setSelectedErc20] = useState<IErc20 | null>(null);
  const [recipient, setRecipient] = useInputState("");
  const [amount, setAmount] = useInputState("");
  const signer = useStore((state) => state.signer);
  const [tokenCA, setTokenCA] = useInputState("");
  const addErc20List = useStore((state) => state.addErc20List);
  // const [transferErc20ModalOpend, setTransferErc20ModalOpend] = useState(false);
  //   const [selectedErc20, setSelectedErc20] = useStore((state) => [state.selectedErc20, state.setSelectedErc20]);

  // const toggleTransferErc20Modal = () => {
  //   setTransferErc20ModalOpend(!transferErc20ModalOpend);
  // };

  const handleAddToken = async (e: any) => {
    if (e.key === "Enter") {
      try {
        const erc20Contract = new ethers.Contract(tokenCA, TozauToken.abi, signer);
        // const erc721Contract = new ethers.Contract(nftmarketaddress, KBMarket.abi, signer);

        const balance = await erc20Contract.balanceOf(wallet);
        const name = await erc20Contract.name();
        const symbol = await erc20Contract.symbol();
        // console.log(ethers.utils.formatUnits(balance, "ether"));
        // console.log(name, symbol);
        // console.log(tokenCA);
        addErc20List({
          tokenCA,
          name,
          symbol,
          balance: parseFloat(ethers.utils.formatUnits(balance, "ether")),
        });
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
          onChange={setTokenCA}
          value={tokenCA}
          style={{ width: "308px" }}
          placeholder="ERC20 Token Contract Address"
        />
      </div>
      <div>
        {erc20List.map((erc20, idx) => {
          return (
            <Erc20Card
              key={idx}
              opened={opened}
              setOpened={setOpened}
              // toggleTransferErc20Modal={toggleTransferErc20Modal}
              setSelectedErc20={setSelectedErc20}
              erc20={erc20}
            />
          );
        })}
      </div>
      {/* <TransferErc20Modal
        transferErc20ModalOpend={transferErc20ModalOpend}
        setTransferErc20ModalOpend={setTransferErc20ModalOpend}
        // selectedErc20={selectedErc20}
      /> */}
      <Modal opened={opened} onClose={() => setOpened(false)} hideCloseButton>
        <div style={{ textAlign: "center" }}>{selectedErc20?.name}</div>
        <TextInput
          value={recipient}
          onChange={setRecipient}
          style={{ margin: "10px 0" }}
          label="Wallet Address"
          placeholder="Wallet Address"
        />
        <TextInput
          value={amount!}
          onChange={setAmount}
          style={{ margin: "10px 0" }}
          label="Amount"
          placeholder="Amount"
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

export default Erc20Column;
