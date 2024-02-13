import { useEffect, useState } from "react";

import { Button, Flex, TextInput } from "@mantine/core";
import { IconMinus, IconPlus, IconSend } from "@tabler/icons-react";

import { Stop } from "@/utils/types";

import styles from "./index.module.scss";

const Form = ({
  onItineraryData,
}: {
  onItineraryData: (data: object) => void;
}) => {
  const [startData, setStartData] = useState<string>("");
  const [stopsData, setStopsData] = useState<Stop[]>([]);
  const [finishData, setFinishData] = useState<string>("");
  const [stopInputs, setStopInputs] = useState<string[]>([]);

  const [itineraryData, setItineraryData] = useState({});

  const handleStartInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartData(event.target.value);
  };

  const handleStopInput = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const tempInput = [...stopInputs];
    tempInput[index] = event.target.value;
    setStopInputs(tempInput);
    const tempStops = [...stopsData];
    tempStops[index] = {
      location: event.target.value,
      stopover: true,
    };
    setStopsData(tempStops);
  };

  const handleFinishInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFinishData(event.target.value);
  };

  const handleSubmit = () => {
    setItineraryData({
      start: startData,
      stops: stopsData,
      finish: finishData,
    });
  };

  const addStopInput = () => {
    setStopInputs([...stopInputs, ""]);
  };
  const removeStopInput = (index: number) => {
    const tempStops = [...stopInputs];

    tempStops.splice(index, 1);

    setStopInputs(tempStops);
  };

  useEffect(() => {
    onItineraryData(itineraryData);
  }, [itineraryData]);

  return (
    <Flex direction={"column"} gap={"sm"} align={"center"}>
      <h2>Where do you want to go?</h2>
      <p>Please select a starting point for your itinerary</p>
      <Flex gap={"xs"} className={styles.Input}>
        <TextInput
          placeholder="Start"
          value={startData}
          onChange={handleStartInput}
        />
      </Flex>
      <p>Click &quot;+&quot; to add a stop</p>
      <Button onClick={addStopInput}>
        <IconPlus />
      </Button>
      {stopInputs.map((stop: string, index: number) => (
        <>
          <Flex
            gap={"xs"}
            key={index}
            className={styles.Input}
            align={"center"}
          >
            <TextInput
              placeholder={`${index + 1}# Stop`}
              value={stop}
              required
              onChange={(event) => handleStopInput(event, index)}
            />
            <Button onClick={() => removeStopInput(index)}>
              <IconMinus />
            </Button>
          </Flex>
        </>
      ))}
      <p>Please select a finish point for your itinerary</p>
      <Flex gap={"xs"} className={styles.Input}>
        <TextInput
          placeholder="Finish"
          value={finishData}
          onChange={handleFinishInput}
        />
        <Button onClick={handleSubmit}>
          <IconSend />
        </Button>
      </Flex>
    </Flex>
  );
};

export default Form;
