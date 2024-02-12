import { useEffect, useState } from "react";

import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";

const Directions = ({ start, stops, finish, onRouteInfo }: any) => {
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const [directionsService, setDirectionsService] =
    useState<google.maps.DirectionsService>();
  const [directionRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer>();
  const [route, setRoute] = useState<any>();

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
        console.log(response);

        setRoute(response.routes[0]);
        onRouteInfo(response.routes[0].legs);

        directionRenderer.setDirections(response);
      })
      .catch((error) => {
        alert("Ops, something went wrong. Reload the page please..");
      });
  }, [directionsService, directionRenderer, start, stops, finish]);

  return <></>;
};
export default Directions;
