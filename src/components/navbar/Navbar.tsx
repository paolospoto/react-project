import { Flex } from "@mantine/core";

import NavbarEl from "../navbarEl";
import {
  IconCloud,
  IconHeart,
  IconHome,
  IconMap,
  IconPlus,
  IconUser,
} from "@tabler/icons-react";
import ColorScheme from "../colorScheme";

const Navbar = () => {
  return (
    <Flex direction={"column"} className="Navbar">
      <ColorScheme />
      <NavbarEl link="/" icon={<IconHome />} title={"HOME"} />
      <NavbarEl link="/xs" icon={<IconMap />} title={"ITINERARIES"}>
        <NavbarEl link="/saved" icon={<IconHeart />} title={"MY ITINERARIES"} />
        <NavbarEl link="/builder" icon={<IconPlus />} title={"NEW ITINERARY"} />
      </NavbarEl>
      <NavbarEl
        link="/inspiration"
        icon={<IconCloud />}
        title={"INSPIRATION"}
      />
      <NavbarEl link="/social" icon={<IconUser />} title={"SOCIAL"} />
    </Flex>
  );
};

export default Navbar;
