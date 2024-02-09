import { Box, Button, Flex, TextInput } from "@mantine/core";
import { IconGoGame, IconMinus, IconPlus, IconSend } from "@tabler/icons-react";
import { useEffect, useState } from "react";

import styles from "./index.module.scss";

const Form = ({ onItineraryData }: any) => {
  const [startData, setStartData] = useState<string>("");
  const [stopsData, setStopsData] = useState<any[]>([]);
  const [finishData, setFinishData] = useState<string>("");
  const [stopInputs, setStopInputs] = useState<string[]>([]);

  const [itineraryData, setItineraryData] = useState<any>({});

  const handleStartInput = (event: any) => {
    setStartData(event.target.value);
  };

  const handleStopInput = (event: any, index: number) => {
    const tempStops = [...stopsData];
    tempStops[index] = {
      location: event.target.value,
      stopover: true,
    };
    setStopsData(tempStops);
  };

  const handleFinishInput = (event: any) => {
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
  const removeStopInput = (index: any) => {
    const tempStops = [...stopInputs];

    tempStops.splice(index, 1);

    setStopInputs(tempStops);
  };

  useEffect(() => {
    onItineraryData(itineraryData);
  }, [itineraryData]);

  return (
    <Flex direction={"column"} gap={"sm"}>
      <Flex gap={"xs"} className={styles.Input}>
        <TextInput
          placeholder="start"
          value={startData}
          onChange={handleStartInput}
        />
        <Button onClick={addStopInput}>
          <IconPlus />
        </Button>
      </Flex>
      {stopInputs.map((stop, index) => (
        <Flex gap={"xs"} key={index} className={styles.Input}>
          <TextInput
            placeholder="Add stops if you want.."
            value={stop.location}
            required
            onChange={() => handleStopInput(event, index)}
          />
          <Button onClick={() => removeStopInput(index)}>
            <IconMinus />
          </Button>
        </Flex>
      ))}
      <Flex gap={"xs"} className={styles.Input}>
        <TextInput
          placeholder="finish"
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
