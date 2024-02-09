import { readItem, updateItem } from "@/utils/storage";
import { Button, Flex, TextInput } from "@mantine/core";
import { on } from "events";
import { useEffect, useState } from "react";

const DataSaver = ({ start, stops, finish, onSave }: any) => {
  const [nameData, setNameData] = useState<string>("");

  const handleNameInput = (event: any) => {
    setNameData(event.target.value);
  };

  const saveItinerary = () => {
    const tempItinerary = readItem("itineraries");
    tempItinerary.push({
      name: nameData,
      time: Date.now(),
      start: start,
      stops: stops,
      finish: finish,
    });
    updateItem("itineraries", tempItinerary);
    onSave();
  };

  return (
    <Flex gap={"xs"}>
      <TextInput
        placeholder="Choose a name"
        value={nameData}
        onChange={handleNameInput}
      />
      <Button onClick={saveItinerary}>SAVE ITINERARY</Button>
    </Flex>
  );
};

export default DataSaver;
