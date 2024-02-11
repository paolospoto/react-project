import { Button, Flex, TextInput } from "@mantine/core";
import { IconMinus, IconPlus, IconSend } from "@tabler/icons-react";
import { useEffect, useState } from "react";

import styles from "./index.module.scss";
import { Stop } from "@/utils/types";

const Form = ({
  onItineraryData,
}: {
  onItineraryData: (data: object) => void;
}) => {
  const [startData, setStartData] = useState<string>("");
  const [stopsData, setStopsData] = useState<Stop[]>([]);
  const [finishData, setFinishData] = useState<string>("");
  const [stopInputs, setStopInputs] = useState<any[]>([]);

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
    <Flex direction={"column"} gap={"sm"}>
      <Flex gap={"xs"} className={styles.Input}>
        <TextInput
          placeholder="Start"
          value={startData}
          onChange={handleStartInput}
        />
        <Button onClick={addStopInput}>
          <IconPlus />
        </Button>
      </Flex>
      {stopInputs.map((stop: string, index: number) => (
        <Flex gap={"xs"} key={index} className={styles.Input}>
          <TextInput
            placeholder="Add stops if you want.."
            value={stop}
            required
            onChange={(event) => handleStopInput(event, index)}
          />
          <Button onClick={() => removeStopInput(index)}>
            <IconMinus />
          </Button>
        </Flex>
      ))}
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
