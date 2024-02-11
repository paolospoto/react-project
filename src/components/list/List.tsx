import { readItem, updateItem } from "@/utils/storage";
import { ItineraryData } from "@/utils/types";
import { useEffect, useState } from "react";
import Itinerary from "../itinerary";
import { Button, Flex } from "@mantine/core";
import { APIProvider } from "@vis.gl/react-google-maps";
import { IconX } from "@tabler/icons-react";
import Link from "next/link";

import styles from "./index.module.scss";
import { theme } from "@/pages/_app";

const List = () => {
  const [itineraries, setItineraries] = useState<ItineraryData[]>([]);
  useEffect(() => {
    const values = readItem("itineraries");

    setItineraries(values);
  }, []);

  const deleteSavedItineraries = (index: any) => {
    if (!confirm("Are you sure you want to delete this itinerary?")) return;

    const values = readItem("itineraries");
    values.splice(index, 1);
    updateItem("itineraries", values);
    setItineraries(values);
  };

  return (
    <>
      {itineraries ? (
        <>
          <APIProvider apiKey={process.env.NEXT_PUBLIC_MAP_KEY}>
            {itineraries.map((itinerary, index) => (
              <Flex
                w={"100%"}
                key={index}
                direction={"column"}
                justify={"center"}
                align={"center"}
                gap={"lg"}
                pt={"lg"}
              >
                <Flex
                  className={styles.Header}
                  bg={"#5072ac4a"}
                  color="white"
                  w={310}
                  justify={"space-between"}
                  align={"center"}
                >
                  <h3>{itinerary.name.toUpperCase()}</h3>
                  <Button
                    onClick={deleteSavedItineraries}
                    bg={"transparent"}
                    c={"red"}
                    size="xs"
                    p={0}
                  >
                    <IconX />
                  </Button>
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
        </>
      ) : (
        <>
          <h1>No itineraries saved</h1>
          <Link href={"/builder"}>
            <Button>CREATE NEW ITINERARY</Button>
          </Link>
        </>
      )}
    </>
  );
};

export default List;
