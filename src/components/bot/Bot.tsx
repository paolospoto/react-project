import { Button } from "@mantine/core";
import OpenAI from "openai";
import { useState } from "react";
import Itinerary from "../itinerary";

const Bot = () => {
  const [itineraryData, setItineraryData] = useState({} as any);
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
            "write a JSON object for a car journey with the keys name (of the itinerary), start and finish that are cities, and the key stop which is an array of objects of this typer {location: city, stopover: true}",
        },
      ],
    });

    console.log(completion.choices[0].message.content);
    const itinerary = completion.choices[0].message.content;

    const tempItineraryData = JSON.parse(itinerary);
    setRenderMap(true);
    setItineraryData(tempItineraryData);
  };
  return (
    <div>
      <Button onClick={generateItinerary}>X</Button>
      {renderMap && (
        <Itinerary
          API={true}
          start={itineraryData.start}
          stops={itineraryData.stops}
          finish={itineraryData.finish}
        />
      )}
    </div>
  );
};

export default Bot;
