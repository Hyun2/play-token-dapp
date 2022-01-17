import { Col, Grid } from "@mantine/core";
import Erc20Column from "../components/Erc20Column";
import Erc721Column from "../components/Erc721Column";
import useStore from "../utils/store";

const InsideWallet = () => {
  const wallet = useStore((state) => state.wallet);

  if (!wallet) return <div>메타마스크 지갑을 먼저 연결해주세요.</div>;

  return (
    <div>
      <Grid>
        <Col span={3}>
          <Erc20Column />
        </Col>
        <Col span={9}>
          <Erc721Column />
        </Col>
      </Grid>
    </div>
  );
};

export default InsideWallet;
