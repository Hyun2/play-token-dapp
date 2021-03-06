import styled from "@emotion/styled";
import { Dispatch, SetStateAction } from "react";
import { IErc20, IErc721 } from "../../typings/types";
import { round } from "../../utils";

const Wrapper = styled.div`
  &:hover {
    cursor: pointer !important;
    border: 1px solid rgb(55, 125, 255) !important;
  }
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-radius: 4px;
  margin-top: 10px;
  box-shadow: rgb(228 231 232 / 45%) 0px 0px 16px;
  border: 1px solid rgb(249, 250, 251);
  backgroundcolor: rgb(255, 255, 255);
`;

const Erc20Card = ({
  erc20,
  opened,
  setOpened,
  setSelectedErc20,
}: {
  erc20: IErc20;
  opened: boolean;
  setOpened: (bool: boolean) => void;
  setSelectedErc20: (ierc20: IErc20 | null) => void;
}) => {
  return (
    <Wrapper
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "10px",
        borderRadius: "4px",
        marginTop: "10px",
        cursor: "pointer",
        boxShadow: "rgb(228 231 232 / 45%) 0px 0px 16px",
        border: "1px solid rgb(249, 250, 251)",
        backgroundColor: "rgb(255, 255, 255)",
      }}
      onClick={() => {
        setSelectedErc20(erc20);
        setOpened(!opened);
      }}
    >
      <span style={{ textAlign: "center", fontWeight: "bold" }}>
        {erc20.name.slice(0, 1).toUpperCase() + erc20.name.slice(1)}
      </span>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <span style={{ alignSelf: "center" }}>{`${round(erc20.balance)} ${erc20.symbol}`}</span>
      </div>
    </Wrapper>
  );
};

export default Erc20Card;
