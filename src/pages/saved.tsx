import List from "@/components/list";
import Shell from "@/components/shell";
import { Flex } from "@mantine/core";
import React from "react";

const Saved = () => {
  return (
    <Shell>
      <Flex
        direction={"column"}
        justify={"center"}
        align={"center"}
        gap={"lg"}
        pt={"lg"}
      >
        <List />
      </Flex>
    </Shell>
  );
};

export default Saved;
