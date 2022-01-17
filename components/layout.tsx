import { FC, useState } from "react";
import { AppShell, Badge, Burger, Button, Header, MediaQuery, Navbar, Text, useMantineTheme } from "@mantine/core";
import Image from "next/image";
import { Input } from "@mantine/core";
import Link from "next/link";
import styled from "styled-components";
import axios from "axios";
import { useInputState } from "@mantine/hooks";
import { useRouter } from "next/router";
import useStore from "../utils/store";
import { connectToWallet } from "../utils";

const CText = styled(Text)`
  && {
    margin: 0 20px;
    cursor: pointer;
  }
`;

const CButton = styled(Button)`
  margin-bottom: 10px;
`;

const Layout: FC = ({ children }) => {
  const [opened, setOpened] = useState(false);
  const [wallet, setWallet] = useStore((state) => [state.wallet, state.setWallet]);
  const [erc20List, setErc20List] = useStore((state) => [state.erc20List, state.setErc20List]);
  const [search, setSearch] = useInputState("");
  const router = useRouter();
  const theme = useMantineTheme();

  console.log(erc20List);

  return (
    <AppShell
      style={{ paddingRight: "calc(0px + 16px)" }}
      // navbarOffsetBreakpoint controls when navbar should no longer be offset with padding-left
      navbarOffsetBreakpoint="sm"
      // fixed prop on AppShell will be automatically added to Header and Navbar
      fixed
      navbar={
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Navbar
            style={{ marginTop: "70px" }}
            padding="md"
            // Breakpoint at which navbar will be hidden if hidden prop is true
            hiddenBreakpoint="sm"
            // Hides navbar when viewport size is less than value specified in hiddenBreakpoint
            hidden={!opened}
            // when viewport size is less than theme.breakpoints.sm navbar width is 100%
            // viewport size > theme.breakpoints.sm – width is 200px
            // viewport size > theme.breakpoints.lg – width is 300px
            // width={{ sm: 200, lg: 300 }}
            width={{ sm: 300, lg: 400 }}
          >
            <CButton variant="white" onClick={() => setOpened(!opened)}>
              <Link href="/" passHref>
                <CText>Home</CText>
              </Link>
            </CButton>
            <CButton variant="white" onClick={() => setOpened(!opened)}>
              <Link href="/explore-collections" passHref>
                <CText>Explore</CText>
              </Link>
            </CButton>
            <CButton variant="white" onClick={() => setOpened(!opened)}>
              <Link href="/create" passHref>
                <CText>Create</CText>
              </Link>
            </CButton>
          </Navbar>
        </MediaQuery>
      }
      header={
        <Header height={70} padding="md">
          {/* Handle other responsive styles with MediaQuery component or createStyles function */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: "100%" }}>
            <div style={{ display: "flex" }}>
              <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                <Burger
                  style={{ alignSelf: "center" }}
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
              </MediaQuery>

              <MediaQuery smallerThan="sm" styles={{ display: "none !important" }}>
                <div style={{ display: "flex", cursor: "pointer" }}>
                  <Link href="/" passHref>
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: "25px",
                        marginLeft: "10px",
                        alignSelf: "center",
                      }}
                    >
                      NFT GGanbu
                    </Text>
                  </Link>
                </div>
              </MediaQuery>
            </div>

            <div style={{ display: "flex", alignItems: "center" }}>
              <Input
                value={search}
                onChange={setSearch}
                onKeyDown={(e: any) => {
                  if (e.key === "Enter") {
                    router.push(`/explore-collections?search=${search}`);
                  }
                }}
                style={{ marginRight: "20px", width: "300px" }}
                variant="default"
                placeholder="Search"
              />
              <MediaQuery smallerThan="sm" styles={{ display: "none !important" }}>
                <div style={{ display: "flex" }}>
                  <Link href="/explore-collections" passHref>
                    <CText>Explore</CText>
                  </Link>
                  <Link href="/create" passHref>
                    <CText>Create</CText>
                  </Link>
                </div>
              </MediaQuery>
            </div>

            <div style={{ display: "flex", alignItems: "center" }}>
              {wallet && <Badge>{wallet.slice(0, 4) + "..." + wallet.slice(-4)}</Badge>}
              {/* {wallet && <Profile />} */}

              {!wallet && (
                <Button
                  style={{ marginLeft: "20px" }}
                  onClick={() => connectToWallet(erc20List, setErc20List)}
                  variant="light"
                  color="orange"
                >
                  <Image width={28} height={28} src="https://docs.metamask.io/metamask-fox.svg" alt="" />
                  <span style={{ marginLeft: "10px" }}>지갑 연결</span>
                </Button>
              )}
            </div>
          </div>
        </Header>
      }
    >
      <Text>{children}</Text>
    </AppShell>
  );
};

export default Layout;
