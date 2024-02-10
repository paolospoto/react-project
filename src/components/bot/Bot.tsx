import { Button, Flex, TextInput } from "@mantine/core";
import OpenAI from "openai";
import { useState } from "react";

import { IconReload } from "@tabler/icons-react";

const Bot = ({ onData }: any) => {
  const [startData, setStartData] = useState<string>("");

  const [renderMap, setRenderMap] = useState(false);
  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
    dangerouslyAllowBrowser: true,
  });

  const handleStartInput = (event: any) => {
    setStartData(event.target.value);
  };

  const generateItinerary = async (e: any) => {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-1106",
      messages: [
        {
          role: "system",
          content:
            "write ONLY a JSON object for a car journey with the keys  start and finish that are cities, and the key stop which is an array of objects of this type {location: city, stopover: true}. Plan the itinerary starting from " +
            startData +
            ".",
        },
      ],
    });

    const itinerary = completion.choices[0].message.content;

    const itineraryData = JSON.parse(itinerary as string);
    setRenderMap(true);
    onData(itineraryData);
  };
  return (
    <Flex justify={"center"} align={"center"} gap={"xs"}>
      <TextInput
        placeholder="Start"
        value={startData}
        onChange={handleStartInput}
        disabled={renderMap}
      />
      <Button onClick={generateItinerary}>
        {renderMap ? <IconReload /> : <p>GET INSPIRATION</p>}
      </Button>
    </Flex>
  );
};

export default Bot;
