import { Button } from "@mantine/core";
import OpenAI from "openai";
import { useState } from "react";

import { IconReload } from "@tabler/icons-react";

const Bot = ({ onData }: any) => {
  const [renderMap, setRenderMap] = useState(false);
  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
    dangerouslyAllowBrowser: true,
  });

  const generateItinerary = async (e: any) => {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-1106",
      messages: [
        {
          role: "system",
          content:
            "write a JSON object for a car journey with the keys  start and finish that are cities, and the key stop which is an array of objects of this typer {location: city, stopover: true}",
        },
      ],
    });

    const itinerary = completion.choices[0].message.content;

    const itineraryData = JSON.parse(itinerary as string);
    setRenderMap(true);
    onData(itineraryData);
  };
  return (
    <Button onClick={generateItinerary}>
      {renderMap ? <IconReload /> : <p>GET INSPIRATION</p>}
    </Button>
  );
};

export default Bot;
