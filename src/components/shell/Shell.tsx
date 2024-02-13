"use client";

import { useDisclosure } from "@mantine/hooks";

import { AppShell, Burger, Flex } from "@mantine/core";
import Navbar from "../navbar";
import Header from "../header";
import Footer from "../footer";

const Shell = ({ children }: { children: React.ReactNode }) => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 80 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened, desktop: !opened },
      }}
      footer={{ height: 60 }}
    >
      <AppShell.Header>
        <Flex h={"100%"} justify={"space-between"} align={"center"} p={"xs"}>
          <Burger opened={opened} onClick={toggle} size="sm" />

          <Header />
        </Flex>
      </AppShell.Header>
      <AppShell.Navbar>
        <Navbar />
      </AppShell.Navbar>

      <AppShell.Main pt={80}>{children}</AppShell.Main>
      <AppShell.Footer style={{ backgroundColor: "#5072ad", color: "white" }}>
        <Footer />
      </AppShell.Footer>
    </AppShell>
  );
};

export default Shell;
