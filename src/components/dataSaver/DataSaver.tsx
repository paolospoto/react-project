import { useState } from "react";

import { Button, Flex, TextInput } from "@mantine/core";

import { readItem, updateItem } from "@/utils/storage";
import { Stop } from "@/utils/types";

const DataSaver = ({
  start,
  stops,
  finish,
  onSave,
}: {
  start: string;
  stops: Stop[];
  finish: string;
  onSave: () => void;
}) => {
  const [nameData, setNameData] = useState<string>("");

  const handleNameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    <Flex justify={"space-between"} gap={"xs"}>
      <TextInput
        placeholder="Choose a name"
        value={nameData}
        onChange={handleNameInput}
      />
      <Button onClick={saveItinerary}>SAVE</Button>
    </Flex>
  );
};

export default DataSaver;
