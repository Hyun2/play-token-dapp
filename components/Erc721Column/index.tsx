import { Col, Grid, Input } from "@mantine/core";
import { useState } from "react";
import useStore from "../../utils/store";
import Erc721Card from "../Erc721Card";
// import TransferErc721Modal from "./transferErc721Modal";

const Erc721Column = () => {
  const erc721List = useStore((state) => state.erc721List);
  const [transferErc721ModalOpend, setTransferErc721ModalOpend] = useState(false);

  const toggleTransferErc721Modal = () => {
    setTransferErc721ModalOpend(!transferErc721ModalOpend);
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <Input />
      </div>
      <div>
        <Grid>
          {erc721List.map((erc721, idx) => {
            return (
              <Col key={idx} span={4}>
                <Erc721Card
                  erc721={erc721}
                  //   toggleTransferErc721Modal={toggleTransferErc721Modal}
                  //   setSelectedErc721={setSelectedErc721}
                />
              </Col>
            );
          })}
        </Grid>
      </div>
      {/* <TransferErc721Modal
        transferErc721ModalOpend={transferErc721ModalOpend}
        setTransferErc721ModalOpend={setTransferErc721ModalOpend}
        selectedErc721={selectedErc721}
      /> */}
    </>
  );
};

export default Erc721Column;
