import Bot from "@/components/bot";
import DataSaver from "@/components/dataSaver";
import Itinerary from "@/components/itinerary";
import Shell from "@/components/shell";
import Modal from "@/components/modal";
import { useEffect, useState } from "react";
import { Flex } from "@mantine/core";
import Loader from "@/components/loader";
import { createItem, readItem } from "@/utils/storage";

const Inspiration = () => {
  const [itineraryData, setItineraryData] = useState({} as any);

  const [requestStarted, setRequestStarted] = useState(false);
  const [renderModal, setRenderModal] = useState(false);

  useEffect(() => {
    if (readItem("itineraries") === null) createItem("itineraries", []);
  }, []);

  const handleData = (data: any) => {
    setRequestStarted(true);
    setItineraryData(data);
  };

  const resetAll = () => {
    setRequestStarted(false);
    setItineraryData({});
    setRenderModal(true);
    setTimeout(() => {
      setRenderModal(false);
    }, 2000);
  };

  return (
    <Shell>
      <Flex
        direction={"column"}
        justify={"center"}
        align={"center"}
        pt={"lg"}
        gap={"lg"}
      >
        {renderModal && <Modal />}
        <Bot onData={handleData} />
        {itineraryData.start ? (
          <>
            <DataSaver
              start={itineraryData.start}
              stops={itineraryData.stops}
              finish={itineraryData.finish}
              onSave={resetAll}
            />
            <Itinerary
              API={true}
              start={itineraryData.start}
              stops={itineraryData.stops}
              finish={itineraryData.finish}
            />
          </>
        ) : (
          <>{requestStarted && <Loader />}</>
        )}
      </Flex>
    </Shell>
  );
};

export default Inspiration;
