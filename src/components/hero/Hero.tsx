import React, { useEffect, useState } from "react";
import Globe3D from "../globe3D";
import styles from "./index.module.scss";
import { Button, Flex } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <Flex className={styles.Wrapper} justify={"center"} align={"center"}>
      <Globe3D>
        <Flex
          className={styles.Overlay}
          direction={"column"}
          justify={"center"}
          align={"center"}
          p={"sm"}
          gap={"md"}
        >
          <Image
            className={styles.Logo}
            src={"/hero-logo.png"}
            alt={"hero-logo"}
            width={800}
            height={800}
          />
          <Link href="/builder">
            <Button>START EXPLORING</Button>
          </Link>
        </Flex>
      </Globe3D>
    </Flex>
  );
};

export default Hero;
