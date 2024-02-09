import { readItem, updateItem } from "@/utils/storage";
import { ItineraryData } from "@/utils/types";
import { useEffect, useState } from "react";
import Itinerary from "../itinerary";
import { Button, Flex } from "@mantine/core";
import { APIProvider } from "@vis.gl/react-google-maps";
import { IconX } from "@tabler/icons-react";

const List = () => {
  const [itineraries, setItineraries] = useState<ItineraryData[]>([]);
  useEffect(() => {
    const values = readItem("itineraries");
    console.log(values);

    setItineraries(values);
  }, []);

  useEffect(() => {
    console.log("state", itineraries);
  }, [itineraries]);

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
          <APIProvider apiKey={"AIzaSyAziHvXBEgvKmVPbzZkcaTasDxOjWt1cwQ"}>
            {itineraries.map((itinerary, index) => (
              <Flex
                key={index}
                direction={"column"}
                justify={"center"}
                align={"center"}
                gap={"lg"}
                pt={"lg"}
              >
                <Flex w={"75%"} justify={"space-between"} align={"center"}>
                  <h3>{itinerary.name.toUpperCase()}</h3>
                  <Button
                    onClick={deleteSavedItineraries}
                    bg={"transparent"}
                    c={"red"}
                    size="xs"
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
        <h1>No itineraries saved</h1>
      )}
    </>
  );
};

export default List;
