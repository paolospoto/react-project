import { useEffect, useState } from "react";

import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";

import { ItineraryInfo, Stop } from "@/utils/types";

const Directions = ({
  start,
  stops,
  finish,
  onRouteInfo,
}: {
  start: string;
  stops: Stop[];
  finish: string;
  onRouteInfo: (route: any) => void;
}) => {
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const [directionsService, setDirectionsService] =
    useState<google.maps.DirectionsService>();
  const [directionRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer>();

  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(
      new routesLibrary.DirectionsRenderer({
        map,
      })
    );
  }, [routesLibrary, map]);

  useEffect(() => {
    if (!directionsService || !directionRenderer) return;

    directionsService
      .route({
        origin: start,
        waypoints: stops,
        destination: finish,
        travelMode: google.maps.TravelMode.DRIVING,
      })
      .then((response) => {
        onRouteInfo(response.routes[0].legs);

        directionRenderer.setDirections(response);
      })
      .catch(() => {
        alert("Ops, something went wrong. Reload the page please..");
      });
  }, [directionsService, directionRenderer, start, stops, finish]);

  return <></>;
};
export default Directions;
