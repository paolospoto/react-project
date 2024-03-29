"use client";

import React, { useEffect, useState } from "react";

import dynamic from "next/dynamic";

const Globe = dynamic(() => import("react-globe.gl"), {
  ssr: false,
});

const Globe3D = ({ children }: { children: React.ReactNode }) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight - 120);
  }, []);

  return (
    <>
      {children}
      <Globe
        atmosphereAltitude={0.15}
        width={width}
        height={height}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
      />
    </>
  );
};

export default Globe3D;
