import { useEffect, useState } from "react";

import { Button, Flex } from "@mantine/core";
import { APIProvider } from "@vis.gl/react-google-maps";
import { IconX } from "@tabler/icons-react";
import Link from "next/link";
import Itinerary from "../itinerary";

import { ItineraryData } from "@/utils/types";
import { createItem, readItem, updateItem } from "@/utils/storage";

import styles from "./index.module.scss";

const List = () => {
  const [itineraries, setItineraries] = useState<ItineraryData[]>([]);

  useEffect(() => {
    if (readItem("itineraries") === null) createItem("itineraries", []);
  }, []);

  useEffect(() => {
    const values = readItem("itineraries");

    setItineraries(values);
  }, []);

  const deleteSavedItineraries = (index: number) => {
    if (!confirm("Are you sure you want to delete this itinerary?")) return;

    const values = readItem("itineraries");
    values.splice(index, 1);
    updateItem("itineraries", values);
    setItineraries(values);
  };

  return (
    <>
      {itineraries.length !== 0 ? (
        <>
          <APIProvider apiKey={process.env.NEXT_PUBLIC_MAP_KEY || ""}>
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
                  pt={0}
                  pb={0}
                  color="white"
                  w={310}
                  justify={"space-between"}
                  align={"center"}
                >
                  {itinerary.name && (
                    <h3 style={{ borderBottom: "2px solid" }}>
                      {itinerary.name.toUpperCase()}
                    </h3>
                  )}
                  <Button
                    onClick={() => deleteSavedItineraries(index)}
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
                  start={itinerary.start ?? ""}
                  stops={itinerary.stops ?? []}
                  finish={itinerary.finish ?? ""}
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
