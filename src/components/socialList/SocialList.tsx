import { mockItineraryData } from "@/utils/mock";
import Itinerary from "../itinerary";
import { APIProvider } from "@vis.gl/react-google-maps";
import { Flex } from "@mantine/core";
import Image from "next/image";

import styles from "./index.module.scss";

const SocialList = () => {
  return (
    <div>
      <APIProvider apiKey={process.env.NEXT_PUBLIC_MAP_KEY || ""}>
        {mockItineraryData.map((itinerary, index) => (
          <Flex
            w={"100%"}
            key={index}
            direction={"column"}
            justify={"center"}
            align={"center"}
            gap={"lg"}
            pt={"lg"}
            style={{ borderBottom: "2px solid #5072ad" }}
          >
            <Flex
              w={"80%"}
              justify={"space-between"}
              align={"center"}
              pl={"xs"}
              pr={"md"}
              // bg={"white"}
              // c={"blue"}
              h={40}
              className={styles.Header}
            >
              <Flex justify={"center"} align={"center"} gap={"xs"}>
                <Image
                  src={itinerary.image}
                  alt={itinerary.user}
                  width={30}
                  height={30}
                />
                <h5>{itinerary.user}</h5>
              </Flex>
              <h3>{itinerary.name}</h3>
            </Flex>

            <Itinerary
              API={false}
              start={itinerary.start}
              stops={itinerary.stops}
              finish={itinerary.finish}
            />
          </Flex>
        ))}
      </APIProvider>
    </div>
  );
};

export default SocialList;
