import styled from "@emotion/styled";
import { Button, Text } from "@mantine/core";
import { ethers } from "ethers";
import { useState } from "react";
import UploadFile from "../components/UploadFile";
import useStore from "../utils/store";
import TozauNFT from "../build/contracts/TozauNFT.json";

const Container = styled.div`
  max-width: 720px;
  margin: 0 auto;
  // display: flex;
  // flex-direction: column;
  // align-items: center;
  // justify-content: center;
`;

const MintNft = () => {
  const [imageURI, setImageURI] = useState<string>("");
  const signer = useStore((state) => state.signer);

  const handleClickCreate = async () => {
    if (imageURI) {
      const erc721Contract = new ethers.Contract(process.env.NEXT_PUBLIC_ERC721_CA, TozauNFT.abi, signer);
      const transaction = await erc721Contract.mintNFT(imageURI);
      let tx = await transaction.wait();
      console.log(tx.events);
      const event = tx.events.find((event: any) => event.event === "Transfer");
      console.log(event);
      let tokenId = event.args.tokenId.toNumber();
      console.log(tokenId);
    }
  };

  return (
    <Container>
      <h1 style={{ textAlign: "center" }}>Mint NFT</h1>
      <UploadFile imageURI={imageURI} setImageURI={setImageURI} />
      <div style={{ display: "flex", justifyContent: "center", padding: "20px 0" }}>
        <Button onClick={handleClickCreate} size="md" color="teal">
          Create
        </Button>
      </div>
    </Container>
  );
};

export default MintNft;
