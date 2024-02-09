import DataSaver from "@/components/dataSaver";
import Form from "@/components/form";
import Itinerary from "@/components/itinerary";
import Shell from "@/components/shell";
import { createItem, readItem } from "@/utils/storage";
import { Stop } from "@/utils/types";
import { Flex } from "@mantine/core";
import Modal from "@/components/modal";
import { useEffect, useState } from "react";

const Builder = () => {
  const [startData, setStartData] = useState<string>();
  const [stopsData, setStopsData] = useState<Stop[]>();
  const [finishData, setFinishData] = useState<any>();

  const [renderMap, setRenderMap] = useState<boolean>(false);
  const [renderForm, setRenderForm] = useState<boolean>(true);
  const [renderModal, setRenderModal] = useState(false);

  const handleItineraryData = (data: any) => {
    setStartData(data.start);
    setStopsData(data.stops);
    setFinishData(data.finish);
  };

  const resetAll = () => {
    setStartData("");
    setStopsData([]);
    setFinishData("");
    setRenderForm(true);
    setRenderMap(false);
    setRenderModal(true);
    setTimeout(() => {
      setRenderModal(false);
    }, 2000);
  };

  useEffect(() => {
    if (finishData) {
      setRenderMap(true);
      setRenderForm(false);
    }
  }, [finishData]);

  useEffect(() => {
    if (readItem("itineraries") === null) createItem("itineraries", []);
  }, []);

  return (
    <Shell>
      {renderModal && <Modal />}
      <Flex
        direction={"column"}
        justify={"center"}
        align={"center"}
        gap={"lg"}
        pt={"lg"}
      >
        {renderForm ? (
          <Form onItineraryData={handleItineraryData} />
        ) : (
          <DataSaver
            start={startData}
            stops={stopsData}
            finish={finishData}
            onSave={resetAll}
          />
        )}

        {renderMap && (
          <Itinerary
            API={true}
            start={startData}
            stops={stopsData}
            finish={finishData}
          />
        )}
      </Flex>
    </Shell>
  );
};

export default Builder;
