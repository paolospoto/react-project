"use client";

import { AppShell, Burger, Flex } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

const Shell = ({ children }: any) => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      style={{ zIndex: 9999 }}
      header={{ height: 80 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened, desktop: !opened },
      }}
      footer={{ height: 40 }}
    >
      <AppShell.Header style={{ border: "2px solid red" }}>
        <Flex h={"100%"} justify={"space-between"} align={"center"} p={"xs"}>
          <Burger opened={opened} onClick={toggle} size="sm" />

          <p>instid</p>
        </Flex>
      </AppShell.Header>
      <AppShell.Navbar>
        <Flex direction={"column"}>
          <p>instid22222</p>
        </Flex>
      </AppShell.Navbar>

      <AppShell.Main p={0}>{children}</AppShell.Main>
      <AppShell.Footer style={{ backgroundColor: "#5072ad", color: "white" }}>
        Footer
      </AppShell.Footer>
    </AppShell>
  );
};

export default Shell;
