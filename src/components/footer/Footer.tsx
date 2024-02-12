import Image from "next/image";
import Link from "next/link";
import { Flex } from "@mantine/core";

const Footer = () => {
  return (
    <Flex justify={"space-between"} align={"center"} h={60} pl={20} pr={20}>
      <p>@Copyrigth 2024</p>
      <Flex justify={"center"} align={"center"}>
        <Link href="https://edgemony.com">
          <Image
            src="/edgemony-logo.png"
            alt="Edgemony Logo"
            width={32}
            height={32}
          />
        </Link>
        <Link href="https://github.com/paolospoto">
          <Image
            src="/github-logo.png"
            alt="Github Logo"
            width={32}
            height={32}
          />
        </Link>
      </Flex>
    </Flex>
  );
};

export default Footer;
