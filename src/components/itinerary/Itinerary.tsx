import { Box, Button, Flex } from "@mantine/core";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import Directions from "../directions";
import { useState } from "react";
import {
  IconArrowDown,
  IconArrowRight,
  IconArrowUp,
  IconCar,
  IconHome,
  IconInfoCircle,
  IconMapRoute,
  IconPointFilled,
} from "@tabler/icons-react";

import { alphabet } from "@/utils/mock";

import styles from "./index.module.scss";
import { ItineraryData, Stop } from "@/utils/types";

const Itinerary = ({
  API,
  start,
  stops,
  finish,
}: {
  API: boolean;
  start: string;
  stops: Stop[];
  finish: string;
}) => {
  const [itineraryInfo, setItineraryInfo] = useState([]);
  const [showInfo, setShowInfo] = useState(false);
  const handleRouteInfo = (route: any) => {
    setItineraryInfo(route);
  };

  const handleInfoRendering = () => {
    showInfo ? setShowInfo(false) : setShowInfo(true);
  };

  return (
    <Flex
      direction={"column"}
      justify={"center"}
      align={"center"}
      gap={"md"}
      pb={"sm"}
      w={"100%"}
    >
      <Box w={"80%"} h={300}>
        {API ? (
          <APIProvider apiKey={process.env.NEXT_PUBLIC_MAP_KEY || ""}>
            <Map
              mapId={"56522fd9aef04113"}
              mapTypeControl={false}
              zoomControl={false}
              streetViewControl={false}
            >
              <Directions
                start={start}
                stops={stops}
                finish={finish}
                onRouteInfo={handleRouteInfo}
              />
            </Map>
          </APIProvider>
        ) : (
          <Map
            mapId={"56522fd9aef04113"}
            mapTypeControl={false}
            zoomControl={false}
            streetViewControl={false}
          >
            <Directions
              start={start}
              stops={stops}
              finish={finish}
              onRouteInfo={handleRouteInfo}
            />
          </Map>
        )}
      </Box>
      <Button onClick={handleInfoRendering}>
        {showInfo ? <IconArrowUp /> : <IconInfoCircle />}
      </Button>
      {showInfo &&
        itineraryInfo.map((info: any, index: number) => (
          <Flex
            key={index}
            direction={"column"}
            justify={"center"}
            align={"center"}
            className={styles.ItineraryCard}
            w={"80%"}
            h={300}
            pt={"md"}
            pb={"md"}
          >
            <Flex
              className={styles.ItineraryInfo}
              pl={"sm"}
              pr={"sm"}
              w={"80%"}
              h={"80%"}
              align={"center"}
              justify={"center"}
              gap={"md"}
            >
              {index === 0 ? <IconHome /> : null}

              <p>{info.start_address.split(",")[0]}</p>

              <IconArrowRight />

              <p>{info.end_address.split(",")[0]}</p>
              {index === itineraryInfo.length - 1 ? <IconPointFilled /> : null}
              <p className={styles.FirstLetter}>{alphabet[index]}</p>
              <IconArrowRight className={styles.Arrow} />
              <p className={styles.SecondLetter}>{alphabet[index + 1]}</p>
            </Flex>
            <Flex
              w={"80%"}
              align={"center"}
              justify={"space-between"}
              gap={"md"}
            >
              <IconMapRoute />
              <p>{info.distance.text}</p>
            </Flex>
            <Flex
              w={"80%"}
              align={"center"}
              justify={"space-between"}
              gap={"md"}
            >
              <IconCar />
              <p>{info.duration.text}</p>
            </Flex>
          </Flex>
        ))}
    </Flex>
  );
};

export default Itinerary;
