import Bot from "@/components/bot";
import DataSaver from "@/components/dataSaver";
import Itinerary from "@/components/itinerary";
import Shell from "@/components/shell";
import Modal from "@/components/modal";
import { useState } from "react";
import { Flex } from "@mantine/core";
import Loader from "@/components/loader";

const Inspiration = () => {
  const [itineraryData, setItineraryData] = useState({} as any);

  const [renderModal, setRenderModal] = useState(false);

  const handleData = (data: any) => {
    setItineraryData(data);
  };

  const resetAll = () => {
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
          <Loader />
        )}
      </Flex>
    </Shell>
  );
};

export default Inspiration;
