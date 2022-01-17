import { Badge, Card, Group, Image, Text, useMantineTheme } from "@mantine/core";
import styled from "@emotion/styled";
import { IErc721 } from "../../typings/types";

const CCard = styled(Card)`
  &:hover {
    cursor: pointer !important;
    border: 1px solid rgb(55, 125, 255) !important;
  }
  margin-top: 10px;
`;

const Erc721Card = ({ erc721 }: { erc721: IErc721 }) => {
  const theme = useMantineTheme();

  return (
    <CCard
      // onClick={() => {
      //   toggleTransferErc721Modal();
      //   setSelectedErc721(erc721);
      // }}
      style={{ marginTop: "10px", cursor: "pointer" }}
      shadow="sm"
      padding="lg"
    >
      <Card.Section>
        <Image src={erc721.tokenURI} height={160} alt="Norway" />
      </Card.Section>

      <Group position="apart" style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
        <Text style={{ margin: "0 auto" }} weight={500}>
          {erc721.name}
        </Text>
        <Badge style={{ margin: "0 auto" }} color="pink" variant="light">
          ${erc721.symbol}
        </Badge>
      </Group>
    </CCard>
  );
};

export default Erc721Card;
