import { useState } from "react";

import OpenAI from "openai";

import { Button, Flex, TextInput } from "@mantine/core";
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
    onData({});
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-1106",
      messages: [
        {
          role: "system",
          content:
            "Create a JSON object with the key start equal to " +
            startData +
            " and the key finish equal to another city. Add also a key stops with an array of objects with the key location and stopover set to true. Provide the JSON object. Never repeat the same answer",
        },
      ],
    });

    const itinerary = completion.choices[0].message.content;

    const itineraryData = JSON.parse(itinerary as string);
    setRenderMap(true);
    onData(itineraryData);
  };
  return (
    <>
      <h2>Generate an itinerary with AI</h2>
      {renderMap ? (
        <p>Click to generate another itinerary</p>
      ) : (
        <p>Please select a starting point</p>
      )}
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
    </>
  );
};

export default Bot;
